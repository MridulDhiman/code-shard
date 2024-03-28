
import connectToDB from "@/lib/database";
import { Shard } from "@/models/Shard";

import { NextResponse } from "next/server";


export const revalidate = true; 

export async function GET (req,res) {

    
    try {
    connectToDB();
    const {searchParams} = new URL(req.url);
    const creator = searchParams.get('creator');

    if(!creator) {
        return NextResponse.json({message: "creator not found"}, {status: 400});
    }


    const rooms = await Shard.find({mode: "collaboration", creator});
    return NextResponse.json(rooms, {status: 200});
        
    } catch (error) {
        console.log("Could not fetch rooms list", error.message);
        return NextResponse.json({message: "Could not fetch rooms list"}, {status: 500})
    }
}