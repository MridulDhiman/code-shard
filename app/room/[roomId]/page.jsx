import connectToDB from "@/lib/database";
import { Shard } from "@/models/Shard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CollaborativeSandpackEditor from "@/components/CollaborativeSandpackEditor";
import { templates } from "@/utils";

export default async function CollaborativeRoomPage({ params, searchParams }) {
  const session = await auth();
  const roomId = params["roomId"];
  console.log("Room id: ", roomId);
  const template = searchParams["template"];
  console.log("Template: ", template)
  connectToDB();
  let shardDetails = null;

  if (!session || !roomId) {
    console.log("session not present");
    redirect("/");
  }

  

  if (roomId === "new-room") {

    if(!template || !templates.includes(template)) {
      console.log("Template not valid");
      redirect("/");
    }
    shardDetails = await Shard.create({
      creator: session?.user?.name,
      type: "private",
      mode: "collaboration",
      isTemplate: true,
      templateType: template
    });
  }

  if (roomId !== "new-room") {
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

  const { title, creator, isTemplate, _id } = shardDetails;

  if (session) {
    if (roomId === "new-room" && session?.user?.name !== creator) {
      console.log("shard is private or collaborative");
      redirect("/");
    }
  }

  return (
    <>
      <CollaborativeSandpackEditor
        shardDetails={JSON.stringify(shardDetails)}
        template={isTemplate ? shardDetails.templateType : "react"}
        id={_id.toString() ?? null}
      />
    </>
  );
}
