import connectToDB from "@/lib/database";
import RoomPage from "./RoomPage";
import { Shard } from "@/models/Shard";


 export default async function CollaborativeRoomPage ({params}) {
const roomId = params['roomId'];

connectToDB();
const shard = await Shard.findById(roomId);

let title = null;

if(shard) {
  title = shard.title;
}

  return (
    <>
    <RoomPage title={title} roomId={roomId}/>
    </>
  )
}


