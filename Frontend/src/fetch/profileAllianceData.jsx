import React from 'react'
import Api from '../AxiosInstance'
const profileAllianceData = async (profile_id) => {
    try{
        const res = await Api.get(`http://127.0.0.1:8000/api/profile-alliance/${profile_id}`)
         return res.data

    }catch(error){
        console.error(error);
        
    }
}

export default profileAllianceData
