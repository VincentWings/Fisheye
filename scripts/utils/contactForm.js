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