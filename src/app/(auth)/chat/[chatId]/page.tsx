import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getFallbackName } from '@/lib/utils'
import { MoreVertical } from 'lucide-react'

import { ChatWidget } from '@/components/common/chat/widget'
import { getChat } from '@/actions/get-chat'

interface ChatPageProps {
  params: {
    chatId: string
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chat = await getChat(params.chatId)

  return (
    <div className="flex flex-1 flex-col p-2">
      <div className="flex items-center gap-2 border-b p-2">
        <Avatar>
          <AvatarFallback>{getFallbackName(chat.receiver.name)}</AvatarFallback>
          <AvatarImage src={chat.receiver.image} alt={chat.receiver.name} />
        </Avatar>
        <div className="flex w-full flex-col">
          <h2 className="">{chat.receiver.name}</h2>
          <p className="text-xs text-muted-foreground">{chat.receiver.email}</p>
        </div>
        <MoreVertical className="h-8 w-8 text-muted-foreground" />
      </div>

      <ChatWidget
        chatId={params.chatId}
        initialMessages={chat.messages}
        receiverId={chat.receiverId}
        senderId={chat.senderId}
      />
    </div>
  )
}
