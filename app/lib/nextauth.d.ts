import type { DefaultSession, DefaultUser, User } from "next-auth";

declare module 'next-auth' {
    interface User extends DefaultUser {
        id: string;
        role: string;
    }

    interface Session extends DefaultSession {
        user: DefaultUser & {
            id: string;
            role: string;
        }
    }
}