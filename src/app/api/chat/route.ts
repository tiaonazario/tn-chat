import { db } from '@/lib/prisma'
import { schemaChatPost } from '@/schemas/chat'
import { NextResponse, NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { receiverId, senderId } = schemaChatPost.parse(data)

  const chatAsSender = await db.chat.create({
    data: {
      receiverId,
      senderId,
    },
  })

  return NextResponse.json({ chatAsSender })
}
