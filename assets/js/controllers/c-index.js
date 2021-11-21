//==========================================
// FETCH FUNCTIONS
//==========================================

//Function to fetch an url
const fetchData = async url => {
        return  await fetch(url) // Fetch the url
                .then(checkStatus) // Check the status of the response
                .then(res => res.json()) // Turn the response into json file
                .catch(error =>  {       // Catch a potential error
                    console.log(error);  // Log the error in the console
                })   
}

// Function to fetch the subject or category
const fetchSubject = (subj) => {
    let subject = checkUserInput(subj); // Check the user input
    fetchData(`https://openlibrary.org/subjects/${subject}.json`)
        .then(data => loadResults(data.works)) // Generate the result section
        .catch(error => {
            console.log(error);  // Log the error in the console
        });
    resetValues(); // Reset the values of the section
}

// Function to fetch the description
const fetchDescription = key => {
    let desc = ""; // Initialize the variable to store the description
    fetchData(`https://openlibrary.org${key}.json`)
        .then(data => {
            if (typeof data.description === "object") {       // Check if it is an object
                desc = data.description.value.split("--")[0]; // If so the description is in value
            } else if (typeof data.description == "string") {
                desc = data.description.split("--")[0];       // else if string the description is in description, both case we remove the links after ---
            } else {
                desc = "Sorry! There is No description available for this Book"; // otherwise there is no description
            }
            modalTitle.textContent = `${data.title}`; // Insert the title of the modal view
            // Insert the body of the modal view
            modalBody.innerHTML = `<p><span class="text-decoration-underline">Description</span><br><br>${desc}</p>`;
        })
}

// Function to check the status of the fetch response
const checkStatus = response => {
    // If the input variable is undefined the response will be ok, 
    // consider an ok response only if undefined is not in the url
    if(response.ok === true && !response.url.includes("undefined")) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// Function to check the user input and parse it if necessary
const checkUserInput = (val) => {
    let message = ""; // Variable to store the error message
    if (val == "") {
        message =  "No empty string allowed! You should Enter a book category";
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
