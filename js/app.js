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
 * Define Global Variables
 * 
*/
// Calculate Page performance 
const startingTime = performance.now();

// Landing page variables
const documentRoot = document.documentElement;
const scrollTopButton = document.getElementById("scrollTopButton");
const allSections = document.querySelectorAll('section[data-nav]');
const listItemsHolder = document.createDocumentFragment();

let navLinksContainer = document.getElementById("navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Hide and Show scroll to top button function
let toggleButtonAndHeaderOnScroll = () => {
    // Get View Port height - header height
    let viewportHeight = documentRoot.clientHeight - 52;

    // Check if visible part of page is scrolled
    if (documentRoot.scrollTop >= viewportHeight) {
        // Show button
        scrollTopButton.classList.add("--show");
    } else {
        // Hide button
        scrollTopButton.classList.remove("--show");
    }

    // Hide header if page is scrolled by 150
    const pageHeader = document.querySelector("header.page__header");
    if (documentRoot.scrollTop >= 150) {
        // Hide Header
        pageHeader.classList.add("--hide");
    } else {
        // Show Header
        pageHeader.classList.remove("--hide");
    }
};

// scroll to top
let scrollPageToTheTop = () => {
    // Scroll to top logic
    documentRoot.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
let buildNavigation = () => {
    toggleButtonAndHeaderOnScroll();
    for (const section of allSections) {
        const listItem = document.createElement('li');
        const listItemAnchor = document.createElement('a');
        const inputCheckbox = section.childNodes[1].childNodes[1];
        inputCheckbox.checked = true;
        listItem.className = section.className;
        listItemAnchor.href = '#' + section.id;
        listItemAnchor.textContent = section.dataset.nav;
        listItem.appendChild(listItemAnchor);
        listItemsHolder.appendChild(listItem);
    }
    navLinksContainer.appendChild(listItemsHolder);
};

// Add class 'active' to section when near top of viewport
let activateWhenInViewport = () => {
    toggleButtonAndHeaderOnScroll();
    for (const section of allSections) {
        const sectionOutline = section.getBoundingClientRect();
        const anchorSelector = `a[href="#${section.id}"]`;
        const getAnchor = document.querySelector(anchorSelector);
        if (
            sectionOutline.top >= 0 &&
            sectionOutline.left >= 0 &&
            sectionOutline.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            sectionOutline.right <= (window.innerWidth || document.documentElement.clientWidth)

        ) {
            getAnchor.parentNode.classList.add("--active");
            section.classList.add("--active");

        } else {
            getAnchor.parentNode.classList.remove("--active");
            section.classList.remove("--active");
        }
    }

};

// Scroll to anchor ID using scrollTO event
let scrollToSection = (e) => {
    if (e.target.nodeName.toLowerCase() === 'a') {
        e.preventDefault();
        const sectionID = document.querySelector(e.target.hash);
        const sectionTopScrollSpace = sectionID.offsetTop;

        documentRoot.scrollTo({
            top: sectionTopScrollSpace,
            behavior: "smooth"
        });
    }
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavigation);

// Scroll to section on link click
navLinksContainer.addEventListener("click", scrollToSection);

// Set sections as active, Show/Hide Header and show/hide scroll to top button
document.addEventListener("scroll", activateWhenInViewport);

// Scroll to top button click
scrollTopButton.addEventListener("click", scrollPageToTheTop);

// Time Taken for code to execute
const endingTime = performance.now();
console.log('This code took ' + (endingTime - startingTime) + ' milliseconds.');