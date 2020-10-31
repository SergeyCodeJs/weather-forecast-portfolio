import convertFarToCel from '../utils/convertFarToCel'
import getWeekDay from '../utils/getWeekDay'
import getAverageTemperature from '../utils/getAverageTemperature'

class GetWeather {
    constructor(token, url) {
        this.token = token;
        this.url = url;
        this.targetUrl = `https://cors-anywhere.herokuapp.com/${this.url}${token}/`;
    }

    async fetchCoordinates(latitude, longitude) {
        this.finalUrl = `${this.targetUrl}/${latitude},${longitude}`

        try {
            const res = await fetch(this.finalUrl);
            const data = await Promise.resolve(res.json());

            return this.transformData(data)
        } catch (err) {
            throw new Error(err);
        }
    }

    transformData(data) {
        const todayWeather = {
            temperature: convertFarToCel(data.currently.temperature),
            weatherType: data.currently.icon
        }
        const overcast = {
            feelsLike: convertFarToCel(data.currently.apparentTemperature),
            humidity: data.currently.humidity,
            wind: data.currently.windSpeed
        }
        const {tomorrow, afterTomorrow, afterAfterTomorrow} = getWeekDay();

        function getNextTemperature(data, dayNumber, dateNumberInAPI) {
            const weatherType = data.daily.data[dateNumberInAPI].icon;
            const maxTemperature = convertFarToCel(data.daily.data[dateNumberInAPI].temperatureMax);
            const minTemperature = convertFarToCel(data.daily.data[dateNumberInAPI].temperatureMin);
            const temperature = `${getAverageTemperature(maxTemperature),
                (minTemperature)}`;

            return {weekDay: dayNumber, temperature, weatherType}
        }

        const daysOvercast = [
            getNextTemperature(data, tomorrow, 2),
            getNextTemperature(data, afterTomorrow, 3),
            getNextTemperature(data, afterAfterTomorrow, 4)
        ]

        return {daysOvercast, todayWeather, overcast}
    }
}

export default GetWeather