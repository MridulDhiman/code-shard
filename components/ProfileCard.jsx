"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";


import clsx from "clsx";
import Heart from "./ui/icons/Heart";
import Comment from "./ui/icons/Comment";
import View from "./ui/icons/View";
import FullScreen from "./ui/icons/FullScreen";
import Avatar from "react-avatar";



const ProfileCard = ({html, css, js, title, id, creator}) => {
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
    </html>
    `;

    const handleClick = () => {
         router.replace(`/shard/${id}`);
    }


   


  return (
    <div className={clsx(
      "flex flex-col bg-[#1E1F26] rounded-xl p-4 gap-3",
      )} 
   
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
            <span onClick={()=> {router.push(`/${creator}`)}}><Avatar round={true} size={"40"} name={creator}/></span> 
           </div>
           {/* <div className="flex gap-2">
             <Button  className="flex items-center" id="likes"><Heart className="size-5"/> <span>0</span></Button>
             <Button className="flex items-center" id="comments"><Comment className="size-4"/> <span>0</span></Button>
             <Button className="flex items-center" id="views"><View className="size-4"/> <span>0</span></Button>
           </div> */}

    </div>
  )
}

export default ProfileCard;