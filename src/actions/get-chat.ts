import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { IMessageWithAuthor } from '@/types/message'
import { Message } from '@prisma/client'
import { notFound } from 'next/navigation'

export const mergeMessages = (
  messagesAsReceiver: Message[],
  messagesAsSender: Message[],
) => {
  const messagesReceiverWithAuthor = messagesAsReceiver.map((message) => ({
    ...message,
    author: 'receiver',
  }))

  const messagesSenderWithAuthor = messagesAsSender.map((message) => ({
    ...message,
    author: 'sender',
  }))

  const newList = [...messagesReceiverWithAuthor, ...messagesSenderWithAuthor]
  const orderedMessages = newList.sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime(),
  )
  return orderedMessages as IMessageWithAuthor[]
}

export async function getChat(chatId: string) {
  const sessionUser = await getSessionUser()
  if (!sessionUser) notFound()

  const chat = await db.chat.findUnique({
    where: { id: chatId },
    include: {
      receiver: true,
      messagesAsReceiver: true,
      messagesAsSender: true,
    },
  })

  if (!chat) return notFound()
  if (sessionUser.id !== chat.senderId && sessionUser.id !== chat.receiverId)
    notFound()

  const { messagesAsReceiver, messagesAsSender, ...data } = chat

  return {
    ...data,
    messages: mergeMessages(messagesAsReceiver, messagesAsSender),
  }
}
