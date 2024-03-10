import { Shard } from "@/models/Shard";
import ShardNavbar from "./ShardNavbar";
import connectToDB from "@/lib/database";
import ShardComponent from "@/components/Shard";
import { auth } from "@/auth";


export default async function NewShardPage({params}) {
const session = await auth();
   const roomId = params['shard-id'];
   console.log("Room id: ", roomId);
   connectToDB();
   const shardDetails = await Shard.findById(roomId);
   console.log("Shard details: ", shardDetails);
   console.log("shardId page: ", session);

let content = null;
if(shardDetails) {
    const {html, css, js, title, type, _id, mode} = shardDetails;

    content = {
       html,
       css,
       js,
       title,
       id: _id,
       mode,
       type
   }
}


    return <>
       {session && <ShardNavbar shardDetails={content} roomId={roomId}/>} 
       <ShardComponent shardDetails={content} roomId={roomId}/>
    </>
}   