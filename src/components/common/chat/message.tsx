'use client'

import { cn, dateFormatter } from '@/lib/utils'
import { TMessageAuthor, TMessageStatus } from '@/types/message'
import { AlertCircle, Check, CheckCheck, Clock3 } from 'lucide-react'

interface ChatMessageProps {
  author: TMessageAuthor
  content: string
  status: TMessageStatus
  timestamp: Date
}

export const ChatMessage = ({
  author,
  content,
  status,
  timestamp,
}: ChatMessageProps) => {
  const renderContent = () => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const contentWithLinks = content.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            className="hover:underline"
            href={part}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        )
      } else {
        return part
      }
    })
    return contentWithLinks
  }

  const Icon =
    status === 'sending'
      ? AlertCircle
      : status === 'seen'
        ? CheckCheck
        : status === 'sent'
          ? Check
          : Clock3

  return (
    <div
      className={cn(
        'flex',
        author === 'sender' && 'justify-end',
        author === 'receiver' && 'justify-start',
      )}
    >
      <div className={cn('flex max-w-[80%] flex-col items-end gap-0.5')}>
        <p
          className={cn(
            'w-full whitespace-pre-line rounded p-1.5',
            author === 'sender' && 'bg-primary/50 text-primary-foreground',
            author === 'receiver' && 'bg-secondary text-secondary-foreground',
          )}
        >
          {renderContent()}
        </p>

        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">
            {dateFormatter(timestamp, {
              hour: 'numeric',
              minute: 'numeric',
            })}
          </span>
          <Icon
            className={cn(
              'h-3 w-3 text-muted-foreground',
              status === 'error' && 'text-destructive',
            )}
          />
        </div>
      </div>
    </div>
  )
}
