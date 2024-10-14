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

export { displayBanner };
