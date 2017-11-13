import React from 'react'
import { Link } from 'react-router-dom'
import dateConverter from '../../utils/dateConverter'
import authUtils from '../../utils/authUtils'

const Post = props => {
  return (
    <article className='post'>
      <div className='col rank'>
        <span>{props.index}</span>
      </div>
      <div className='col thumbnail'>
        <a href={props.url}>
          <img
            src={props.imageUrl} alt=''/>
        </a>
      </div>
      <div className='post-content'>
        <div className='title'>
          <a href={props.url}>
            {props.title}
          </a>
        </div>
        <div className='details'>
          <div className='info'>
            submitted {dateConverter(props._kmd.lmt)} ago by {props.author}
          </div>
          <div className='controls'>
            <ul>
              <li className='action'>
                <Link to={`/details/${props._id}`}>comments</Link>
              </li>
              {authUtils.isAuthor(props) ? (
                <li className='action'>
                  <Link to={`/edit/${props._id}`}>edit</Link>
                </li>
              ) : null}
              {authUtils.isAuthor(props) ? (
                <li className='action'>
                  <a id={props._id} className='deleteLink' href='/' onClick={props.deletePost}>delete</a>
                </li>
              ) : null}
            </ul>
          </div>

        </div>
      </div>
    </article>
  )
}

export default Post
