import React, { useContext, useState } from 'react'
import "./singlePost.css"
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { singlePost, deletePost, updatePost } from '../../api/auth.js'
import {Context} from "../../context/Context.jsx"

export const SinglePost = () => {

    const id= useParams()
    const idString= id.id
    const [single, setSingle]= useState(null)
    const user= useContext(Context)
    const [title, setTitle]= useState("")
    const [desc, setDesc]= useState("")
    const [updateMode, setUpdateMode]= useState(false)
    

    useEffect(() => {
        const fetchPost= async()=>{
            try{
                const res= await singlePost(idString)
                console.log(res.payload)
                setSingle(res.payload)
                setTitle(res.payload.title)
                setDesc(res.payload.description)
            }
            catch(e){
                throw e
            }
        }
    fetchPost()
    }, [id])

    const handlePostDelete=async()=>{
        try{
            await deletePost(idString, user.user.userName)
            window.location.replace("/")
        }
        catch(e){
            console.log(e)
        }
    }
    const handleUpdate= async()=>{
        try{
            const data= {id: idString, title, description: desc, userName: user.user.userName }
            const res= await updatePost(data)
            setSingle(res.payload)
            setUpdateMode(false)
        }
        catch(e){
            console.log(e)
        }
    }
  return (
    <>
    {single
    ?
    (<div className='singlePost'>
        <div className="singlePostWrapper">
            {
                single.photo
                &&
                <img src={`https://shareyourideas-9pz3.onrender.com/images/${single.photo}`} alt="" className="singlePostImg"/> 
            }
            {
                updateMode
                ? 
                (<input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} className='singlePostTitleInput' autoFocus/>)
                :
                (
                    <h1 className="singlePostTitle">
                    {single.title}
                    {
                    //puedo usar esto: user && user.user.userName === single.userName
                    //o la version simplificada de abajo donde el user con? se preunta si tiene user, o no hay nadie logueado
                    user?.user && single && user.user.userName === single.userName && (
                        <div className="singlePostEdit">
                            <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                            <i className="singlePostIcon fa-regular fa-trash-can" onClick={handlePostDelete}></i>
                        </div>
                    )
                    } 
                </h1>
                )
            }
            <div className="singlePostInfo">
                <span className="singlePostAutho">Author: 
                    <Link to={`/?user=${single.userName}`} className='linkAuthorSingle'><b>{single.userName}</b></Link> 
                </span>
                <span className="singlePostDate">{new Date(single.createdAt).toDateString()}</span>
            </div>
            {
            updateMode 
            ?
            (<><input type='textarea' value={desc} onChange={(e)=> setDesc(e.target.value)} className='singlePostDescInput'/></>)
            :
            (<>  
            <p className='singlePostDesc'>
                {single.description}
            </p>
            </>)
            }
            {
                updateMode && <button className="singlePostButtonUpdate" onClick={handleUpdate}>Update</button>
            }
        </div>
    </div>)
    : 
    (<><div className="singlePost">cargando</div></>)
    }
    </>
  )
}
