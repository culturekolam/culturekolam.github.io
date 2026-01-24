const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all features
document.querySelectorAll('.feature').forEach((feature, index) => {
    feature.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(feature);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Automatic Carousel for Success Stories
const carouselTrack = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');
const storyCards = document.querySelectorAll('.story-card');

if (carouselTrack && dots.length > 0) {
    let currentIndex = 0;
    const totalCards = storyCards.length;
    const AUTOPLAY_INTERVAL = 4000; // 4 seconds
    let autoplayInterval;
    
    // Function to move to a specific slide
    function moveToSlide(index) {
        currentIndex = index;
        const translateX = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Function to start autoplay
    function startAutoplay() {
        return setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            moveToSlide(currentIndex);
        }, AUTOPLAY_INTERVAL);
    }
    
    // Start initial autoplay
    autoplayInterval = startAutoplay();
    
    // Add click handlers to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoplayInterval);
            moveToSlide(index);
            // Restart autoplay after manual interaction
            autoplayInterval = startAutoplay();
        });
    });
    
    // Pause autoplay on hover
    if (carouselTrack.parentElement) {
        carouselTrack.parentElement.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });
        
        carouselTrack.parentElement.addEventListener('mouseleave', () => {
            autoplayInterval = startAutoplay();
        });
    }
}
