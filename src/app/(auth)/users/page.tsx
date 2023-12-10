import { getUsers } from '@/actions/get-users'
import { UserCard } from '@/components/common/user-card'
import { getSessionUser } from '@/lib/auth'
import { notFound } from 'next/navigation'

export default async function UsersPage() {
  const sessionUser = await getSessionUser()
  if (!sessionUser) return notFound()

  const users = await getUsers()

  return (
    <div className="flex flex-1 flex-col gap-4 p-2">
      <h2 className="text-base">User list</h2>

      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {users.map((user) => (
          <UserCard key={user.id} sessionUser={sessionUser} user={user} />
        ))}
      </div>
    </div>
  )
}
