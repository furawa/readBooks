//===============================================
// HELPER FUNCTIONS
//===============================================
import {showInputErrorMessage} from "./view-index";

// Function to check the status of the fetch response
function checkStatus(response) {
    // If the input variable is undefined the response will be ok, 
    // consider an ok response only if undefined is not in the url
    if (response.ok === true && !response.url.includes("undefined")) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// Function to check the user input and parse it if necessary
export function checkUserInput(value) {
    let message = ""; // Variable to store the error message
    const val = value.trim();
    
    if (val == "") {
        message = "No empty string allowed! You should Enter a book category";
        showInputErrorMessage(message);
    } else if (typeof Number(val) === "number" && !isNaN(Number(val))) {
        message = `${val} is not a book category, you should enter a word as fantasy`;
        showInputErrorMessage(message);
    } else if (val.split(" ").length > 1) {
        return val.split(" ")[0].toLowerCase(); // If many words are present we search just for the first one
    } else {
        error.className = "invisible"; // No error detected, disable the error message 
        return val.toLowerCase();
    }
}

//Function to fetch an url
export const fetchData = async url => {
    try {
        const data =  await fetch(url) // Fetch the url
        const response = await checkStatus(data);
        return response.json(); 
    }catch(error) {
        console.log(error); // Log the error in the console
    }
}

// Function to parse the description as there are strings not needed
export const parseDescription = desc => {
    if (typeof desc === "object") { // Check if it is an object
        return desc.value.split("--")[0]; // If so the description is in value
    } else if (typeof desc == "string") {
        return desc.split("--")[0]; // else if string the description is in description, both case we remove the links after ---
    } else {
        return "Sorry! There is No description available for this Book"; // otherwise there is no description
    }
}