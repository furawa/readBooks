const userInput = document.getElementById("userInput");
const card = document.getElementById("cardResult");
const btnSearch = document.querySelector(".btn-search");
const modalBody = document.querySelector(".modal-body");
const modalTitle = document.querySelector(".modal-title");
let keys = [];

//==========================================
// FETCH FUNCTIONS
//==========================================

const fetchData = (url) => {
        return fetch(url)
                .then(res => res.json())
}

const fetchSubject = () => {
    const subject = userInput.value;
    fetchData(`https://openlibrary.org/subjects/${subject}.json`)
        .then(data => generateResult(data.works));
    resetValues();
}

const fetchDescription = (key) => {
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
                  <button data-bs-toggle="modal" data-bs-target="#modalDesc" type="button" class="btn bg-info" id=button${i + 1}>Learn More</button>`;
        keys.push(data[i].key);
        el.innerHTML = book;
        card.appendChild(el);
    }
}


//=======================================================
// EVENT LISTENERS
//=======================================================

// Add event listener on the search button
btnSearch.addEventListener("click", fetchSubject);
// Add event on the card using bubbling and checking only button

card.addEventListener("click", (event) => {
    const r = /\d+/g;
    if(!(event.target.nodeName === "BUTTON")) {
        return;
    }
    const key = keys[Number(event.target.id.match(r)) - 1]; 
    fetchDescription(key);
    document.getElementById("modalDesc").removeChild();
})

