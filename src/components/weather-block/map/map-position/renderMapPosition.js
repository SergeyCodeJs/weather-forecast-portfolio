function renderMapPosition({mapPosition, lang}) {
  const {latitudeMinutes, latitudeSeconds, longitudeMinutes, longitudeSeconds} = mapPosition;
  const latitudeTitle = lang === "Ru" ? "Широта" : "Latitude";
  const longitudeTitle = lang === "Ru" ? "Долгота" : "Longitude";
  
  const content = `
  <div class="map-position">
  <div class="map-position__latitude map-position__latitude--margin">
    <p>${latitudeTitle}:</p>
    <p>${latitudeMinutes}</p>
    <p>°</p>
    <p>${latitudeSeconds}</p>
    <p>’</p>
  </div>
  <div class="map-position__longitude map-position__longitude--margin">
    <p>${longitudeTitle}:</p>
    <p>${longitudeMinutes}</p>
    <p>°</p>
    <p>${longitudeSeconds}</p>
    <p>’</p>
  </div>
</div>
  `
  return content
}
export default renderMapPosition