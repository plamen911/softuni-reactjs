import React, { Component } from 'react'
import requestHandler from '../utils/requestHandler'
import authUtils from '../utils/authUtils'

class Header extends Component {
  constructor (props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout (event) {
    event.preventDefault()
    requestHandler.logout()
      .then(() => {
        authUtils.clearSession()
        window.location = '/'
      })
  }

  render () {
    return (
      <header>
        <span className="logo">☃</span><span className="header">SeenIt</span>
        {authUtils.isAuthed() ? (
          <div id="profile">
            <span>{authUtils.getUsername()}</span>|
            <a href="/" onClick={this.handleLogout}>logout</a>
          </div>
        ) : null}
      </header>
    )
  }
}

export default Header
