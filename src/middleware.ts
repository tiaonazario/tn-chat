import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(request) {
    if (!request.nextauth.token) {
      return NextResponse.rewrite(new URL('/unauthorized', request.url))
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token
      },
    },
  },
)

export const config = {
  matcher: [
    '/chat/:path*',
    '/general/:path*',
    '/users/:path*',
    '/profile/:path*',
  ],
}
