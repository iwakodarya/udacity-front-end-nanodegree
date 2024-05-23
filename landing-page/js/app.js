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
    const box = sectionElement.getBoundingClientRect();

    if (box.top <= 150 && box.bottom >= 150)
        return true;
    else 
        return false;
};

function getSectionIDFromName(name){
    return name.toLowerCase().split(' ').join('');
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport
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

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
const navBarFragment = document.createDocumentFragment();

for (node of sectionNodes){
    const navBarSectionNode = document.createElement('li');
    navBarSectionNode.innerText = node.dataset.nav;
    navBarSectionNode.id = 'nav__' + node.id;
    navBarFragment.appendChild(navBarSectionNode);
};

document.querySelector('#navbar__list').appendChild(navBarFragment);

// Scroll to section on link click
const navBarArea = document.getElementById('navbar__list');

navBarArea.addEventListener('click', function(event){
    const clickedSection = document.getElementById(event.target.id.replace('nav__', ''));
    clickedSection.scrollIntoView({behavior: "smooth"});
});

// Set sections as active
window.addEventListener('scroll', updateActiveSection);

