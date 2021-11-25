// Retrieve the needed elements 
export const userInput = document.getElementById("userInput"); // Input element
export const card = document.getElementById("cardResult"); // Section of the book results
const error = document.getElementById("error"); // Div for the error message
export let keys = [];

// Function to reset the input and the section result content
export const resetValues = () => {
    userInput.value = "";
    card.innerHTML = "";
}

// Function to  generate each div for each book 
const generateResult = (data) => {
    keys = []; // Empty the array where keys will be stored
    // Check if there is a result from the fetch if not show a message
    data.length == 0 ? card.innerHTML = `<p class="display-3">No Result Found!</p>`: card.innerHTML = "";
    // Loop through the array of results from the fetched data
    for (let i = 0; i < data.length; i++) {
        const el = document.createElement("div"); // Create a div
        if (i % 2 == 0) { // If the element is pair, just for the sm breakpoint
            el.className = "result col-8 ms-sm-auto mx-lg-auto col-lg-4 p-0 d-flex flex-column flex-sm-row border rounded-3 border-info";
        } else { // If the element is odd, just for the sm breakpoint
            el.className = "result col-8 me-sm-auto mx-lg-auto col-lg-4 p-0 d-flex flex-column flex-sm-row border rounded-3 border-info";
        }
        // Elements of the div result
        const book = `<img src="${process.env.COVER_URL}/${data[i].cover_id}-M.jpg" alt="${data[i].title} Book cover">
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
export const showInputErrorMessage = (msg) => {
    error.textContent = msg;
    error.className = "visible p-1 w-75 mx-auto text-light mb-2";
}


// Function to load the results after an amount of time
export const loadResults = (data) => {
    card.innerHTML = `<p class="display-2">Loading...</p>`;
    setTimeout(() => {
        generateResult(data);
    },3000);
}
