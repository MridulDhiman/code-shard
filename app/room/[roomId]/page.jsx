import connectToDB from "@/lib/database";
import RoomPage from "./RoomPage";
import { Shard } from "@/models/Shard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


 export default async function CollaborativeRoomPage ({params}) {
const session = await auth();
   const roomId = params['roomId'];
   console.log("Room id: ", roomId);
   connectToDB();
    let shardDetails = null;

   if(!session) {
      console.log('session not present');
      redirect("/");
   }

   if(roomId === 'new-room') {
    shardDetails =  await Shard.create({creator: session?.user?.name, type: "private", mode: "collaboration"});
   }


   
   if(roomId !== 'new-room') {
     const shards =  await Shard.find({});
     const shardsById = shards.length > 0 ? shards.map((shard) => shard._id.toString()) : [];
     if(!shardsById.includes(roomId)) {
      console.log(shardsById);
      console.log('shardid not present',roomId);
        redirect("/");
     }
      shardDetails = await Shard.findOne({_id: roomId});
      console.log("Shard details: ", shardDetails);
   }

   if(!shardDetails) {
      console.log('shard details not present')
       redirect("/");
   }


    const {title,  creator, _id  } = shardDetails;


   if(session) {
      if(roomId === 'new-room' && session?.user?.name !== creator) {
         console.log("shard is private or collaborative");
            redirect("/");
      }
   }



  return (
    <>
    <RoomPage creator={creator} title={title} roomId={_id.toString()}/>
    </>
  )
}


