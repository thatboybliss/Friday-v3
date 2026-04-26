/**
 * FridayAI Website - JavaScript
 * Handles interactive features and smooth scrolling
 */

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Add scroll event listener for navbar background
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 217, 255, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 14, 39, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add click handlers to navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            scrollToSection(href.substring(1));
        }
    });
});

// Add click handlers to CTA buttons
document.querySelectorAll('.cta-buttons .btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 0) {
            // Launch FridayAI
            alert('Launching FridayAI...\nRedirect to app would happen here.');
        } else {
            // View Documentation
            alert('Opening documentation...\nRedirect to docs would happen here.');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards and capability items
document.querySelectorAll('.feature-card, .capability, .tech-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Responsive menu toggle (for mobile)
function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (window.innerWidth <= 768 && navLinks) {
        // Mobile menu setup could go here
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
});

// Handle window resize
window.addEventListener('resize', () => {
    setupMobileMenu();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals (if implemented)
    }
});

// Analytics placeholder (can be connected to real analytics)
function trackEvent(eventName, eventData = {}) {
    console.log(`Event: ${eventName}`, eventData);
    // Connect to analytics service here
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', { 
            text: btn.textContent,
            class: btn.className 
        });
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', { 
                section: entry.target.id 
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

// Performance monitoring
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
    trackEvent('page_load', { loadTime: pageLoadTime });
});
