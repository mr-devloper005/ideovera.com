'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_100%_60%_at_0%_0%,rgba(13,148,136,0.06),transparent_50%),#f1f4f3] text-[#0f1a19]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#0d9488]/10 bg-gradient-to-b from-[#e8f7f3]/90 to-[#f0faf7]/40">
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0d9488]">Ideovera</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">{title}</h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-sm text-[#3d5c58] sm:text-base">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-2 sm:justify-end">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="rounded-2xl border border-[#b6e2da]/70 bg-white/90 p-6 shadow-[0_16px_48px_rgba(13,148,136,0.07)] sm:rounded-3xl sm:p-8 lg:p-10">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
