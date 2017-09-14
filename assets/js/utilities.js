const API_BASE = 'http://webservices.nextbus.com/service/publicXMLFeed?'

const fetchXML = async (params) => {
  let response  = await fetch(`${API_BASE}${params}`)
  let text      = await response.text()
  let xml       = await (new window.DOMParser()).parseFromString(text, 'text/xml')
  return xml
}

export {
  fetchXML
}