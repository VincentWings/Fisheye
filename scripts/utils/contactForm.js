function displayModal() {
    const modal = document.getElementById("modal-contact");
    modal.classList.toggle("show");
}

function closeModal() {
    const modal = document.getElementById("modal-contact");
    modal.classList.toggle("show");
}

class ContactForm {
    constructor(author, container) {
        this._author = author;
        this._container = container;
    }

    // Create the contact form
    createContactForm() {
        const modalTitle = document.querySelector("#modal-title");

        // Create the subtitle element
        const contactFormSubTitle = document.createElement("p");
        contactFormSubTitle.textContent = this._author;
        modalTitle.appendChild(contactFormSubTitle); // Append the subtitle to the title element
    }
}

// Validation function to validate individual form inputs
function validateInput(event) {
    const input = event.target;
    const formDataElement = input.closest('.form-group');
    let errorMessage = '';

    // Validate based on input ID
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

    // Set error message visibility based on validation result
    if (errorMessage) {
        formDataElement.classList.add('error');
        formDataElement.setAttribute('data-error-visible', 'true');
        formDataElement.setAttribute('data-error', errorMessage);
    } else {
        formDataElement.classList.remove('error');
        formDataElement.setAttribute('data-error-visible', 'false');
        formDataElement.removeAttribute('data-error');
    }
}

function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting

    let isValid = true; // Track if the form is valid

    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

    // Validate each input field
    formInputs.forEach(input => {
        validateInput({ target: input });

        const formDataElement = input.closest('.form-group');
        if (formDataElement.getAttribute('data-error-visible') === 'true') {
            isValid = false;
        }
    });

    // If the form is valid, show a success message
    if (isValid) {
        // Remove the form from the modal
        const form = document.querySelector('.contact-form');
        form.remove();

        // Remove the existing title and subtitle
        const modalTitle = document.querySelector('#modal-title');
        modalTitle.innerHTML = ''; // Clear all content inside the #modal-title

        // Create and insert the confirmation message
        const confirmationMessage = document.createElement('h2');
        confirmationMessage.textContent = 'Merci! Votre message a été envoyé avec succès.';
        modalTitle.appendChild(confirmationMessage);
    }
}

// Simple function to check if the text is valid
function isValidText(text) {
    const textRegex = /^[a-zA-ZÀ-ÿ\- ]+$/;
    return textRegex.test(text) && text.trim().length >= 2;
}

// Simple function to check if the email is valid
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Attach event listeners to form inputs for immediate validation feedback
const form = document.querySelector(".contact-form");
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('input', validateInput); // Trigger validation on input change
    input.addEventListener('blur', validateInput); // Trigger validation when input loses focus
});

// Add event listener to the form submit button
form.addEventListener("submit", validateForm);