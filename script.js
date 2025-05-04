// Mobile Navigation Setup
const primaryNav = document.querySelector('.primary-navigation');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');

if (mobileNavToggle && primaryNav) {
    const toggleNav = (show) => {
        const isVisible = show ?? !primaryNav.hasAttribute('data-visible');
        if (isVisible) {
            primaryNav.setAttribute('data-visible', '');
            mobileNavToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            primaryNav.removeAttribute('data-visible');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    };

    // Click handler
    mobileNavToggle.addEventListener('click', () => toggleNav());

    // Touch events
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        const isVisible = primaryNav.hasAttribute('data-visible');
        
        if (touchEndX - touchStartX > swipeThreshold && !isVisible) {
            toggleNav(true);
        } else if (touchStartX - touchEndX > swipeThreshold && isVisible) {
            toggleNav(false);
        }
    }, false);

    // Close with Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && primaryNav.hasAttribute('data-visible')) {
            toggleNav(false);
        }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (primaryNav.hasAttribute('data-visible')) {
            if (!primaryNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                toggleNav(false);
            }
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile nav if open
            if (primaryNav && primaryNav.hasAttribute('data-visible')) {
                primaryNav.removeAttribute('data-visible');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
});

// Add active state to current navigation item
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.primary-navigation a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Form validation for contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Message Sent!';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                contactForm.reset();
            }, 3000);
        }
    });
}

// Project filter functionality for portfolio page
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            projectCards.forEach(card => {
                const projectCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === projectCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Mobile Navigation Toggle Functionality
const navToggle = document.querySelector('.mobile-nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const visibility = primaryNav.getAttribute('data-visible');
        if (visibility === "true") {
            primaryNav.setAttribute('data-visible', "false");
            navToggle.setAttribute('aria-expanded', "false");
        } else {
            primaryNav.setAttribute('data-visible', "true");
            navToggle.setAttribute('aria-expanded', "true");
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (primaryNav && 
        primaryNav.getAttribute('data-visible') === "true" && 
        !primaryNav.contains(e.target) && 
        !navToggle.contains(e.target)) {
        primaryNav.setAttribute('data-visible', "false");
        navToggle.setAttribute('aria-expanded', "false");
    }
});

// Header scroll behavior
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});