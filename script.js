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
        const contactName = contactForm.querySelector('#contactName');
        const contactEmail = contactForm.querySelector('#contactEmail');
        const contactMessage = contactForm.querySelector('#contactMessage');
        const isLocalPage = ['localhost', '127.0.0.1'].includes(window.location.hostname);
        const contactEndpoint = isLocalPage && window.location.port !== '3000'
            ? 'http://localhost:3000/contacto'
            : '/contacto';

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

            if (!contactName || !contactEmail || !contactMessage) {
                alert('Faltan campos del formulario de contacto.');
                return;
            }

            const datos = {
                nombre: contactName.value.trim(),
                email: contactEmail.value.trim(),
                mensaje: contactMessage.value.trim()
            };

            try {
                const respuesta = await fetch(contactEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                const contentType = respuesta.headers.get('content-type') || '';
                const resultado = contentType.includes('application/json')
                    ? await respuesta.json()
                    : { ok: false, error: 'El servidor de contacto no esta respondiendo correctamente.' };

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
            if (!selectedOption) return;

            const price = selectedOption.dataset.price || '0';
            sessionPrice.textContent = `${price}\u20ac`;
        });
    }

    if (reservaButton && sessionType) {
        reservaButton.addEventListener('click', () => {
            const selectedOption = sessionType.selectedOptions[0];
            if (!selectedOption) return;

            alert(`Has seleccionado la sesi\u00f3n ${selectedOption.textContent} por ${selectedOption.dataset.price}\u20ac. Pronto te contactar\u00e9 para confirmar.`);
        });
    }
});
