import { withAuth } from "next-auth/middleware"

// export { default } from 'next-auth/middleware'

export default withAuth(
    {
        pages: {
            signIn: '/sign-in',
        },
        callbacks: {
            authorized({ token, req: { nextUrl } }) {
                const isLoggedIn = !!token
                const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
                if (isOnDashboard) {
                    if (isLoggedIn) return true;
                    return false;
                }
                return true
            }
        }
    }
)

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: [
        '/dashboard',
        '/dashboard/:path',
        '/((?!api|_next/static|_next/image|.*\\.png$).*)'
    ],
}