import * as Themes  from './themes/index'
import { fetchXML } from './utilities'

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
      zoom:               13,
      fullscreenControl:  false,
      streetViewControl:  false,
      center: {
        lat: 37.7680445, 
        lng: -122.439697
      },
      mapTypeControlOptions: {
        mapTypeIds: Object.keys(Themes)
      },
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
        this.getBusLocations(
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

  async getBusLocations(routes) {
    let xml = await Promise.all(
      routes.map(async route => 
        await fetchXML(`command=vehicleLocations&a=sf-muni&r=${route}&t=${Date.now()}`)))

    // console.log(xml.getElementsByTagName('vehicle'))
    console.log(xml)
  }

  updateTheme(theme) {
    this.map.setMapTypeId(theme)
  }
}

document.registerElement('routr-map', RoutrMap)