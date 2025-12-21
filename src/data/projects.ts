export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
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
    id: "sasha",
    title: "Sasha AI",
    description: "This is an in progress AI I am creating using PyTorch...",
    fullDescription: "This is an in progress AI I am creating using PyTorch. The goal of this AI is to use Natural Language and Deep Learning Processes to learn about me and to let interviewers and friends and family ask it questions to learn about me. I also plan to keep this up so my future children can use it to learn about their mother as sort of digital family heirloom that knows all about me.",
    image: "/assets/bot.png",
    technologies: ["Python", "PyTorch"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/sasha-ai"
    }
  },
  {
    id: "reactauth",
    title: "React Auth State Demo",
    description: "This project is a simple authentication system built using...",
    fullDescription: "This project is a simple authentication system built using React and SQLite, designed to handle user registration, login, and profile management. The app stores user credentials securely and handles session management for authenticated users. It is built to work on both web and mobile platforms using React Native Web.",
    image: "/assets/reactAuth.png",
    technologies: ["JavaScript", "TypeScript", "React", "React Native", "SQLite", "MySQL", "PHP"],
    type: "personal",
    links: {
      demo: "https://erinskidds.com/reactuathstatedemo/",
      github: "https://github.com/DudeThatsErin/ReactAuthState"
    }
  },
  {
    id: "reactcounter",
    title: "React Counter App",
    description: "A simple counter application built with React...",
    fullDescription: "A simple counter application built with React to demonstrate state management and component lifecycle. This project showcases basic React concepts including hooks, state updates, and event handling.",
    image: "/assets/reactCounter.png",
    technologies: ["JavaScript", "React", "CSS"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/ReactCounter"
    }
  },
  {
    id: "reacttodo",
    title: "React Todo App",
    description: "A todo list application built with React...",
    fullDescription: "A comprehensive todo list application built with React featuring add, edit, delete, and mark complete functionality. Demonstrates advanced React patterns including context API, custom hooks, and local storage integration.",
    image: "/assets/reacttodo.png",
    technologies: ["JavaScript", "React", "CSS", "Local Storage"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/ReactTodo"
    }
  },
  {
    id: "social",
    title: "Social Media Dashboard",
    description: "A social media management dashboard...",
    fullDescription: "A comprehensive social media management dashboard that allows users to manage multiple social media accounts from a single interface. Features include post scheduling, analytics, and engagement tracking.",
    image: "/assets/social.png",
    technologies: ["JavaScript", "React", "Node.js", "Express", "MongoDB"],
    type: "work",
    links: {
      github: "https://github.com/DudeThatsErin/social-dashboard"
    }
  },
  {
    id: "hangman",
    title: "Hangman Game",
    description: "A classic hangman word guessing game...",
    fullDescription: "A classic hangman word guessing game built with vanilla JavaScript. Features include random word selection, letter guessing, visual hangman drawing, and score tracking.",
    image: "/assets/hangman.png",
    technologies: ["JavaScript", "HTML", "CSS"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/hangman-game"
    }
  },
  {
    id: "asteroids",
    title: "Asteroids Game",
    description: "A recreation of the classic Asteroids arcade game...",
    fullDescription: "A recreation of the classic Asteroids arcade game using HTML5 Canvas and JavaScript. Features include ship movement, asteroid collision detection, scoring system, and progressive difficulty levels.",
    image: "/assets/asteroids.png",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS"],
    type: "personal",
    links: {
      github: "https://github.com/DudeThatsErin/asteroids-game"
    }
  },
  {
    id: "enth",
    title: "Enth Project",
    description: "A comprehensive web application...",
    fullDescription: "A comprehensive web application built for project management and team collaboration. Features include task assignment, progress tracking, team messaging, and file sharing capabilities.",
    image: "/assets/enth.png",
    technologies: ["JavaScript", "React", "Node.js", "PostgreSQL"],
    type: "work",
    links: {
      github: "https://github.com/DudeThatsErin/enth-project"
    }
  }
];
