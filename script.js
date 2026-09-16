const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out"
    });
});

gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1 });
gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 });

gsap.from('.bento-card', {
    scrollTrigger: {
        trigger: '.bento-container',
        start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
});

const counter = document.querySelector('.counter');
if (counter) {
    const target = +counter.getAttribute('data-target');
    ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        onEnter: () => {
            let countObj = { val: 0 };
            gsap.to(countObj, {
                val: target,
                duration: 1.8,
                onUpdate: () => {
                    counter.textContent = Math.floor(countObj.val) + '+';
                }
            });
        }
    });
}
