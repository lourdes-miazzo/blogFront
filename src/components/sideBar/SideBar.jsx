import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "./sideBar.css"
import { getCat } from '../../api/auth'


const SideBar = () => {
  const [cat, setCat]= useState([])

  useEffect(() => {
    const category= async()=>{
      try{
        const res= await getCat()
        setCat(res.payload)
      }
      catch(e){
        throw e
      }
    }
    category()
  }, [])

  return (
    <>
      <div className="sideBar">
        <div className="sideBarItem">
          <span className="sideBarTitle">ABOUT ME</span>
          <img src="https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/IMG_3169.jpg?alt=media&token=699dd080-43fc-4155-8a6c-474645d5e121" alt="" className="sideBarImg" />
          <p className="sideBartText">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit pariatur modi nesciunt doloremque molestiae quod r</p>
        </div>
        <div className="sideBarItem">
          <span className="sideBarTitle">CATEGORIES</span>
          <ul className="sideBarList">
            {cat.map(c=>(<Link to={`/?cat=${c.name}`} key={c._id} className='linkSideBarItem'><li className="sideBarListItem" >{c.name}</li></Link>))}
          </ul>
        </div>
        <div className="sideBarItem">
          <span className="sideBarTitle">FOLLOW US</span>
          <div className="sideBarSocial">
            <i className="fa-brands fa-square-facebook sideBarIcon"></i>
            <i className="fa-brands fa-square-instagram sideBarIcon"></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideBar