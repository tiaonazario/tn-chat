import { Sidebar } from '@/components/common/sidebar'
import { getSessionUser } from '@/lib/auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionUser = await getSessionUser()
  if (!sessionUser) notFound()

  return (
    <main className="flex h-screen flex-1">
      <Sidebar sessionUser={sessionUser} />

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 border-b">
          <Image src="/tn-chat.svg" width={40} height={40} alt="logo" />
          <h1>
            👋 Hey, <strong>{sessionUser.name}</strong>!
          </h1>
        </div>
        {children}
      </div>
    </main>
  )
}
