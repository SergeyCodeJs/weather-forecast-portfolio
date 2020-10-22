import translateWeekDay from '../../../../utils/translateWeekDay'

function renderThreeDaysForecast({daysOvercast, lang, temperatureType}) {
  const [tomorrow, afterTomorrow, afterAfterTomorrow] = daysOvercast;
  const temperatureSign = temperatureType === "C" ? '°C' : '°F';
  
  const content = `
  <div class=three-days-forecast>
    <div class="day day--margin">
        <h2>${translateWeekDay(tomorrow.weekDay, lang)}</h2>
        <div class="day__temperature-wrapper">
            <p>${tomorrow.temperature}</p>
            <p>${temperatureSign}</p>
            <img src="" alt=""></div>
        </div>
        <div class="day day--margin">
            <h2>${translateWeekDay(afterTomorrow.weekDay, lang)}</h2>
            <div class="day__temperature-wrapper">
                <p>${afterTomorrow.temperature}</p>
                <p>${temperatureSign}</p>
                <img src="" alt=""></div>
            </div>
            <div class="day">
                <h2>${translateWeekDay(afterAfterTomorrow.weekDay, lang)}</h2>
                <div class="day__temperature-wrapper">
                    <p>${afterAfterTomorrow.temperature}</p>
                    <p>${temperatureSign}</p>
                    <img src="" alt=""></div>
                </div>
            </div>
  `
  return content
}
export default renderThreeDaysForecast