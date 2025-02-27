import React from 'react'
import Api from '../../AxiosInstance'
const alliancePostsFetch =async (alliance_id,active_profile=null) => {
    try{
        const res = await Api.get(`http://127.0.0.1:8000/api/alliance/${alliance_id}/posts/`,{
            params: { profile_id: active_profile },
        })
         return res.data

    }catch(error){
        console.error(error);
        
    }
}

export default alliancePostsFetch
