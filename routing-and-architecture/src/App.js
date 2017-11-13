import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import AuthPage from './components/auth/AuthPage'
import LoggedInWrapper from './components/common/LoggedInWrapper'
import authUtils from './components/utils/authUtils'

import './style/site.css'
import './style/post.css'
import './style/header.css'
import './style/menu.css'
import './style/notifications.css'
import './style/submit.css'
import './style/comments.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: '',
      loggedIn: false
    }
  }

  componentDidMount() {
    this.setState({
      token: authUtils.getAuthToken(),
      loggedIn: authUtils.isAuthed()
    })
  }

  render () {
    return (
      <BrowserRouter>
        <div id="container">
          <Header/>
            {this.state.loggedIn ? <LoggedInWrapper /> : <AuthPage />}
          <Footer/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
