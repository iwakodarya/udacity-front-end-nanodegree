// Show a 2 second banner to the user on success or failure of action
const displayBanner = (message, success = true) => {
    const banner = document.createElement('div');
    if (success) {
        banner.classList.add('banner-success');
    } else banner.classList.add('banner-failure');
    banner.innerHTML = message;
    document.body.appendChild(banner);
    setTimeout(() => {
        banner.remove();
    }, 20000);
};

export { displayBanner };
