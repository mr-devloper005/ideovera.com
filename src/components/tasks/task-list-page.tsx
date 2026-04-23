import Link from 'next/link'
import { ArrowRight, BookOpen, Building2, FileText, Image as ImageIcon, LayoutGrid, Sparkles, Tag, User, Zap } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { PageShell } from '@/components/shared/page-shell'
import { Button } from '@/components/ui/button'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory':
    'bg-[radial-gradient(ellipse_100%_70%_at_0%_0%,rgba(13,148,136,0.09),transparent_55%),linear-gradient(180deg,#eef8f4_0%,#ffffff_48%,#f3f5f4_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#dff5ef_0%,#ffffff_55%)]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f7f1ea_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#09101d_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#07111f_0%,#13203a_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#0a1120_0%,#101c34_100%)] text-white',
  'profile-business': 'bg-[radial-gradient(ellipse_60%_40%_at_0%_0%,rgba(13,148,136,0.06),transparent),linear-gradient(180deg,#f2faf7_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(251,191,36,0.12),transparent),linear-gradient(180deg,#fff8ec_0%,#ffffff_100%)]',
  'classified-market':
    'bg-[radial-gradient(ellipse_100%_60%_at_100%_0%,rgba(245,158,11,0.14),transparent_50%),linear-gradient(180deg,#fff5e6_0%,#fffcf5_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ee_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f8fc_0%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const isClassifiedLayout = layoutKey === 'classified-market' || layoutKey === 'classified-bulletin'
  const ideoveraList = {
    muted: 'text-[#3d5c58]',
    panel: 'border border-[#b6e2da]/80 bg-white shadow-[0_24px_60px_rgba(13,148,136,0.07)]',
    soft: 'border border-[#bfe8e0]/90 bg-white/80 backdrop-blur-sm',
    input: 'border border-[#b6e2da] bg-white text-[#0f1a19]',
    button: 'bg-[#0d9488] text-white hover:bg-[#0f7669]',
  }
  const ideoveraClassified = {
    muted: 'text-[#8a5b18]',
    panel: 'border border-amber-200/80 bg-white shadow-[0_20px_55px_rgba(180,83,9,0.08)]',
    soft: 'border border-amber-200/80 bg-amber-50/70',
    input: 'border border-amber-200 bg-white text-amber-950',
    button: 'bg-amber-600 text-white hover:bg-amber-700',
  }
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#72594a]',
          panel: 'border border-[#dbc6b6] bg-white/90',
          soft: 'border border-[#dbc6b6] bg-[#fff8ef]',
          input: 'border border-[#dbc6b6] bg-white text-[#2f1d16]',
          button: 'bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
        }
      : isClassifiedLayout
        ? ideoveraClassified
        : ideoveraList

  if (task === 'article' || task === 'classified') {
    const isArticle = task === 'article'
    const pageTitle = taskConfig?.label || (isArticle ? 'Articles' : 'Classifieds')
    const pageDescription =
      taskConfig?.description ||
      (isArticle ? 'Long-form guides and stories on ideovera.com, with the same clear teal layout as the rest of the site.' : 'Short offers, notices, and local deals in a scannable grid.')

    return (
      <PageShell
        title={pageTitle}
        description={pageDescription}
        actions={
          <>
            <Button variant="outline" className="border-[#0d9488]/30 text-[#0f1a19] hover:bg-[#e8f7f4]" asChild>
              <Link href="/listings">Business listings</Link>
            </Button>
            <Button className="bg-[#0d9488] text-white hover:bg-[#0f7669]" asChild>
              <Link href="/search">Search site</Link>
            </Button>
          </>
        }
      >
        <SchemaJsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${pageTitle} | ${SITE_CONFIG.name}`,
            url: `${baseUrl}${taskConfig?.route || ''}`,
            hasPart: schemaItems,
          }}
        />

        {isArticle ? (
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-[#b6e2da] bg-gradient-to-br from-white to-[#f0faf7] p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0d9488]/20 bg-[#0d9488]/10 px-3 py-1 text-xs font-semibold text-[#0d4f4a]">
                  <FileText className="h-3.5 w-3.5" aria-hidden />
                  Editorial on Ideovera
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Room for real reading, not a squeezed feed</h2>
                <p className="mt-3 text-sm leading-7 text-[#3d5c58]">
                  Articles on {SITE_CONFIG.name} use the same bento-style framing as the About page: calmer type rhythm, space for context, and obvious
                  next steps to listings, search, and other tasks.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  { label: 'Pacing', value: 'Long-form first' },
                  { label: 'Context', value: 'Category + tags' },
                  { label: 'Journey', value: 'Search ready' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-[#0d9488]/15 bg-[#f4fcfa] p-4">
                    <p className="text-lg font-semibold text-[#0f1a19]">{s.value}</p>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#3d5c58]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">Why it feels different from listings</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {[
                  { title: 'Slower, clearer hierarchy', body: 'Headlines and intros get room so readers can orient before they click through.', icon: BookOpen },
                  { title: 'Tied to discovery', body: 'The same account can publish articles and listings without switching to a “blog” product.', icon: Sparkles },
                  { title: 'Filter without losing pace', body: 'Category filters keep topic lanes distinct without defaulting to one generic card size.', icon: Zap },
                ].map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-[#b6e2da]/80 bg-white p-5 transition hover:shadow-md hover:shadow-teal-900/5"
                  >
                    <p.icon className="h-5 w-5 text-[#0d9488]" aria-hidden />
                    <h4 className="mt-3 font-semibold text-[#0f1a19]">{p.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#3d5c58]">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#b6e2da]/60 bg-gradient-to-b from-white to-[#f4fcfa]/40 p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-[#0f1a19]">Narrow by category</h3>
              <p className="mt-1 text-sm text-[#3d5c58]">Jump to a topic; the list below updates with the same logic as before.</p>
              <form className="mt-4 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end" action={taskConfig?.route || '#'}>
                <div className="min-w-0 flex-1">
                  <label className="text-xs uppercase tracking-[0.15em] text-[#3d5c58]">Category</label>
                  <select
                    name="category"
                    defaultValue={normalizedCategory}
                    className="mt-1.5 h-11 w-full rounded-xl border border-[#b6e2da] bg-white px-3 text-sm text-[#0f1a19]"
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="h-11 bg-[#0d9488] text-white hover:bg-[#0f7669]">
                  Apply
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-br from-white to-amber-50/40 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100/60 px-3 py-1 text-xs font-semibold text-amber-900">
                  <Tag className="h-3.5 w-3.5" aria-hidden />
                  Classifieds lane
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Faster, warmer posts than the main directory</h2>
                <p className="mt-3 text-sm leading-7 text-amber-950/80">
                  Notices, deals, and short promos get an amber-tinted lane so you never mistake them for long business listings. Layout matches the
                  Ideovera “about” grid — bento cards, clear CTAs, and obvious paths to search.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  { label: 'Layout', value: '3-up grid' },
                  { label: 'Tone', value: 'Urgent, short' },
                  { label: 'Path', value: 'Listings nearby' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-4"
                  >
                    <p className="text-lg font-semibold text-amber-950">{s.value}</p>
                    <p className="text-xs font-medium uppercase tracking-wide text-amber-900/70">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Today', 'Local', 'Deals'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-amber-200/90 bg-amber-50/90 px-3 py-1 text-xs font-medium text-amber-900/90"
                >
                  {t}
                </span>
              ))}
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">Classifieds vs listings</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {[
                  { title: 'Bigger card snippets', body: 'Three columns on wide screens so titles and first lines are easier to scan quickly.', icon: Zap },
                  { title: 'Same account', body: 'You can run listings and offers without leaving the same Ideovera profile and navigation.', icon: Sparkles },
                  { title: 'Filters in one row', body: 'Category and topic filters use the same backend behavior — only the presentation layer changed.', icon: Tag },
                ].map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-[#b6e2da]/80 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <p.icon className="h-5 w-5 text-[#0d9488]" aria-hidden />
                    <h4 className="mt-3 font-semibold text-[#0f1a19]">{p.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-[#3d5c58]">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200/50 bg-amber-50/30 p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-amber-950">Filter by category</h3>
              <p className="mt-1 text-sm text-amber-950/75">Tight, offer-first browsing — form behavior is unchanged.</p>
              <form className="mt-4 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-end" action={taskConfig?.route || '#'}>
                <div className="min-w-0 flex-1">
                  <label className="text-xs uppercase tracking-[0.15em] text-amber-900/80">Category</label>
                  <select
                    name="category"
                    defaultValue={normalizedCategory}
                    className="mt-1.5 h-11 w-full rounded-xl border border-amber-200 bg-white px-3 text-sm text-amber-950"
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="h-11 bg-amber-600 text-white hover:bg-amber-700">
                  Apply
                </Button>
              </form>
            </div>
          </div>
        )}

        {intro ? (
          <div className="mt-8 border-t border-[#0d9488]/10 pt-8">
            <h2 className="text-lg font-semibold text-[#0f1a19]">{intro.title}</h2>
            <div className="mt-4 space-y-3">
              {intro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-sm leading-7 text-[#3d5c58]">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-[#0d9488]">
              {intro.links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:underline">
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 border-t border-[#0d9488]/10 pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0d9488]">Latest posts</h2>
          <p className="mt-1 text-sm text-[#3d5c58]">Same feed as before — with the updated layout on this page only.</p>
          <div className="mt-6">
            <TaskListClient
              task={task}
              initialPosts={posts}
              category={normalizedCategory}
              gridClassName={
                isArticle
                  ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
              }
            />
          </div>
        </div>
      </PageShell>
    )
  }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.78fr] lg:items-stretch">
            <div className={`rounded-[1.8rem] p-7 sm:p-8 ${ui.panel}`}>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#0d9488]">
                <Icon className="h-4 w-4" />
                {taskConfig?.label || task}
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>
                Directory view for {SITE_CONFIG.name}: scan cards in a four-column grid on large screens, filter by category, or jump to search when you know the keyword.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold ${ui.button}`}>
                  Scroll results
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold ${ui.soft}`}>
                  Site search
                </Link>
              </div>
            </div>
            <form className={`grid h-full content-start gap-3 rounded-[1.8rem] p-6 sm:p-7 ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/60 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-800/80">{taskConfig?.label || task}</p>
                <h1 className="mt-1 max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-amber-950 sm:text-3xl">
                  Offers & notices — a tighter, warmer grid than the main business directory
                </h1>
              </div>
              <div className="hidden gap-1 sm:flex">
                {['Today', 'Local', 'Deals'].map((t) => (
                  <span key={t} className="rounded-full border border-amber-200/90 bg-amber-50/90 px-3 py-1 text-xs font-medium text-amber-900/90">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {['Faster to scroll than listings', 'Fewer columns = bigger snippets', 'Amber lane so you never mistake it for the directory'].map((item) => (
                <div key={item} className="rounded-2xl border border-amber-200/50 bg-amber-50/40 p-4 text-sm font-medium text-amber-950/90">
                  {item}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient
          task={task}
          initialPosts={posts}
          category={normalizedCategory}
          gridClassName={
            layoutKey === 'classified-market' || layoutKey === 'classified-bulletin'
              ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
              : undefined
          }
        />
      </main>
      <Footer />
    </div>
  )
}
