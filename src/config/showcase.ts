import amira from "@/assets/people/amira-haddad.jpg";
import ananya from "@/assets/people/ananya-rao.jpg";
import elena from "@/assets/people/elena-novak.jpg";
import grant from "@/assets/people/grant-holloway.jpg";
import hana from "@/assets/people/hana-weber.jpg";
import imani from "@/assets/people/imani-clarke.jpg";
import jun from "@/assets/people/jun-seo.jpg";
import kwame from "@/assets/people/kwame-asante.jpg";
import lena from "@/assets/people/lena-fischer.jpg";
import nadia from "@/assets/people/nadia-mensah.jpg";
import owen from "@/assets/people/owen-brooks.jpg";
import rafael from "@/assets/people/rafael-costa.jpg";
import marisol from "@/assets/people/marisol-ortega.jpg";
import theo from "@/assets/people/theo-marchetti.jpg";

/**
 * The fictional candidates in the homepage illustrations: the field of faces
 * and the product-style panels. Stock portraits; the names are invented.
 */
export const portraits = [
  {
    name: "Nadia Mensah",
    photo: nadia,
    credit: { name: "Ifeyinka Adeyemo / Pexels", url: "https://www.pexels.com/photo/29852895/" },
  },
  {
    name: "Jun Seo",
    photo: jun,
    credit: {
      name: "ANTONI SHKRABA production / Pexels",
      url: "https://www.pexels.com/photo/8278872/",
    },
  },
  {
    name: "Lena Fischer",
    photo: lena,
    credit: {
      name: "Augusto Carneiro Junior / Pexels",
      url: "https://www.pexels.com/photo/30468665/",
    },
  },
  {
    name: "Kwame Asante",
    photo: kwame,
    credit: { name: "Ivan S / Pexels", url: "https://www.pexels.com/photo/8498701/" },
  },
  {
    name: "Amira Haddad",
    photo: amira,
    credit: { name: "Kampus Production / Pexels", url: "https://www.pexels.com/photo/8636645/" },
  },
  {
    name: "Theo Marchetti",
    photo: theo,
    credit: { name: "Uiliam Nörnberg / Pexels", url: "https://www.pexels.com/photo/30767572/" },
  },
  {
    name: "Ananya Rao",
    photo: ananya,
    credit: { name: "Kindel Media / Pexels", url: "https://www.pexels.com/photo/7688183/" },
  },
  {
    name: "Grant Holloway",
    photo: grant,
    credit: { name: "Wolf Art / Pexels", url: "https://www.pexels.com/photo/17390732/" },
  },
  {
    name: "Imani Clarke",
    photo: imani,
    credit: { name: "Christina Morillo / Pexels", url: "https://www.pexels.com/photo/1181688/" },
  },
  {
    name: "Rafael Costa",
    photo: rafael,
    credit: { name: "Italo Melo / Pexels", url: "https://www.pexels.com/photo/2379004/" },
  },
  {
    name: "Elena Novak",
    photo: elena,
    credit: { name: "Michael Obstoj / Pexels", url: "https://www.pexels.com/photo/31853114/" },
  },
  {
    name: "Owen Brooks",
    photo: owen,
    credit: { name: "Vitaly Gariev / Pexels", url: "https://www.pexels.com/photo/39205059/" },
  },
  {
    name: "Hana Weber",
    photo: hana,
    credit: { name: "Vitaly Gariev / Pexels", url: "https://www.pexels.com/photo/23496671/" },
  },
  {
    name: "Marisol Ortega",
    photo: marisol,
    credit: { name: "Zoe Galarza / Pexels", url: "https://www.pexels.com/photo/34381970/" },
  },
];

const face = (name: string) =>
  portraits.find((person) => person.name === name)?.photo ?? portraits[0].photo;

export type Tone = "accent" | "up" | "amber" | "neutral";

/** The search workspace in the hero. `consultant` is an id from `src/content/team`. */
export const searchBoard = {
  title: "Chief Technology Officer",
  client: "Series D payments platform",
  location: "New York",
  consultant: "marcus-bell",
  day: 21,
  stages: [
    { label: "Mapped", count: 186 },
    { label: "Approached", count: 52 },
    { label: "Interviewed", count: 11 },
    { label: "Shortlist", count: 4 },
  ],
  others: ["CFO, healthtech", "Chief Nursing Officer", "General Counsel"],
  candidates: [
    {
      name: "Nadia Mensah",
      photo: face("Nadia Mensah"),
      role: "VP Engineering, Ledgerline",
      fit: 5,
      status: "Final round",
      tone: "accent" as Tone,
    },
    {
      name: "Jun Seo",
      photo: face("Jun Seo"),
      role: "Head of Platform, Paycrest",
      fit: 4,
      status: "Referenced",
      tone: "up" as Tone,
    },
    {
      name: "Lena Fischer",
      photo: face("Lena Fischer"),
      role: "CTO, Tandemly",
      fit: 4,
      status: "Interviewing",
      tone: "amber" as Tone,
    },
    {
      name: "Kwame Asante",
      photo: face("Kwame Asante"),
      role: "Engineering Director, Kestrel",
      fit: 3,
      status: "Shortlisted",
      tone: "neutral" as Tone,
    },
  ],
  message: "Two references back on Nadia. Both strong.",
};

/** The candidate profile beside "A shortlist you can act on". */
export const candidateProfile = {
  name: "Nadia Mensah",
  photo: face("Nadia Mensah"),
  location: "London, UK",
  experience: "16 years",
  case: [
    "Rebuilt Ledgerline's card ledger at 40x volume without a settlement outage.",
    "Runs 220 engineers across London, Lisbon and Toronto.",
  ],
  criteria: [
    { label: "Payments infrastructure", detail: "9 years across issuing and acquiring" },
    { label: "Board-facing", detail: "Presents to the risk committee each quarter" },
    { label: "Regulated environment", detail: "FCA and OCC examinations" },
  ],
  references: "2 of 2 back, both strong",
  roles: [
    {
      initial: "L",
      title: "VP Engineering",
      company: "Ledgerline",
      dates: "2021 to now",
      tone: "accent" as Tone,
    },
    {
      initial: "P",
      title: "Head of Platform",
      company: "Paycrest",
      dates: "2017 to 2021",
      tone: "amber" as Tone,
    },
  ],
  package: [
    { label: "Base", value: "$410k" },
    { label: "Bonus", value: "30%" },
    { label: "Equity", value: "0.4%" },
    { label: "Notice", value: "3 months" },
  ],
};

/** The search tracker beside "Five weeks from brief to offer". */
export const searchProgress = {
  title: "Chief Financial Officer",
  client: "Series D healthtech",
  consultant: "clara-lindqvist",
  day: 19,
  length: 35,
  steps: [
    { title: "Brief", day: "Day 0", detail: "Role written back in one page", state: "done" },
    { title: "Market map", day: "Day 7", detail: "214 people named and ranked", state: "done" },
    {
      title: "Shortlist",
      day: "Day 21",
      detail: "5 interviewed, 3 referenced so far",
      state: "current",
    },
    { title: "Offer", day: "Day 35", detail: "Final rounds and negotiation", state: "next" },
    {
      title: "Integration",
      day: "Day 90",
      detail: "Check-ins at 30, 60 and 90 days",
      state: "next",
    },
  ],
  funnel: [
    { label: "Mapped", count: 214 },
    { label: "Approached", count: 61 },
    { label: "Spoke to", count: 33 },
    { label: "Shortlist", count: 5 },
  ],
  message: "Shortlist call is booked for Thursday at 10:00.",
};

/** The candidate's view beside "Hear about roles before they are advertised". */
export const candidateView = {
  name: "Amira",
  photo: face("Amira Haddad"),
  /** Matches are the newest live roles in this sector. */
  sector: "financial-services",
  shared: "shared a role with you",
};
