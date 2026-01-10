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
            ctx.fillStyle = 'rgba(0, 62, 248, 0.5)';
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