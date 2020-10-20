class RenderWeatherInfo {
  constructor(rootElementClass, overcastWrapperClass,renderCityAndDate, renderTemperature, renderOvercast, renderThreeDaysForecast) {
    this.rootElement = document.querySelector(rootElementClass);
    this.overcastWrapper = document.querySelector(overcastWrapperClass);
    this.renderCityAndDate = renderCityAndDate;
    this.renderTemperature = renderTemperature;
    this.renderOvercast = renderOvercast;
    this.renderThreeDaysForecast = renderThreeDaysForecast;
  }

  getData() {
    this.cityAndDate = this.renderCityAndDate(this.state);
    this.temperature = this.renderTemperature(this.state);
    this.overcast = this.renderOvercast(this.state);
    this.threeDaysForecast = this.renderThreeDaysForecast(this.state);
  }

  renderData() {
    this.rootElement.insertAdjacentHTML('afterbegin', this.cityAndDate);
    this.overcastWrapper.insertAdjacentHTML('beforeend', this.temperature);
    this.overcastWrapper.insertAdjacentHTML('beforeend', this.overcast);
    this.rootElement.insertAdjacentHTML('beforeend', this.threeDaysForecast);
  }

  init(state) {
    this.state = state;
    this.getData();
    this.renderData();
  }
}

export default RenderWeatherInfo