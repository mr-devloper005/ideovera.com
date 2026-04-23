import { PageShell } from '@/components/shared/page-shell'

const sections = [
  {
    title: 'Essential cookies',
    body: 'These keep you signed in, protect forms from abuse, and store session state. The site does not work reliably without them.',
  },
  {
    title: 'Preferences',
    body: 'We may remember display choices (such as light theme) and the last filter you used on list pages, stored locally in your browser where possible.',
  },
  {
    title: 'Analytics',
    body: 'Aggregated traffic and error data help us see which pages are slow or broken. We use this to improve performance — not to sell ad profiles on Ideovera.',
  },
  {
    title: 'Control',
    body: 'You can block cookies in your browser, but some features (login, saved filters) may stop working. For questions, use the contact page and mention “Cookies.”',
  },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie policy"
      description="A straightforward breakdown of what ideovera.com stores in the browser, and why — aligned with the same transparent tone as the rest of the product."
    >
      <p className="text-xs text-[#3d5c58]">Last updated: April 23, 2026</p>
      <div className="mt-6 space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-[#b6e2da]/60 bg-white p-5 sm:p-6">
            <h3 className="text-base font-semibold text-[#0f1a19]">{section.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#3d5c58]">{section.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
