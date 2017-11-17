const saveSession = data => {
  localStorage.setItem('authtoken', data.token)
  localStorage.setItem('email', data.email)
  localStorage.setItem('username', data.user.name)
}

const destroySession = () => {
  localStorage.clear()
}

const isAuthed = () => {
  return localStorage.getItem('authtoken') !== null
}

const getUsername = () => {
  if (!isAuthed()) {
    return ''
  }
  return localStorage.getItem('username')
}

const getAuthToken = () => {
  if (!isAuthed()) {
    return ''
  }
  return localStorage.getItem('authtoken')
}

const isAuthor = record => {
  return record._acl.creator === localStorage.getItem('email')
}

export { saveSession, destroySession, isAuthed, getUsername, getAuthToken, isAuthor }
