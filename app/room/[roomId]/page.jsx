import RoomPage from "./RoomPage";


export default function CollaborativeRoomPage ({params}) {
const roomId = params['roomId'];

  return (
    <>
    <RoomPage roomId={roomId}/>
    </>
  )
}


