class LightBox {
    // Constructor method to initialize the LightBox with an array of media, author info, and the current index
    constructor(mediaArray, authorData, currentIndex) {
        this.mediaArray = mediaArray;
        this.authorData = authorData;
        this.currentIndex = currentIndex;
    }

    // Method to create the LightBox HTML structure and return it
    createLightBox() {
        let mediaContent = "";
        let mediaTitle = this.mediaArray[this.currentIndex].title || ""; // Get the title of the current media

        // Check if the current media is an image
        if (this.mediaArray[this.currentIndex].image) {
            mediaContent = `
                <img 
                    id="LightBoxMedia" 
                    src="assets/photographers/medias/${this.mediaArray[this.currentIndex].image}" 
                    alt="${mediaTitle}"
                /> 
            `;
        }
        // Check if the current media is a video
        else if (this.mediaArray[this.currentIndex].video) {
            mediaContent = `
                <video aria-label="${mediaTitle}" controls width="250" id="LightBoxMedia">
                    <source src="assets/photographers/medias/${this.mediaArray[this.currentIndex].video}" type="video/mp4">
                </video>
            `;
        }

        // Check if a modal-content already exists and remove it to avoid duplicates
        const existingModalContent = document.querySelector(".modal-content");
        if (existingModalContent) {
            existingModalContent.remove();
        }

        // Create a new div element to hold the LightBox content
        const lightBoxElement = document.createElement("div");
        lightBoxElement.classList.add("modal-content");

        // HTML structure for the LightBox, including navigation buttons, media content, and the title
        const lightBoxHTML = `
            <div class="slideShowContainer" id="lightBox">
                <div class="slideShow">
                    <button aria-label="Close dialog" id="close_modal">
                        <span><i class="fa-solid fa-xmark"></i></span>
                    </button>
                    
                    <button id="left" aria-label="Previous image">
                        <span><i class="fa-solid fa-chevron-left"></i></span>
                    </button>

                    <div id="slideShow_modal">
                        <div id="mediaContainer">
                            <div class="Img">
                                ${mediaContent}
                            </div>
                            
                            <div class="ImgInfos">
                                <p>${mediaTitle}</p>
                            </div>
                        </div>
                    </div>

                    <button id="right" aria-label="Next image">
                        <span><i class="fa-solid fa-chevron-right"></i></span>
                    </button>
                </div>
            </div>
        `;

        // Insert the LightBox HTML into the created div element
        lightBoxElement.innerHTML = lightBoxHTML;

        return lightBoxElement;
    }

    // Method to close the LightBox when the close button is clicked
    lightBoxCloser() {
        const closeButton = document.getElementById("close_modal");

        closeButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            // Remove the "show" class from the #modal element
            const modal = document.getElementById("modal");
            if (modal) {
                modal.classList.remove("show");
            }

            // Remove the LightBox from the DOM
            document.getElementById("lightBox").remove();
        });
    }

    // Method to change the media content (image/video) in the LightBox based on the current index
    changeMedia(index) {
        const media = this.mediaArray[index];
        console.log(media); // Log the current media to the console
    }

    // Method to handle navigation (left/right) within the LightBox
    lightboxBrowser() {
        const rightButton = document.getElementById("right");
        const leftButton = document.getElementById("left");

        rightButton.focus(); // Focus on the right button initially

        // Event listener for the right (next) button
        rightButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.currentIndex += 1; // Move to the next media
            if (this.currentIndex >= this.mediaArray.length) {
                this.currentIndex = 0; // Loop back to the first media if at the end
            }
            console.log(this.currentIndex);

            this.updateMediaContent(); // Update the media content in the LightBox
        });

        // Event listener for the left (previous) button
        leftButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.currentIndex -= 1; // Move to the previous media
            if (this.currentIndex < 0) {
                this.currentIndex = this.mediaArray.length - 1; // Loop back to the last media if at the beginning
            }
            console.log(this.currentIndex);

            this.updateMediaContent(); // Update the media content in the LightBox
        });
    }

    // Method to update the media content (image/video) in the LightBox based on the current index
    updateMediaContent() {
        document.getElementById("LightBoxMedia").remove(); // Remove the old media content

        const mediaContainer = document.querySelector("#mediaContainer .Img");
        const imgInfos = document.querySelector(".ImgInfos p");
        let mediaContent = "";
        let mediaTitle = this.mediaArray[this.currentIndex].title || ""; // Get the title of the current media

        // Check if the current media is an image
        if (this.mediaArray[this.currentIndex].image) {
            mediaContent = `
                <img 
                    id="LightBoxMedia" 
                    src="assets/photographers/medias/${this.mediaArray[this.currentIndex].image}" 
                    alt="${mediaTitle}"
                /> 
            `;
        }
        // Check if the current media is a video
        else if (this.mediaArray[this.currentIndex].video) {
            mediaContent = `
                <video aria-label="${mediaTitle}" controls width="250" id="LightBoxMedia">
                    <source src="assets/photographers/medias/${this.mediaArray[this.currentIndex].video}" type="video/mp4">
                </video>
            `;
        }

        // Insert the new media content into the media container
        mediaContainer.innerHTML = mediaContent;

        // Update the title in the ImgInfos section
        imgInfos.textContent = mediaTitle;
    }
}