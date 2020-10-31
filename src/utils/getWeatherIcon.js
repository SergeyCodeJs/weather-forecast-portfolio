import clearDay from '../assets/img/weather-icons/clear-day.svg'
import clearNight from '../assets/img/weather-icons/clear-night.svg'
import rain from '../assets/img/weather-icons/rain.svg'
import snow from '../assets/img/weather-icons/snow.svg'
import sleet from '../assets/img/weather-icons/sleet.svg'
import wind from '../assets/img/weather-icons/wind.svg'
import fog from '../assets/img/weather-icons/fog.svg'
import partlyCloudyDay from '../assets/img/weather-icons/partly-cloudy-day.svg'
import partlyCloudyNight from '../assets/img/weather-icons/partly-cloudy-night.svg'

function getWeatherIcon(weatherType) {
  let icon;

  switch(weatherType) {
    case "clear-day": icon = clearDay;
    break;
    case "clear-night": icon = clearNight;
    break;
    case "rain": icon = rain;
    break;
    case "snow": icon = snow;
    break;
    case "sleet": icon = sleet;
    break;
    case "wind": icon = wind;
    break;
    case "fog": icon = fog;
    break;
    case "partly-cloudy-day": icon = partlyCloudyDay;
    break;
    case "partly-cloudy-night": icon = partlyCloudyNight;
    break;
    case "cloudy": icon = fog;
    break;
    default: icon = clearDay;
  }

  return icon
}

export default getWeatherIcon