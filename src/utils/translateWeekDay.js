export default function translateWeekDay(dayNumber, language) {
  let result;

  switch(dayNumber) {
    case 1: result = language === "Ru" ? "Понедельник" : "Monday"
    break;
    case 2: result = language === "Ru" ? "Вторник" : "Tuesday"
    break;
    case 3: result = language === "Ru" ? "Среда" : "Wednesday"
    break;
    case 4: result = language === "Ru" ? "Четверг" : "Theursday"
    break;
    case 5: result = language === "Ru" ? "Пятница" : "Friday"
    break;
    case 6: result = language === "Ru" ? "Суббота" : "Saturday"
    break;
    case 0: result = language === "Ru" ? "Воскресенье" : "Sunday"
    break;
    default: result = "Undefined"
  }
  
  return result
}