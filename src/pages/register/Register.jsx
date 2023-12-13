import React, { useState } from 'react'
import "./register.css"
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { userRegister } from '../../api/auth';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, reset} = useForm();
  const [user, setUser]= useState(null)
  const [error, setError]= useState(false)
  const onSubmit= handleSubmit(async (values)=>{
    try{
      setError(false)
      const res= await userRegister(values)
      setUser(res.payload)
      reset()
    }
    catch(e){
      console.log(e)
      setError(true)
    }
  })
  console.log(user)
  user && window.location.replace("/auth/login")
  return (
    <>
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm"  onSubmit={onSubmit}>
                <label>Username</label>
                <input type="text" name="userName" {...register("userName", {required: true})} placeholder='Enter your username' className='registerInput'/>
                <label>Email</label>
                <input type="email" name="email" {...register("email", {required: true})} placeholder='Enter your email' className='registerInput'/>
                <label>Password</label>
                <input type="password" name="password" {...register("password", {required: true})} placeholder='Enter your password' className='registerInput'/>
                <button className="registerButton">Register</button>
            </form>
            <button className="loginRegisterButton"><Link to="/auth/login"  style={{textDecoration:"none", color: "inherit"}}>Login</Link></button>
            {
            error
            ? 
            (<><div className="registerError">Something went wrong</div></>)
            : 
            null}
        </div>
    </>
  )
}

export default Register