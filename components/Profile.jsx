"use client";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import ProfileIcon from "./ui/icons/Profile";
import { useSession } from "next-auth/react";
import { handleFollowersOfUser } from "@/lib/actions";
import { useOptimistic } from "react";
import ProfileCard from "./ProfileCard";

const Profile = ({
  shards,
  name: initialName,
  followers: initialFollowers,
  followersCount: initialFollowerCount,
  following: initialFollowing,
}) => {
  const { data: session } = useSession();
  const [name, setName] = useState(initialName);
  const [followers, setFollowers] = useState(initialFollowerCount);
  const [optimisticFollowers, setOptimisticFollowers] =
    useOptimistic(followers);
  const [following, setFollowing] = useState(initialFollowing);
  let [hasFollowed, setHasFollowed] = useState(false);
  let [optimisticHasFollowed, setOptimisticHasFollowed] =
    useOptimistic(hasFollowed);

  useEffect(() => {
    if (!session) {
      return;
    }
    setHasFollowed(initialFollowers.includes(session?.user?.name));
  }, [session, initialFollowers]);

  useEffect(() => {
    setFollowers(initialFollowerCount);
    setFollowing(initialFollowing);
  }, [initialFollowerCount, initialFollowing]);

  const handleFollowersAction = async () => {
    setOptimisticHasFollowed((prev) => !prev);
    if (optimisticHasFollowed) {
      setOptimisticFollowers((prev) => prev - 1);
    }

    if (!optimisticHasFollowed) {
      setOptimisticFollowers((prev) => prev + 1);
    }

    await handleFollowersOfUser(
      name,
      session?.user?.name,
      optimisticHasFollowed
    );
  };

  return (
    <>
      <div className="text-white flex items-center gap-4 p-4">
        <Avatar name={name} round={true} size="100" />
        <div className="flex flex-col justify-center gap-1">
          <span>{name}</span>
          {session && session?.user?.name !== name && (
            <form action={handleFollowersAction}>
              <button
                type="submit"
                className=" bg-white text-black  w-full cursor-pointer rounded-md text-center hover:bg-white/60"
              >
                {optimisticHasFollowed ? "Unfollow" : "Follow"}{" "}
              </button>
            </form>
          )}
          <p className="flex gap-2 items-center">
            <ProfileIcon fill={"white"} className="size-4" />
            <span>{optimisticFollowers} </span> Follower |{" "}
            <span>{following}</span> Following{" "}
          </p>
        </div>
        <div></div>
      </div>

      <div className="grid grid-cols-4">
        {shards.length === 0 && <>No Shards</>}
        {shards.length > 0 && shards.map((shard, index) => <ProfileCard title={shard.title} creator={shard.creator} key={index} html={shard.html} css={shard.css} js={shard.js} id={shard._id.toString()}/>)}
      </div>
    </>
  );
};

export default Profile;
