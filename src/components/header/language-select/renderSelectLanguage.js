function renderSelectLanguage({lang}) {
    const content = `
    <label class="language-switch language-switch--margin">
    <input class="language-switch__input" type="checkbox" ${lang === "Ru" ? null : "checked"}>
        <span class="language-switch-slider round"></span>
    </label>
    `
    return content
}

export default renderSelectLanguage