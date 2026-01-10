import { initHero } from './hero.js';
import { initProjects } from './projects.js';
import { initModal } from './modal.js';
import { initBackground } from './background.js';

document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initProjects();
    initModal();
    initBackground();
});