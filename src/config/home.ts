/** Homepage copy. `figures` and `features.process` are also used on the about, placements and employers pages. */

export const hero = {
  headline: "We find the people who run the room.",
  /** Words of the headline set in the accent colour. */
  highlight: "run the room",
  lead: "Board, executive and senior specialist hires in technology, finance, healthcare, legal and energy. Retained when it matters, fast when it has to be.",
  ticks: ["Partner-led, start to finish", "Shortlist in 21 days"],
  searchPlaceholder: "Role, skill or keyword",
  popular: ["Chief Technology Officer", "Non-Executive Director", "Legal Counsel", "Interim"],
  clientsLabel: "Trusted by boards and founders at",
  clients: ["northbeam", "halden", "stackwell", "lumio", "tidewater", "kitebird"],
};

export const figures = [
  { value: "1,240", label: "Placements since 2009" },
  { value: "94%", label: "Still in post after 12 months" },
  { value: "21", unit: "days", label: "Median brief to shortlist" },
  { value: "38%", label: "Of our shortlists led by women" },
];

/** The statement under the field of faces. The `strong` part reads darker. */
export const market = {
  strong: "Most senior roles are never advertised.",
  rest: "We map every plausible person in the market, approach the right few, and bring you a shortlist of four to six you would be glad to hire.",
};

export const features = {
  shortlist: {
    title: "A shortlist you can act on.",
    lead: "Every name comes with a partner's case, informal references and a realistic package.",
    points: [
      {
        title: "The whole market, mapped",
        body: "Every plausible person named and ranked, with the reasons we would or would not approach them.",
      },
      {
        title: "A written case for each candidate",
        body: "Why they fit, where they don't, and what the board should test in the final round.",
      },
      {
        title: "A straight answer on cost",
        body: "What the role will take to land, before anyone names a number.",
      },
    ],
    action: { label: "Submit a vacancy", href: "/employers/submit-vacancy/" },
  },
  process: {
    title: "Five weeks from brief to offer.",
    lead: "A retained search follows the same rhythm whether it is a chair or a principal engineer. You never wait more than a week for news.",
    points: [
      {
        title: "Brief and market map in a week",
        body: "A partner spends two hours with you and the people the hire will work with, then maps the field.",
      },
      {
        title: "Shortlist by day 21",
        body: "Four to six people, interviewed and referenced informally, each with a realistic package.",
      },
      {
        title: "Check-ins to day 90",
        body: "We stay close to you and your hire through the first ninety days. Most problems show up early.",
      },
    ],
    action: { label: "How we work", href: "/employers/" },
  },
  candidates: {
    title: "Hear about roles before they are advertised.",
    lead: "Register once, tell us what would actually tempt you, and hear from the consultant who covers your field.",
    points: [
      {
        title: "Confidential, always",
        body: "Your name never goes to a client without your say-so, role by role.",
      },
      {
        title: "Salary data before you negotiate",
        body: "Live bands from the offers we negotiated this year, for your role and city.",
      },
      {
        title: "Honest feedback after every interview",
        body: "What the panel said, in plain words, whatever the outcome.",
      },
    ],
    primary: { label: "Register your CV", href: "/candidates/register/" },
    secondary: { label: "Search jobs", href: "/jobs/" },
  },
  salary: {
    title: "Know what the role is worth.",
    lead: "Bands from 1,812 offers we negotiated this year. Check a role across four cities, or see where your own package sits.",
    points: [
      {
        title: "Quartiles, not averages",
        body: "Lower quartile, median and upper quartile base for 120 senior roles.",
      },
      {
        title: "Four cities",
        body: "London, Manchester, New York and Boston, in local currency.",
      },
      {
        title: "A calculator for your own pay",
        body: "Enter your base and see where it sits against the market.",
      },
    ],
    primary: { label: "Open the salary guide", href: "/salary-guide/" },
    secondary: { label: "Get the 2027 report", href: "/salary-guide/#report" },
  },
};

export const sectorsSection = {
  title: "Six practices. Each run by people who worked in it.",
  lead: "Former CFOs, engineers, nurses and lawyers who know what good looks like in their field.",
};

export const rolesSection = {
  title: "Latest mandates",
  lead: "New briefs from this week. Most of our roles are filled before they reach a job board.",
};

export const placementsSection = {
  title: "Recent searches, start to finish",
  lead: "A few of the appointments we can talk about, with the numbers behind them.",
};

export const teamSection = {
  title: "The people you will actually speak to",
  lead: "No hand-offs to juniors. The partner who wins your search runs it.",
};

export const insightsSection = {
  title: "Notes from the market",
};
