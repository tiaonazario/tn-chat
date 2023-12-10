import Link from 'next/link'
import { LogOut, Menu } from 'lucide-react'

import { ActiveLink } from '@/components/own/active-link'
import { routes } from '@/routes'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ISessionUser } from '@/types/session-user'
import { getFallbackName } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { SignOutButton } from './sign-out-button'

interface SidebarProps {
  sessionUser: ISessionUser
}

export const Sidebar = ({ sessionUser }: SidebarProps) => {
  return (
    <div className="flex flex-col items-start gap-2 border-r p-4 text-muted-foreground transition-all">
      <Menu className="h-8 w-8 self-center" />

      <Separator />

      <ul className="flex h-full flex-col items-start gap-1">
        {routes.map((route) => (
          <li key={route.index}>
            <ActiveLink
              href={route.href}
              className="w-full"
              icon={<route.icon />}
              label={route.name}
            />
          </li>
        ))}
      </ul>

      <Separator />

      <div className="flex flex-col gap-2">
        <SignOutButton
          className="rounded p-2 hover:bg-destructive hover:text-destructive-foreground"
          variant="ghost"
        >
          <LogOut className="h-6 w-6" />
        </SignOutButton>
        <Link href="/profile">
          <Avatar>
            <AvatarImage src={sessionUser.image} alt={sessionUser.name} />
            <AvatarFallback>{getFallbackName(sessionUser.name)}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  )
}
