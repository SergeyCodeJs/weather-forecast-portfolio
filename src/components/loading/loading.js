function renderLoadingIcon({loading}) {
  const display = loading ? 'inline-block' : 'none';

  return `
  <div style="display: ${display}" class="icon sun-shower" id="loading">
  <div class="cloud"></div>
  <div class="sun">
    <div class="rays"></div>
  </div>
  <div class="rain"></div>
</div>
  `
}

export default renderLoadingIcon