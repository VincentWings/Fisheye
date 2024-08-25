// 1. Select the gallery section in the HTML document where photos will be displayed.
const gallerySection = document.querySelector(".gallery-section");

// 2. Get the photographer's ID from the URL (this helps us know which photographer's data to load).
const photographerPageId = new URL(location.href).searchParams.get("id");

// 3. Sorting functions to organize the gallery

// Sort photos by the number of likes (popularity)
const sortByPopularity = (list) => {
  return list.sort((a, b) => b.likes - a.likes); // Assuming each item has a `likes` property
};

// Sort photos by date (newest first)
const sortByDate = (list) => {
  return list.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming each item has a `date` property
};

// Sort photos by title (alphabetical order)
const sortByTitle = (list) => {
  return list.sort((a, b) => a.title.localeCompare(b.title)); // Assuming each item has a `title` property
};

// 4. Fetch data from JSON file

// Fetch photographer data
async function getPhotographApi() {
  const response = await fetch("data/photographers.json"); // Fetch the JSON file
  const data = await response.json(); // Convert the response to a JavaScript object
  return data.photographers; // Return the photographers array
}

// Fetch media data
async function getMediaApi() {
  const response = await fetch("data/photographers.json"); // Fetch the JSON file
  const data = await response.json(); // Convert the response to a JavaScript object
  return data.media; // Return the media array
}

// 5. Display photographer's information on the page
async function displayData(photographer) {
  const photographerHeader = document.querySelector(".photographer-header"); // Select the header element

  const photographerModel = photographerTemplate(photographer); // Create a model for the photographer
  const userCardElement = photographerModel.getUserCardDOM(); // Get the HTML for the photographer's card

  photographerHeader.appendChild(userCardElement); // Add the photographer's card to the header
}

// 6. The main function that runs the entire app
async function main() {
  try {
    // Fetch photographer and media data
    const photographsData = await getPhotographApi(); // Get the list of photographers
    // Find the photographer in the list whose ID matches the one in the URL
    const photographerInfos = photographsData.find(function (photographer) {
      return photographer.id == photographerPageId;
    });

    // Check if a photographer was found
    if (!photographerInfos) {
      console.error("Photographer not found");
      return; // Stop the function if no photographer is found
    }

    const name = photographerInfos.name.split(" ")[0]; // Get the first name of the photographer

    // Fetch media data related to this photographer
    const mediasData = await getMediaApi(); // Get the list of media
    // Create an array of media items that belong to the photographer
    const gallery = mediasData.filter(function (media) {
      return media.photographerId == photographerPageId;
    });

    // Calculate the total number of likes
    const totalLike = gallery.reduce((sum, item) => sum + item.likes, 0); // Add up all the likes

    // Display the photographer's information
    displayData(photographerInfos);

    // Create a list of filters (sorting options) and display the filtered gallery
    const filterList = ["Popularité", "Date", "Titre"];
    createFilterGallery(filterList, (value) => filterGallery(value, gallery, name));

    // Create and display the like counter
    const counterLike = new CounterLike(totalLike, photographerInfos.price);
    document.body.appendChild(counterLike.createCounterLike());

    // Use the default filter to display the gallery initially
    filterGallery(filterList[0], gallery, name);

    // Create the contact form
    const author = photographerInfos.name;
    const contactForm = new ContactForm(
      author,
      document.getElementById("modal-contact")
    );

    contactForm.createContactForm();
    
  } catch (error) {
    console.error("Error in main function:", error); // If there's an error, log it in the console
  }
}

// 7. Run the main function to start the app
main();