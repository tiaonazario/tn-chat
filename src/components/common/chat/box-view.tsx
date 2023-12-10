'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { dateFormatter, getFallbackName, truncateWord } from '@/lib/utils'
import { Message } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface ChatBoxViewProps {
  chatId: string
  message: Message | null
  unreadMessage: number
  senderId: string
  user: {
    id: string
    name: string
    image: string
  }
}

export const ChatBoxView = ({
  chatId,
  message,
  unreadMessage,
  user,
}: ChatBoxViewProps) => {
  const { push } = useRouter()
  const [readMessage, setReadMessage] = useState(false)
  const pathname = usePathname()
  const destinationUrl = `/chat/${chatId}`

  const handleOpenChat = () => {
    setReadMessage(true)
    push(destinationUrl)
  }

  return (
    <button
      data-active={pathname === destinationUrl}
      className="flex w-full gap-1 rounded px-2 py-1 transition-colors
                hover:bg-accent/20 data-[active=true]:bg-accent"
      onClick={handleOpenChat}
    >
      <Avatar>
        <AvatarImage src={user.image} alt={user.name} />
        <AvatarFallback>{getFallbackName(user.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col items-start">
        <span className="text-sm">{user.name}</span>
        <p className="text-xs text-muted-foreground">
          {message ? truncateWord(message.content) : 'no messages'}
        </p>
      </div>
      <div className="flex flex-col justify-end text-xs">
        {message && (
          <span className="text-right text-muted-foreground">
            {dateFormatter(message.timestamp, {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </span>
        )}
        {unreadMessage > 0 && !readMessage && (
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-center text-primary">
              {unreadMessage} unread
            </span>
          </div>
        )}
      </div>
    </button>
  )
}
