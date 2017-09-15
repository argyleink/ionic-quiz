import { fetchXML } from './utilities'

export default class RoutrRoute extends HTMLElement {
  createdCallback() {
    this.shadow_root = this.attachShadow({mode: 'open'})
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

      <select multiple>
        <option selected disabled style="display:none">Loading Routes...</option>
      </select>
    `
  }

  attachedCallback() {
    // fetch routes to populate list
    this.getRoutes()

    // listen for changes on list multiselect
    this.shadow_root
      .querySelector('select')
      .addEventListener('change', e => this.changed(e))
  }

  detachedCallback() {}
  attributeChangedCallback(attr, oldVal, newVal) {}

  changed(e) {
    document
      .querySelector('routr-map')
      .setAttribute('route', this.convertOptionsToString(e.target.selectedOptions))
  }

  convertOptionsToString(options) {
    return Array.from(options)
      .map(option => option.value)
      .join(',')
  }

  async getRoutes() {
    let xml = await fetchXML(`command=routeList&a=sf-muni`)
    this.render(xml.getElementsByTagName('route'))
  }

  render(routes) {
    this.shadow_root.querySelector('select').innerHTML = `
      ${Array.from(routes).reduce((options, option) => 
        `${options}
         <option value="${option.getAttribute('tag')}">${option.getAttribute('title')}</option>`
      , '<option selected disabled style="display:none">Route Picker</option>')}
    `
  }
}

document.registerElement('routr-route', RoutrRoute)