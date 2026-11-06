export const employers = {
  title: "Hire with conviction",
  lead: "One partner, a mapped market and a shortlist you would be happy to hire from twice over. For board, executive and senior specialist roles.",
  /** Fictional marks from `src/assets/logos`, by file name. */
  clients: [
    "halden",
    "northbeam",
    "stackwell",
    "tidewater",
    "corvid",
    "fernway",
    "kitebird",
    "arbor",
  ],
  clientsLabel: "Recent clients include",
  services: [
    {
      icon: "crown",
      title: "Executive search",
      body: "Retained searches for chairs, non-executives, chief executives and their direct reports. A partner leads from brief to integration.",
      points: [
        "Full market map, shared live",
        "Referencing before shortlist",
        "Twelve-month replacement guarantee",
      ],
      timeline: "5 to 8 weeks",
      fee: "Retained, in three stages",
    },
    {
      icon: "target",
      title: "Specialist recruitment",
      body: "Senior specialists and heads of function in technology, finance, healthcare, legal and energy, where the field is small and every approach counts.",
      points: [
        "Shortlist in around three weeks",
        "Exclusive or engaged terms",
        "Six-month guarantee",
      ],
      timeline: "3 to 5 weeks",
      fee: "Engaged or on success",
    },
    {
      icon: "timer",
      title: "Interim and contract",
      body: "Proven interim executives and contractors for transformations, regulatory deadlines and gaps you cannot leave open.",
      points: [
        "Vetted people available now",
        "Day rates agreed up front",
        "Extensions and conversions handled",
      ],
      timeline: "5 to 10 days",
      fee: "Day-rate margin",
    },
    {
      icon: "radar",
      title: "Talent mapping",
      body: "A named, ranked view of a market before you commit to a hire, for succession plans, new locations or a board conversation.",
      points: [
        "Names, roles and packages",
        "Diversity of the pool, measured",
        "Pay benchmarking included",
      ],
      timeline: "2 to 3 weeks",
      fee: "Fixed project fee",
    },
  ],
  promises: [
    { value: "24h", label: "From brief to a partner's call" },
    { value: "7", unit: "days", label: "To a full market map" },
    { value: "12", unit: "months", label: "Replacement guarantee on search" },
  ],
  faq: [
    {
      question: "How do your fees work?",
      answer:
        "Executive search is retained and billed in three stages: on engagement, on shortlist and on appointment, usually a third of first-year cash. Specialist roles can be engaged or on success. Interim is a margin on the day rate. Every proposal states the total before you sign.",
    },
    {
      question: "Do you work exclusively?",
      answer:
        "For retained search, yes, and we would rather you did not run other agencies alongside us: the market notices. For specialist roles we can work on an engaged basis with a small upfront fee, which keeps both sides committed.",
    },
    {
      question: "What happens if a placement does not work out?",
      answer:
        "If an executive search appointment leaves within twelve months, we run the search again for no further fee. Specialist roles carry a six-month guarantee.",
    },
    {
      question: "Can you hire outside London and New York?",
      answer:
        "Yes. Around a third of our searches are for roles elsewhere in the UK, Ireland, Europe and North America. We map wherever the best people are, and say so when relocating someone is unrealistic.",
    },
    {
      question: "How do you approach diversity?",
      answer:
        "We measure the longlist, not just the shortlist, and share the numbers with you at every stage. If a market map is narrow, we say why and widen the search before anyone is interviewed.",
    },
  ],
};

export const vacancy = {
  title: "Submit a vacancy",
  lead: "Five minutes now saves an hour on the phone later. A partner in the right practice reads every brief the same day.",
  next: [
    { title: "Same day", body: "A partner reads your brief and checks the market against it." },
    { title: "Within 24 hours", body: "A call to test the brief, the package and the timing." },
    {
      title: "Within 48 hours",
      body: "A written proposal with timeline, fee and a first view of the market.",
    },
  ],
  urgency: ["Within a month", "In one to three months", "In three to six months", "Just exploring"],
  services: [
    "Executive search",
    "Specialist recruitment",
    "Interim or contract",
    "Talent mapping",
    "Not sure yet",
  ],
};
