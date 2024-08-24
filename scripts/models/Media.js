class Medias {
    constructor(medias, firstname) {
        this._id = medias.id;
        this._photographerId = medias.photographerId;
        this._title = medias.title;
        this._image = medias.image; // Could be null
        this._likes = medias.likes;
        this._date = medias.date;
        this._price = medias.price;
        this._video = medias.video; // Could be null
        this._firstname = firstname;
    }

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get image() {
        return this._image ? `assets/photographers/medias/${this._image}` : null;
    }

    get video() {
        return this._video ? `assets/photographers/medias/${this._video}` : null;
    }

    get likes() {
        return this._likes;
    }

    set likes(value) {
        this._likes = value;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }

    get firstname() {
        return this._firstname;
    }
}