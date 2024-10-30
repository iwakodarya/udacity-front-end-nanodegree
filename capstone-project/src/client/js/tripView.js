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
    // Fetch trip data
    const tripData = await loadTrip(tripId);

    // Load header
    const tripHeader = document.getElementById('trip-header');
    tripHeader.innerHTML = '';
    const tripName = document.createElement('h1');
    tripName.innerHTML = tripData.tripName;
    tripHeader.appendChild(tripName);

    // Show actions
    document.getElementById('trip-actions').style.display = 'block';

    // View destination details
    const tripDetails = document.getElementById('trip-details');
    tripDetails.innerHTML = '';
    tripData.destinations.forEach((dest) => viewDestination(dest));
}

async function viewDestination(destination) {
    const destDiv = document.createElement('div');
    destDiv.classList.add('destination');

    // Header
    const destHeader = document.createElement('div');
    destHeader.classList.add('dest-header');
    const destName = document.createElement('h2');
    destName.innerHTML = destination.destName;
    const destImg = document.createElement('img');
    destImg.setAttribute('src', destination.img);
    destHeader.appendChild(destName);
    destHeader.appendChild(destImg);
    destDiv.appendChild(destHeader);

    // Daily view with forecast
    // TODO

    // Append to main div
    const tripDetails = document.getElementById('trip-details');
    tripDetails.appendChild(destDiv);
}

export { viewTrip };
