export default class RoutrRoute extends HTMLElement {
  createdCallback() {
    this.shadow_root = this.attachShadow({mode: 'open'})
    this.shadow_root.innerHTML = `
      <style>
        select {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          z-index: 1;
          -webkit-appearance: none;
          background: white;
          border: none;
          padding: 1rem 1.25rem;
          box-shadow: 0 2px 4px hsla(0,0%,0%,0.3);
          border-radius: 0.25rem;
        }
      </style>

      <select multiple>
        <option selected>N</option>
        <option>6</option>
        <option>Z</option>
      </select>
    `
  }

  attachedCallback() {
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
    return Array.from(options).reduce((sum, option) => `${sum} ${option.value}`, '')
  }

  render() {

  }
}

document.registerElement('routr-route', RoutrRoute)