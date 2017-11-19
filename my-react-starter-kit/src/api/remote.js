import { displayError, displaySuccess } from '../utils/helpers'
import { isAuthed, getAuthToken } from '../utils/auth'

const host = 'http://localhost:5000/'

function _displayServerResponse (res) {
  if (!res.success) {
    displayError(res)
  }
  if (res.success) {
    displaySuccess(res.message)
  }
}

async function _remoteCall (payload, endpoint, method = 'POST') {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (isAuthed) {
    headers['Authorization'] = 'bearer ' + getAuthToken()
  }

  const options = {
    method,
    headers
  }
  if (payload) {
    options.body = JSON.stringify(payload)
  }
  let res
  try {
    res = await fetch(host + endpoint, options)
  } catch (e) {
    displayError('Network Error: ' + e.message)
    return {success: false}
  }

  const json = await res.json()
  _displayServerResponse(json)

  return json
}

async function _remotePost (payload, endpoint) {
  return await _remoteCall(payload, endpoint, 'POST')
}

async function _remoteGet (endpoint) {
  return await _remoteCall(null, endpoint, 'GET')
}

async function _remoteDelete (endpoint) {
  return await _remoteCall(null, endpoint, 'DELETE')
}

async function register (name, email, password) {
  return await _remotePost({name, email, password}, 'auth/signup')
}

async function login (email, password) {
  return await _remotePost({email, password}, 'auth/login')
}

export { register, login }
