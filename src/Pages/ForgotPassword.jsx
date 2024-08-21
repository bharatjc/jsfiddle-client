import React, { useState } from 'react'
import { FaJsfiddle } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
const [email, setEmail] = useState()
const navigate = useNavigate()

function handleSubmit(e){
  e.preventDefault();
  axios
      .post(`https://jsfiddleserver.onrender.com/forgotpassword`, {email})
      .then(res => {
        if(res.data.Status === "Success") {
          toast("Url is sent to your email", { autoClose: 2000 });
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
        <h2 className="text-2xl text-white my-10">Forgot Password</h2>
        <div className="text-[#8E8E8F]">
          <form onSubmit={handleSubmit}>
            <div className="border-[1px] border-[#323334] rounded-md">
              <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                <label htmlFor="email" className="cursor-text">
                  Enter email
                </label>
                <br />
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-transparent outline-none w-full"
                  onChange={(e)=>{
                    setEmail(e.target.value)
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

export default ForgotPassword
