// Retrieve the needed elements 

const userInput = document.getElementById("userInput"); // Input element
const card = document.getElementById("cardResult"); // Section of the book results
const btnSearch = document.querySelector(".btn-search"); // Search button
const modalBody = document.querySelector(".modal-body"); // Body of the modal view
const modalTitle = document.querySelector(".modal-title"); // Title of the modal view
const error = document.getElementById("error"); // Div for the error message
let keys = [];
//===============================================
// HELPER FUNCTIONS
//===============================================

// Funciton to reset the input and the section result content
function resetValues() {
    userInput.value = "";
    card.innerHTML = "";
}

// Function to  generate each div for each book 
function generateResult(data) {
    keys = []; // Empty the array where keys will be stored
    // Loop through the array of results from the fetched data
    for (let i = 0; i < data.length; i++) {
        const el = document.createElement("div"); // Create a div
        if (i % 2 == 0) { // If the element is pair, just for the sm breakpoint
            el.className = "result ms-sm-auto mx-md-auto col-8 col-md-5 col-lg-4 p-0 d-flex flex-column flex-sm-row border rounded-3 border-info";
        } else { // If the element is odd, just for the sm breakpoint
            el.className = "result me-sm-auto mx-md-auto col-8 col-md-5 col-lg-4 p-0 d-flex flex-column flex-sm-row border rounded-3 border-info";
        }
        // Elements of the div result
        const book = `<img src="https://covers.openlibrary.org/b/id/${data[i].cover_id}-M.jpg" alt="${data[i].title} Book cover">
                      <div class="d-flex flex-column flex-grow-1 justify-content-between">
                        <h2>Author</h2> <p>${data[i].authors[0].name}</p>
                        <h3>Title</h3><p>${data[i].title}</p>
                        <button data-bs-toggle="modal" data-bs-target="#modalDesc" type="button" class="align-self-center btn btnt bg-info" id=button${i + 1}>Learn More</button>
                      </div>`
        keys.push(data[i].key); // Insert the description key of the book
        el.innerHTML = book; // Insert the elements in the div
        card.appendChild(el); // Append the div in the section of results
        card.scrollIntoView(); // Scroll to view all the div results
    }
}

// Function to show the error message
const showInputErrorMessage = (msg) => {
    error.textContent = msg;
    error.className = "d-inline-block border bg-danger text-light mb-2";
}

//=======================================================
// EVENT LISTENERS
//=======================================================

// Add event listener on the search button
btnSearch.addEventListener("click", () => {
    fetchSubject(userInput.value);
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