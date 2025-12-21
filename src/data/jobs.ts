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
    title: "Full Stack Software Engineer",
    company: "Payactiv",
    startDate: "2025",
    endDate: "Present",
    responsibilities: [
      "Led the architecture and development of a greenfield <strong>React Native + Next.js monorepo</strong>, using <strong>TypeScript and Tailwind</strong>, supporting <strong>three production applications</strong> across iOS, Android, and web.",
      "Drove <strong>end-to-end mobile strategy</strong>, taking products from concept to <strong>App Store and Google Play publication</strong>, establishing reliable CI/CD workflows with <strong>Expo and EAS</strong>.",
      "Partnered directly with the <strong>SVP and CTO</strong> to define <strong>technical vision, system architecture, and early product designs</strong>, influencing long-term platform strategy from day one.",
      "Provided <strong>technical leadership and architectural guidance</strong> across frontend and backend systems, setting standards for scalability, maintainability, and performance.",
      "Collaborated cross-functionally to design and integrate <strong>C# / .NET APIs</strong>, ensuring clean contracts, efficient data flow, and production-grade reliability.",
      "Led collaboration with a <strong>distributed backend team across multiple time zones</strong>, establishing async processes and communication patterns that maintained delivery velocity.",
      "Reduced future technical debt by <strong>engineering a modular, high-performance codebase</strong>, enabling faster feature development and safer releases across platforms.",
      "Acted as the <strong>founding mobile and frontend engineer</strong>, establishing architecture, tooling, and development standards in an environment with no prior app infrastructure.",
      "Set <strong>frontend best practices, documentation, and workflows</strong>, significantly improving onboarding efficiency and cross-team collaboration."
    ]
  },
  {
    id: "freelance",
    title: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    startDate: "2019",
    endDate: "Present",
    responsibilities: [
      "Founded and grew the r/CodingHelp community on Reddit and Discord, providing mentorship and in-depth code reviews to thousands of developers in JavaScript, Node.js, HTML, CSS, and SQL.",
      "Developed comprehensive automated testing suites using C# and ASP.NET, resulting in 40% faster QA cycles and significantly improved code quality for client websites.",
      "Architected responsive, high-performance applications using Angular and React frameworks, delivering intuitive user experiences across mobile and web platforms.",
      "Engineered sophisticated AI-powered bots utilizing Python, PyTorch, JavaScript, and Node.js, implementing advanced natural language processing capabilities."
    ]
  },
  {
    id: "tenderling",
    title: "Full-Stack Developer",
    company: "Tenderling Design",
    startDate: "2024",
    endDate: "2024",
    responsibilities: [
      "Transformed complex Figma designs into fully functional websites while ensuring complete ADA Compliance, delivering pixel-perfect implementations that maintained accessibility standards.",
      "Developed enterprise-level websites for major hotel brands using WordPress, Roots/Sage framework, and Alpine.js, creating seamless user experiences with optimized performance.",
      "Consistently delivered high-quality projects under tight deadlines, rapidly adapting to new tools and technologies to meet evolving client requirements."
    ]
  },
  {
    id: "hometown",
    title: "Front End Software Engineer",
    company: "Hometown Hero",
    startDate: "2023",
    endDate: "2024",
    responsibilities: [
      "Spearheaded the migration of a B2B eCommerce platform from Shopify to Vue.js and Nuxt.js, resulting in a 30% reduction in operational costs and improved performance metrics.",
      "Collaborated closely with executive leadership including the CTO and Backend PHP Developer to enhance backend plugins and align technical solutions with evolving business requirements.",
      "Optimized frontend performance and user experience, implementing modern JavaScript practices that improved page load times by 25% and increased customer engagement."
    ]
  },
  {
    id: "storage",
    title: "Front End Software Engineer",
    company: "The Storage Group, Inc.",
    startDate: "2023",
    endDate: "2023",
    responsibilities: [
      "Crafted custom WordPress solutions tailored to precise client specifications, delivering responsive designs with optimized performance and SEO capabilities.",
      "Provided critical technical support to Full-Stack Developers by identifying and resolving complex platform-specific issues on iOS and iPadOS environments.",
      "Implemented cross-browser compatibility solutions, ensuring consistent user experiences across all devices and platforms."
    ]
  },
  {
    id: "morris",
    title: "Full Stack Software Engineer",
    company: "Morris Consulting Services, Inc.",
    startDate: "2022",
    endDate: "2023",
    responsibilities: [
      "Maintained and enhanced backend infrastructure for multiple client websites using C# & .NET/ASP.NET, ensuring optimal performance, security, and reliability across all services.",
      "Developed sophisticated API testing frameworks using Angular and Dart, significantly improving application productivity and reducing debugging time by 35%.",
      "Implemented CI/CD pipelines that streamlined development workflows and reduced deployment times from hours to minutes."
    ]
  },
  {
    id: "river",
    title: "Full Stack Software Engineer",
    company: "River & Reef Aquaculture, LLC",
    startDate: "2020",
    endDate: "2022",
    responsibilities: [
      "Led all technical operations for the business, managing hosting infrastructure, security protocols, and digital marketing integrations.",
      "Designed and implemented a comprehensive eCommerce platform for aquaculture sales utilizing Angular, MySQL, and C# (.NET), resulting in a 45% increase in online revenue.",
      "Integrated automated inventory management systems that synchronized online and physical stock levels, reducing order fulfillment errors by 60%."
    ]
  }
];
