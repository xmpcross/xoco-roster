import { getCollection, type CollectionEntry } from "astro:content";
import { siteConfig } from "@/config/site";

export type Job = CollectionEntry<"jobs">;
export type Person = CollectionEntry<"team">;
export type Placement = CollectionEntry<"placements">;

export const jobHref = (job: Job) => `/jobs/${job.id}/`;
export const sectorHref = (id: string) => `/sectors/${id}/`;
export const personHref = (person: Person) => `/team/${person.id}/`;
export const placementHref = (placement: Placement) => `/placements/${placement.id}/`;

/** Published jobs, newest first. Drafts never leave the dev server. */
export async function getJobs() {
  const jobs = await getCollection("jobs", ({ data }) => import.meta.env.DEV || !data.draft);
  return jobs.sort((a, b) => b.data.posted.getTime() - a.data.posted.getTime());
}

export async function getSectors() {
  const sectors = await getCollection("sectors");
  return sectors.sort((a, b) => a.data.order - b.data.order);
}

export async function getTeam() {
  const team = await getCollection("team");
  return team.sort((a, b) => a.data.order - b.data.order);
}

export async function getPlacements() {
  const placements = await getCollection("placements");
  return placements.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export const findPerson = (team: Person[], id: string) => team.find((person) => person.id === id);

const symbols: Record<string, string> = { GBP: "£", USD: "$", EUR: "€" };
const periods: Record<string, string> = { year: "a year", day: "a day", hour: "an hour" };

const amount = (value: number, currency: string, short: boolean) => {
  const symbol = symbols[currency] ?? `${currency} `;
  if (short && value >= 1000) return `${symbol}${Math.round(value / 1000)}k`;
  return `${symbol}${value.toLocaleString("en-GB")}`;
};

/** "£220k–£260k", or "£900–£1,100/day" for day rates; `long` spells everything out. */
export function formatSalary(salary: Job["data"]["salary"], { long = false } = {}) {
  const short = !long && salary.period === "year";
  const range =
    salary.min === salary.max
      ? amount(salary.min, salary.currency, short)
      : `${amount(salary.min, salary.currency, short)}–${amount(salary.max, salary.currency, short)}`;
  if (salary.period === "year" && !long) return range;
  return long ? `${range} ${periods[salary.period]}` : `${range}/${salary.period}`;
}

export const currencySymbol = (currency: string) => symbols[currency] ?? currency;

const dateFormat = new Intl.DateTimeFormat(siteConfig.dateLocale, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const shortDate = new Intl.DateTimeFormat(siteConfig.dateLocale, {
  day: "numeric",
  month: "short",
});

export const formatDate = (date: Date) => dateFormat.format(date);
export const formatShortDate = (date: Date) => shortDate.format(date);

/** Counts of each value, for filter facets. */
export const tally = <T extends string>(values: T[]) =>
  values.reduce<Record<string, number>>((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1;
    return counts;
  }, {});
