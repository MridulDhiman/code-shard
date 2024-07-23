import CommentThread from "@/components/CommentThread";
import { getCommentsOfShard } from "@/lib/actions";
import connectToDB from "@/lib/database";
import { Shard } from "@/models/Shard";
import { redirect } from "next/navigation";
import React from "react";
// import { toast } from 'sonner';

const commentsPage = async ({ params }) => {
  const id = params["shard-id"];
  console.log(id);

  if (!id) {
    // toast.error("could not find id")
    redirect("/");
  }
  connectToDB();

  const shard = await Shard.findById(id);
  if (!shard) {
    // toast.error("Could not find shard")
    console.log(shard);
    redirect("/");
  }

  const threadId = shard.commentThread;
  // const comments = await getCommentsOfShard(threadId);
  let comments = [
    {
      _id: 1,
      user: "mridul",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad suscipit ratione in quidem odit nam fugit, minima adipisci facere magni reiciendis amet, illum, sit illo accusantium sunt deserunt rerum aliquam enim voluptas.",
      parentId: null,
    },
    {
      _id: 5,
      user: "mridul",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad suscipit ratione in quidem odit nam fugit, minima adipisci facere magni reiciendis amet, illum, sit illo accusantium sunt deserunt rerum aliquam enim voluptas.",
      parentId: null,
    },
    {
      _id: 2,
      user: "chakshu dhiman",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad suscipit ratione in quidem odit nam fugit, minima adipisci facere magni reiciendis amet, illum, sit illo accusantium sunt deserunt rerum aliquam enim voluptas.",
      parentId: 1,
    },
    {
      _id: 3,
      user: "mridul",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad suscipit ratione in quidem odit nam fugit, minima adipisci facere magni reiciendis amet, illum, sit illo accusantium sunt deserunt rerum aliquam enim voluptas.",
      parentId: null,
    },
    {
      _id: 4,
      user: "mridul",
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad suscipit ratione in quidem odit nam fugit, minima adipisci facere magni reiciendis amet, illum, sit illo accusantium sunt deserunt rerum aliquam enim voluptas.",
      parentId: 2,
    },
  ];

  return (
    <div>
      <CommentThread comments={comments} />
    </div>
  );
};

export default commentsPage;
