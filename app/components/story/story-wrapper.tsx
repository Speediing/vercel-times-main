import type { ReactNode } from 'react'

export const StoryWrapper = ({ children }: { children: ReactNode }) => (
  <section className="border-t border-neutral-900 z-20 w-full pb-6">
    <div className="grid grid-cols-14 gap-y-2 gap-x-4 pt-4">{children}</div>
  </section>
)
