import getInitialHTMLStructure from '../utils/getInitialHTMLStructure'
import renderSelectLanguage from '../components/header/language-select/renderSelectLanguage'
import renderTemperatureTypeSelect from '../components/header/temperature-type-select/renderTemperatureTypeSelect'
import renderSearchBar from '../components/header/search-bar/renderSearchBar'
import RenderHeader from '../components/header/renderHeader'
import RenderWeatherInfo from '../components/weather-block/weather-info/renderWeatherInfo';
import renderCityAndDate from '../components/weather-block/weather-info/city-and-date/renderCityAndDate'
import renderTemperature from '../components/weather-block/weather-info/temperature/renderTemperature'
import renderOvercast from '../components/weather-block/weather-info/overcast/renderOvercast'
import renderThreeDaysForecast from '../components/weather-block/weather-info/three-days-forecast/renderThreeDaysForecast'
import RenderMap from '../components/weather-block/map/renderMap'
import renderMapContainer from '../components/weather-block/map/mapboxgl/renderMapContainer'
import renderMapPosition from '../components/weather-block/map/map-position/renderMapPosition'

class App {
    constructor(rootElement, State, GetWeather, GetUserLocation, GetUserLocationByCoordinatesOrCity) {
        this.rootElement = document.getElementById(rootElement);
        this.State = State;
        this.GetUserLocation = GetUserLocation;
        this.GetUserLocationByCoordinatesOrCity = GetUserLocationByCoordinatesOrCity;
        this.GetWeather = GetWeather;
    }

    init() {
        this.clearHTML();
        this.buildHtmlStructure();
        if (!this.state) {
            this.initializeObjects();
        }
        console.log(this.state)
        this.getLocationWeatherAndMap(); 
    }

    render() {
      this
          .renderHeader
          .init(this.state);
      this
          .renderWeatherInfo
          .init(this.state);
      this
          .renderMap
          .init(this.state);
    }

    async getLocationWeatherAndMap() {
      const locationData = await this.getUserLocation.getData();
      const {city} = locationData;
      const coordinatesAndCityData = await this.GetUserLocationByCoordinatesOrCity.fetchDataByCity(city);
      this.updateStateUserLocation(coordinatesAndCityData);
      const weatherData = await this.getWeatherData();
      this.updateStateWeatherData(weatherData);
      this.render()
    }

    getWeatherData() {
        const {latitude, longitude} = this.state.mapPosition;
        return this
            .getWeather
            .fetchCoordinates(latitude, longitude)
    }

    initializeObjects() {
        this.state = new this.State();

        this.getUserLocation = new this.GetUserLocation('54320681efd518', 'https://ipinfo.io');

        this.getWeather = new this.GetWeather('b05c920590c87fb09069daaf6be357ec', 'https://api.darksky.net/forecast/');

        this.GetUserLocationByCoordinatesOrCity = new this.GetUserLocationByCoordinatesOrCity('https://api.opencagedata.com/geocode/v1/json?q=$', '5450c6c713e04fbb9b443ba897d980bf', "", "", this.state.lang);

        this.renderHeader = new RenderHeader('.header__left-wrapper', '.search-bar', renderSelectLanguage, renderTemperatureTypeSelect, renderSearchBar),

        this.renderWeatherInfo = new RenderWeatherInfo('.weather-info', '.temperature-overcast__wrapper', renderCityAndDate, renderTemperature, renderOvercast, renderThreeDaysForecast);

        this.renderMap = new RenderMap('.map-wrapper', renderMapContainer, renderMapPosition)
    }

    clearHTML() {
        this.rootElement.innerHTML = "";
    }

    buildHtmlStructure() {
        this
            .rootElement
            .insertAdjacentHTML('beforeend', getInitialHTMLStructure())
    }

    updateStateUserLocation(data) {
        this
            .state
            .setUserLocationState(data);
    }

    updateStateWeatherData(data) {
      this
          .state
          .setWeatherState(data);
  }
}

export default App
