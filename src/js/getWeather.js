class GetWeather {
  constructor(token, url) {
    this.token = token;
    this.url = url;
    this.latitude = "";
    this.longitude = "";
    this.targetUrl = `https://cors-anywhere.herokuapp.com/${this.url}/${token}/${this.latitude},${this.longitude}`;
  }

  async fetchCoordinates() {
    try {
        const res = await fetch(this.targetUrl);
        const data = res.json();
        console.log(data)
        return data
    } catch (err) {
        throw new Error(err);
    }
}
}

export default GetWeather