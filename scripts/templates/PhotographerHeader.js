// Function to display the photographer header
const photographerHeader = function (photographer) {
    // Destructure the data object to extract properties
    const {
        name,
        portrait,
        city,
        country,
        tagline,
        price
    } = photographer;

    // Construct the picture URL
    const picture = `assets/photographers/id/${portrait}`;

    // Function to get the DOM element for a photographer's header
    function getPhotographerHeaderDOM() {
        // Create the header element
        const header = document.createElement("header");

        // Create the h1 element
        const h1 = document.createElement("h1");
        h1.textContent = name;
        header.appendChild(h1); // Append the h1 to the body (or any specific container)

        // Return the header
        return header;
    }

    // Return the necessary properties and methods
    return {
        picture,
        getPhotographerHeaderDOM,
    };
}