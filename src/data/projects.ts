export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  results: string;
  contribution: string;
  technologies: string[];
  type?: 'personal' | 'work';
  links: {
    github?: string;
    demo?: string;
    website?: string;
  };
}

export const projects: Project[] = [
  {
    id: "sasha",
    title: "Sasha AI - Personal Knowledge Assistant",
    description: "An AI-powered personal knowledge base using PyTorch and natural language processing to create an interactive digital legacy.",
    problem: "Traditional portfolios and resumes provide static information that doesn't allow for interactive exploration of a person's experiences, knowledge, and personality. There's no scalable way to preserve personal knowledge and stories for future generations in an interactive format.",
    approach: "Built a custom AI system using PyTorch with natural language processing and deep learning models. Implemented training pipelines to learn from personal documents, conversations, and experiences. Designed a conversational interface that allows users to ask questions and receive contextual, personalized responses. Integrated vector databases for efficient semantic search and retrieval.",
    results: "Created a functional AI assistant capable of answering questions about my professional experience, technical knowledge, and personal journey. Serves as both a portfolio tool for interviews and a digital family heirloom. Demonstrates advanced understanding of NLP, model training, and production AI deployment.",
    contribution: "Individual project - designed architecture, trained models, built entire system from scratch.",
    technologies: ["Python", "PyTorch", "NLP", "Vector Databases", "Deep Learning"],
    links: {
      github: "https://github.com/DudeThatsErin/sasha-ai"
    }
  },
  // {
  //   id: "social",
  //   title: "GhostPulse",
  //   description: "Enterprise-level social media management platform for managing multiple accounts, scheduling posts, and tracking analytics.",
  //   problem: "Managing multiple social media accounts across different platforms is time-consuming and error-prone. Businesses need a centralized solution to schedule content, track engagement metrics, and manage team workflows efficiently.",
  //   approach: "Developed a full-stack application using React for the frontend and Node.js/Express for the backend. Integrated with multiple social media APIs (Twitter, Facebook, Instagram) for cross-platform posting. Implemented MongoDB for flexible data storage of posts, analytics, and user data. Built a scheduling system with cron jobs for automated posting. Created real-time analytics dashboard using Chart.js and WebSocket connections.",
  //   results: "Successfully deployed platform managing 50+ social media accounts. Reduced content posting time by 70% through bulk scheduling features. Provided actionable insights through analytics dashboard, helping clients increase engagement by an average of 35%. Supported team collaboration with role-based access control and approval workflows.",
  //   contribution: "Lead developer - architected full system, implemented core features, integrated third-party APIs, and deployed to production.",
  //   technologies: ["React", "Node.js", "Express", "MongoDB", "WebSockets", "Social Media APIs", "Chart.js"],
  //   type: "work",
  //   links: {
  //     github: "https://github.com/DudeThatsErin/ghostpulse"
  //   }
  // },
];
