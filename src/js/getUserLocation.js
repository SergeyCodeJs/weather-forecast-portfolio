class GetUserLocation {
    constructor(token, urlBase) {
        this.token = token;
        this.urlBase = urlBase;
        this.fullUrl = `${urlBase}?token=${token}`;
    }

    async fetchCoordinates() {
        try {
            const res = await fetch(this.fullUrl);
            const data = res.json();
            return data
        } catch (err) {
            throw new Error(err);
        }
    }

    async getData() {
        const data = await this.fetchCoordinates();
        return this.transformData(data);
    }


    transformData(data) {
        const {city} = data;
        return city;
    }
}

export default GetUserLocation
