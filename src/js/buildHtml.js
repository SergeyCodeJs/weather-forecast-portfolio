class BuildHTML {
    constructor(rootElementId, language, temperatureType, searchBar, cityAndDate, temperature, overcast, threeDaysForecast, map, mapPosition) {
        this.rootElement = document.getElementById(rootElementId);
        this.language = language;
        this.temperatureType = temperatureType;
        this.searchBar = searchBar;
        this.cityAndDate = cityAndDate;
        this.temperature = temperature;
        this.overcast = overcast;
        this.threeDaysForecast = threeDaysForecast;
        this.map = map;
        this.mapPosition = mapPosition;
    }
    init() {
        this.buildFinalHtml();
        this.rootElement.innerHTML = this.siteContent;
    }

    buildHeader() {
        return `
        <div class="header header--margin">
        <div class="header__left-wrapper">
          ${this.language}
          ${this.temperatureType}
        </div>
        ${this.searchBar}
        </div>
      `
    }

    buildWeatherInfo() {
        return `
      <div class="weather-info">  
      ${this.cityAndDate}
      <div class="temperature-overcast__wrapper">
      ${this.temperature}
      ${this.overcast}
      </div>
      ${this.threeDaysForecast}
      </div>
      `
    }

    buildMap() {
        return `
      <div class="map-wrapper">
        ${this.map}
        ${this.mapPosition}
      </div>
      `
    }

    buildSiteContent() {
        this.header = this.buildHeader();
        this.weatherInfo = this.buildWeatherInfo();
        this.map = this.buildMap();
    }

    buildFinalHtml() {
        this.buildSiteContent();
        this.innerContent = `${this.header} <div class="content-wrapper">${this.weatherInfo} ${this.map}</div>`;

        this.siteContent = `
    <div class="page-wrapper">
      <div class="page-inner-wrapper">
        ${this.innerContent}
      </div>
    </div>`
    }
}

export default BuildHTML