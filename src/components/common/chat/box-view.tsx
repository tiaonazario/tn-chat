'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { dateFormatter, getFallbackName, truncateWord } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

interface ChatBoxViewProps {
  message: {
    id: string
    last: string
    time: Date
    unread: number
  }
  sentId: string
  user: {
    name: string
    image: string
  }
}

export const ChatBoxView = (props: ChatBoxViewProps) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const destinationUrl = `/chat/${props.message.id}`
  const handleOpenChat = () => {
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
        <AvatarImage src={props.user.image} alt={props.user.name} />
        <AvatarFallback>{getFallbackName(props.user.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col items-start">
        <span className="text-sm">{props.user.name}</span>
        <p className="text-xs text-muted-foreground">
          {truncateWord(props.message.last)}
        </p>
      </div>
      <div className="flex flex-col justify-end text-xs">
        <span className="text-right text-muted-foreground">
          {dateFormatter(props.message.time, {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-center text-primary">
            {props.message.unread} unread
          </span>
        </div>
      </div>
    </button>
  )
}
