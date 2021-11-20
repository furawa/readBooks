const userInput = document.getElementById("userInput");
const card = document.getElementById("cardResult");
const btnSearch = document.querySelector(".btn-search");
const modalBody = document.querySelector(".modal-body");
const modalTitle = document.querySelector(".modal-title");
let keys = [];

//==========================================
// FETCH FUNCTIONS
//==========================================

const fetchData = async url => {
        return  await fetch(url)
                .then(checkStatus)
                .then(res => res.json())
                .catch(error => alert("Looks like there was a problem with this request!", error));
}

function fetchSubject() {
    const subject = userInput.value.toLowerCase();
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
            console.log(desc.includes("Also contained"));
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
        el.className = "col-6 col-md-4 col-lg-3 m-2 d-flex flex-column justify-content-between border rounded-3 border-info";
        const book = `<h2>Author</h2> <p>${data[i].authors[0].name}</p>
                  <h3>Title</h3><p>${data[i].title}</p>
                  <button data-bs-toggle="modal" data-bs-target="#modalDesc" type="button" class="align-self-center btn btnt bg-info" id=button${i + 1}>Learn More</button>`;
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

//=======================================================
// EVENT LISTENERS
//=======================================================

// Add event listener on the search button
btnSearch.addEventListener("click", fetchSubject);

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
