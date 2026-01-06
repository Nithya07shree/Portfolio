export function initHero() {
    const canvas = document.getElementById('neural-canvas');
    const hero = document.querySelector('.hero-section');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let started = false;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.vx = (Math.random() - 0.5);
            this.vy = (Math.random() - 0.5);
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
        }
        draw() {
            ctx.fillStyle = 'rgba(255,46,46,.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        resize();
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
        animate();
        window.addEventListener('resize', resize);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    // 🚀 START ONLY WHEN HERO IS VISIBLE
    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && !started) {
                started = true;
                initParticles();
                observer.disconnect();
            }
        },
        { threshold: 0.2 }
    );

    observer.observe(hero);
}

export function initNameAssemble() {
    const el = document.getElementById("name");
    if (!el) return;

    const text = el.textContent;
    el.textContent = "";

    [...text].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;

        const fromLeft = i % 2 === 0;

        span.style.setProperty(
            "--from-x",
            fromLeft ? "-120vw" : "120vw"
        );
        span.style.setProperty(
            "--from-y",
            `${(Math.random() - 0.5) * 40}px`
        );
        span.style.setProperty(
            "--delay",
            `${i * 70}ms`
        );

        el.appendChild(span);
    });
}

