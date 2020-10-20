import App from './js/app'
import State from './js/state'
import GetUserLocation from './js/getUserLocation'
import GetWeather from './js/getWeather'
import './assets/scss/main.scss'

const app = new App('body', State, GetWeather, GetUserLocation);

app.init();
