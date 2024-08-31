import React from 'react'
import Api from '../../AxiosInstance'
import axios from 'axios'
const profilePostsFetch = async (profile_id,active_profile=null) => {
    try{
        const res = await axios.get(`http://127.0.0.1:8000/api/profile/${profile_id}/posts/`,{
            params: { profile_id: active_profile },
        })
         return res.data

    }catch(error){
        console.error(error);
        
    }
}

export default profilePostsFetch
