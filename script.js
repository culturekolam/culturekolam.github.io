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
    
    // Touch/Swipe support for manual sliding
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;
    let startTranslateX = 0;
    
    const carouselContainer = carouselTrack.parentElement;
    
    function handleTouchStart(e) {
        touchStartX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        isDragging = true;
        startTranslateX = -currentIndex * 100;
        carouselTrack.style.transition = 'none';
        clearInterval(autoplayInterval);
    }
    
    function handleTouchMove(e) {
        if (!isDragging) return;
        
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentX - touchStartX;
        const containerWidth = carouselContainer.offsetWidth;
        const translatePercentage = (diff / containerWidth) * 100;
        
        carouselTrack.style.transform = `translateX(${startTranslateX + translatePercentage}%)`;
    }
    
    function handleTouchEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        
        touchEndX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        const swipeThreshold = 50; // Minimum swipe distance in pixels
        
        carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && currentIndex > 0) {
                // Swipe right - previous slide
                moveToSlide(currentIndex - 1);
            } else if (swipeDistance < 0 && currentIndex < totalCards - 1) {
                // Swipe left - next slide
                moveToSlide(currentIndex + 1);
            } else {
                // Snap back to current slide
                moveToSlide(currentIndex);
            }
        } else {
            // Snap back if swipe distance is too small
            moveToSlide(currentIndex);
        }
        
        // Restart autoplay after manual interaction
        autoplayInterval = startAutoplay();
    }
    
    // Add touch event listeners
    carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    carouselContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    carouselContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Add mouse drag support for desktop
    carouselContainer.addEventListener('mousedown', handleTouchStart);
    carouselContainer.addEventListener('mousemove', handleTouchMove);
    carouselContainer.addEventListener('mouseup', handleTouchEnd);
    carouselContainer.addEventListener('mouseleave', (e) => {
        if (isDragging) {
            handleTouchEnd(e);
        }
    });
}
