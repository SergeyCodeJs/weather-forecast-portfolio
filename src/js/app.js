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
    constructor(rootElement, State, GetWeather, GetUserLocation) {
        this.rootElement = document.getElementById(rootElement);
        this.State = State;
        this.GetUserLocation = GetUserLocation;
        this.GetWeather = GetWeather;
    }

    init() {
      this.clearHTML();
      this.buildHtmlStructure();
      if (!this.state) {
        this.initializeObjects();
      }
      console.log(this.state)
      this.renderHeader.init(this.state);
      this.renderWeatherInfo.init(this.state);
      this.renderMap.init(this.state);
    }

    initializeObjects() {
      this.state = new this.State();
      this.getUserLocation = new this.GetUserLocation('54320681efd518', 'https://ipinfo.io');
      this.getWeather = new this.GetWeather('b05c920590c87fb09069daaf6be357ec', 'https://api.darksky.net/forecast');
      this.renderHeader = new RenderHeader('.header__left-wrapper','.search-bar', renderSelectLanguage, renderTemperatureTypeSelect, renderSearchBar),
      this.renderWeatherInfo = new RenderWeatherInfo('.weather-info', '.temperature-overcast__wrapper', renderCityAndDate, renderTemperature, renderOvercast, renderThreeDaysForecast);
      this.renderMap = new RenderMap('.map-wrapper', renderMapContainer, renderMapPosition)
    }

    clearHTML() {
      this.rootElement.innerHTML = "";
    }

    buildHtmlStructure() {
        this.rootElement.insertAdjacentHTML('beforeend', getInitialHTMLStructure()) 
    }

    updateState(propName, data) {
        this
            .state
            .setState(propName, data);
    }
}

export default App
