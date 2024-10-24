import { SERVER_PATH_BASE } from './common.js';

async function loadTrip(tripId) {
    try {
        const response = await fetch(SERVER_PATH_BASE + '/trip/' + tripId);
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(`Error in loadTrip():: ${error.message}`);
    }
}

async function viewTrip(tripId) {
    const tripData = await loadTrip(tripId);
    console.log(tripData);
    // TODO: this function will load all the details for a trip
    const tripHeader = document.getElementById('trip-header');
    tripHeader.innerHTML = '';

    const tripName = document.createElement('h1');
    tripName.innerHTML = tripData.tripName;
    tripHeader.appendChild(tripName);

    document.getElementById('trip-actions').style.display = 'block';
}

export { viewTrip };
