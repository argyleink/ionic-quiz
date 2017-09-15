import * as Themes  from './themes/index'
import { fetchXML } from './utilities'

export default class RoutrMap extends HTMLElement {
  createdCallback() {
    // shadow root killed animations =(
    // this.shadow_root = this.attachShadow({mode: 'open'})
    this.innerHTML = `
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
    this.map = new google.maps.Map(this.querySelector('#map'), {
      zoom:               13,
      fullscreenControl:  false,
      streetViewControl:  false,
      zoomControl:        false,
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
        new google.maps.StyledMapType(Themes[theme], {name:theme})
      )})

    this.markers = []

    setInterval(() => 
      this.getBusLocations(this.selected_routes)
    , 15000)
  }

  detachedCallback() {}

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case 'route':
        this.getBusLocations(newVal.split(","))
        break
      case 'theme':
        this.updateTheme(newVal)
        break
    }
  }

  async getBusLocations(routes) {
    if (!routes) return

    // stash routes for interval
    this.selected_routes = routes

    // async fetch vehicles for supplied routes
    let xmls = await Promise.all(
      routes.map(route => 
        fetchXML(`command=vehicleLocations&a=sf-muni&r=${route}&t=${this.getLastTime()}`)))
    
    // stash time of last fetch for api, per docs request
    this.last_call_time = xmls[xmls.length - 1]
      .getElementsByTagName('lastTime')[0]
      .getAttribute('time')

    // filter results to routes with vehicles
    let routesWithVehicles = xmls.filter(xml => xml.children[0].children.length >= 2)

    // delete markers, we'll likely be drawing a whole new set on the map anyway
    // or showing no results
    this.deleteMarkers()

    // if we have some vehicles, draw them to the map else remove everything else
    if (routesWithVehicles.length) 
      this.makeMarkers(routesWithVehicles)
  }

  getLastTime() {
    return this.last_call_time ? this.last_call_time : 0
  }

  updateTheme(theme) {
    this.map.setMapTypeId(theme)
  }

  makeMarkers(routesVehicles) {
    routesVehicles
      .map(route => route.getElementsByTagName('vehicle'))          // map each route to vehicles
      .map(vehicles => Array.from(vehicles).map(vehicle => ({       // map vehicles HTMLCollection items to objects
        lat:          parseFloat(vehicle.getAttribute('lat')),
        lng:          parseFloat(vehicle.getAttribute('lon')),
        heading:      vehicle.getAttribute('heading'),
        predictable:  vehicle.getAttribute('predictable'),
        route:        vehicle.getAttribute('routeTag')
      })))
      .forEach(vehicles => vehicles.forEach(({lat,lng,route}, i) => // map objects to markers
        window.setTimeout(() => {
          this.markers.push(new google.maps.Marker({
            position:   { lat, lng },
            map:        this.map,
            label:      route,
            animation:  google.maps.Animation.DROP
          }))
        }, i * (500 / vehicles.length))
      ))
  }

  deleteMarkers() {
    if (!this.markers.length) return

    this.markers.forEach(marker => marker.setMap(null))
    this.markers = []
  }
}

document.registerElement('routr-map', RoutrMap)