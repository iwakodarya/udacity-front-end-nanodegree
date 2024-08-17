/* Global Variables */
const API_KEY = 'appid=6a2226893c5e31321eaf6e67aaf363da&units=imperial'
const OPEN_WEATHER_MAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

async function getCurrentWeather(base_url, zip, api_key) {
    const response = await fetch(base_url + api_key + '&zip=' + zip);
    
    try {
        const weatherInfo = await response.json()
        return weatherInfo;
    }
    catch (error) {
        console.log(`Error at getCurrentWeather():: ${error}`);
    }
};

async function postData(path, data) {
    const response = await fetch(path, {
        method: 'POST',
        //credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });

    try {
        const newData = response.json();
        return newData;
    }
    catch(error) {
        console.log(`Error at postData():: ${error}`);
    }
};

async function generateJournalEntry() {
    // Get user entered zip code
    const inputZip = document.getElementById('zip').value;
    // Get user entered response 
    const inputResponse = document.getElementById('feelings').value;

    // Create a new date instance dynamically with JS
    const d = new Date();
    const todayDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

    // Get temperature for entered zip code
    const currentWeather = await getCurrentWeather(OPEN_WEATHER_MAP_BASE_URL, inputZip, API_KEY);
    const entryData = {'date': todayDate, 'temperature': currentWeather['main']['temp'], 'response': inputResponse};

    // Post data
    const lastPostedData = await postData('/addEntry', entryData);
    console.log('I got', lastPostedData);
};

// Event listener for "Generate" button click
generateButton = document.getElementById('generate');
generateButton.addEventListener('click', generateJournalEntry);