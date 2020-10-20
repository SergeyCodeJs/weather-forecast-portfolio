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

    getData() {
        const data = this
            .fetchCoordinates().then(data => this.transformData(data));

        return data
    }

    transformData(data) {
        const {city, country, loc, region} = data;
        
        const [latitude,
            longitude] = [
            loc.substring(0, loc.indexOf(',')),
            loc.substring(loc.indexOf(',') + 1, loc.length)
        ];

        return {city, country, latitude, longitude, region}
    }
}

export default GetUserLocation
