import { displayBanner, SERVER_PATH_BASE, state } from './common.js';
import { viewTrip } from './tripView.js';
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

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(
                `${response.status} server response in addDestination():: ${responseData.message}`
            );
        }

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
        const placesList = await response.json();
        displayCityList(placesList);
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
    const suggestions = document.getElementById('city-suggestions-list');
    suggestions.innerHTML = 'No cities found.';
}

async function addDestination(submitEvent) {
    submitEvent.preventDefault();
    // process submit event
    const formData = new FormData(submitEvent.target);
    const destData = Object.fromEntries(formData);

    // post data
    try {
        const response = await fetch(
            SERVER_PATH_BASE +
                '/add-destination-to-trip/' +
                state.selectedTripId,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(destData)
            }
        );
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(
                `${response.status} server response in addDestination():: ${responseData.message}`
            );
        }

        displayBanner(`✅ ${responseData.message}`);
        // Refresh trip with newly added destination
        viewTrip(state.selectedTripId);
    } catch (error) {
        console.log(`Error in addDestination():: ${error.message}`);
        displayBanner(`❌ Error: ${error.message}`, false);
    }
}

export { createNewTrip, addDestination, handleCitySearch };
