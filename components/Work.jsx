import { auth } from "@/auth"
import connectToDB from "@/lib/database";
import { User } from "@/models/User";
import WorkCard from "./WorkCard";
import { redirect } from "next/navigation";
import { Fragment } from "react";



const fetchShards = async (email) => {
  const res = await fetch(`${process.env.HOST_URL}/api/shard?email=${email}`, {
    cache: "no-cache",
    next: {tags: ['shards']}
  });

  const shards = await res.json();

  return shards;
}

// server component
 async function Work ()  {
const session = await auth();
  // connectToDB();

  if(!session) {
    redirect("/login");
  }
// const existingUser = await User.findOne({email: session?.user.email}).populate('shards');



const shards = await fetchShards(session?.user.email);


// const shards =exreistingUser.shards;
console.log("Shards: ", shards);

const shardsCollection =  shards.length > 0 ? shards.map((shard, index) => {

  if(shard.mode === "collaboration") {
    return <Fragment key={index}></Fragment>
  }

return <WorkCard key={index} likes={shard.likes} mode={shard.mode} type={shard.type} html={shard.html} css={shard.css} js={shard.js} title={shard.title} id={shard._id.toString()}/>
}) : [];



  return (
    <div className="grid grid-cols-4 gap-2">
      { shards.length > 0 ? shardsCollection : <p className="text-white p-2">No Shards Yet...</p>}
    </div>
  )
}

export default Work