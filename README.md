# Erin Skidds - Portfolio (Next.js)

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. This is a complete recreation of the original PHP portfolio with enhanced performance, accessibility, and modern development practices.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Performance Optimized**: Fast loading with Next.js optimizations
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Interactive Components**: Smooth animations and hover effects
- **Project Filtering**: Dynamic filtering for work vs personal projects
- **Contact Form**: Functional contact form with validation
- **Resume Downloads**: PDF and Word format downloads

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── projects/          # Projects showcase with filtering
│   ├── resume/            # Resume download page
│   ├── work/              # Work experience timeline
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   └── Header.tsx         # Navigation header with mobile menu
├── data/                  # Data files
│   ├── jobs.ts           # Work experience data
│   └── projects.ts       # Projects data
└── public/assets/        # Static assets (images, resume files)
```

## 🎨 Design Features

- **Dark Theme**: Professional dark color scheme with emerald accents
- **Typography**: Custom Google Fonts (Open Sans, Raleway, Oswald)
- **Animations**: Smooth transitions and hover effects
- **Mobile Navigation**: Hamburger menu with overlay
- **Social Links**: Fixed sidebar with GitHub and LinkedIn
- **Email Contact**: Vertical email display on desktop

## 🛠️ Technologies Used

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Open Sans, Raleway, Oswald)
- **Icons**: Font Awesome
- **Development**: ESLint, Prettier (configured)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📄 Pages

- **Homepage** (`/`): Introduction and hero section
- **About** (`/about`): Personal background and technologies
- **Work** (`/work`): Professional experience timeline
- **Projects** (`/projects`): Portfolio projects with filtering
- **Contact** (`/contact`): Contact form and information
- **Resume** (`/resume`): Resume download links

## 🎯 Key Components

### Header Component
- Responsive navigation with mobile hamburger menu
- Active page highlighting
- Social media links sidebar
- Skip-to-content accessibility link

### Projects Page
- Dynamic filtering (All/Work/Personal projects)
- Modal dialogs for detailed project information
- Technology tags and external links
- Responsive grid layout

### Work Experience
- Timeline-style layout
- Detailed job descriptions
- Company and date information
- Hover effects and animations

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Adjusted layouts for medium screens
- **Desktop**: Full-featured experience with sidebars
- **Large Screens**: Optimal spacing and typography

## ♿ Accessibility Features

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader friendly navigation
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Skip Links**: Quick navigation for screen readers
- **Color Contrast**: WCAG AA compliant color ratios

## 🔧 Customization

### Adding New Projects
Edit `src/data/projects.ts` to add new projects with the following structure:

```typescript
{
  id: "unique-id",
  title: "Project Title",
  description: "Short description...",
  fullDescription: "Detailed description...",
  image: "/assets/project-image.png",
  technologies: ["React", "TypeScript", "etc"],
  type: "personal" | "work",
  links: {
    github: "https://github.com/...",
    demo: "https://demo-url.com"
  }
}
```

### Adding Work Experience
Edit `src/data/jobs.ts` to add new positions:

```typescript
{
  id: "company-name",
  title: "Job Title",
  company: "Company Name",
  startDate: "YYYY",
  endDate: "YYYY" | "Present",
  responsibilities: ["Achievement 1", "Achievement 2", ...]
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Drag and drop the `out` folder after `npm run build`
- **AWS S3**: Upload static files after `npm run build && npm run export`
- **GitHub Pages**: Use `gh-pages` package for deployment

## 📈 Performance

- **Next.js Optimizations**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component for optimal loading
- **Font Optimization**: Google Fonts with display swap
- **CSS Optimization**: Tailwind CSS purging for minimal bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Erin Skidds**
- Website: [erinskidds.com](https://erinskidds.com)
- GitHub: [@DudeThatsErin](https://github.com/DudeThatsErin)
- LinkedIn: [erinskidds](https://linkedin.com/in/erinskidds)
- Email: erin.skidds@gmail.com

---

Built with ❤️ using Next.js and Tailwind CSS
