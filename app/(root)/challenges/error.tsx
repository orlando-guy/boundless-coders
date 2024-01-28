'use client'

import { useEffect } from 'react';
import { Button } from '@carbon/react';
import { Restart } from '@carbon/react/icons'

export default function Error({
    error,
    reset
}: Readonly<{
    error: Error & { digest?: string };
    reset: () => void;
}>) {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <section className='flex h-full flex-col items-center justify-center py-6'>
            <h2 className='text-center'>Quelque chose c'est mal passé</h2>
            <Button
                renderIcon={Restart}
                onClick={
                    // Attempt to recover by trying to re-render
                    // the challenge route
                    () => reset()
                }
            >
                Réessayez encore
            </Button>
        </section>
    )
}