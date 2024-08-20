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

function Header({ updateOutput }) {
  const [headMenu, setHeadMenu] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    let userDetails = localStorage.getItem("user");
    if (userDetails) {
      setUser(true);
    }
  }, []);

  return (
    <div className="h-[60px] w-full bg-[#1B1C1E] flex items-center text-[14px] text-white px-4">
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
            <div className="w-1/2 h-[70vh] bg-black opacity-90 fixed top-0 left-0 shadow-lg text-white">
              <ul className="py-10 px-5 text-[12px] flex flex-col gap-5">
                <li className="flex justify-between items-center">
                  <button
                    onClick={updateOutput}
                    className="flex items-center gap-2"
                  >
                    <CiPlay1 className="text-lg"/>
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
                  <p>Save</p>
                </li>
                <hr />
                <li className="flex gap-2">
                  <BiComment className="text-lg" />
                  <p>Collaborate</p>
                </li>
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
              <p>Save</p>
            </div>
            <div className="flex items-center gap-1">
              <BiComment className="text-lg" />
              <p>Collaborate</p>
            </div>
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
          <div className="hidden sm:flex items-center gap-2 cursor-pointer">
            <GiSettingsKnobs className="text-lg" />
            Settings
          </div>
          {user ? (
            <div className="text-lg text-blue-500 cursor-pointer">
              <ImSwitch
                onClick={() => {
                  localStorage.removeItem("user");
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
