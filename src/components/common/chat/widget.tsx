'use client'

import { SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { ChatMessage } from '@/components/common/chat/message'
import { TMessageAuthor, TMessageStatus } from '@/types/message'
import { ScrollArea } from '@/components/ui/scroll-area'

// interface ChatWidgetProps {

// }

interface IMessage {
  id: string
  author: TMessageAuthor
  content: string
  status: TMessageStatus
  timestamp: Date
}

export const ChatWidget = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 'message-01',
      author: 'me',
      content: 'Hello, how are you?',
      status: 'sent',
      timestamp: new Date(),
    },
    {
      id: 'message-02',
      author: 'partner',
      content: 'https://avatars.githubusercontent.com/u/8683378?v=4',
      status: 'sent',
      timestamp: new Date(),
    },
  ])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [message, textareaRef])

  const handleSubmitNewMessage = async () => {
    // Your code here
  }

  const handleOnSubmit = async () => {
    if (message.trim() !== '') {
      const newMessage: IMessage = {
        id: `message-${messages.length}`,
        author: 'me',
        content: message,
        status: 'error',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      setMessage('')
      handleSubmitNewMessage()
    }
  }

  const handleTextKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code.toLocaleLowerCase() === 'enter' && !event.shiftKey) {
      event.preventDefault()
      handleOnSubmit()
    }
  }

  return (
    <div className="flex max-h-[550px] flex-1 flex-col">
      <ScrollArea className="flex-1 p-2">
        <div className="flex flex-1 flex-col gap-2 p-2">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              author={message.author}
              content={message.content}
              status={message.status}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </ScrollArea>
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          onKeyUp={handleTextKeyUp}
          placeholder="Type a message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="flex max-h-40 min-h-[2.5rem] w-full resize-none rounded border
            border-input bg-transparent py-2 pl-3 pr-10 text-sm shadow-sm
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
    </div>
  )
}
