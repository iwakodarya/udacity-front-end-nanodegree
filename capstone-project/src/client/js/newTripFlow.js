import { displayBanner, SERVER_PATH_BASE } from './common.js';
import { displayTrips } from './sidePanel.js';


const createNewTrip = async (submitEvent) => {
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
};

export { createNewTrip };
