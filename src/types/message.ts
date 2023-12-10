import { Message } from '@prisma/client'

export type TMessageAuthor = 'sender' | 'receiver'
export type TMessageStatus = 'seen' | 'sent' | 'error' | 'sending'

export interface IMessageWithAuthor extends Message {
  author: TMessageAuthor
  status?: TMessageStatus
}
