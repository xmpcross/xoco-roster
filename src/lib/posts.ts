import { getCollection, type CollectionEntry } from "astro:content";
import { topicSlug } from "@/config/insights";
import { formatDate, getTeam, findPerson } from "@/lib/content";
import type { SearchItem } from "@/lib/search";

export type Post = CollectionEntry<"insights">;

export const postHref = (post: Post) => `/insights/${post.id}/`;
export const topicHref = (topic: string) => `/insights/topic/${topicSlug(topic)}/`;

const byNewest = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

/** Published posts, newest first. Drafts never leave the dev server. */
export async function getPosts() {
  const posts = await getCollection("insights", ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort(byNewest);
}

/** The featured post if one is flagged, the newest otherwise. */
export const leadPost = (posts: Post[]) => posts.find((post) => post.data.featured) ?? posts[0];

export { formatDate };

/** The team entry behind a post's byline. */
export async function postAuthor(post: Post) {
  return findPerson(await getTeam(), post.data.author.id);
}

/** Same topic first, then the newest of the rest. */
export const relatedPosts = (post: Post, posts: Post[], count = 3) => {
  const others = posts.filter((other) => other.id !== post.id);
  const sameTopic = others.filter((other) => other.data.topic === post.data.topic);
  const rest = others.filter((other) => other.data.topic !== post.data.topic);
  return [...sameTopic, ...rest].slice(0, count);
};

export async function searchItems(posts: Post[]): Promise<SearchItem[]> {
  const team = await getTeam();
  return posts.map((post) => ({
    title: post.data.title,
    description: post.data.description,
    href: postHref(post),
    topic: post.data.topic,
    author: findPerson(team, post.data.author.id)?.data.name ?? "",
    date: formatDate(post.data.date),
    tags: post.data.tags,
  }));
}
