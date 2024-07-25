import { Separator } from "@radix-ui/react-separator";
import clsx from "clsx";
import React, { act, Fragment, useEffect, useState } from "react";
import Avatar from "react-avatar";
import Comment from "./ui/icons/Comment";
import Button from "./ui/Button";
import { useActiveComment } from "@/context/CommentContext";
import cn, { getThreadedComments } from "@/utils";

const CommentMsg = ({
  _id,
  msg,
  creator,
  replies: initialReplies,
  isReply = false,
}) => {
  const [areRepliesOpen, setAreRepliesOpen] = useState(false);
  const { parentComment, activeComment, setActiveComment, setCommentCreator } =
    useActiveComment();
  const [replies, setReplies] = useState(initialReplies);

  useEffect(() => {
    if (parentComment) {
      console.log("replies", parentComment.replies);
      if (activeComment === _id) {
        setReplies(parentComment?.replies?.filter((item, index, self) =>
          index === self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
        ));
      }
    }
  }, [parentComment]);

  const viewReplies = () => {
    setAreRepliesOpen((prev) => !prev);
    setActiveComment((prev) => {
      if (prev === null) {
        return _id;
      }

      if (prev === _id) {
        return null;
      }

      return _id;
    });

    setCommentCreator((prev) => {
      if (prev === null) {
        return creator;
      }

      if (prev === creator) {
        return null;
      }

      return creator;
    });
  };

  return (
    <div key={_id} className={clsx("text-black text-xs", isReply && "pl-8")}>
      <div className="flex gap-2">
        <Avatar
          className="text-sm"
          name={creator}
          textSizeRatio={2}
          size="30"
          round={true}
        />
        <div className="flex flex-col flex-1 mt-2 mb-2">
          <div>@{creator}</div>
          <div className="break-all">{msg}</div>
          {replies && replies.length > 0 && (
            <Button
              className={cn(
                " flex size-8 pt-3 items-center w-fit",
                activeComment === _id && "bg-gray-300",
              )}
              onClick={viewReplies}
              id="comments"
            >
              <Comment className={clsx("size-4 fill-black")} />{" "}
              <span className={clsx("text-black")}>{replies.length}</span>
            </Button>
          )}

          {replies && replies.length === 0 && (
            <Button
              className={cn(
                " flex size-8 pt-3 items-center w-fit",
                activeComment === _id && "bg-gray-300",
              )}
              onClick={viewReplies}
              id="comments"
            >
              <Comment className={clsx("size-4 fill-black")} />
            </Button>
          )}
        </div>
      </div>

      <div>
        {areRepliesOpen &&
          replies &&
          replies.length > 0 &&
          replies.map((reply, index) => {
            return (
              <Fragment key={reply._id}>
                <CommentMsg
                key={reply._id}
                  _id={reply._id}
                  isReply={true}
                  level={reply.level}
                  msg={reply.message}
                  creator={reply.user}
                  replies={reply.replies}
                />
                <Separator className="my-2" />
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default CommentMsg;
