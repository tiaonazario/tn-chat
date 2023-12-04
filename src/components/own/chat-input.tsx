'use client'

import { Image as ImageIcon, SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// interface ChatInputProps {

// }

export const ChatInput = () => {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [message, textareaRef])

  const handleOnSubmit = () => {
    if (message.trim() !== '') {
      alert(message)
      setMessage('')
    }
  }

  const handleTextKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code.toLocaleLowerCase() === 'enter' && !event.shiftKey) {
      event.preventDefault()
      handleOnSubmit()
    }
  }

  return (
    <div className="relative w-full">
      <button
        className="absolute bottom-2 left-2 p-0 text-muted-foreground transition-colors
          hover:bg-transparent hover:text-primary
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
          disabled:pointer-events-none disabled:opacity-50"
      >
        <ImageIcon className="h-6 w-6" />
      </button>

      <textarea
        ref={textareaRef}
        onKeyUp={handleTextKeyUp}
        placeholder="Type a message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        className="flex max-h-40 min-h-[2.5rem] w-full resize-none rounded border
                    border-input bg-transparent px-10 py-2 text-sm shadow-sm
                    placeholder:text-muted-foreground focus-visible:outline-none
                    focus-visible:ring-1 focus-visible:ring-ring
                    disabled:cursor-not-allowed disabled:opacity-50"
      />

      <button
        className="absolute bottom-2 right-3 p-0 text-muted-foreground transition-colors
        hover:bg-transparent hover:text-primary
        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
        disabled:pointer-events-none disabled:opacity-50"
        onClick={handleOnSubmit}
        disabled={message.trim() === ''}
      >
        <SendHorizontal className="h-6 w-6" />
      </button>
    </div>
  )
}
