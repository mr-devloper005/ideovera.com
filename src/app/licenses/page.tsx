import { PageShell } from '@/components/shared/page-shell'

const licenses = [
  { name: 'Next.js', description: 'MIT License — https://github.com/vercel/next.js' },
  { name: 'React', description: 'MIT License — https://github.com/facebook/react' },
  { name: 'Tailwind CSS', description: 'MIT License — https://github.com/tailwindlabs/tailwindcss' },
  { name: 'Radix UI', description: 'MIT License — https://www.radix-ui.com' },
  { name: 'Lucide', description: 'ISC License — https://lucide.dev' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Open source licenses"
      description="Acknowledgement of third-party software that helps power Ideovera. We’re grateful to the open source community; this page is informational only, not legal advice."
    >
      <div className="space-y-3">
        {licenses.map((license) => (
          <div
            key={license.name}
            className="flex flex-col gap-1 rounded-2xl border border-[#b6e2da]/60 bg-[#f4fcfa]/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <h3 className="text-sm font-semibold text-[#0f1a19]">{license.name}</h3>
            <p className="text-sm text-[#3d5c58]">{license.description}</p>
          </div>
        ))}
      </div>
    </PageShell>
  )
}
