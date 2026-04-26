export function contact() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const button = form.querySelector('button[type="submit"]');
    const FORM_ENDPOINT = 'https://formspree.io/f/mzdzwyzb';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const originalText = button.textContent;
        button.textContent = 'SENDING...';
        button.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                button.textContent = 'SENT !';
                form.reset();
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                  }, 3000);
            } else {
                const errorData = await response.json();
                console.error("Formspree Error:", errorData);
                button.textContent = originalText;
                button.disabled = false;
            }
        } catch (err) {
            console.error("Network Error:", err);
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}
