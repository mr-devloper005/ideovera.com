import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  const desc =
    query
      ? `Results for “${query}” — across listings, classifieds, and other connected content types.`
      : "Search the full Ideovera index: businesses, short offers, media, and more — one field, every task the platform exposes.";

  return (
    <PageShell
      title="Search"
      description={desc}
      actions={
        <form action="/search" className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0d9488]" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Keywords, business name, category…"
              className="h-11 border-[#b6e2da] pl-9 focus-visible:ring-[#0d9488]"
            />
          </div>
          <Button type="submit" className="h-11 bg-[#0d9488] text-white hover:bg-[#0f7669]">
            Search
          </Button>
        </form>
      }
    >
      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        <span className="text-[#3d5c58]">Quick open:</span>
        <Link href="/listings" className="font-medium text-[#0d9488] hover:underline">
          Business listings
        </Link>
        <span className="text-[#3d5c58]">·</span>
        <Link href="/classifieds" className="font-medium text-[#0d9488] hover:underline">
          Classifieds
        </Link>
        <span className="text-[#3d5c58]">·</span>
        <Link href="/search?master=1" className="font-medium text-[#0d9488] hover:underline">
          Browse all (no query)
        </Link>
      </div>
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const task = getPostTaskKey(post);
            const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#0d9488]/30 bg-[#f4fcfa]/60 p-10 text-center text-sm text-[#3d5c58]">
          No matches for that query yet. Try a shorter keyword, check spelling, or start from a category on the{' '}
          <Link className="font-semibold text-[#0d9488] hover:underline" href="/listings">
            listings
          </Link>{' '}
          or{' '}
          <Link className="font-semibold text-[#0d9488] hover:underline" href="/classifieds">
            classifieds
          </Link>{' '}
          page.
        </div>
      )}
    </PageShell>
  );
}
