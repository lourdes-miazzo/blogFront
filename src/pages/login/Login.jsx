import React, { useContext, useState } from 'react'
import "./login.css"
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { postLogin } from '../../api/auth'
import {Context} from "../../context/Context.jsx"

const Login = () => {

  const {handleSubmit, register, reset}= useForm()
  const [userLogin, setUserLogin]= useState(null)
  const [error, setError]= useState(false)
  const {dispatch, isfetching}= useContext(Context)

  const onSubmit= handleSubmit(async (values)=>{
    dispatch({type: "LOGIN_START"})
      try{
        const res= await postLogin(values)
        setUserLogin(res.payload)
        setError(false)
        dispatch({type: "LOGIN_SUCCESS", payload: res.payload})
        reset()
      }
      catch(e){
        console.log(e)
        setError(true)
        dispatch({type: "LOGIN_FAILURE"})
        setTimeout(() => {
          setError(false)
        }, 4000);
        reset()
      } 
  })

  userLogin && window.location.replace("/")
  return (
    <>
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={onSubmit}>
                <label>Email</label>
                <input type="email" placeholder='Enter your email' className='loginInput' name="email" {...register("email", {required: true})}/>
                <label>Password</label>
                <input type="password" placeholder='Enter your password' className='loginInput' name="password" {...register("password", {required:true})} />
                <button className="loginButton" disabled={isfetching}>Login</button>
            </form>
            <button className="loginRegisterButton"><Link to="/auth/register"  style={{textDecoration:"none", color: "inherit"}}>Register</Link></button>
            {
              error
              ?
              (<><div className="loginError">Something went wrong</div></>)
              :
              null
            }
        </div>
    </>
  )
}

export default Login