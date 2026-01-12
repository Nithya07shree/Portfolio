export function initProjects() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const cards = [...track.querySelectorAll('.project-card')];
    const viewportEl = track.parentElement;
    const titleEl = document.getElementById('activeProjectTitle');

    let activeIndex = 0;
    let isMobile = window.innerWidth <= 768;

    function setClasses(index) {
        cards.forEach((c, i) => {
            c.classList.toggle('active', i === index);
            c.classList.toggle('prev', i === index - 1);
            c.classList.toggle('next', i === index + 1);
        });

        if (titleEl) {
            titleEl.textContent =
                cards[index]?.dataset.title || '';
        }
    }

    function updateDesktop() {
        const cardGap = 40;
        const cardWidth = cards[0].offsetWidth + cardGap;
        const viewport = viewportEl.offsetWidth;
        const offset = (viewport / 2) - (cardWidth / 2);

        track.style.transform =
            `translate3d(${offset - activeIndex * cardWidth}px,0,0)`;

        setClasses(activeIndex);
    }

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (isMobile) return; // 🚫 no hover on mobile

            if (card.classList.contains('next')) activeIndex++;
            if (card.classList.contains('prev')) activeIndex--;

            activeIndex = Math.max(0, Math.min(activeIndex, cards.length - 1));
            updateDesktop();
        });
    });


    function updateMobile() {
        const center =
            viewportEl.scrollLeft + viewportEl.offsetWidth / 2;

        let closestIndex = activeIndex;
        let minDistance = Infinity;

        cards.forEach((card, i) => {
            const cardCenter =
                card.offsetLeft + card.offsetWidth / 2;

            const distance = Math.abs(center - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        });

        if (closestIndex !== activeIndex) {
            activeIndex = closestIndex;
            setClasses(activeIndex);
        }
    }

    function syncMode() {
        isMobile = window.innerWidth <= 768;

        if (isMobile) {
            track.style.transform = 'none';
            viewportEl.addEventListener('scroll', updateMobile, { passive: true });
            updateMobile();
        } else {
            viewportEl.removeEventListener('scroll', updateMobile);
            updateDesktop();
        }
    }

    window.addEventListener('resize', syncMode);
    requestAnimationFrame(syncMode);
}
