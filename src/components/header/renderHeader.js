class RenderHeader {
  constructor(rootElementClass, searchBarElementClass, renderSelectLanguage, renderTemperatureTypeSelect, renderSearchBar) {
    this.rootElement = document.querySelector(rootElementClass);
    this.searchBarElement = document.querySelector(searchBarElementClass);
    this.renderLanguageSelect = renderSelectLanguage;
    this.renderTemperatureTypeSelect = renderTemperatureTypeSelect;
    this.renderSearchBar = renderSearchBar;
  }

  getData() {
    this.languageSelectContent = this.renderLanguageSelect(this.state);
    this.temperatureTypeSelectContent = this.renderTemperatureTypeSelect(this.state);
    this.searchBarContent = this.renderSearchBar(this.state);
  }

  renderData() {
    this.rootElement.insertAdjacentHTML('beforeend', this.languageSelectContent);
    this.rootElement.insertAdjacentHTML('beforeend', this.temperatureTypeSelectContent);
    this.searchBarElement.insertAdjacentHTML('beforeend', this.searchBarContent);
  }

  init(state) {
    this.state = state;
    this.getData();
    this.renderData();
  }
}

export default RenderHeader