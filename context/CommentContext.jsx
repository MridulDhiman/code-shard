"use client";

import { addCommentToShard } from "@/lib/actions";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const CommentContext = createContext(null);

export const useActiveComment = () => {
  const state = useContext(CommentContext);
  if (!state) {
    console.log("Could not find state");
  }
  return state;
};

export const CommentContextProvider = ({ children }) => {
  const [activeComment, setActiveComment] = useState(null);
  const [commentCreator, setCommentCreator] = useState(null);
  const [comments, setComments] = useState([]);
  const [parentComment, setParentComment] = useState(null);
  const [shardId, setShardId] = useState(null);

  console.log("Active Comment: ", activeComment);

  const createNewComment = async (message, creator, shardId) => {
    try {
      toast.promise(
        addCommentToShard(message, shardId, creator, activeComment),
        {
          loading: "Adding New Comment...",
          success: (data) => {
            const parent = data.parentId;

            if (!parent) {
              setComments((prev) => [
                {
                  ...data,
                  replies: [],
                },
                ...prev,
              ]);
            } else {
              setComments((prev) => {
                const parentInd = prev.findIndex(
                  (comment) => comment?._id === parent,
                );
                if (parentInd === -1) {
                  return prev;
                }

                if (!prev[parentInd].replies) {
                  prev[parentInd].replies = [];
                }

                 if(!prev[parentInd].replies.includes(data)) {
                   prev[parentInd].replies.push({
                     ...data,
                     replies: [],
                   });
                 }

                setParentComment(prev[parentInd]);
                return prev;
              });
            }

            return "Shard saved successfully";
          },
          error: "Could not add new comment",
        },
      );
    } catch (error) {
      console.log("new comment error: ", error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        parentComment,
        shardId,
        setShardId,
        createNewComment,
        comments,
        setComments,
        commentCreator,
        setCommentCreator,
        activeComment,
        setActiveComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
