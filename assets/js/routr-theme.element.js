import * as Themes from './themes/index'

export default class RoutrTheme extends HTMLElement {
  createdCallback() {
    this.shadow_root = this.attachShadow({mode: 'open'})
    this.shadow_root.innerHTML = `
      <style>
        select {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          z-index: 1;
          -webkit-appearance: none;
          background: white;
          border: none;
          padding: 1rem 1.25rem;
          box-shadow: 0 2px 4px hsla(0,0%,0%,0.3);
          border-radius: 0.25rem;
        }
      </style>

      <select>
        <option selected>Google Maps</option>
        <option>Dark</option>
        <option>Light</option>
        <option>Punk Rock</option>
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
      .setAttribute('theme', e.target.value)
  }
}

document.registerElement('routr-theme', RoutrTheme)