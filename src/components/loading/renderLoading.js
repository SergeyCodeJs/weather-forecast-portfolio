class RenderLoading {
  constructor(rootElementClass, renderLoading) {
    this.rootElementClass = rootElementClass;
    this.renderLoading = renderLoading;
  }

  getData() {
    this.loadingContent = this.renderLoading(this.state);
  }

  renderData() {
    if(this.state.loading) {
      this.rootElement.insertAdjacentHTML('beforeend', this.loadingContent);
    } else {
      if (document.getElementById('loading')) {
        document.getElementById('loading').remove();
        document.querySelector('.page-inner-wrapper').style.opacity = 1;
      }
    }
  }

  init(state) {
    this.rootElement = document.querySelector(this.rootElementClass);
    this.state = state;
    this.getData();
    this.renderData();
  }
}

export default RenderLoading