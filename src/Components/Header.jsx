import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import { FiUploadCloud } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { ImSwitch } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import {setFileDetails} from "../redux/Slices/fileSlice"
import { toggleTheme } from "../redux/Slices/themeSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RxCross2 } from "react-icons/rx";

function Header({ updateOutput }) {
  const [settings, setSettings] = useState(false);
  const [mode, setMode] = useState(false);
  const [headMenu, setHeadMenu] = useState(false);
  const [user, setUser] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [titles, setTitles] = useState([]);

  const pageTheme = useSelector((store) => {
    return store.theme.dark;
  });

  const dispatch = useDispatch();
  const data = useSelector((store) => {
    return store.user.value;
  });

  useEffect(() => {
    let userDetails = localStorage.getItem("access_token");
    if (userDetails) {
      setUser(true);
    }
  }, []);

  let access_token = localStorage.getItem("access_token");

  function savedata() {
    axios
      .post(`https://jsfiddleserver.onrender.com/savedata`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        let savedFile = res.data;
        console.log(savedFile);
        toast(`${savedFile} saved successfully!`, { autoClose: 2000 });
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

  const userId = localStorage.getItem("userId");

  function openFiles() {
    axios
      .get(`https://jsfiddleserver.onrender.com/gettitles/${userId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        let titles = res.data;
        setTitles(titles);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }

function getData(title){
  axios
  .get(`https://jsfiddleserver.onrender.com/getdata/${title}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  .then((res) => {
    dispatch(setFileDetails(res.data[0]))
  })
  .catch((err) => {
    console.error("Error:", err);
  });
}

function deletefile(title){
  axios
  .delete(`https://jsfiddleserver.onrender.com/deletefile/${title}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  .then((res) => {
    toast(`File removed successfully`, { autoClose: 2000 });
    console.log(res.data)
  })
  .catch((err) => {
    console.error("Error:", err);
  });
  console.log(title)
}

  return (
    <div
      className={`h-[60px] w-full flex items-center text-[14px] border-b-[1px] border-gray-300 ${
        pageTheme == "light"
          ? "bg-white text-black px-4"
          : "bg-[#1B1C1E] text-white px-4"
      } `}
    >
      <div className="max-w-screen-xl w-full mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="w-[46px] h-[33px] bg-cover cursor-pointer">
            <img src="../jsfiddle-logo.png" alt="" className="w-full h-full" />
          </div>

          <div className="sm:hidden text-lg cursor-pointer">
            <IoMdMenu
              onClick={() => {
                setHeadMenu(!headMenu);
              }}
            />
          </div>

          {headMenu && (
            <div className="w-1/2 h-[65vh] bg-black opacity-90 fixed top-0 left-0 shadow-lg text-white z-20">
              <ul className="py-10 px-5 text-[12px] flex flex-col gap-5">
                <li className="flex justify-between items-center">
                  <button
                    onClick={updateOutput}
                    className="flex items-center gap-2"
                  >
                    <CiPlay1 className="text-lg" />
                    Run
                  </button>
                  <IoCloseSharp
                    className="text-lg"
                    onClick={() => {
                      setHeadMenu(!headMenu);
                    }}
                  />
                </li>
                <hr />
                <li className="flex gap-2">
                  <FiUploadCloud className="text-lg" />
                  <p onClick={savedata}>Save</p>
                </li>
                <hr />
                <li className="flex gap-2">
                  <BiComment className="text-lg" />
                  <p
                    onClick={() => {
                      openFiles();
                      setShowFiles(!showFiles);
                    }}
                  >
                    Open File
                  </p>
                </li>

                {showFiles && (
              <div className="w-1/2 h-[40vh] bg-white opacity-90 fixed top-[30%] left-0 shadow-lg z-30 overflow-y-scroll">
                {titles.map((title, index) => (
                  <div key={index} className="border-b-[2px] py-3">
                    <div
                      className="text-gray-700 mb-2 flex justify-between items-center px-5"
                    >
                      <div onClick={()=>{
getData(title)
                      }}>
                        <span className="mr-3">{index + 1}.</span>{" "}
                        <span className="">{title}</span>
                      </div>
                      <div className="relative group">
                        <RxCross2 className="cursor-pointer" onClick={()=>deletefile(title)}/>
                        <div className="absolute right-5 w-[100px] top-full mt-1 hidden group-hover:block bg-black text-white text-xs p-2 rounded">
                          Remove this file
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

              </ul>
            </div>
          )}

          <div className="hidden sm:flex gap-5 cursor-pointer">
            <button onClick={updateOutput} className="flex items-center gap-1">
              <CiPlay1 className="text-lg" />
              Run
            </button>
            <div className="flex items-center gap-1">
              <FiUploadCloud className="text-lg" />
              <p onClick={savedata}>Save</p>
            </div>
            <div className="flex items-center gap-1">
              <BiComment className="text-lg" />
              <p
                onClick={() => {
                  openFiles();
                  setShowFiles(!showFiles);
                }}
              >
                Open File
              </p>
            </div>

            {showFiles && (
              <div className="w-1/4 h-[70vh] bg-white opacity-90 fixed top-[60px] left-[17%] shadow-lg z-30 overflow-y-scroll">
                {titles.map((title, index) => (
                  <div key={index} className="border-b-[2px] py-3">
                    <div
                      className="text-gray-700 mb-2 flex justify-between items-center px-5"
                    >
                      <div onClick={() => getData(title)}>
                        <span className="mr-3">{index + 1}.</span>{" "}
                        <span className="">{title}</span>
                      </div>
                      <div className="relative group">
                        <RxCross2 className="cursor-pointer" onClick={()=>deletefile(title)}/>
                        <div className="absolute right-5 w-[100px] top-full mt-1 hidden group-hover:block bg-black text-white text-xs p-2 rounded">
                          Remove this file
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2">
              <button className="px-2 py-[1.5px] bg-[#26AA5A] text-[11px] font-semibold rounded-[4px]">
                New
              </button>
              <p>Import fiddles as modules</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 px-[12px] py-[7px] border-[1px] border-neutral-700 rounded-md font-bold text-[#FFB82E] hover:border-[#FFB82E]">
            <AiOutlineThunderbolt className="text-lg" />
            GO PRO
          </button>

          <div
            className="sm:flex items-center gap-2 cursor-pointer"
            onClick={() => setSettings(!settings)}
          >
            <GiSettingsKnobs className="text-lg" />
            <h2 className="hidden sm:block">Settings</h2>
            {settings && (
              <div className="w-1/2 sm:w-1/4 h-[10vh] bg-white opacity-90 fixed top-[60px] right-[20px] shadow-lg text-[#222222] z-50 rounded-md">
                <div
                  className="px-2 py-5 sm:p-5 font-bold flex items-center sm:text-[16px] gap-1 sm:gap-3"
                  onClick={() => {
                    setMode(!mode);
                    dispatch(toggleTheme());
                  }}
                >
                  {mode ? (
                    <>
                      <MdDarkMode className="text-2xl" />
                      Enable Dark Mode
                    </>
                  ) : (
                    <>
                      <CiDark className="text-2xl" />
                      Enable Light Mode
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {user ? (
            <div className="text-lg text-blue-500 cursor-pointer">
              <ImSwitch
                onClick={() => {
                  localStorage.clear();
                  setUser(false);
                }}
              />
            </div>
          ) : (
            <div>
              <Link to="/login">Sign in</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
