import fetch from 'node-fetch'

// const test = process.env.NODE_ENV === 'test'
// const dev = process.env.NODE_ENV === 'development'

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
  const body = await response.json()

  if (response.status !== 200) {
    throw Error(body.message)
  }
  return body
}