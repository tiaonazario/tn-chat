import { db } from '@/lib/prisma'
import { pusherServer } from '@/lib/pusher'
import { chatHrefConstructor } from '@/lib/utils'
import { schemaMessagePost, schemaMessagePut } from '@/schemas/message'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { chatAsSenderId, content, receiverId, seenIds, senderId } =
    schemaMessagePost.parse(data)

  const chatHref = chatHrefConstructor(receiverId, senderId)

  const chatAsReceiver = await db.chat.findFirst({
    where: {
      receiverId: senderId,
      senderId: receiverId,
    },
  })

  if (!chatAsReceiver) {
    const chat = await db.chat.create({
      data: {
        receiverId: senderId,
        senderId: receiverId,
      },
    })

    const message = await db.message.create({
      data: {
        content,
        chatAsReceiverId: chat.id,
        chatAsSenderId,
        senderId,
        receiverId,
        seenIds,
      },
    })

    await pusherServer.trigger(chatHref, 'message:new', message)

    return NextResponse.json({ message })
  }

  const message = await db.message.create({
    data: {
      content,
      chatAsReceiverId: chatAsReceiver.id,
      chatAsSenderId,
      senderId,
      receiverId,
      seenIds,
    },
  })

  await pusherServer.trigger(chatHref, 'message:new', message)

  return NextResponse.json({ message })
}

export async function PUT(request: NextRequest) {
  const data = await request.json()
  const { chatId, seenIds } = schemaMessagePut.parse(data)

  await db.message.updateMany({
    where: {
      chatAsSenderId: chatId,
      NOT: {
        seenIds: {
          equals: seenIds,
        },
      },
    },
    data: {
      seenIds,
    },
  })

  return NextResponse.json({ message: 'updated messages' })
}
