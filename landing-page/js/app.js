/* Global Variables */
const sectionNodes = document.querySelectorAll('section');

/* Helper Functions */

/**
 * @description Checks whether given section is top of viewport or not
 * @returns Boolean, true if on top of viewport 
*/
function isSectionTopOfViewPort(sectionElement) {
    const box = sectionElement.getBoundingClientRect();

    if (box.top <= 150 && box.bottom >= 150)
        return true;
    else
        return false;
}; 

/**
 * @description Scrolls to section clicked by the user in the nav bar
*/
function scrollSectionIntoView(navSectionNode) {
    // Identify the clicked section based on id of the target node
    const clickedSection = document.getElementById(navSectionNode.id.replace('nav__', ''));
    // Scroll to clicked section
    clickedSection.scrollIntoView({ behavior: "smooth" });
};

/* Main Functions */

/** 
 * @description Creates dynamic navigation bar in the header
*/
function createNavigationBar(){
    const navBarFragment = document.createDocumentFragment();

    for (node of sectionNodes) {
        const navBarSectionNode = document.createElement('li');
        navBarSectionNode.innerHTML = node.dataset.nav;
        navBarSectionNode.classList.add('menu__link');
        navBarSectionNode.id = 'nav__' + node.id;
        navBarFragment.appendChild(navBarSectionNode);
    };
    
    document.querySelector('#navbar__list').appendChild(navBarFragment);
};

/**
 * @description Adds a class 'active-section' to the section in the top of viewport
*/ 
function updateActiveSection() {
    for (node of sectionNodes) {
        let activeNavSection = document.getElementById('nav__' + node.id);
        if (isSectionTopOfViewPort(node)) {
            node.classList.add('active-section');
            activeNavSection.classList.add('active-section');
        }
        else {
            node.classList.remove('active-section');
            activeNavSection.classList.remove('active-section');
        }
    }
};

// Functionality to dynamically create the navigation bar in the header
createNavigationBar();

// Functionality for clicking to scroll to a given a section
const navBarArea = document.getElementById('navbar__list');

navBarArea.addEventListener('click', function (event) {
    event.preventDefault();
    scrollSectionIntoView(event.target);
});

// Functionality for updating styling on active section
window.addEventListener('scroll', updateActiveSection);

