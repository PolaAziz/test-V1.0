// ========== IMAGE SLIDER FUNCTIONALITY ==========

// Get all elements
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let slideInterval;

// Function to show specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Handle wrap around
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Function to go to next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Function to go to previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Auto play slider
function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Stop auto play
function stopAutoPlay() {
    clearInterval(slideInterval);
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay(); // Restart auto play after manual navigation
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay();
});

// Event listeners for pagination dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopAutoPlay();
        startAutoPlay();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    }
});

// Touch/Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const sliderContainer = document.querySelector('.slider-container');

sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous slide
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    }
}

// Pause auto play when mouse is over slider
sliderContainer.addEventListener('mouseenter', stopAutoPlay);
sliderContainer.addEventListener('mouseleave', startAutoPlay);

// Initialize slider
showSlide(0);
startAutoPlay();

// Pause slider when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
});
