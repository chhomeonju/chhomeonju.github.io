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
    <div className="bio"><p className="intro-role">M.S. Student · Korea University · PRML Lab</p><h1 className="name">Myeongju Cho</h1>
      <p>I am a master’s student in Brain and Cognitive Engineering at Korea University, working in the <ExternalLink href="http://pr.korea.ac.kr/">Pattern Recognition and Machine Learning (PRML) Lab</ExternalLink>, supervised by Prof. Seong-Whan Lee.</p>
      <p className="contact"><a href="mailto:mj_cho@korea.ac.kr">Email</a><span>/</span><ExternalLink href="https://github.com/Myeongjuuu">GitHub</ExternalLink><span>/</span><ExternalLink href="https://www.linkedin.com/in/myeongju-cho-a690a0387/">LinkedIn</ExternalLink></p>
    </div>
    <div className="portrait-cell"><div className="portrait" role="img" aria-label="Profile photo to be added">Profile photo<br /><small>To be added</small></div></div>
  </div><div className="research-interests" aria-labelledby="research-interests-heading">
    <h2 id="research-interests-heading">Research Interests</h2>
    <div className="research-interests-list">{portfolio.researchInterests.map(interest =>
      <div className="research-interest" key={interest.title}><h3>{interest.title}</h3><p>{interest.description}</p></div>
    )}</div>
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
        <div className="mj-paper-copy"><h2>{p.title}</h2><p className="mj-authors"><Authors>{p.authors}</Authors></p><p className="mj-venue"><span className="venue-name">{p.venue.split(' · ')[0]}</span>{p.venue.includes(' · ') && <span className="venue-status">{` · ${p.venue.split(' · ').slice(1).join(' · ')}`}</span>}</p>
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

const projectEmphasis: Record<string, string> = {
  'project-blpm': 'Latent predictive modeling',
  'project-celp': 'Self-supervised prediction',
  'project-tada': 'adaptive multi-window fusion',
  'project-neuralspeech': 'GAN-based speech synthesis pipeline',
  'project-essenti': 'BERT for sentiment analysis',
  'project-eeg-llm': 'fine-tuned language model',
  'project-neurodecoder': 'imagined-speech EEG experiments',
  'project-inner-speech': 'grouped CSP with LDA/SVM classification',
};

function ProjectContribution({ text, emphasis }: { text: string; emphasis?: string }) {
  if (!emphasis || !text.includes(emphasis)) return <>{text}</>;
  const start = text.indexOf(emphasis);
  return <>{text.slice(0, start)}<strong>{emphasis}</strong>{text.slice(start + emphasis.length)}</>;
}

export function ProjectCard({ project: p, open, onToggle, navigate }: {
  project: Project; index: number; open: boolean;
  onToggle: (id: string, open: boolean) => void; navigate: Navigate;
}) {
  return <article className="project-card" id={p.id} aria-labelledby={`${p.id}-title`}>
    <div className="project-topline"><span className="project-category">{p.category}</span>{p.date && <span className="project-date">{p.date}</span>}</div>
    <div className={`project-preview${p.image ? ' has-image' : ''}`}>
      <div className="project-copy">
        <h3 id={`${p.id}-title`} className="project-title"><span className="project-name">{p.name}</span><span className="project-subtitle">{p.subtitle}</span></h3>
        <p className="project-teaser">{p.teaser}</p>
        <ul className="project-highlights" aria-label={p.contributionLabel}>{p.contributions.map(text => <li key={text}><ProjectContribution text={text} emphasis={projectEmphasis[p.id]} /></li>)}</ul>
        {p.stack.length > 0 && <p className="project-stack"><span className="project-stack-label">Stack</span>{p.stack.join(' · ')}</p>}
        <div className="project-resources">{p.code && <ExternalLink href={p.code}>GitHub ↗</ExternalLink>}{p.relatedPublication && <a href="#publications" onClick={e => navigate(e, 'publications')}>Paper ↑</a>}</div>
      </div>
      {p.image && <figure className="project-visual project-visual-image"><img src={p.image.src} alt={p.image.alt} loading="lazy" />{p.image.caption && <figcaption>{p.image.caption}</figcaption>}</figure>}
    </div>
    <details className="project-notes" open={open} onToggle={event => onToggle(p.id, event.currentTarget.open)}>
      <summary>Research details</summary>
      <div className="project-detail"><p>{p.goal}</p><p className="project-approach"><span>Approach</span>{p.steps.join(' → ')}</p>
        {p.relatedPublication && <p className="project-related">{p.relatedPublication.title}<br /><span>{p.relatedPublication.venue}</span></p>}
        <a className="project-permalink" href={`#${p.id}`} onClick={e => navigate(e, p.id)}>Link to this project ↗</a>
      </div>
    </details>
  </article>;
}

export function Awards() {
  return <section id="awards"><h2>Honors and Awards</h2><table className="entries"><tbody>{portfolio.awards.map(award => <tr key={award.title}><td><p className="mj-status">{award.date}</p><span className="papertitle">{award.title}</span><p>{award.organization}</p>{award.detail && <p className="mj-small">{award.detail}</p>}</td></tr>)}</tbody></table></section>;
}

export function Timeline({ id, title, entries }: { id: string; title: string; entries: TimelineEntry[] }) {
  return <section id={id}><h2>{title}</h2><table className="timeline"><tbody>{entries.map(entry => <tr key={entry.title}><td><h3>{entry.title}</h3><p>{entry.description}</p></td><td>{entry.date}</td></tr>)}</tbody></table></section>;
}
