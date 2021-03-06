import translateWeekDay from '../../../../utils/translateWeekDay'
import getWeatherIcon from '../../../../utils/getWeatherIcon'

function renderThreeDaysForecast({daysOvercast, lang, temperatureType}) {
    const [tomorrow,
        afterTomorrow,
        afterAfterTomorrow] = daysOvercast;

    const temperatureSign = temperatureType === "C"
        ? '°C'
        : '°F';

    const tomorrowWeatherType = getWeatherIcon(tomorrow.weatherType);
    const afterTomorrowWeatherType = getWeatherIcon(afterTomorrow.weatherType);
    const afterAfterTomorrowWeatherType = getWeatherIcon(afterAfterTomorrow.weatherType)

    const content = `
  <div class=three-days-forecast>
    <div class="day day--margin">
        <h2 class="tomorrow-day">${translateWeekDay(tomorrow.weekDay, lang)}</h2>
        <div class="day__temperature-wrapper">
            <p class="tomorrow-temperature">${tomorrow.temperature}</p>
            <p class="tomorrow-temperature-sign">${temperatureSign}</p>
            <img class="tomorrow-clouds" src=${tomorrowWeatherType} alt="tomorrowWeather"></div>
        </div>
        <div class="day day--margin">
            <h2 class="after-tomorrow-day">${translateWeekDay(afterTomorrow.weekDay, lang)}</h2>
            <div class="day__temperature-wrapper">
                <p class="after-tomorrow-temperature">${afterTomorrow.temperature}</p>
                <p class="after-tomorrow-temperature-sign">${temperatureSign}</p>
                <img class="after-tomorrow-clouds" src=${afterTomorrowWeatherType} alt="afterTomorrowWeather"></div>
            </div>
            <div class="day">
                <h2 class="after-after-tomorrow-day">${translateWeekDay(afterAfterTomorrow.weekDay, lang)}</h2>
                <div class="day__temperature-wrapper">
                    <p class="after-after-tomorrow-temperature">${afterAfterTomorrow.temperature}</p>
                    <p class="after-after-tomorrow-temperature-sign">${temperatureSign}</p>
                    <img class="after-after-tomorrow-clouds" src=${afterAfterTomorrowWeatherType} alt="afterAfterTomorrowWeatherType"></div>
                </div>
            </div>
  `
    return content
}
export default renderThreeDaysForecast