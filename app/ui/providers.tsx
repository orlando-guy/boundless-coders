'use client'

import HeaderNavbar from "@/app/ui/header"
import { Theme } from '@carbon/react'
import Footer from "@/app/ui/footer/footer"
import SideBar from "@/app/ui/sidebar/sidebar"

const Providers = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => {
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

const UserDashboardProvider = ({
    children
}: Readonly<{
    children: React.ReactNode
}>) => (
    <>
        <Theme theme="g100">
            <HeaderNavbar />
        </Theme>
        <main className="container">
            <SideBar />
            <Theme theme="g100" className="flex flex-1 flex-col min-vh-full w-full" style={{ padding: ".75rem .75rem .75rem 4.5rem" }}>
                {children}
            </Theme>
        </main>
    </>
)

export {
    Providers,
    UserDashboardProvider
}