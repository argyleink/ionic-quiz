import * as Themes from './themes/index'

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
    let mapThemes = 

    this.map = new google.maps.Map(this.shadow_root.querySelector('#map'), {
      zoom: 8,
      center: {
        lat: -34.397, 
        lng: 150.644
      },
      mapTypeControlOptions: {
        mapTypeIds: Object.keys(Themes)
      },
      // mapTypeControl:     false,
      fullscreenControl:  false,
      streetViewControl:  false
    }) 

    Object.keys(Themes).map(theme => {
      this.map.mapTypes.set(
        theme, 
        new google.maps.StyledMapType(Themes[theme], 
        {name:theme})
      )
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
    this.map.setMapTypeId(theme)
  }
}

document.registerElement('routr-map', RoutrMap)