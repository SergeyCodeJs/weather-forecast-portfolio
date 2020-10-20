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
          longitudeSeconds: "",
        }
        this.overcast = {
          feelsLike: "",
          wind: "",
          humidity: "",
        }
        this.daysOvercast = [
          {weekDay: "", temperature: "", weatherType: ""},
          {weekDay: "", temperature: "", weatherType: ""},
          {weekDay: "", temperature: "", weatherType: ""},
        ]
    }

    setState(propName, data) {
        this[propName] = data;
        console.log(this)
    }

    getState(propName) {
        return this[propName]
    }
}

export default State