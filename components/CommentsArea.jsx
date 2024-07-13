
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import CommentMsg from "./CommentMsg"
import { Fragment } from "react"





export function CommentsArea({messages}) {
  return (
    <ScrollArea className="h-72 rounded-md border">
      <div className="p-4">
        {messages.map((message, index) => (
          <Fragment key={index}>
            <CommentMsg  className="text-sm"  msg={message.toString()}/> 
            <Separator className="my-2" />
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}
