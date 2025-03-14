// Wait for DOM to load before executing scripts
document.addEventListener('DOMContentLoaded', function () {

  // ✅ Dynamic Year in Footer
  const yearElement = document.querySelector('.footer-content p script');
  if (yearElement) {
      yearElement.parentElement.innerHTML = `&copy; ${new Date().getFullYear()} Islam Kassem | @elcaiseri`;
  }

  // ✅ Add Schema Markup (JSON-LD) Dynamically
  const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Islam Kassem",
      "alternateName": "Eslam Kassem",
      "birthDate": "1998-07-15",
      "gender": "Male",
      "nationality": "Egyptian",
      "jobTitle": "AI / ML Engineer",
      "description": "Islam Kassem is an AI / ML Engineer passionate about extracting patterns and trends from data to drive impactful insights. I specialize in building and scaling machine learning models to solve real-world problems.",
      "email": "kassem@elcaiseri.com",
      "url": "https://elcaiseri.com",
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

  // ✅ Toggle Dark Mode
  const themeToggle = document.getElementById('theme-toggle');

  // Check Local Storage for Theme Preference
  if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
  }

  themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      
      // Save User Preference
      if (document.body.classList.contains('dark-mode')) {
          localStorage.setItem('theme', 'dark');
          themeToggle.textContent = '☀️';
      } else {
          localStorage.setItem('theme', 'light');
          themeToggle.textContent = '🌙';
      }
  });
  
});