export const topics = ["Market", "Salaries", "Hiring", "Careers", "Firm"] as const;

export type Topic = (typeof topics)[number];

export const topicSlug = (topic: string) => topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const topicDescriptions: Record<Topic, string> = {
  Market: "What we are seeing across the sectors we recruit in, quarter by quarter.",
  Salaries: "Pay, bonus and equity data from the offers we negotiate.",
  Hiring: "How to run a senior hire well, from the brief to the first ninety days.",
  Careers: "Practical advice for people weighing up their next move.",
  Firm: "News from Roster: people, offices and the occasional opinion.",
};

/** The intro on the insights index. */
export const insightsDescription =
  "Market notes, salary data and hiring advice from the consultants running our searches.";

/** The call to action under every post. */
export const postCta = {
  title: "Hiring for a senior role?",
  body: "Talk to the consultant who covers your sector. Twenty minutes, no pitch deck, and an honest view of the market.",
  label: "Book a consultation",
  href: "/contact/#book",
};

/** Posts per page on the insights index and topic archives. */
export const POSTS_PER_PAGE = 9;
