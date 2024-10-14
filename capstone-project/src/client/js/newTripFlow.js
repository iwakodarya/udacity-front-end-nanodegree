import { displayBanner } from './common';

const SERVER_PATH_BASE = 'http://localhost:3000';

const newTripEventsSetUp = () => {
    const addNewTripButton = document.getElementById('add-trip-button');
    const addNewTripModal = document.getElementById('new-trip-modal');
    const addNewTripClose =
        addNewTripModal.getElementsByClassName('close-x')[0];

    addNewTripButton.addEventListener('click', () => {
        addNewTripModal.style.display = 'block';
    });

    addNewTripClose.addEventListener('click', () => {
        addNewTripModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == addNewTripModal)
            addNewTripModal.style.display = 'none';
    });

    addNewTripModal.addEventListener('submit', () => {
        addNewTripModal.style.display = 'none';
    });
};

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
    } catch (error) {
        displayBanner(`❌ Error: ${error.message}`, false);
    }
};

export { newTripEventsSetUp, createNewTrip };
