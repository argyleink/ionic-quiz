const API_BASE      = 'http://webservices.nextbus.com/service/publicXMLFeed?'
const API_HEADERS   = new Headers({'Accept-Encoding':'gzip, deflate'})

const fetchXML = async (params) => {
  try {
    let response  = await fetch(`${API_BASE}${params}`, {headers: API_HEADERS})
    let text      = await response.text()
    let xml       = await (new window.DOMParser()).parseFromString(text, 'text/xml')
    return xml
  } 
  catch(e) {
    console.error(e)
  }
}

export {
  fetchXML
}