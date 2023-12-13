import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import "./navBar.css"
import { Context } from '../../context/Context'


const NavBar = () => {
    const {user, dispatch}= useContext(Context)
    console.log(user)
    const handleLogout= async()=>{
        dispatch({type: "LOG"})
        window.location.replace("/auth/login")
    }
    
    return (
        <>
            <div className='top'>
                <div className='top-left'>
                    <i className="fa-brands fa-square-facebook topIcon"></i>
                    <i className="fa-brands fa-square-instagram topIcon"></i>
                </div>
                <div className='top-center'>
                    <ul className="topList">
                        <li className="topListItem"><Link to="/" style={{textDecoration:"none", color: "inherit"}}>HOME</Link></li>
                        <li className="topListItem"><Link to="/" style={{textDecoration:"none", color: "inherit"}}>ABOUT</Link></li>
                        <li className="topListItem"><Link to="/" style={{textDecoration:"none", color: "inherit"}}>CONTACT</Link></li>
                        <li className="topListItem"><Link to="/write" style={{textDecoration:"none", color: "inherit"}}>{user ? "WRITE" : null}</Link></li>
                        <li id="topListItem" onClick={handleLogout}>{user ? "LOGOUT": null}</li>
                    </ul>
                </div>
                <div className='top-right'>
                    {
                    user 
                    ? 
                    (user.profilePic ? (<Link to="/user/settings" style={{textDecoration:"none", color: "inherit"}}><img src={`http://localhost:8080/images/${user.profilePic}`} className='topImg'/></Link>) : (<Link to="/user/settings" style={{textDecoration:"none", color: "inherit"}}><i className="fa-solid fa-circle-user userUndefinedTopImg"></i></Link>)) 
                    : 
                    (<> <ul className="topList">
                            <li className='topListItem'><Link to="/auth/login" style={{textDecoration:"none", color: "inherit"}}>LOGIN</Link></li>
                            <li className='topListItem'> <Link to="/auth/register" style={{textDecoration:"none", color: "inherit"}}>REGISTER</Link></li>
                        </ul>
                    </>)
                    }
                    <i className="fa-solid fa-magnifying-glass topSearchIcon"></i>
                </div>
            </div>
        </>
    )
}

export default NavBar