/* Global Variables */
const API_KEY = 'appid=6a2226893c5e31321eaf6e67aaf363da&units=imperial'
const OPEN_WEATHER_MAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

async function getCurrentWeather(base_url, zip, api_key) {
    const response = await fetch(base_url + api_key + '&zip=' + zip);

    // Checking if response is valid, throwing explicit error if invalid
    // Noting .json() will still work fine on invalid response
    try {
        if (!response.ok)
            throw new Error("Invalid response.")
        return await response.json();
    }
    catch (err) {
        console.log(`Error gettiing weather data:: ${err}`)
        alert("Something isn't right. Make sure the zipcode is valid.")
    }
};

async function postData(path, data) {
    const response = await fetch(path, {
        method: 'POST',
        //credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    try {
        return await response.json();
    }
    catch (error) {
        console.log(`Error at postData():: ${error}`);
    }
};

async function getAllData(path) {
    const response = await fetch('/all');

    try {
        return response.json();
    }
    catch (error) {
        console.log(`Error getting data:: ${error}`)
    }
};

function displayMostRecentEntries(entriesArray) {
    const entryHolderElem = document.getElementById('entryHolder');
    // Remove current shown entries first
    entryHolderElem.innerHTML = '';
    // Populate with latest entries
    entriesArray.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.innerHTML =
            `
            <div>${entry.date}: ${entry.temperature}F</div>
            <div id="response">${entry.response}</div>
            `
        entryHolderElem.appendChild(entryDiv);
    })
};

async function generateJournalEntry() {
    // Get user entered zip code
    const inputZip = document.getElementById('zip').value;
    // Get user entered response 
    const inputResponse = document.getElementById('feelings').value;

    // Create a new date instance dynamically with JS
    const d = new Date();
    const todayDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

    // Get temperature for entered zip code
    const currentWeather = await getCurrentWeather(OPEN_WEATHER_MAP_BASE_URL, inputZip, API_KEY);
    if (!currentWeather)
        return;

    const entryData = { 'date': todayDate, 'temperature': currentWeather['main']['temp'], 'response': inputResponse };

    // Post data and display last entry
    postData('/addEntry', entryData)
        .catch(err => console.log(`Error posting entry:: ${err}`))
        .then(() => getAllData('/all'))
        .catch(err => console.log(`Error getting all entries:: ${err}`))
        .then(response => displayMostRecentEntries(response))
        .catch(err => console.log(`Error displaying last entry:: ${err}`));
};

// On page load, show recent entries already in server (technically isn't required by project)
document.addEventListener('DOMContentLoaded',
    () => {
        getAllData()
            .then(data => displayMostRecentEntries(data))
            .catch(err => console.log(`Error displaying past entries:: ${err}`))
    }
);

// Event listener for "Generate" button click, initiates adding new entry
generateButton = document.getElementById('generate');
generateButton.addEventListener('click', generateJournalEntry);