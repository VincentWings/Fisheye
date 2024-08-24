class SeccondApi {
    constructor(url) {
        this._url = url;
    }

    async get() {
        return fetch(this._url)
            .then((res) => {
                console.log(res.body);
                return res.json();
            })
            .then((res) => {
                console.log(res.media);
                return res.media;
            })
            .catch((err) => console.log("an error occurs", err));
    }
}

class MediaApi extends SeccondApi {
    constructor(url) {
        super(url);
    }

    async getMedia() {
        return await this.get();
    }
}