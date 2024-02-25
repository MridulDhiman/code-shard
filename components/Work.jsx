import { auth } from "@/auth"
import connectToDB from "@/lib/database";
import { User } from "@/models/User";
import WorkCard from "./WorkCard";
import {cache} from "react";



// server component
const Work = async () => {
const {user} = await auth();
  connectToDB();
const existingUser = await User.findOne({email: user.email}).populate('shards');
const shards =existingUser.shards;
console.log("Shards: ", shards);

const shardsCollection = shards.map((shard, index) => {
return <WorkCard key={index} mode={shard.mode} type={shard.type} html={shard.html} css={shard.css} js={shard.js} title={shard.title} id={shard._id}/>
});



  return (
    <div className="grid grid-cols-4 gap-2">
      { shards ? shardsCollection : <p className="text-white">"No Shards Yet..."</p>}
    </div>
  )
}

export default Work