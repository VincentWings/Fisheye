function displayModal() {
    const modal = document.getElementById("modal-contact");
    modal.classList.toggle("show");
    modal.setAttribute('aria-hidden', modal.classList.contains('show') ? 'false' : 'true');
    
    if (modal.classList.contains('show')) {
        // Set focus to the first input field when the modal is opened
        const firstInput = document.querySelector('.contact-form input, .contact-form textarea');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

function closeModal() {
    const modal = document.getElementById("modal-contact");
    modal.classList.remove("show");
    modal.setAttribute('aria-hidden', 'true');
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
    const errorElement = formDataElement.querySelector('.error-message');
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

    if (errorMessage) {
        formDataElement.classList.add('error');
        input.classList.add('error');
        input.setAttribute('aria-invalid', 'true');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
        errorElement.setAttribute('aria-hidden', 'false');
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
    event.preventDefault(); // Prevent the form from submitting

    let isValid = true; // Track if the form is valid
    let firstErrorField = null;

    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

    // Validate each input field
    formInputs.forEach(input => {
        validateInput({ target: input });

        if (input.getAttribute('aria-invalid') === 'true') {
            isValid = false; // Form is not valid if any field is invalid
            if (!firstErrorField) {
                firstErrorField = input;
            }
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
    } else if (firstErrorField) {
        firstErrorField.focus(); // Focus on the first field with an error
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

// Prevent default form submission behavior on Enter key press within input fields
form.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
        event.preventDefault(); // Prevent Enter key from submitting the form
        validateForm(event); // Manually trigger form validation
    }
});