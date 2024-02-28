"use client";

import Room from "@/components/Room";

const RoomContextProvider = ({roomId, children}) => {
  return (
    <>
    <Room roomId={roomId}>
{children}
    </Room>
    </>
  )
}

export default RoomContextProvider