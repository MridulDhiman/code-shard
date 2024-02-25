"use client";

import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { FaCloud } from "react-icons/fa";
import {  useRouter } from "next/navigation";
import { RiPencilFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShard } from "@/store/slices/shard";
import { VscDebugStart } from "react-icons/vsc";
import { FaRegShareSquare } from "react-icons/fa";
import { setModal } from "@/store/slices/modal";
import { IoMdClose } from "react-icons/io";
import { FaLink } from "react-icons/fa6";
import { v4 as uuidV4 } from "uuid";

const ShardNavbar = ({roomId, shardDetails}) => {
    const {data} = useSession();
    const router = useRouter();
    const [title, setTitle] = useState("Untitled");
    const [startEditing, setStartEditing] = useState(false);
    const dispatch = useDispatch();
    const shardState = useSelector((state) => state.shard.current);
    const prevState = useSelector((state) => state.shard.prev);
    const modal = useRef();
    const isModalOpen = useSelector((state) => state.modal.isOpen);

    useEffect(()=> {

        const handleBodyClick = (e) => {
            console.log("body clicked");
          if(isModalOpen && modal.current && !modal.current.contains(e.target)) {
                    dispatch(setModal(false));
          }
        }

        document.body.addEventListener('click', handleBodyClick);

        return ()=> {
            document.body.removeEventListener('click', handleBodyClick)
        }

    }, [isModalOpen]);
 

    useEffect(() => {
if(shardDetails) {
    setTitle(shardDetails.title);
}
    }, [shardDetails]);

    useEffect(()=> {

        const handleBeforeUnload = (e) => {
             const isSaved = JSON.stringify(shardState) === JSON.stringify(prevState);
             if(!isSaved) {
                const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
             }

             if(isSaved) {
                console.log("saved and tab closed successfully...")
             }
        }

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [shardState, prevState]);




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

const openModal = () => {
    console.log("modal opened")
dispatch(setModal(true));
}



const handleSave = () => {
    console.log("Save Clicked");
    dispatch(setPrev({...shardState}));
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

const startSession = () => {
    const id = uuidV4();
    router.replace(`/room/${id}`);
}

  return (
    <div onKeyDown={handleEnter}
     className='bg-[#010101] flex p-4 py-2  justify-between items-center'>
        <div className="flex items-center gap-4">
            {
                startEditing ? <>
                <input className="bg-transparent outline-none caret-white text-xl w-[50vw]" value={title} onChange={(e) => setTitle(e.target.value)} />
                </> : <h1 className="flex items-center gap text-xl">{title}
                <RiPencilFill
                onClick={editTitle}
                className="cursor-pointer hover:text-slate-500"/></h1>
            }
                  
        </div>
        <div className="flex items-center gap-4">
        <button onClick={openModal}  className="text-white flex items-center gap-2 hover:text-slate-300"> <FaRegShareSquare/> Share</button>
          {isModalOpen && 
          <dialog 
          ref={modal} 
          onClose={() => dispatch(setModal(false))}
          className="mt-[90vh] z-50 grid items-center bg-[#1E1F26] rounded-lg p-8 py-12 text-white gap-4 border border-emerald-600" >
            <div className="relative flex flex-col items-center gap-4">
                <h1 className="text-[#47cf73] text-lg">Live Collaboration</h1>
                <div className="flex flex-col items-center gap-4">
                <p className=""> Invite people to collaborate on your code.</p>
                <Button onClick={startSession}> <VscDebugStart/> Start Session</Button>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2"><hr className="w-[40%]"/><span>Or</span><hr className="w-[40%]"/></div>
            <div className="relative flex flex-col items-center gap-4">
                <h1 className="text-[#47cf73] text-lg">Sharable Link</h1>
                <div className="flex flex-col items-center gap-4">
                <p className=""> Export as read-only link.</p>
                <Button> <FaLink/> Export to Link</Button>
                </div>
            </div>
            <button 
            className="absolute right-0 top-0 m-2 text-xl"
            onClick={()=>dispatch(setModal(false))}><IoMdClose/></button>
            </dialog>} 
        <Button onClick={handleSave}><FaCloud/>SAVE</Button>
        <p className="cursor-pointer hover:text-slate-300" onClick={()=> router.push("/your-work") }>{data?.user.name}</p>
        </div>
    </div>
  )
}

export default ShardNavbar