/* Global Variables */
const API_KEY = '6a2226893c5e31321eaf6e67aaf363da&units=imperial'
const OPEN_WEATHER_MAP_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

async function getCurrentWeather(zipcode) {
    const response = await fetch(OPEN_WEATHER_MAP_BASE_URL + API_KEY + '&zip' + zipcode);
    
    try {
        const weatherInfo = await response.json()
        return weatherInfo;
    }
    catch (error) {
        console.log(error);
    }
};