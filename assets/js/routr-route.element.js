import { fetchXML } from './utilities'

export default class RoutrRoute extends HTMLElement {
  createdCallback() {
    this.shadow_root = this.attachShadow({mode: 'open'})
    this.getRoutes()
  }

  attachedCallback() {}
  detachedCallback() {}
  attributeChangedCallback(attr, oldVal, newVal) {}

  changed(e) {
    document
      .querySelector('routr-map')
      .setAttribute('route', this.convertOptionsToString(e.target.selectedOptions))
  }

  convertOptionsToString(options) {
    return Array.from(options).reduce((sum, option) => `${sum} ${option.value}`, '')
  }

  async getRoutes() {
    let xml = await fetchXML(`command=routeList&a=sf-muni`)
    this.render(xml.getElementsByTagName('route'))
  }

  render(routes) {
    this.shadow_root.innerHTML = `
      <style>
        select {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 1;
          -webkit-appearance: none;
          background: white;
          border: none;
          padding: 11px 10px 9px 10px;
          box-shadow: 0 2px 4px hsla(0,0%,0%,0.3);
          border-radius: 2px;
        }
      </style>

      <select size="1" multiple>
        ${Array.from(routes).reduce((options, option) => 
          `${options}
           <option>${option.getAttribute('tag')}</option>`
        , '<option selected disabled style="display:none">Route Picker</option>')}
      </select>
    `
    this.listen()
  }

  listen() {
    this.shadow_root
      .querySelector('select')
      .addEventListener('change', e => this.changed(e))
  }
}

document.registerElement('routr-route', RoutrRoute)