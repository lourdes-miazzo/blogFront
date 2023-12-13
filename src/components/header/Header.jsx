import React from 'react'
import "./header.css"


const Header = () => {
    return (
        <>
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">Comparte tus ideas</span>
                <span className="headerTitleLg">Blog</span>
            </div>
        <img src="https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/GF-2627-copia.jpg?alt=media&token=77784b58-25a7-42b4-aa1f-bfc6fe871e37" alt="" className="headerImg" />
        </div>
        </>
    )
}

export default Header