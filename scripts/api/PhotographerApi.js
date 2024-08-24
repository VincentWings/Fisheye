class Api {
    constructor(url) {
        this._url = url;
    }

    async get() {
        return fetch(this._url)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                return res.photographers
            })
            .catch((err) => console.log("an error occurs", err));
    }
}

class PhotographApi extends Api {
    constructor(url) {
        super(url);
    }

    async getPhotograph() {
        console.log(' get photographer ' + this.get())
        return await this.get();
    }
}