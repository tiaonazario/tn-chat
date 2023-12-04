import { IRoute } from '@/types/route'
import { MessagesSquare, Settings, Users } from 'lucide-react'

export const routes: IRoute[] = [
  {
    index: 1,
    name: 'General',
    href: '/general',
    icon: Settings,
  },
  {
    index: 2,
    name: 'Chats',
    href: '/chat',
    icon: MessagesSquare,
  },
  {
    index: 3,
    name: 'Users',
    href: '/users',
    icon: Users,
  },
]
