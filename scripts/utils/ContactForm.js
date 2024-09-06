function displayModal() {
    const modal = document.getElementById("modal-contact");
    modal.classList.add("show");
    modal.setAttribute('aria-hidden', 'false');
    
    const firstInput = modal.querySelector('.contact-form input, .contact-form textarea');
    if (firstInput) {
        firstInput.focus();
    }

    trapFocus(modal);
    setupCloseButton();
}

document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.btn-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

function closeModal() {
    const modal = document.getElementById("modal-contact");
    modal.classList.remove("show");
    modal.setAttribute('aria-hidden', 'true');

    const triggerButton = document.querySelector('.contact-button');
    if (triggerButton) {
        triggerButton.focus();
    }
}

function trapFocus(modal) {
    const focusableElements = modal.querySelectorAll('button, input, textarea, [tabindex="0"]');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    function handleKeyDown(e) {
        const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

        if (!isTabPressed) return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }

    modal.addEventListener('keydown', handleKeyDown);

    modal.addEventListener('transitionend', () => {
        if (modal.getAttribute('aria-hidden') === 'true') {
            modal.removeEventListener('keydown', handleKeyDown);
        }
    }, { once: true });
}

function setupCloseButton() {
    const closeButton = document.querySelector('.btn-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
}

function validateInput(event) {
    const input = event.target;
    const formDataElement = input.closest('.form-group');
    const errorElement = formDataElement.querySelector('.error-message');
    let errorMessage = '';

    switch (input.id) {
        case 'first-name':
        case 'last-name':
            if (!isValidText(input.value)) {
                errorMessage = `Le champ du ${input.id === 'first-name' ? 'prénom' : 'nom'} ne doit contenir que des lettres, des tirets et des espaces, et doit avoir au moins 2 caractères.`;
            }
            break;

        case 'email':
            if (!isValidEmail(input.value.trim())) {
                errorMessage = 'Veuillez entrer une adresse e-mail valide.';
            }
            break;

        case 'message':
            if (input.value.trim().length < 10) {
                errorMessage = 'Votre message doit contenir au moins 10 caractères.';
            }
            break;
    }

    if (errorMessage) {
        formDataElement.classList.add('error');
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
        errorElement.setAttribute('aria-hidden', 'false');
        errorElement.setAttribute('aria-live', 'assertive');
    } else {
        formDataElement.classList.remove('error');
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        errorElement.setAttribute('aria-hidden', 'true');
    }
}

function validateForm(event) {
    event.preventDefault();

    let isValid = true;
    let firstErrorField = null;

    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    const formData = {};

    formInputs.forEach(input => {
        validateInput({ target: input });

        if (input.getAttribute('aria-invalid') === 'true') {
            isValid = false;
            if (!firstErrorField) {
                firstErrorField = input;
            }
        }

        // Gather the form data for logging
        formData[input.id] = input.value.trim();
    });

    // Log the form data in a clean way
    console.log("Form Data Submitted:");
    Object.keys(formData).forEach(key => {
        console.log(`${key}: ${formData[key]}`);
    });

    if (isValid) {
        const form = document.querySelector('.contact-form');
        form.remove();

        const modalTitle = document.querySelector('#modal-title');
        modalTitle.innerHTML = '';

        const confirmationMessage = document.createElement('h2');
        confirmationMessage.textContent = 'Merci! Votre message a été envoyé avec succès.';
        modalTitle.appendChild(confirmationMessage);

        const closeButton = document.querySelector('.btn-close');
        if (closeButton) {
            closeButton.focus();
        }
    } else if (firstErrorField) {
        firstErrorField.focus();
    }
}

function isValidText(text) {
    const textRegex = /^[a-zA-ZÀ-ÿ\- ]+$/;
    return textRegex.test(text) && text.trim().length >= 2;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const form = document.querySelector(".contact-form");
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('input', validateInput);
    input.addEventListener('blur', validateInput);
});

form.addEventListener("submit", validateForm);

form.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        event.preventDefault();
        validateForm(event);
    }
});

class ContactForm {
    constructor(author, container) {
        this._author = author;
        this._container = container;
    }

    createContactForm() {
        const modalTitle = document.querySelector("#modal-title");

        const contactFormSubTitle = document.createElement("p");
        contactFormSubTitle.textContent = this._author;
        modalTitle.appendChild(contactFormSubTitle);
    }
}