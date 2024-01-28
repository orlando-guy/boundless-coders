import { Providers } from '@/app/ui/providers'
import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route'

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerAuthSession()
  return (
    <Providers session={session}>
      {children}
    </Providers>
  )
}
