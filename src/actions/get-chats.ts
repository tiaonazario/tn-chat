import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { Chat, Message, User } from '@prisma/client'

export interface IGetChats extends Chat {
  receiver: User
  messagesAsReceiver: Message[]
  messagesAsSender: Message[]
}

export async function getChats() {
  const sessionUser = await getSessionUser()
  if (!sessionUser) return []

  const chats = await db.chat.findMany({
    where: {
      senderId: sessionUser.id,
    },
    include: {
      receiver: true,
      messagesAsReceiver: {
        orderBy: {
          timestamp: 'asc',
        },
      },
      messagesAsSender: {
        orderBy: {
          timestamp: 'asc',
        },
      },
    },
  })

  return chats
}

export const amountUnreadMessages = (chat: IGetChats) => {
  return chat.messagesAsReceiver.filter(
    (message) => !message.seenIds.includes(chat.senderId),
  ).length
}

export const lastMessageSent = (chat: IGetChats) => {
  const messagesAsReceiverSize = chat.messagesAsReceiver.length
  const messagesAsSenderSize = chat.messagesAsSender.length

  const lastMessagesAsSender =
    messagesAsSenderSize > 0
      ? chat.messagesAsSender[messagesAsSenderSize - 1]
      : null

  const lastMessageAsReceiver =
    messagesAsReceiverSize > 0
      ? chat.messagesAsReceiver[messagesAsReceiverSize - 1]
      : null

  if (lastMessagesAsSender && lastMessageAsReceiver) {
    return lastMessagesAsSender.timestamp > lastMessageAsReceiver.timestamp
      ? lastMessagesAsSender
      : lastMessageAsReceiver
  }

  return lastMessagesAsSender || lastMessageAsReceiver
}
