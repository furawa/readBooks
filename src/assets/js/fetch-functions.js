// Import the needed functions
import { fetchData, checkUserInput  } from "./helper-functions";
import {loadResults, resetValues, } from "./view-index";

// Retrieve the elements
const modalBody = document.querySelector(".modal-body"); // Body of the modal view
const modalTitle = document.querySelector(".modal-title"); // Title of the modal view

// Function to fetch the subject or category
export function fetchSubject(subj) {
    let subject = checkUserInput(subj); // Check the user input
    fetchData(`${process.env.BOOK_URL}/subjects/${subject}.json`)
        .then(data => loadResults(data.works)) // Generate the result section
        .catch(error => {
            console.log(error); // Log the error in the console
        });
    resetValues(); // Reset the values of the section
}

// Function to fetch the description
export function fetchDescription(key) {
    let desc = ""; // Initialize the variable to store the description
    fetchData(`${process.env.BOOK_URL}${key}.json`)
        .then(data => {
            if (typeof data.description === "object") { // Check if it is an object
                desc = data.description.value.split("--")[0]; // If so the description is in value
            } else if (typeof data.description == "string") {
                desc = data.description.split("--")[0]; // else if string the description is in description, both case we remove the links after ---
            } else {
                desc = "Sorry! There is No description available for this Book"; // otherwise there is no description
            }
            modalTitle.textContent = `${data.title}`; // Insert the title of the modal view

            // Insert the body of the modal view
            modalBody.innerHTML = `<p><span class="text-decoration-underline">Description</span><br><br>${desc}</p>`;
        });
}


