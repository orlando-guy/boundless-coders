import type { Metadata } from 'next'
import { UserDashboardProvider } from '@/app/ui/providers'

export const metadata: Metadata = {
  title: 'BOUNDLESS CODERS | Dashboard',
  description: "BOUNDLESS CODERS est un projet open source dont le but est de vous aider à devenir un meilleur ingénieur logiciel et à trouver un travail sympa grâce à des défis de codage, et des contributions sur des projets d'autres développeurs.",
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UserDashboardProvider>
      {children}
    </UserDashboardProvider>
  )
}
