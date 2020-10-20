function renderTemperature({todayWeather}) {
  const {temperature, temperatureType, weatherType} = todayWeather;
  const temperatureSign = temperatureType === 'C' ? "°C" : "°F"; 

  const content = `
  <div class="temperature temperature--margin">
    <p class="temperature__number">${temperature}</p>
    <p class="temperature__sign">${temperatureSign}</p>
    <img class="temperature__img" src=${weatherType} alt="temperature">
</div>
  `
  return content
}
export default renderTemperature