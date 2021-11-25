//=======================================================
// EVENT LISTENERS
//=======================================================

// Retrieve elements
const btnSearch = document.querySelector(".btn-search"); // Search button


// Import the needed functions
import { fetchSubject, fetchDescription } from "./fetch-functions";
import {keys, userInput, card} from "./view-index";

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