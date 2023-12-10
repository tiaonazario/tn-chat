'use client'

import { SendHorizontal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { api } from '@/lib/axios'

import { ChatMessage } from '@/components/common/chat/message'
import { TMessageStatus, IMessageWithAuthor } from '@/types/message'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dateFormatter } from '@/lib/utils'
import { TSchemaMessagePost } from '@/schemas/message'
import { useHandleState } from '@/hooks/handle-state'

interface ChatWidgetProps {
  chatId: string
  initialMessages: IMessageWithAuthor[]
  receiverId: string
  senderId: string
}

export const ChatWidget = ({
  chatId,
  initialMessages,
  receiverId,
  senderId,
}: ChatWidgetProps) => {
  const [content, setContent] = useState('')
  const [messages, setMessages] =
    useState<IMessageWithAuthor[]>(initialMessages)
  const [unreadMessages, setUnreadMessages] =
    useState<IMessageWithAuthor[]>(initialMessages)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { replaceState } = useHandleState<IMessageWithAuthor>()

  const groupMessagesByDay = () => {
    const groupedMessages: { [key: string]: IMessageWithAuthor[] } = {}

    messages.forEach((message) => {
      const dateString = dateFormatter(message.timestamp)

      if (!groupedMessages[dateString]) {
        groupedMessages[dateString] = []
      }

      groupedMessages[dateString].push(message)
    })

    return groupedMessages
  }

  const groupedMessages = groupMessagesByDay()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [content, textareaRef])

  useEffect(() => {
    const handleCheckSeen = async () => {
      await api
        .put('/api/message', { chatId, seenIds: [receiverId, senderId] })
        .catch((error) => {
          console.error(error)
        })
    }

    if (unreadMessages.length > 0) {
      handleCheckSeen()
    }
  }, [chatId, receiverId, senderId, unreadMessages.length])

  const checkSeen = (message: IMessageWithAuthor): TMessageStatus => {
    if (!message.status) {
      const seen =
        message.author === 'sender'
          ? message.seenIds.includes(message.receiverId)
          : message.seenIds.includes(message.senderId)

      if (!seen && message.author === 'receiver') {
        setUnreadMessages((prev) => [...prev, message])
      }

      return seen ? 'seen' : 'sent'
    }

    return message.status
  }

  const handleSubmitNewMessage = async (message: IMessageWithAuthor) => {
    const body: TSchemaMessagePost = {
      content: message.content,
      receiverId: message.receiverId,
      senderId: message.senderId,
      chatAsSenderId: message.chatAsSenderId,
      seenIds: message.seenIds,
    }

    await api
      .post('/api/message', body)
      .then(() => {
        setMessages(
          replaceState({ ...message, status: 'sent' }, [...messages, message]),
        )
      })
      .catch((error) => {
        setMessages(replaceState({ ...message, status: 'error' }, messages))
        console.error(error)
      })
  }

  const handleOnSubmit = async () => {
    if (content.trim() !== '') {
      const message: IMessageWithAuthor = {
        id: uuidV4(),
        content,
        timestamp: new Date(),
        seenIds: [senderId],
        author: 'sender',
        status: 'sending',
        senderId,
        chatAsReceiverId: uuidV4(),
        chatAsSenderId: chatId,
        receiverId,
      }

      setMessages([...messages, message])
      setContent('')
      await handleSubmitNewMessage(message)
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
          {Object.keys(groupedMessages).map((day) => (
            <div className="flex w-full flex-col gap-2" key={day}>
              <h3 className="my-2 max-w-max self-center border p-1 text-center">
                {day}
              </h3>
              {groupedMessages[day].map((message) => (
                <ChatMessage
                  key={message.id}
                  author={message.author}
                  content={message.content}
                  status={checkSeen(message)}
                  timestamp={message.timestamp}
                />
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="relative w-full">
        <textarea
          ref={textareaRef}
          onKeyUp={handleTextKeyUp}
          placeholder="Type a message"
          value={content}
          onChange={(event) => setContent(event.target.value)}
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
          disabled={content.trim() === ''}
        >
          <SendHorizontal className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
