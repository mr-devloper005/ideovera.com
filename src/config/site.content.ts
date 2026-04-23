import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Listings & local discovery',
  },
  footer: {
    tagline: 'Listings & local discovery',
  },
  hero: {
    badge: 'Discover · compare · act',
    title: ['A calmer way to', 'scan listings and local offers.'],
    description:
      'Ideovera is a directory-style marketplace: clear photos, location cues, and quick paths to the details you care about.',
    primaryCta: {
      label: 'Browse business listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'View classifieds',
      href: '/classifieds',
    },
    searchPlaceholder: 'Search listings, businesses, and categories',
    focusLabel: 'Narrow by category',
    featureCardBadge: 'Featured rotation',
    featureCardTitle: 'A horizontal strip of top picks — built for quick scanning, not magazine cover stories.',
    featureCardDescription: 'The feed stays data-forward so you can compare at a glance without wading through filler.',
  },
  directory: {
    heroBadge: 'Listings & marketplace',
    searchPrompt: 'What do you need today?',
    locationPrompt: 'Area or city',
    categoryLabel: 'Browse lanes',
    featuredEyebrow: 'Featured',
    featuredTitle: 'Listings to shortlist first',
    featuredCta: 'View all in directory',
    splitEyebrow: 'Cross-surface',
    splitTitle: 'Listings, profiles, and other formats share one design language',
    bentoKicker: 'Clarity, not noise',
    bentoTitle: 'A bento layout that keeps comparison simple',
    bentoBullets: [
      'Horizontal “featured” lane for high-signal items.',
      'Cards with soft depth, big radius, and metadata you can trust.',
      'Listings and classifieds stay distinct while feeling like one product.',
    ],
  },
  home: {
    metadata: {
      title: 'Ideovera — listings and local discovery on ideovera.com',
      description:
        'Browse business listings, compare categories, and move fast with a marketplace UI tuned for ideovera.com — without noisy feeds or generic “story” framing.',
      openGraphTitle: 'Ideovera — listings & local discovery',
      openGraphDescription:
        'A teal-forward directory experience for business listings, classifieds, and trusted discovery on ideovera.com.',
      keywords: [
        'ideovera.com',
        'business listings',
        'local directory',
        'classifieds',
        'marketplace',
        'real estate listings',
        'service directory',
      ],
    },
    introBadge: 'Why Ideovera',
    introTitle: 'A discovery surface for listings, not a repurposed blog homepage.',
    introParagraphs: [
      'The homepage is tuned for people who are hunting for a business, a space, or a fast offer: wide cards, scannable text, and obvious category lanes.',
      'We keep the layout modular so the same system can show listings, short classified-style posts, and other tasks without every section looking identical.',
      'Under the hood, every task and route the platform provides stays available — the UI simply prioritises what you came here to do: find and compare quickly.',
    ],
    sideBadge: 'Signals at a glance',
    sidePoints: [
      'Teal-forward marketplace look with bento cards and a horizontal featured lane.',
      'Listings and classifieds get top billing in navigation; everything else remains reachable from search and the footer.',
      'Motion stays light, CSS-driven, and tuned for performance on real devices.',
      'The copy and visuals are Ideovera-specific: no “magazine / visual identity” hand‑waving from a cloned template.',
    ],
    primaryLink: {
      label: 'Open business listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Search the site',
      href: '/search',
    },
  },
  cta: {
    badge: 'List or claim a business',
    title: 'Add a listing, manage saves, and keep your presence consistent across Ideovera.',
    description:
      'Start with a free account to post and track listings, then use search and direct URLs to reach the rest of the platform’s tasks when you need them.',
    primaryCta: {
      label: 'Create an account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Editorial and long reads on Ideovera',
    description: 'Articles and explainers on ideovera.com — read at your pace while listings stay a click away.',
  },
  listing: {
    title: 'Business & service listings on Ideovera',
    description: 'Scan structured business listings on ideovera.com: categories, contact cues, and map-ready details.',
  },
  classified: {
    title: 'Classifieds and short offers on Ideovera',
    description: 'Faster, offer-first posts on ideovera.com: deals, jobs, and timely notices next to the main directory.',
  },
  image: {
    title: 'Image posts on Ideovera',
    description: 'Visual-first posts on ideovera.com for galleries, hero shots, and media-led discovery.',
  },
  profile: {
    title: 'Public profiles on Ideovera',
    description: 'People and business profile pages on ideovera.com with trust surfaces tied back to listings.',
  },
  sbm: {
    title: 'Saved links and research on Ideovera',
    description: 'Curated bookmarks and resources on ideovera.com in a calmer, text-first layout.',
  },
  pdf: {
    title: 'Documents and PDFs on Ideovera',
    description: 'Downloadable files and PDF resources on ideovera.com, linked to the same discovery system.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside articles, listings, and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
