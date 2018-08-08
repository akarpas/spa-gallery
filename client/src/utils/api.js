import fetch from 'node-fetch'

const baseUrl = 'http://localhost:5050/api/flickr'

export default async (endpoint, text, page, method) => {
  let url
  const options = {
      method: method,
      body: JSON.stringify({ text, page }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

  url = `${baseUrl}${endpoint}`

  const response = await fetch(url, options)

  if (response.status !== 200) {
    throw Error(body.message)
  }

  const body = await response.json()

  return body  
}