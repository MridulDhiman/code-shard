import { redirect } from "next/navigation";
import Profile from "@/components/Profile";
import Navbar from "../Navbar";

export const fetchUserDetails = async (username) => {
  const response = await fetch(`${process.env.HOST_URL}/api/${username}`, {
    cache: "no-cache",
    next: {
      tags: [`${username}`],
    },
  });

  if (!response.ok) {
    const errorObj = await response.json();
    console.log("error message: ", errorObj.message);
    return null;
  }

  const data = await response.json();
  return data;
};

export default async function UserProfile({ params }) {
  const username = params.username;
  const userDetails = await fetchUserDetails(username);

  if (!userDetails) {
    redirect("/");
  }

  let shards = userDetails.shards.filter(
    (shard) => shard.mode === "normal" && shard.type === "public",
  );

  return (
    <>
      <Navbar />
      <Profile
        shards={shards}
        followers={userDetails?.followers}
        followersCount={userDetails?.followers?.length}
        following={userDetails?.following?.length}
        name={userDetails?.name}
      />
    </>
  );
}
