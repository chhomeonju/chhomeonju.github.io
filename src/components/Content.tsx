import type { MouseEvent, ReactNode } from 'react';
import { portfolio } from '../data/portfolio';
import type { Project, TimelineEntry } from '../types';
import { SkillIcon } from './SkillIcon';
import { Mail, MapPin } from 'lucide-react';
import { ResearchInterestsBrain } from './ResearchInterestsBrain';
export type Navigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => void;


export function Authors({ children }: { children: string }) {
  return <>{children.split(/(M\.-J\. Cho\*?)/).map((text, index) =>
    text.startsWith('M.-J. Cho') ? <strong key={index}>{text}</strong> : text)}</>;
}

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
}

export function ResearchTrajectory() {
  return (
    <section aria-labelledby="research-trajectory-heading">
      <div className="research-interests" aria-labelledby="research-trajectory-heading">
        <h2 id="research-trajectory-heading">Research Trajectory</h2>
        <div className="research-interests-list">{portfolio.researchInterests.map(interest =>
          <div className="research-interest" key={interest.title}>
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
          </div>
        )}</div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about">
      <div className="intro">
        <aside className="profile-sidebar" aria-label="Profile and contact">
          <img className="portrait" src="assets/images/profile.webp" alt="Myeongju Cho" />
          <ul className="profile-links">
            <li className="profile-location"><MapPin size={17} aria-hidden="true" /><span>Seoul, Republic of Korea</span></li>
            <li><a href="mailto:mj_cho@korea.ac.kr"><Mail size={17} aria-hidden="true" /><span>Email</span></a></li>
            <li><ExternalLink href="https://github.com/Myeongjuuu"><img src="assets/icons/contact-github.svg" alt="" aria-hidden="true" /><span>GitHub</span></ExternalLink></li>
            <li><ExternalLink href="https://www.linkedin.com/in/myeongju-cho-a690a0387/"><img src="assets/icons/contact-linkedin.svg" alt="" aria-hidden="true" /><span>LinkedIn</span></ExternalLink></li>
          </ul>
        </aside>
        <div className="bio">
          <h1 className="name">Myeongju Cho</h1>
          <p className="intro-role">
            <span className="researcher-position">M.S. Researcher @ Korea University</span>
            <span className="research-vision">Understanding Human Cognition Through AI</span>
          </p>
          <p>I am a master's student in Brain and Cognitive Engineering at Korea University, working in the <ExternalLink href="http://pr.korea.ac.kr/">Pattern Recognition and Machine Learning (PRML) Lab</ExternalLink>, supervised by Prof. Seong-Whan Lee.</p>
          <p>My primary research interest lies in <strong>elucidating and modeling the neural mechanisms underlying human cognition and behavior</strong> through neural data analysis and computational modeling. To this end, I have investigated how information is represented in neural activity using neuroimaging and neurophysiological modalities, including <strong>EEG, ECoG, and fMRI</strong>, with a particular focus on <strong>neural decoding, representation learning, and brain–language modeling</strong>.</p>
          <p>Moving forward, I aim to leverage <strong>advanced AI modeling approaches, including multimodal foundation models and generative models</strong>, to pursue research on <strong>brain encoding and brain network dynamics</strong>, seeking to better understand how neural activity gives rise to human cognition and behavior.</p>
        </div>
      </div>
    </section>
  );
}

export function ResearchInterests() {
  return (
    <section id="research-interests" className="research-interests" aria-labelledby="research-interests-heading">
      <h2 id="research-interests-heading">Research Interests</h2>
      <ResearchInterestsBrain />
    </section>
  );
}

export function Competencies() {
  return <section id="competencies" className="competencies-section" aria-labelledby="competencies-heading">
    <h2 id="competencies-heading">Research Competencies</h2>
    <div className="competencies-grid">
      {portfolio.competencies.map(c => (
        <div className="competency-card" key={c.title}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <ul className="competency-methods">
            {c.methods.map(m => <li key={m}>{m}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </section>;
}

export function GitHubCard() {
  return <section className="github-activity-section" aria-labelledby="github-activity-heading">
    <h2 id="github-activity-heading">GitHub Activity</h2>
    <div className="github-card">
      <div className="github-card-header">
        <ExternalLink href="https://github.com/Myeongjuuu" className="github-card-link">
          <img src="assets/icons/contact-github.svg" alt="" aria-hidden="true" className="github-card-icon" />
          <span>Myeongjuuu</span>
          <span className="github-card-arrow">↗</span>
        </ExternalLink>
      </div>
      <div className="github-chart-wrap">
        <img
          src="https://ghchart.rshah.org/4f46e5/Myeongjuuu"
          alt="Myeongjuuu’s GitHub contribution graph"
          className="github-chart"
          loading="lazy"
        />
      </div>
    </div>
  </section>;
}

export function TechnicalSkills() {
  return <section id="skills" className="technical-skills" aria-labelledby="technical-skills-heading">
    <h2 id="technical-skills-heading">Technical Skills</h2>
    <dl className="skills-list">{portfolio.technicalSkills.map(group =>
      <div className="skills-group" key={group.category}><dt>{group.category}</dt><dd><ul>{group.skills.map(skill => <li key={skill}><SkillIcon skill={skill} /><span>{skill}</span></li>)}</ul></dd></div>
    )}</dl>
  </section>;
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

export function Patents() {
  return <section id="patents"><h2>Patent</h2><div className="patent-list">{portfolio.patents.map(patent =>
    <article className="patent-entry" key={patent.number}>
      <div className="patent-meta"><span>{patent.status}</span><span>{patent.date}</span></div>
      <h3>{patent.title}</h3>
      <p className="patent-inventors">{patent.inventors.map((name, index) => <span key={name}>{index > 0 && ', '}{name === 'Myeong-Ju Cho' ? <strong>{name}</strong> : name}</span>)}</p>
      <p className="patent-number">Application No. {patent.number}</p>
    </article>
  )}</div></section>;
}

export function Activities() {
  return <section id="activities"><h2>Extracurricular Activities</h2><p className="activities-intro">Alongside research, I have founded peer study groups and participated in AI training and programming club activities.</p><div className="activity-list">{portfolio.activities.map(activity =>
    <article className="activity-entry" key={activity.title}>
      <div className="activity-date">{activity.date}</div>
      <div><h3>{activity.title}</h3><p className="activity-role">{activity.role}</p><p className="activity-description">{activity.description}</p></div>
    </article>
  )}</div></section>;
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

export function projectHref(project: Project) {
  return `projects/${project.id.replace(/^project-/, '')}.html`;
}

export function ProjectCard({ project: p, navigate }: { project: Project; navigate: Navigate }) {
  return <article className="project-card" id={p.id} aria-labelledby={`${p.id}-title`}>
    <div className="project-topline"><span className="project-category">{p.category}</span>{p.date && <span className="project-date">{p.date}</span>}</div>
<h3 id={`${p.id}-title`} className="project-title"><a className="project-title-link" href={projectHref(p)}><span className="project-name">{p.name}</span><span className="project-subtitle">{p.subtitle}</span></a></h3>
    <div className={`project-preview${p.image ? ' has-image' : ''}`}>
      <div className="project-copy">
        <p className="project-teaser">{p.teaser}</p>
        {p.contributions && <ul className="project-highlights" aria-label={p.contributionLabel}>{p.contributions.slice(0, 2).map(text => <li key={text}><ProjectContribution text={text} emphasis={projectEmphasis[p.id]} /></li>)}</ul>}
        {p.stack.length > 0 && <p className="project-stack"><span className="project-stack-label">Stack</span>{p.stack.join(' · ')}</p>}
      </div>
      {p.image && <figure className="project-visual project-visual-image"><img src={p.image.src} alt={p.image.alt} loading="lazy" />{p.image.caption && <figcaption>{p.image.caption}</figcaption>}</figure>}
    </div>
    <div className="project-card-footer"><span className="project-read-more" aria-hidden="true">View project <span>→</span></span><div className="project-resources">{p.code && <ExternalLink href={p.code}>GitHub ↗</ExternalLink>}{p.relatedPublication && (p.relatedPublication.url ? <ExternalLink href={p.relatedPublication.url}>Paper ↗</ExternalLink> : <a href="#publications" onClick={e => navigate(e, 'publications')}>Paper ↑</a>)}</div></div>
  </article>;
}

export function Awards() {
  return (
    <section id="awards">
      <h2>Honors and Awards</h2>
      <ul className="award-list">
        {portfolio.awards.map(award => (
          <li key={award.title} className="award-entry">
            <span className="award-date">{award.date}</span>
            <div className="award-body">
              <p className="award-title">{award.title}</p>
              <p className="award-org">{award.organization}</p>
              {award.detail && <p className="award-detail">{award.detail}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Timeline({ id, title, entries }: { id: string; title: string; entries: TimelineEntry[] }) {
  return <section id={id}><h2>{title}</h2><table className="timeline"><tbody>{entries.map(entry => <tr key={entry.title}><td><h3>{entry.title}</h3><p>{entry.description}</p></td><td>{entry.date}</td></tr>)}</tbody></table></section>;
}

export function FutureDirections() {
  return (
    <section aria-labelledby="future-heading">
      <h2 id="future-heading">Future Directions</h2>
      <div className="future-grid">
        {portfolio.futureDirections.map(dir => (
          <div className="future-card" key={dir.label}>
            <span className="future-label">Direction {dir.label}</span>
            <h3 className="future-title">{dir.title}</h3>
            <p className="future-description">{dir.description}</p>
            <ul className="future-tags">
              {dir.tags.map(tag => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
