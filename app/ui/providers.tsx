'use client'

import HeaderNavbar from "@/app/ui/header"
import { Theme } from '@carbon/react'
import Footer from "@/app/ui/footer/footer"
import SideBar from "@/app/ui/sidebar/sidebar"
import { Session } from "next-auth"

const Providers = ({
    children,
    session
}: Readonly<{
    children: React.ReactNode;
    session?: Session | null;
}>) => {
    return (
        <>
            <Theme theme="g100">
                <HeaderNavbar session={session} />
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
    children,
    session
}: Readonly<{
    children: React.ReactNode;
    session?: Session | null;
}>) => (
    <>
        <Theme theme="g100">
            <HeaderNavbar session={session} />
        </Theme>
        <main className="container">
            <SideBar session={session} />
            <Theme theme="g100" className="min-vh-full w-full user-dashboard-provider">
                {children}
            </Theme>
        </main>
    </>
)

export {
    Providers,
    UserDashboardProvider
}