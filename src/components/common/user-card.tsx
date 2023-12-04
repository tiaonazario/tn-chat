'use client'

import { User } from '@prisma/client'
import { Button } from '../ui/button'
import Image from 'next/image'

interface UserCardProps {
  user: User
}

export const UserCard = ({ user }: UserCardProps) => {
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
        <Button className="rounded">Message</Button>
      </div>
    </div>
  )
}
