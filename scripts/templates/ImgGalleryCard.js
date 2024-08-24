class ImgGalleryBlock {
  constructor(ImgGallery, photographerId, totalLike) {
    this._ImgGallery = ImgGallery; // Store media information (image or video)
    this._photographerId = photographerId; // Store the photographer's ID
    this._totalLike = totalLike; // Store the total number of likes
  }

  // Updates the total likes count displayed on the page
  counterLikeRefresh() {
    this._totalLike = 0; // Start with zero total likes
    // Get all elements that show the number of likes
    const likesElements = document.querySelectorAll(".numberLikes");
    // Add up likes from all elements
    likesElements.forEach((element) => {
      this._totalLike += parseInt(element.innerText); // Add each element's likes to totalLikes
    });
    // Update the total likes on the page
    const totalLikeElement = document.querySelector("#totalLike");
    if (totalLikeElement) {
      totalLikeElement.innerText = this._totalLike; // Set the new total likes
    } else {
      console.error('Total likes element not found'); // Log error if element not found
    }
  }

  // Creates a gallery item (either an image or video)
  createImgGallery() {
    // Create a new article element for the gallery item
    const articleGallery = document.createElement("article");
    articleGallery.classList.add("imgGalleryCard"); // Add a class for styling
    articleGallery.dataset.liked = "false"; // Track if the item is liked

    // Create the media element based on whether it's a video or image
    let mediaElement;
    if (this._ImgGallery.video) {
      mediaElement = document.createElement("video"); // Create video element
      mediaElement.controls = true; // Add video controls
      const sourceElement = document.createElement("source"); // Create source element for video
      sourceElement.src = this._ImgGallery.video; // Set video source
      sourceElement.type = "video/mp4"; // Set video type
      mediaElement.appendChild(sourceElement); // Add source to video
    } else if (this._ImgGallery.image) {
      mediaElement = document.createElement("img"); // Create image element
      mediaElement.src = this._ImgGallery.image; // Set image source
      mediaElement.alt = this._ImgGallery.title; // Set alt text for image
    } else {
      console.error('Media type not recognized:', this._ImgGallery); // Log error for unknown media type
    }

    // Create a link element to wrap the media
    const linkElement = document.createElement("a");
    linkElement.classList.add("linkGallery");
    linkElement.href = "#"; // Link doesn't go anywhere
    linkElement.appendChild(mediaElement); // Add media to the link

    // Create a container for the title and like button
    const imgLikeContainer = document.createElement("div");
    imgLikeContainer.classList.add("imgLike");

    // Create and add the title
    const titleElement = document.createElement("p");
    titleElement.textContent = this._ImgGallery.title;

    // Create and add the likes count and like button
    const likesContainer = document.createElement("div");
    likesContainer.classList.add("imgLike");

    const likesCount = document.createElement("p");
    likesCount.classList.add("numberLikes");
    likesCount.textContent = this._ImgGallery.likes; // Set initial like count

    const likeButton = document.createElement("button");
    likeButton.classList.add("btnLike");
    likeButton.setAttribute("aria-label", "like or dislike"); // Accessibility label

    const likeIcon = document.createElement("span");
    likeIcon.classList.add("likeIcon");
    likeIcon.innerHTML = '<i class="fa-solid fa-heart"></i>'; // Heart icon

    // Assemble the like button
    likeButton.appendChild(likeIcon);
    likesContainer.appendChild(likesCount);
    likesContainer.appendChild(likeButton);

    // Add title and likes to the container
    imgLikeContainer.appendChild(titleElement);
    imgLikeContainer.appendChild(likesContainer);

    // Add everything to the article
    articleGallery.appendChild(linkElement);
    articleGallery.appendChild(imgLikeContainer);

    // Handle click events on the like button
    likeButton.addEventListener("click", () => {
      if (articleGallery.dataset.liked === "false") {
        this._ImgGallery.likes += 1; // Increment likes
        likesCount.innerText = this._ImgGallery.likes; // Update displayed likes
        articleGallery.dataset.liked = "true"; // Mark as liked
        likeIcon.querySelector("i").style.color = "#DB8876"; // Change color to indicate liked
      } else {
        this._ImgGallery.likes -= 1; // Decrement likes
        likesCount.innerText = this._ImgGallery.likes; // Update displayed likes
        articleGallery.dataset.liked = "false"; // Mark as unliked
        likeIcon.querySelector("i").style.color = "#901C1C"; // Change color to indicate unliked
      }
      this.counterLikeRefresh(); // Update total likes count
    });

    return articleGallery; // Return the complete gallery item
  }
}