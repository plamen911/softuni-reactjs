import React from 'react'

const postForm = (props) => {
  return (
    <form id='editPostForm' className='submitForm' onSubmit={props.onSubmit}>
      <label>Link URL:</label>
      <input
        name='url'
        type='text'
        value={props.url}
        onChange={props.handleUserInput}
      />
      <label>Link Title:</label>
      <input
        name='title'
        type='text'
        value={props.title}
        onChange={props.handleUserInput}
      />
      <label>Link Thumbnail Image (optional):</label>
      <input
        name='imageUrl'
        type='text'
        value={props.imageUrl}
        onChange={props.handleUserInput}
      />
      <label>Comment (optional):</label>
      <textarea
        name='description'
        value={props.description}
        onChange={props.handleUserInput}
      />
      <input
        id='btnEditPost'
        type='submit'
        value={props.buttonLabel}
      />
    </form>
  )
}

export default postForm

