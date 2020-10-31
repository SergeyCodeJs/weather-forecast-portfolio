class RenderHeader {
  constructor(rootElementClass, searchBarElementClass, renderSelectLanguage, renderTemperatureTypeSelect, renderSearchBar) {
    this.rootElementClass = rootElementClass;
    this.searchBarElement = document.querySelector(searchBarElementClass);
    this.renderLanguageSelect = renderSelectLanguage;
    this.renderTemperatureTypeSelect = renderTemperatureTypeSelect;
    this.renderSearchBar = renderSearchBar;
  }

  getData() {
    this.languageSelectContent = this.renderLanguageSelect(this.state).trim();
    this.temperatureTypeSelectContent = this.renderTemperatureTypeSelect(this.state).trim();
    this.searchBarContent = this.renderSearchBar(this.state).trim();
  }

  renderData() {
    this.rootElement.insertAdjacentHTML('beforeend', this.languageSelectContent);
    this.rootElement.insertAdjacentHTML('beforeend', this.temperatureTypeSelectContent);
    this.searchBarElement.insertAdjacentHTML('beforeend', this.searchBarContent);
  }

  init(state) {
    this.rootElement = document.querySelector(this.rootElementClass);
    this.state = state;
    this.getData();
    this.renderData();
  }
}

export default RenderHeader