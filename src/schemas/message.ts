import { z } from 'zod'

export const schemaMessagePost = z.object({
  chatAsSenderId: z.string().uuid().nullable(),
  content: z.string().min(1),
  receiverId: z.string().uuid(),
  seenIds: z.array(z.string().uuid()),
  senderId: z.string().uuid(),
})

export const schemaMessagePut = z.object({
  chatId: z.string().uuid(),
  seenIds: z.array(z.string().uuid()),
})

export type TSchemaMessagePost = z.infer<typeof schemaMessagePost>
export type TSchemaMessagePut = z.infer<typeof schemaMessagePut>
