import getInitialHTMLStructure from '../utils/getInitialHTMLStructure'
import loading from '../components/loading/loading'
import RenderLoading from '../components/loading/renderLoading'
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
import renderMapPosition from '../components/weather-block/map/map-position/renderMapPosition'

class App {
    constructor(rootElement, State, GetWeather, GetUserLocation, GetUserLocationByCoordinatesOrCity, GetMap, GetBackground, UpdateDom) {
        this.rootElement = document.getElementById(rootElement);
        this.State = State;
        this.GetUserLocation = GetUserLocation;
        this.GetUserLocationByCoordinatesOrCity = GetUserLocationByCoordinatesOrCity;
        this.GetWeather = GetWeather;
        this.GetMap = GetMap;
        this.GetBackground = GetBackground;
        this.UpdateDom = UpdateDom;
    }

    buildHtmlStructure() {
        this
            .rootElement
            .insertAdjacentHTML('beforeend', getInitialHTMLStructure())
    }

    async fetchAll() {
        const city = this.state.userLocation.city || await this.getLocation();
        const coordinatesAndCityData = await this.getCoordinatesAndCityData(city);
        this.updateStateUserLocation(coordinatesAndCityData);
        const weatherData = await this.getWeatherData();
        this.updateStateWeatherData(weatherData);
        const {longitude, latitude} = this.state.mapPosition;
        this
            .getMap
            .jumpToCoordinates(longitude, latitude);
    }

    async init() {
        this.buildHtmlStructure();
        if (!this.state) {
            this.initializeObjects();
        }
        this.renderLoading.init(this.state);
        this
            .getMap
            .init();  
        await this.fetchAll();
        this.renderInitialData();
        this.state.setLoadingState();
        this.renderLoading.init(this.state);
        this.addListeners();
        this.setBackground(this.state.todayWeather.weatherType, this.state.userLocation.city);
        console.log(this.state)
    }

    renderInitialData() {
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

    async getLocation() {
        const city = await this
            .getUserLocation
            .getData();
        return city
    }

    async getCoordinatesAndCityData(city) {
        const coordinatesAndCityData = await this
            .getUserLocationByCoordinatesOrCity
            .fetchDataByCity(city, this.state.lang);
        return coordinatesAndCityData
    }

    async getWeatherData() {
        const {latitude, longitude} = this.state.mapPosition;
        return await this
            .getWeather
            .fetchCoordinates(latitude, longitude);
    }

    addListeners() {
        const languageSwitchEl = document.querySelector('.language-switch-slider');
        const temperatureTypeSwitchEl = document.querySelector('.temperature-type-switch__slider');
        const cityInputEl = document.getElementById('search');
        const cityInputBtn = document.querySelector('.search-bar__button');

        languageSwitchEl.addEventListener('click', this.changeLanguageHandler.bind(this));
        temperatureTypeSwitchEl.addEventListener('click', this.changeTemperatureTypeHandler.bind(this));
        cityInputEl.addEventListener('input', this.changeCityInputHandler.bind(this));
        cityInputBtn.addEventListener('click', this.submitChangeCityHandler.bind(this));
    }

    async setBackground(weather, city) {
        try {
            this.background = await this.getBackground.fetchBackground(weather, city);
            const {url} = this.background;
            
            if (url) {
                document.querySelector('.page-wrapper').style.background = `no-repeat url("${url}")`
                document.querySelector('.page-wrapper').style.backgroundSize = `cover`
            }
        } catch(e) {
        }
    }

    async changeLanguageHandler() {
        this
            .state
            .setLanguageState();
        await this.fetchAll();
        await this.updateElements()
    }

    changeTemperatureTypeHandler() {
        this
            .state
            .setTemperatureTypeState();
        this.updateElements();
    }

    changeCityInputHandler(e) {
        e.preventDefault();
        if (e.target.value.length > 13) {
            e.target.value = e.target.value.substring(0, 13);
        }
        e.target.value = e.target.value.toUpperCase();
    }

    async submitChangeCityHandler(e) {
        e.preventDefault();
        const city = document.getElementById('search').value;
        if (city) {
            this.updateStateCity(city);
            await this.fetchAll();
            this.updateElements();
            this.setBackground(this.state.todayWeather.weatherType, this.state.userLocation.city);
        }
    }

    updateElements() {
        this
            .updateDom
            .updateUserLocation(this.state);
        this
            .updateDom
            .updateOvercast(this.state);
        this.
            updateDom.
            updateButtonsNames(this.state);
        this.
            updateDom.
            updateLatitudeAndLongitudeNames(this.state);
        this.
            updateDom.
            updateWeekDays(this.state);
        this.
            updateDom.
            updateCloudsIcons(this.state)
        this.
            getMap.
            changeMapLanguage(this.state);
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

    updateStateCity(city) {
        this.state.setCity(city);
    }

    initializeObjects() {
        this.state = new this.State();

        this.getUserLocation = new this.GetUserLocation('54320681efd518', 'https://ipinfo.io');

        this.getWeather = new this.GetWeather('b05c920590c87fb09069daaf6be357ec', 'https://api.darksky.net/forecast/');

        this.getUserLocationByCoordinatesOrCity = new this.GetUserLocationByCoordinatesOrCity('https://api.opencagedata.com/geocode/v1/json?q=$', '5450c6c713e04fbb9b443ba897d980bf', "", "", this.state.lang);

        this.getMap = new this.GetMap('pk.eyJ1Ijoic2VyZ2V5c3Rla2giLCJhIjoiY2szaHBxamRhMDA0cjNjbXd4Z3JsY2UxciJ9.ByzscoPm' +
                'D9B153xscOTnww',
        'map', 'mapbox://styles/mapbox/streets-v11', 10, "", "");

        this.renderLoading = new RenderLoading('.page-wrapper', loading)

        this.renderHeader = new RenderHeader('.header__left-wrapper', '.search-bar', renderSelectLanguage, renderTemperatureTypeSelect, renderSearchBar),

        this.renderWeatherInfo = new RenderWeatherInfo('.weather-info', '.temperature-overcast__wrapper', renderCityAndDate, renderTemperature, renderOvercast, renderThreeDaysForecast);

        this.renderMap = new RenderMap('.map-wrapper', renderMapPosition);
        
        this.getBackground = new this.GetBackground('adec34c89d01fcc2356d15c91d8510d9f7680a908b9447ff672db9fd3f6365e6', 'https://api.unsplash.com/photos/random?');

        this.updateDom = new this.UpdateDom('.search-bar__input', '.search-bar__button', '.place-info__city', '.place-info__country', '.place-info__flag', '.tomorrow-day', '.after-tomorrow-day', '.after-after-tomorrow-day', '.overcast__title', '.feels-like', '.feels-like__value', '.wind', '.wind__value', '.humidity', '.temperature__number', '.tomorrow-temperature', '.after-tomorrow-temperature', '.after-after-tomorrow-temperature', '.temperature__img', '.tomorrow-clouds', '.after-tomorrow-clouds', '.after-after-tomorrow-clouds', '.longitude-title', '.latitude-title', '.latitude-minutes', '.latitude-seconds', '.longitude-minutes', '.longitude-seconds');
    }
}

export default App