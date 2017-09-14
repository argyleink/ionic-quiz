export default class RoutrMap extends HTMLElement {
  createdCallback() {}

  attachedCallback() {
    this.map = new google.maps.Map(this, {
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