"use client"
import ObjectID from 'bson-objectid';
import { useRouter } from 'next/navigation'
import React from 'react'

import CopyLink from './ui/icons/Link';
import { writeToClipboard } from '@/utils';
import { Toaster, toast } from 'sonner';
const RoomsList = ({rooms}) => {
    const router = useRouter();


    if(rooms.length === 0) {
        return <p>No Rooms Yet, <u onClick={()=> { 
            const id = ObjectID();
            router.push(`/room/${id.toHexString()}`)
         }}>Create One</u>!</p>
    }
  return (
   <>
   <h1 className='text-lg text-center mb-2'> Global Rooms List<sup className='text-blue-500'>(upto 100 rooms)</sup></h1>


        
     <ul>
       
       {
          rooms.length > 0 &&  rooms.map((room, index) => (<li key={index} className='flex justify-center text-sm'>
           <span className='border border-r-0 p-2  border-white'>{index+1}. </span>
               <span className='border p-2 border-r-0 border-white'>{room.title}</span>
               <span className='border p-2  border-r-0 border-white'>{room._id.toString()}</span>
               <span onClick={()=> { 
                writeToClipboard(room._id.toString());
                toast.info("Link Copied Successfully.")
                }} className='border p-2 cursor-pointer   border-white'><CopyLink fill="white"  className={"size-4"}/></span>
           </li>))
       }
   </ul>
   <Toaster position='top-center' richColors/>
   </>
  
  )
}

export default RoomsList