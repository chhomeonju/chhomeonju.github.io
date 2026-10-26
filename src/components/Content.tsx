import type { MouseEvent, ReactNode } from 'react';
import { portfolio } from '../data/portfolio';
import type { Project, TimelineEntry } from '../types';

export type Navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => void;

export function Authors({ children }: { children: string }) {
  return <>{children.split(/(M\.-J\. Cho\*?)/).map((text, index) =>
    text.startsWith('M.-J. Cho') ? <strong key={index}>{text}</strong> : text)}</>;
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export function About() {
  return <header id="about"><div className="intro">
    <div className="bio"><p className="name">Myeongju Cho</p>
      <p>I am a master’s student in Brain and Cognitive Engineering at Korea University, working in the <ExternalLink href="http://pr.korea.ac.kr/">Pattern Recognition and Machine Learning (PRML) Lab</ExternalLink>, supervised by Prof. Seong-Whan Lee.</p>
      <p className="contact"><a href="mailto:mj_cho@korea.ac.kr">Email</a><span>/</span><ExternalLink href="https://github.com/Myeongjuuu">GitHub</ExternalLink><span>/</span><ExternalLink href="https://www.linkedin.com/in/myeongju-cho-a690a0387/">LinkedIn</ExternalLink></p>
    </div>
    <div className="portrait-cell"><div className="portrait" role="img" aria-label="Profile photo to be added">Profile photo<br /><small>To be added</small></div></div>
  </div></header>;
}

export function Publications() {
  return <section id="publications"><h2>Publications</h2>
    <p className="contribution">* Equal contribution · † Corresponding author</p>
    <div className="publication-list">{portfolio.publications.map(p =>
      <article className={`mj-paper${p.image ? '' : ' mj-without-image'}`} key={p.title}>
        {p.image && <figure className="mj-figure"><div className="mj-real-figure"><img
          src={p.image} alt={p.imageAlt ?? p.title}
          width={p.image.includes('continuous-latent') ? 1482 : 945}
          height={p.image.includes('continuous-latent') ? 720 : 438}
        /></div></figure>}
        <div className="mj-paper-copy"><h2>{p.title}</h2><p className="mj-authors"><Authors>{p.authors}</Authors></p><p className="mj-venue">{p.venue}</p>
          {p.links.length > 0 && <div className="mj-links">{p.links.map(link => <ExternalLink key={link.href} href={link.href}>{link.label}</ExternalLink>)}</div>}
        </div>
      </article>
    )}</div>
  </section>;
}

export function Presentations() {
  return <section id="presentations"><h2>Poster Presentations</h2>
    <table className="entries"><tbody>{portfolio.presentations.map(p => <tr key={p.title + p.status}><td>
      <p className="mj-status">{p.status}</p><span className="papertitle">{p.title}</span>
      <p className="mj-authors"><Authors>{p.authors}</Authors></p><p className="mj-venue">{p.venue}</p><p className="mj-small">{p.location}</p>
    </td></tr>)}</tbody></table>
  </section>;
}

export function ProjectCard({ project: p, index, open, onToggle, navigate }: {
  project: Project; index: number; open: boolean;
  onToggle: (id: string, open: boolean) => void; navigate: Navigate;
}) {
  return <details className="project-card" id={p.id} open={open} onToggle={event => onToggle(p.id, event.currentTarget.open)}>
    <summary>
      <span className="project-topline"><span className="project-category">{p.category}</span><span className="project-date">{p.date}</span></span>
      <span className="project-preview">
        <span className="project-copy">
          <span className="project-title-row"><span className="project-number">{String(index + 1).padStart(2, '0')}</span><span className="project-name">{p.name}</span></span>
          <span className="project-subtitle">{p.subtitle}</span><span className="project-teaser">{p.teaser}</span>
          <span className="project-highlights">{p.contributions.slice(0, 2).map(text => <span key={text}>{text}</span>)}</span>
          <span className="project-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</span>
          {p.stack.length > 0 && <span className="project-stack"><span className="project-stack-label">Tools &amp; methods</span><span className="project-stack-items">{p.stack.map(tool => <span key={tool}>{tool}</span>)}</span></span>}
        </span>
        {p.image ? <span className="project-visual project-visual-image"><img src={p.image.src} alt={p.image.alt} loading="lazy" />{p.image.caption && <span className="project-image-caption">{p.image.caption}</span>}</span>
          : <span className="project-visual project-workflow" aria-label="Project approach"><span className="project-visual-label">Approach</span><span className="project-workflow-nodes">{p.steps.map((step, i) => <span className="project-workflow-node" key={step}><span>{String(i + 1).padStart(2, '0')}</span><span>{step}</span></span>)}</span></span>}
      </span>
      <span className="project-toggle"><span className="when-closed">Explore project</span><span className="when-open">Close details</span><span className="toggle-symbol" aria-hidden="true">+</span></span>
    </summary>
    <div className="project-detail"><div className="project-detail-grid">
      <div><h4>Research / project goal</h4><p>{p.goal}</p></div>
      <div><h4>{p.contributionLabel}</h4><ul>{p.contributions.map(text => <li key={text}>{text}</li>)}</ul></div>
    </div><h4>Approach</h4><ol className="project-steps">{p.steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
      {p.relatedPublication && <div className="project-publication"><h4>Related publication</h4><p>{p.relatedPublication.title}</p><p className="mj-small">{p.relatedPublication.venue}</p><a href="#publications" onClick={e => navigate(e, 'publications')}>View publications ↑</a></div>}
      <div className="project-resources">{p.code && <ExternalLink className="project-code" href={p.code}>View source on GitHub ↗</ExternalLink>}<a className="project-permalink" href={`#${p.id}`} onClick={e => navigate(e, p.id)}>Link to this project ↗</a></div>
    </div>
  </details>;
}

export function Awards() {
  return <section id="awards"><h2>Honors and Awards</h2><table className="entries"><tbody>{portfolio.awards.map(award => <tr key={award.title}><td><p className="mj-status">{award.date}</p><span className="papertitle">{award.title}</span><p>{award.organization}</p>{award.detail && <p className="mj-small">{award.detail}</p>}</td></tr>)}</tbody></table></section>;
}

export function Timeline({ id, title, entries }: { id: string; title: string; entries: TimelineEntry[] }) {
  return <section id={id}><h2>{title}</h2><table className="timeline"><tbody>{entries.map(entry => <tr key={entry.title}><td><h3>{entry.title}</h3><p>{entry.description}</p></td><td>{entry.date}</td></tr>)}</tbody></table></section>;
}
