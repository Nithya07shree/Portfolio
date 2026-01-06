export function initBackground() {
    const canvas = document.createElement("canvas");
    canvas.id = "stars-canvas";
    document.body.prepend(canvas);

    const hero = document.getElementById("hero");
    if (!hero) return;

    const ctx = canvas.getContext("2d");
    let stars = [];
    let started = false;

    let rafId = null;
    let isPaused = false;
    let last = 0;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars(count = 70) {
        stars = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 0.8 + 0.4,
            speed: Math.random() * 0.4 + 0.1,
            color: Math.random() > 0.75
                ? "rgba(255,140,0,0.8)"
                : "rgba(255,255,255,0.8)"
        }));
    }

    function animateStars(ts) {
        if (isPaused) return;

        if (ts - last < 40) {
            rafId = requestAnimationFrame(animateStars);
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

        rafId = requestAnimationFrame(animateStars);
    }

    function startStars() {
        resizeCanvas();
        createStars();
        isPaused = false;
        rafId = requestAnimationFrame(animateStars);
        window.addEventListener("resize", resizeCanvas);
    }

    function handleVisibilityChange() {
        if (document.hidden) {
            isPaused = true;
            if (rafId) cancelAnimationFrame(rafId);
        } else if (started) {
            isPaused = false;
            last = 0;
            rafId = requestAnimationFrame(animateStars);
        }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !started) {
                started = true;
                startStars();
                observer.disconnect();
            }
        },
        { threshold: 0.2 }
    );

    observer.observe(hero);
}
