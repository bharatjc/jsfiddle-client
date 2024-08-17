import React from 'react'
import { Link } from 'react-router-dom';
import { CiPlay1 } from "react-icons/ci";
import { FiUploadCloud } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { GiSettingsKnobs } from "react-icons/gi";
import { GiKnifeFork } from "react-icons/gi";
import { AiOutlineThunderbolt } from "react-icons/ai";

function Header() {
  return (
    <div className='h-[60px] w-full bg-[#1B1C1E] flex items-center text-[14px] text-white'>
      <div className='container flex justify-between'>
        <div className='w-[45%] flex items-center justify-start gap-8'>
          <div className='w-[46px] h-[33px] bg-cover cursor-pointer'>
            <img src="../jsfiddle-logo.png" alt="" className='w-full h-full' />
          </div>
          <div className='flex gap-5 cursor-pointer'>
           <div className='flex items-center gap-1'><CiPlay1 className='text-lg'/>
           <p>Run</p>
           </div>
           <div className='flex items-center gap-1'><FiUploadCloud className='text-lg'/>
           <p>Save</p>
           </div>
           <div className='flex items-center gap-1'><BiComment className='text-lg'/>
           <p>Collaborate
           </p>
           </div>
           <div className='flex items-center gap-2'>
            <button className='px-2 py-[1.5px] bg-[#26AA5A] text-[11px] font-semibold rounded-[4px]'>New</button>
            <p>Import fiddles as modules</p>
          </div>
          </div>
        </div>

        <div className='w-[45%] flex items-center justify-end gap-5'>
          <div>
            <button className='flex items-center gap-2 px-[12px] py-[7px] border-[1px] border-neutral-700 rounded-md font-bold text-[#FFB82E] hover:border-[#FFB82E]'><AiOutlineThunderbolt className='text-lg'/>
            GO PRO
            </button>
          </div>
          <div className='flex items-center gap-2 cursor-pointer'>
          <GiSettingsKnobs className='text-lg'/>
          Settings
          </div>
          <div>
            <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Header
