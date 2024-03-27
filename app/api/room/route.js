
import connectToDB from "@/lib/database";
import { Shard } from "@/models/Shard";

import { NextResponse } from "next/server";

export async function GET (req,res) {
    try {
    connectToDB();
    const rooms = await Shard.find({mode: "collaboration"});
    return NextResponse.json(rooms, {status: 200});
        
    } catch (error) {
        console.log("Could not fetch rooms list", error.message);
        return NextResponse.json({message: "Could not fetch rooms list"}, {status: 500})
    }
}