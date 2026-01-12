export function initProjects() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    const viewport = track.parentElement;
    const cards = [...track.querySelectorAll('.project-card')];
    const titleEl = document.getElementById('activeProjectTitle');
    let activeIndex = 0;
    const isMobile = () => window.innerWidth <= 768;

    function setActive(index) {
        activeIndex = Math.max(0, Math.min(index, cards.length - 1));

        cards.forEach((card, i) => {
            card.classList.toggle('active', i === activeIndex);
            card.classList.toggle('prev', i === activeIndex - 1);
            card.classList.toggle('next', i === activeIndex + 1);
        });

        if (titleEl) {
            titleEl.textContent = cards[activeIndex]?.dataset.title || '';
        }
    }

    function centerDesktop() {
        const gap = 40;
        const cardWidth = cards[0].offsetWidth + gap;
        const offset =
            viewport.offsetWidth / 2 - cardWidth / 2;

        track.style.transform =
            `translate3d(${offset - activeIndex * cardWidth}px,0,0)`;
    }

    function centerMobile() {
        const card = cards[activeIndex];
        if (!card) return;
        viewport.scrollLeft =
            card.offsetLeft -
            (viewport.offsetWidth / 2 - card.offsetWidth / 2);
    }
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (isMobile()) return;
            if (card.classList.contains('next')) setActive(activeIndex + 1);
            if (card.classList.contains('prev')) setActive(activeIndex - 1);
            centerDesktop();
        });
    });

    function onScroll() {
        if (!isMobile()) return;
        const center = viewport.scrollLeft + viewport.offsetWidth / 2;
        let closest = 0;
        let min = Infinity;
        cards.forEach((card, i) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const dist = Math.abs(center - cardCenter);
            if (dist < min) {
                min = dist;
                closest = i;
            }
        });
        setActive(closest);
    }

    function init() {
        setActive(0);
        if (isMobile()) {
            track.style.transform = 'none';
            viewport.addEventListener('scroll', onScroll, { passive: true });
            centerMobile();
        } else {
            viewport.removeEventListener('scroll', onScroll);
            centerDesktop();
        }
    }
    window.addEventListener('resize', init);
    requestAnimationFrame(init);
}
