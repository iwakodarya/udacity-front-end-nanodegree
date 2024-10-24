import { displayBanner, SERVER_PATH_BASE, state } from './common.js';
import { displayTrips } from './sidePanel.js';

async function createNewTrip(submitEvent) {
    submitEvent.preventDefault();
    // process submit event
    const formData = new FormData(submitEvent.target);
    const tripInfo = Object.fromEntries(formData);
    // send new trip data to server
    try {
        const response = await fetch(SERVER_PATH_BASE + '/addnewtrip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tripInfo)
        });
        if (!response.ok) {
            throw new Error(`Error in createNewTrip():: ${response.error}`);
        }
        const responseData = await response.json();
        displayBanner(`✅ ${responseData.message}`);
        displayTrips();
    } catch (error) {
        console.log(`Error in createNewTrip():: ${error.message}`);
        displayBanner(`❌ Error: ${error.message}`, false);
    }
}

function debounceSearch(callback) {
    let inputTimeout;
    return (searchStr) => {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(callback(searchStr), 2000);
    };
}

const handleCitySearch = debounceSearch((searchStr) => {
    getCityListMatch(searchStr);
});

async function getCityListMatch(searchStr) {
    try {
        const response = await fetch(
            SERVER_PATH_BASE + '/places-search/' + searchStr
        );
        state.destSuggestionsList = await response.json();
        displayCityList(state.destSuggestionsList);
    } catch (error) {
        displayNoCitiesFound();
    }
}

function displayCityList(cityList) {
    const suggestions = document.getElementById('city-suggestions-list');
    suggestions.innerHTML = '';

    cityList.forEach((city) => {
        const citySuggestion = document.createElement('li');
        citySuggestion.innerHTML = city.displayName;
        suggestions.appendChild(citySuggestion);
    });
}

function displayNoCitiesFound() {
    const suggestions = document.getElementById('city-suggestions-list')
    suggestions.innerHTML = 'No cities found.'
}

async function addDestination(submitEvent) {
    submitEvent.preventDefault();
    // process submit event
    const formData = new FormData(submitEvent.target);
    const destData = Object.fromEntries(formData);

    // get lat,lng from state
    destData.lat = state.destSuggestionsList.filter(city => city.displayName == destData.destName)[0].lat;
    destData.lng = state.destSuggestionsList.filter(city => city.displayName == destData.destName)[0].lng;

    console.log(destData);
    // TO DO: add data to selected trip Ids server side object
}

export { createNewTrip, addDestination, handleCitySearch };
