import Link from 'next/link'
import { Mail, Phone, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PhoneRevealButton } from '@/components/tasks/phone-reveal-button'
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
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
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
    <div className="min-h-screen bg-[#f3f5f7] text-[#0f172a]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-5 inline-flex items-center text-sm text-[#475569] transition hover:text-[#0f172a]">
          {'<-'} Back to {taskLabel}
        </Link>

        <section className="rounded-xl border border-[#e2e8f0] bg-white p-5 shadow-sm sm:p-7">
          <div className="grid gap-5 sm:grid-cols-[96px_1fr]">
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-[#cbd5e1] bg-[#f8fafc] sm:mx-0">
              <div className="relative h-full w-full">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
            </div>
            <div>
              <p className="text-sm text-[#64748b]">{category || taskLabel}</p>
              <h1 className="mt-1 text-3xl font-semibold leading-tight sm:text-4xl">{post.title}</h1>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold tracking-tight">Contact Information</h2>
            <div className="mt-6 space-y-5">
              <div className="grid gap-2 sm:grid-cols-[210px_1fr]">
                <p className="text-sm font-medium text-[#334155]">Company Name</p>
                <p className="text-sm text-[#1e293b]">{post.title}</p>
              </div>

              {website ? (
                <div className="grid gap-2 sm:grid-cols-[210px_1fr]">
                  <p className="text-sm font-medium text-[#334155]">Visit Website</p>
                  <a href={website} target="_blank" rel="noreferrer" className="break-all text-sm text-[#1d4ed8] hover:underline">
                    {website}
                  </a>
                </div>
              ) : null}

              {phone ? (
                <div className="grid gap-2 sm:grid-cols-[210px_1fr]">
                  <p className="text-sm font-medium text-[#334155]">Phone Number</p>
                  <PhoneRevealButton phone={phone} />
                </div>
              ) : null}

              {location ? (
                <div className="grid gap-2 sm:grid-cols-[210px_1fr]">
                  <p className="text-sm font-medium text-[#334155]">Location</p>
                  <p className="text-sm text-[#1e293b]">{location}</p>
                </div>
              ) : null}

              {email ? (
                <div className="grid gap-2 sm:grid-cols-[210px_1fr]">
                  <p className="text-sm font-medium text-[#334155]">Email</p>
                  <a href={`mailto:${email}`} className="break-all text-sm text-[#1d4ed8] hover:underline">
                    {email}
                  </a>
                </div>
              ) : null}

              {mapEmbedUrl ? (
                <div className="mt-2 overflow-hidden rounded-lg border border-[#cbd5e1]">
                  <iframe
                    src={mapEmbedUrl}
                    title={`${post.title} map`}
                    className="h-64 w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-3xl font-semibold tracking-tight">About</h2>
            <RichContent html={descriptionHtml} className="mt-4 max-w-4xl text-[#334155]" />
            {highlights.length ? (
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {highlights.slice(0, 4).map((item) => (
                  <div key={item} className="rounded-md border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-sm text-[#334155]">
                    {item}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {images.length ? (
            <div className="mt-7">
              <h2 className="text-2xl font-semibold tracking-tight">Photos</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {images.map((image, index) => (
                  <Dialog key={`${image}-${index}`}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[#cbd5e1] bg-[#f8fafc] text-left"
                      >
                        <ContentImage
                          src={image}
                          alt={`${post.title} photo ${index + 1}`}
                          fill
                          className="object-cover transition duration-200 group-hover:scale-[1.03]"
                        />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none">
                      <DialogTitle className="sr-only">{`${post.title} photo ${index + 1}`}</DialogTitle>
                      <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-black/85">
                        <div className="relative aspect-[16/10] w-full">
                          <ContentImage
                            src={image}
                            alt={`${post.title} photo ${index + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {related.length ? (
          <section className="mt-12 sm:mt-14">
            <div className="flex items-end justify-between gap-3 border-b border-[#cbd5e1] pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">You may also like</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Nearby in this category</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cbd5e1] bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#475569] sm:text-xs">
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
