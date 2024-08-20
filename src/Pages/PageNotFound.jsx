import React from 'react'
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='h-[100vh] flex text-red-500 text-3xl font-bold items-center justify-center'> 
      <div className='container w-full h-[80%] flex justify-center'>
        <img src="../pagenotfound.webp" alt="" />
        <Link to="/">Back</Link>
      </div>
    </div>
  )
}

export default PageNotFound
