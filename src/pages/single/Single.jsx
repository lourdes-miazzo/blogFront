import React from 'react'
import "./single.css"
import { SinglePost } from '../../components/singlePost/SinglePost'
import SideBar from '../../components/sideBar/SideBar'
const Single = () => {
  return (
    <>
      <div className="single">
        <SinglePost/>
        <SideBar/>
      </div>
    </>
  )
}

export default Single
