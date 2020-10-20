function renderTemperatureTypeSelect({temperatureType}) {
    const content = `
    <label class="temperature-type-switch">
    <input class="temperature-type-switch__input" type="checkbox" ${temperatureType === 'C' ? null : 'checked'}>
        <span class="temperature-type-switch__slider round"></span>
    </label>
    `

    return content
}

export default renderTemperatureTypeSelect