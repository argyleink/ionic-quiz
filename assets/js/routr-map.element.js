export default class RoutrMap extends HTMLElement {
  createdCallback() {
    this.shadow_root = this.attachShadow({mode: 'open'})
    this.shadow_root.innerHTML = `
      <style>
        #map {
          display: block;
          width: 100vw;
          height: 100vh;
        }
      </style>
      <div id="map"></div>
    `
  }

  attachedCallback() {
    this.map = new google.maps.Map(this.shadow_root.querySelector('#map'), {
      zoom: 8,
      center: {
        lat: -34.397, 
        lng: 150.644
      },
      mapTypeControl:     false,
      fullscreenControl:  false,
      streetViewControl:  false,
      zoomControl:        false
    })  
  }

  detachedCallback() {}

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case 'route':
        this.updateRoutes(
          newVal
            .split(" ")
            .splice(1, newVal.length)
        )
        break;
      case 'theme':
        this.updateTheme(newVal)
        break;
    }
  }

  updateRoutes(routes) {
    console.log(routes)
  }

  updateTheme(theme) {
    console.log(theme)
  }
}

document.registerElement('routr-map', RoutrMap)