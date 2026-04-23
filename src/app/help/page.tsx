import Link from 'next/link'
import { BookOpen, LifeBuoy, ListTree, Search, Shield } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  {
    title: 'Listings & profiles',
    body: 'Publish a business, upload media, and keep contact fields accurate so you appear in category browse and search.',
    icon: ListTree,
  },
  {
    title: 'Classifieds & short posts',
    body: 'Faster, offer-first cards with an amber-tinted lane so they don’t get mistaken for long directory entries.',
    icon: BookOpen,
  },
  {
    title: 'Search & accounts',
    body: 'Use site search for cross-task discovery; manage email preferences and security from your account settings.',
    icon: Search,
  },
  {
    title: 'Trust & safety',
    body: 'Report misleading listings, protect your data, and learn how verification badges are applied on detail pages.',
    icon: Shield,
  },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description="Practical answers for directory browsing, posting, and account management on Ideovera — same clear teal system as the rest of the site."
      actions={
        <Button className="bg-[#0d9488] text-white hover:bg-[#0f7669]" asChild>
          <Link href="/contact">Contact support</Link>
        </Button>
      }
    >
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="rounded-2xl border border-[#b6e2da]/80 bg-gradient-to-b from-white to-[#f4fcfa]/50 p-5 transition hover:border-[#0d9488]/30"
            >
              <topic.icon className="h-6 w-6 text-[#0d9488]" aria-hidden />
              <h2 className="mt-3 font-semibold text-[#0f1a19]">{topic.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#3d5c58]">{topic.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[#0d9488]/15 bg-[#e8f7f4]/40 p-4 sm:p-5">
          <div className="flex flex-wrap items-start gap-3">
            <LifeBuoy className="h-6 w-6 shrink-0 text-[#0d9488]" />
            <div>
              <h3 className="font-semibold text-[#0f1a19]">Response times</h3>
              <p className="mt-1 text-sm text-[#3d5c58]">
                Most account and listing questions receive a first reply within two business days. Urgent takedown or safety issues: mark the subject line
                clearly in the contact form.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#0f1a19]">Frequently asked</h3>
          <p className="mb-4 mt-1 text-sm text-[#3d5c58]">Tap a question to expand — no PDF manuals required.</p>
          <div className="rounded-2xl border border-[#b6e2da]/60 bg-white">
            <Accordion type="single" collapsible className="divide-y divide-[#b6e2da]/40 px-2">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-0">
                  <AccordionTrigger className="text-left text-[#0f1a19] hover:text-[#0d9488] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-[#3d5c58]">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
