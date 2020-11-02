import getInitialHTMLStructure from '../utils/getInitialHTMLStructure'
import initializeRenderObjects from './initializeRenderObjects'
import {convertFarToCel} from '../utils/convertTemperature'

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

    async init() {
        this.buildHtmlStructure();
        if (!this.state) {
            this.initializeObjects();
        }
        this
            .renderLoading
            .init(this.state);
        this
            .getMap
            .init();
        await this.fetchAll();
        this.renderInitialData();
        this
            .state
            .setLoadingState();
        this
            .renderLoading
            .init(this.state);
        this.setBackground(this.state.todayWeather.weatherType, this.state.userLocation.city);
        console.log(this.state);
        this.addListeners();
    }

    buildHtmlStructure() {
        this
            .rootElement
            .insertAdjacentHTML('beforeend', getInitialHTMLStructure());
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
            .fetchCoordinates(latitude, longitude, this.state.temperatureType);
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
            this.background = await this
                .getBackground
                .fetchBackground(weather, city);
            const {url} = this.background;

            if (url) {
                renderBackground(url);
            }
        } catch (e) {}

        function renderBackground(url) {
            document
                .querySelector('.page-wrapper')
                .style
                .background = `no-repeat url("${url}")`
            document
                .querySelector('.page-wrapper')
                .style
                .backgroundSize = `cover`
        }
    }

    async changeLanguageHandler() {
        this
            .state
            .setLanguageState();
        await this.fetchAll();
        await this.updateElements()
    }

    async changeTemperatureTypeHandler() {
        this
            .state
            .setTemperatureTypeState();
        await this.fetchAll();
        this.updateElements();
    }

    changeCityInputHandler(e) {
        e.preventDefault();
        if (e.target.value.length > 13) {
            e.target.value = e
                .target
                .value
                .substring(0, 13);
        }
        e.target.value = e
            .target
            .value
            .toUpperCase();
    }

    async submitChangeCityHandler(e) {
        e.preventDefault();
        const city = document
            .getElementById('search')
            .value;
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
            .updateAllDOM(this.state);
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
        this
            .state
            .setCity(city);
    }

    initializeObjects() {
        this.state = new this.State();

        this.getUserLocation = new this.GetUserLocation('54320681efd518', 'https://ipinfo.io');

        this.getWeather = new this.GetWeather('b05c920590c87fb09069daaf6be357ec', 'https://api.darksky.net/forecast/');

        this.getUserLocationByCoordinatesOrCity = new this.GetUserLocationByCoordinatesOrCity('https://api.opencagedata.com/geocode/v1/json?q=$', '5450c6c713e04fbb9b443ba897d980bf', "", "", this.state.lang);

        this.getMap = new this.GetMap('pk.eyJ1Ijoic2VyZ2V5c3Rla2giLCJhIjoiY2szaHBxamRhMDA0cjNjbXd4Z3JsY2UxciJ9.ByzscoPm' +
                'D9B153xscOTnww',
        'map', 'mapbox://styles/mapbox/streets-v11', 10, "", "");

        const renderObjects = initializeRenderObjects();

        this.renderLoading = renderObjects.renderLoading;
        this.renderHeader = renderObjects.renderHeader;
        this.renderWeatherInfo = renderObjects.renderWeatherInfo;
        this.renderMap = renderObjects.renderMap;

        this.getBackground = new this.GetBackground('adec34c89d01fcc2356d15c91d8510d9f7680a908b9447ff672db9fd3f6365e6', 'https://api.unsplash.com/photos/random?');

        this.updateDom = new this.UpdateDom('.search-bar__input', '.search-bar__button', '.place-info__city', '.place-info__country', '.place-info__flag', '.tomorrow-day', '.after-tomorrow-day', '.after-after-tomorrow-day', '.overcast__title', '.feels-like', '.feels-like__value', '.wind', '.wind__value', '.humidity', '.temperature__number', '.tomorrow-temperature', '.after-tomorrow-temperature', '.after-after-tomorrow-temperature', '.temperature__img', '.tomorrow-clouds', '.after-tomorrow-clouds', '.after-after-tomorrow-clouds', '.longitude-title', '.latitude-title', '.latitude-minutes', '.latitude-seconds', '.longitude-minutes', '.longitude-seconds', '.temperature__sign', '.tomorrow-temperature-sign', '.after-tomorrow-temperature-sign', '.after-after-tomorrow-temperature-sign');
    }
}

export default App