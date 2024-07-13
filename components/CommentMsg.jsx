import clsx from 'clsx'
import React, { useState } from 'react'
import Avatar from 'react-avatar'

const CommentMsg = ({msg, creator, replies, isReply=false}) => {
  const [areRepliesOpen, setAreRepliesOpen] = useState(false);

const viewReplies = () => {
  setAreRepliesOpen((prev) => !prev);
}

    return (
    <div className={clsx(
      'text-black text-xs',
      isReply && "pl-8"
      )}> 
      <div className='flex gap-2'>
    <Avatar className='text-sm' name={creator} textSizeRatio={2} size='30' round={true} />
    <div className='flex flex-col flex-1 mt-2 mb-4'>
        <div>@{creator}</div> 
         <div className='break-all'>{msg}</div>
      
       {replies && replies.length > 0 &&  <button className='self-start hover:underline flex gap-2 justify-center text-blue-600' onClick={viewReplies}>{
        !areRepliesOpen ? "View Replies" : "Hide Replies"
}</button>}
      
    </div>
      </div>
      
    <div>
     {
     areRepliesOpen && replies && replies.length > 0 &&  replies.map((reply, index) => {
        return <CommentMsg isReply={true} level={reply.level} key={reply._id} msg={reply.message} creator={reply.user} replies={reply.replies}/>
      })
     }
    </div>
    </div>
  )
}

export default CommentMsg