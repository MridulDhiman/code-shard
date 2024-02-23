import React from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const Card = ({lang, content}) => {
  return (
    <div className='bg-[#1D1E22] p-4 rounded-lg text-sm flex-col flex gap-2  h-[50%]'>
    {/* code top */}
    <div className="flex items-center justify-between h-[]">
        <div className='flex items-center gap-2'>
        <span>
        <IoSettingsSharp className='text-[#474A54]' />
      </span>
      <h3>{lang}</h3>
        </div>  
      <span>
        <IoIosArrowDown  className='text-[#474A54]'/>
      </span>
    </div>
    {/* code content */}
    <div>
    <p className='text-xs font-thin font-mono'>{content}</p>
    </div>
  </div>
  )
}

export default Card