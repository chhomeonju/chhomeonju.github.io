import { useState } from 'react';
import { portfolio } from '../data/portfolio';
import { ProjectCard } from './Content';
import type { Navigate } from './Content';

const tagOrder = [
  'EEG', 'fMRI', 'ECoG',
  'Encoding', 'Decoding', 'Functional connectivity', 'BCI', 'Imagined Speech', 'Inner speech', 'Motor Imagery', 'Brain-to-Speech',
  'Foundation Model', 'Representation learning', 'Self-supervised learning', 'LLM fine-tuning',
  'Echo State Network', 'GAN', 'NLP', 'BERT', 'KoBART', 'Web',
];

export function ProjectsSection({ navigate }: { navigate: Navigate }) {
  const [active, setActive] = useState<string | null>(null);

  const projectTags = new Set(portfolio.projects.flatMap(p => p.tags));
  const allTags = [
    ...tagOrder.filter(tag => projectTags.has(tag)),
    ...[...projectTags].filter(tag => !tagOrder.includes(tag)).sort(),
  ];
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
