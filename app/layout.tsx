import type { ReactNode } from 'react'
import '../assets/main.css'

const Layout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
)

export default Layout
