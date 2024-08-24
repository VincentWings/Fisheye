// Template function for creating a photographer card
function photographerTemplate(data) {
    // Destructure the data object to extract properties
    const { name, portrait, id, city, country, tagline, price } = data;

    // Construct the picture URL
    const picture = `assets/photographers/id/${portrait}`;

    // Function to get the DOM element for a photographer's user card
    function getUserCardDOM() {
        // Create the article element for the homepage
        const article = document.createElement("article");

        // Create a link element to wrap the image and the h2
        const link = document.createElement("a");
        link.setAttribute("href", `photographer.html?id=${id}`);

        // Create the img element
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        // Create the h2 element
        const h2 = document.createElement("h2");
        h2.textContent = name;

        // Append the img and h2 to the link
        link.appendChild(img);
        link.appendChild(h2);

        // Create the city paragraph element
        const cityElement = document.createElement("p");
        cityElement.textContent = `${city}, ${country}`;
        cityElement.classList.add("city");

        // Create the tagline paragraph element
        const taglineElement = document.createElement("p");
        taglineElement.textContent = tagline;
        taglineElement.classList.add("tagline");

        // Create the price paragraph element
        const priceElement = document.createElement("p");
        priceElement.textContent = `${price}€/jour`;
        priceElement.classList.add("price");

        // Append all elements to the article
        article.appendChild(link);
        article.appendChild(cityElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        // Return the article
        return article;
    }

    // Return the necessary properties and methods
    return {
        name,
        picture,
        getUserCardDOM,
    };
}

// Function to fetch photographers data
async function getPhotographers() {
    const url = "data/photographers.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        const { photographers } = data;
        console.log(photographers);
        return photographers;
    } catch (error) {
        console.error('Fetch operation failed:', error);
        return [];
    }
}

// Function to display photographers on the homepage
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Initialization function
async function init() {
    // Fetch photographers data
    const photographers = await getPhotographers();

    // Display data on the homepage
    await displayData(photographers);
}

// Run the init function to start the application
init();