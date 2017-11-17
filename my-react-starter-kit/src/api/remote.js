import { displayError, displaySuccess } from '../utils/helpers'

const host = 'http://localhost:5000/'

function displayServerResponse (res) {
  if (!res.success) {
    displayError(res)
  }
  if (res.success) {
    displaySuccess(res.message)
  }
}

async function remoteCall (payload, endpoint, method = 'POST') {
  const headers = {
    'Content-Type': 'application/json'
  }

  const res = await fetch(host + endpoint, {
    method,
    headers,
    body: JSON.stringify(payload)
  })

  const json = await res.json()
  displayServerResponse(json)

  return json
}

async function register (name, email, password) {
  return await remoteCall({name, email, password}, 'auth/signup')
}

async function login (email, password) {
  return await remoteCall({email, password}, 'auth/login')
}

export { register, login }
