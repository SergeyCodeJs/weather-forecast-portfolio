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

function initializeRenderObjects() {
    const renderLoading = new RenderLoading('.page-wrapper', loading);

    const renderHeader = new RenderHeader('.header__left-wrapper', '.search-bar', renderSelectLanguage, renderTemperatureTypeSelect, renderSearchBar);

    const renderWeatherInfo = new RenderWeatherInfo('.weather-info', '.temperature-overcast__wrapper', renderCityAndDate, renderTemperature, renderOvercast, renderThreeDaysForecast);

    const renderMap = new RenderMap('.map-wrapper', renderMapPosition);

    return {renderLoading, renderHeader, renderWeatherInfo, renderMap}
}

export default initializeRenderObjects