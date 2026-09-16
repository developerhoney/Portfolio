// 1. Mouse Follower Glow Animation
const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
    });
});

// 2. Entrance Animation for Hero Elements
gsap.from('.hero-tag', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 });
gsap.from('.hero-title', { opacity: 0, y: 40, duration: 1, delay: 0.4 });
gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.8, delay: 0.7 });

// 3. Staggered Bento Cards Scroll Reveal
gsap.registerPlugin(ScrollTrigger);

gsap.from('.bento-card', {
    scrollTrigger: {
        trigger: '.bento-container',
        start: 'top 80%',
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
});

// 4. Counter Number Animation
const counter = document.querySelector('.counter');
const target = +counter.getAttribute('data-target');

ScrollTrigger.create({
    trigger: counter,
    start: 'top 85%',
    onEnter: () => {
        let countObj = { val: 0 };
        gsap.to(countObj, {
            val: target,
            duration: 2,
            ease: "power1.out",
            onUpdate: () => {
                counter.textContent = Math.floor(countObj.val) + '+';
            }
        });
    }
});
