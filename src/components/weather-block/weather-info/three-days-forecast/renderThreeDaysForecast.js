function renderThreeDaysForecast({daysOvercast, lang, temperatureType}) {
  const [yesterday, today, tomorrow] = daysOvercast;
  const temperatureSign = temperatureType === "C" ? '°C' : '°F';

  console.log(lang)

  function translateWeekDay(dayNumber, language) {
    let result;

    switch(dayNumber) {
      case 0: result = language === "Ru" ? "Понедельник" : "Monday"
      break;
      case 1: result = language === "Ru" ? "Вторник" : "Tuesday"
      break;
      case 2: result = language === "Ru" ? "Среда" : "Wednesday"
      break;
      case 3: result = language === "Ru" ? "Четверг" : "Theursday"
      break;
      case 4: result = language === "Ru" ? "Пятница" : "Friday"
      break;
      case 5: result = language === "Ru" ? "Суббота" : "Saturday"
      break;
      case 6: result = language === "Ru" ? "Воскресенье" : "Sunday"
      break;
      default: result = "Undefined"
    }
    
    return result
  }

  const content = `
  <div class=three-days-forecast>
    <div class="day day--margin">
        <h2>${translateWeekDay(yesterday.weekDay, lang)}</h2>
        <div class="day__temperature-wrapper">
            <p>${yesterday.temperature}</p>
            <p>${temperatureSign}</p>
            <img src="" alt=""></div>
        </div>
        <div class="day day--margin">
            <h2>${translateWeekDay(today.weekDay, lang)}</h2>
            <div class="day__temperature-wrapper">
                <p>${today.temperature}</p>
                <p>${temperatureSign}</p>
                <img src="" alt=""></div>
            </div>
            <div class="day">
                <h2>${translateWeekDay(tomorrow.weekDay, lang)}</h2>
                <div class="day__temperature-wrapper">
                    <p>${tomorrow.temperature}</p>
                    <p>${temperatureSign}</p>
                    <img src="" alt=""></div>
                </div>
            </div>
  `
  return content
}
export default renderThreeDaysForecast