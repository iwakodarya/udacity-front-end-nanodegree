const SERVER_PATH_BASE = 'http://localhost:3000';

async function loadTrip(tripId) {
    try {
        const response = await fetch(SERVER_PATH_BASE + '/trip/' + tripId);
        const responseData = await response.json();
        viewTrip(responseData);
    } catch (error) {
        console.log(`Error in loadTrip():: ${error.message}`);
    }
}

function addDestination() {
    // pop up a section for search and add destination
    console.log('add destination flow started');
}

function viewTrip(tripData) {
    console.log(tripData);
    // TODO: this function will load all the details for a trip
    const tripHeader = document.getElementById('trip-header');
    tripHeader.innerHTML = '';

    const tripName = document.createElement('h1');
    tripName.innerHTML = tripData.tripName;
    tripHeader.appendChild(tripName);

    document.getElementById('trip-actions').style.display = 'block';
}

export { loadTrip, addDestination };
