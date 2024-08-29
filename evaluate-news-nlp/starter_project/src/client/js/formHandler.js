import { isValidURL } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;
    const currResults = document.getElementById('results');
    // Clear any current results shown
    currResults.innerHTML = ''; 

    // Check if the URL is valid and if valid
    if (!isValidURL(formText))
        return;

    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'URL': formText })
    }).then(
        (response) => response.json()
    ).then(
        (result) => {
            const resultDisplay = document.createElement('p');
            resultDisplay.innerHTML =
                `Irony sentiment -> ${result.irony} <br>
                 Polarity sentiment -> ${result.polarity} <br>
                 Subjectivity sentiment -> ${result.subjectivity}`;
            currResults.appendChild(resultDisplay);
        }
    ).catch(
        (err) => (console.log("Error on handleSubmit():: ", err))
    )
}

// Export the handleSubmit function
export { handleSubmit };

