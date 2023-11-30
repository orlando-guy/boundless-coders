'use client'

import HeaderNavbar from "@/app/ui/header"
import { Theme } from '@carbon/react'
import Footer from "@/app/ui/footer/footer"

export function Providers({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Theme theme="g100">
                <HeaderNavbar />
            </Theme>
            <main className="container">
                {children}
            </main>
            <Theme theme="g100" className="mt-auto">
                <Footer />
            </Theme>
        </>
    )
}