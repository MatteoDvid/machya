'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-background text-surface p-4 flex gap-6 items-center">
      <Link href="/" className="hover:underline">🏠 Accueil</Link>
      <Link href="/resources" className="hover:underline">📚 Ressources</Link>
      <Link href="/skills" className="hover:underline">🧠 Compétences</Link>
    </header>
  )
}
