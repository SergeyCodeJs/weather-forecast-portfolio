class RenderMap {
  constructor(rootElementClass, renderMapPosition) {
    this.rootElement = document.querySelector(rootElementClass);
    this.renderMapPosition = renderMapPosition;
  }

  getData() {
    this.renderMapPosition = this.renderMapPosition(this.state);
  }

  renderData() {
    this.rootElement.insertAdjacentHTML('beforeend', this.renderMapPosition);
  }

  init(state) {
    this.state = state;
    this.getData();
    this.renderData();
  }
}

export default RenderMap