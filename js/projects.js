


export function initProjects() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const cards = [...track.querySelectorAll('.project-card')];
    const titleEl = document.getElementById('activeProjectTitle');

    let activeIndex = 0;

    function update() {
        const cardWidth = cards[0].offsetWidth + 40;
        const viewport = track.parentElement.offsetWidth;
        const offset = (viewport / 2) - (cardWidth / 2);

        track.style.transform =
            `translate3d(${offset - activeIndex * cardWidth}px,0,0)`;

        cards.forEach((c, i) => {
            c.classList.toggle('active', i === activeIndex);
            c.classList.toggle('prev', i === activeIndex - 1);
            c.classList.toggle('next', i === activeIndex + 1);
        });

        if (titleEl) titleEl.textContent = cards[activeIndex]?.dataset.title || '';
    }

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('next')) activeIndex++;
            if (card.classList.contains('prev')) activeIndex--;
            activeIndex = Math.max(0, Math.min(activeIndex, cards.length - 1));
            update();
        });
    });

    requestAnimationFrame(update);
}
