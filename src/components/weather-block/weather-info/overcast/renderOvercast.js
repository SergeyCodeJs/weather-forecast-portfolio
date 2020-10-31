function renderOvercast({overcast, lang, temperatureType}) {
    const titles = {
        overcastTitle: lang === "Ru"
            ? "Прогноз погоды:"
            : "Overcast:",
        feelsLikeTitle: lang === "Ru"
            ? "Ощущается как:"
            : "Feels like:",
        windTitle: lang === "Ru"
            ? "Ветер:"
            : "Wind:",
        windSpeedTitle: lang === "Ru"
            ? "М/С"
            : "M/S",
        humidityTitle: lang === "Ru"
            ? "Влажность:"
            : "Humidity",
        temperatureTypeTitle: temperatureType === "C"
            ? "°C"
            : "°F"
    }

    const {feelsLike, humidity, wind} = overcast;
    const {
        overcastTitle,
        feelsLikeTitle,
        windTitle,
        windSpeedTitle,
        humidityTitle,
        temperatureTypeTitle
    } = titles;

    const content = `
    <div class="overcast">
    <p class="overcast__title overcast__title--margin">${overcastTitle}</p>
    <div class="overcast__feels-like overcast__feels-like--margin">
        <p class="feels-like">${feelsLikeTitle}</p>
        <p class="feels-like__value">${feelsLike} ${temperatureTypeTitle}</p>
    </div>
    <div class="overcast__wind overcast__wind--margin">
        <p class="wind">${windTitle}</p>
        <p class="wind__value">${wind} ${windSpeedTitle}</p>
    </div>
    <div class="overcast__humidity">
        <p class="humidity">${humidityTitle}</p>
        <p>${humidity} %</p>
    </div>
</div>
    `
    return content

}
export default renderOvercast