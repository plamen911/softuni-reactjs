import React, { Component } from 'react'
import Post from './partials/Post'
import requestHandler from '../utils/requestHandler'

class Catalog extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: []
    }

    this.loadPosts = this.loadPosts.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }

  componentDidMount() {
    this.loadPosts()
  }

  loadPosts() {
    requestHandler.posts()
      .then(posts => {
        if (posts) {
          this.setState({
            posts
          })
        }
      })
  }

  deletePost(e) {
    e.preventDefault()
    if (window.confirm('Delete the post?')) {
      const postId = e.target.id
      requestHandler.deletePost(postId)
        .then(response => {
          if (response) {
            this.loadPosts()
          }
        })
    }
  }

  render () {
    return (
      <section id='viewCatalog'>
        <div className='posts'>
          {this.state.posts.map((post, index) => <Post key={post._id} {...post} index={index + 1} deletePost={this.deletePost} />)}
        </div>
      </section>
    )
  }
}

export default Catalog

