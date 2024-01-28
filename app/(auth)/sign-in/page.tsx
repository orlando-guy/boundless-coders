import { LoginButton } from '@/app/ui/carbon-buttons';
import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route'; 
import React from 'react';
import { redirect } from 'next/navigation';

export default async function SignInPage() {

    const authSession = await getServerAuthSession();
    if (authSession) {
        redirect('/dashboard/in')
    }

    return (
        <div className="min-vh-full flex flex-col items-center justify-center">
            <h1>Log in page</h1>

            <div className="mt-3">
                <LoginButton>
                    Connecter vous avec Github
                </LoginButton>
            </div>
        </div>
    )
}