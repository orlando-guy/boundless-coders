import '@/app/globals.scss'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | BOUNDLESS CODERS',
    default: 'BOUNDLESS CODERS'
  },
  description: "BOUNDLESS CODERS est un projet open source dont le but est de vous aider à devenir un meilleur ingénieur logiciel et à trouver un travail sympa grâce à des défis de codage, et des contributions sur des projets d'autres développeurs.",
  creator: 'Orlando Guichard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}