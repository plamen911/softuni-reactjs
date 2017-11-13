/*
globals fetch
*/
import authUtils from '../utils/authUtils'

const appKey = 'kid_ryKWiWvuW'
const appSecret = '2b0c1fe093d7481f88bf54cb87e424ab'
const hostUrl = 'https://baas.kinvey.com'

const handleError = (data) => {
  if (data.error) {
    return alert(data.description)
  }
  return data
}

const requestHandler = {
  login: (payload) => {
    return fetch(`${hostUrl}/user/${appKey}/login`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(data => data.json())
      .then(handleError)
  },

  logout: () => {
    return fetch(`${hostUrl}/user/${appKey}/_logout`, {
      method: 'POST',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken(),
      },
      // body: JSON.stringify({authtoken: authUtils.getAuthToken()})
    })
  },

  register: (payload) => {
    return fetch(`${hostUrl}/user/${appKey}`, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(`${appKey}:${appSecret}`),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(data => data.json())
      .then(handleError)
  },

  posts: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts?query={}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken(),
      }
    }).then(data => data.json())
      .then(handleError)
  },

  myPosts: () => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts?query={"author":"${authUtils.getUsername()}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken(),
      }
    }).then(data => data.json())
      .then(handleError)
  },

  createPost: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(data => data.json())
      .then(handleError)
  },

  editPost: (postId, payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(data => data.json())
      .then(handleError)
  },

  deletePost: (postId) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken()
      }
    }).then(data => data.json())
      .then(handleError)
  },

  postDetails: (post_id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/posts/${post_id}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken(),
      }
    }).then(data => data.json())
      .then(handleError)
  },

  comments: (post_id) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments?query={"postId":"${post_id}"}&sort={"_kmd.ect": -1}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken(),
      }
    }).then(data => data.json())
      .then(handleError)
  },

  createComment: (payload) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(data => data.json())
      .then(handleError)
  },

  deleteComment: (commentId) => {
    return fetch(`${hostUrl}/appdata/${appKey}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Kinvey ' + authUtils.getAuthToken()
      }
    }).then(data => data.json())
      .then(handleError)
  }
}

export default requestHandler
