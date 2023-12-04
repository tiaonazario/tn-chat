'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

interface SignInButtonProps extends ButtonProps {
  children: React.ReactNode
}

export const SignInButton = ({ children, ...rest }: SignInButtonProps) => {
  return (
    <Button
      onClick={() => signIn('github')}
      className="gap-1 rounded"
      {...rest}
    >
      {children}
    </Button>
  )
}
