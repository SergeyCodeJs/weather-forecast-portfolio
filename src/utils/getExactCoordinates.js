export default(latitude, longitude) => {
  const stringLat = latitude.toString();
  const stringLng = longitude.toString();
  
  const [latDotIndex, longDotIndex] = [stringLat.indexOf('.'), stringLng.indexOf('.')];

  const [latitudeMinutes, latitudeSeconds] = [stringLat.substring(0, latDotIndex), stringLat.substring(latDotIndex + 1)];
  const [longitudeMinutes, longitudeSeconds] = [stringLng.substring(0, longDotIndex), stringLng.substring(longDotIndex + 1)];

  return {latitudeMinutes, latitudeSeconds, longitudeMinutes, longitudeSeconds}
}
