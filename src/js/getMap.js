import mapboxgl from 'mapbox-gl'

class GetMap {
    constructor(token, containerId, style, zoom, latitude, longitude) {
        this.map = null;
        this.token = token;
        this.containerId = containerId;
        this.style = style;
        this.zoom = zoom;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    jumpToCoordinates(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.map.jumpTo({center: [latitude,longitude]});
    }

    init() {
        mapboxgl.accessToken = this.token;
        this.map = new mapboxgl.Map({
            container: this.containerId,
            style: this.style,
            zoom: this.zoom
        });

        this.map.addControl(new mapboxgl.NavigationControl());
        try {
            setTimeout(() => {
                this.map.setLayoutProperty('country-label', 'text-field', [
                    'get',
                    'name_' + "ru"
                    ]);
                this.map.setLayoutProperty('settlement-label', 'text-field', [
                    'get',
                    'name_' + "ru"
                    ]);
            }, 100)
        } catch {
        }
        
        
    }

    changeMapLanguage({lang}) {
        try {
            
                this.map.setLayoutProperty('country-label', 'text-field', [
                    'get',
                    `name_${lang.toLowerCase()}`
                    ]);
                this.map.setLayoutProperty('settlement-label', 'text-field', [
                    'get',
                    `name_${lang.toLowerCase()}`
                    ]);
            
        } catch {
        }
    }
}

export default GetMap
