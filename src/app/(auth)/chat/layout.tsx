import {
  amountUnreadMessages,
  getChats,
  lastMessageSent,
} from '@/actions/get-chats'
import { ChatBoxView } from '@/components/common/chat/box-view'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const chats = await getChats()

  return (
    <div className="flex h-screen flex-1">
      <div className="flex w-full max-w-md flex-col gap-2 border-r p-2">
        <h2 className="text-base">Chat list</h2>

        <div className="flex flex-1 flex-col gap-1">
          {chats.map((chat) => (
            <ChatBoxView
              key={chat.id}
              message={lastMessageSent(chat)}
              unreadMessage={amountUnreadMessages(chat)}
              senderId={chat.senderId}
              user={chat.receiver}
            />
          ))}
        </div>
      </div>
      <div className="hidden flex-1 md:flex">{children}</div>
    </div>
  )
}
