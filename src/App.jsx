import React from "react"
import NavBar from "./components/navBar/NavBar.jsx"
import Home from "./pages/home/Home.jsx"
import Single from "./pages/single/Single.jsx"
import Write from "./pages/write/Write.jsx"
import Settings from "./pages/settings/Settings.jsx"
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register.jsx"
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom"
import { Context, ContextProvider } from "./context/Context.jsx"
import { useContext } from "react"




function App() {
  const user= useContext(Context)

  return (
    <> 
    <ContextProvider>
      <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/auth/register" element={<Register/>}/>
            <Route path="/auth/login" element={<Login/>}/>
            <Route path="/user/settings" element={<Settings/>}/> 
            <Route path="/write" element={<Write/>}/>
            <Route path="/post/:id" element={<Single/>}/>
          </Routes>
        </BrowserRouter>
    </ContextProvider>
    </>
  )
}

export default App
