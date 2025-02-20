import React from 'react'
import Api from '../../AxiosInstance';
const blogDetailsFetch = async(id) => {
    try{
        const res = await Api.get(`http://127.0.0.1:8000/api/blogs/${id}`)
         return res.data

    }catch(error){
        console.error(error);
        
    }
}

export default blogDetailsFetch