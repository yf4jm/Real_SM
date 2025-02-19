import React from 'react'
import Api from "../../AxiosInstance"
const blog_post = ({title,description,status,author,media}) => {
    Api.post("http://127.0.0.1:8000/api/blogs/",{
        title :""
    })
}

export default blog_post
