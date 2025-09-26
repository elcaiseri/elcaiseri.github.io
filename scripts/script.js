// Wait for DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', function () {

  // ✅ Add Schema Markup (JSON-LD) Dynamically
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": ["Person", "ProfessionalService"],
    "name": "Islam Kassem",
    "alternateName": ["Eslam Kassem", "إسلام قاسم", "elcaiseri"],
    "birthDate": "1998-07-15",
    "gender": "Male",
    "nationality": "Egyptian",
    "jobTitle": "AI / ML Engineer",
    "description": "Islam Kassem is an AI / ML Engineer passionate about extracting patterns and trends from data to drive impactful insights. I specialize in building and scaling machine learning models to solve real-world problems.",
    "email": "iqasem4444@gmail.com",
    "url": "https://kassem.dev",
    "image": "https://kassem.dev/assets/profile-photo-white-bg.webp",
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

  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Check for saved theme preference or use system preference
  const currentTheme = localStorage.getItem('theme') ||
    (prefersDarkScheme.matches ? 'dark' : 'light');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
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

});
