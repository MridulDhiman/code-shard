"use client";

import { useRouter } from "next/navigation";
import Button from "./ui/Button";


import clsx from "clsx";
import Heart from "./ui/icons/Heart";
import Comment from "./ui/icons/Comment";
import View from "./ui/icons/View";
import FullScreen from "./ui/icons/FullScreen";
import Avatar from "react-avatar";
import { useEffect, useState } from "react";
import CustomSandpackPreview from "./CustomSandpackPreview";



const ProfileCard = ({content: initialContent, isTemplate, title, id, creator}) => {
  const router = useRouter();
  const [content, setContent] = useState(initialContent)
    const outputDoc = `
    <html lang="en">
    <head>
    <style>
    * {
      font-size: 0.7rem !important;
    }
    ${content.css}
    </style>
    </head>
    <body>${content.html}</body>
    <script defer>${content.js}</script>
    </html>
    `;

    const handleClick = () => {
         router.replace(`/shard/${id}`);
    }

useEffect(()=> {
if(initialContent) {
  setContent(initialContent);
}
},[initialContent]);
   


  return (
    <div className={clsx(
      "flex flex-col bg-[#1E1F26] rounded-xl p-4 gap-3",
      )} 
   
    >
 
      <div
       
       className="group relative w-full h-full">
        <span onClick={handleClick} className="text-slate-200 hidden group-hover:block  bg-[#252830] hover:bg-slate-700 absolute right-0 m-1 rounded-md text-lg p-2 cursor-pointer"><FullScreen className="size-5"/></span>

        {isTemplate ? (
          <>
            <CustomSandpackPreview
              template={content.templateType}
              files={content.files}
              dependencies={content.dependencies}
              devDependencies={content.devDependencies}
              className="pointer-events-none bg-white h-full w-full bg-cover rounded-lg"
            />
          </>
        ) : (
          <iframe
            className="pointer-events-none bg-white bg-cover rounded-lg"
            srcDoc={outputDoc}
            title="output"
            sandbox="allow-scripts"
            height="100%"
            width="100%"
          />
        )}
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