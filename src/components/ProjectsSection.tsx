import { useState } from 'react';
import { portfolio } from '../data/portfolio';
import { ProjectCard } from './Content';
import type { Navigate } from './Content';

export function ProjectsSection({ navigate }: { navigate: Navigate }) {
  const [active, setActive] = useState<string | null>(null);

  const allTags = [...new Set(portfolio.projects.flatMap(p => p.tags))].sort();
  const filtered = active
    ? portfolio.projects.filter(p => p.tags.includes(active))
    : portfolio.projects;

  return (
    <section id="projects">
      <div className="projects-heading">
        <h2>Projects</h2>
        <p>Research and applied work, from neural signals to language.</p>
      </div>
      <div className="projects-filter" role="group" aria-label="Filter by keyword">
        <button
          className={`projects-filter-btn${active === null ? ' active' : ''}`}
          onClick={() => setActive(null)}
          aria-pressed={active === null}
        >All</button>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`projects-filter-btn${active === tag ? ' active' : ''}`}
            onClick={() => setActive(t => t === tag ? null : tag)}
            aria-pressed={active === tag}
          >{tag}</button>
        ))}
      </div>
      <div className="project-grid">
        {filtered.map(project => (
          <ProjectCard key={project.id} project={project} navigate={navigate} />
        ))}
      </div>
    </section>
  );
}
