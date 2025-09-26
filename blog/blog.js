// Function to fetch latest Medium articles by Islam Kassem
async function fetchMediumArticles() {
    const loadingContainer = document.getElementById('medium-loading');
    const articlesContainer = document.getElementById('medium-articles');
    const fallbackContainer = document.getElementById('medium-fallback');

    try {
        // Medium RSS feed URL for elcaiseri
        const mediumRSSURL = 'https://medium.com/feed/@elcaiseri';

        // Using a CORS proxy to fetch the RSS feed
        const proxyURL = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(mediumRSSURL);

        const response = await fetch(proxyURL);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
            displayMediumArticles(data.items.slice(0, 5)); // Show latest 5 articles
        } else {
            throw new Error('No articles found');
        }
    } catch (error) {
        console.error('Error fetching Medium articles:', error);
        showFallback();
    }
}

function displayMediumArticles(articles) {
    const loadingContainer = document.getElementById('medium-loading');
    const articlesContainer = document.getElementById('medium-articles');
    const articlesHeader = document.getElementById('articles-header');

    loadingContainer.style.display = 'none';
    articlesContainer.style.display = 'block';
    articlesHeader.style.display = 'block';

    // Clear existing articles
    articlesContainer.innerHTML = '';

    articles.forEach((article, index) => {
        const articleElement = createArticleElement(article, index);
        articlesContainer.appendChild(articleElement);
    });

    // Add fade-in animation with stagger
    const articleElements = articlesContainer.querySelectorAll('.medium-article');
    articleElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('fade-in');
        }, index * 200);
    });
}

function createArticleElement(article, index) {
    const articleDiv = document.createElement('article');
    articleDiv.className = 'medium-article';

    // Clean up the description (remove HTML tags)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = article.description || article.content || '';
    const excerpt = tempDiv.textContent || tempDiv.innerText || '';
    const cleanExcerpt = excerpt.substring(0, 200) + (excerpt.length > 200 ? '...' : '');

    // Format publication date
    const pubDate = new Date(article.pubDate);
    const formattedDate = pubDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    // Estimate reading time (rough calculation)
    const wordCount = excerpt.split(' ').length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    articleDiv.innerHTML = `
                <h3>
                    <a href="${article.link}" target="_blank" rel="noopener noreferrer">
                        ${article.title}
                    </a>
                </h3>
                <div class="article-meta">
                    <span class="article-date">
                        <i class="fas fa-calendar-alt"></i> ${formattedDate}
                    </span>
                    <span class="article-reading-time">
                        <i class="fas fa-clock"></i> ${readingTime} min read
                    </span>
                </div>
                <p class="article-excerpt">${cleanExcerpt}</p>
                <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="read-more-btn">
                    Read Full Article <i class="fas fa-external-link-alt"></i>
                </a>
            `;

    return articleDiv;
}

function showFallback() {
    const loadingContainer = document.getElementById('medium-loading');
    const fallbackContainer = document.getElementById('medium-fallback');

    loadingContainer.style.display = 'none';
    fallbackContainer.style.display = 'block';

    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load latest articles automatically. Please visit Islam Kassem's Medium profile directly for the most recent AI & ML content.</p>
            `;
    fallbackContainer.parentNode.insertBefore(errorDiv, fallbackContainer);
}

document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle functionality - by Islam Kassem
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference (match root page behavior)
    const savedTheme = localStorage.getItem('theme') ||
        (prefersDarkScheme.matches ? 'dark' : 'light');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'inline';
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');

        // Toggle icons
        sunIcon.style.display = isDark ? 'none' : 'inline';
        moonIcon.style.display = isDark ? 'inline' : 'none';

        // Save theme preference (use same key as root page)
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Add button animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });

    // Listen for system theme changes (match root page behavior)
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline';
            } else {
                body.classList.remove('dark-mode');
                sunIcon.style.display = 'inline';
                moonIcon.style.display = 'none';
            }
        }
    });

    // Fade-in animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and articles
    document.querySelectorAll('section, .blog-intro, .blog-post').forEach(element => {
        observer.observe(element);
    });

    // Enhanced link tracking for Islam Kassem's external profiles
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function () {
            console.log('External link clicked from Islam Kassem blog:', this.href);
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fetch and display Medium articles by Islam Kassem
    fetchMediumArticles();

    // Add refresh button functionality
    const refreshBtn = document.getElementById('refresh-articles');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            refreshBtn.classList.add('loading');
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Loading...';

            // Show loading state
            const loadingContainer = document.getElementById('medium-loading');
            const articlesContainer = document.getElementById('medium-articles');
            const articlesHeader = document.getElementById('articles-header');

            loadingContainer.style.display = 'block';
            articlesContainer.style.display = 'none';
            articlesHeader.style.display = 'none';

            // Fetch articles again
            fetchMediumArticles().finally(() => {
                refreshBtn.classList.remove('loading');
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            });
        });
    }

    // Console signature for Islam Kassem
    console.log('%c📝 Islam Kassem Blog - AI & Machine Learning Insights', 'color: #4CAF50; font-weight: bold; font-size: 16px;');
    console.log('%c🔗 Connect: https://kassem.dev | LinkedIn: https://linkedin.com/in/elcaiseri', 'color: #2196F3; font-size: 12px;');
    console.log('%c🏆 Content by Islam Kassem - Kaggle Master | AI/ML Engineer', 'color: #FF9800; font-size: 12px;');
});

// Add loading state management
window.addEventListener('load', function () {
    document.body.style.opacity = '1';
});
