/**
 * Main JavaScript - Core functionality
 * Islam Kassem - AI Consulting Website
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all modules
    initNavigation();
    initThemeToggle();
    initSmoothScrolling();
    initScrollTop();
    initSchemaMarkup();
    initLazyLoading();
});

/**
 * Navigation Module
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            animateHamburger(navToggle, navMenu.classList.contains('active'));
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                animateHamburger(navToggle, false);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                animateHamburger(navToggle, false);
            }
        });
    }

    // Active section highlighting
    initNavigationHighlighting();
}

function animateHamburger(toggle, isOpen) {
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

function initNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a[href^="#"]');

    if (sections.length === 0 || navItems.length === 0) return;

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

    window.addEventListener('scroll', debounce(highlightNavigation, 10));
}

/**
 * Theme Toggle Module
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const body = document.body;

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') ||
        (prefersDarkScheme.matches ? 'dark' : 'light');

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }

    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        }
    });
}

/**
 * Smooth Scrolling Module
 */
function initSmoothScrolling() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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
}

/**
 * Scroll to Top Module
 */
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');

    if (!scrollTopBtn) return;

    function toggleScrollButton() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', debounce(toggleScrollButton, 10));

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Schema Markup Module
 */
function initSchemaMarkup() {
    const schemaMarkup = {
        "@context": "https://schema.org",
        "@type": ["Person", "ProfessionalService"],
        "name": "Islam Kassem",
        "alternateName": ["Eslam Kassem", "إسلام قاسم", "elcaiseri", "Islam Qasem", "Eslam Qasem"],
        "birthDate": "1998-07-15",
        "gender": "Male",
        "nationality": "Egyptian",
        "jobTitle": "AI / ML Engineer",
        "description": "Islam Kassem is an AI and Machine Learning Engineer, Kaggle Master (Top 1%), and Top-Rated Upwork freelancer specializing in LLMs, Deep Learning, and Computer Vision.",
        "email": "iqasem4444@gmail.com",
        "url": "https://kassem.dev",
        "image": "https://kassem.dev/assets/images/profile-photo-white-bg.webp",
        "sameAs": [
            "https://github.com/elcaiseri",
            "https://www.linkedin.com/in/elcaiseri",
            "https://x.com/elcaiseri",
            "https://elcaiseri.medium.com",
            "https://www.kaggle.com/elcaiseri",
            "https://linktr.ee/elcaiseri"
        ],
        "worksFor": [
            {
                "@type": "Organization",
                "name": "Upwork",
                "sameAs": "https://www.upwork.com"
            },
            {
                "@type": "Organization",
                "name": "Kaggle",
                "sameAs": "https://www.kaggle.com"
            }
        ],
        "knowsAbout": [
            "AI", "Machine Learning", "Deep Learning", "Python", "Data Science", "Cloud Computing"
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "AI Engineer",
            "occupationLocation": { "@type": "Country", "name": "Egypt" },
            "skills": ["Artificial Intelligence", "Machine Learning", "LLMs", "Deep Learning", "Computer Vision"]
        }
    };

    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.text = JSON.stringify(schemaMarkup);
    document.head.appendChild(scriptElement);
}

/**
 * Lazy Loading Module
 */
function initLazyLoading() {
    // Use native lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        return;
    }

    // Fallback for browsers that don't support lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
}

/**
 * Utility Functions
 */
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

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initThemeToggle,
        initSmoothScrolling,
        initScrollTop,
        debounce,
        throttle
    };
}
