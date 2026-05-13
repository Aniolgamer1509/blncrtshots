document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const target = document.querySelector(anchor.getAttribute('href'));
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
        document.querySelector('.contact-success-overlay')?.remove();

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
        contactForm.querySelectorAll('input, textarea').forEach(field => {
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

            const datos = {
                nombre: document.querySelector('#contactName').value.trim(),
                email: document.querySelector('#contactEmail').value.trim(),
                mensaje: document.querySelector('#contactMessage').value.trim()
            };

            try {
                const respuesta = await fetch('http://localhost:3000/contacto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();

                if (respuesta.ok && resultado.ok) {
                    contactForm.reset();
                    showContactSuccess();
                } else {
                    alert(resultado.error || 'Vaya, hubo un error al enviar el mensaje.');
                }
            } catch (error) {
                console.error('Error al conectar con el servidor:', error);
                alert('No se pudo conectar con el servidor. Aseg\u00farate de encenderlo con "node server.js".');
            }
        });
    }

    const sessionType = document.querySelector('#sessionType');
    const sessionPrice = document.querySelector('#sessionPrice');
    const reservaButton = document.querySelector('.reserva-button');

    if (sessionType && sessionPrice) {
        sessionType.addEventListener('change', () => {
            const selectedOption = sessionType.selectedOptions[0];
            const price = selectedOption.dataset.price || '0';
            sessionPrice.textContent = `${price}\u20ac`;
        });
    }

    if (reservaButton && sessionType) {
        reservaButton.addEventListener('click', () => {
            const selectedOption = sessionType.selectedOptions[0];
            alert(`Has seleccionado la sesi\u00f3n ${selectedOption.textContent} por ${selectedOption.dataset.price}\u20ac. Pronto te contactar\u00e9 para confirmar.`);
        });
    }
});
