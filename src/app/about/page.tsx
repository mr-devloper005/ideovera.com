import Link from 'next/link'
import { Compass, MapPin, ShieldCheck, Sparkles, Target } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const stats = [
  { label: 'Listings & offers in rotation', value: 'Growing daily' },
  { label: 'Category lanes', value: '30+ topics' },
  { label: 'Focus', value: 'Local & digital' },
]

const pillars = [
  {
    title: 'Directory-first',
    body: 'Ideovera is built for people who want to compare businesses, services, and short offers without wading through generic social feeds.',
  },
  {
    title: 'Trust on the surface',
    body: 'Contact details, categories, and map-ready location cues stay visible so every card earns a quick decision.',
  },
  {
    title: 'One platform, many tasks',
    body: 'Listings and classifieds lead the experience; articles, images, and other formats stay one search or URL away.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description="We’re a listings-first discovery product for ideovera.com — calmer than a news feed, faster than a spreadsheet of links."
      actions={
        <>
          <Button variant="outline" className="border-[#0d9488]/30 text-[#0f1a19] hover:bg-[#e8f7f4]" asChild>
            <Link href="/listings">Browse listings</Link>
          </Button>
          <Button className="bg-[#0d9488] text-white hover:bg-[#0f7669]" asChild>
            <Link href="/contact">Contact us</Link>
          </Button>
        </>
      }
    >
      <div className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-[#b6e2da] bg-gradient-to-br from-white to-[#f0faf7] p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/10 px-3 py-1 text-xs font-semibold text-[#0d4f4a]">
              <Compass className="h-3.5 w-3.5" aria-hidden />
              Our story
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Marketplace clarity for real browsing sessions</h2>
            <p className="mt-4 text-sm leading-7 text-[#3d5c58]">
              {SITE_CONFIG.name} started from a simple frustration: most “homepages” look like blogs or ads, not like a place to{' '}
              <span className="font-medium text-[#0f1a19]">find and compare</span> what you need. We designed Ideovera around horizontal scanning, bento
              cards, and obvious paths to detail pages — the same language you see on the home experience.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#3d5c58]">
              Whether you’re looking for a service, a short classified, or a profile to trust, the interface stays consistent: teal accents, soft depth, and
              no purple-on-white template noise.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-1">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-[#0d9488]/15 bg-[#f4fcfa] p-4 sm:p-5">
                <p className="text-2xl font-semibold text-[#0f1a19]">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#3d5c58]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">Principles</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[#b6e2da]/80 bg-white p-5 transition hover:shadow-md hover:shadow-teal-900/5"
              >
                <Target className="h-5 w-5 text-[#0d9488]" aria-hidden />
                <h4 className="mt-3 font-semibold text-[#0f1a19]">{p.title}</h4>
                <p className="mt-2 text-sm leading-6 text-[#3d5c58]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-[#0d9488]/25 bg-[#f4fcfa]/50 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#0d9488]" />
            <Sparkles className="h-5 w-5 text-[#0d9488]/80" />
            <MapPin className="h-5 w-5 text-[#0d9488]/80" />
            <p className="min-w-0 text-sm text-[#3d5c58]">
              <span className="font-semibold text-[#0f1a19]">Roadmap in plain terms:</span> deeper filters, saved shortlists, and stronger verification
              labels — without turning the app into a dashboard.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#0f1a19]">People behind the product</h3>
          <p className="mt-1 text-sm text-[#3d5c58]">A small, remote-friendly team focused on product craft and support response times — not headcount for show.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <div
                key={member.id}
                className="flex flex-col rounded-2xl border border-[#b6e2da]/80 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-[#b6e2da]">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-[#0f1a19]">{member.name}</p>
                    <p className="text-xs text-[#3d5c58]">{member.role}</p>
                  </div>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#3d5c58]">{member.bio}</p>
                <p className="mt-2 text-xs text-[#0d9488]">{member.location}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" className="border-[#0d9488]/30" asChild>
              <Link href="/team">View organization directory</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
