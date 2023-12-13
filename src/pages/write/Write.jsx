import React, { useContext, useState } from 'react'
import "./write.css"
import {  writePost } from '../../api/auth.js'
import { Context } from '../../context/Context'

const Write = () => {
    const {user}= useContext(Context)

    const [title, setTitle]= useState("")
    const [desc, setDesc]= useState("") 
    const [file, setFile]= useState(null)
    const [load, setLoad]= useState(false)
    const [categories, setCategories]= useState([])
    
    const handleCategoryChange= async(category)=>{
        //si la categ ya estaba seleccionda quitarla
        if(categories.includes(category)){
            setCategories(categories.filter((c)=> c !== category))
        }else{
            setCategories([...categories, category])
        }
    }

    const handleSubmit= async(e)=>{
        setLoad(true)
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('userName', user.userName);
        formData.append("category", categories.join(","))
        const res= await writePost(formData)

        window.location.replace(`http://localhost:5173/post/${res.payload._id}`) 
    }

  return (
    <>
    {
        load 
        ?
        (<>
            <div className="write">Cargando post</div>
        </>)
        :
        (<> 
            <div className='write'>
                {
                    file
                    ?
                    <img src={URL.createObjectURL(file)} className='writeImg'/>
                    :
                    <img src="https://firebasestorage.googleapis.com/v0/b/ecommerceart-fb0d5.appspot.com/o/2016-1.jpg?alt=media&token=68e3ca1c-1b8e-4817-a7c1-3bd0bb0edd83" className='writeImg'/>
                }
                <form className="writeForm" onSubmit={handleSubmit}>
                    <div className="writeFormGroup">
                        <label htmlFor="inputFile">
                            <i className="fa-solid fa-plus writeIcon"></i>
                        </label>
                        <input type="file" id="inputFile" style={{display: 'none'}} onChange={(e)=> setFile(e.target.files[0])}/>
                        <div className="writeCategoriesInput">
                            <label className='titleCat'>Categories</label>
                                <div>
                                    <input type="checkbox" 
                                    id="gourmet" 
                                    value="gourmet" 
                                    checked={categories.includes("gourmet")}
                                    onChange={()=>handleCategoryChange("gourmet")}
                                    className='writeIndivCat'
                                    />
                                    <label htmlFor='gourmet'>Gourmet</label>
                                </div>
                                <div>
                                    <input type="checkbox" 
                                    id="travel" 
                                    value="travel" 
                                    checked={categories.includes("travel")}
                                    onChange={()=> handleCategoryChange("travel")}
                                    className='writeIndivCat'
                                    />
                                    <label htmlFor='travel'>Travel</label>
                                </div>
                                <div>
                                    <input type="checkbox" 
                                    id="lifestyle" 
                                    value="lifestyle" 
                                    checked={categories.includes("lifestyle")}
                                    onChange={()=> handleCategoryChange("lifestyle")}
                                    className='writeIndivCat'
                                    />
                                    <label htmlFor='lifestyle'>Lifestyle</label>
                                </div>
                                <div>
                                    <input type="checkbox" 
                                    id="art" 
                                    value="art" 
                                    checked={categories.includes("art")}
                                    onChange={()=> handleCategoryChange("art")}
                                    className='writeIndivCat'
                                    />
                                    <label htmlFor='art'>Art</label>
                                </div>
                                <div>
                                    <input type="checkbox" 
                                    id="music" 
                                    value="music" 
                                    checked={categories.includes("music")}
                                    onChange={()=> handleCategoryChange("music")}
                                    className='writeIndivCat'
                                    />
                                    <label htmlFor='music'>Music</label>
                                </div>
                                <div>
                                    <input type="checkbox" 
                                    id="sports" 
                                    value="sports" 
                                    checked={categories.includes("sports")}
                                    onChange={()=> handleCategoryChange("sports")}
                                    className='writeIndivCat'
                                    />
                                    <label htmlFor='sports'>Sports</label>
                                </div>
                        </div>
                        <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={(e)=> setTitle(e.target.value)}/>
                    </div>
                    <div className="writeFormGroup">
                        <textarea className='writeInput writeText' placeholder='Tell your story...' onChange={(e)=> setDesc(e.target.value)}></textarea>
                    </div>
                    <button className="writeSubmit" type="submit">Publish</button>
                </form>
            </div>
        </>)
    }
   </>
  )
}

export default Write