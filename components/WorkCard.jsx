"use client";

import { useRouter } from "next/navigation";
import {  BsThreeDots } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import { RiCollageFill, RiDeleteBack2Fill, RiDeleteBin2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import {  FaLock } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa";
import Button from "./ui/Button";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { revalidatePath } from "next/cache";

const WorkCard = ({html, css, js, title, id, type}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const modal = useRef();
 
  

  useEffect(()=> {
    const handleBodyClick = (e) => {
      
      if(isPopoverOpen && modal.current && !modal.current.contains(e.target)) {
         setIsPopoverOpen(false);
      }
  
  }

     document.addEventListener('click', handleBodyClick);
    return ()=> {
      document.removeEventListener("click", handleBodyClick)
    }
  }, [isPopoverOpen]);



    const router = useRouter();
    const outputDoc = `
    <html lang="en">
    <head>
    <style>
    * {
      font-size: 0.7rem !important;
    }
    ${css}
    </style>
    </head>
    <body>${html}</body>
    <script defer>${js}</script>
    </html>`;

    const handleClick = () => {
         router.push(`/shard/${id}`);
    }


    const handleDelete = () => {
      setIsPopoverOpen(false);
      const isConfirmed = confirm("Are you sure you want to proceed with this action?");
      if(isConfirmed) {
        fetch(`/api/shard/${id}`, {
          method: "DELETE"
        })
        .then((res)=> res.json())
        .then((data) => {
          console.log("response success: ", data);
          //  revalidatePath("/your-work");
          router.refresh();
        })
        .catch((error) => console.log("response error: ", error.message))
      }
    }


    const toggleType = () => {
      setIsPopoverOpen(false);
      const isConfirmed = confirm("Are you sure you want to proceed with this action?");
      if(isConfirmed) {
        fetch(`/api/shard/${id}`, {
          method: "PATCH"
        })
        .then((res)=> res.json())
        .then((data) => {
          console.log("response success: ", data);
          //  revalidatePath("/your-work");
          router.refresh();
        })
        .catch((error) => console.log("response error: ", error.message))
      }
      
    }
  return (
    <div className="flex flex-col bg-[#1E1F26] rounded-xl  p-4 gap-3" 
   
    >
 
      <div
       
       className="group relative w-full h-full">
        <span onClick={handleClick} className="text-slate-200 hidden group-hover:block  bg-[#252830] hover:bg-slate-700 absolute right-0 m-1 rounded-md text-lg p-2 cursor-pointer"><SlSizeFullscreen/></span>
      <iframe
          className="pointer-events-none bg-white bg-cover rounded-lg"
          srcDoc={outputDoc}
          title="output"
          scrolling="no"
          sandbox="allow-scripts"
          height="100%"
          width="100%"
          
           />
      </div>

           <div className="flex items-center justify-between relative">
            <p>{title}</p>
            <div>
              {isPopoverOpen && 
              <ul
              ref={modal}
               className="text-xs p-2 w-[12rem] rounded-md absolute right-0 bottom-5 bg-[#131417]">
                <li 
                
                className="cursor-pointer flex items-center gap-2 hover:bg-blue-500 p-1"><RiCollageFill className="text-sm"/> Add to Collection</li>
                {type === 'public' && <li
                onClick={toggleType}
                 className="cursor-pointer flex items-center gap-2 hover:bg-green-500 p-1"><FaLock className="text-xs"/> Make Private </li> }
                 {type === 'private' && 
                 <li
                 onClick={toggleType}
                  className="cursor-pointer flex items-center gap-2 hover:bg-green-500 p-1">
                  <FaUnlock className="text-xs"/> Make Public
                  </li>}
                
                <li
                onClick={handleDelete}
                className="cursor-pointer flex items-center gap-2 hover:bg-red-500 p-1"> <RiDeleteBin2Fill  className="text-md"/> Delete</li>
                </ul>}
                
                <BsThreeDots
                onClick={()=> setIsPopoverOpen(true)}
                className={clsx(
                  "text-[#5A5F73] text-2xl cursor-pointer",
                  isPopoverOpen && "text-slate-200"
                  )}/>
                
             
            </div>
           </div>
           <div className="flex gap-2">
             <Button className="flex items-center" id="likes"><FaHeart/> <span>0</span></Button>
             <Button className="flex items-center" id="comments"><FaCommentAlt/> <span>0</span></Button>
             <Button className="flex items-center" id="views"><IoEyeSharp/> <span>0</span></Button>
           </div>

    </div>
  )
}

export default WorkCard