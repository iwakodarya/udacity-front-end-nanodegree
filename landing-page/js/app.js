/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sectionNodes = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function isSectionTopOfViewPort(sectionElement){
    const distanceToTop = sectionElement.getBoundingClientRect().top;

    if (distanceToTop >=0 & distanceToTop <= 0.5*visualViewport.height)
        return true;
    else 
        return false;
};

function updateActiveSection(){
    //loop over sections and update classes as needed 
    for (node of sectionNodes){
        if (isSectionTopOfViewPort(node)){
            node.classList.add('active-section');
        }
        else
            node.classList.remove('active-section');
    }
};

function getSectionIDFromName(name){
    return name.toLowerCase().split(' ').join('');
};

function scrollToSection(){
    //scroll to section X?
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navBarFragment = document.createDocumentFragment();

for (node of sectionNodes){
    const navBarSectionNode = document.createElement('li');
    navBarSectionNode.innerText = node.dataset.nav;
    navBarFragment.appendChild(navBarSectionNode);
};

document.querySelector('#navbar__list').appendChild(navBarFragment);

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', updateActiveSection);

// Scroll to anchor ID using scrollTO event
const navBarArea = document.getElementById('navbar__list');

navBarArea.addEventListener('click', function(event){
    const clickedSection = document.getElementById(getSectionIDFromName(event.target.innerText));
    clickedSection.scrollIntoView({behavior: "smooth"});
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


