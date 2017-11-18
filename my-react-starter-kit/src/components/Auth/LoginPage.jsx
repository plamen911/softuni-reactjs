import React, { Component } from 'react'
import Input from '../common/Input'
import { login } from '../../api/remote'
import { saveSession, isAuthed } from '../../utils/auth'
import Preloader from '../common/Preloader/Preloader'

export default class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loading: false
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
    this.setState({loading: true})
    const res = await login(this.state.email, this.state.password)
    this.setState({loading: false})
    if (res.success) {
      saveSession(Object.assign({}, res, {email: this.state.email}))
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div className="container">
        <Preloader loading={this.state.loading}/>
        <h1>Login</h1>
        <form onSubmit={this.onSubmitHandler}>
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
          <input type="submit" className="btn btn-primary" value="Login"/>
        </form>
      </div>
    )
  }
}