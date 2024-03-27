import connectToDB from "@/lib/database";
import { Shard } from "@/models/Shard";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { User } from "@/models/User";
import {  revalidateTag } from "next/cache";

// create new shard
export async function POST (req, res) {
try {
    connectToDB();
    const {roomId, mode} = await req.json();
    console.log("Room ID: ", roomId)
    const newShard = await Shard.create({_id: roomId, mode});
    console.log("New Shard: ", newShard);
    revalidateTag('rooms');
    return NextResponse.json(newShard, {status: 201});



} catch (error) {
    console.log("Shard creation error: ", error.message);
    return NextResponse.json({message :"Shard creation error"}, {status: 500});
}
}

export const GET =  async (req, res) => {
    try {
        connectToDB();
       const {searchParams} = new URL(req.url);

 const email  = searchParams.get('email');

 if(!email) {
    return NextResponse.json({message: "Email Not found"}, {status: 404});
 }
        const existingUser = await User.findOne({email}).populate('shards');
        const shards = existingUser.shards;
        return NextResponse.json(shards, {status: 200});
    
    } catch (error) {
        return NextResponse.json({message :"Error in fetching shards"}, {status: 500});
    }
    };