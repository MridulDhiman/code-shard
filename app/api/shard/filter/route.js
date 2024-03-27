// /shard/all

import connectToDB from "@/lib/database";
import { Shard } from "@/models/Shard";
import { NextResponse } from "next/server";


// GET /shard/filter


export async function GET (req,res) {

    
    try {
        connectToDB();
        const {query} = await req.json();

        if(!query) {
            return NextResponse.json({message: "Query not found"}, {status: 404});
        }

        const shards = await Shard.find({$or: [ 
            {title: {$regex: new RegExp(query, "i")}},
            {html: {$regex: new RegExp(query, "i")}},
            {css: {$regex: new RegExp(query, "i")}},
            {js: {$regex: new RegExp(query, "i")}}
        ]});
    
    return NextResponse.json(shards, {status: 200});
    } catch (error) {
        console.log("error in filtering shards: ", error.message);
       return NextResponse.json({message: "Could not filter shards"}, {status: 500});
    }
}

/*



*/