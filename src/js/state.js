class State {
    constructor() {
        this.loading = true;
        this.lang = "Ru";
        this.temperatureType = "C";
        this.userLocation = {
            city: "",
            country: "",
            flag: ""
        };
        this.todayWeather = {
            temperature: "",
            temperatureType: "C",
            weatherType: ""
        };
        this.dateData = {
            weekDay: "",
            date: "",
            month: "",
            time: ""
        },
        this.time = "",
        this.mapPosition = {
            latitude: "",
            longitude: "",
            latitudeMinutes: "",
            latitudeSeconds: "",
            longitudeMinutes: "",
            longitudeSeconds: ""
        }
        this.overcast = {
            feelsLike: "",
            wind: "",
            humidity: ""
        }
        this.daysOvercast = [
            {
                weekDay: "",
                temperature: "",
                weatherType: ""
            }, {
                weekDay: "",
                temperature: "",
                weatherType: ""
            }, {
                weekDay: "",
                temperature: "",
                weatherType: ""
            }
        ]
    }

    setState(propName, data) {
        this[propName] = data;
    }

    setUserLocationState({latitude, longitude, city, country, flag}) {
        [this.mapPosition.latitude, this.mapPosition.longitude] = [latitude, longitude];
        [this.userLocation.city, this.userLocation.flag, this.userLocation.country] = [city, flag, country]
    }

    setWeatherState(data) {
        const {daysOvercast, todayWeather, overcast} = data;
        this.daysOvercast = daysOvercast;
        this.todayWeather = {
            ...this.todayWeather,
            ...todayWeather
        };
        this.overcast = overcast;
        console.log(this.daysOvercast)
    }

    getState() {
        return {
            loading: this.loading,
            lang: this.lang,
            temperatureType: this.temperatureType,
            userLocation: this.userLocation,
            todayWeather: this.todayWeather,
            dateData: this.dateData,
            time: this.time,
            mapPosition: this.mapPosition,
            overcast: this.overcast,
            daysOvercast: this.daysOvercast
        }
    }
}

export default State