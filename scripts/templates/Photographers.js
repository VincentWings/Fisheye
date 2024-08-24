// Template function for creating a photographer card
function photographerTemplate(data) {
    // Destructure the data object to extract properties
    const { name, portrait, id, city, country, tagline, price } = data;

    // Construct the picture URL
    const picture = `assets/photographers/id/${portrait}`;

    const photographerHeader = document.querySelector(".photographer-header");

    // Function to get the DOM element for a photographer's user card
    function getUserCardDOM() {
        // Create the element based on the page type
        const container = document.createElement("div");
        container.classList.add("photographer-info");

        // Create the img element
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name); // Use the photographer's name for alt text

        // Create the h1 element
        const h1 = document.createElement("h1");
        h1.textContent = name;

        // Create the city paragraph element
        const cityElement = document.createElement("p");
        cityElement.textContent = `${city}, ${country}`;
        cityElement.classList.add("city");

        // Create the tagline paragraph element
        const taglineElement = document.createElement("p");
        taglineElement.textContent = tagline;
        taglineElement.classList.add("tagline");

        // Append all elements to the container
        container.appendChild(h1);
        container.appendChild(cityElement);
        container.appendChild(taglineElement);

        // Append img element to the container
        photographerHeader.appendChild(img);

        // Return the container
        return container;
    }

    // Return the necessary properties and methods
    return {
        name,
        picture,
        getUserCardDOM,
    };
} 