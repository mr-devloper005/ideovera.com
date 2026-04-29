'use client'

import { useState } from 'react'
import { Phone } from 'lucide-react'

export function PhoneRevealButton({ phone }: { phone: string }) {
  const [revealed, setRevealed] = useState(false)

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="inline-flex h-10 w-fit items-center gap-2 border border-[#334155] bg-white px-4 text-sm text-[#1e293b]"
      >
        <Phone className="h-4 w-4" />
        See Phone Number
      </button>
    )
  }

  return (
    <a
      href={`tel:${phone}`}
      className="inline-flex h-10 w-fit items-center gap-2 border border-[#334155] bg-white px-4 text-sm font-medium text-[#1e293b] hover:bg-[#f8fafc]"
    >
      <Phone className="h-4 w-4" />
      {phone}
    </a>
  )
}

