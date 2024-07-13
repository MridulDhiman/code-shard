"use client";
import React, { useEffect, useState } from 'react'
import CommentMsg from './CommentMsg';

const getThreadedComments = (comments) => {
// Process comments to create the thread structure
let commentMap = new Map(comments.map(comment => [comment._id, { ...comment, replies: [] }]));
for (let comment of commentMap.values()) {
  if (comment.parentId !== null) {
    let parentComment = commentMap.get(comment.parentId);
    if (parentComment) {
      parentComment.replies.push(comment);
    }
  }
}

// Filter out replies to get top-level comments
let threadedComments = Array.from(commentMap.values()).filter(comment => comment.parentId === null);
return threadedComments;
}

const CommentThread = ({comments: initialComments}) => {
  const [comments, setComments] = useState(getThreadedComments(initialComments));



  
  return (
   <div className='p-4'>
   {
    comments.map((comment, index) => {
     return <CommentMsg isReply={false} key={index} msg={comment.message} creator={comment.user} replies={comment.replies}/>
    })
   }

   {/* {
    JSON.stringify(threadedComments)
   } */}
   </div>
  )
}

export default CommentThread;