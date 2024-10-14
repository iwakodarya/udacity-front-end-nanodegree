const SERVER_PATH_BASE = 'http://localhost:3000';

async function displayTrips() {
    const trips = await getAllTrips();
    const sidePanelTripsList = document.getElementById('trips-list');
    sidePanelTripsList.innerHTML = '';

    // Upcoming
    const upcomingTripsDiv = document.createElement('div');
    const upcomingHeader = document.createElement('h2');
    upcomingHeader.innerHTML = `Upcoming`;
    upcomingTripsDiv.appendChild(upcomingHeader);

    // Past
    const pastTripsDiv = document.createElement('div');
    const pastTripsHeader = document.createElement('h2');
    pastTripsHeader.innerHTML = `Past`;
    pastTripsDiv.appendChild(pastTripsHeader);

    for (const trip of trips) {
        const tripButton = document.createElement('div');
        tripButton.classList.add('trip-button');
        tripButton.setAttribute('data-trip-id', trip.tripId);
        tripButton.innerHTML = `
            <h3>${trip.tripName}</h3>
            <p>🗓 ${trip.startDate}</p>
        `;
        if (Date.parse(trip.endDate) >= Date.now())
            upcomingTripsDiv.appendChild(tripButton);
        else pastTripsDiv.appendChild(tripButton);
    }

    sidePanelTripsList.appendChild(upcomingTripsDiv);
    sidePanelTripsList.appendChild(pastTripsDiv);
}

async function getAllTrips() {
    // get all existing trips from server
    try {
        const response = await fetch(SERVER_PATH_BASE + '/loadtrips');
        if (!response.ok) {
            throw new Error(`Error in loadTrips():: ${response.error}`);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.log(`Error in loadTrips():: ${error.message}`);
    }
}

export { displayTrips };
