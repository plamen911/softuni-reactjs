import React, { Component } from 'react'
import Input from '../common/Input'
import { register, login } from '../../api/remote'
import { saveSession, isAuthed } from '../../utils/auth'

export default class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      repeat: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  componentDidMount () {
    if (isAuthed()) {
      this.props.history.push('/')
    }
  }

  onChangeHandler (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  async onSubmitHandler (e) {
    e.preventDefault()
    let res = await register(this.state.name, this.state.email, this.state.password)
    if (res.success) {
      res = await login(this.state.email, this.state.password)
      if (res.success) {
        saveSession(Object.assign({}, res, {email: this.state.email}))
        this.props.history.push('/')
      }
    }
  }

  render () {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.onSubmitHandler}>
          <Input
            name="name"
            value={this.state.name}
            onChange={this.onChangeHandler}
            label="Name"
          />
          <Input
            name="email"
            value={this.state.email}
            onChange={this.onChangeHandler}
            label="E-mail"
          />
          <Input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.onChangeHandler}
            label="Password"
          />
          <Input
            name="repeat"
            type="password"
            value={this.state.repeat}
            onChange={this.onChangeHandler}
            label="Repeat password"
          />
          <input type="submit" className="btn btn-primary" value="Register"/>
        </form>
      </div>
    )
  }
}