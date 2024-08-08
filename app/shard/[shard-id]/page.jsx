import { Shard } from "@/models/Shard";
import ShardNavbar from "./ShardNavbar";
import connectToDB from "@/lib/database";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SandpackEditor from "@/components/SandpackEditor";

export default async function NewShardPage({ params }) {
  const session = await auth();
  const roomId = params["shard-id"];
  console.log("Room id: ", roomId);
  connectToDB();
  let shardDetails = null;

  if (!session) {
    console.log("session not present");
    redirect("/");
  }

  if (roomId === "new-shard") {
    shardDetails = await Shard.create({ creator: session?.user?.name });
  }

  if (roomId !== "new-shard") {
    const shards = await Shard.find({});
    const shardsById =
      shards.length > 0 ? shards.map((shard) => shard._id.toString()) : [];
    if (!shardsById.includes(roomId)) {
      console.log(shardsById);
      console.log("shardid not present", roomId);
      redirect("/");
    }
    shardDetails = await Shard.findOne({ _id: roomId });
    console.log("Shard details: ", shardDetails);
  }

  if (!shardDetails) {
    console.log("shard details not present");
    redirect("/");
  }

  const { html, css, js, title, type, creator, isTemplate, _id, mode } =
    shardDetails;

  let content = {
    html,
    css,
    js,
    title,
    id: _id.toString(),
    mode,
    type,
    creator,
  };

  if (session) {
    if (
      session?.user?.name !== creator &&
      (type === "private" || mode === "collaboration")
    ) {
      console.log("shard is private or collaborative");
      redirect("/");
    }
  }

  return (
    <>
      {isTemplate && (
        <SandpackEditor
          shardDetails={JSON.stringify(shardDetails)}
          template={shardDetails.templateType ?? "react"}
          shard={true}
          id={shardDetails?._id.toString() ?? null}
        />
      )}
    </>
  );
}
