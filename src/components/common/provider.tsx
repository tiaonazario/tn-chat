'use client'

import { SessionProvider } from 'next-auth/react'

interface WrappedProviderProps {
  children: React.ReactNode
}

export const WrappedProvider = ({ children }: WrappedProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>
}
