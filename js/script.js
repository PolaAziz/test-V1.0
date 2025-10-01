// ========== PRELOADER ==========
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  
  // Hide preloader after page loads
  setTimeout(() => {
    preloader.classList.add("fade-out");
    
    // Remove from DOM after animation
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1500); // Show for 1.5 seconds minimum
});

// ========== NAVBAR FUNCTIONALITY ==========
const toggleBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll(".nav-link");

// Toggle menu
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// Active link and smooth scroll
links.forEach(link => {
  link.addEventListener("click", (e) => {
    // Remove active from all
    links.forEach(l => l.classList.remove("active"));
    // Add active to clicked
    link.classList.add("active");
    
    // Close mobile menu
    if (window.innerWidth <= 767) {
      navLinks.classList.remove("show");
    }
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
    navLinks.classList.remove("show");
  }
});

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, observerOptions);

// Observe all sections
document.addEventListener("DOMContentLoaded", () => {
  // Hero section animations
  const heroContent = document.querySelector(".hero .col-md-6");
  const heroImages = document.querySelector(".hero-images");
  
  if (heroContent) {
    heroContent.classList.add("fade-in-left");
    observer.observe(heroContent);
  }
  
  if (heroImages) {
    heroImages.classList.add("fade-in-right");
    observer.observe(heroImages);
  }
  
  // Programs section
  const programsTitle = document.querySelector(".programs h2");
  const programBoxes = document.querySelectorAll(".program-box");
  
  if (programsTitle) {
    programsTitle.classList.add("fade-in-up");
    observer.observe(programsTitle);
  }
  
  programBoxes.forEach((box, index) => {
    box.parentElement.classList.add("fade-in-up");
    box.parentElement.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(box.parentElement);
  });
  
  // Gallery section
  const galleryTitle = document.querySelector(".slider-section .section-title");
  const sliderContainer = document.querySelector(".slider-container");
  
  if (galleryTitle) {
    galleryTitle.classList.add("fade-in-up");
    observer.observe(galleryTitle);
  }
  
  if (sliderContainer) {
    sliderContainer.classList.add("fade-in");
    observer.observe(sliderContainer);
  }
  
  // Footer
  const footerSections = document.querySelectorAll("footer > .container > div");
  footerSections.forEach((section, index) => {
    section.classList.add("fade-in-up");
    section.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(section);
  });
});



