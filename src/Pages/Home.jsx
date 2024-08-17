import React from 'react'
import Header from '../Components/Header'

function Home() {
  
  return (
    <>
      <Header/>
      <div className='bg-[#202123] h-[calc(100vh-60px)]'>
        <div className='flex h-full container text-[#CFCFD0] text-[14px]'>
        <div className='w-[16%] pr-2 border-r-[1px] border-[#323334]'>
          <h2 className='text-white font-bold my-3'>Fiddle meta</h2>
          <textarea name="" id="" placeholder="Untitled fiddle" className='bg-[#1B1C1E] px-2 w-[95%] mb-[3px] outline-blue-600 h-8 rounded-[4px] text-[#8E8E8F] text-[14px]'></textarea>
          <textarea name="" id="" placeholder="No description" className='bg-[#1B1C1E] px-2 w-[95%] outline-blue-600 h-14 rounded-[4px] text-[#8E8E8F] text-[14px]'></textarea>
          <div className='flex my-5 gap-2 text-[13px]'>
          <input type="checkbox" /> <p className='font-semibold'>Private fiddle</p>
          <button className='text-[9px] px-2 bg-yellow-500 text-black rounded-[4px] font-semibold'>PRO</button>
          </div>
          <h2 className='font-semibold'>Groups</h2>
          <div className='my-3 flex gap-2'>
            <p className='font-semibold'>Resources</p>
            <button className='bg-[#373839] px-2 rounded-[4px] text-[9px] font-semibold'>URL</button>
            <button className='bg-[#373839] px-2 rounded-[4px] text-[9px] font-semibold'>cdnjs</button>
          </div>
          <h2 className='font-semibold'>Async requests</h2>
          <h2 className='my-3 font-semibold'>Other (links, license)</h2>
         </div>
         <div className='w-[84%]'>
         <div className='flex h-[50%] border-b-[1px] border-[#323334]'>
          <div className='flex justify-between p-2 w-[50%] border-r-[1px] border-[#323334]'>
            HTML

          </div>
          <div className='w-[50%] p-2'>CSS</div>
         </div>

         <div className='flex h-[50%]'>
          <div className='p-2 w-[50%] border-r-[1px] border-[#323334]'>JS</div>
          <div className='p-2 w-[50%]'>Output</div>
         </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default Home
