'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'work' | 'personal'>('all');

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.type === filter
  );

  return (
    <main className="about-content" role="main" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="numbered-heading">03. Project Case Studies</h2>
      
      <p style={{ marginBottom: '2rem', maxWidth: '800px' }}>
        Each project below showcases the problem I solved, my technical approach, measurable results, and my specific contribution to the work.
      </p>

      <div className="filter-buttons" role="tablist" aria-label="Filter projects by category">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
          role="tab"
          aria-selected={filter === 'all'}
        >
          All Projects
        </button>
        <button
          className={`filter-btn ${filter === 'work' ? 'active' : ''}`}
          onClick={() => setFilter('work')}
          role="tab"
          aria-selected={filter === 'work'}
        >
          Professional Work
        </button>
        <button
          className={`filter-btn ${filter === 'personal' ? 'active' : ''}`}
          onClick={() => setFilter('personal')}
          role="tab"
          aria-selected={filter === 'personal'}
        >
          Personal Projects
        </button>
      </div>
      
      <div className="projects-case-studies" role="tabpanel">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="case-study-card"
            data-project-type={project.type}
          >
            <div className="case-study-header">
              <h3 className="case-study-title">{project.title}</h3>
              <span className="project-type-badge">{project.type === 'work' ? 'Professional' : 'Personal'}</span>
            </div>
            
            <p className="case-study-description">{project.description}</p>

            <div className="case-study-section">
              <h4 className="case-study-label">Problem</h4>
              <p>{project.problem}</p>
            </div>

            <div className="case-study-section">
              <h4 className="case-study-label">Approach</h4>
              <p>{project.approach}</p>
            </div>

            <div className="case-study-section">
              <h4 className="case-study-label">Results & Impact</h4>
              <p>{project.results}</p>
            </div>

            <div className="case-study-section">
              <h4 className="case-study-label">My Contribution</h4>
              <p>{project.contribution}</p>
            </div>

            <div className="case-study-footer">
              <div className="tech-stack">
                <strong>Technologies:</strong>
                <div className="tech-tags">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="project-links">
                {project.links.github && (
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`View ${project.title} code on GitHub`}
                  >
                    <i className="fa-brands fa-github" aria-hidden="true"></i>
                    <span>View Code</span>
                  </a>
                )}
                {project.links.demo && (
                  <a 
                    href={project.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`View ${project.title} live demo`}
                  >
                    <i className="fa-solid fa-external-link" aria-hidden="true"></i>
                    <span>Live Demo</span>
                  </a>
                )}
                {project.links.website && (
                  <a 
                    href={project.links.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`Visit ${project.title} website`}
                  >
                    <i className="fa-solid fa-globe" aria-hidden="true"></i>
                    <span>Visit Site</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
