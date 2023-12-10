import { z } from 'zod'

export const schemaChatPost = z.object({
  receiverId: z.string().uuid(),
  senderId: z.string().uuid(),
})

export type TSchemaChatPost = z.infer<typeof schemaChatPost>
