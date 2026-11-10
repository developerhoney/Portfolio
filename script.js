// Theme
(function initTheme() {
  const stored = localStorage.getItem('devhoney-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function createThemeToggle() {
  const btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.type = 'button';
  updateToggleIcon(btn);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('devhoney-theme', next);
    updateToggleIcon(btn);
    btn.classList.remove('spin');
    void btn.offsetWidth;
    btn.classList.add('spin');
  });

  return btn;
}

function updateToggleIcon(btn) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

// Mobile menu
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');

  // Theme toggle insert
  if (navLinks) {
    const contactBtn = navLinks.querySelector('.nav-btn');
    navLinks.insertBefore(createThemeToggle(), contactBtn);
  }

  // Hamburger
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
});

// Contact form (Formspree)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData(contactForm);

    formStatus.textContent = 'Sending message...';
    formStatus.style.color = 'var(--accent)';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent successfully. Thank you!';
        formStatus.style.color = '#3f8a54';
        contactForm.reset();
      } else {
        formStatus.textContent = 'Something went wrong. Please try again.';
        formStatus.style.color = '#c1462f';
      }
    } catch (error) {
      formStatus.textContent = 'Error sending message. Please try again.';
      formStatus.style.color = '#c1462f';
    }
  });
}
