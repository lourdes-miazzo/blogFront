import React from 'react'
import "./post.css"
import {Link} from "react-router-dom"

const Post = ({post}) => {
  const cat= post.category

  const photo= post.photo
  return (
    <>
    <div className="post">
        { 
            photo
            &&  
            <div className="imgPost">
                <img src={`https://shareyourideas-9pz3.onrender.com/images/${photo}`} className='img' alt="Post"/>
            </div>
        }
       
        <div className="postInfo">
            <div className="postCats">
            {cat.map((category, index) => (
                <Link to={`/?cat=${category}`} key={index}><span className="postCat">{category}</span></Link>
                ))}
        </div>
            <span className="postTitle"><Link to={`/post/${post._id}`} className='linkTitle'>{post.title}</Link></span>
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="postDesc">
            {post.description}
        </p>
    </div>
    </>
  )
}

export default Post
