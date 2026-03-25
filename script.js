// Splash screen: hide after 2.5 seconds
(function() {
    const splash = document.getElementById('splash-screen');
    if (splash) {
        setTimeout(() => {
            splash.classList.add('hidden');
            setTimeout(() => splash.remove(), 800);
        }, 2500);
    }
})();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');
    });
}

// Close mobile menu on clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        }
    });
});

// Intersection Observer for scroll animations (fade-in-up)
const faders = document.querySelectorAll('.fade-in-up');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Booking Modal Logic
const bookingModal = document.getElementById('bookingModal');
const serviceSelect = document.getElementById('service');

function openBookingModal(serviceName = '') {
    // If a specific service was clicked, select it in the dropdown
    if (serviceName) {
        // Find the option and select it
        Array.from(serviceSelect.options).forEach(opt => {
            if (opt.value === serviceName) {
                opt.selected = true;
            }
        });
    } else {
        serviceSelect.selectedIndex = 0;
    }
    
    // Show modal
    bookingModal.classList.add('show');
    
    // Set min date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

function closeBookingModal() {
    bookingModal.classList.remove('show');
    document.getElementById('bookingForm').reset();
}

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

// WhatsApp Booking Submission
function handleBookingSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    // Validation
    if (!name || !service || !date || !time) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    
    // Format the date for better reading (YYYY-MM-DD -> DD/MM/YYYY)
    const dateParts = date.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    
    // Compose WhatsApp message
    const message = `¡Hola! Me gustaría agendar una cita.\n\n*Nombre:* ${name}\n*Servicio:* ${service}\n*Fecha:* ${formattedDate}\n*Hora:* ${time}\n\nPor favor confirmen disponibilidad. ¡Gracias!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Replace this number with the actual WhatsApp number of "Masajes Asunción"
    // Format: Country code + phone number without + or spaces or hyphens. Example: 595981123456
    const whatsappNumber = "595999999999"; 
    
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal after redirection
    closeBookingModal();
}

// Newsletter Submission
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById('newsletterEmail').value;
    
    if (!emailInput) return;
    
    // Configura el correo de destino aquí
    const destinationEmail = "contacto@masajesasuncion.com"; 
    const subject = encodeURIComponent("Nueva solicitud de suscripción a correos");
    const body = encodeURIComponent(`Hola,\n\nQuiero suscribirme a su lista de correos.\n\nMi correo electrónico es: ${emailInput}\n\nPor favor, ténganme en cuenta para sus novedades.`);
    
    // Redirects to open default mail app
    window.location.href = `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
    
    // Reset form and advise user
    document.getElementById('newsletterForm').reset();
    alert("Se abrirá tu gestor de correos. Por favor, envía el mensaje para completar la suscripción.");
}
