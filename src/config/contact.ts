export const contact = {
  title: "Talk to us",
  lead: "Whether you are hiring or thinking about a move, you will hear back from a partner or principal within one working day.",
  /** The options in the "I'm writing about" menu. `?topic=<value>` in the URL preselects one. */
  topics: [
    { value: "hiring", label: "Hiring for a role" },
    { value: "career", label: "My next move" },
    { value: "consultation", label: "Booking a consultation" },
    { value: "press", label: "Press and speaking" },
    { value: "other", label: "Something else" },
  ],
  routes: [
    { label: "Employers", detail: "Briefs, fees and terms", email: "clients@example.com" },
    {
      label: "Candidates",
      detail: "Applications and registration",
      email: "candidates@example.com",
    },
    { label: "Press", detail: "Comment and salary data", email: "press@example.com" },
    { label: "Privacy", detail: "Your data and how to remove it", email: "privacy@example.com" },
  ],
  /** Slot picker hours (local to the chosen office), used when no booking embed is set. */
  slots: { from: 9, to: 17, stepMinutes: 30, days: 8 },
};
