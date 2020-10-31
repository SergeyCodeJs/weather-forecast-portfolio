import App from './js/app'
import State from './js/state'
import GetUserLocation from './js/getUserLocation'
import GetWeather from './js/getWeather'
import GetUserLocationByCoordinatesOrCity from './js/getUserLocationByCoordinatesOrCity'
import GetMap from './js/getMap'
import './assets/scss/main.scss'
import GetBackground from './js/getBackground'
import UpdateDom from './js/updateDom'

export const app = new App('body', State, GetWeather, GetUserLocation, GetUserLocationByCoordinatesOrCity, GetMap, GetBackground, UpdateDom);

app.init();
