// Personal Website JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Navbar scroll effects
    initNavbarScrollEffects();
    
    // Contact form handling
    initContactForm();
    
    // Skill bar animations
    initSkillAnimations();
    
    // Intersection Observer for animations
    initScrollAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    
    if (mobileToggle && navbarNav) {
        mobileToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarNav.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navbarNav.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effects
function initNavbarScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a[href^="#"]');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateContactForm(formObject)) {
                // Simulate form submission
                submitContactForm(formObject);
            }
        });
    }
}

// Validate Contact Form
function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        errors.push('Please enter a subject (at least 3 characters)');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Form Errors
function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
    
    // Create error message container
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-error';
    errorContainer.style.cssText = `
        background: rgba(var(--color-error-rgb), 0.1);
        border: 1px solid var(--color-error);
        color: var(--color-error);
        padding: var(--space-12);
        border-radius: var(--radius-base);
        margin-bottom: var(--space-16);
        font-size: var(--font-size-sm);
    `;
    
    const errorList = document.createElement('ul');
    errorList.style.cssText = 'margin: 0; padding-left: var(--space-16);';
    
    errors.forEach(error => {
        const listItem = document.createElement('li');
        listItem.textContent = error;
        listItem.style.marginBottom = 'var(--space-4)';
        errorList.appendChild(listItem);
    });
    
    errorContainer.appendChild(errorList);
    
    // Insert error container at the top of the form
    const contactForm = document.getElementById('contactForm');
    contactForm.insertBefore(errorContainer, contactForm.firstChild);
    
    // Scroll to form to show errors
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Submit Contact Form
function submitContactForm(data) {
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showFormSuccess();
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Show Form Success
function showFormSuccess() {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-error, .form-success');
    existingMessages.forEach(message => message.remove());
    
    // Create success message
    const successContainer = document.createElement('div');
    successContainer.className = 'form-success';
    successContainer.style.cssText = `
        background: rgba(var(--color-success-rgb), 0.1);
        border: 1px solid var(--color-success);
        color: var(--color-success);
        padding: var(--space-12);
        border-radius: var(--radius-base);
        margin-bottom: var(--space-16);
        font-size: var(--font-size-sm);
        text-align: center;
        font-weight: var(--font-weight-medium);
    `;
    
    successContainer.textContent = 'Thank you for your message! I will get back to you soon.';
    
    // Insert success message at the top of the form
    const contactForm = document.getElementById('contactForm');
    contactForm.insertBefore(successContainer, contactForm.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successContainer.parentNode) {
            successContainer.remove();
        }
    }, 5000);
}

// Skill Bar Animations
function initSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                skillBar.classList.add('animate');
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.card, .project-card, .education-item, .timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Set initial state and observe elements
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        scrollObserver.observe(element);
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for mobile menu
function addMobileMenuCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .navbar-nav {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--color-surface);
                flex-direction: column;
                align-items: center;
                padding: var(--space-20) 0;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all var(--duration-normal) var(--ease-standard);
                border-top: 1px solid var(--color-border);
                box-shadow: var(--shadow-lg);
            }
            
            .navbar-nav.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .navbar-nav li {
                margin: var(--space-8) 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            .navbar-nav a.active {
                color: var(--color-primary);
            }
            
            .navbar-nav a.active::after {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize mobile menu CSS
addMobileMenuCSS();

// Preload images for better performance
function preloadImages() {
    const images = [
        'https://pplx-res.cloudinary.com/image/upload/v1750394613/pplx_project_search_images/5469c8206ef9f3942abe9a52f91852e4c098107f.jpg',
        'https://pplx-res.cloudinary.com/image/upload/v1750394613/pplx_project_search_images/ccb3271735f47cda684eaf95fbbf822e3791af80.jpg',
        'https://pplx-res.cloudinary.com/image/upload/v1750394614/pplx_project_search_images/c5481c5b67a2d3fe544486d70696b0c61a7a2003.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: var(--space-20);
        right: var(--space-20);
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        border-radius: 50%;
        font-size: var(--font-size-xl);
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all var(--duration-normal) var(--ease-standard);
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    }, 100));
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
addScrollToTop();