import mapboxgl from 'mapbox-gl'

class GetMap {
    constructor(token, containerId, style, zoom, latitude, longitude) {
        this.token = token;
        this.containerId = containerId;
        this.style = style;
        this.zoom = zoom;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    loadMap(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        mapboxgl.accessToken = this.token;

        new mapboxgl.Map({
            container: this.containerId,
            style: this.style,
            center: [
                this.latitude, this.longitude
            ],
            zoom: this.zoom
        });
    }
}

export default GetMap
