class GetBackground {
    constructor(token, baseUrl) {
        this.token = token
        this.baseUrl = baseUrl;
    }

    async fetchBackground(weather, city) {
        try {
          const url = `${this.baseUrl}query=weather,${weather}&query=town,${city}&client_id=${this.token}`;
          const response = await fetch(url);
          const result = await response.json();
          return this.transformData(result);
        } catch(e) {
          console.log(e, 'Превышен лимит запросов к серверу изображений (50 в час), фон загрузится после обновления лимита');
        }
    }

    transformData(data) {
        const {alt_description, urls: {regular}} = data;
        return {alt: alt_description, url: regular}
    }
}

export default GetBackground