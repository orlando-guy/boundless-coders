'use client'

import { LogoGithub } from "@carbon/icons-react";
import { Button } from "@carbon/react"
import { signIn } from 'next-auth/react';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

// add a variant prop to differentiate the login buttons
// create an interface that will extend to native html button tag or Carbon Button
function LoginButton({
    children,
    ...rest
}: IButtonProps) {
    const handleSignIn = async () => {
        await signIn('github');
    }

    return (
        <Button
            type="submit"
            onClick={handleSignIn}
            renderIcon={LogoGithub}
            kind='tertiary'
            {...rest}
        >{children}</Button>
    )
}

export {
    LoginButton
}