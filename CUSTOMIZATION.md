# Customization Guide

Use this guide when adapting Roster for a real firm.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the firm name (used in page titles, the feed, the structured data, and wherever the copy names the firm), tagline, default metadata, canonical domain, language and date locale, the founding year in the footer, the main email and phone, offices, calls to action, forms, booking, the salary report, the newsletter, social links, and the legal links in the footer.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

`siteConfig.offices` lists each office with a `city`, a `timeZone` (an IANA name such as `Europe/London`), an `address` as an array of lines, a `phone`, and an `email`. Offices appear with a live clock on the contact page and group the consultants page. A consultant's `office` must match a `city` here.

`siteConfig.actions` holds the calls to action used across the site:

- `employer` is the "Submit a vacancy" button in the header, the mobile menu, and the closing panel.
- `candidate` is "Register your CV".
- `jobs` is "Search jobs".
- `book` is "Book a consultation", in the hero, the closing panel, and on consultant buttons that have no personal booking link.

`siteConfig.socials` are the icon links in the footer, each with a `label` and an `href`. The label picks the icon through [src/lib/socials.ts](./src/lib/socials.ts), which knows Bluesky, Facebook, GitHub, Instagram, LinkedIn, Mastodon, RSS, Threads, X, and YouTube; any other label shows a generic link icon. Links that start with `http` are also listed as `sameAs` in the structured data.

The logo and logomark are SVGs in [src/assets/brand](./src/assets/brand): `logo.svg` is the mark and the wordmark, with the wordmark drawn in `currentColor`, and `logomark.svg` is the mark alone in `currentColor`. [src/components/ui/Wordmark.astro](./src/components/ui/Wordmark.astro) inlines the wordmark in the header and the footer. Replace the files with your own and keep `fill="currentColor"` on the root `<svg>`. Right-clicking the logo opens [src/components/chrome/LogoMenu.astro](./src/components/chrome/LogoMenu.astro) to copy or download it; the downloaded copy is filled with `#0c0c0d`. The favicon is [public/favicon.svg](./public/favicon.svg).

## Navigation and Mega Menus

The header, its mega menus, and the mobile menu all read `navigation` in [src/config/site.ts](./src/config/site.ts). Each entry is either a plain link or a menu:

```ts
{ label: "Jobs", href: "/jobs/" },
{
  label: "Sectors",
  feature: "roles",
  columns: [
    { title: "Practices", sectors: true },
    {
      title: "Across sectors",
      links: [{ label: "Salary guide", href: "/salary-guide/", description: "Bands for 120 senior roles", icon: "chart-line" }],
    },
  ],
},
```

- A column takes `links`, or `sectors: true` to list every sector with its live role count.
- `icon` is a file name from [src/icons/lucide](./src/icons/lucide).
- `feature` picks the panel on the right: `roles` the three newest jobs, `placement` the first featured case study, `salary` the salary report download, and `team` the consultants.

An open menu drops full width from the header bar as one white panel. The menus open on click and on hover with a short intent delay. `Arrow Down` on a trigger opens a menu and focuses its first link, and `Escape`, a click outside, or tabbing away closes it. The header slides away as you scroll down and returns as you scroll up. Below `64rem` the same entries render as a full-screen menu.

The footer columns are `footerNavigation` in the same file.

## Forms

Every form posts to an endpoint set in `siteConfig.forms`:

| Form               | Key          | Where                        |
| ------------------ | ------------ | ---------------------------- |
| Job application    | `apply`      | Every job page               |
| Vacancy brief      | `vacancy`    | `/employers/submit-vacancy/` |
| Candidate register | `register`   | `/candidates/register/`      |
| Contact            | `contact`    | `/contact/`                  |
| Salary report      | `report`     | Salary guide                 |
| Newsletter         | `newsletter` | Footer                       |

```ts
forms: {
  apply: { action: "https://formspree.io/f/xxxxxxx", method: "post" },
  // ...
}
```

While `action` is empty a form runs in **demo mode**: it validates in the browser and then shows its success message without sending anything, so every flow can be tried in the preview. Set `action` to any provider that accepts a normal form post (Formspree, Basin, Netlify Forms, your own endpoint) and the form submits for real. The apply, vacancy, and register forms send files (`enctype="multipart/form-data"`), so pick a provider that accepts uploads, or replace the file fields with a link field.

The behaviour is in [src/scripts/forms.ts](./src/scripts/forms.ts). Any form with `data-form` gets it: `data-demo` turns on demo mode, `[data-step]` fieldsets become a stepper with `[data-next]` and `[data-prev]` buttons, `[data-summary]` lists the answers before sending, and `[data-form-success]` is shown after sending. Without JavaScript every step is visible and the form posts normally.

Field values follow the copy in [src/config/jobs.ts](./src/config/jobs.ts) (`applyCopy`), [src/config/employers.ts](./src/config/employers.ts) (`vacancy`), and [src/config/candidates.ts](./src/config/candidates.ts) (`register`), including the consent text.

## Booking

The consultation panel at `/contact/#book` reads `siteConfig.booking`. Set `embedUrl` to a Cal.com or Calendly scheduling link and the panel embeds it. Left empty, the panel shows a slot picker: the visitor picks an office, a day in the next `slots.days` working days, and a time between `slots.from` and `slots.to`, and the choice fills the "Preferred call time" field of the contact form. The hours and step are in [src/config/contact.ts](./src/config/contact.ts).

Each consultant can also have a personal `booking` link in their frontmatter; their "Book a call" buttons use it, and fall back to `siteConfig.actions.book`.

## Jobs

Jobs are Markdown files in [src/content/jobs](./src/content/jobs). The file name is the URL: `chief-risk-officer-challenger-bank.md` becomes `/jobs/chief-risk-officer-challenger-bank/`.

```yaml
---
title: Chief Financial Officer
ref: RS-2041
sector: financial-services # a file name in src/content/sectors
client: Series D healthtech, 400 people
location: London
country: GB # ISO code, for structured data
workMode: Hybrid # On-site, Hybrid or Remote
type: Permanent # Permanent, Contract or Interim
seniority: C-suite # Board, C-suite, Director, Senior or Mid-level
salary:
  min: 220000
  max: 260000
  currency: GBP # GBP, USD or EUR
  period: year # year, day or hour
  note: "+ bonus + equity"
consultant: clara-lindqvist # a folder name in src/content/team
posted: 2026-10-01
closes: 2026-11-07 # optional
summary: One or two sentences for lists and search results.
featured: true # shown on the home page
draft: false
---
```

The body is the full description; the demo uses "The role", "What you will do", "What you will bring", and "The package". The lists of work modes, contract types, levels, and currencies are in [src/config/jobs.ts](./src/config/jobs.ts); change them there and the filters and forms follow.

The board at `/jobs/` renders every job as HTML and filters in the browser: keyword search over the title, client, summary, reference, location and sector, filters for sector, location, work mode, contract and level with live counts, and sorting by newest, highest pay, or title. Every filter is kept in the URL, so links such as `/jobs/?sector=technology&mode=Remote` or `/jobs/?q=interim` land pre-filtered. "Highest pay" annualises day and hourly rates and converts currencies with the rough figures in `sortRates`; they never show on the page. Without JavaScript the full list is shown. The board is not paginated, so it suits up to a few hundred live roles.

Each job page carries `JobPosting` structured data for Google for Jobs, with the salary, location (or `TELECOMMUTE` for remote roles), dates, and the reference. Remove a job when it is filled, or give it a `closes` date.

## Sectors

Sectors are Markdown files in [src/content/sectors](./src/content/sectors), each with a `title`, a `short` name for filters and tags, an `order`, an optional `icon` (a Lucide file name, shown on job cards and practice cards), a one-line `summary`, a meta `description`, an `image` from [src/assets/sectors](./src/assets/sectors) with `imageAlt` and `imageCredit`, a `lead` consultant, a list of `specialisms`, and exactly three `stats`. The body is the practice description.

Each sector page gathers its live roles, the salary bands for its roles from the salary guide, its case studies, and every consultant who lists the sector.

## Consultants

Each consultant is a folder in [src/content/team](./src/content/team) with an `index.md` and a `photo.jpg`. The folder name is the URL and the id that jobs, sectors, placements, and articles refer to. Frontmatter sets the `name`, `role`, `order`, `office`, `sectors`, a one-line `focus`, `photo` with `photoAlt` and `photoCredit`, `email`, `phone`, an optional `linkedin` and `booking` link, the year they `joined`, and their `placements` count. The body is the bio.

Use portrait photos with the face in the upper third; they are cropped to 4:5 with `object-top`.

## Placements

Case studies are Markdown files in [src/content/placements](./src/content/placements), each with a `title`, the `role`, a `client` descriptor, `sector`, `location`, `consultant`, `date`, `summary`, two to four `metrics` (the first is the big number on cards), an optional `quote` (`text`, `name`, `role`), and `featured` to show it on the home page and the employers page. The demo bodies use "The brief", "The search", and "The outcome".

## Salary Guide

The data is in [src/config/salaries.ts](./src/config/salaries.ts). `salaryCities` lists the cities with their currency. Each entry in `salaryRoles` has an `id`, a `title`, a `sector`, a typical `bonus`, the year-on-year `change` in per cent, and `bands` per city as `[lower quartile, median, upper quartile]` base salary in thousands. `salaryGuide` holds the page copy, the method note, and the headline `highlights`.

The page shows the calculator, then every sector's roles as range charts with a city switch. The calculator works in the browser only: pick a role and city, add a salary, and it estimates a percentile by interpolating between the quartiles. `/salary-guide/?role=cto&city=new-york` opens it preset.

The report download is `siteConfig.report`: `title` and `description` head the form on the salary guide, and `summary` is the short line in the Candidates menu. Set `file` to a PDF (for example `/downloads/salary-guide-2027.pdf` in `public/`) to offer a direct download in the success message; the form itself posts to `siteConfig.forms.report`.

## Homepage

The homepage is assembled in [src/pages/index.astro](./src/pages/index.astro) from sections in [src/components/home](./src/components/home), with copy in [src/config/home.ts](./src/config/home.ts):

| Section        | Component                         | Config key            |
| -------------- | --------------------------------- | --------------------- |
| Hero           | `Hero.astro`                      | `hero`                |
| Field of faces | `PeopleField.astro`               | `market`, `figures`   |
| Shortlist      | `Feature.astro` + `CandidateMock` | `features.shortlist`  |
| Process        | `Feature.astro` + `SearchMock`    | `features.process`    |
| Latest roles   | `LatestRoles.astro`               | `rolesSection`        |
| For candidates | `Feature.astro` + `MatchesMock`   | `features.candidates` |
| Salary         | `Feature.astro` + `SalaryMock`    | `features.salary`     |
| Practices      | `SectorIndex.astro`               | `sectorsSection`      |
| Placements     | `Placements.astro`                | `placementsSection`   |
| Consultants    | `Team.astro`                      | `teamSection`         |
| Insights       | `LatestInsights.astro`            | `insightsSection`     |
| Closing panel  | `ui/Closing.astro`                |                       |

- **Hero.** The words in `hero.highlight` are set in the accent colour inside `hero.headline`. The search bar posts to the jobs board with `q` and `location`; `hero.popular` are the chips under it, and `hero.clients` the logos below (file names from [src/assets/logos](./src/assets/logos)).
- **Product panels.** The hero and the four feature rows are illustrated with product-style panels in [src/components/mockups](./src/components/mockups): a search workspace, a candidate profile, a search tracker, a candidate's matched roles, and a salary check. They are decorative and hidden from screen readers. Their names, roles and numbers are in [src/config/showcase.ts](./src/config/showcase.ts); the matched roles are your newest jobs in `candidateView.sector`, the consultants come from `src/content/team`, and the salary check reads the CFO bands from the salary guide.
- **Field of faces.** Portraits from `portraits` in `showcase.ts` pop in and out across a field of dots, then settle still under reduced motion. Add or remove portraits there; the photos are in [src/assets/people](./src/assets/people) and are not the consultants.
- **Feature rows.** `Feature.astro` takes a `title`, `lead`, `points`, an optional `flip` to put the panel on the left, any panel as its default slot, and buttons in the `actions` slot. The employers page reuses the process row.

## Inner Pages

- **Employers** ([src/config/employers.ts](./src/config/employers.ts)): the hero, the client logos (file names from [src/assets/logos](./src/assets/logos)), four `services` with a timeline and fee model, the `promises` figures, and the FAQ. The `vacancy` object holds the vacancy form copy: the "what happens next" steps, urgency options, and services.
- **Candidates** ([src/config/candidates.ts](./src/config/candidates.ts)): the `promises`, the four `steps`, the FAQ, and the `register` form copy.
- **About** ([src/config/about.ts](./src/config/about.ts)): the intro, two photos with credits, the story, four principles (each with a Lucide `icon`), and the timeline.
- **Contact** ([src/config/contact.ts](./src/config/contact.ts)): the intro, the topics in "I'm writing about" (`?topic=hiring` preselects one), the direct `routes`, and the slot picker hours.
- **Privacy** ([src/pages/privacy.astro](./src/pages/privacy.astro)): sample text. Replace it with your own notice; forms link to `/privacy/` and `/privacy/#candidates`.

## Insights

Articles live in [src/content/insights](./src/content/insights), one folder per article with an `index.md` (or `index.mdx`) and its cover:

```yaml
---
title: "The 2027 salary outlook: where senior pay is still moving"
description: A one or two sentence summary.
date: 2026-09-29
topic: Salaries # Market, Salaries, Hiring, Careers or Firm
author: clara-lindqvist # a folder name in src/content/team
cover: ./cover.jpg
coverAlt: Describe the photo.
coverCredit:
  name: Photographer / Pexels
  url: https://www.pexels.com/photo/0000000/
tags: [salaries, london]
featured: true # the lead article on the index
cta: { after: 2 } # optional, see below
---
```

Topics and their descriptions, the index intro, and the call-to-action panel are in [src/config/insights.ts](./src/config/insights.ts). Each article closes with the panel; `cta: { after: 2 }` moves it below the second `##` section, the other `cta` fields override its copy, and `cta: false` removes it. The author's card under the article links to their profile.

Every article has a table of contents with scroll-spy, a reading-progress bar, and a Share button that opens [src/components/insights/ShareSheet.astro](./src/components/insights/ShareSheet.astro); job pages share the same sheet.

Search covers insights: the search field on the index, `Ctrl + K` or `Command + K`, or `/` opens the palette in [src/components/chrome/SearchDialog.astro](./src/components/chrome/SearchDialog.astro), and `/insights/search/` is a full results page. Both rank results with [src/lib/search.ts](./src/lib/search.ts), from an index at `/search-index.json`.

## Images

Photographs are imported through Astro's image pipeline, so they are resized and served as responsive sources. Sector images are in [src/assets/sectors](./src/assets/sectors), page photos in [src/assets/images](./src/assets/images), portraits beside each consultant, and covers beside each article. Use landscape photos around 2000 pixels wide for sectors and covers. A sector image, an article cover, or a portrait is also that page's share image, cropped to 1200x630 at build time. Keep the credit fields up to date for anything that needs attribution.

## Feeds and Social Cards

`/rss.xml` carries the twenty newest articles. Pages without their own image use `public/og-image.png`, a 1200x630 card showing the homepage hero; replace it after rebranding.

Structured data is built in [src/lib/schema.ts](./src/lib/schema.ts): `EmploymentAgency` and `WebSite` on most pages, `JobPosting` and a `BreadcrumbList` on jobs, and `BlogPosting` and a `BreadcrumbList` on articles.

## Adding Pages

To add a page such as `/press/`, create `src/pages/press.astro`, wrap it in `BaseLayout`, and reuse the pieces already in the theme: `PageHero` for the title block, `SectionHead` for section headings, `.shell` for the page width, `.section` for vertical spacing, `text-display-xl`, `text-display-lg`, `text-display-md` and `text-lead` for type, `card` for white rounded panels, `pill` and `chip` for tags, `btn btn-primary`, `btn btn-accent` and `btn btn-outline` for buttons, `field` and `field-label` for forms, and `Closing` for the call to action at the foot. Then link to it from `navigation` or `footerNavigation`.

## Icons

Interface icons come from [Lucide](https://lucide.dev/) in [src/icons/lucide](./src/icons/lucide) and social and share marks from Bootstrap Icons in [src/icons/bootstrap](./src/icons/bootstrap), each folder with its license notice. [src/components/ui/Icon.astro](./src/components/ui/Icon.astro) loads both by file name: `<Icon name="arrow-right" />` for a Lucide outline, and `<Icon name="social-linkedin" />` for a Bootstrap mark. To add an icon, drop its SVG into the right folder and use its file name.

## Theme Tokens

Colours, type sizes, and the page width are custom properties at the top of [src/styles/global.css](./src/styles/global.css), exposed to Tailwind as utilities (`bg-paper`, `bg-surface`, `bg-wash`, `text-muted`, `bg-ink`, `bg-accent`, `bg-night`, and so on).

- `--paper` is the warm off-white page, `--surface` white for cards, and `--wash` a step darker for fills and the footer.
- `--ink` is the near-black used for text and primary buttons. `--muted` is secondary text and `--line` the soft ring around chips, fields, and outline buttons.
- `--accent` is the ultramarine for links, highlights, and salary bars, with `--accent-deep` for hover, `--accent-soft` for pills, icon tiles, and focus halos, and `--accent-bright` for the dots and glows.
- `--up` and `--down` colour salary changes and statuses.
- `--night` and its companions remain for code blocks and any dark panel you add.
- `--measure` is the content width, `--gutter` the side padding, and `--header-h` the height of the header bar.

`--radius-card` and `--radius-control` set the corner radius of cards and of buttons and fields (`rounded-card`, `rounded-control`), and `--shadow-card` and `--shadow-float` the resting and raised shadows (`shadow-card`, `shadow-float`). To change the accent, set the four `--accent` tokens, update `public/favicon.svg`, and replace `public/og-image.png`.

## Fonts

Roster self-hosts one OFL-licensed variable font in [public/fonts](./public/fonts), split into Latin and Latin Extended files: **Host Grotesk**, for everything. Code in articles uses the system monospace font.

To swap typefaces, replace the `@font-face` rules and the `--font-sans` and `--font-mono` tokens at the top of `global.css`, and update the font preload in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro).

## Motion

- Page headers rise in once on load with a short stagger (the `rise` class, delayed by `--i`).
- Sections below the fold carry `reveal`, which animates on a CSS view timeline where supported and falls back to a small IntersectionObserver in `BaseLayout.astro` elsewhere. Salary bars draw in the same way.
- Faces pop in and out of the dot field on the home page, cards lift on hover, and the live dots pulse. Under `prefers-reduced-motion: reduce` everything settles into a still.
