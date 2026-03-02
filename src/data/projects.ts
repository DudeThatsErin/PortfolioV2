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
    id: "sasha-v2",
    title: "Sasha AI v2 - RAG-Powered Knowledge Assistant",
    description: "A ground-up rebuild of Sasha AI with Retrieval-Augmented Generation (RAG), replacing the static prompt injection of v1 with a semantic vector search pipeline for more accurate and context-aware responses.",
    problem: "In v1, all knowledge entries were injected into every prompt as a static block of text. As the knowledge base grew, this became token-inefficient and caused the LLM to ignore or hallucinate over less-relevant entries. The system needed a smarter way to surface only the most relevant knowledge per query.",
    approach: "Replaced the static prompt injection with a full RAG pipeline: knowledge entries are embedded via nomic-embed-text (Ollama) and stored in ChromaDB. On each query, the top-K most semantically relevant chunks are retrieved and injected into the prompt instead of the entire knowledge base. Preserved all v1 features (knowledge CRUD, pending approval queue, Discord bot, JWT auth) and added new admin endpoints for RAG status and index rebuilding. Falls back gracefully to v1 behavior if the embed model is unavailable.",
    results: "Significantly more accurate responses on large knowledge bases — only relevant context reaches the LLM. RAG index auto-syncs on startup and on every CRUD operation so it's always current. The v1 frontend works with the v2 backend with zero changes, making the upgrade seamless. New Discord commands (/knowledge-rebuild, /rag-status) give full visibility into the vector index.",
    contribution: "Individual project — designed and implemented the RAG pipeline, ChromaDB integration, embedding sync system, and all new endpoints while maintaining full backward compatibility.",
    technologies: ["Python", "FastAPI", "ChromaDB", "nomic-embed-text", "Ollama", "Qwen 2.5", "RAG", "SQLite", "Next.js", "TypeScript", "Discord.py"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/sasha-ai",
      demo: "https://chat.erinskidds.com"
    }
  },
  {
    id: "sasha-v1",
    title: "Sasha AI v1 - Personal Knowledge Assistant",
    description: "An AI-powered personal assistant that answers questions about my experience, knowledge, and personality — deployed live as a portfolio widget and Discord bot.",
    problem: "Static resumes and portfolios can't answer follow-up questions or convey personality. I wanted visitors to my portfolio to have a genuine interactive conversation with 'me' rather than read a wall of text — and I wanted a scalable way to manage what Sasha knows over time.",
    approach: "Built a FastAPI backend running a locally-hosted LLM (Qwen 2.5 via Ollama) with a curated SQLite knowledge base. Designed a teach-intent detection system so Sasha can recognize when someone wants her to learn something new, queue it for approval, and ping me via Discord buttons to approve or deny it. Built a Next.js chat frontend and a Discord bot (Erin's Little Helper) for knowledge management via slash commands.",
    results: "Deployed and running live at chat.erinskidds.com. Sasha correctly answers questions about my tech stack, work history, and personality. The approval workflow makes the knowledge base easy to grow without touching code. Discord slash commands allow full CRUD on the knowledge base from anywhere.",
    contribution: "Individual project — designed full architecture, built backend, frontend, Discord bot, and deployment pipeline from scratch.",
    technologies: ["Python", "FastAPI", "Ollama", "Qwen 2.5", "SQLite", "Next.js", "TypeScript", "Discord.py", "NSSM"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/sasha-ai",
      demo: "https://chat.erinskidds.com"
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
