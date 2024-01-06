import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from "next-auth/providers/github";
import  prisma from '@/app/lib/db';

const gitClientId = process.env.GITHUB_CLIENT_ID
const gitClientSecret = process.env.GITHUB_CLIENT_SECRET

if (!gitClientId || !gitClientSecret) {
    throw new Error('The required GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is missing')
}

const authOption: NextAuthOptions = {
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [GithubProvider({
        clientId: gitClientId,
        clientSecret: gitClientSecret
    })]
}

const handler = NextAuth(authOption)

const getServerAuthSession = () => getServerSession(authOption);

export { 
    handler as GET,
    handler as POST,
    authOption,
    getServerAuthSession
}