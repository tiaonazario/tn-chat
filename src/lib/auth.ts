import { redirect } from 'next/navigation'

import { AuthOptions, getServerSession } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { db } from './prisma'

export const authOptions: AuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!token.email) {
        token.id = user.id
        return token
      }

      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user.id
        return token
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        image: dbUser.image,
        name: dbUser.name,
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name ?? ''
        session.user.email = token.email ?? ''
        session.user.image = token.picture ?? ''
      }

      return session
    },
    async redirect() {
      return '/general'
    },
  },
}

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return null

  return session.user
}

export const notAuthorized = async () => {
  const sessionUser = await getSessionUser()
  if (!sessionUser) redirect('/')
}
