import connectToDB from "@/lib/database";
import { NextResponse } from "next/server";
import { User } from "@/models/User";

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