import React from 'react'

const commentForm = (props) => {
  return (
    <form id='commentForm' onSubmit={props.createComment}>
      <label>Comment</label>
      <textarea
        name='content'
        value={props.content}
        onChange={props.handleUserInput}
      />
      <input type='submit' value='Add Comment' id='btnPostComment'/>
    </form>
  )
}

export default commentForm