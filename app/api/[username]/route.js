import connectToDB from "@/lib/database";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const username = params.username;

  if (!username) {
    return NextResponse.json(
      { message: "Username not found" },
      { status: 404 },
    );
  }

  try {
    connectToDB();
    const name = username.split("-").join(" ");
    const existingUser = await User.findOne({
      name: { $regex: new RegExp(name, "i") },
    }).populate("shards");

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Could not fetch user  details by username" },
      { status: 500 },
    );
  }
}
