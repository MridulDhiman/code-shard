import connectToDB from "@/lib/database";
import { getShardBySearchQuery } from "@/models/Shard";
import { NextResponse } from "next/server";

export const GET =  async (req, res) => {
    const {searchQuery} = req.query;

    if(!searchQuery) {
        return NextResponse.json({message: "Search Query not found"}, {status: 404});
    }
    try {
        const shards = await getShardBySearchQuery(searchQuery);
        return NextResponse.json(shards, {status: 200});
    
    } catch (error) {
        return NextResponse.json({message :"Error in fetching shards"}, {status: 500});
    }
    }