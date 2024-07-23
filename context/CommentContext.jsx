"use client";

import { addCommentToShard } from "@/lib/actions";
import { createContext, useContext, useState } from "react";
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
  const [shardId, setShardId] = useState(null);
  
  if(comments.length > 0) {
    console.log("Comments", comments);
  }

  const createNewComment = async (message, creator, shardId) => {
    try {
      toast.promise(
        addCommentToShard(message, shardId, creator, activeComment),
        {
          loading: "Adding New Comment...",
          success: (data) => {
            console.log("Created new comment: ", data);
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
                
                if(!prev[parentInd].replies) {
                  prev[parentInd].replies = [];
                }
                
                prev[parentInd].replies.push({
                  ...data,
                  replies: [],
                });
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
