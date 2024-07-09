import { auth } from "@/auth"
import connectToDB from "@/lib/database";
import { User } from "@/models/User";
import WorkCard from "./WorkCard";
import { redirect } from "next/navigation";
import { Fragment } from "react";
import { makeFilesAndDependenciesUIStateLike } from "@/utils";



const fetchShards = async (email) => {
  const res = await fetch(`${process.env.HOST_URL}/api/shard?email=${email}`, {
    cache: "no-store",
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
connectToDB();
const user = await User.findOne({email: session?.user.email});

if(!user) {
  redirect("/login");
}
// const shards =exreistingUser.shards;
// console.log("Shards: ", shards);
      
const shardsCollection =  shards.length > 0 ? shards.map((shard, index) => {

  if(shard.mode === "collaboration") {
    return <Fragment key={index}></Fragment>
  }

  const [files, dependencies, devDependencies] = (shard.isTemplate) ? makeFilesAndDependenciesUIStateLike(shard.files, shard.dependencies) : [null, null, null];
console.log(shard.likedBy, ": liked by user ids");
const likeStatus = shard.likedBy?.includes(user._id.toString()) ? "liked" : "unliked";
console.log(likeStatus);
return <WorkCard key={shard._id.toString()}  likeStatus={likeStatus} likes={shard.likedBy?.length ?? 0} isTemplate={shard.isTemplate} content={!shard.isTemplate ? {
  html: shard.html,
  css: shard.css,
  js: shard.js,
} : {
  templateType: shard.templateType,
  files,
  dependencies,
  devDependencies
}} mode={shard.mode} type={shard.type} title={shard.title} id={shard._id.toString()}/>
}) : [];



  return (
    <div className="grid grid-cols-4 gap-2">
      { shards.length > 0 ? shardsCollection : <p className="text-white p-2">No Shards Yet...</p>}
    </div>
  )
}

export default Work