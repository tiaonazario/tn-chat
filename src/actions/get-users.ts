import { getSessionUser } from '@/lib/auth'
import { db } from '@/lib/prisma'

export async function getUsers() {
  const sessionUser = await getSessionUser()
  if (!sessionUser) return []

  try {
    const users = await db.user.findMany({
      orderBy: {
        name: 'asc',
      },
      where: {
        NOT: {
          id: sessionUser.id,
        },
      },
    })
    return users
  } catch (error) {
    return []
  }
}
