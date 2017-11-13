import React, { Component } from 'react'
import dataCollector from '../utils/dataCollector'
import requestHandler from '../utils/requestHandler'
import authUtils from '../utils/authUtils'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    this.setState(dataCollector(event))
  }

  handleSubmit (event) {
    event.preventDefault()
    requestHandler.login(this.state)
      .then(data => {
        if (data) {
          if (data.error) {
            return alert(data.description)
          }
          authUtils.saveSession(data)
          window.location = '/'
        }
      })
  }

  render () {
    return (
      <form id='loginForm' onSubmit={this.handleSubmit}>
        <h2>Sign In</h2>
        <label>Username:</label>
        <input
          name='username'
          type='text'
          onChange={this.handleChange}
        />
        <label>Password:</label>
        <input
          name='password'
          type='password'
          onChange={this.handleChange}
        />
        <input id='btnLogin' value='Sign In' type='submit'/>
      </form>
    )
  }
}

export default LoginForm
