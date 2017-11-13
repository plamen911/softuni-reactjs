const authUtils = {
  saveSession: (userInfo) => {
    let userAuth = userInfo._kmd.authtoken
    sessionStorage.setItem('authtoken', userAuth)
    let userId = userInfo._id
    sessionStorage.setItem('userId', userId)
    let username = userInfo.username
    sessionStorage.setItem('username', username)
  },

  clearSession: () => {
      sessionStorage.clear();
  },

  isAuthed: () => {
    return sessionStorage.getItem('authtoken') !== null
  },

  getAuthToken: () => {
    return sessionStorage.getItem('authtoken')
  },

  getUsername: () => {
    if (!authUtils.isAuthed()) {
      return ''
    }
    return sessionStorage.getItem('username')
  },

  isAuthor: (record) => {
    return record._acl.creator === sessionStorage.getItem('userId')
  }
}

export default authUtils


