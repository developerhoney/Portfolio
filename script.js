const counterElem = document.getElementById('counter');
const signatureElem = document.getElementById('signature');

let countObj = { value: 0 };

const tl = gsap.timeline();

// 1. Counter Animation (0% -> 100%)
tl.to(countObj, {
    value: 100,
    duration: 2.2,
    ease: "power2.inOut",
    onUpdate: function () {
        counterElem.textContent = Math.floor(countObj.value) + '%';
    }
})
// 2. Hide counter and display signature text
.to(counterElem, {
    opacity: 0,
    duration: 0.4,
    display: "none"
})
.to(signatureElem, {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.7)"
})
.to(signatureElem, {
    opacity: 0,
    delay: 0.4,
    duration: 0.4
})
// 3. Curtain slide-up reveal
.to('.preloader-curtain', {
    y: '-100%',
    duration: 0.9,
    ease: "power4.inOut"
})
.to('.preloader', {
    display: "none",
    duration: 0
}, "-=0.9")
// 4. Hero text entrance animation
.from('.hero-title', {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
}, "-=0.4")
.from('.hero-subtitle', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.8");
