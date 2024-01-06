import type { NextAuthOptions } from 'next-auth';

export const authConfig: NextAuthOptions = {
    pages: {
        signIn: '/sign-in',
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        session: async ({ session, token }) => {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return Promise.resolve(session)
        },
        async jwt({ token, user, session }) {
            
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            console.log('within the jwt()', {
                token,
                user,
                session
            })
            return token
        },
        async signIn({ user }) {
            if (user.id) {
                return true; // Continue the sign-in process
            }
            return false
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [],
};