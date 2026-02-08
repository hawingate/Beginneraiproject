// ===================================
// Blog JavaScript - Blog Functionality
// ===================================

let allPosts = [];
let currentFilter = 'all';

// Load all blog posts
async function loadBlogPosts() {
    try {
        const response = await fetch('data/posts.json');
        allPosts = await response.json();
        displayPosts(allPosts);
        setupFilters();
        setupSearch();
    } catch (error) {
        console.error('Error loading blog posts:', error);
        document.getElementById('blogPosts').innerHTML =
            '<p style="text-align: center; color: var(--color-text-secondary);">Unable to load blog posts.</p>';
    }
}

// Display posts in grid
function displayPosts(posts) {
    const container = document.getElementById('blogPosts');
    const noPosts = document.getElementById('noPosts');

    if (!container) return;

    if (posts.length === 0) {
        container.innerHTML = '';
        if (noPosts) noPosts.style.display = 'block';
        return;
    }

    if (noPosts) noPosts.style.display = 'none';

    container.innerHTML = posts.map(post => `
    <article class="card reveal">
      <img src="${post.image}" alt="${post.title}" class="card-image">
      <div class="blog-meta">
        <span class="tag">${post.category}</span>
        <span class="reading-time">${post.readingTime}</span>
      </div>
      <h3 class="card-title">${post.title}</h3>
      <p class="card-description">${post.excerpt}</p>
      <div class="card-meta" style="margin-bottom: var(--space-4);">
        <span>📅 ${formatDate(post.date)}</span>
        <span>👤 ${post.author}</span>
      </div>
      <a href="post.html?id=${post.id}" class="btn btn-secondary">Read More →</a>
    </article>
  `).join('');

    // Re-observe for scroll animations
    container.querySelectorAll('.reveal').forEach(el => {
        if (typeof observer !== 'undefined') {
            observer.observe(el);
        }
    });
}

// Setup category filters
function setupFilters() {
    const filterButtons = document.querySelectorAll('[data-category]');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            currentFilter = category;

            // Update active button
            filterButtons.forEach(btn => {
                btn.style.borderWidth = '1px';
                btn.style.padding = 'var(--space-1) var(--space-3)';
            });
            button.style.borderWidth = '2px';
            button.style.padding = 'var(--space-2) var(--space-4)';

            // Filter posts
            const filtered = category === 'all'
                ? allPosts
                : allPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());

            displayPosts(filtered);
        });
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        let filtered = currentFilter === 'all'
            ? allPosts
            : allPosts.filter(post => post.category.toLowerCase() === currentFilter);

        if (query) {
            filtered = filtered.filter(post =>
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query)
            );
        }

        displayPosts(filtered);
    });
}

// Load individual post content
async function loadPostContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        window.location.href = 'blog.html';
        return;
    }

    try {
        const response = await fetch('data/posts.json');
        const posts = await response.json();
        const post = posts.find(p => p.id === parseInt(postId));

        if (!post) {
            window.location.href = 'blog.html';
            return;
        }

        // Update page title and meta
        document.title = `${post.title} - Modern Blog`;
        const metaDesc = document.getElementById('postDescription');
        if (metaDesc) {
            metaDesc.setAttribute('content', post.excerpt);
        }

        // Display post content
        const container = document.getElementById('postContent');
        if (container) {
            container.innerHTML = `
        <div class="blog-meta" style="justify-content: center; margin-bottom: var(--space-6);">
          <span class="tag">${post.category}</span>
          <span class="reading-time">${post.readingTime}</span>
        </div>
        <h1>${post.title}</h1>
        <div class="card-meta" style="justify-content: center; margin-bottom: var(--space-8);">
          <span>📅 ${formatDate(post.date)}</span>
          <span>👤 ${post.author}</span>
        </div>
        <img src="${post.image}" alt="${post.title}" style="width: 100%; border-radius: var(--radius-xl); margin-bottom: var(--space-8);">
        <div style="font-size: var(--font-size-lg); line-height: 1.8; color: var(--color-text-secondary);">
          ${post.content.split('\n').map(p => `<p>${p}</p>`).join('')}
        </div>
      `;
        }

        // Load related posts
        loadRelatedPosts(post.category, post.id, posts);

    } catch (error) {
        console.error('Error loading post:', error);
    }
}

// Load related posts
function loadRelatedPosts(category, currentPostId, allPosts) {
    const container = document.getElementById('relatedPosts');
    if (!container) return;

    const related = allPosts
        .filter(post => post.category === category && post.id !== currentPostId)
        .slice(0, 3);

    if (related.length === 0) {
        container.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No related posts found.</p>';
        return;
    }

    container.innerHTML = related.map(post => `
    <article class="card">
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
}

// Initialize blog page
if (document.getElementById('blogPosts')) {
    loadBlogPosts();
}

// Check URL parameters for category filter
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category && document.querySelector(`[data-category="${category}"]`)) {
        document.querySelector(`[data-category="${category}"]`).click();
    }
});
