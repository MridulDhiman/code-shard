import CollaborativeShard from "@/components/CollaborativeShard";
import RoomNavbar from "./RoomNavbar";
import RoomContextProvider from "./RoomContextProvider";

export default function CollaborativeRoomPage ({params}) {
const roomId = params['room-id'];
  return (
    <>
    <RoomContextProvider roomId={roomId}>
    <RoomNavbar roomId={roomId}/>
    <CollaborativeShard roomId={roomId}/>
    </RoomContextProvider>
    </>
  )
}


