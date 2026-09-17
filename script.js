// --- 1. Custom Cursor Follower ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  if (cursorDot) {
    cursorDot.style.left = `${clientX}px`;
    cursorDot.style.top = `${clientY}px`;
  }
  if (cursorGlow) {
    cursorGlow.style.left = `${clientX}px`;
    cursorGlow.style.top = `${clientY}px`;
  }
});

// --- 2. 3D Interactive Canvas in Hero Section (Three.js) ---
const container = document.querySelector('.hero-3d-wrapper');
const canvas = document.querySelector('#bg-3d');

if (canvas && container && typeof THREE !== 'undefined') {
  const scene = new THREE.Scene();
  
  let width = container.clientWidth;
  let height = container.clientHeight;

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Glowing Wireframe 3D Shape
  const geometry = new THREE.TorusKnotGeometry(7.5, 2.3, 120, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // Floating Particles Field
  const particlesCount = 350;
  const positions = new Float32Array(particlesCount * 3);
  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 55;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.35,
    color: 0xff2a5f,
    transparent: true,
    opacity: 0.7
  });

  const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleSystem);

  camera.position.z = 20;

  // Interactive Mouse Movement
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.005 + mouseY * 0.003;
    torusKnot.rotation.y += 0.008 + mouseX * 0.003;

    particleSystem.rotation.y += 0.002;

    renderer.render(scene, camera);
  }

  animate();

  // Resize Listener
  window.addEventListener('resize', () => {
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
}

// --- 3. 3D Card Hover Tilt Effect ---
const cards = document.querySelectorAll('.tilt-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  });
});

// --- 4. Formspree AJAX Form Handling ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData(contactForm);
    
    formStatus.textContent = "Sending message...";
    formStatus.style.color = "#a855f7";

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = "Thank you! Message sent successfully.";
        formStatus.style.color = "#4ade80";
        contactForm.reset();
      } else {
        formStatus.textContent = "Oops! There was a problem submitting your form.";
        formStatus.style.color = "#ff2a5f";
      }
    } catch (error) {
      formStatus.textContent = "Error sending message. Please try again.";
      formStatus.style.color = "#ff2a5f";
    }
  });
}
