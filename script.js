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
