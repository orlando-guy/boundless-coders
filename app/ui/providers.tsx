'use client'

import HeaderNavbar from "@/app/ui/header"
import { Content, Theme } from '@carbon/react'

export function Providers({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <Theme theme="g100">
                <HeaderNavbar />
            </Theme>
            <Content>{children}</Content>
        </>
    )
}