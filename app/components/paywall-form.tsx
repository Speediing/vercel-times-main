'use client'

import type { FormEvent, ReactNode } from 'react'

export const PaywallForm = ({ children }: { children: ReactNode }) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.currentTarget.email.value,
      }),
    })

    if (res.ok) {
      location.reload()
    }
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}
