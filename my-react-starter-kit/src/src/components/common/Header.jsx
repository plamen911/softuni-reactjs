import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  render () {
    const {loggedIn, onLogout} = this.props

    return (
      <header>
        <NavLink exact to='/' activeClassName='active'>Home</NavLink>
        {loggedIn && <NavLink to='/private' activeClassName='active'>Private Page</NavLink>}
        {loggedIn && <a href='/' onClick={onLogout}>Logout</a>}
        {!loggedIn && <NavLink to='/login' activeClassName='active'>Login</NavLink>}
        {!loggedIn && <NavLink to='/register' activeClassName='active'>Register</NavLink>}
      </header>
    )
  }
}