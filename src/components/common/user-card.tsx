'use client'

import { Chat, User } from '@prisma/client'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ISessionUser } from '@/types/session-user'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/axios'

interface UserCardProps {
  sessionUser: ISessionUser
  user: User & { chatsAsReceiver: Chat[] }
}

export const UserCard = ({ sessionUser, user }: UserCardProps) => {
  const { push } = useRouter()

  const chat = user.chatsAsReceiver.find(
    (chat) => chat.receiverId === user.id && chat.senderId === sessionUser.id,
  )

  const handleOpenChat = async () => {
    if (chat) {
      push(`/chat/${chat.id}`)
    } else {
      await api
        .post<{ chatAsSender: Chat }>('/api/chat', {
          receiverId: user.id,
          senderId: sessionUser.id,
        })
        .then((response) => {
          push(`/chat/${response.data.chatAsSender.id}`)
        })
        .catch((error) => console.error(error))
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        className="rounded-xl object-cover"
        src={user.image}
        alt={user.name}
        width={144}
        height={192}
      />

      <div className="flex flex-col items-center">
        <h3>{user.name}</h3>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>

      <div className="flex">
        <Button className="rounded" onClick={handleOpenChat}>
          Message
        </Button>
      </div>
    </div>
  )
}
