import React, { useContext, useState } from 'react'
import "./settings.css"
import SideBar from "../../components/sideBar/SideBar.jsx"
import {Context} from "../../context/Context.jsx"
import { deleteUser, updateUser } from '../../api/auth.js'

const Settings = () => {
    const {user, dispatch}=  useContext(Context)
    const [file, setFile]= useState(null)
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const [userName, setUserName]= useState("")
    const [success, setSuccess]= useState(false)

    
    const preUserName= user.userName
    const idUser= user._id
    const handleDeleteAccount= async()=>{
        try{
            dispatch({type: "LOG"}) 
            localStorage.removeItem('user');
            const res= await deleteUser(idUser)
            console.log(res)
            window.location.replace("/") 
        }
       catch(e){
        console.log(e)
       }
    }
    const handleUpdateUser= async(e)=>{
        try{
            e.preventDefault()
            dispatch({type: "UPDATE_START"})
            const data = new FormData()
            if(file) data.append('file', file)
            if(userName) data.append('userName', userName)
            data.append('preUserName', preUserName)
            if(email) data.append('email', email)
            if(password) data.append('password', password)

            const res= await updateUser(idUser, data)
            dispatch({type: "UPDATE_SUCCESS", payload: res.payload})
            console.log(res.payload) 
            setSuccess(true)
        }
        catch(e){
            dispatch({type: "UPDATE_FAILURE"})
        }
    }
  return (
    <>
    <div className="settings">
        <div className="settingsWraper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle" onClick={handleDeleteAccount}>Delete Account</span>
            </div>
            <form action="" className="settingsForm" onSubmit={handleUpdateUser}> 
                <label>Profile Picture</label>
                <div className="settingsPP">
                    {
                        file
                        ?
                        (<><img src={URL.createObjectURL(file)} className="settingsProfImg"/></>)
                        :
                        ( 
                                user.profilePic
                                ?
                                (<div> <img src={`http://localhost:8080/images/${user.profilePic}`} className="settingsProfImg"/> </div>)
                                :
                                (<><i className="fa-solid fa-image-portrait settingsProfImgUndefined"></i></>)
                        )
                    }
                    <label htmlFor="fileInput">
                    <i className="far fa-user-circle settingsUserIcon"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display: "none"}} onChange={(e)=> setFile(e.target.files[0])}/>
                </div>
                <label>Username</label>
                <input type="text" placeholder={user.userName} onChange={(e)=> setUserName(e.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder={user.email} onChange={(e)=> setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" onChange={(e)=> setPassword(e.target.value)}/>
                <button className="settingsSubmit" type='submit'>Update</button>
                {success && <span className='successUpdate'>Profile updated successfully</span>}
            </form>
        </div>
        <SideBar/>
    </div>
    </>
  )
}

export default Settings