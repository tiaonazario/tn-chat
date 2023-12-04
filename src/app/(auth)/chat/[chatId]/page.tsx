import { notFound } from 'next/navigation'

import { getSessionUser } from '@/lib/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getFallbackName } from '@/lib/utils'
import { MoreVertical } from 'lucide-react'

import { ChatWidget } from '@/components/common/chat/widget'

export default async function ChatPage() {
  const sessionUser = await getSessionUser()
  if (!sessionUser) notFound()

  return (
    <div className="flex flex-1 flex-col p-2">
      <div className="flex items-center gap-2 border-b p-2">
        <Avatar>
          <AvatarFallback>{getFallbackName(sessionUser.name)}</AvatarFallback>
          <AvatarImage src={sessionUser.image} alt={sessionUser.name} />
        </Avatar>
        <div className="flex w-full flex-col">
          <h2 className="">{sessionUser.name}</h2>
          <p className="text-xs text-muted-foreground">{sessionUser.email}</p>
        </div>
        <MoreVertical className="h-8 w-8 text-muted-foreground" />
      </div>

      <ChatWidget />
    </div>
  )
}
