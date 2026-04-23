import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Using the service',
    body: `By accessing ${SITE_CONFIG.name} at ideovera.com, you agree to these terms and to our privacy policy. You must be of legal age to form a contract in your region, and you are responsible for activity on your account.`,
  },
  {
    title: 'Content & ownership',
    body: 'You retain rights to content you post. You grant the platform a non-exclusive license to host, display, distribute, and promote that content in connection with the service, including in search and discovery features.',
  },
  {
    title: 'Prohibited conduct',
    body: 'Do not post illegal content, malware, or deceptive listings; do not harass users or attempt to bypass security. We may remove content, suspend accounts, or cooperate with authorities when required by law.',
  },
  {
    title: 'Disclaimers',
    body: 'The directory is provided “as is.” We do not guarantee uninterrupted availability, and we are not a party to transactions between users and third parties discovered through the site. Verify critical details directly with businesses.',
  },
  {
    title: 'Changes',
    body: 'We may update these terms; material changes will be posted on this page with a revised “last updated” date. Continued use after changes constitutes acceptance of the new terms.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of service"
      description={`Rules for using ${SITE_CONFIG.name} — including listings, classifieds, and every other feature reachable from this domain.`}
    >
      <p className="text-xs text-[#3d5c58]">Last updated: April 23, 2026</p>
      <div className="mt-6 space-y-4">
        {sections.map((section) => (
          <div key={section.title} className="rounded-2xl border border-[#b6e2da]/60 bg-gradient-to-b from-white to-[#f4fcfa]/40 p-5 sm:p-6">
            <h3 className="text-base font-semibold text-[#0f1a19]">{section.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#3d5c58]">{section.body}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
