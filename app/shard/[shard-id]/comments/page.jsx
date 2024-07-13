import { getCommentsOfShard } from '@/lib/actions';
import connectToDB from '@/lib/database';
import { Shard } from '@/models/Shard';
import { redirect } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner';

const commentsPage = async ({params}) => {
  const id = params.id;

  if(!id) {
    toast.error("could not find id")
    redirect("/");
  }
connectToDB()

  const shard = await Shard.findById(id);
  if(!shard) {
    toast.error("Could not find shard")
    redirect("/")
  }

  const threadId = shard.commentThread;
  const comments = await getCommentsOfShard(threadId);
 
  return (
    <div>{JSON.stringify(comments)}</div>
  )
}

export default commentsPage