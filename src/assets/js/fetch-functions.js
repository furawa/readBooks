// Import the needed functions
import { fetchData, checkUserInput, parseDescription  } from "./helper-functions";
import {generateModal, loadResults, resetValues, userInput, } from "./view-index";
let previousSubject = "";


// Function to fetch the subject or category
export const fetchSubject = async (subj) => {
    const subject = checkUserInput(subj); // Check the user input
    if (subject === previousSubject) {
        userInput.value = "";
        return;
    } else {
        previousSubject = subject;
        const data = await fetchData(`${process.env.BOOK_URL}/subjects/${subject}.json`);
        resetValues(); // Reset the values of the section
        return loadResults(data.works);
    }
}

// Function to fetch the description
export const fetchDescription = async key => {
    const data = await fetchData(`${process.env.BOOK_URL}${key}.json`);
    const desc = parseDescription(data.description);
    generateModal(data.title, desc); 
}
