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
    const subject = userInput.value;
    fetchData(`https://openlibrary.org/subjects/${subject}.json`)
        .then(data => generateResult(data.works));
    resetValues();
}

const fetchDescription = key => {
    let desc = "";
    fetchData(`https://openlibrary.org${key}.json`)
        .then(data => {
            if (typeof data.description === "object") {
                desc = data.description.value;
            }else if (data.description.includes("--")){
                desc = data.description.slice(0, data.description.indexOf("--"));
            } else {
                desc = data.description;
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
        el.className = "border border-info w-25 mx-auto";
        const book = `<h2>Author: ${data[i].authors[0].name}</h2>
                  <h3>Title: ${data[i].title}</h3>
                  <button data-bs-toggle="modal" data-bs-target="#modalDesc" type="button" class="btn btnt bg-info" id=button${i + 1}>Learn More</button>`;
        keys.push(data[i].key);
        el.innerHTML = book;
        card.appendChild(el);
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
