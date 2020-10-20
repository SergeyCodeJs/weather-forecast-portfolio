class RenderMap {
  constructor(rootElementClass, renderMapContainer, renderMapPosition) {
    this.rootElement = document.querySelector(rootElementClass);
    this.renderMapContainer = renderMapContainer;
    this.renderMapPosition = renderMapPosition;
  }

  getData() {
    this.renderMapContainer = this.renderMapContainer(this.state);
    this.renderMapPosition = this.renderMapPosition(this.state);
  }

  renderData() {
    this.rootElement.insertAdjacentHTML('beforeend', this.renderMapContainer);
    this.rootElement.insertAdjacentHTML('beforeend', this.renderMapPosition);
  }

  init(state) {
    this.state = state;
    this.getData();
    this.renderData();
  }
}

export default RenderMap