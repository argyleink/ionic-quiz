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
      streetViewControl:  false
    })  
  }

  detachedCallback() {}
  attributeChangedCallback(attr, oldVal, newVal) {}
}

document.registerElement('routr-map', RoutrMap)