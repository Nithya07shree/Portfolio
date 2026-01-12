import { initBackground } from "./background.js";
import { initProjects } from "./projects.js";
import { initModal } from "./modal.js";
import { contact } from "./contact.js";

document.addEventListener('DOMContentLoaded', () => {
    initBackground();
    initProjects();
    initModal();
    contact();
})