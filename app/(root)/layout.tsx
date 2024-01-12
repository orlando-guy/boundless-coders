import type { Metadata } from 'next'

import { Providers } from '@/app/ui/providers'
import { getServerAuthSession } from '@/app/api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'BOUNDLESS CODERS',
  description: "BOUNDLESS CODERS est un projet open source dont le but est de vous aider à devenir un meilleur ingénieur logiciel et à trouver un travail sympa grâce à des défis de codage, et des contributions sur des projets d'autres développeurs.",
}

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
