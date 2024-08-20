import React, { useState } from 'react'
import { FaJsfiddle } from "react-icons/fa";
import axios from "axios"; 
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState()
  const {id, token} = useParams()
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    axios
        .post(`https://jsfiddleserver.onrender.com/resetPassword/${id}/${token}`, {password})
        .then(res => {
          if(res.data.Status === "Success") {
              navigate('/login')
          }
      }).catch(err => console.log(err))
  }

  return (
    <div className="flex h-[100vh] flex-col items-center py-10 bg-[#1B1C1E]">
      <div className="w-[320px] px-5 md:w-[400px]">
        <div className="flex justify-center">
          <FaJsfiddle className="text-gray-500 size-20" />
        </div>
        <h2 className="text-2xl text-white my-10">Reset Password</h2>
        <div className="text-[#8E8E8F]">
          <form onSubmit={handleSubmit}>
            <div className="border-[1px] border-[#323334] rounded-md">
              <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                <label htmlFor="password" className="cursor-text">
                  New password
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-transparent outline-none w-full"
                  onChange={(e)=>{
                    setPassword(e.target.value)
                  }}
                />
                <br />
              </div>
            </div>
            <div className="flex justify-center my-10">
              <button className="px-7 py-3 bg-[#2159FF] text-white rounded-md">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
