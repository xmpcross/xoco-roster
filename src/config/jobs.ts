/** The fixed lists a job is filed under. Sectors are their own collection in `src/content/sectors`. */
export const workModes = ["On-site", "Hybrid", "Remote"] as const;
export const employmentTypes = ["Permanent", "Contract", "Interim"] as const;
export const seniorities = ["Board", "C-suite", "Director", "Senior", "Mid-level"] as const;

export const currencies = ["GBP", "USD", "EUR"] as const;
export const salaryPeriods = ["year", "day", "hour"] as const;

/**
 * "Highest pay" sorting compares jobs across currencies and day rates. These rough
 * rates turn every salary into a yearly figure in one currency; they never show on the page.
 */
export const sortRates = {
  currency: { GBP: 1, USD: 0.78, EUR: 0.85 },
  daysPerYear: 220,
  hoursPerYear: 1760,
};

/** The jobs board heading. The board is not paginated: it filters in the browser, so keep it to a few hundred jobs. */
export const jobsIntro = {
  title: "Live roles",
  lead: "Every mandate we are working on right now, from board appointments to senior specialists. Filter by sector, location and how you want to work.",
};

/** The panel beside the results on the jobs board. `label` and `href` also appear after an application is sent. */
export const jobAlert = {
  title: "Hear about roles before they are posted",
  body: "Most of our senior mandates are filled from people already registered with us. Register once and the right consultant will call when something fits.",
  label: "Register with us",
  href: "/candidates/register/",
};

/** The apply form on each job page. */
export const applyCopy = {
  title: "Apply for this role",
  lead: "Your application goes straight to the consultant running the search. Expect a reply within two working days, whatever the answer.",
  noticeOptions: [
    "Immediately",
    "Up to 1 month",
    "1 to 3 months",
    "3 to 6 months",
    "Over 6 months",
  ],
  consent:
    "I agree to Roster storing my details to assess my application and contact me about relevant roles, as described in the privacy notice.",
};
