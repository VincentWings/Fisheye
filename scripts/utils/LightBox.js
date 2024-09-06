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
            mediaContent = `
                <img 
                    id="LightBoxMedia" 
                    src="assets/photographers/medias/${this.mediaArray[this.currentIndex].image}" 
                    alt="${mediaTitle}, closeup view"
                /> 
            `;
        } else if (this.mediaArray[this.currentIndex].video) {
            mediaContent = `
                <video aria-label="${mediaTitle}, closeup view" controls width="250" id="LightBoxMedia">
                    <source src="assets/photographers/medias/${this.mediaArray[this.currentIndex].video}" type="video/mp4">
                </video>
            `;
        }

        const existingModalContent = document.querySelector(".modal-content");
        if (existingModalContent) {
            existingModalContent.remove();
        }

        const lightBoxElement = document.createElement("div");
        lightBoxElement.classList.add("modal-content");

        const lightBoxHTML = `
            <div class="slideShowContainer" id="lightBox">
                <div class="slideShow">
                    <button aria-label="Close dialog" id="close_modal" tabindex="3">
                        <span><i class="fa-solid fa-xmark"></i></span>
                    </button>
                    
                    <button id="left" aria-label="Previous image" tabindex="2">
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

                    <button id="right" aria-label="Next image" tabindex="1">
                        <span><i class="fa-solid fa-chevron-right"></i></span>
                    </button>
                </div>
            </div>
        `;

        lightBoxElement.innerHTML = lightBoxHTML;
        document.body.appendChild(lightBoxElement);

        // Focus the right arrow button when the Lightbox is created
        const rightButton = document.getElementById("right");
        rightButton.focus(); // Set initial focus to the right arrow

        this.trapFocus(); // Ensure focus is trapped within the Lightbox

        return lightBoxElement;
    }

    lightBoxCloser() {
        const closeButton = document.getElementById("close_modal");

        closeButton.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();

            const modal = document.getElementById("modal");
            if (modal) {
                modal.classList.remove("show");
            }

            document.getElementById("lightBox").remove();
        });
    }

    lightboxBrowser() {
        const rightButton = document.getElementById("right");
        const leftButton = document.getElementById("left");

        rightButton.focus(); // Focus on the right button initially

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
            mediaContent = `
                <img 
                    id="LightBoxMedia" 
                    src="assets/photographers/medias/${this.mediaArray[this.currentIndex].image}" 
                    alt="${mediaTitle}, closeup view"
                /> 
            `;
        } else if (this.mediaArray[this.currentIndex].video) {
            mediaContent = `
                <video aria-label="${mediaTitle}, closeup view" controls width="250" id="LightBoxMedia">
                    <source src="assets/photographers/medias/${this.mediaArray[this.currentIndex].video}" type="video/mp4">
                </video>
            `;
        }

        mediaContainer.innerHTML = mediaContent;
        imgInfos.textContent = mediaTitle;
    }

    trapFocus() {
        const lightbox = document.getElementById("lightBox");
        const focusableElements = lightbox.querySelectorAll("button");
        const firstFocusableElement = document.getElementById("right");
        const secondFocusableElement = document.getElementById("left");
        const lastFocusableElement = document.getElementById("close_modal");

        const trapHandler = (event) => {
            const isTabPressed = event.key === "Tab";
            if (!isTabPressed) {
                return;
            }

            if (event.shiftKey) {
                // If Shift + Tab, go backward in the focus order
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                // If Tab is pressed, go forward in the focus order
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        };

        document.addEventListener("keydown", trapHandler);

        const closeLightbox = () => {
            document.removeEventListener("keydown", trapHandler);
        };

        document.getElementById("close_modal").addEventListener("click", closeLightbox);
    }
}