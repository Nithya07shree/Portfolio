export function initBackground() {
    const canvas = document.getElementById("stars-canvas");
    if (!canvas) return;

    const hero = document.querySelector(".hero");
    if (!hero) return;

    const ctx = canvas.getContext("2d");

    let stars = [];
    let started = false;
    let rafId = null;
    let last = 0;
    let isPaused = false;

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function createStars(count = 100) {
        stars = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 0.8 + 0.4,
            speed: Math.random() * 0.4 + 0.1,
            color: Math.random() > 0.75
                ? "rgba(0, 89, 255, 0.8)"
                : "rgba(255, 255, 255, 0.8)"
        }));
    }

    function animate(ts) {
        if (isPaused) return;

        if (ts - last < 40) {
            rafId = requestAnimationFrame(animate);
            return;
        }
        last = ts;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const star of stars) {
            star.y -= star.speed;
            if (star.y < 0) star.y = canvas.height;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.fill();
        }

        rafId = requestAnimationFrame(animate);
    }

    function start() {
        resizeCanvas();
        createStars();
        isPaused = false;
        rafId = requestAnimationFrame(animate);
        window.addEventListener("resize", resizeCanvas);
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            isPaused = true;
            if (rafId) cancelAnimationFrame(rafId);
        } else if (started) {
            isPaused = false;
            last = 0;
            rafId = requestAnimationFrame(animate);
        }
    });

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !started) {
                started = true;
                start();
                observer.disconnect();
            }
        },
        { threshold: 0.2 }
    );

    observer.observe(hero);
}
