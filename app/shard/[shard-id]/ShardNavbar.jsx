"use client";

import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { FaCloud } from "react-icons/fa";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { RiPencilFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShard } from "@/store/slices/shard";
import { FaCommentAlt } from "react-icons/fa";

const ShardNavbar = ({roomId, shardDetails}) => {
    const {data} = useSession();
    const router = useRouter();
    const [title, setTitle] = useState("Untitled");
    const [startEditing, setStartEditing] = useState(false);
    const dispatch = useDispatch();
    const shardState = useSelector((state) => state.shard);
 

    useEffect(() => {
if(shardDetails) {
    setTitle(shardDetails.title);
}
    }, [shardDetails]);

    useEffect(()=> {
dispatch(setShard({title}));
    }, [title]);
    
    const editTitle = () => {
        setStartEditing(true);
    }

const handleEnter = (e) => {
    if(e.key === "Enter") {
         setStartEditing(false);
    }
}



const handleSave = () => {
    console.log("Save Clicked");
    fetch(`/api/shard/${roomId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(shardState)
    })
    .then((res) => res.json())
    .then((data) =>{ 
        console.log("response success: ", data)
        
    
    })
    .catch((error) => console.log("response error: ", error.message))
}

  return (
    <div onKeyDown={handleEnter}
     className='bg-[#010101] flex p-4 py-2  justify-between items-center'>
        <div className="flex items-center gap-4">
            {
                startEditing? <>
                <input className="bg-transparent outline-none caret-white text-xl w-[50vw]" value={title} onChange={(e) => setTitle(e.target.value)} />
                </> : <h1 className="flex items-center gap text-xl">{title}
                <RiPencilFill
                onClick={editTitle}
                className="cursor-pointer hover:text-slate-500"/></h1>
            }
                  
        </div>
        <div className="flex items-center gap-4">
        <button  className="text-white flex items-center gap-2 hover:text-slate-300"> <FaCommentAlt/> Collaborate</button>
        <Button onClick={handleSave}><FaCloud/>SAVE</Button>
        <p className="cursor-pointer hover:text-slate-300" onClick={()=> router.push("/your-work") }>{data?.user.name}</p>
        </div>
    </div>
  )
}

export default ShardNavbar