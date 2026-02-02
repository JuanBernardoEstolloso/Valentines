const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const container = document.querySelector(".buttons");

let x = 0;
let y = 0;
let vx = 0;
let vy = 0;

// Physics tuning
const repelDistance = 120;
const acceleration = 4;
const friction = 0.88;
const maxSpeed = 20;

container.addEventListener("mousemove", (e) => {
    const contRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const btnX = btnRect.left + btnRect.width / 2;
    const btnY = btnRect.top + btnRect.height / 2;

    const dx = btnX - mouseX;
    const dy = btnY - mouseY;

    const distance = Math.hypot(dx, dy);

    if (distance < repelDistance) {
        vx += (dx / distance) * acceleration;
        vy += (dy / distance) * acceleration;
    }
});

function animate() {
    vx *= friction;
    vy *= friction;

    vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
    vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));

    x += vx;
    y += vy;

    const maxX = container.clientWidth - noBtn.offsetWidth;
    const maxY = container.clientHeight - noBtn.offsetHeight;

    // Bounce logic
    if (x < 0) { x = 0; vx *= -0.6; }
    if (y < 0) { y = 0; vy *= -0.6; }
    if (x > maxX) { x = maxX; vx *= -0.6; }
    if (y > maxY) { y = maxY; vy *= -0.6; }

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(animate);
}

animate();

yesBtn.addEventListener("click", () => {
    // Make sure nextpage.html actually exists in your folder!
    window.location.href = "nextpage.html";
});