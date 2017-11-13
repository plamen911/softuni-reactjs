import React, { Component } from 'react'
import requestHandler from '../utils/requestHandler'
import authUtils from '../utils/authUtils'
import PostForm from './partials/PostForm'

class Edit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPost: {
        _id: '',
        author: '',
        url: '',
        title: '',
        imageUrl: '',
        description: '',
        _kmd: {
          lmt: new Date()
        }
      }
    }

    this.handleUserInput = this.handleUserInput.bind(this)
    this.editPost = this.editPost.bind(this)
  }

  componentDidMount () {
    const postId = this.props.match.params.id
    requestHandler.postDetails(postId)
      .then(currentPost => {
        if (currentPost) {
          this.setState({currentPost})
        }
      })
  }

  handleUserInput (e) {
    const currentPost = this.state.currentPost
    currentPost[e.target.name] = e.target.value
    this.setState({currentPost})
  }

  editPost (e, id) {
    e.preventDefault()
    const postId = this.state.currentPost._id
    const payload = {
      author: authUtils.getUsername(),
      title: this.state.currentPost.title,
      url: this.state.currentPost.url,
      imageUrl: this.state.currentPost.imageUrl,
      description: this.state.currentPost.description
    }
    requestHandler.editPost(postId, payload)
      .then((data) => {
        if (data) {
          this.props.history.push('/catalog')
        }
      })
  }

  render() {
    return (
      <section id='viewSubmit'>
        <div className='submitArea'>
          <h1>Submit Link</h1>
          <p>Please, fill out the form. A thumbnail image is not required.</p>
        </div>
        <div className='submitArea formContainer'>
          <PostForm {...this.state.currentPost} buttonLabel={'Edit Link'} onSubmit={this.editPost} handleUserInput={this.handleUserInput} />
        </div>
      </section>
    )
  }
}

export default Edit