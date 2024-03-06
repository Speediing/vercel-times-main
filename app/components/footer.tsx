import Link from 'next/link'
import { Logo } from './logo'

export const Footer = () => (
  <nav className="max-w-7xl mx-auto px-2 lg:px-10 before:block before:h-1 before:border-b before:border-t-2 before:border-[#e2e2e2]">
    <header>
      <Link href="/" className="block text-center">
        <Logo height={44} width={184} />
      </Link>
    </header>
  </nav>
)
