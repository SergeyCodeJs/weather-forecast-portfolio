import translateWeekDay from '../utils/translateWeekDay'
import getWeatherIcon from '../utils/getWeatherIcon'

class UpdateDom {
    constructor(searchPlaceholderClass, searchBtnClass, cityClass, countryClass, flagClass, tomorrowDayClass, afterTomorrowDayClass, afterAfterTomorrowDayClass, forecastTitleClass, feelsLikeClass, feelsLikeValueClass, windClass, windValueClass, humidityClass, temperatureClass, tomorrowTemperatureClass, afterTomorrowTemperatureClass, afterAfterTomorrowTemperatureClass, todayCloudClass, tomorrowCloudsClass, afterTomorrowCloudsClass, afterAfterTomorrowCloudsClass, longitudeClass, latitudeClass, latitudeMinutesClass, latitudeSecondsClass, longitudeMinutesClass, longitudeSecondsClass) {
        this.searchPlaceholderClass = searchPlaceholderClass;
        this.searchBtnClass = searchBtnClass;
        this.cityClass = cityClass;
        this.countryClass = countryClass;
        this.flagClass = flagClass;
        this.tomorrowDayClass = tomorrowDayClass;
        this.afterTomorrowDayClass = afterTomorrowDayClass;
        this.afterAfterTomorrowDayClass = afterAfterTomorrowDayClass;
        this.forecastTitleClass = forecastTitleClass;
        this.feelsLikeClass = feelsLikeClass;
        this.feelsLikeValueClass = feelsLikeValueClass;
        this.windClass = windClass;
        this.windValueClass = windValueClass;
        this.humidityClass = humidityClass;
        this.temperatureClass = temperatureClass;
        this.tomorrowTemperatureClass = tomorrowTemperatureClass;
        this.afterTomorrowTemperatureClass = afterTomorrowTemperatureClass;
        this.afterAfterTomorrowTemperatureClass = afterAfterTomorrowTemperatureClass;
        this.todayCloudClass = todayCloudClass;
        this.tomorrowCloudsClass = tomorrowCloudsClass;
        this.afterTomorrowCloudsClass = afterTomorrowCloudsClass;
        this.afterAfterTomorrowCloudsClass = afterAfterTomorrowCloudsClass;
        this.longitudeClass = longitudeClass;
        this.latitudeClass = latitudeClass;
        this.latitudeMinutesClass = latitudeMinutesClass;
        this.latitudeSecondsClass = latitudeSecondsClass;
        this.longitudeMinutesClass = longitudeMinutesClass;
        this.longitudeSecondsClass = longitudeSecondsClass;
    }

    updateUserLocation({userLocation}) {
        const elements = [
            document.querySelector(this.cityClass),
            document.querySelector(this.countryClass),
            document.querySelector(this.flagClass)
        ]
        let {city, country, flag} = userLocation;
        city += ',';
        this.update(elements, [city, country, flag])
    }

    updateOvercast({todayWeather, lang, temperatureType, overcast}) {
        const elements = [
            document.querySelector(this.temperatureClass),
            document.querySelector(this.forecastTitleClass),
            document.querySelector(this.feelsLikeClass),
            document.querySelector(this.feelsLikeValueClass),
            document.querySelector(this.windClass),
            document.querySelector(this.windValueClass),
            document.querySelector(this.humidityClass)
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
            humidityTitle
        } = titles;

        const {feelsLike, wind} = overcast;
        const {temperature} = todayWeather;

        this.update(elements, [
            temperature,
            overcastTitle,
            feelsLikeTitle,
            `${feelsLike} ${temperatureTypeTitle}`,
            windTitle,
            `${wind} ${windSpeedTitle}`,
            humidityTitle
        ]);
    }

    updateButtonsNames({lang}) {
        const elements = [
            document.querySelector(this.searchBtnClass),
            document.querySelector(this.searchPlaceholderClass)
        ]
        const titles = {
            weatherButtonTitle: lang === "Ru"
                ? "Искать"
                : "Search",
            searchBarTitle: lang === "Ru"
                ? "Поиск по городу..."
                : "Search by city..."
        }
        const {weatherButtonTitle, searchBarTitle} = titles;

        this.update(elements, [weatherButtonTitle]);
        elements[1].placeholder = searchBarTitle;
    }

    updateLatitudeAndLongitudeNames({lang, mapPosition}) {
        const elements = [
            document.querySelector(this.latitudeClass),
            document.querySelector(this.longitudeClass),
            document.querySelector(this.latitudeMinutesClass),
            document.querySelector(this.latitudeSecondsClass),
            document.querySelector(this.longitudeMinutesClass),
            document.querySelector(this.longitudeSecondsClass)
        ]

        const titles = {
            latitudeTitle: lang === 'Ru'
                ? "Широта"
                : "Latitude",
            longitudeTitle: lang === "Ru"
                ? "Долгота"
                : "Longitude"
        }

        const {latitudeTitle, longitudeTitle} = titles;
        const {latitudeMinutes, latitudeSeconds, longitudeMinutes, longitudeSeconds} = mapPosition;

        this.update(elements, [latitudeTitle, longitudeTitle, latitudeMinutes, latitudeSeconds, longitudeMinutes, longitudeSeconds])
    }

    updateWeekDays({daysOvercast, lang}) {
        const elements = [
            document.querySelector(this.tomorrowDayClass),
            document.querySelector(this.afterTomorrowDayClass),
            document.querySelector(this.afterAfterTomorrowDayClass),
            document.querySelector(this.tomorrowTemperatureClass),
            document.querySelector(this.afterTomorrowTemperatureClass),
            document.querySelector(this.afterAfterTomorrowTemperatureClass)
        ]

        const tomorrowWeekDay = translateWeekDay(daysOvercast[0].weekDay, lang);
        const afterTomorrowWeekDay = translateWeekDay(daysOvercast[1].weekDay, lang);
        const afterAfterTomorrowWeekDay = translateWeekDay(daysOvercast[2].weekDay, lang);
        const tomorrowTemperature = daysOvercast[0].temperature;
        const afterTomorrowTemperature = daysOvercast[1].temperature;
        const afterAfterTomorrowTemperature = daysOvercast[2].temperature;

        this.update(elements, [
            tomorrowWeekDay,
            afterTomorrowWeekDay,
            afterAfterTomorrowWeekDay,
            tomorrowTemperature,
            afterTomorrowTemperature,
            afterAfterTomorrowTemperature
        ])
    }

    updateCloudsIcons({daysOvercast, todayWeather}) {
        const elements = [
            document.querySelector(this.todayCloudClass),
            document.querySelector(this.tomorrowCloudsClass),
            document.querySelector(this.afterTomorrowCloudsClass),
            document.querySelector(this.afterAfterTomorrowCloudsClass)
        ]

        const todayClouds = getWeatherIcon(todayWeather.weatherType);
        const tomorrowClouds = getWeatherIcon(daysOvercast[0].weatherType);
        const afterTomorrowClouds = getWeatherIcon(daysOvercast[1].weatherType);
        const afterAfterTomorrowClouds = getWeatherIcon(daysOvercast[2].weatherType);

        const cloudIcons = [todayClouds, tomorrowClouds, afterTomorrowClouds, afterAfterTomorrowClouds]

        elements.forEach((el, index) => el.src = cloudIcons[index]);
    }

    update(elements, data) {
        elements.forEach((el, index) => el.innerHTML = data[index]);
    }
}

export default UpdateDom
