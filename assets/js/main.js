// Theme Toggle
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
const themeStyle = document.getElementById('theme-style');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    themeStyle.href = savedTheme;
    themeToggleBtn.classList.toggle('active', savedTheme.includes('color-2'));
}

themeToggleBtn.addEventListener('click', function() {
    if (themeStyle.href.includes('color-1')) {
        themeStyle.href = 'assets/css/skins/color-2.css';
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeStyle.href = 'assets/css/skins/color-1.css';
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
    themeToggleBtn.classList.toggle('active');
    localStorage.setItem('theme', themeStyle.href);
});

// Preloader
window.addEventListener('load', function() {
    document.querySelector('.preloader').classList.add('fade-out');
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
    }, 600);
});

// Navigation Menu
const navToggler = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('.nav-menu');

navToggler.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    navToggler.classList.toggle('active');
});

// Section Active
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-target');
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Portfolio Item Details
const portfolioItemsList = document.querySelectorAll('.portfolio-item');
const portfolioPopup = document.querySelector('.portfolio-popup');
const closePopup = document.querySelector('.pp-close');
const popupCounter = document.querySelector('.pp-counter');
const popupMain = document.querySelector('.pp-main');
const popupDetails = document.querySelector('.pp-details');
const popupDetailsBtn = document.querySelector('.pp-project-details-btn');

portfolioItemsList.forEach(item => {
    item.addEventListener('click', function() {
        portfolioPopup.classList.add('open');
        document.body.classList.add('hide-scrollbar');
    });
});

closePopup.addEventListener('click', function() {
    portfolioPopup.classList.remove('open');
    document.body.classList.remove('hide-scrollbar');
});

popupDetailsBtn.addEventListener('click', function() {
    popupDetails.classList.toggle('open');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Typing Animation
const typed = new Typed('.typing', {
    strings: ['Data Scientist', 'Web Developer', 'UI/UX Designer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Testimonial Slider
const testimonialSlider = document.querySelector('.testi-slider');
const testimonialItems = document.querySelectorAll('.testi-item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

function showTestimonial(index) {
    testimonialItems.forEach(item => item.classList.remove('active'));
    testimonialItems[index].classList.add('active');
}

prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(currentIndex);
});

nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    showTestimonial(currentIndex);
});

// Auto Play Testimonial
setInterval(function() {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    showTestimonial(currentIndex);
}, 5000); 