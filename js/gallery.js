// ===================================
// Gallery JavaScript - Gallery Functionality
// ===================================

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');

// Open lightbox
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Gallery filtering
const filterButtons = document.querySelectorAll('[data-filter]');
const galleryGrid = document.getElementById('galleryGrid');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => {
                btn.style.borderWidth = '1px';
                btn.style.padding = 'var(--space-1) var(--space-3)';
            });
            button.style.borderWidth = '2px';
            button.style.padding = 'var(--space-2) var(--space-4)';

            // Filter gallery items
            const items = galleryGrid.querySelectorAll('.gallery-item');
            items.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else if (item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lazy loading for gallery images
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

    document.querySelectorAll('.gallery-item img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation in lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    const currentIndex = Array.from(galleryItems).findIndex(item =>
        item.querySelector('img').src === lightboxImage.src
    );

    if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        const nextImg = galleryItems[nextIndex].querySelector('img');
        lightboxImage.src = nextImg.src;
        lightboxImage.alt = nextImg.alt;
    } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        const prevImg = galleryItems[prevIndex].querySelector('img');
        lightboxImage.src = prevImg.src;
        lightboxImage.alt = prevImg.alt;
    }
});

console.log('Gallery initialized with', galleryItems.length, 'images');
