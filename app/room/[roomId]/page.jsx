import CollaborativeShard from "@/components/CollaborativeShard";
import RoomNavbar from "./RoomNavbar";

const CollaborativeRoomPage = ({params}) => {
const roomId = params['room-id'];
  return (
    <>
    <RoomNavbar roomId={roomId}/>
    <CollaborativeShard roomId={roomId}/>
    </>
  )
}

export default CollaborativeRoomPage
