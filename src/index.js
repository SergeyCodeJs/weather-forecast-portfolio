import headerCitySearch from './components/header/city-search/city-search.html'
import headerLanguageSelect from './components/header/language-select/language-select.html'
import headerTemperatureTypeSelect from './components/header/temperature-type-select/temperature-type-select.html'
import cityAndDate from './components/weather-block/weather-info/city-and-date/city-and-date.html'
import overcast from './components/weather-block/weather-info/overcast/overcast.html'
import temperature from './components/weather-block/weather-info/temperature/temperature.html'
import threeDaysForecast from './components/weather-block/weather-info/three-days-forecast/three-days-forecast.html'
import map from './components/weather-block/map/mapboxgl/mapboxgl.html'
import mapPosition from './components/weather-block/map/map-position/map-position.html'
import './assets/scss/main.scss'
import BuildHtml from './js/buildHtml'

const buildHtml = new BuildHtml('body', headerLanguageSelect, headerTemperatureTypeSelect, headerCitySearch, cityAndDate, temperature, overcast, threeDaysForecast, map, mapPosition);

buildHtml.init();