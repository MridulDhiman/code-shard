import React, { useState, useRef, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import Button from '@/components/ui/Button'

const CommentTextBox = ({ onSubmit }) => {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    adjustTextareaHeight()
  }, [input])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input)
      setInput('')
    }
}

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-white mb-4">
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={input.length >= 1000}
        placeholder="Add New Comment..."
        className="min-h-[60px] max-h-[200px] p-2 text-base border-0 focus-visible:ring-0 resize-none overflow-hidden"
        
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">
          {input.length} / 1000
        </span>
        <Button 
          onClick={handleSubmit}
          disabled={input.trim() === ""}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white"
        >
          Send
        </Button>
      </div>
    </div>
  )
}

export default CommentTextBox;