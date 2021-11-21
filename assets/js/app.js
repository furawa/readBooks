const userInput = document.getElementById("userInput");
const card = document.getElementById("cardResult");
const btnSearch = document.querySelector(".btn-search");
const modalBody = document.querySelector(".modal-body");
const modalTitle = document.querySelector(".modal-title");
const error = document.getElementById("error");

let keys = [];

//==========================================
// FETCH FUNCTIONS
//==========================================

const fetchData = async url => {
        return  await fetch(url)
                .then(checkStatus)
                .then(res => res.json())
                .catch(error =>  {
                    console.log(error);
                    showInputErrorMessage("No such category. Please try again");
                })   
}

const fetchSubject = (subj) => {
    let subject = checkUserInput(subj);
    
    fetchData(`https://openlibrary.org/subjects/${subject}.json`)
        .then(data => generateResult(data.works));
    resetValues();
}

const fetchDescription = key => {
    let desc = "";
    fetchData(`https://openlibrary.org${key}.json`)
        .then(data => {
            if (typeof data.description === "object") {
                desc = data.description.value.split("--")[0];
            } else if (typeof data.description == "string") {
                desc = data.description.split("--")[0];
            } else {
                desc = "Sorry! There is No description available for this Book";
            }
            modalTitle.textContent = `${data.title}`;
            modalBody.innerHTML = `<p><span class="text-decoration-underline">Description</span><br><br>${desc}</p>`;
        });
}

//===============================================
// HELPER FUNCTIONS
//===============================================
function resetValues() {
    userInput.value = "";
    card.innerHTML = "";
}

function generateResult(data) {
    keys = []; // Empty the array
    for (let i = 0; i < data.length; i++) {
        const el = document.createElement("div");
        if (i % 2 == 0) {
            el.className = "result ms-sm-auto mx-md-auto col-8 col-md-5 col-lg-4 p-0 d-flex flex-column flex-sm-row border rounded-3 border-info";
        } else {
            el.className = "result me-sm-auto mx-md-auto col-8 col-md-5 col-lg-4 p-0 d-flex flex-column flex-sm-row border rounded-3 border-info";
        }
        
        const book = `<img src="https://covers.openlibrary.org/b/id/${data[i].cover_id}-M.jpg" alt="${data[i].title} Book cover">
                      <div class="d-flex flex-column flex-grow-1 justify-content-between">
                        <h2>Author</h2> <p>${data[i].authors[0].name}</p>
                        <h3>Title</h3><p>${data[i].title}</p>
                        <button data-bs-toggle="modal" data-bs-target="#modalDesc" type="button" class="align-self-center btn btnt bg-info" id=button${i + 1}>Learn More</button>
                      </div>`
        keys.push(data[i].key);
        el.innerHTML = book;
        card.appendChild(el);
        card.scrollIntoView();
    }
}

const checkStatus = response => {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

const checkUserInput = (val = "") => {
    let message = "";
    if (val == "") {
        message =  "No empty string allowed! You should Enter a book category";
        showInputErrorMessage(message);
    } else if (typeof Number(val) === "number" && !isNaN(Number(val))) {
        message = `${val} is not a book category, you should enter a word as fantasy`;
        showInputErrorMessage(message);
    } else if (val.split(" ").length > 1) {
        return val.split(" ")[0].toLowerCase();
    } else {
        error.className = "invisible";
        return val.toLowerCase();
    }
}

const showInputErrorMessage = (msg) => {
    error.textContent = msg;
    error.className = "d-inline-block border bg-danger text-light mb-2";
}
//=======================================================
// EVENT LISTENERS
//=======================================================

// Add event listener on the search button
btnSearch.addEventListener("click", () => {
    fetchSubject(userInput.value)
});

// Allow to search by using the Enter key
userInput.addEventListener("keyup", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        btnSearch.click();
    }
})


// Add event on the card using bubbling and checking only the buttons
card.addEventListener("click", (event) => {
    const r = /\d+/g;
    if(!(event.target.nodeName === "BUTTON")) {
        return;
    }
    const key = keys[Number(event.target.id.match(r)) - 1]; 
    fetchDescription(key);
})
