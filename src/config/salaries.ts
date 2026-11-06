export const salaryCities = [
  { id: "london", label: "London", currency: "GBP" },
  { id: "manchester", label: "Manchester", currency: "GBP" },
  { id: "new-york", label: "New York", currency: "USD" },
  { id: "boston", label: "Boston", currency: "USD" },
] as const;

export type CityId = (typeof salaryCities)[number]["id"];

/** Base salary in thousands: lower quartile, median, upper quartile. */
export type Band = [p25: number, median: number, p75: number];

export interface SalaryRole {
  id: string;
  title: string;
  /** An id from `src/content/sectors`. */
  sector: string;
  /** Typical bonus as a share of base, shown as written. */
  bonus: string;
  /** Year-on-year change in the London median, in per cent. */
  change: number;
  bands: Record<CityId, Band>;
}

export const salaryGuide = {
  year: 2027,
  title: "Salary guide",
  lead: "What senior people are actually paid, from the offers we negotiated in the last twelve months. Compare a role across cities, or check where your own package sits.",
  method:
    "Base salary in thousands, local currency, from 1,812 offers Roster negotiated between October 2025 and September 2026. Each band needs at least twelve data points. Non-executive figures are annual fees.",
  highlights: [
    { value: "+3.8%", label: "Median senior base, year on year" },
    { value: "+8.5%", label: "Fastest riser: grid connections" },
    { value: "61%", label: "Offers that included equity or LTIP" },
    { value: "1,812", label: "Offers in this year's data" },
  ],
};

export const salaryRoles: SalaryRole[] = [
  {
    id: "ceo",
    title: "Chief Executive Officer",
    sector: "board-executive",
    bonus: "50-100%",
    change: 4.0,
    bands: {
      london: [280, 350, 450],
      manchester: [190, 240, 300],
      "new-york": [480, 600, 780],
      boston: [420, 520, 680],
    },
  },
  {
    id: "coo",
    title: "Chief Operating Officer",
    sector: "board-executive",
    bonus: "40-60%",
    change: 3.5,
    bands: {
      london: [200, 245, 300],
      manchester: [150, 180, 220],
      "new-york": [340, 420, 520],
      boston: [300, 370, 460],
    },
  },
  {
    id: "cpo",
    title: "Chief People Officer",
    sector: "board-executive",
    bonus: "25-40%",
    change: 3.0,
    bands: {
      london: [170, 200, 240],
      manchester: [120, 145, 170],
      "new-york": [280, 330, 400],
      boston: [250, 300, 360],
    },
  },
  {
    id: "ned",
    title: "Non-Executive Director",
    sector: "board-executive",
    bonus: "Fee only",
    change: 2.5,
    bands: {
      london: [55, 70, 90],
      manchester: [40, 50, 65],
      "new-york": [120, 160, 220],
      boston: [100, 140, 190],
    },
  },

  {
    id: "cto",
    title: "Chief Technology Officer",
    sector: "technology",
    bonus: "30-50% + equity",
    change: 5.5,
    bands: {
      london: [210, 250, 310],
      manchester: [150, 180, 215],
      "new-york": [360, 420, 500],
      boston: [310, 370, 440],
    },
  },
  {
    id: "vp-engineering",
    title: "VP Engineering",
    sector: "technology",
    bonus: "20-30% + equity",
    change: 4.8,
    bands: {
      london: [170, 195, 230],
      manchester: [125, 145, 170],
      "new-york": [290, 330, 380],
      boston: [260, 295, 340],
    },
  },
  {
    id: "head-of-ai",
    title: "Head of Data and AI",
    sector: "technology",
    bonus: "20-30% + equity",
    change: 7.2,
    bands: {
      london: [150, 175, 210],
      manchester: [110, 130, 155],
      "new-york": [260, 300, 350],
      boston: [235, 270, 315],
    },
  },
  {
    id: "principal-security",
    title: "Principal Security Engineer",
    sector: "technology",
    bonus: "10-20%",
    change: 6.1,
    bands: {
      london: [125, 145, 170],
      manchester: [95, 110, 130],
      "new-york": [220, 250, 290],
      boston: [200, 230, 265],
    },
  },
  {
    id: "senior-data-engineer",
    title: "Senior Data Engineer",
    sector: "technology",
    bonus: "10-15%",
    change: 3.9,
    bands: {
      london: [90, 105, 120],
      manchester: [70, 80, 92],
      "new-york": [165, 185, 210],
      boston: [150, 170, 190],
    },
  },

  {
    id: "cfo",
    title: "Chief Financial Officer",
    sector: "financial-services",
    bonus: "40-80%",
    change: 4.2,
    bands: {
      london: [200, 240, 300],
      manchester: [145, 170, 210],
      "new-york": [350, 420, 520],
      boston: [300, 360, 450],
    },
  },
  {
    id: "cro",
    title: "Chief Risk Officer",
    sector: "financial-services",
    bonus: "40-70%",
    change: 3.8,
    bands: {
      london: [190, 230, 280],
      manchester: [140, 165, 200],
      "new-york": [330, 400, 480],
      boston: [290, 350, 420],
    },
  },
  {
    id: "head-of-treasury",
    title: "Head of Treasury",
    sector: "financial-services",
    bonus: "25-40%",
    change: 3.1,
    bands: {
      london: [130, 155, 185],
      manchester: [95, 115, 135],
      "new-york": [220, 260, 310],
      boston: [195, 230, 275],
    },
  },
  {
    id: "fpa-director",
    title: "FP&A Director",
    sector: "financial-services",
    bonus: "15-25%",
    change: 3.4,
    bands: {
      london: [115, 135, 160],
      manchester: [85, 100, 118],
      "new-york": [190, 220, 255],
      boston: [170, 195, 225],
    },
  },
  {
    id: "financial-controller",
    title: "Financial Controller",
    sector: "financial-services",
    bonus: "10-20%",
    change: 2.9,
    bands: {
      london: [85, 98, 115],
      manchester: [65, 75, 88],
      "new-york": [150, 170, 195],
      boston: [135, 152, 175],
    },
  },

  {
    id: "medical-director",
    title: "Medical Director",
    sector: "healthcare",
    bonus: "10-20%",
    change: 3.0,
    bands: {
      london: [150, 175, 205],
      manchester: [130, 150, 175],
      "new-york": [380, 450, 540],
      boston: [360, 420, 500],
    },
  },
  {
    id: "chief-nursing-officer",
    title: "Chief Nursing Officer",
    sector: "healthcare",
    bonus: "10-15%",
    change: 5.8,
    bands: {
      london: [125, 145, 170],
      manchester: [105, 122, 140],
      "new-york": [260, 300, 350],
      boston: [245, 285, 330],
    },
  },
  {
    id: "vp-regulatory",
    title: "VP Regulatory Affairs",
    sector: "healthcare",
    bonus: "20-30% + equity",
    change: 4.4,
    bands: {
      london: [140, 165, 195],
      manchester: [110, 130, 150],
      "new-york": [270, 310, 360],
      boston: [265, 305, 355],
    },
  },
  {
    id: "clinical-ops-director",
    title: "Clinical Operations Director",
    sector: "healthcare",
    bonus: "15-20%",
    change: 3.6,
    bands: {
      london: [110, 128, 150],
      manchester: [88, 102, 120],
      "new-york": [210, 240, 280],
      boston: [205, 235, 270],
    },
  },

  {
    id: "general-counsel",
    title: "General Counsel",
    sector: "legal",
    bonus: "30-50%",
    change: 3.9,
    bands: {
      london: [190, 230, 290],
      manchester: [130, 155, 185],
      "new-york": [350, 420, 520],
      boston: [300, 360, 440],
    },
  },
  {
    id: "head-of-compliance",
    title: "Head of Compliance",
    sector: "legal",
    bonus: "20-30%",
    change: 5.1,
    bands: {
      london: [130, 150, 180],
      manchester: [95, 112, 130],
      "new-york": [230, 265, 310],
      boston: [205, 235, 275],
    },
  },
  {
    id: "senior-legal-counsel",
    title: "Senior Legal Counsel",
    sector: "legal",
    bonus: "10-20%",
    change: 3.2,
    bands: {
      london: [105, 120, 140],
      manchester: [78, 90, 104],
      "new-york": [200, 230, 265],
      boston: [180, 205, 235],
    },
  },
  {
    id: "dpo",
    title: "Data Protection Officer",
    sector: "legal",
    bonus: "10-15%",
    change: 4.6,
    bands: {
      london: [95, 110, 130],
      manchester: [72, 84, 98],
      "new-york": [170, 195, 225],
      boston: [155, 178, 205],
    },
  },

  {
    id: "coo-renewables",
    title: "COO, Renewables",
    sector: "energy",
    bonus: "30-50% + LTIP",
    change: 5.0,
    bands: {
      london: [180, 215, 260],
      manchester: [140, 165, 195],
      "new-york": [300, 350, 420],
      boston: [280, 330, 390],
    },
  },
  {
    id: "grid-connections-director",
    title: "Grid Connections Director",
    sector: "energy",
    bonus: "20-30%",
    change: 8.5,
    bands: {
      london: [130, 150, 175],
      manchester: [105, 120, 140],
      "new-york": [210, 240, 280],
      boston: [200, 230, 265],
    },
  },
  {
    id: "offshore-wind-head",
    title: "Head of Offshore Wind Development",
    sector: "energy",
    bonus: "20-30%",
    change: 6.4,
    bands: {
      london: [140, 162, 190],
      manchester: [115, 132, 155],
      "new-york": [220, 255, 295],
      boston: [215, 248, 290],
    },
  },
  {
    id: "programme-director",
    title: "Programme Director",
    sector: "energy",
    bonus: "15-25%",
    change: 4.1,
    bands: {
      london: [120, 140, 165],
      manchester: [95, 110, 128],
      "new-york": [195, 225, 260],
      boston: [185, 212, 245],
    },
  },
];
