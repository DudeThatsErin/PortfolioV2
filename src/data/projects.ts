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
    id: "apple-queue",
    title: "Apple Queue - AI Natural-Language Capture for Apple Notes, Reminders & Calendar",
    description: "A cross-browser extension and queueing pipeline that turns a single plain-English sentence into a structured Apple Note, Reminder, or Calendar event — parsed by a self-hosted LLM running on my own server, with no third-party AI service involved.",
    problem: "Apple has no public write API for Notes, Reminders, or Calendar, so capturing something from the browser meant switching to my phone and retyping it. I had already built a queue-and-Shortcut pipeline to bridge that gap, but filling in the form was still the slow part: picking a type, formatting a date, choosing a list. I wanted to type \"call the vet friday at 3pm\" and have the right fields appear — and I wanted the AI doing it to run on hardware I control, since these are personal notes.",
    approach: "Self-hosted Ollama on my Oracle Cloud ARM server (Ampere Neoverse-N1, 4 vCPU, 23 GB RAM, no GPU). I first evaluated Kimi K2 but ruled it out on hardware grounds — a ~1T-parameter MoE needs hundreds of gigabytes and a GPU — and settled on Qwen2.5 3B Instruct, deliberately choosing a non-reasoning model after measuring that reasoning models (Qwen3, DeepSeek-R1) spent their entire token budget on hidden thinking and turned a 10-second call into 40+. The key architectural decision was refusing to let the model do everything: my first version asked it to resolve dates against a lookup table and it returned empty or wrong dates a large fraction of the time, at 31 seconds a request. I split the work — dates and times are resolved by a deterministic TypeScript rule engine (weekdays, relative offsets, ranges like \"3-4pm\", durations, dayparts), and the LLM only classifies the type and writes a title, which is what small models are actually good at. Everything targets an OpenAI-compatible endpoint, so the local model can be swapped for a hosted API by changing one environment variable.",
    results: "Cut latency from 31 seconds to a 2.7-second median while making date handling exact rather than probabilistic — the rule engine has 37 tests covering both correct parses and false-positive guards, so \"read chapters 3-4\" and \"buy 3 apples\" are never misread as times. Classification accuracy measured 9/10 on realistic phrasings. Hardened the output against small-model failure modes: parsed list and folder names are validated against an allow-list so the model can't invent a destination, and a single-flight gate returns 429 rather than letting two generations thrash four CPU cores. The AI is opt-in and off by default, and the parse only ever fills the form — nothing is queued without an explicit confirmation, so a misread date is always visible before it reaches a device.",
    contribution: "Individual project — provisioned and tuned the local inference stack, designed the hybrid rule-engine/LLM architecture, wrote the date parser and its test suite, built the parsing API and the extension UI, and benchmarked model choices on the target hardware.",
    technologies: ["Ollama", "Qwen2.5 3B Instruct", "Self-Hosted LLM", "OpenAI-Compatible API", "Prompt Engineering", "TypeScript", "Next.js", "Chrome Extension (MV3)", "Firefox WebExtensions", "Node.js", "iOS Shortcuts", "GitHub Actions", "Oracle Cloud ARM"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/AppleQueue"
    }
  },
  {
    id: "onenote-ai-dashboard",
    title: "OneNote API & Self-Hosted AI Dashboard",
    description: "A self-hosted control panel and HTTP API over Microsoft OneNote, with a local LLM layer that can summarize, restructure, or rewrite any note, page, or queued item on demand — all inference running on my own server.",
    problem: "My OneNote automation had grown into a Discord bot, a raw Node HTTP server talking to Microsoft Graph, an hourly table-of-contents job, and three queueing APIs — with no single place to see what any of it could do. Wiring up a new iOS Shortcut meant rereading source code to find parameter names and limits. Separately, I wanted to run my own notes through an LLM to summarize long pages or pull action items out of meeting notes, without shipping personal content to a third-party API.",
    approach: "Built a shared AI client targeting any OpenAI-compatible endpoint, defaulting to Ollama running Qwen2.5 3B Instruct locally, then exposed it three ways rather than bolting it onto one screen: a general-purpose transform endpoint with preset actions (summarize, bullets, action items, clean up, expand, title) plus free-form custom instructions; an \"ai\" query parameter on the OneNote read API that pipes fetched page content straight through the model; and an optional field on the Notes, Reminders, and Calendar write APIs that cleans content before it is queued. Custom instructions are passed as a separate message turn rather than concatenated into the system prompt, so user input can't rewrite the model's instructions. I also documented the entire OneNote surface — five endpoints, every parameter, and the real constraints — on a reference page in the dashboard.",
    results: "Any note or OneNote page can now be summarized or restructured in place, with results shown for review and explicit replace/append/discard actions rather than silently overwriting the original. Degradation is deliberate: if the model is busy or fails mid-write, the item still saves with its original text and a machine-readable reason attached, because losing a note to a failed transform is far worse than saving it untidied. Summarizing roughly 4 KB of real page content takes about 38 seconds on CPU, which the docs state plainly alongside the 12,000-character input cap so the limits aren't a surprise. The API reference documents what the integration genuinely cannot do — no delete, append-only editing, exact case-sensitive title matching — and surfaced two real findings in the process: an unauthenticated health endpoint and an OAuth scope gap that silently broke file uploads.",
    contribution: "Individual project — designed the shared inference layer, built the transform and OneNote AI endpoints, wired the AI into the dashboard UI, audited the existing OneNote API surface, and wrote the public reference documentation including its limits and failure modes.",
    technologies: ["Ollama", "Qwen2.5 3B Instruct", "Self-Hosted LLM", "OpenAI-Compatible API", "Prompt Engineering", "Microsoft Graph API", "OAuth 2.0", "Next.js", "TypeScript", "React", "Node.js", "SQLite", "PM2", "iOS Shortcuts"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/ErinsHelperDiscordBot"
    }
  },
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
