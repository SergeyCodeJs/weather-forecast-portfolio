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

    setUserLocationState({latitude, longitude, city, country, flag, latitudeMinutes, latitudeSeconds, longitudeMinutes, longitudeSeconds}) {
        this.mapPosition = {
          latitude,
          longitude,
          latitudeMinutes,
          latitudeSeconds,
          longitudeMinutes,
          longitudeSeconds,
        }
        this.userLocation = {
          city, flag, country
        }
    }

    setWeatherState(data) {
        const {daysOvercast, todayWeather, overcast} = data;
        this.daysOvercast = daysOvercast;
        this.todayWeather = {
            ...this.todayWeather,
            ...todayWeather
        };
        this.overcast = overcast;
    }

    setLanguageState() {
        this.lang === 'Ru' ? this.lang = 'En' : this.lang = 'Ru'
    }

    setTemperatureTypeState() {
        this.temperatureType === 'C' ? this.temperatureType = 'F' : this.temperatureType = 'C'
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