import React from 'react'
import dateConverter from '../utils/dateConverter'

const comment = (props) => {
  return (
    <article key={props.comment._id} className='post post-content'>
      <p>{props.comment.content}</p>
      <div className='info'>
        submitted {dateConverter(props.comment._kmd.lmt)} ago by {props.comment.author} |
        <a id={props.comment._id} href='/' className='deleteLink'
           onClick={props.deleteComment}>delete</a>
      </div>
    </article>
  )
}

export default comment
