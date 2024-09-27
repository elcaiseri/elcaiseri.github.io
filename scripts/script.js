// Dynamic Year in Footer
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.querySelector('.footer-content p script');
  if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
  }
});

// Schema Markup (JSON-LD) for Person (Your Profile)
const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Eslam Kassem",
  "alternateName": "Islam Kassem",
  "birthDate": "1998-07-15",
  "gender": "Male",
  "nationality": "Egyptian",
  "jobTitle": "AI / ML Engineer",
  "description": "Islam Kassem is an AI / ML Engineer passionate about extracting patterns and trends from data to drive impactful insights. I specialize in building and scaling machine learning models to solve real-world problems.",
  "email": "kassem@elcaiseri.com",
  "telephone": "+201202462195",
  "url": "https://elcaiseri.com",
  "sameAs": [
      "https://github.com/elcaiseri",
      "https://www.linkedin.com/in/elcaiseri",
      "https://twitter.com/elcaiseri",
      "https://x.com/elcaiseri",
      "https://elcaiseri.medium.com",
      "https://www.kaggle.com/elcaiseri",
      "https://linktr.ee/elcaiseri"
  ],
  "address": {
      "@type": "PostalAddress",
      "addressLocality": "Cairo",
      "postalCode": "45861",
      "addressCountry": "Egypt"
  },
  "alumniOf": [
      {
          "@type": "CollegeOrUniversity",
          "name": "Cairo University",
          "sameAs": "https://cu.edu.eg"
      },
      {
          "@type": "CollegeOrUniversity",
          "name": "Port Said University",
          "sameAs": "http://eng.psu.edu.eg/"
      }
  ],
  "worksFor": [
      {
          "@type": "Organization",
          "name": "TwentyToo",
          "sameAs": "https://www.twentytoo.com",
          "startDate": "2023-09-01",
          "jobTitle": "AI / ML Engineer",
          "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cairo",
              "addressCountry": "Egypt"
          },
          "description": "As a Machine Learning Engineer at TwentyToo, I innovate fashion services with AI technologies, creating intelligent solutions like AI Search Engines and Object Detection models to optimize user experiences."
      },
      {
          "@type": "Organization",
          "name": "Upwork",
          "sameAs": "https://www.upwork.com",
          "startDate": "2021-04-01",
          "jobTitle": "AI & Machine Learning Engineer",
          "description": "Experienced and top-rated freelancer, adept at delivering data-driven solutions in data science, machine learning, and deep learning. Known for impactful results, I help individuals, researchers, and companies achieve their goals."
      },
      {
          "@type": "Organization",
          "name": "Kaggle",
          "sameAs": "https://www.kaggle.com",
          "startDate": "2018-04-01",
          "jobTitle": "Data Scientist",
          "description": "Kaggle Master and Expert, consistently ranking in the top 1%, engaging in competitions, and contributing to educational purposes on Kaggle."
      }
  ],
  "knowsAbout": [
      "Data Science", 
      "Machine Learning", 
      "Deep Learning", 
      "Natural Language Processing", 
      "Python Development", 
      "Artificial Intelligence", 
      "Cloud Computing (AWS, GCP, Azure)", 
      "Data Visualization", 
      "SQL, NoSQL", 
      "Docker", 
      "REST APIs",
      "AI",
  ],
  "skills": [
      "Python", 
      "PyTorch", 
      "SQL", 
      "Data Analysis", 
      "Data Exploration", 
      "Data Wrangling", 
      "Docker", 
      "Microsoft Excel", 
      "Deep Learning Frameworks (PyTorch, TensorFlow, Keras)", 
      "LLMs", 
      "OpenCV", 
      "Scikit-learn", 
      "NumPy", 
      "Pandas", 
      "SciPy", 
      "Matplotlib"
  ]
};

// Insert JSON-LD schema markup into the head of the document
function addSchemaToHead(schema) {
  const scriptElement = document.createElement('script');
  scriptElement.type = 'application/ld+json';
  scriptElement.text = JSON.stringify(schema);
  document.head.appendChild(scriptElement);
}

// Add the schema markup to the document head
addSchemaToHead(schemaMarkup);