import React from 'react'
import { useEffect } from 'react';
import { useParams,useSearchParams,useLocation } from 'react-router-dom'
const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    useEffect(()=>{
        console.log(query)
    })

  return (
    <div>
      searched for : {query}
    </div>
  )
}

export default SearchPage
