import RoomPage from "./RoomPage";


export default function CollaborativeRoomPage ({params}) {
const roomId = params['room-id'];

  return (
    <>
    <RoomPage roomId={roomId}/>
    </>
  )
}


