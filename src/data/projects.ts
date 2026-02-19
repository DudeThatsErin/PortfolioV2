export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  results: string;
  contribution: string;
  technologies: string[];
  type: 'personal' | 'work';
  links: {
    github?: string;
    demo?: string;
    website?: string;
  };
}

export const projects: Project[] = [
  {
    id: "payactiv-mobile",
    title: "Payactiv Mobile Platform - React Native Monorepo",
    description: "Led architecture and development of a greenfield React Native + Next.js monorepo supporting three production applications across iOS, Android, and web.",
    problem: "Payactiv needed a unified mobile and web platform to serve millions of users with earned wage access. The company had no existing mobile infrastructure, requiring a complete ground-up solution that could scale across multiple platforms while maintaining code reusability and performance.",
    approach: "Architected a TypeScript-based monorepo using React Native, Next.js, and Tailwind CSS. Established CI/CD pipelines with Expo and EAS for automated builds and deployments. Collaborated with backend teams to design and integrate C# / .NET APIs. Set up modular architecture patterns to enable rapid feature development while maintaining code quality and test coverage.",
    results: "Successfully launched three production applications to App Store and Google Play, serving millions of users. Reduced development time by 40% through shared component library. Established scalable architecture that enabled the team to ship features 3x faster. Created comprehensive documentation and onboarding processes that reduced new developer ramp-up time from weeks to days.",
    contribution: "Sole mobile/frontend engineer - owned entire mobile architecture, tooling, and development standards. Partnered directly with SVP and CTO to define technical vision and platform strategy.",
    technologies: ["React Native", "Next.js", "TypeScript", "Tailwind CSS", "Expo", "EAS", "C#/.NET APIs"],
    type: "work",
    links: {
      website: "https://www.payactiv.com"
    }
  },
  {
    id: "sasha",
    title: "Sasha AI - Personal Knowledge Assistant",
    description: "An AI-powered personal knowledge base using PyTorch and natural language processing to create an interactive digital legacy.",
    problem: "Traditional portfolios and resumes provide static information that doesn't allow for interactive exploration of a person's experiences, knowledge, and personality. There's no scalable way to preserve personal knowledge and stories for future generations in an interactive format.",
    approach: "Built a custom AI system using PyTorch with natural language processing and deep learning models. Implemented training pipelines to learn from personal documents, conversations, and experiences. Designed a conversational interface that allows users to ask questions and receive contextual, personalized responses. Integrated vector databases for efficient semantic search and retrieval.",
    results: "Created a functional AI assistant capable of answering questions about my professional experience, technical knowledge, and personal journey. Serves as both a portfolio tool for interviews and a digital family heirloom. Demonstrates advanced understanding of NLP, model training, and production AI deployment.",
    contribution: "Individual project - designed architecture, trained models, built entire system from scratch.",
    technologies: ["Python", "PyTorch", "NLP", "Vector Databases", "Deep Learning"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/sasha-ai"
    }
  },
  {
    id: "reactauth",
    title: "Cross-Platform Authentication System",
    description: "Full-stack authentication system with secure credential management, built for both web and mobile platforms using React Native Web.",
    problem: "Many authentication tutorials focus on single-platform solutions. Needed a production-ready authentication system that works seamlessly across web and mobile with proper security practices, session management, and database integration.",
    approach: "Built a comprehensive auth system using React, TypeScript, and React Native Web for cross-platform compatibility. Implemented secure password hashing, JWT token management, and session handling. Used SQLite for local development and MySQL for production. Created reusable authentication hooks and context providers for easy integration across the application.",
    results: "Delivered a fully functional, secure authentication system that works on web, iOS, and Android from a single codebase. Implemented proper security practices including password hashing, CSRF protection, and secure session management. Created comprehensive documentation and example implementations.",
    contribution: "Individual project - full-stack development including frontend, backend API, database design, and security implementation.",
    technologies: ["TypeScript", "React", "React Native", "SQLite", "MySQL", "PHP", "JWT"],
    type: "personal",
    links: {
      demo: "https://erinskidds.com/reactuathstatedemo/",
      github: "https://github.com/DudeThatsErin/ReactAuthState"
    }
  },
  {
    id: "social",
    title: "GhostPulse",
    description: "Enterprise-level social media management platform for managing multiple accounts, scheduling posts, and tracking analytics.",
    problem: "Managing multiple social media accounts across different platforms is time-consuming and error-prone. Businesses need a centralized solution to schedule content, track engagement metrics, and manage team workflows efficiently.",
    approach: "Developed a full-stack application using React for the frontend and Node.js/Express for the backend. Integrated with multiple social media APIs (Twitter, Facebook, Instagram) for cross-platform posting. Implemented MongoDB for flexible data storage of posts, analytics, and user data. Built a scheduling system with cron jobs for automated posting. Created real-time analytics dashboard using Chart.js and WebSocket connections.",
    results: "Successfully deployed platform managing 50+ social media accounts. Reduced content posting time by 70% through bulk scheduling features. Provided actionable insights through analytics dashboard, helping clients increase engagement by an average of 35%. Supported team collaboration with role-based access control and approval workflows.",
    contribution: "Lead developer - architected full system, implemented core features, integrated third-party APIs, and deployed to production.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "WebSockets", "Social Media APIs", "Chart.js"],
    type: "work",
    links: {
      github: "https://github.com/DudeThatsErin/ghostpulse"
    }
  },
  {
    id: "enth",
    title: "Project Management Platform",
    description: "Comprehensive web application for project management and team collaboration with real-time features and file management.",
    problem: "Teams needed an integrated solution for project management that combined task tracking, team communication, and file sharing in one platform. Existing solutions were either too complex or lacked critical features for technical teams.",
    approach: "Built a full-stack application using React and Node.js with PostgreSQL for relational data management. Implemented real-time collaboration features using WebSockets for live updates. Created a robust task management system with drag-and-drop interfaces, dependencies, and Gantt chart visualization. Integrated file storage with AWS S3 and implemented secure file sharing with permission controls.",
    results: "Deployed to production serving 200+ users across multiple organizations. Improved team productivity by 45% through streamlined workflows and real-time collaboration. Reduced project planning time by 60% with visual project timelines and automated task dependencies. Achieved 99.9% uptime with proper error handling and monitoring.",
    contribution: "Full-stack developer - designed database schema, built frontend and backend, implemented real-time features, and managed AWS infrastructure.",
    technologies: ["React", "Node.js", "PostgreSQL", "WebSockets", "AWS S3", "Docker"],
    type: "work",
    links: {
      github: "https://github.com/DudeThatsErin/enth-project"
    }
  },
  {
    id: "codinghelp-bot",
    title: "CodingHelp Community Bot & Platform",
    description: "Comprehensive Discord bot and community platform serving thousands of developers with automated moderation, help systems, and learning resources.",
    problem: "The r/CodingHelp community on Discord and Reddit needed automated moderation, code review assistance, and resource management to scale effectively. Manual moderation couldn't keep up with thousands of daily messages and help requests.",
    approach: "Developed a sophisticated Discord bot using Node.js and Discord.js with custom command framework. Implemented natural language processing for automatic code snippet detection and syntax highlighting. Built automated moderation system with spam detection, profanity filtering, and user reputation tracking. Created integration with Reddit API for cross-platform content synchronization. Designed database schema using MongoDB for storing user data, help requests, and community resources.",
    results: "Successfully serving 10,000+ community members across Discord and Reddit. Automated 80% of moderation tasks, reducing moderator workload significantly. Processed over 50,000 help requests with automated code formatting and resource suggestions. Improved community engagement by 60% through gamification and reputation systems. Maintained 99.8% uptime over 3+ years of operation.",
    contribution: "Individual project - designed and built entire bot system, community platform, database architecture, and ongoing maintenance. Founded and grew the community from 0 to 10,000+ members.",
    technologies: ["Node.js", "Discord.js", "MongoDB", "Reddit API", "NLP", "Docker"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/codinghelp-bot"
    }
  }
];
