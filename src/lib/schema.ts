import { siteConfig } from "@/config/site";
import { jobHref, type Job } from "@/lib/content";
import { postHref, type Post } from "@/lib/posts";

const absolute = (path: string) => new URL(path, siteConfig.siteUrl).toString();

const organization = {
  "@type": "EmploymentAgency",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  logo: absolute(siteConfig.socialImage),
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: siteConfig.socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
};

const breadcrumbs = (items: [name: string, path: string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item: absolute(path),
  })),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    { ...organization, "@id": absolute("/#organization") },
    {
      "@type": "WebSite",
      "@id": absolute("/#website"),
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { "@id": absolute("/#organization") },
    },
  ],
});

export const articleSchema = (post: Post, image: string, author: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      headline: post.data.title,
      description: post.data.description,
      image: absolute(image),
      datePublished: post.data.date.toISOString(),
      dateModified: (post.data.updated ?? post.data.date).toISOString(),
      author: { "@type": "Person", name: author },
      publisher: organization,
      articleSection: post.data.topic,
      keywords: post.data.tags.join(", ") || undefined,
      mainEntityOfPage: absolute(postHref(post)),
      inLanguage: siteConfig.language,
    },
    breadcrumbs([
      ["Home", "/"],
      ["Insights", "/insights/"],
      [post.data.title, postHref(post)],
    ]),
  ],
});

const unitText: Record<string, string> = { year: "YEAR", day: "DAY", hour: "HOUR" };
const types: Record<string, string> = {
  Permanent: "FULL_TIME",
  Contract: "CONTRACTOR",
  Interim: "TEMPORARY",
};

/** Google for Jobs reads this. Remote roles are marked TELECOMMUTE with the country as the eligible area. */
export const jobSchema = (job: Job, description: string) => {
  const { data } = job;
  const remote = data.workMode === "Remote";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "JobPosting",
        title: data.title,
        description,
        identifier: { "@type": "PropertyValue", name: siteConfig.name, value: data.ref },
        datePosted: data.posted.toISOString().slice(0, 10),
        validThrough: data.closes?.toISOString(),
        employmentType: types[data.type],
        hiringOrganization: {
          "@type": "Organization",
          name: `${data.client} (via ${siteConfig.name})`,
          sameAs: siteConfig.siteUrl,
        },
        ...(remote
          ? {
              jobLocationType: "TELECOMMUTE",
              applicantLocationRequirements: { "@type": "Country", name: data.country },
            }
          : {
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: data.location,
                  addressCountry: data.country,
                },
              },
            }),
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: data.salary.currency,
          value: {
            "@type": "QuantitativeValue",
            minValue: data.salary.min,
            maxValue: data.salary.max,
            unitText: unitText[data.salary.period],
          },
        },
        url: absolute(jobHref(job)),
      },
      breadcrumbs([
        ["Home", "/"],
        ["Jobs", "/jobs/"],
        [data.title, jobHref(job)],
      ]),
    ],
  };
};
