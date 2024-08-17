import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { FaJsfiddle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  function handleChange(e){
     const {name, value} = e.target;
     setUser({...user, [name]: value})
  }

function handleSubmit(e){
  e.preventDefault();
  axios.post(`https://jsfiddleserver.onrender.com/api/login`, user)
  .then((res)=>{
    toast("Logged in successfully!",{autoClose: 2000});
    navigate("/");
  }).catch((err)=>{
    if(err.response.status){
      toast.error(err.response.data.msg, {autoClose: 2000})
    }
    else{
      toast.error('Something went wrong!',{position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,})
        console.log("Error:", err)
    }
})
}

  return (
    <div className="flex h-[100vh] flex-col items-center py-10 bg-[#1B1C1E]">
      <div className="w-[400px]">
      <div className="flex justify-center">
          <FaJsfiddle className="text-gray-500 size-20" />
        </div>
        <h2 className="text-2xl text-white my-10">
          Log in &nbsp;&nbsp; 👋
        </h2>
        <div className="text-[#8E8E8F]">
          <form onSubmit={handleSubmit}>
            <div className="border-[1px] border-[#323334] rounded-md">
            <div className="px-5 py-2 border-b-[1px] border-[#323334]">
            <label htmlFor="email" className="cursor-text">Your login</label><br />
            <input type="text" name='email' id="email" className="bg-transparent outline-none w-full" onChange={handleChange}/><br />
            </div>
            <div className="px-5 py-2 border-b-[1px] border-[#323334]">
            <label htmlFor="password" className="cursor-text">Password</label><br />
            <input type="text" name='password' id="password" className="bg-transparent outline-none w-full" onChange={handleChange}/><br />
            </div>
            </div>
            <div className="flex justify-center my-10">
              <button className="px-7 py-3 bg-[#2159FF] text-white rounded-md">Log in</button>
            </div>
            <div className="flex justify-center gap-4 my-3 text-slate-300">
            <Link to="/signup">Sign up</Link>
              <button>Reset password</button>
              </div>
            </form>
            </div>
      </div>
    </div>
  )
}

export default Login
