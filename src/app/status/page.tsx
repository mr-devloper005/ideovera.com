import { PageShell } from '@/components/shared/page-shell'
import { Badge } from '@/components/ui/badge'
import { Activity, Cloud, Server } from 'lucide-react'

const services = [
  { name: 'Web app (ideovera.com)', status: 'Operational' as const, icon: Server },
  { name: 'Search & feed APIs', status: 'Operational' as const, icon: Cloud },
  { name: 'Media & assets', status: 'Operational' as const, icon: Activity },
]

const incidents = [
  { date: 'Mar 12, 2026', title: 'Delayed email notifications for account alerts', status: 'Resolved' },
  { date: 'Feb 22, 2026', title: 'Slower search index refresh (fixed same day)', status: 'Resolved' },
]

export default function StatusPage() {
  return (
    <PageShell
      title="System status"
      description="Uptime and incident history for Ideovera. We keep this page factual — green means we’re not aware of a platform-wide issue right now."
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col rounded-2xl border border-[#b6e2da]/80 bg-white p-5"
            >
              <service.icon className="h-5 w-5 text-[#0d9488]" />
              <h2 className="mt-2 text-base font-semibold text-[#0f1a19]">{service.name}</h2>
              <Badge
                className="mt-3 w-fit border-[#0d9488]/25 bg-[#d1fae5] text-xs font-medium text-[#047857] hover:bg-[#d1fae5]"
              >
                {service.status}
              </Badge>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-[#b6e2da]/60 bg-gradient-to-b from-white to-[#f4fcfa]/50 p-5 sm:p-6">
          <h3 className="text-base font-semibold text-[#0f1a19]">Recent incidents</h3>
          <p className="mt-1 text-sm text-[#3d5c58]">Past issues are listed for transparency. Subscribe to product updates from the help center in the future.</p>
          <div className="mt-4 space-y-2">
            {incidents.map((incident) => (
              <div
                key={incident.title}
                className="flex flex-col gap-1 rounded-xl border border-[#0d9488]/10 bg-white/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-xs text-[#0d9488]">{incident.date}</div>
                  <div className="text-sm font-medium text-[#0f1a19]">{incident.title}</div>
                </div>
                <span className="text-xs font-medium text-[#3d5c58]">{incident.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  )
}
