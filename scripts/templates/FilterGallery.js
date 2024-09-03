const createFilterGallery = (parameters, callback) => {
    // Select elements from the document
    const filter = document.querySelector(".filter");
    const filters = document.querySelector("#filters");
    const valueFilterSelected = document.querySelector('#filter__selected');
    const btnFilterSelected = document.querySelector("#btn-filter--selected");

    // Toggle the filter visibility when the button is clicked
    btnFilterSelected.addEventListener("click", () => {
        filter.classList.toggle("open"); // Toggle the 'open' class on the filter element
    });

    // Set the initial filter to the first parameter
    const initialFilter = parameters[0];
    btnFilterSelected.value = initialFilter;
    valueFilterSelected.innerText = initialFilter;

    // Create a button for each filter parameter
    parameters.forEach((param, index) => {
        const btnFilter = document.createElement("button"); // Create a new button element
        btnFilter.value = param; // Set the button's value to the filter parameter
        btnFilter.innerText = param; // Set the button's text to the filter parameter

        // Hide the first filter button by default
        if (index === 0) btnFilter.classList.add("hide");

        // Add the button to the filter container
        filters.appendChild(btnFilter);

        // Add a click event listener to each filter button
        btnFilter.addEventListener("click", function (e) {
            // Show all filter buttons
            document.querySelectorAll("#filters > button").forEach(button => {
                button.classList.remove("hide");
            });

            // Hide the button that was clicked
            e.target.classList.add("hide");

            // Update the selected filter value and display text
            btnFilterSelected.value = param;
            valueFilterSelected.innerText = param;

            // Close the filter dropdown by removing the 'open' class
            filter.classList.remove("open");

            // Call the callback function with the selected filter
            callback(param); // This calls the function passed as 'callback'
        });
    });
};

// This function filters and updates the gallery based on the selected filter value
function filterGallery(filterValue, mediaList, photographerData) {
    const gallerySection = document.querySelector(".gallery-section");

    // Function to set up the lightbox feature for the gallery items
    function setupLightbox() {
        const modal = document.getElementById("modal");
        const galleryItems = Array.from(document.getElementsByClassName("linkGallery"));

        // Add click event listeners to each gallery item to open the lightbox
        galleryItems.forEach((galleryItem, index) => {
            galleryItem.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();

                // Show or hide the modal when an item is clicked
                modal.classList.toggle("show");

                // Create and display the lightbox with the clicked item
                const lightbox = new LightBox(mediaList, photographerData, index);
                modal.appendChild(lightbox.createLightBox());

                // Set up navigation and closing features for the lightbox
                lightbox.lightboxBrowser();
                lightbox.lightBoxCloser();
            });
        });
    }

    // Function to update the gallery with the sorted list of media items
    function refreshGallery(sortedMediaList) {
        // Clear the current gallery content
        gallerySection.innerHTML = "";

        // Calculate the total number of likes for the sorted media list
        const totalLikes = sortedMediaList.reduce((total, mediaItem) => total + mediaItem.likes, 0);

        // Create and add each media item to the gallery
        sortedMediaList.forEach((mediaItem) => {
            const mediaObject = new Medias(mediaItem, photographerData);
            const galleryBlock = new ImgGalleryBlock(mediaObject, mediaItem.photographerId, totalLikes);
            gallerySection.appendChild(galleryBlock.createImgGallery());
        });

        // Set up lightbox for the newly added gallery items
        setupLightbox();
    }

    // Determine how to sort the media list based on the selected filter value
    if (filterValue === "Popularité") {
        refreshGallery(sortByPopularity(mediaList));
    } else if (filterValue === "Date") {
        refreshGallery(sortByDate(mediaList));
    } else if (filterValue === "Titre") {
        refreshGallery(sortByTitle(mediaList));
    } else {
        console.error("An error occurred: unknown filter value");
    }
}