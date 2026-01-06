export function initModal() {

    document.querySelectorAll('.project-card').forEach(card => {
        const btn = card.querySelector('.view-details-btn');
        if (!btn) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(card);
        });
    });

    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    document.addEventListener('click', (e) => {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) closeModal();
    });
}

function openModal(cardElement) {
    // Get the modal element
    var modal = document.getElementById("projectModal");

    if (!modal) {
        console.error("Modal element not found!");
        return;
    }

    // Get data from the clicked card's data attributes
    var title = cardElement.getAttribute("data-title");
    var longDesc = cardElement.getAttribute("data-long-desc");
    var architecture = cardElement.getAttribute("data-architecture");
    var skills = cardElement.getAttribute("data-skills");
    var github = cardElement.getAttribute("data-github");

    // Populate the modal with the data
    var modalTitle = document.getElementById("modalTitle");
    var modalDescription = document.getElementById("modalDescription");

    if (modalTitle) modalTitle.innerText = title || "Project Title";
    if (modalDescription) modalDescription.innerHTML = longDesc || "";

    // Handle architecture/flowchart image
    var architectureDiv = document.getElementById("modalArchitecture");
    if (architectureDiv) {
        if (architecture && architecture !== "" && architecture !== "null") {
            architectureDiv.innerHTML = `<img src="${architecture}" alt="System Architecture" />`;
        } else {
            architectureDiv.innerHTML = "";
        }
    }

    // Format skills as tags
    var skillsContainer = document.getElementById("modalSkills");
    if (skillsContainer) {
        if (skills && skills !== "") {
            var skillsArray = skills.split(',').map(skill => skill.trim());
            skillsContainer.innerHTML = skillsArray.map(skill =>
                `<span class="skill-tag">${skill}</span>`
            ).join('');
        } else {
            skillsContainer.innerHTML = "";
        }
    }

    // Set GitHub link
    var githubLink = document.getElementById("modalGithub");
    if (githubLink) {
        if (github && github !== "" && github !== "#") {
            githubLink.href = github.startsWith('http') ? github : `https://${github}`;
            githubLink.style.display = "inline-flex";
        } else {
            githubLink.style.display = "none";
        }
    }

    // Display the modal
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

// Function to close the modal (global function for onclick handlers)
function closeModal() {
    var modal = document.getElementById("projectModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }
}

// Close the modal if the user clicks outside of it
document.addEventListener('click', function (event) {
    var modal = document.getElementById("projectModal");
    if (modal && event.target === modal) {
        window.closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (event) {
    var modal = document.getElementById("projectModal");
    if (event.key === 'Escape' && modal && modal.style.display === 'block') {
        window.closeModal();
    }
});
