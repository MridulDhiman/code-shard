import connectToDB from "@/lib/database";
import { Shard } from "@/models/Shard";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { User } from "@/models/User";

// create new shard
export async function POST (req, res) {
try {
    connectToDB();
    const {roomId} = await req.json();
    console.log("Room ID: ", roomId)
    const newShard = await Shard.create({_id: roomId});
    console.log("New Shard: ", newShard);
    return NextResponse.json(newShard, {status: 201});

} catch (error) {
    console.log("Shard creation error: ", error.message);
    return NextResponse.json({message :"Shard creation error"}, {status: 500});
}
}

export const GET =  auth(async (req, res) => {
    try {
        connectToDB();
        const session = req.auth;
        console.log(session);
        const user = session?.user;
        console.log("User: ", user);
        if(!user) {
            return NextResponse.json({message: "Unauthenticated request"}, {status: 401});
        }


        const existingUser = await User.findOne({email: user.email});

        const shards = existingUser.shards;
        return NextResponse.json(shards, {status: 200});
    
    } catch (error) {
        return NextResponse.json({message :"Error in fetching shards"}, {status: 500});
    }
    });