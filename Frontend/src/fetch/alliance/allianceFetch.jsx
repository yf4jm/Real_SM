import React from 'react'
import axios from 'axios'
const allianceFetch = async (id) => {
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/alliances/${id}`)
         return res.data

    }catch(error){
        console.error(error);
        
    }

}

export default allianceFetch
