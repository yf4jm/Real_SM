import React from 'react'
import Api from '../../AxiosInstance'
const profilePostsFetch = async (profile_id) => {
    try{
        const res = await Api.get(`http://127.0.0.1:8000/api/profile/${profile_id}/posts/`)
         return res.data

    }catch(error){
        console.error(error);
        
    }
}

export default profilePostsFetch
