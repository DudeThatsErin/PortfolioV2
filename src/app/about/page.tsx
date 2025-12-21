export default function AboutPage() {
  const technologies = [
    "JavaScript (Node.js, React, Angular, Vue), TypeScript (Angular)",
    "C, C++, C#/C#.NET, Python",
    "HTML 5/CSS 3/SCSS/SASS",
    "CSS Animations",
    "SQL (MySQL, MSSQL, SQLite, MongoDB, NoSQL and PostGresSQL)",
    "WordPress & WordPress Plugins",
    "PHP (Sage/Roots and more)",
    "Python, PyTorch, Django",
    "AWS, EC2, CodeBuild, CodeDeploy, API Gateway, CloudWatch, CloudFront, DynamoDB"
  ];

  return (
    <main className="about-content" role="main" aria-labelledby="about-heading">
      <h1 id="about-heading" className="numbered-heading">
        02. About Me
      </h1>
      
      <section aria-labelledby="intro-heading">
        <h2 id="intro-heading" className="visually-hidden">Introduction</h2>
        <p>
          Hello! My name is Erin and I enjoy creating interactive bots and things that live on the internet. My interest is in bots and applying language learning models to them. I started about 9 years ago by creating a discord bot for my CodingHelp discord server that I authored. I have since started teaching myself how to apply language learning models to bots that I have created for websites and discord.
        </p>
      </section>
      
      <section aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="visually-hidden">Professional Experience</h2>
        <p>
          Fast-forward to today, I have worked at multiple companies as a Full Stack Software Engineer. I got my start in my professional career working for River & Reef Aquaculture as their Full Stack Software Engineer. But also, during my time as a freelance Full Stack Engineer before River & Reef, I have developed websites and applications from scratch for clients like Travel Agent 360 and more.
        </p>
      </section>
      
      <section aria-labelledby="technologies-heading">
        <h2 id="technologies-heading" className="visually-hidden">Technologies I Work With</h2>
        <p>Here are a few technologies I've been working with recently:</p>
        <ul className="list" role="list" aria-label="Technologies and programming languages">
          {technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
