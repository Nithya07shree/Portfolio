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

        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    Accept: 'application/json'
                }
            });

            if (response.ok) {
                button.textContent = 'SENT !';
                form.reset();
            } else {
                button.textContent = originalText;
                button.disabled = false;
            }
        } catch (err) {
            button.textContent = originalText;
            button.disabled = false;
        }
    });
}
