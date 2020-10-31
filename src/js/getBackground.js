class GetBackground {
    constructor(token, baseUrl) {
        this.token = token
        this.baseUrl = baseUrl;
    }

    async fetchBackground(weather, city) {
        try {
          // const url = `${this.baseUrl}query=weather,${weather}&query=season,${season}&query=time,${time}&query=town,${city}&client_id=${this.token}`;
          const url = `${this.baseUrl}query=weather,${weather}&query=town,${city}&client_id=${this.token}`;
          const response = await fetch(url);
          const result = await response.json();
  console.log(weather, city)
          return this.transformData(result);
        } catch(e) {
          console.log(e, 'Превышен лимит запросов к сервису изображений (50 в час) фон загрузится позже');
        }
    }

    transformData(data) {
        const {alt_description, urls} = data;
        const {regular} = urls;
        return {alt: alt_description, url: regular}
    }
}

export default GetBackground