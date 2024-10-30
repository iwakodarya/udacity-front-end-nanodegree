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
    // Create a day card for each date from start to end date
    // Create a date range
    const destDays = [];
    const end = new Date(destination.endDate);
    let curr = new Date(destination.startDate);

    console.log(`start: ${curr}, end: ${end}`);

    while (curr <= end) {
        destDays.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
    }
    console.log(`date range = `, destDays);

    destDays.forEach((day, index) => {
        const destDay = document.createElement('div');
        destDay.classList.add('dest-day-view');
        const date = document.createElement('h4');
        date.innerHTML = `Day ${index+1}: ${day.toLocaleDateString('en-US', { timeZone: 'UTC'})}`;
        destDay.appendChild(date);

        // Add forecast weather if available
        const forecast = destination.weatherForecast.find(
            (forecast) => forecast.date == day.toISOString().slice(0, 10)
        );
        const forecastDiv = document.createElement('div');
        if (forecast) {
            forecastDiv.innerHTML = `Forecast: ${forecast.temp}C`;
        } else forecastDiv.innerHTML = 'Forecast not available.';
        destDay.appendChild(forecastDiv);

        destDiv.appendChild(destDay);
    });

    // Append to main div
    const tripDetails = document.getElementById('trip-details');
    tripDetails.appendChild(destDiv);
}

export { viewTrip };
