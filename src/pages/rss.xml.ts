import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";
import { findPerson, getTeam } from "@/lib/content";
import { getPosts, postHref } from "@/lib/posts";

export const GET: APIRoute = async () => {
  const [posts, team] = await Promise.all([getPosts(), getTeam()]);
  return rss({
    title: `${siteConfig.name} insights`,
    description: siteConfig.description,
    site: siteConfig.siteUrl,
    items: posts.slice(0, 20).map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postHref(post),
      categories: [post.data.topic, ...post.data.tags],
      author: `${siteConfig.email} (${findPerson(team, post.data.author.id)?.data.name ?? siteConfig.name})`,
    })),
    customData: `<language>${siteConfig.language}</language>`,
  });
};
