const scene = document.querySelector('.scene');
const flap = document.querySelector('.flap');
const letter = document.querySelector('.letter');
const envelope = document.querySelector('.envelope');
const SCROLL_DURATION = 1200;
const startColor = { r: 85, g: 98, b: 47 };
const endColor = { r: 255, g: 255, b: 255 };

function clamp(v) {
    return Math.min(Math.max(v, 0), 1);
}
function setSceneHeight() {
    scene.style.height = `${window.innerHeight + SCROLL_DURATION}px`;
}
setSceneHeight();
window.addEventListener('resize', setSceneHeight);

window.addEventListener('scroll', () => {

    const start = scene.offsetTop;
    const progress = clamp((scrollY - start) / SCROLL_DURATION);

    /* 1️⃣ Solapa */
    flap.style.transform = `rotateX(${progress * 180}deg)`;

    /* 2️⃣ Carta */
    letter.style.bottom = `${-100 + progress * 150}%`;

    /* 3️⃣ Sobre desaparece */
    envelope.style.transform = `translateY(${progress * 40}%)`;
    //envelope.style.opacity = `${1 - progress}`;

    /* 5️⃣ Fondo */
    const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
    const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
    const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);

    console.log(progress)

    if (progress >= 0.8) {
        letter.classList.add('active')
    } else {
        letter.classList.remove('active')
    }

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
});
