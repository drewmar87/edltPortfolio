// Toggle Menu for Mobile View
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close the menu on mobile after clicking
        if (window.innerWidth < 768) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Add shadow to nav on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    }
});

// Toggle additional badges accordion
function toggleBadges() {
    const content = document.getElementById('additionalBadges');
    const toggle = document.querySelector('.accordion-toggle');
    
    content.classList.toggle('active');
    toggle.classList.toggle('active');
}
