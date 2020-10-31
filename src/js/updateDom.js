import translateWeekDay from '../utils/translateWeekDay'

class UpdateDom {
    constructor(searchPlaceholderClass, searchBtnClass, cityClass, countryClass, tomorrowDayClass, afterTomorrowDayClass, afterAfterTomorrowDayClass, forecastTitleClass, feelsLikeClass, feelsLikeValueClass, windClass, windValueClass, humidityClass, longitudeClass, latitudeClass) {
        this.searchPlaceholderClass = searchPlaceholderClass;
        this.searchBtnClass = searchBtnClass;
        this.cityClass = cityClass;
        this.countryClass = countryClass;
        this.tomorrowDayClass = tomorrowDayClass;
        this.afterTomorrowDayClass = afterTomorrowDayClass;
        this.afterAfterTomorrowDayClass = afterAfterTomorrowDayClass;
        this.forecastTitleClass = forecastTitleClass;
        this.feelsLikeClass = feelsLikeClass;
        this.feelsLikeValueClass = feelsLikeValueClass;
        this.windClass = windClass;
        this.windValueClass = windValueClass;
        this.humidityClass = humidityClass;
        this.longitudeClass = longitudeClass;
        this.latitudeClass = latitudeClass;
    }

    updateUserLocation({userLocation}) {
        const elements = [
            document.querySelector(this.cityClass),
            document.querySelector(this.countryClass)
        ]
        let {city, country} = userLocation;
        city += ',';
        this.update(elements, [city, country])
    }

    updateOvercast({lang, temperatureType, overcast}) {
        const elements = [
            document.querySelector(this.forecastTitleClass),
            document.querySelector(this.feelsLikeClass),
            document.querySelector(this.feelsLikeValueClass),
            document.querySelector(this.windClass),
            document.querySelector(this.windValueClass),
            document.querySelector(this.humidityClass),
        ];

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

        const {
            overcastTitle,
            feelsLikeTitle,
            temperatureTypeTitle,
            windTitle,
            windSpeedTitle,
            humidityTitle,
        } = titles;
        
        const {feelsLike, wind} = overcast;

        this.update(elements, [overcastTitle, feelsLikeTitle, `${feelsLike} ${temperatureTypeTitle}`, windTitle, `${wind} ${windSpeedTitle}`, humidityTitle]);
    }

    updateButtonsNames({lang}) {
      const elements = [
        document.querySelector(this.searchBtnClass),
        document.querySelector(this.searchPlaceholderClass),
      ]
      const titles = {
        weatherButtonTitle: lang === "Ru" ? "Искать" : "Search",
        searchBarTitle: lang === "Ru" ? "Поиск по городу..." : "Search by city..."
      }
      const {weatherButtonTitle, searchBarTitle} = titles;

      this.update(elements, [weatherButtonTitle]);
      elements[1].placeholder = searchBarTitle;
    }

    updateLatitudeAndLongitudeNames({lang}) {
      const elements = [
        document.querySelector(this.latitudeClass),
        document.querySelector(this.longitudeClass),
      ]

      const titles = {
        latitudeTitle: lang === 'Ru' ? "Широта" : "Latitude",
        longitudeTitle: lang === "Ru" ? "Долгота" : "Longitude"
      }

      const {latitudeTitle, longitudeTitle} = titles;

      this.update(elements, [latitudeTitle, longitudeTitle])
    }

    updateWeekDays({daysOvercast, lang}) {
      const elements = [
        document.querySelector(this.tomorrowDayClass),
        document.querySelector(this.afterTomorrowDayClass),
        document.querySelector(this.afterAfterTomorrowDayClass)
      ]

      const tomorrowWeekDay = translateWeekDay(daysOvercast[0].weekDay, lang);
      const afterTomorrowWeekDay = translateWeekDay(daysOvercast[1].weekDay, lang);
      const afterAfterTomorrowWeekDay = translateWeekDay(daysOvercast[2].weekDay, lang);

      this.update(elements, [tomorrowWeekDay, afterTomorrowWeekDay,afterAfterTomorrowWeekDay])
    }



    update(elements, data) {
        elements.forEach((el, index) => el.innerHTML = data[index]);
    }
}

export default UpdateDom
