class LightBox {
    constructor(mediaArray, authorData, currentIndex) {
        this.mediaArray = mediaArray;
        this.authorData = authorData;
        this.currentIndex = currentIndex;
    }

    createLightBox() {
        let mediaContent = "";
        let mediaTitle = this.mediaArray[this.currentIndex].title || "";

        if (this.mediaArray[this.currentIndex].image) {
            mediaContent = 
                `<img 
                    id="LightBoxMedia" 
                    src="assets/photographers/medias/${this.mediaArray[this.currentIndex].image}" 
                    alt="${mediaTitle}, closeup view"
                    tabindex="3"
                />`;
        } else if (this.mediaArray[this.currentIndex].video) {
            mediaContent = 
                `<video aria-label="${mediaTitle}, closeup view" controls width="250" id="LightBoxMedia" tabindex="3">
                    <source src="assets/photographers/medias/${this.mediaArray[this.currentIndex].video}" type="video/mp4">
                </video>`;
        }

        const existingModalContent = document.querySelector(".modal-content");
        if (existingModalContent) {
            existingModalContent.remove();
        }

        const lightBoxElement = document.createElement("div");
        lightBoxElement.classList.add("modal-content");

        const lightBoxHTML = 
            `<div class="slideShowContainer" id="lightBox" role="dialog" aria-modal="true">
                <div class="slideShow">
                    <button aria-label="Close dialog" id="close_modal" tabindex="5">
                        <span><i class="fa-solid fa-xmark"></i></span>
                    </button>
                    
                    <button id="left" aria-label="Previous media" tabindex="2">
                        <span><i class="fa-solid fa-chevron-left"></i></span>
                    </button>

                    <div id="slideShow_modal">
                        <div id="mediaContainer">
                            <div class="Img">
                                ${mediaContent}
                            </div>
                            
                            <div class="ImgInfos" tabindex="4">
                                <p>${mediaTitle}</p>
                            </div>
                        </div>
                    </div>

                    <button id="right" aria-label="Next media" tabindex="1">
                        <span><i class="fa-solid fa-chevron-right"></i></span>
                    </button>
                </div>
            </div>`;

        lightBoxElement.innerHTML = lightBoxHTML;
        document.body.appendChild(lightBoxElement);

        const rightButton = document.getElementById("right");
        rightButton.focus(); // Set initial focus to the right arrow

        this.trapFocus(); // Ensure focus is trapped within the Lightbox

        return lightBoxElement;
    }

    lightBoxCloser() {
        const closeButton = document.getElementById("close_modal");

        // Close modal when clicking the close button
        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.closeLightbox();
        });

        // Close modal when pressing the Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                this.closeLightbox();
            }
        });
    }

    // Create a reusable function to close the lightbox
    closeLightbox() {
        const modal = document.getElementById("modal");
        if (modal) {
            modal.classList.remove("show");
        }

        const lightbox = document.getElementById("lightBox");
        if (lightbox) {
            lightbox.remove();
        }
    }

    lightboxBrowser() {
        const rightButton = document.getElementById("right");
        const leftButton = document.getElementById("left");

        rightButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.currentIndex += 1;
            if (this.currentIndex >= this.mediaArray.length) {
                this.currentIndex = 0;
            }
            this.updateMediaContent();
        });

        leftButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            this.currentIndex -= 1;
            if (this.currentIndex < 0) {
                this.currentIndex = this.mediaArray.length - 1;
            }
            this.updateMediaContent();
        });
    }

    updateMediaContent() {
        document.getElementById("LightBoxMedia").remove();

        const mediaContainer = document.querySelector("#mediaContainer .Img");
        const imgInfos = document.querySelector(".ImgInfos p");
        let mediaContent = "";
        let mediaTitle = this.mediaArray[this.currentIndex].title || "";

        if (this.mediaArray[this.currentIndex].image) {
            mediaContent = 
                `<img 
                    id="LightBoxMedia" 
                    src="assets/photographers/medias/${this.mediaArray[this.currentIndex].image}" 
                    alt="${mediaTitle}, closeup view"
                    tabindex="3"
                />`;
        } else if (this.mediaArray[this.currentIndex].video) {
            mediaContent = 
                `<video aria-label="${mediaTitle}, closeup view" controls width="250" id="LightBoxMedia" tabindex="3">
                    <source src="assets/photographers/medias/${this.mediaArray[this.currentIndex].video}" type="video/mp4">
                </video>`;
        }

        mediaContainer.innerHTML = mediaContent;
        imgInfos.textContent = mediaTitle;
    }

    trapFocus() {
        const lightbox = document.getElementById("lightBox");
        const focusableElements = [
            document.getElementById("right"), // Tabindex 1
            document.getElementById("left"),  // Tabindex 2
            document.getElementById("LightBoxMedia"), // Tabindex 3 (video or image)
            document.querySelector(".ImgInfos"), // Tabindex 4
            document.getElementById("close_modal") // Tabindex 5
        ];

        let firstFocusableElement = focusableElements[0]; // Right button
        let lastFocusableElement = focusableElements[focusableElements.length - 1]; // Close button

        const trapHandler = (event) => {
            const isTabPressed = event.key === "Tab";
            if (!isTabPressed) return;

            if (event.shiftKey) {
                // Shift + Tab: Move backwards
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                // Tab: Move forward
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        };

        document.addEventListener("keydown", trapHandler);

        // Ensure that the video can be focused by setting its tabindex
        const lightBoxMedia = document.getElementById("LightBoxMedia");
        if (lightBoxMedia && lightBoxMedia.tagName === "VIDEO") {
            lightBoxMedia.setAttribute("tabindex", "3"); // Set tabindex for video
        }

        // Remove trapHandler when closing the lightbox
        document.getElementById("close_modal").addEventListener("click", () => {
            document.removeEventListener("keydown", trapHandler);
        });
    }
}