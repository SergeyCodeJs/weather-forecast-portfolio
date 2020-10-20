function renderSearchBar({lang}) {
    const placeHolderText = lang === 'Ru' ? "Поиск по городу..." : "Search by city name...";
    const searchButtonText = lang === 'Ru' ? "Искать" : "Search";

    const content = `
    <div class="search-bar">
    <form action="#">
        <input class="search-bar__input" type="text" name="search-bar" id="search" placeholder=${placeHolderText}>
            <button class="button search-bar__button">${searchButtonText}</button>
        </form>
    </div>
    `
    return content
}

export default renderSearchBar