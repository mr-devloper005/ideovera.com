import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_100%_60%_at_0%_0%,rgba(13,148,136,0.06),transparent_50%),#f1f4f3] text-[#0f1a19]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b6e2da] bg-white/80 px-3 py-1.5 text-sm font-medium text-[#3d5c58] transition hover:border-[#0d9488]/50 hover:text-[#0d4f4a]"
        >
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-[1.8rem] border border-[#b6e2da]/80 bg-white shadow-[0_24px_60px_rgba(13,148,136,0.08)]">
              <div className="relative h-[min(60vh,28rem)] overflow-hidden bg-[#e6f7f4] sm:h-[420px]">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a19]/20 to-transparent" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-2.5 p-3 sm:gap-3 sm:p-4">
                  {images.slice(1, 5).map((image) => (
                    <div
                      key={image}
                      className="relative h-20 overflow-hidden rounded-xl border border-[#b6e2da] bg-white sm:h-24 sm:rounded-2xl"
                    >
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-6 rounded-3xl border border-[#b6e2da]/80 bg-white p-6 sm:p-8 sm:mt-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">About</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Details, highlights, and contact in one bento block</h2>
              <p className="mt-3 text-sm leading-8 text-[#3d5c58]">{description}</p>
              {highlights.length ? (
                <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[#0d9488]/15 bg-[#f0fdf9] px-3 py-3 text-sm text-[#0f1a19]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-[#b6e2da]/80 bg-white p-6 sm:p-7 shadow-[0_16px_48px_rgba(13,148,136,0.08)]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">{category || taskLabel}</p>
                  <h1 className="mt-1.5 text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">{post.title}</h1>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#0d9488] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white sm:text-xs">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>

              <div className="mt-5 grid gap-2.5">
                {location ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-[#b6e2da] bg-[#f4fcfa] px-3 py-2.5 text-sm text-[#0f1a19]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#0d9488]" />
                    {location}
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-[#b6e2da] bg-[#f4fcfa] px-3 py-2.5 text-sm text-[#0f1a19]">
                    <Phone className="h-4 w-4 shrink-0 text-[#0d9488]" />
                    {phone}
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-[#b6e2da] bg-[#f4fcfa] px-3 py-2.5 text-sm text-[#0f1a19]">
                    <Mail className="h-4 w-4 shrink-0 text-[#0d9488]" />
                    {email}
                  </div>
                ) : null}
                {website ? (
                  <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#b6e2da] bg-[#f4fcfa] px-3 py-2.5 text-sm text-[#0f1a19]">
                    <Globe className="h-4 w-4 shrink-0 text-[#0d9488]" />
                    <span className="truncate">{website}</span>
                  </div>
                ) : null}
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#0d9488] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f7669]"
                  >
                    Visit website
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href={taskRoute}
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-[#0d9488]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#0f1a19] transition hover:border-[#0d9488]/45"
                >
                  Back to list
                </Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-3xl border border-[#b6e2da] bg-white shadow-sm">
                <div className="border-b border-[#b6e2da] px-4 py-3 sm:px-5 sm:py-3.5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">Map</p>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-[min(20rem,50vh)] w-full border-0 sm:h-[320px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}

            <div className="rounded-3xl border border-[#b6e2da] bg-gradient-to-b from-white to-[#f4fcfa] p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">At a glance</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {['Contact surfaced here', 'Category + location in sync', 'Continues the marketplace tone', 'Related picks below'].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-[#0d9488]/10 bg-white/90 px-3 py-2.5 text-sm text-[#0f1a19]"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-12 sm:mt-14">
            <div className="flex items-end justify-between gap-3 border-b border-[#0d9488]/15 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">You may also like</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Nearby in this category</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b6e2da] bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3d5c58] sm:text-xs">
                <Tag className="h-3.5 w-3.5" />
                {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
