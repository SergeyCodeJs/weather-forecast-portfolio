class RenderMap {
  constructor(rootElementClass, renderMapPosition) {
    this.rootElementClass = rootElementClass;
    this.renderMapPosition = renderMapPosition;
  }

  getData() {
    this.mapPositionContent = this.renderMapPosition(this.state);
  }

  renderData() {
    this.rootElement.insertAdjacentHTML('beforeend', this.mapPositionContent);
  }

  init(state) {
    this.rootElement = document.querySelector(this.rootElementClass);
    this.state = state;
    this.getData();
    this.renderData();
  }
}

export default RenderMap