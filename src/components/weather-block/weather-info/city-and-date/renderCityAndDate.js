function renderCityAndDate({userLocation, dateData}) {
    const {city, country, flag} = userLocation;
    const {weekDay, date, month, time} = dateData;

    const content = `
    <div class="city-and-date city-and-date--margin">
    <div class="place-info place-info--padding">
        <p class="place-info__city">${city},</p>
        <p class="place-info__country">${country}</p>
        <p class="place-info__flag">${flag}</p>
    </div>
    <div class="date-info date-info--padding">
        <p class="data-info__week-day">${weekDay}</p>
        <p class="data-info__date">${date}</p>
        <p class="data-info__month">${month}</p>
        <p class="data-info__time">${time}</p>
    </div>
</div>
    `
    return content
}
export default renderCityAndDate