"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";


import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { revalidatePath } from "next/cache";
import Heart from "./ui/icons/Heart";
import Comment from "./ui/icons/Comment";
import View from "./ui/icons/View";
import Delete from "./ui/icons/Delete";
import Lock from "./ui/icons/Lock";
import Unlock from "./ui/icons/Unlock";
import Collection from "./ui/icons/Collection";
import FullScreen from "./ui/icons/FullScreen";
import HorizontalThreeDots from "./ui/icons/HorizontalThreeDots";

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
         router.replace(`/shard/${id}`);
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
          method: "PATCH", 
          body : JSON.stringify({
           'type' : type === 'private' ? "public": 'private'
          }),
          headers: {
            "Content-Type":"application/json"
          }
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
        <span onClick={handleClick} className="text-slate-200 hidden group-hover:block  bg-[#252830] hover:bg-slate-700 absolute right-0 m-1 rounded-md text-lg p-2 cursor-pointer"><FullScreen className="size-5"/></span>
      <iframe
          className="pointer-events-none bg-white bg-cover rounded-lg"
          srcDoc={outputDoc}
          title="output"
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
                
                className="cursor-pointer flex items-center gap-2 hover:bg-blue-500 p-1"><Collection className="size-4"/> Add to Collection</li>
                {type === 'public' && <li
                onClick={toggleType}
                 className="cursor-pointer flex items-center gap-2 hover:bg-green-500 p-1"><Lock className="size-4 fill-white"/> Make Private </li> }
                 {type === 'private' && 
                 <li
                 onClick={toggleType}
                  className="cursor-pointer flex items-center gap-2 hover:bg-green-500 p-1">
                  <Unlock className="size-4 fill-white"/> Make Public
                  </li>}
                
                <li
                onClick={handleDelete}
                className="cursor-pointer flex items-center gap-2 hover:bg-red-500 p-1"> <Delete className="size-4 fill-white"/> Delete</li>
                </ul>}
                
                <HorizontalThreeDots
                onClick={()=> setIsPopoverOpen(true)}
                className={clsx(
                  "fill-[#5A5F73] size-5 cursor-pointer hover:fill-slate-200",
                  isPopoverOpen && "fill-slate-200"
                  )}/>
                
             
            </div>
           </div>
           <div className="flex gap-2">
             <Button  className="flex items-center" id="likes"><Heart className="size-5"/> <span>0</span></Button>
             <Button className="flex items-center" id="comments"><Comment className="size-4"/> <span>0</span></Button>
             <Button className="flex items-center" id="views"><View className="size-4"/> <span>0</span></Button>
           </div>

    </div>
  )
}

export default WorkCard