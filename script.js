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

// Mobile menu + theme toggle
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');

  if (navLinks) {
    const contactBtn = navLinks.querySelector('.nav-btn');
    if (contactBtn) {
      navLinks.insertBefore(createThemeToggle(), contactBtn);
    } else {
      navLinks.appendChild(createThemeToggle());
    }
  }

  const appHeader = document.querySelector('.app-header');
  if (appHeader && !document.querySelector('.theme-toggle')) {
    appHeader.appendChild(createThemeToggle());
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
});

// Contact form
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

/* ========== GYM PAGE ========== */
const routines = {
  mon: [
    ['Bench Press', '4 × 8'],
    ['Incline Dumbbell Press', '3 × 10'],
    ['Tricep Pushdown', '4 × 12'],
    ['Overhead Extension', '3 × 12']
  ],
  tue: [
    ['Lat Pulldown', '4 × 10'],
    ['Barbell Bent Rows', '3 × 10'],
    ['Hammer Curls', '4 × 12'],
    ['Face Pulls', '3 × 15']
  ],
  wed: [
    ['Back Squat', '4 × 8'],
    ['Romanian Deadlift', '3 × 10'],
    ['Walking Lunges', '3 × 12'],
    ['Plank', '3 × 45s']
  ],
  thu: [
    ['Light Cardio', '20 min'],
    ['Mobility Work', '15 min'],
    ['Foam Rolling', '10 min'],
    ['Stretching', '10 min']
  ]
};

const tabBtns = document.querySelectorAll('.tab-btn');
const routineList = document.getElementById('routineList');
const currentDayEl = document.getElementById('currentDay');

if (tabBtns.length && routineList) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const day = btn.dataset.day;
      const dayName = btn.textContent.split('—')[0].trim();
      if (currentDayEl) currentDayEl.textContent = dayName;
      const items = routines[day] || [];
      routineList.innerHTML = items
        .map(([name, sets]) => `<li><span>${name}</span> <strong>${sets}</strong></li>`)
        .join('');
    });
  });
}

// Water counter
const waterCountEl = document.getElementById('waterCount');
const addGlassBtn = document.getElementById('addGlass');
const removeGlassBtn = document.getElementById('removeGlass');

if (waterCountEl && addGlassBtn && removeGlassBtn) {
  let glasses = parseInt(waterCountEl.textContent, 10) || 0;

  const updateWater = () => {
    waterCountEl.textContent = glasses;
    waterCountEl.parentElement.classList.remove('pulse');
    void waterCountEl.parentElement.offsetWidth;
    waterCountEl.parentElement.classList.add('pulse');
  };

  addGlassBtn.addEventListener('click', () => {
    glasses = Math.min(glasses + 1, 20);
    updateWater();
  });

  removeGlassBtn.addEventListener('click', () => {
    glasses = Math.max(glasses - 1, 0);
    updateWater();
  });
}

// BMI Calculator (FIXED)
const bmiWeight = document.getElementById('bmiWeight');
const bmiHeight = document.getElementById('bmiHeight');
const calcBmiBtn = document.getElementById('calcBmiBtn');
const bmiResult = document.getElementById('bmiResult');

if (calcBmiBtn && bmiResult) {
  calcBmiBtn.addEventListener('click', () => {
    const w = parseFloat(bmiWeight.value);
    const h = parseFloat(bmiHeight.value) / 100;

    if (!w || !h || w <= 0 || h <= 0) {
      bmiResult.textContent = 'Enter a valid weight and height.';
      bmiResult.classList.add('show');
      return;
    }

    const bmi = (w / (h * h)).toFixed(1);
    let category = 'Normal range';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 25 && bmi < 30) category = 'Overweight';
    else if (bmi >= 30) category = 'Obese';

    bmiResult.textContent = `BMI: ${bmi} — ${category}`;
    bmiResult.classList.add('show');
  });
}

/* ========== ECOMMERCE CART (AURA) ========== */
const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const addToCartBtns = document.querySelectorAll('.add-to-cart');

if (cartCountEl && cartTotalEl && addToCartBtns.length) {
  let cartCount = 0;
  let cartTotal = 0;

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const price = parseFloat(btn.dataset.price) || 0;
      cartCount += 1;
      cartTotal += price;

      cartCountEl.textContent = cartCount;
      cartTotalEl.textContent = cartTotal.toFixed(2);

      // visual feedback
      const status = document.querySelector('.cart-status');
      if (status) {
        status.classList.remove('bump');
        void status.offsetWidth;
        status.classList.add('bump');
      }

      btn.textContent = 'Added ✓';
      setTimeout(() => { btn.textContent = 'Add to Cart'; }, 900);
    });
  });
}
