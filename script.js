document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-xmark');
            }
        });

        document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // Modal Popup & Form Handling for WhatsApp
    const modal = document.getElementById('contactModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const openModalBtn = document.getElementById('openModalBtn');
    const formTriggers = document.querySelectorAll('.open-form');
    const clientServiceInput = document.getElementById('clientService');
    const whatsappForm = document.getElementById('whatsappForm');

    // Open Modal from "Get in Touch" or Service buttons
    if (openModalBtn) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(clientServiceInput) clientServiceInput.value = "General Inquiry";
            if(modal) modal.classList.add('active');
        });
    }

    formTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            if(clientServiceInput) clientServiceInput.value = serviceName;
            if(modal) modal.classList.add('active');
        });
    });

    // Close Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if(modal) modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Submit Form and Redirect to WhatsApp with filled data
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName').value.trim();
            const service = document.getElementById('clientService').value;
            const message = document.getElementById('clientMessage').value.trim();

            // Apka WhatsApp number yahan likha hai (923357938629 ki jagah apna number likh dein)
            const phoneNumber = "923357938629"; 

            const text = `Hello Oura Identity,%0A*Name:* ${encodeURIComponent(name)}%0A*Service:* ${encodeURIComponent(service)}%0A*Message:* ${encodeURIComponent(message)}`;
            
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;
            window.open(whatsappURL, '_blank');
            
            if(modal) modal.classList.remove('active');
            whatsappForm.reset();
        });
    }
});
