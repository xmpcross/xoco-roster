export const siteConfig = {
  name: "Roster",
  tagline: "Executive search and specialist recruitment",
  title: "Roster - An Astro theme for recruitment and executive search firms",
  description:
    "Roster places board members, executives and senior specialists in technology, finance, healthcare, legal and energy, from offices in London and New York.",
  siteUrl: "https://roster.xocoweb.workers.dev",
  language: "en",
  locale: "en_GB",
  dateLocale: "en-GB",
  socialImage: "/og-image.png",
  founded: 2009,
  email: "hello@example.com",
  phone: "+44 20 7946 0100",
  /** Offices, in the order they appear. `timeZone` drives the live clock on the contact and consultants pages. */
  offices: [
    {
      city: "London",
      timeZone: "Europe/London",
      address: ["14 Bunhill Row", "London EC1Y 8HP", "United Kingdom"],
      phone: "+44 20 7946 0100",
      email: "london@example.com",
    },
    {
      city: "New York",
      timeZone: "America/New_York",
      address: ["120 Hudson Street, 9th Floor", "New York, NY 10013", "United States"],
      phone: "+1 212 555 0100",
      email: "newyork@example.com",
    },
  ],
  /** The calls to action used across the site. */
  actions: {
    employer: { label: "Submit a vacancy", href: "/employers/submit-vacancy/" },
    candidate: { label: "Register your CV", href: "/candidates/register/" },
    jobs: { label: "Search jobs", href: "/jobs/" },
    book: { label: "Book a consultation", href: "/contact/#book" },
  },
  /**
   * Where each form posts. While `action` is empty a form runs in demo mode:
   * it validates, then shows its success message without sending anything.
   */
  forms: {
    apply: { action: "", method: "post" },
    vacancy: { action: "", method: "post" },
    register: { action: "", method: "post" },
    contact: { action: "", method: "post" },
    report: { action: "", method: "post" },
    newsletter: { action: "", method: "post", emailFieldName: "email" },
  },
  /**
   * The booking panel on the contact page. Set `embedUrl` to a Cal.com or
   * Calendly scheduling link to embed it; left empty, the panel shows a slot
   * picker that fills in the contact form instead.
   */
  booking: {
    embedUrl: "",
    title: "Book a 20‑minute consultation",
    lead: "Pick a time that suits you and the consultant for your sector will call. No preparation needed.",
  },
  /** The lead magnet on the salary guide. `summary` is the short line in the Candidates menu; `file` is offered once the form is sent. */
  report: {
    title: "The 2027 Salary Guide",
    summary: "Bands for 120 senior roles in four cities.",
    description:
      "Base, bonus and equity bands for 120 senior roles across London, New York, Manchester and Boston, from 1,800 offers we negotiated this year.",
    file: "",
  },
  newsletter: {
    title: "The Shortlist",
    description:
      "One email a month: market notes, salary moves and the roles we are about to post.",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "RSS", href: "/rss.xml" },
  ],
  legal: [
    { label: "Privacy notice", href: "/privacy/" },
    { label: "Candidate privacy", href: "/privacy/#candidates" },
  ],
};

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  /** A file name from `src/icons/lucide`, shown beside the link in the menu. */
  icon?: string;
}

export interface MenuColumn {
  title?: string;
  links?: NavLink[];
  /** Fills the column with every sector and its live role count. */
  sectors?: boolean;
}

/**
 * The panel on the right of a menu: `roles` the newest jobs, `placement` the
 * first featured case study, `salary` the salary guide download, `team` the consultants.
 */
export type MenuFeature = "roles" | "placement" | "salary" | "team";

export type NavItem =
  { label: string; href: string } | { label: string; columns: MenuColumn[]; feature?: MenuFeature };

export const navigation: NavItem[] = [
  { label: "Jobs", href: "/jobs/" },
  {
    label: "Sectors",
    feature: "roles",
    columns: [
      { title: "Practices", sectors: true },
      {
        title: "Across sectors",
        links: [
          {
            label: "Salary guide",
            href: "/salary-guide/",
            description: "Bands for 120 senior roles",
            icon: "chart-line",
          },
          {
            label: "Placements",
            href: "/placements/",
            description: "Searches we have closed",
            icon: "award",
          },
          {
            label: "Consultants",
            href: "/team/",
            description: "The people running each search",
            icon: "users",
          },
        ],
      },
    ],
  },
  {
    label: "Employers",
    feature: "placement",
    columns: [
      {
        title: "Hire with Roster",
        links: [
          {
            label: "Submit a vacancy",
            href: "/employers/submit-vacancy/",
            description: "Brief us in five minutes",
            icon: "send",
          },
          {
            label: "Executive search",
            href: "/employers/#services",
            description: "Retained board and C-suite searches",
            icon: "crown",
          },
          {
            label: "Specialist recruitment",
            href: "/employers/#services",
            description: "Senior and specialist hires",
            icon: "target",
          },
          {
            label: "Interim and contract",
            href: "/employers/#services",
            description: "Proven people in under two weeks",
            icon: "timer",
          },
        ],
      },
      {
        title: "Before you brief us",
        links: [
          {
            label: "How a search runs",
            href: "/employers/#process-title",
            description: "From brief to first ninety days",
            icon: "compass",
          },
          {
            label: "Salary guide",
            href: "/salary-guide/",
            description: "Benchmark the package",
            icon: "chart-line",
          },
          {
            label: "Book a consultation",
            href: "/contact/#book",
            description: "Twenty minutes with a partner",
            icon: "calendar",
          },
        ],
      },
    ],
  },
  {
    label: "Candidates",
    feature: "salary",
    columns: [
      {
        title: "Your next move",
        links: [
          {
            label: "Search jobs",
            href: "/jobs/",
            description: "Every live mandate",
            icon: "search",
          },
          {
            label: "Register your CV",
            href: "/candidates/register/",
            description: "Hear about roles first",
            icon: "user-plus",
          },
          {
            label: "Salary calculator",
            href: "/salary-guide/#calculator",
            description: "See where your pay sits",
            icon: "calculator",
          },
        ],
      },
      {
        title: "Advice",
        links: [
          {
            label: "Working with us",
            href: "/candidates/",
            description: "What to expect from a search",
            icon: "handshake",
          },
          {
            label: "Career advice",
            href: "/insights/topic/careers/",
            description: "Offers, notice and counter-offers",
            icon: "book-open",
          },
        ],
      },
    ],
  },
  { label: "Insights", href: "/insights/" },
  {
    label: "Firm",
    feature: "team",
    columns: [
      {
        title: "Roster",
        links: [
          {
            label: "About",
            href: "/about/",
            description: "Who we are and how we work",
            icon: "building-2",
          },
          {
            label: "Consultants",
            href: "/team/",
            description: "Partners and principals",
            icon: "users",
          },
          {
            label: "Placements",
            href: "/placements/",
            description: "Selected case studies",
            icon: "award",
          },
          {
            label: "Contact",
            href: "/contact/",
            description: "London and New York",
            icon: "map-pin",
          },
        ],
      },
    ],
  },
];

export const footerNavigation: { title: string; links: NavLink[] }[] = [
  {
    title: "Employers",
    links: [
      { label: "Submit a vacancy", href: "/employers/submit-vacancy/" },
      { label: "Our services", href: "/employers/" },
      { label: "Placements", href: "/placements/" },
      { label: "Book a consultation", href: "/contact/#book" },
    ],
  },
  {
    title: "Candidates",
    links: [
      { label: "Search jobs", href: "/jobs/" },
      { label: "Register your CV", href: "/candidates/register/" },
      { label: "Salary guide", href: "/salary-guide/" },
      { label: "Working with us", href: "/candidates/" },
    ],
  },
  {
    title: "Firm",
    links: [
      { label: "About", href: "/about/" },
      { label: "Consultants", href: "/team/" },
      { label: "Sectors", href: "/sectors/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    title: "Insights",
    links: [
      { label: "All insights", href: "/insights/" },
      { label: "Salaries", href: "/insights/topic/salaries/" },
      { label: "Hiring", href: "/insights/topic/hiring/" },
      { label: "RSS", href: "/rss.xml" },
    ],
  },
];
