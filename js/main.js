import { initBackground } from "./background.js";
import { initProjects } from "./projects.js";
import { initModal } from "./modal.js";

document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    initProjects();
    initModal();
})