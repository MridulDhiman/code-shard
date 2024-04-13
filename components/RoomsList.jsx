"use client";
import { Toaster, toast } from 'sonner';
import RoomListCard from './RoomListCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const RoomsList = ({rooms: initialRooms}) => {
  const [rooms, setRooms] = useState(initialRooms);
  const router = useRouter();

  useEffect(()=> {
setRooms(initialRooms);
  }, [initialRooms])

  const onLinkCopy = () => {
    toast.info("Link Copied Successfully");
  }



    if(rooms.length === 0) {
        return <p>No Rooms Yet, <u className='cursor-pointer' onClick={()=> { 
            router.push(`/room/new-room`)
         }}>Create One</u>!</p>

    }


    const roomList = rooms.map((room, index) => <RoomListCard rooms={rooms} setRooms={setRooms} title={room.title} index={index}  key={room._id.toString()} onLinkCopy={onLinkCopy} id={room._id.toString()}/>)
  return (
   <>
   <h1 className='text-lg text-center mb-2'> Rooms List<sup className='text-blue-500'>(upto 100 rooms)</sup></h1>


     <ul className='flex flex-col gap-1'>
       {roomList}
       {/* <RoomListCard index={1}  /> */}
   </ul>
   <Toaster position='top-center' richColors/>
   </>
  
  )
}

export default RoomsList