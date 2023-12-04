'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

interface SignOutButtonProps extends ButtonProps {
  children: React.ReactNode
}

export const SignOutButton = ({ children, ...rest }: SignOutButtonProps) => {
  return (
    <Button onClick={() => signOut()} className="gap-1 rounded" {...rest}>
      {children}
    </Button>
  )
}
