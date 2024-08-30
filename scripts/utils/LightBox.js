class LightBox {
    constructor(array, author, index) {
        this._array = array;
        this._author = author;
        this._index = index;
    }
    createLightBox() {
        let media = "";

        if (this._array[this._index].image) {
            media = `
           <img 
            id="LightBoxMedia" 
            src="assets/photographers/medias/${
          this._array[this._index].image
        }" 
            /> 
        `;
        } else if (this._array[this._index].video) {
            media = `
        
          <video controls width="250" id="LightBoxMedia" >
            <source src="assets/photographers/medias/${
          this._array[this._index].video
        }"
              type="video/mp4">
          </video>
        `;
        }

        const element = document.createElement("div");
        console.log(media);
        const domElement = `
      
      <div class= slideShowContainer id="lightBox">
        
        <div class="slideShow">
          <button aria-label="Fermer la modal" id="close_modal">
            <span ><i class="fa-solid fa-xmark"></i></span>
          </button>
        
          <button id="left" aria-label="parcourir à gauche">
            <span ><i class="fa-solid fa-chevron-left"></i></span>
          </button>
  
            <div id="slideShow_modal">
              
              <div id="mediaContainer">
               ${media}
              </div>
  
              <div class="ImgInfos">
                
              </div>
              
            </div>
          <button id="right" aria-label="parcourir à droite">
            <span ><i class="fa-solid fa-chevron-right"></i></span>
          </button>
  
        </div>
      </div> 
  
      `;

        element.innerHTML = domElement;

        element.querySelector("#right");

        return element;
    }

    ///////////////////////////////////////
    // closer
    lightBoxCloser() {
        const close = document.getElementById("close_modal");

        close.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.getElementById("lightBox").remove();
        });
    }

    ///////////////////////////////////////
    // change media
    changeMedia(i) {
        const media = this._array[i]
        console.log(media)
    }

    ///////////////////////////////////////
    // Browser
    lightboxBrowser() {
        const right = document.getElementById("right");
        right.focus();
        const left = document.getElementById("left");


        right.addEventListener("click", (f) => {
            f.preventDefault();
            f.stopPropagation();

            this._index += 1;
            if (this._index >= this._array.length) {
                this._index = 0;
            }
            console.log(this._index);

            document.getElementById("LightBoxMedia").remove();

            const mediaContainer = document.getElementById("mediaContainer");
            let media = "";

            if (this._array[this._index].image) {
                media = `
           <img 
            alt="Image de gallery"
            id="LightBoxMedia" 
            src="assets/photographers/medias/${
            this._array[this._index].image
          }" 
            /> 
        `;
            } else if (this._array[this._index].video) {
                media = `
        
          <video controls width="250" id="LightBoxMedia" alt="Vidéo de gallery">
            <source src="assets/photographers/medias/${
            this._array[this._index].video
          }"
              type="video/mp4">
          </video>
        `;
            }
            mediaContainer.innerHTML = media;
        });

        left.addEventListener("click", (g) => {
            g.preventDefault();
            g.stopPropagation();

            this._index -= 1;
            console.log(this._index);
            if (this._index === -1) {
                console.log("avant = au lenght " + this._index);
                console.log(this._array);
                this._index = this._array.length - 1;
                console.log('après = au lenght ' + this._index);
                console.log(this._array);
            }
            console.log(' après condition ' + this._index);

            document.getElementById("LightBoxMedia").remove();

            const mediaContainer = document.getElementById("mediaContainer");
            let media = "";

            if (this._array[this._index].image) {
                console.log(this._index);
                media = `
           <img 
            id="LightBoxMedia" 
            src="assets/photographers/medias/${
            this._array[this._index].image
          }" 
            /> 
        `;
            } else if (this._array[this._index].video) {
                console.log(this._index);
                media = `
        
          <video controls width="250" id="LightBoxMedia" >
            <source src="assets/photographers/medias/${
            this._array[this._index].video
          }"
              type="video/mp4">
          </video>
        `;
            }
            mediaContainer.innerHTML = media;

        });
    }
}