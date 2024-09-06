function displayModal() {
    const modal = document.getElementById("modal-contact");
    modal.classList.add("show");
    modal.setAttribute('aria-hidden', 'false');
    
    // Set focus to the first input field when the modal is opened
    const firstInput = modal.querySelector('.contact-form input, .contact-form textarea');
    if (firstInput) {
        firstInput.focus();
    }

    // Trap focus within the modal
    trapFocus(modal);

    // Add event listeners to the close button
    setupCloseButton();
}

document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.btn-close');
    
    if (closeButton) {
        // Add event listener for click to close the modal
        closeButton.addEventListener('click', closeModal);
    }
});

function closeModal() {
    const modal = document.getElementById("modal-contact");
    modal.classList.remove("show");
    modal.setAttribute('aria-hidden', 'true');

    // Return focus to the trigger button
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

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    }

    modal.addEventListener('keydown', handleKeyDown);

    // Remove event listener when modal is closed
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

// Validation function for input fields
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

    formInputs.forEach(input => {
        validateInput({ target: input });

        if (input.getAttribute('aria-invalid') === 'true') {
            isValid = false;
            if (!firstErrorField) {
                firstErrorField = input;
            }
        }
    });

    if (isValid) {
        // Remove the form from the modal
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

// Handle Enter keypress to validate the form
form.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        event.preventDefault();
        validateForm(event);
    }
});

// ContactForm class to create the subtitle
class ContactForm {
    constructor(author, container) {
        this._author = author;
        this._container = container;
    }

    createContactForm() {
        const modalTitle = document.querySelector("#modal-title");

        // Create the subtitle element
        const contactFormSubTitle = document.createElement("p");
        contactFormSubTitle.textContent = this._author;
        modalTitle.appendChild(contactFormSubTitle); // Append the subtitle to the title element
    }
}