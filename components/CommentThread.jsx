"use client";
import React, { useState } from "react";
import CommentMsg from "./CommentMsg";
import { getThreadedComments } from "@/utils";

const CommentThread = ({ comments: initialComments }) => {
  const [comments, setComments] = useState(
    getThreadedComments(initialComments),
  );

  return (
    <div className="p-4">
      {comments.map((comment, index) => {
        return (
          <CommentMsg
            isReply={false}
            key={index}
            msg={comment.message}
            creator={comment.user}
            replies={comment.replies}
          />
        );
      })}
    </div>
  );
};

export default CommentThread;
