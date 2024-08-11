import connectToDB from "@/lib/database";
import { NextResponse } from "next/server";
import { User } from "@/models/User";

const getSearchParams = (req) => {
  const { searchParams } = new URL(req.url);
  return searchParams;
};

export const GET = async (req) => {
  const searchParams = getSearchParams(req);

  try {
    connectToDB();
    const email = searchParams.get("email");
    console.log(email);

    if (!email) {
      return NextResponse.json({ message: "Email Not found" }, { status: 404 });
    }

    const existingUser = await User.findOne({ email }).populate("shards");
    const shards = existingUser.shards;
    return NextResponse.json(shards, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error in fetching shards" },
      { status: 500 },
    );
  }
};
