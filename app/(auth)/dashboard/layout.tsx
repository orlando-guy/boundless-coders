import type { Metadata } from 'next'
import { UserDashboardProvider } from '@/app/ui/providers'
import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  const session = await getServerAuthSession()
  return (
    <UserDashboardProvider session={session}>
      {children}
    </UserDashboardProvider>
  )
}
