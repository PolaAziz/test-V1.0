// ========== IMAGE GALLERY SLIDER FUNCTIONALITY ==========

// Get all gallery elements
const gallerySlides = document.querySelectorAll('.gallery-slide');
const galleryDots = document.querySelectorAll('.gallery-dot');
const prevGalleryBtn = document.querySelector('.prev-gallery-btn');
const nextGalleryBtn = document.querySelector('.next-gallery-btn');
const gallerySlider = document.querySelector('.gallery-slider');

let currentGallerySlide = 0;
let galleryInterval;
let isGalleryTransitioning = false;

// Function to show specific gallery slide
function showGallerySlide(index) {
    if (isGalleryTransitioning) return;
    
    isGalleryTransitioning = true;
    
    // Remove active class from all slides and dots
    gallerySlides.forEach(slide => {
        slide.classList.remove('active');
    });
    galleryDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Handle wrap around
    if (index >= gallerySlides.length) {
        currentGallerySlide = 0;
    } else if (index < 0) {
        currentGallerySlide = gallerySlides.length - 1;
    } else {
        currentGallerySlide = index;
    }
    
    // Add active class to current slide and dot
    gallerySlides[currentGallerySlide].classList.add('active');
    galleryDots[currentGallerySlide].classList.add('active');
    
    // Reset transition lock after animation completes
    setTimeout(() => {
        isGalleryTransitioning = false;
    }, 1000);
}

// Function to go to next slide
function nextGallerySlide() {
    showGallerySlide(currentGallerySlide + 1);
}

// Function to go to previous slide
function prevGallerySlide() {
    showGallerySlide(currentGallerySlide - 1);
}

// Auto play gallery slider
function startGalleryAutoPlay() {
    galleryInterval = setInterval(nextGallerySlide, 4500); // Change slide every 4.5 seconds
}

// Stop auto play
function stopGalleryAutoPlay() {
    clearInterval(galleryInterval);
}

// Event listeners for navigation buttons
if (prevGalleryBtn) {
    prevGalleryBtn.addEventListener('click', () => {
        prevGallerySlide();
        stopGalleryAutoPlay();
        startGalleryAutoPlay(); // Restart auto play after manual navigation
    });
}

if (nextGalleryBtn) {
    nextGalleryBtn.addEventListener('click', () => {
        nextGallerySlide();
        stopGalleryAutoPlay();
        startGalleryAutoPlay();
    });
}

// Event listeners for pagination dots
galleryDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showGallerySlide(index);
        stopGalleryAutoPlay();
        startGalleryAutoPlay();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Only respond to arrow keys when gallery is in viewport
    const gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection) return;
    
    const rect = gallerySection.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isInViewport) {
        if (e.key === 'ArrowLeft') {
            prevGallerySlide();
            stopGalleryAutoPlay();
            startGalleryAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextGallerySlide();
            stopGalleryAutoPlay();
            startGalleryAutoPlay();
        }
    }
});

// Touch/Swipe support for mobile
let galleryTouchStartX = 0;
let galleryTouchEndX = 0;

if (gallerySlider) {
    gallerySlider.addEventListener('touchstart', (e) => {
        galleryTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallerySlider.addEventListener('touchend', (e) => {
        galleryTouchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
    }, { passive: true });
}

function handleGallerySwipe() {
    const swipeThreshold = 60;
    
    if (galleryTouchEndX < galleryTouchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextGallerySlide();
        stopGalleryAutoPlay();
        startGalleryAutoPlay();
    }
    
    if (galleryTouchEndX > galleryTouchStartX + swipeThreshold) {
        // Swipe right - previous slide
        prevGallerySlide();
        stopGalleryAutoPlay();
        startGalleryAutoPlay();
    }
}

// Pause auto play when mouse is over slider
if (gallerySlider) {
    gallerySlider.addEventListener('mouseenter', stopGalleryAutoPlay);
    gallerySlider.addEventListener('mouseleave', startGalleryAutoPlay);
}

// Initialize gallery slider
if (gallerySlides.length > 0) {
    showGallerySlide(0);
    startGalleryAutoPlay();
}

// Pause slider when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopGalleryAutoPlay();
    } else {
        if (gallerySlides.length > 0) {
            startGalleryAutoPlay();
        }
    }
});
