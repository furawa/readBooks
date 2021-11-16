const userInput = document.getElementById("userInput");
const card = document.getElementById("cardResult");
const btnSearch = document.querySelector(".btn-search");
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
    fetchData(`https://openlibrary.org${key}.json`)
        .then(data => {
            if (typeof data.description === "object") {
                console.log(data.description.value);
            }else if (data.description.includes("--")){
                console.log(data.description.slice(0, data.description.indexOf("--")))
            } else {
                console.log(data.description);
            }
        });
}
//===============================================
// HELPER FUNCTIONS
//===============================================
const resetValues = () => {
    userInput.value = "";
    card.innerHTML = "";
}

function generateResult(data) {
    keys = []; // Empty the array

    for (let i = 0; i < data.length; i++) {
        const el = document.createElement("div");
        el.className = "border border-info w-25 mx-auto";
        const html = `<h2>Author: ${data[i].authors[0].name}</h2>
                  <h3>Title: ${data[i].title}</h3>
                  <button class= "btn bg-info" id=button${i + 1}>Learn More</button>`;
        keys.push(data[i].key);
        el.innerHTML = html;
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
})