import React from 'react'
import axios from 'axios';
const CommuntiyRouteHandler = async(name) => {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/api/communities/${name}`)
        return response.data
    }catch(error){
        
        document.location.href = '/error/404';
    }
    
    
}

export default CommuntiyRouteHandler
