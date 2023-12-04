import { ChatBoxView } from '@/components/common/chat/box-view'
import { getSessionUser } from '@/lib/auth'
import { notFound } from 'next/navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionUser = await getSessionUser()
  if (!sessionUser) notFound()

  const messages = [
    {
      id: 'example-01',
      last: 'a message example',
      time: new Date(),
      unread: 3,
    },
    {
      id: 'example-02',
      last: 'a message example with character number big size',
      time: new Date(),
      unread: 21,
    },
  ]

  return (
    <div className="flex h-screen flex-1">
      <div className="flex w-full max-w-md flex-col gap-2 border-r p-2">
        <h2 className="text-base">Chat list</h2>

        <div className="flex flex-1 flex-col gap-1">
          {messages.map((message, index) => (
            <ChatBoxView
              key={index}
              message={message}
              sentId={sessionUser.id}
              user={sessionUser}
            />
          ))}
        </div>
      </div>
      <div className="hidden flex-1 md:flex">{children}</div>
    </div>
  )
}
