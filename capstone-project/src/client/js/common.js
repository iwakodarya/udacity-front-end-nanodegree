export const SERVER_PATH_BASE = 'http://localhost:3000';

// Set up event listeners for given modalId
const setUpInputModal = (triggerButtonId, modalId, submitCallback) => {
    const triggerButton = document.getElementById(triggerButtonId);
    const modal = document.getElementById(modalId);
    const closeButton =
        modal.getElementsByClassName('close-x')[0];

    triggerButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal)
            modal.style.display = 'none';
    });

    modal.addEventListener('submit', (event) => {
        modal.style.display = 'none';
        submitCallback(event);
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

export { setUpInputModal, displayBanner  };
