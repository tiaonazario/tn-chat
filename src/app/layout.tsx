import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { WrappedProvider } from '@/components/common/provider'
import '../styles/globals.css'

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Chat Message',
    template: '%s | Chat Message',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} flex h-screen w-full items-center bg-background text-sm text-foreground antialiased dark:bg-background dark:text-foreground`}
      >
        <WrappedProvider>{children}</WrappedProvider>
      </body>
    </html>
  )
}
