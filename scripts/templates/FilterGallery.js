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

            // Call the callback function with the selected filter
            callback(param); // This calls the function passed as 'callback'
        });
    });
};

const filterGallery = function (value, list, data) {
    const gallerySection = document.querySelector(".gallery-section");

    const setupLightbox = function () {
        const lightBoxBlock = document.getElementById("lightBoxBlock");
        const nodeElements = [...document.getElementsByClassName("linkGallery")];

        nodeElements.forEach((media, index) => {
            media.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                const lightbox = new LightBox(list, data, index);
                lightBoxBlock.appendChild(lightbox.createLightBox());
                lightbox.lightboxBrowser();
                lightbox.lightBoxCloser();
            });
        });
    };

    const refreshGallery = function (sortedList) {
        gallerySection.innerHTML = ""; // Clear existing gallery content

        const totalLikes = sortedList.reduce((acc, media) => acc + media.likes, 0);

        sortedList.map((media) => new Medias(media, data))
            .forEach((media) => {
                const template = new ImgGalleryBlock(media, media.photographerId, totalLikes);
                gallerySection.appendChild(template.createImgGallery());
            });

        setupLightbox(); // Set up lightbox for the newly added gallery items
    };

    // Sorting and refreshing the gallery based on the selected filter value
    switch (value) {
        case "Popularité":
            refreshGallery(sortByPopularity(list));
            break;
        case "Date":
            refreshGallery(sortByDate(list));
            break;
        case "Titre":
            refreshGallery(sortByTitle(list));
            break;
        default:
            console.error("An error occurred: unknown filter value");
    }
};