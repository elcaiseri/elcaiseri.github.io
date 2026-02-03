/**
 * Conversion JavaScript - Lead generation and UX enhancements
 * Islam Kassem - AI Consulting Website
 */

document.addEventListener('DOMContentLoaded', function () {
    initFormHandlers();
    initExitIntent();
    initScrollProgress();
    initCTATracking();
    initTestimonialSlider();
    initNumberCountUp();
});

/**
 * Form Handlers Module
 */
function initFormHandlers() {
    // Lead Magnet Form
    const leadMagnetForm = document.getElementById('leadMagnetForm');
    if (leadMagnetForm) {
        leadMagnetForm.addEventListener('submit', handleLeadMagnetSubmit);
    }

    // Contact Forms
    const contactForms = document.querySelectorAll('.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', handleContactSubmit);
    });

    // Input validation
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidation);
    });
}

function handleLeadMagnetSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // Track conversion
        trackEvent('lead_magnet_download', {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company')
        });

        // Show success message
        showNotification('Success! Check your email for the AI Readiness Assessment guide.', 'success');

        // Reset form
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-download"></i> Download Free Guide';
    }, 1500);
}

function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Track conversion
    trackEvent('contact_form_submit', {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    });

    showNotification('Message sent! I\'ll get back to you within 24 hours.', 'success');
    form.reset();
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let errorMessage = '';

    if (input.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    if (!isValid) {
        input.classList.add('error');
        showInputError(input, errorMessage);
    } else {
        input.classList.remove('error');
        hideInputError(input);
    }

    return isValid;
}

function clearValidation(e) {
    const input = e.target;
    input.classList.remove('error');
    hideInputError(input);
}

function showInputError(input, message) {
    let errorEl = input.nextElementSibling;
    if (!errorEl || !errorEl.classList.contains('input-error')) {
        errorEl = document.createElement('span');
        errorEl.className = 'input-error';
        input.parentNode.insertBefore(errorEl, input.nextSibling);
    }
    errorEl.textContent = message;
}

function hideInputError(input) {
    const errorEl = input.nextElementSibling;
    if (errorEl && errorEl.classList.contains('input-error')) {
        errorEl.remove();
    }
}

/**
 * Exit Intent Module
 */
function initExitIntent() {
    let exitIntentShown = sessionStorage.getItem('exitIntentShown');

    if (exitIntentShown) return;

    document.addEventListener('mouseleave', function (e) {
        if (e.clientY < 10 && !exitIntentShown) {
            // Could show exit intent popup here
            // For now, just track the event
            trackEvent('exit_intent_triggered');
            exitIntentShown = true;
            sessionStorage.setItem('exitIntentShown', 'true');
        }
    });
}

/**
 * Scroll Progress Module
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const progressBarInner = progressBar.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBarInner.style.width = scrollPercent + '%';
    });

    // Add CSS for scroll progress
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: transparent;
            z-index: 10000;
        }
        .scroll-progress-bar {
            height: 100%;
            background: var(--accent-color);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(style);
}

/**
 * CTA Tracking Module
 */
function initCTATracking() {
    // Track all CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta');

    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const ctaText = this.textContent.trim();
            const ctaHref = this.getAttribute('href');

            trackEvent('cta_click', {
                text: ctaText,
                href: ctaHref,
                location: getElementLocation(this)
            });
        });
    });

    // Track service card clicks
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function (e) {
            if (!e.target.closest('a')) {
                trackEvent('service_card_click', {
                    service: card.querySelector('h3')?.textContent || 'Unknown'
                });
            }
        });
    });

    // Track case study interactions
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    caseStudyCards.forEach(card => {
        card.addEventListener('click', function () {
            trackEvent('case_study_click', {
                title: card.querySelector('h3')?.textContent || 'Unknown'
            });
        });
    });
}

function getElementLocation(element) {
    const section = element.closest('section');
    if (section) {
        return section.id || 'unknown-section';
    }
    return 'unknown-location';
}

/**
 * Testimonial Slider Module
 */
function initTestimonialSlider() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (!testimonialGrid) return;

    // Add auto-scroll for mobile
    if (window.innerWidth < 768) {
        let currentIndex = 0;
        const testimonials = testimonialGrid.querySelectorAll('.testimonial-card');

        if (testimonials.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonials.length;
                const scrollAmount = testimonials[currentIndex].offsetLeft - testimonialGrid.offsetLeft;
                testimonialGrid.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }, 5000);
        }
    }
}

/**
 * Number Count Up Animation
 */
function initNumberCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number, .result-number');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(num => observer.observe(num));
    }
}

function animateNumber(element) {
    const text = element.textContent;
    const match = text.match(/^([\d.]+)(\D*)$/);

    if (!match) return;

    const targetValue = parseFloat(match[1]);
    const suffix = match[2] || '';
    const isDecimal = text.includes('.');
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = targetValue * easeOut;

        if (isDecimal) {
            element.textContent = currentValue.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(currentValue) + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = text; // Ensure final value matches original
        }
    }

    requestAnimationFrame(update);
}

/**
 * Notification System
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Add CSS if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                background: var(--card-bg);
                box-shadow: var(--shadow-lg);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10001;
                animation: slideIn 0.3s ease;
            }
            .notification-success { border-left: 4px solid var(--success-color); }
            .notification-error { border-left: 4px solid var(--error-color); }
            .notification-info { border-left: 4px solid var(--accent-color); }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.5;
            }
            .notification-close:hover { opacity: 1; }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Analytics/Event Tracking
 */
function trackEvent(eventName, eventParams = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventParams);
    }

    // Console log for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Event tracked:', eventName, eventParams);
    }
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent,
        showNotification
    };
}
