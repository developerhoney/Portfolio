// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
const form = document.getElementById('clientForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you! Your message has been submitted.');
        form.reset();
    });
}

// CTA Button Event Listener
const ctaBtn = document.getElementById('cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
