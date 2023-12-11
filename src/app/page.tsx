import Image from 'next/image'
import { Github } from 'lucide-react'
import { SignInButton } from '@/components/common/sign-in-button'

export default function Home() {
  return (
    <main className="flex h-full w-full items-center justify-between">
      <div className="flex h-full flex-1 flex-col items-center justify-center gap-6 border-r px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold text-secondary">
            Chat Message
          </h1>
          <Image
            className=""
            height={68}
            width={68}
            src="/tn-chat.svg"
            alt="logo"
          />
        </div>
        <p className="max-w-md text-center text-muted-foreground">
          Explore <strong className="text-primary">Chat Message</strong> - your
          go-to platform for instant, seamless communication. Connect
          effortlessly and experience the future of real-time chatting.
        </p>
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Sign in to your account
        </h2>
        <SignInButton>
          <Github className="h-6 w-6" />
          <span className="">Sign in with GitHub</span>
        </SignInButton>
      </div>
      <div className="hidden h-full flex-1 bg-secondary md:flex"></div>
    </main>
  )
}
