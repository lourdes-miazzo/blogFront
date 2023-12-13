import axios from "axios"

const API= "http://localhost:8080"


export const homeRes = async (search) => {
    try {
        const response = await axios.get(`${API}/post` + search);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const singlePost= async(id)=>{
    try{
        const response= await axios.get(`${API}/post/${id}`)
        return response.data
    }
    catch(e){
        throw e
    }
}

export const getCat= async()=>{
    try{
        const response= await axios.get(`${API}/category`)
        return response.data
    }
    catch(e){
        throw e
    }
}

export const userRegister= async(values)=>{
    try{
        const response= await axios.post(`${API}/auth/register`, values)
        return response.data
    }
    catch(e){
        throw e
    }
}
export const postLogin= async(values)=>{
    try{
        const response= await axios.post(`${API}/auth/login`, values)
        return response.data
    }
    catch(e){
        throw e
    }
}

export const writePost= async(formData)=>{
    try{
    
        const response= await axios.post(`${API}/post/upload`, formData)
        return response.data
    }
    catch(e){
        throw e
    }
}

export const deletePost= async(id ,userName)=>{

    try{
        const response= await axios.delete(`${API}/post/${id}`, userName)
   
        return response.data
    }
    catch(e){
        throw e
    }
}

export const updatePost= async(data)=>{
    try{
        const id= data.id
        const response= await axios.put(`${API}/post/${id}`, data)
        return response.data
    }
    catch(e){
        throw e
    }
}

export const deleteUser= async(id)=>{
    try{
        console.log(id)
        const response= await axios.delete(`${API}/user/${id}`)
        return response.data
    }
    catch(e){
        throw e
    }
}

export const updateUser= async(id, data)=>{
    try{
        const response= await axios.put(`${API}/user/${id}`, data)
        return response.data
    }
    catch(e){
        throw e
    }
}