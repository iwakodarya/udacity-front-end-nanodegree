import { handleCitySearch } from './newTripFlow.js';

export const SERVER_PATH_BASE = 'http://localhost:3000';

export const state = {
    selectedTripId: '',
    destSuggestionsList: '',
}

// Set up event listeners for given modalId
const setUpInputModal = (triggerButtonId, modalId, submitCallback) => {
    const triggerButton = document.getElementById(triggerButtonId);
    const modal = document.getElementById(modalId);
    const closeButton = modal.getElementsByClassName('close-x')[0];

    triggerButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) modal.style.display = 'none';
    });

    modal.addEventListener('submit', (event) => {
        modal.style.display = 'none';
        submitCallback(event);
    });

    // Additional behavior for specific modals
    document.getElementById('destName').addEventListener('input', (event) => {
        if (event.target.value.length >= 2)
            handleCitySearch(event.target.value);
        else document.getElementById('city-suggestions-list').innerHTML = '';
    });

    document.getElementById('city-suggestions-list').addEventListener('click', (event) => {
        const destField = document.getElementById('destName')
        destField.value = event.target.innerHTML;

        document.getElementById('city-suggestions-list').innerHTML = '';
    });
};

// Show a 2 second banner to the user on success or failure of action
const displayBanner = (message, success = true) => {
    const banner = document.createElement('div');
    if (success) {
        banner.className = 'banner banner-success';
    } else banner.className = 'banner banner-failure';
    banner.innerHTML = message;
    document.getElementById('header').appendChild(banner);
    setTimeout(() => {
        banner.remove();
    }, 2000);
};

export { setUpInputModal, displayBanner };
