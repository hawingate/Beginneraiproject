// ===================================
// Main JavaScript - Core Functionality
// ===================================

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with 'reveal' class
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Newsletter Form Submission
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        // Here you would typically send this to your backend/email service
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        e.target.reset();
    });
}

// Load Featured Posts on Homepage
async function loadFeaturedPosts() {
    const container = document.getElementById('featuredPosts');
    if (!container) return;

    try {
        const response = await fetch('data/posts.json');
        const posts = await response.json();

        // Get first 3 posts as featured
        const featuredPosts = posts.slice(0, 3);

        container.innerHTML = featuredPosts.map(post => `
      <article class="card reveal">
        <img src="${post.image}" alt="${post.title}" class="card-image">
        <div class="blog-meta">
          <span class="tag">${post.category}</span>
          <span class="reading-time">${post.readingTime}</span>
        </div>
        <h3 class="card-title">${post.title}</h3>
        <p class="card-description">${post.excerpt}</p>
        <a href="post.html?id=${post.id}" class="btn btn-secondary">Read More →</a>
      </article>
    `).join('');

        // Re-observe new elements for scroll animation
        container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } catch (error) {
        console.error('Error loading posts:', error);
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">Unable to load posts at this time.</p>';
    }
}

// Utility: Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility: Calculate Reading Time
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

// Share Functions for Blog Posts
function shareOnTwitter() {
    const url = window.location.href;
    const title = document.title;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
}

function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy link:', err);
    });
}

// Performance: Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('%c✨ ModernBlog', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #a855f7 0%, #3b82f6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilt with modern web technologies', 'font-size: 14px; color: #a0a0b0;');
