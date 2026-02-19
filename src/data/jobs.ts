export interface Job {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export const jobs: Job[] = [
  {
    id: "payactiv",
    title: "Software Engineer",
    company: "Payactiv",
    startDate: "2024",
    endDate: "Present",
    responsibilities: [
      "Designed and deployed CI/CD pipelines reducing deployment time from 8 hours → >1 hour and cutting release rollback incidents by 75%.",
      "Architected mobile and frontend infrastructure from scratch as founding engineer, establishing standards for a React Native + Next.js platform serving 2M+ users.",
      "Led the architecture and development of a greenfield React Native + Next.js monorepo, using TypeScript and Tailwind, supporting three production applications across iOS, Android, and web.",
      "Shipped iOS and Android apps to App Store and Google Play, building CI/CD pipelines with Expo EAS that cut release cycle time by over 8 hours."
    ]
  },
  {
    id: "freelance",
    title: "Freelance Full-Stack Engineer",
    company: "Self-Employed",
    startDate: "2019",
    endDate: "Present",
    responsibilities: [
      "Built Discord bots automating moderation for 10,000+ community members, reducing manual moderator workload by 80%.",
      "Served as a Freelance Full-Stack Engineer for River & Reef Aquaculture, prior to assuming my current role.",
      "Rebuilt TravelAgent360 on WordPress, increasing client acquisition by 35% through improved UX and SEO optimization."
    ]
  },
  {
    id: "tenderling",
    title: "Full-Stack Software Engineer",
    company: "Tenderling Design",
    startDate: "2024",
    endDate: "2024",
    responsibilities: [
      "Built websites for hotel brands like Hilton using WordPress, Roots/Sage and Alpine.js",
      "Delivered ADA-compliant, responsive websites from Figma designs for hotel brands including Hilton, meeting WCAG 2.1 AA standards."
    ]
  },
  {
    id: "hometown",
    title: "Senior Front-End Software Engineer",
    company: "Hometown Hero",
    startDate: "2023",
    endDate: "2024",
    responsibilities: [
      "Reduced operating costs 40% by migrating eCommerce platform from Shopify to a custom Vue.js + Nuxt.js solution.",
      "Collaborated with the CTO and Backend PHP Developer to enhance backend plugins, aligning them with evolving business requirements during a transitional phase."
    ]
  },
  {
    id: "storage",
    title: "Front-End Software Engineer",
    company: "The Storage Group, Inc.",
    startDate: "2022",
    endDate: "2023",
    responsibilities: [
      "Built custom WordPress sites for enterprise clients, translating design specs into production-ready implementations.",
      "Debugged and resolved iOS/iPadOS platform issues in collaboration with senior Full-Stack engineers.",
      "Provided guidance, mentoring, and training to onboarded Front-End Developers."
    ]
  }
];
