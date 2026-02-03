// ==============================================
// CONVERSION-OPTIMIZED JAVASCRIPT
// Lead generation and UX enhancements
// ==============================================

document.addEventListener('DOMContentLoaded', function() {

    // ==============================================
    // NAVIGATION
    // ==============================================

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Active section highlighting in navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a[href^="#"]');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ==============================================
    // SMOOTH SCROLLING
    // ==============================================

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip empty anchors
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==============================================
    // SCROLL TO TOP BUTTON
    // ==============================================

    const scrollTopBtn = document.getElementById('scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==============================================
    // LEAD MAGNET FORM
    // ==============================================

    const leadMagnetForm = document.getElementById('leadMagnetForm');

    if (leadMagnetForm) {
        leadMagnetForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('lead-name').value,
                email: document.getElementById('lead-email').value,
                company: document.getElementById('lead-company').value,
                timestamp: new Date().toISOString(),
                source: 'AI Readiness Assessment Download'
            };

            // Track conversion
            trackConversion('lead_magnet_download', formData);

            // Show success message
            showFormSuccess(leadMagnetForm,
                'Thank you! Check your email for the AI Readiness Assessment guide.');

            // Reset form
            leadMagnetForm.reset();

            // Optional: Send to your backend or email service
            // sendLeadToBackend(formData);
        });
    }

    // ==============================================
    // CONVERSION TRACKING
    // ==============================================

    function trackConversion(eventName, data = {}) {
        console.log('Conversion tracked:', eventName, data);

        // Google Analytics tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'conversion',
                event_label: data.source || '',
                value: 1
            });
        }

        // Facebook Pixel tracking (if available)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', data);
        }

        // Store in localStorage for analytics
        const conversions = JSON.parse(localStorage.getItem('conversions') || '[]');
        conversions.push({
            event: eventName,
            data: data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('conversions', JSON.stringify(conversions));
    }

    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');

            trackConversion('cta_click', {
                button_text: buttonText,
                button_href: buttonHref,
                section: this.closest('section')?.id || 'unknown'
            });
        });
    });

    // Track external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackConversion('external_link_click', {
                url: this.getAttribute('href'),
                text: this.textContent.trim()
            });
        });
    });

    // Track email link clicks
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackConversion('email_click', {
                email: this.getAttribute('href').replace('mailto:', '')
            });
        });
    });

    // ==============================================
    // FORM UTILITIES
    // ==============================================

    function showFormSuccess(form, message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        `;
        successDiv.style.cssText = `
            background: #4CAF50;
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: fadeInUp 0.5s ease;
        `;

        form.parentElement.insertBefore(successDiv, form.nextSibling);

        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => successDiv.remove(), 500);
        }, 5000);
    }

    function showFormError(form, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        `;
        errorDiv.style.cssText = `
            background: #E53E3E;
            color: white;
            padding: 1.5rem;
            border-radius: 8px;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            animation: fadeInUp 0.5s ease;
        `;

        form.parentElement.insertBefore(errorDiv, form.nextSibling);

        setTimeout(() => {
            errorDiv.style.opacity = '0';
            errorDiv.style.transition = 'opacity 0.5s ease';
            setTimeout(() => errorDiv.remove(), 500);
        }, 5000);
    }

    // ==============================================
    // SCROLL ANIMATIONS
    // ==============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .case-study-card,
        .achievement-card,
        .testimonial-card,
        .stat-card,
        .process-step,
        .contact-option,
        .faq-item
    `);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ==============================================
    // DYNAMIC STATS COUNTER
    // ==============================================

    function animateCounter(element) {
        const target = element.getAttribute('data-target') || element.textContent;
        const numericTarget = parseInt(target.replace(/[^\d]/g, ''));
        const prefix = target.match(/[^\d]+$/)?.[0] || '';
        const suffix = target.match(/^[^\d]+/)?.[0] || '';

        if (isNaN(numericTarget)) return;

        let current = 0;
        const increment = numericTarget / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                element.textContent = suffix + numericTarget + prefix;
                clearInterval(timer);
            } else {
                element.textContent = suffix + Math.floor(current) + prefix;
            }
        }, stepTime);
    }

    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        stat.setAttribute('data-target', stat.textContent);
        statsObserver.observe(stat);
    });

    // ==============================================
    // TIME ON PAGE TRACKING
    // ==============================================

    let timeOnPage = 0;
    let isActive = true;

    setInterval(() => {
        if (isActive) {
            timeOnPage++;

            // Track engagement milestones
            if (timeOnPage === 30) {
                trackConversion('engaged_30_seconds');
            } else if (timeOnPage === 60) {
                trackConversion('engaged_1_minute');
            } else if (timeOnPage === 180) {
                trackConversion('engaged_3_minutes');
            } else if (timeOnPage === 300) {
                trackConversion('highly_engaged_5_minutes');
            }
        }
    }, 1000);

    // Track page visibility
    document.addEventListener('visibilitychange', function() {
        isActive = !document.hidden;
    });

    // Track before user leaves
    window.addEventListener('beforeunload', function() {
        trackConversion('page_exit', {
            time_on_page: timeOnPage,
            scrollDepth: getScrollDepth()
        });
    });

    // ==============================================
    // SCROLL DEPTH TRACKING
    // ==============================================

    let maxScrollDepth = 0;
    const scrollMilestones = [25, 50, 75, 100];
    const reachedMilestones = [];

    function getScrollDepth() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        return Math.round((scrolled / documentHeight) * 100);
    }

    window.addEventListener('scroll', function() {
        const currentDepth = getScrollDepth();
        maxScrollDepth = Math.max(maxScrollDepth, currentDepth);

        scrollMilestones.forEach(milestone => {
            if (currentDepth >= milestone && !reachedMilestones.includes(milestone)) {
                reachedMilestones.push(milestone);
                trackConversion(`scroll_depth_${milestone}`, {
                    depth: milestone
                });
            }
        });
    });

    // ==============================================
    // EXIT INTENT DETECTION
    // ==============================================

    let exitIntentShown = false;

    document.addEventListener('mouseleave', function(e) {
        if (e.clientY < 10 && !exitIntentShown && timeOnPage > 30) {
            exitIntentShown = true;
            trackConversion('exit_intent_detected');

            // Show exit intent popup (optional)
            // showExitIntentPopup();
        }
    });

    // ==============================================
    // CALENDLY INTEGRATION (if using Calendly)
    // ==============================================

    const calendlyLinks = document.querySelectorAll('a[href*="calendly.com"]');

    calendlyLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            trackConversion('calendly_click', {
                source_section: this.closest('section')?.id || 'unknown'
            });
        });
    });

    // ==============================================
    // UTILITY FUNCTIONS
    // ==============================================

    function sendLeadToBackend(data) {
        // Example: Send to your backend API
        fetch('/api/leads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Lead sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending lead:', error);
        });
    }

    // Log initial page load
    trackConversion('page_load', {
        referrer: document.referrer,
        url: window.location.href,
        userAgent: navigator.userAgent
    });

    console.log('Conversion tracking initialized');
});
