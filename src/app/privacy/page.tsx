import { PageShell } from '@/components/shared/page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'What we collect',
    body: `When you use ${SITE_CONFIG.name}, we may process account details (email, name), content you post (listings, classifieds, media), technical logs needed to run the service (IP, device, approximate region), and limited usage signals that help us improve search and prevent abuse. We do not sell your personal data.`,
  },
  {
    title: 'Why we use it',
    body: 'Data is used to provide and secure the platform, show relevant discovery results, communicate service updates, and meet legal requirements. Analytics are aggregated where possible; individual browsing is not resold to advertisers.',
  },
  {
    title: 'Storage & transfers',
    body: 'Information may be stored with infrastructure partners under agreements that require appropriate safeguards. If data crosses regions, we apply mechanisms consistent with applicable law.',
  },
  {
    title: 'Your rights',
    body: 'Depending on your location, you may request access, correction, export, or deletion of your personal data, and you may object to certain processing. Contact us through the site; we will verify ownership before acting on sensitive requests.',
  },
  {
    title: 'Retention',
    body: 'We keep data only as long as needed for the purpose collected — for example, account data while your account is active, and content you publish until you remove it or close your account, subject to legal holds.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions specific to ideovera.com, reach out via the contact page and include “Privacy” in the subject line so we can route the thread correctly.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy policy"
      description="How Ideovera handles information on this site. Plain language first; the same data practices apply across listings, classifieds, and all supported tasks."
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
