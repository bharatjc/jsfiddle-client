import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaJsfiddle } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const[loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    axios
      .post(`https://jsfiddleserver.onrender.com/api/login`, user)
      .then((res) => {
        toast("Logged in successfully!", { autoClose: 2000 });
        localStorage.setItem("access_token", res.data.data.token);
        localStorage.setItem("userId", res.data.data._id)
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status) {
          toast.error(err.response.data.msg, { autoClose: 2000 });
        } else {
          toast.error("Something went wrong!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
          });
          console.log("Error:", err);
        }
        setLoading(false)
      });
  }

  return (
    <div className="flex h-[100vh] flex-col items-center py-10 bg-[#1B1C1E]">
      <div className="w-[320px] px-5 md:w-[400px]">
        <div className="flex justify-center">
          <FaJsfiddle className="text-gray-500 size-20" />
        </div>
        <h2 className="text-2xl text-white my-10">Log in &nbsp;&nbsp; 👋</h2>
        <div className="text-[#8E8E8F]">
          <form onSubmit={handleSubmit}>
            <div className="border-[1px] border-[#323334] rounded-md">
              <div className="px-5 py-2 border-b-[1px] border-[#323334]">
                <label htmlFor="email" className="cursor-text">
                  Your login
                </label>
                <br />
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-transparent outline-none w-full"
                  onChange={handleChange}
                />
                <br />
              </div>
              <div className="items-center px-5 py-2 border-b-[1px] border-[#323334]">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="cursor-text">
                    Password
                  </label>
                  {showPassword ? (
                    <IoEyeOffSharp
                      className="text-xl cursor-pointer"
                      onClick={() => setShowPassword((value) => !value)}
                    />
                  ) : (
                    <IoEyeSharp
                      className="text-xl cursor-pointer"
                      onClick={() => setShowPassword((value) => !value)}
                    />
                  )}
                </div>
                <input
                  type={showPassword == true ? "text" : "password"}
                  name="password"
                  id="password"
                  className="bg-transparent outline-none w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-center my-10">
              <button disabled={loading} className="disabled:bg-blue-300 disabled:cursor-no-drop px-7 py-3 bg-[#2159FF] text-white rounded-md">
                Log in
              </button>
            </div>
            <div className="flex justify-center gap-4 my-3 text-slate-300">
              <Link to="/signup">Sign up</Link>
              <Link to="/forgotpassword">Reset password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
