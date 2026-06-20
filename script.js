/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 100);
        }, { passive: true });
    }

    function showContactSuccess() {
        const previousOverlay = document.querySelector('.contact-success-overlay');
        if (previousOverlay) {
            previousOverlay.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'contact-success-overlay';
        overlay.setAttribute('role', 'status');
        overlay.setAttribute('aria-live', 'polite');

        const message = document.createElement('div');
        message.className = 'contact-success-message';
        message.textContent = 'PRONTO TE CONTACTAR\u00c9';

        overlay.appendChild(message);
        document.body.appendChild(overlay);

        window.setTimeout(() => {
            overlay.remove();
        }, 2600);
    }

    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');

        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            let typingTimer;

            field.addEventListener('input', () => {
                field.classList.add('is-typing');
                window.clearTimeout(typingTimer);

                typingTimer = window.setTimeout(() => {
                    field.classList.remove('is-typing');
                }, 450);
            });
        });

        contactForm.addEventListener('submit', async event => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            showContactSuccess();

            if (submitButton) {
                submitButton.disabled = true;
            }

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    headers: { Accept: 'application/json' },
                    body: new FormData(contactForm)
                });

                if (!response.ok) {
                    throw new Error('No se pudo enviar el formulario.');
                }

                window.setTimeout(() => {
                    contactForm.reset();
                }, 2600);
            } catch (error) {
                console.error('Error enviando el formulario:', error);
                alert('No se pudo enviar el mensaje. Inténtalo de nuevo en unos segundos.');
            } finally {
                window.setTimeout(() => {
                    if (submitButton) {
                        submitButton.disabled = false;
                    }
                }, 2600);
            }
        });
    }
});
