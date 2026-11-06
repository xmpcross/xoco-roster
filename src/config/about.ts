import meeting from "@/assets/images/meeting.jpg";
import office from "@/assets/images/about.jpg";

export const about = {
  title: "A search firm built around the shortlist",
  lead: "Roster was founded in London in 2009 on a simple idea: the shortlist is the whole job. Everything we do is in service of four to six names a client would be glad to hire.",
  image: office,
  imageAlt: "A bright open-plan office with white desks and grey chairs",
  imageCredit: { name: "Max Vakhtbovych / Pexels", url: "https://www.pexels.com/photo/7750129/" },
  story: [
    "We started as three people in a room above a print shop in Clerkenwell, placing finance directors for private equity portfolio companies. The work was contingent and fast, and we learned quickly that speed without judgement produces placements that do not last.",
    "So we changed how we worked. Every search got a partner who stayed on it from brief to integration. Every market got mapped in full before anyone was approached. And every candidate got honest feedback, whatever the outcome. Seventeen years and 1,240 placements later, that is still the whole method.",
  ],
  secondImage: meeting,
  secondImageAlt: "Three colleagues reviewing documents together at a meeting table",
  secondImageCredit: {
    name: "Sora Shimazaki / Pexels",
    url: "https://www.pexels.com/photo/5668495/",
  },
  principles: [
    {
      title: "One partner, start to finish",
      icon: "user-check",
      body: "The person who wins a search runs it. Clients and candidates always know who to call.",
    },
    {
      title: "Map the whole market",
      icon: "map",
      body: "We name every plausible person before approaching anyone, so the shortlist is a choice, not an accident.",
    },
    {
      title: "Say the uncomfortable thing early",
      icon: "message-square",
      body: "If a brief, a package or a candidate will not work, we say so in the first week, not the fifth.",
    },
    {
      title: "Measure what lasts",
      icon: "trending-up",
      body: "We track every placement for two years. Retention, not fees, is the number partners are paid on.",
    },
  ],
  timeline: [
    {
      year: "2009",
      text: "Founded in London, placing finance directors for private equity portfolios.",
    },
    {
      year: "2011",
      text: "First retained executive search. The board practice follows a year later.",
    },
    { year: "2014", text: "Financial services practice opens, led by a former bank CFO." },
    { year: "2016", text: "New York office opens on Hudson Street." },
    { year: "2019", text: "Healthcare and life sciences practice launches in London." },
    { year: "2022", text: "Energy and infrastructure practice opens in New York." },
    { year: "2026", text: "1,240 placements, 94% still in post after twelve months." },
  ],
};
