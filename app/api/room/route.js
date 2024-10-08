import connectToDB from "@/lib/database";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export const revalidate = true;

const getSearchParams = (req) => {
  const { searchParams } = new URL(req.url);
  return searchParams;
};

export async function GET(req, res) {
  const searchParams = getSearchParams(req);
  try {
    connectToDB();
    const creator = searchParams.get("creator");

    if (!creator) {
      return NextResponse.json(
        { message: "creator not found" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ name: creator }).populate("shards");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const shards = user.shards;
    console.log(shards);

    const collaborativeShards = shards.filter(
      (shard) => shard.mode === "collaboration",
    );
    return NextResponse.json(collaborativeShards, { status: 200 });
  } catch (error) {
    console.log("Could not fetch rooms list", error.message);
    return NextResponse.json(
      { message: "Could not fetch rooms list" },
      { status: 500 },
    );
  }
}
