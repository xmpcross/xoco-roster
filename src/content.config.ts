import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { topics } from "@/config/insights";
import { currencies, employmentTypes, salaryPeriods, seniorities, workModes } from "@/config/jobs";

/** Folder entries (`<slug>/index.md`) take the folder name as their id. */
const folderId = ({ entry }: { entry: string }) => entry.replace(/\/index\.mdx?$/, "");

const jobs = defineCollection({
  loader: glob({ base: "./src/content/jobs", pattern: "*.{md,mdx}" }),
  schema: z.object({
    title: z.string().max(90),
    /** Shown on the job and quoted in applications. */
    ref: z.string(),
    sector: reference("sectors"),
    /** How the client is described. Most searches are confidential, so a descriptor rather than a name. */
    client: z.string(),
    location: z.string(),
    /** ISO 3166 country code, for the job's structured data. */
    country: z.string().length(2),
    workMode: z.enum(workModes),
    type: z.enum(employmentTypes),
    seniority: z.enum(seniorities),
    salary: z.object({
      min: z.number().positive(),
      max: z.number().positive(),
      currency: z.enum(currencies),
      period: z.enum(salaryPeriods).default("year"),
      /** Anything on top of base, e.g. "+ bonus + equity". */
      note: z.string().optional(),
    }),
    consultant: reference("team"),
    posted: z.coerce.date(),
    closes: z.coerce.date().optional(),
    summary: z.string().min(40).max(240),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const sectors = defineCollection({
  loader: glob({ base: "./src/content/sectors", pattern: "*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** The short name used in filters and tags. */
      short: z.string(),
      order: z.number().int(),
      /** A Lucide icon name from `src/icons/lucide`, shown on job cards. */
      icon: z.string().default("briefcase"),
      summary: z.string().max(160),
      description: z.string().min(40).max(220),
      image: image(),
      imageAlt: z.string(),
      imageCredit: z.object({ name: z.string(), url: z.url() }).optional(),
      lead: reference("team"),
      specialisms: z.array(z.string()).min(3),
      stats: z.array(z.object({ value: z.string(), label: z.string() })).length(3),
    }),
});

const team = defineCollection({
  loader: glob({ base: "./src/content/team", pattern: "*/index.{md,mdx}", generateId: folderId }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      order: z.number().int(),
      office: z.string(),
      sectors: z.array(reference("sectors")).min(1),
      /** One line under the name on cards. */
      focus: z.string(),
      photo: image(),
      photoAlt: z.string(),
      photoCredit: z.object({ name: z.string(), url: z.url() }).optional(),
      email: z.email(),
      phone: z.string(),
      linkedin: z.url().optional(),
      /** A personal Cal.com or Calendly link. Left off, the button goes to the contact page. */
      booking: z.url().optional(),
      joined: z.number().int(),
      placements: z.number().int(),
    }),
});

const placements = defineCollection({
  loader: glob({ base: "./src/content/placements", pattern: "*.{md,mdx}" }),
  schema: z.object({
    title: z.string().max(110),
    role: z.string(),
    client: z.string(),
    sector: reference("sectors"),
    location: z.string(),
    consultant: reference("team"),
    date: z.coerce.date(),
    summary: z.string().min(40).max(240),
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .min(2)
      .max(4),
    quote: z.object({ text: z.string(), name: z.string(), role: z.string() }).optional(),
    featured: z.boolean().default(false),
  }),
});

const insights = defineCollection({
  loader: glob({
    base: "./src/content/insights",
    pattern: "*/index.{md,mdx}",
    generateId: folderId,
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100),
      description: z.string().min(40).max(220),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      topic: z.enum(topics),
      author: reference("team"),
      cover: image(),
      coverAlt: z.string(),
      /** Photographer and source, printed under the cover on the post. */
      coverCredit: z.object({ name: z.string(), url: z.url() }).optional(),
      tags: z.array(z.string()).default([]),
      /**
       * The call-to-action panel. Left off, it closes the post with the copy in
       * `src/config/insights.ts`. `after: 2` moves it below the second `##` section;
       * the other fields override its copy; `false` removes it.
       */
      cta: z
        .union([
          z.literal(false),
          z.object({
            after: z.number().int().min(1).optional(),
            title: z.string().optional(),
            body: z.string().optional(),
            label: z.string().optional(),
            href: z.string().optional(),
          }),
        ])
        .optional(),
      /** Pins the post to the lead slot on the insights index. */
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { jobs, sectors, team, placements, insights };
