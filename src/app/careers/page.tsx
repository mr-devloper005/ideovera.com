import Link from 'next/link'
import { Sparkles, Users, Zap } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  { title: 'Product Designer (Marketplace)', location: 'Remote', type: 'Full-time', level: 'Mid' },
  { title: 'Full-stack Engineer (Next.js)', location: 'Remote / US-friendly hours', type: 'Full-time', level: 'Senior' },
  { title: 'Partner Success (Listings)', location: 'Remote', type: 'Part-time', level: 'Mid' },
]

const benefits = [
  { text: 'Small team; real ownership of discovery, listings, and onboarding flows', icon: Users },
  { text: 'Design and engineering aligned with the same teal bento system users see', icon: Sparkles },
  { text: 'Annual learning budget + hardware stipend for remote work', icon: Zap },
]

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Help us evolve ${SITE_CONFIG.name} as a modern listings product — not another content farm. We value shipping speed, clear writing, and respect for the user’s time.`}
      actions={
        <Button className="bg-[#0d9488] text-white hover:bg-[#0f7669]" asChild>
          <Link href="/contact">Get in touch</Link>
        </Button>
      }
    >
      <div className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-2xl border border-[#b6e2da]/80 bg-white p-5 transition hover:shadow-md hover:shadow-teal-900/5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border-[#0d9488]/30 bg-[#0d9488]/10 text-[#0d4f4a] hover:bg-[#0d9488]/15">{role.level}</Badge>
                  <Badge variant="outline" className="border-[#b6e2da] text-[#3d5c58]">
                    {role.type}
                  </Badge>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-[#0f1a19]">{role.title}</h2>
                <p className="mt-1 text-sm text-[#3d5c58]">{role.location}</p>
                <Button variant="outline" className="mt-3 border-[#0d9488]/30" asChild>
                  <Link href="/contact">Discuss this role</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-[#0d9488]/12 bg-gradient-to-b from-[#e8f7f4] to-white p-6 sm:p-7">
            <h3 className="text-lg font-semibold text-[#0f1a19]">Why {SITE_CONFIG.name}?</h3>
            <p className="mt-2 text-sm leading-7 text-[#3d5c58]">
              We’re building for people who need to <span className="font-medium text-[#0f1a19]">decide and act</span> — comparing businesses, skimming
              short offers, and moving on. If that sounds more interesting than “engagement at all costs,” you’ll fit in.
            </p>
            <ul className="mt-4 space-y-3">
              {benefits.map(({ text, icon: Icon }) => (
                <li key={text} className="flex gap-3 text-sm text-[#3d5c58]">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#b6e2da]/50">
                    <Icon className="h-4 w-4 text-[#0d9488]" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
