// Custom Cursor Spotlight Tracking
const cursorDot = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');

window.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;

  cursorDot.style.left = `${clientX}px`;
  cursorDot.style.top = `${clientY}px`;

  cursorGlow.style.left = `${clientX}px`;
  cursorGlow.style.top = `${clientY}px`;
});

// Radial Glow Effect on Individual Cards
const cards = document.querySelectorAll('.spotlight-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.08) 0%, rgba(18, 20, 28, 1) 70%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = 'var(--bg-card)';
  });
});
