import React, { useState, useEffect } from 'react'
import Header from '../../components/header/Header.jsx'
import "./home.css"
import Posts from '../../components/posts/Posts.jsx'
import SideBar from '../../components/sideBar/SideBar.jsx'
import { homeRes } from '../../api/auth.js'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts]= useState([])
  const {search}=  useLocation()
  
  useEffect(() => {
      const fetchPost= async()=>{
        try{
          const res= await homeRes(search)
          setPosts(res.payload)
        }
        catch(e){
          throw e
        }
    }
    fetchPost()  
  }, [search])

  return (
    <>
    <div className="allHome">
      <Header/>
      <div className="home">
        <Posts posts={posts}/>
        <SideBar/>
      </div>
    </div>
    </>
  )
}

export default Home