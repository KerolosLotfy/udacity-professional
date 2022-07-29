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

// add (sections) varible to select all sections.
const sections = document.querySelectorAll("section");

//  add (navBarList) varible to select nav list.
const navBarList = document.querySelector("#navbar__list");

// add scroll up button
const btnUp = document.querySelector('#btnUp');

// edit section number (i)
let secNum = document.querySelectorAll(".secNum")

// add class for navBarList in Responsive case 
let navIcon = document.querySelector(".menu__icon");


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function buildNav() {
    for (let i = 0; i < sections.length; i++) {
    let listItem = document.createElement("li");
    let menuLink = document.createElement("a");
    menuLink.className = "menu__link"
    menuLink.setAttribute("href", `#${sections[i].id}`);
    menuLink.innerText = sections[i].dataset.nav;
    navBarList.appendChild(listItem)
    listItem.appendChild(menuLink);
    };
};




/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

buildNav();
    

// Add class 'active' to section when near top of viewport
window.onscroll = function () {
    for (let section of sections) {
        let sectionTop = section.getBoundingClientRect().top;
        let activeLink = document.querySelector(`a[href = "#${section.id}"]`);
        if (sectionTop >= 0 && sectionTop < 300) {
            section.classList.add("your-active-class");
            activeLink.classList.add("active");
            
        } else {
            section.classList.remove("your-active-class");
            activeLink.classList.remove("active");
        }
    };

    // to show or hide scroll up button
    if (window.scrollY >= 200) {
        btnUp.style.display = "block";
    } else {
        btnUp.style.display = "none";
    }
    
};







// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// add click event for scroll up button
btnUp.addEventListener('click', function () {
    window.scrollTo({
        behavior: 'smooth',
        top: 0,
    })
});

// add click event to show and hide menu icon 
navIcon.addEventListener("click", () => {
    navIcon.classList.toggle('show');

}); 

// Build menu

// Scroll to section on link click

sections.forEach(section => {
    let menuLink = document.querySelector(`a[href = "#${section.id}"]`);
    menuLink.addEventListener("click", function (event) {
        event.preventDefault();        
        section.scrollIntoView({ behavior: "smooth" });
    });
});


// Set sections as active

// edit postion  for even children 
secNum.forEach((el, i) => {
    if ((i+1) % 2 === 0) { 
        secNum[i].style.right = "90%";
    }
})





