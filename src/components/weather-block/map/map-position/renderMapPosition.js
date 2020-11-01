function renderMapPosition({mapPosition, lang}) {
  const {latitudeMinutes, latitudeSeconds, longitudeMinutes, longitudeSeconds} = mapPosition;
  const latitudeTitle = lang === "Ru" ? "Широта" : "Latitude";
  const longitudeTitle = lang === "Ru" ? "Долгота" : "Longitude";
  
  const content = `
  <div class="map-position">
  <div class="map-position__latitude map-position__latitude--margin">
    <p class="latitude-title">${latitudeTitle}:</p>
    <p class="latitude-minutes">${latitudeMinutes}</p>
    <p>°</p>
    <p class="latitude-seconds">${latitudeSeconds}</p>
    <p>’</p>
  </div>
  <div class="map-position__longitude map-position__longitude--margin">
    <p class="longitude-title">${longitudeTitle}:</p>
    <p class="longitude-minutes">${longitudeMinutes}</p>
    <p>°</p>
    <p class="longitude-seconds">${longitudeSeconds}</p>
    <p>’</p>
  </div>
</div>
  `
  return content
}
export default renderMapPosition