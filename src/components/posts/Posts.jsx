import React from 'react'
import "./posts.css"
import Post from '../post/Post.jsx'

const Posts = ({posts}) => {
  return (
    <div className='posts'>
      {posts.map(data=> (<Post post={data} key={data._id}/>))}
    </div>
  )
}

export default Posts