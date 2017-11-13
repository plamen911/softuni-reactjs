import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dataCollector from '../utils/dataCollector'
import requestHandler from '../utils/requestHandler'
import dateConverter from '../utils/dateConverter'
import authUtils from '../utils/authUtils'
import Comment from './Comment'
import CommentForm from './CommentForm'

class Details extends Component {
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
        },
        _acl: {
          creator: null
        }
      },
      comments: [],
      content: ''
    }

    this.handleUserInput = this.handleUserInput.bind(this)
    this.createComment = this.createComment.bind(this)
    this.deleteComment = this.deleteComment.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }

  componentDidMount () {
    const postId = this.props.match.params.id
    requestHandler.postDetails(postId)
      .then(currentPost => {
        if (currentPost) {
          this.setState({currentPost})
          requestHandler.comments(postId)
            .then(comments => {
              if (comments) {
                this.setState({comments})
              }
            })
        }
      })
  }

  handleUserInput (e) {
    this.setState(dataCollector(e))
  }

  createComment (e) {
    e.preventDefault()
    const postId = this.props.match.params.id
    const payload = {
      postId,
      content: this.state.content,
      author: authUtils.getUsername()
    }
    requestHandler.createComment(payload)
      .then((data) => {
        if (data) {
          this.setState({
            content: ''
          })
          requestHandler.comments(postId)
            .then(comments => {
              if (comments) {
                this.setState({comments})
              }
            })
        }
      })
  }

  deleteComment (e) {
    e.preventDefault()
    if (window.confirm('Delete the comment?')) {
      const postId = this.props.match.params.id
      const commentId = e.target.id
      requestHandler.deleteComment(commentId)
        .then(response => {
          if (response) {
            requestHandler.comments(postId)
              .then(comments => {
                if (comments) {
                  this.setState({comments})
                }
              })
          }
        })
    }
  }

  deletePost(e) {
    e.preventDefault()
    if (window.confirm('Delete the post?')) {
      const postId = e.target.id
      requestHandler.deletePost(postId)
        .then(response => {
          if (response) {
            this.props.history.push('/catalog')
          }
        })
    }
  }

  render () {
    return (
      <section id='viewComments'>
        <div className='post'>
          <div className='col thumbnail'>
            <a href={this.state.currentPost.url}>
              <img src={this.state.currentPost.imageUrl} alt=''/>
            </a>
          </div>
          <div className='post-content'>
            <div className='title'>
              <a href={this.state.currentPost.url}>
                {this.state.currentPost.title}
              </a>
            </div>
            <div className='details'>
              <p>{this.state.currentPost.description}</p>
              <div className='info'>
                submitted {dateConverter(this.state.currentPost._kmd.lmt)} ago by {this.state.currentPost.author}
              </div>
              <div className='controls'>
                <ul>
                  {authUtils.isAuthor(this.state.currentPost) ? (
                    <li className='action'>
                      <Link to={`/edit/${this.state.currentPost._id}`} className='editLink'>edit</Link>
                    </li>
                  ) : null}
                  {authUtils.isAuthor(this.state.currentPost) ? (
                    <li className='action'>
                      <a id={this.state.currentPost._id} className='deleteLink' href='/' onClick={this.deletePost}>delete</a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
          <div className='clear'/>
        </div>
        <div className='post post-content'>
          <CommentForm
            content={this.state.content}
            createComment={this.createComment}
            handleUserInput={this.handleUserInput} />
        </div>
        {this.state.comments.map(comment => (
          <Comment key={comment._id} comment={comment} deleteComment={this.deleteComment} />
        ))}
      </section>
    )
  }
}

export default Details
