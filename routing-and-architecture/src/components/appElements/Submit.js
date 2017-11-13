import React, { Component } from 'react'
import dataCollector from '../utils/dataCollector'
import requestHandler from '../utils/requestHandler'
import PostForm from './partials/PostForm'

class Submit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      author: '',
      url: '',
      title: '',
      imageUrl: '',
      description: ''
    }

    this.handleUserInput = this.handleUserInput.bind(this)
    this.createPost = this.createPost.bind(this)
  }

  componentDidMount () {
    this.setState({
      author: localStorage.getItem('username')
    })
  }

  handleUserInput (e) {
    this.setState(dataCollector(e))
  }

  createPost (e) {
    e.preventDefault()
    requestHandler.createPost(this.state)
      .then(data => {
        if (data) {
          this.setState({
            url: '',
            title: '',
            imageUrl: '',
            description: ''
          })
          this.props.history.push('/catalog')
        }
      })
  }

  render () {
    return (
      <section id='viewEdit'>
        <div className='submitArea'>
          <h1>Submit Link</h1>
          <p>Please, fill out the form. A thumbnail image/description is not required.</p>
        </div>
        <div className='submitArea formContainer'>
          <PostForm {...this.state} buttonLabel={'Submit'} onSubmit={this.createPost} handleUserInput={this.handleUserInput} />
        </div>
      </section>
    )
  }
}

export default Submit
