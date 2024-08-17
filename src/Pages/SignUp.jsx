import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { FaJsfiddle } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState([])
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`https://jsfiddleserver.onrender.com/api/signup`, details)
      .then((res) => {
        toast("Signup successfully!",{autoClose: 2000});
        navigate("/login");
      })
      .catch((err) => {
        let errors = err?.response?.data?.errors
        
        if (err?.response?.status == 400 && Array.isArray(errors)) {
          setFormErrors(errors);
        }
        toast.error("Something went wrong", {
          autoClose: 2000,
        });
      });
      
  }

  return (
    <div className="flex flex-col items-center py-10 bg-[#1B1C1E]">
      <div className="w-[400px]">
        <div className="flex justify-center">
          <FaJsfiddle className="text-gray-500 size-20" />
        </div>
        <h2>{formErrors.message}</h2>
        <h2 className="text-2xl text-white py-7">
          Create an account &nbsp;&nbsp; 🚀
        </h2>
        <div className="text-[#8E8E8F]">
          <form onSubmit={handleSubmit}>
            <div className="border-[1px] border-[#323334] rounded-md">
              <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                <label htmlFor="username" className="cursor-text">
                  Username
                </label>
                <br />
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="bg-transparent outline-none w-full"
                  onChange={handleChange}
                />
                <br />
                <p className="text-sm text-red-500">
              {formErrors.find(error => error.field === "username")?.msg}
            </p>
              </div>
              <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                <label htmlFor="email" className="cursor-text">
                  E-mail address
                </label>
                <br />
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-transparent outline-none w-full"
                  onChange={handleChange}
                />
                <br />
                <p className="text-sm text-red-500">
              {formErrors.find(error => error.field === "email")?.msg}
            </p>
              </div>
              <div className="px-5 py-2">
                <label htmlFor="password" className="cursor-text">
                  Password
                </label>
                <br />
                <input
                  type="text"
                  id="password"
                  name="password"
                  className="bg-transparent w-full outline-none"
                  onChange={handleChange}
                />
                <br />
                <p className="text-sm text-red-500">
              {formErrors.find(error => error.field === "password")?.msg}
            </p>
              </div>
            </div>
            <h2 className="my-3 text-[14px] text-center">
              By signing up you agree to our terms and privacy policy
            </h2>
            <div className="flex justify-center my-10">
              <button className="px-4 py-2 bg-[#2159FF] text-white rounded-md">
                Create an account
              </button>
            </div>
            <div className="flex justify-center gap-4 my-3 text-slate-300">
              <Link to="/login">Login</Link>
              <button>Reset password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
