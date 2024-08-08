import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import CommentMsg from "./CommentMsg";
import { Fragment, useState } from "react";
import { useActiveComment } from "@/context/CommentContext";
import { getThreadedComments } from "@/utils";

export function CommentsArea({ comments, isReplyArea = false }) {
  // const { comments } = useActiveComment();
  const messages = getThreadedComments(comments);
  console.log(comments);

  return (
    <ScrollArea className={"h-72 rounded-md border"}>
      <div className="p-4">
        {messages.map((message, index) => (
          <Fragment key={index}>
            <CommentMsg
              key={message._id}
              className="text-sm line-clamp-2 overflow-none"
              _id={message._id}
              isReply={isReplyArea}
              replies={message.replies}
              creator={message.user}
              msg={message.message}
            />
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
