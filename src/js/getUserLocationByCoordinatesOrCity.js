import getExactCoordinates from "../utils/getExactCoordinates";

class GetUserLocationByCoordinatesOrCity {
    constructor(url, token, latitude, longitude, lang) {
        this.url = url;
        this.token = token;
        this.latitude = latitude;
        this.longitude = longitude;
        this.lang = lang;
        this.city = ''
    }

    async fetchLocationData(latitude, longitude) {
        this.targetUrl = `${this.url}${latitude}%2C${longitude}&key=${this.token}&language=${this.lang}&pretty=1`;

        try {
            const res = await fetch(this.targetUrl);
            const data = res.json();

            return data
        } catch (err) {
            throw new Error(err);
        }
    }

    async fetchDataByCity(city, lang) {
        this.cityUrl = `${this.url}${city}&key=${this.token}&language=${lang.toLowerCase()}&pretty=1`;

        try {
            const res = await fetch(this.cityUrl);
            const data = await Promise.resolve(res.json());
            return this.transformData(data);
        } catch (err) {
            throw new Error(err);
        }
    }

    async transformData(data) {
        const {results} = data;
        const firstCityResults = results[0];
        const [coordinatesInfo,
            placeInfo,
            flagInfo] = [firstCityResults.geometry, firstCityResults.components, firstCityResults.annotations];

        const {lat: latitude, lng: longitude} = coordinatesInfo;
        
        const {latitudeMinutes, latitudeSeconds, longitudeMinutes, longitudeSeconds} = getExactCoordinates(latitude, longitude)
        
        let {town: city, country} = placeInfo;
        if(!city) city = placeInfo.city;

        const {flag} = flagInfo;
          
        return {latitude, longitude, city, country, flag, latitudeMinutes, latitudeSeconds, longitudeMinutes, longitudeSeconds}
    }
}

export default GetUserLocationByCoordinatesOrCity