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

// --- 2. 3D Interactive Canvas Background (Three.js) ---
const canvas = document.querySelector('#bg-3d');
if (canvas && typeof THREE !== 'undefined') {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 3D Geometry: Glowing Wireframe Torus Knot
  const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const torusKnot = new THREE.Mesh(geometry, material);
  scene.add(torusKnot);

  // 3D Particles Field
  const particlesCount = 400;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }

  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.4,
    color: 0xff2a5f,
    transparent: true,
    opacity: 0.5
  });

  const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particleSystem);

  camera.position.z = 30;

  // Mouse interaction for 3D elements
  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.003;
    torusKnot.rotation.y += 0.005;

    particleSystem.rotation.y += 0.001;

    // Smooth response to mouse movement
    torusKnot.rotation.x += mouseY * 0.01;
    torusKnot.rotation.y += mouseX * 0.01;

    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
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
