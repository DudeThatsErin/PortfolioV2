'use client';

import { useState, useEffect } from 'react';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'work' | 'personal'>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.type === filter
  );

  const selectedProjectData = projects.find(p => p.id === selectedProject);

  return (
    <main className="about-content" role="main" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="numbered-heading">04. Some Things I've Built & Worked On</h2>
      
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
          Work Projects
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
      
      <div className="featured" role="tabpanel">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={project.id + '_feat'}
            data-project-type={project.type}
          >
            <div className="body">
              <h3 className="workTitle">{project.title}</h3>
              <p className="details" dangerouslySetInnerHTML={{ __html: project.description }} />
              <button 
                className="modal-button"
                onClick={() => setSelectedProject(project.id)}
                aria-haspopup="dialog"
                aria-label={`Read more about ${project.title} project`}
              >
                Click here to read more...
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && selectedProjectData && (
        <div 
          className="modal"
          style={{ display: 'block' }}
          role="dialog"
          aria-labelledby={`${selectedProject}ModalTitle`}
          aria-hidden="false"
        >
          <div className="modal-content">
            <div className="modal-header">
              <span 
                className="close" 
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
              >
                &times;
              </span>
              <h2 id={`${selectedProject}ModalTitle`}>{selectedProjectData.title}</h2>
            </div>
            <div className="modal-body">
              {selectedProjectData.image && !isMobile && (
                <div style={{ width: '100%', margin: '0 auto', textAlign: 'center' }}>
                  <img 
                    src={selectedProjectData.image} 
                    className="img" 
                    alt={`Screenshot of ${selectedProjectData.title}`} 
                  />
                </div>
              )}
              <p dangerouslySetInnerHTML={{ 
                __html: selectedProjectData.fullDescription || selectedProjectData.description 
              }} />
            </div>
            <div className="modal-footer">
              <p className="langs">
                <strong>Languages Used:</strong> {selectedProjectData.technologies.join(', ')}
              </p>
              <p><strong>Find {selectedProjectData.title} Here:</strong></p>
              <div className="links" style={{ paddingTop: '8px' }}>
                {selectedProjectData.links.github && (
                  <a 
                    href={selectedProjectData.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`View ${selectedProjectData.title} code on GitHub (opens in new tab)`}
                  >
                    <i className="fa-brands fa-github" aria-hidden="true" title="View the Code"></i>
                    <span className="visually-hidden">View the Code on GitHub</span>
                  </a>
                )}
                {(selectedProjectData.links.demo || selectedProjectData.links.website) && (
                  <a 
                    href={selectedProjectData.links.demo || selectedProjectData.links.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={`View ${selectedProjectData.title} live site (opens in new tab)`}
                  >
                    <i className="fa-solid fa-external-link" aria-hidden="true" title="View Live Site"></i>
                    <span className="visually-hidden">View Live Site</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
