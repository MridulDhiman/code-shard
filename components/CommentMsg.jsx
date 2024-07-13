import React from 'react'
import Avatar from 'react-avatar'

const CommentMsg = ({msg, creator}) => {
   
    
    return (
    <div className='text-black text-xs flex gap-2 h-auto'> 
    <Avatar className='text-sm' name='mridul dhiman' textSizeRatio={2} size='30' round={true} />
    <div className='flex flex-col flex-1'>
        <div>@mridul dhiman</div> 
        <div className='break-all'>{msg}</div>
    </div>
    </div>
  )
}

export default CommentMsg