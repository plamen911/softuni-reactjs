import React, { Component } from 'react'
import './App.css'
import toastr from 'toastr'

import SingUpForm from './components/form/SingUpForm'
import LoginForm from './components/form/LoginForm'
import PokemonForm from './components/form/PokemonForm'

class App extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      token: ''
    }

    this.authenticate = this.authenticate.bind(this)
  }

  authenticate(data) {
    if (!data.success) {
      toastr.error(data.message, 'Login Error!')
      return
    }
    toastr.success(data.message, 'Login Success')
    this.setState({token: data.token, username: data.user.name})
    localStorage.setItem('token', data.token)
  }

  componentDidMount() {
    this.setState({token: localStorage.getItem('token')})
  }

  render () {
    if (!this.state.token) {
      return (
        <div>
          <SingUpForm/>
          <LoginForm authFunc={this.authenticate}/>
        </div>
      )
    }

    return (
      <div>
        <h2>Logged</h2>
        <PokemonForm/>
      </div>
    )
  }
}

export default App
