"use server";

import { signOut } from "@/auth";
import { Shard } from "@/models/Shard";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import connectToDB from "./database";
import { User } from "@/models/User";
// import { FOLLOWED, NOT_FOLLOWED } from "@/utils";



export const signOutHandler =  async () => {
    await signOut();
    router.replace("/login");
  }

 export const handleRouteShift = () => {
           revalidateTag("shards");
           redirect("/your-work");
  }

  export const handleRoomRouteShift = () => {
    revalidateTag("rooms");
    redirect("/rooms-list");
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
  } catch (error) {
    console.log("Could not perform the action");
    console.log(error.message);
  }
  
}

export const saveTemplateToDB = async (id, files, dependencies, devDependencies, userName) => {
  
 const fileContent =  Object.entries(files).map(([fileName,fileConfig]) => {
        return {
          name: fileName,
          ...fileConfig
        }
  });


  const nonDevDepContent = Object.entries(dependencies).map(([depName, version]) => {
    return {
      name: depName,
      version,
      isDevDependency: false
    }
  });
 const devDepContent =  Object.entries(devDependencies).map(([depName, version]) => {
    return {
      name: depName,
      version,
      isDevDependency: true
    }
  });


  const dependencyContent = [
    ...nonDevDepContent,
    ...devDepContent
  ]
    try {

      console.log(files, dependencies);
      const updatedDoc = await Shard.findOneAndUpdate(
          {_id: id, isTemplate: true},
          { $set: { files: fileContent, dependencies: dependencyContent } },
          { new: true }
      );
      if (!updatedDoc) {
          return {status: 404, message: "Template not found"};
      } else {
        console.log(updatedDoc);

       const user =  await User.findOne({name: userName});
       if(!user) {
        return {status: 404, message: "User not found"};
       }
       console.log(user);

       if(!user.shards.includes(id)) {
         user.shards.push(id);
       }
          await user.save();
          revalidateTag(`${userName.toLowerCase().split(" ").join("-")}`);
          return {status: 200};
      }

     } catch (error) {
       console.log("Could not update template: ", id,  error);
       return ({status: 500});
     }
  

}
