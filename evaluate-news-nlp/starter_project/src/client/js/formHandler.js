import { isValidURL } from './nameChecker'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid and if valid
    if (!isValidURL(formText))
        return;

    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: formText
    }).then(
        (response) => console.log("Receieved response: ", response)
    ).catch(
        (err)=>(console.log("Error on handleSubmit():: ", err))
    )
}

// Export the handleSubmit function
export { handleSubmit };

