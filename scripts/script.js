// Wait for DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', function () {

  // ✅ Enhanced Schema Markup for better name recognition - by Islam Kassem
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    "name": "Islam Kassem",
    "alternateName": ["Eslam Kassem", "إسلام قاسم", "elcaiseri", "Islam Qasem", "Eslam Qasem"],
    "birthDate": "1998-07-15",
    "gender": "Male",
    "nationality": "Egyptian",
    "jobTitle": "AI / ML Engineer",
    "description": "Islam Kassem is an AI and Machine Learning Engineer, Kaggle Master (Top 1%), and Top-Rated Upwork freelancer specializing in LLMs, Deep Learning, and Computer Vision. Islam Kassem helps businesses build scalable AI solutions and MLOps systems.",
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
        "sameAs": "https://www.upwork.com",
        "description": "Top-rated freelancer delivering AI-driven solutions in data science and deep learning."
      },
      {
        "@type": "Organization",
        "name": "Kaggle",
        "sameAs": "https://www.kaggle.com",
        "description": "Kaggle Master and Competitions Expert, ranking in the top 1% globally."
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
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Consulting",
          "description": "Strategic AI consulting to help businesses leverage cutting-edge machine learning solutions",
          "serviceType": "AI Consultation",
          "provider": {
            "@type": "Person",
            "name": "Islam Kassem"
          },
          "serviceOutput": [
            "AI strategy development",
            "Technical architecture design",
            "MLOps implementation",
            "Performance optimization"
          ],
          "url": "https://www.upwork.com/services/consultation/development-it-eslam-1911179815419426935"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "LLM Development",
          "description": "Expert implementation of Large Language Models for specific business needs",
          "serviceType": "AI Development",
          "provider": {
            "@type": "Person",
            "name": "Islam Kassem"
          },
          "serviceOutput": [
            "Custom LLM fine-tuning and deployment",
            "RAG system development",
            "Prompt engineering optimization",
            "LLM performance evaluation"
          ],
          "url": "https://www.upwork.com/services/product/development-it-expert-llm-development-custom-agents-for-your-business-1911170560924671655"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Computer Vision Solutions",
          "description": "State-of-the-art computer vision solutions for complex visual analysis tasks",
          "serviceType": "Computer Vision Development",
          "provider": {
            "@type": "Person",
            "name": "Islam Kassem"
          },
          "serviceOutput": [
            "Object detection & recognition",
            "Image segmentation",
            "Visual search systems",
            "Video analysis"
          ],
          "url": "https://www.upwork.com/services/product/development-it-advanced-computer-vision-detection-segmentation-and-video-analysis-1911175625290925476"
        }
      }
    ]
  };

  function addSchemaToHead(schema) {
    const scriptElement = document.createElement('script');
    scriptElement.type = 'application/ld+json';
    scriptElement.text = JSON.stringify(schema);
    document.head.appendChild(scriptElement);
  }
  addSchemaToHead(schemaMarkup);

  // ✅ Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Enhanced theme toggle functionality - by Islam Kassem
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const body = document.body;

  // Check for saved theme preference or use system preference
  const currentTheme = localStorage.getItem('theme') ||
    (prefersDarkScheme.matches ? 'dark' : 'light');

  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  // Icon management
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  function updateIcons(isDark) {
    if (sunIcon && moonIcon) {
      if (isDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
      } else {
        sunIcon.style.display = 'inline';
        moonIcon.style.display = 'none';
      }
    }
  }

  // Initialize icons based on current theme
  updateIcons(body.classList.contains('dark-mode'));

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    const theme = isDark ? 'dark' : 'light';

    localStorage.setItem('theme', theme);
    updateIcons(isDark);

    // Add visual feedback for theme toggle
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      themeToggle.style.transform = 'scale(1)';
    }, 150);

    // Update theme color meta tag dynamically
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = isDark ? '#065f46' : '#4CAF50';
    }
  });

  // Listen for system theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        body.classList.add('dark-mode');
        updateIcons(true);
      } else {
        body.classList.remove('dark-mode');
        updateIcons(false);
      }
    }
  });

  // Add intersection observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  });

  // Add fade-in class for animation
  const style = document.createElement('style');
  style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);

  // Scroll to top functionality with footer awareness
  const scrollTopBtn = document.getElementById('scroll-top');
  const footer = document.querySelector('footer');

  const updateScrollButtonPosition = () => {
    const footerRect = footer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    // Show/hide button based on scroll position
    if (scrollY > 200) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }

    // Adjust button position when near footer
    if (footerRect.top <= viewportHeight) {
      const bottomOffset = viewportHeight - footerRect.top + 20;
      scrollTopBtn.style.bottom = `${bottomOffset}px`;
    } else {
      scrollTopBtn.style.bottom = null;
    }
  };

  // Listen for scroll and resize events
  window.addEventListener('scroll', updateScrollButtonPosition);
  window.addEventListener('resize', updateScrollButtonPosition);

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ✅ Enhanced SEO and Name Recognition Features - by Islam Kassem

  // Add contact information dynamically with proper titles
  const contactContainer = document.getElementById('contact-information');
  if (contactContainer) {
    const contactData = [
      {
        icon: 'fas fa-envelope',
        href: 'mailto:iqasem4444@gmail.com',
        title: 'Email Islam Kassem directly',
        label: 'Email Islam Kassem'
      },
      {
        icon: 'fab fa-linkedin',
        href: 'https://www.linkedin.com/in/elcaiseri',
        title: 'Islam Kassem on LinkedIn - AI/ML Engineer Profile',
        label: 'LinkedIn Profile',
        external: true
      },
      {
        icon: 'fab fa-github',
        href: 'https://github.com/elcaiseri',
        title: 'Islam Kassem GitHub - AI/ML Projects and Code',
        label: 'GitHub Profile',
        external: true
      },
      {
        icon: 'fab fa-kaggle',
        href: 'https://www.kaggle.com/elcaiseri',
        title: 'Islam Kassem - Kaggle Master Profile (Top 1%)',
        label: 'Kaggle Master Profile',
        external: true
      },
      {
        icon: 'fab fa-medium',
        href: 'https://elcaiseri.medium.com',
        title: 'Islam Kassem Medium Blog - AI & Machine Learning Articles',
        label: 'AI Blog on Medium',
        external: true
      }
    ];

    contactData.forEach(contact => {
      const link = document.createElement('a');
      link.href = contact.href;
      link.title = contact.title;
      link.setAttribute('aria-label', contact.label);

      if (contact.external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      const icon = document.createElement('i');
      icon.className = contact.icon;
      icon.setAttribute('aria-hidden', 'true');

      link.appendChild(icon);
      contactContainer.appendChild(link);
    });
  }

  // Add enhanced meta description updates for better SEO
  const originalMetaDescription = document.querySelector('meta[name="description"]').getAttribute('content');

  // Track service clicks with better attribution
  const serviceLinks = document.querySelectorAll('.service-link');
  serviceLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Add "by Islam Kassem" attribution to external links
      const url = new URL(this.href);
      if (!url.searchParams.has('ref')) {
        url.searchParams.set('ref', 'islam-kassem-portfolio');
        this.href = url.toString();
      }
    });
  });

  // Clean up any existing service workers for better SEO
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister().then(function () {
          console.log('Service Worker unregistered for better SEO');
        });
      }
    });
  }

  // Add console signature for developer recognition
  console.log('%c🚀 Portfolio Website designed and developed by Islam Kassem', 'color: #4CAF50; font-weight: bold; font-size: 16px;');
  console.log('%c📧 Contact: iqasem4444@gmail.com | 🌐 Website: kassem.dev', 'color: #2196F3; font-size: 12px;');
  console.log('%c🏆 Kaggle Master (Top 1%) | Top-Rated Upwork Freelancer | AI/ML Engineer', 'color: #FF9800; font-size: 12px;');
  console.log('%c🔗 LinkedIn: https://linkedin.com/in/elcaiseri | GitHub: https://github.com/elcaiseri', 'color: #9C27B0; font-size: 12px;');

});
