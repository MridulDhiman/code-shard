"use server";

import { signOut } from "@/auth";
import { Shard } from "@/models/Shard";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import connectToDB from "./database";
import { User } from "@/models/User";
import { FOLLOWED, NOT_FOLLOWED } from "@/utils";



export const signOutHandler =  async () => {
    await signOut();
    router.replace("/login");
  }

 export const handleRouteShift = () => {
           revalidateTag("shards");
           redirect("/your-work");
  }

  export const updateRoomsList = () =>{
revalidateTag('rooms');
  }

export const incLikes = async (id) => {
  connectToDB();
const existingShard = await Shard.findById(id);
existingShard.likes++;
await existingShard.save();

console.log("likes incremented successfully");
}


export const handleFollowersOfUser = async (mainUser, guestUser, hasFollowed) => {


  try {
    connectToDB();
const mainUserDetails = await User.findOne({name: mainUser});
const guestUserDetails = await User.findOne({name: guestUser})

if(!mainUserDetails || !guestUserDetails) {
  throw new Error("Main user or guest user not found");
}


if(!hasFollowed) {
  mainUserDetails.followers.push(guestUser);
  guestUserDetails.following.push(mainUser);
}


if(hasFollowed) {
  if(mainUserDetails.followers.length > 0) mainUserDetails.followers.pull(guestUser);
  if(guestUserDetails.following.length > 0) guestUserDetails.following.pull(mainUser);
}

await Promise.all([
  mainUserDetails.save(),
  guestUserDetails.save()
]);


revalidateTag(`${mainUser.toLowerCase().split(" ").join("-")}`);
// revalidateTag(`${guestUser.toLowerCase().split(" ").join("-")}`);



  } catch (error) {
    console.log("Could not perform the action");
    console.log(error.message);
  }
  

}