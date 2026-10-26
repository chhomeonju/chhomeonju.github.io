import type { Project } from '../types';
import { portfolio } from '../data/portfolio';
import { ExternalLink, projectHref } from './Content';

export function ProjectPage({ project: p }: { project: Project }) {
  const index = portfolio.projects.findIndex(project => project.id === p.id);
  const next = portfolio.projects[(index + 1) % portfolio.projects.length];
  return <main className="project-page">
    <nav className="project-page-nav" aria-label="Project navigation"><a className="detail-site-name" href="index.html#about">Myeongju Cho</a><a href={`index.html#${p.id}`}>← All projects</a></nav>
    <header className="project-page-hero">
      <div className="project-page-meta"><span>{p.category}</span>{p.date && <span>{p.date}</span>}</div>
      <h1>{p.name}</h1><p className="project-page-subtitle">{p.subtitle}</p><p className="project-page-lead">{p.teaser}</p>
      <div className="detail-resources">{p.code && <ExternalLink href={p.code}>GitHub ↗</ExternalLink>}{p.relatedPublication && (p.relatedPublication.url ? <ExternalLink href={p.relatedPublication.url}>Paper ↗</ExternalLink> : <a href="index.html#publications">Related paper ↑</a>)}</div>
    </header>
    {p.image && <figure className="project-page-figure"><img src={p.image.src} alt={p.image.alt} />{p.image.caption && <figcaption>{p.image.caption}</figcaption>}</figure>}
    <div className="project-page-layout">
      <aside className="project-page-aside" aria-label="On this page"><p>On this page</p><a href={`${projectHref(p)}#overview`}>Overview</a><a href={`${projectHref(p)}#contributions`}>{p.contributionLabel}</a><a href={`${projectHref(p)}#approach`}>Approach</a>{p.studyFindings && <a href={`${projectHref(p)}#findings`}>Key findings</a>}{p.datasetExperience && <a href={`${projectHref(p)}#datasets`}>Datasets</a>}{p.experimentalExperience && <a href={`${projectHref(p)}#experiments`}>Experimental experience</a>}{p.stack.length > 0 && <a href={`${projectHref(p)}#technology`}>Technology</a>}{p.relatedPublication && <a href={`${projectHref(p)}#publication`}>Publication</a>}</aside>
      <div className="project-page-body">
        <section id="overview"><h2>Overview</h2><p>{p.goal}</p></section>
        <section id="contributions"><h2>{p.contributionLabel}</h2><ul>{p.contributions.map(text => <li key={text}>{text}</li>)}</ul></section>
        <section id="approach"><h2>Approach</h2><ol>{p.steps.map(step => <li key={step}>{step}</li>)}</ol></section>
        {p.studyFindings && <section id="findings"><h2>Key Findings</h2><ul>{p.studyFindings.highlights.map(text => <li key={text}>{text}</li>)}</ul><div className="study-scope"><h3>Evaluation scope</h3><p>{p.studyFindings.scope}</p></div><p className="dataset-source"><ExternalLink href={p.studyFindings.source.href}>{p.studyFindings.source.label} ↗</ExternalLink></p></section>}
        {p.datasetExperience && <section id="datasets"><h2>Datasets &amp; Benchmarks</h2>{p.datasetExperience.map(group =>
          <div className="dataset-group" key={group.title}><h3>{group.title}</h3><p>{group.description}</p>
            <table className="dataset-table"><caption className="sr-only">{group.title}</caption><thead><tr><th scope="col">Dataset</th><th scope="col">Task / use</th></tr></thead><tbody>{group.datasets.map(dataset => <tr key={dataset.name}><th scope="row">{dataset.name}</th><td>{dataset.task}</td></tr>)}</tbody></table>
            <p className="dataset-source"><ExternalLink href={group.source.href}>{group.source.label} ↗</ExternalLink></p>
          </div>
        )}</section>}
        {p.experimentalExperience && <section id="experiments"><h2>Experimental Experience</h2><dl className="experiment-list">{p.experimentalExperience.map(experiment => <div key={experiment.title}><dt>{experiment.title}</dt><dd>{experiment.description}</dd></div>)}</dl></section>}
        {p.relatedExperience && <section id="dataset-context"><h2>Dataset &amp; Evaluation Context</h2><p>Part of the BLPM study.</p><a href={p.relatedExperience.href}>{p.relatedExperience.label}</a></section>}
        {p.stack.length > 0 && <section id="technology"><h2>Technology</h2><ul className="detail-technology">{p.stack.map(tool => <li key={tool}>{tool}</li>)}</ul></section>}
        {p.relatedPublication && <section id="publication"><h2>Related publication</h2><p className="detail-paper-title">{p.relatedPublication.title}</p><p className="detail-paper-venue">{p.relatedPublication.venue}</p>{p.relatedPublication.url ? <ExternalLink href={p.relatedPublication.url}>Read on arXiv ↗</ExternalLink> : <a href="index.html#publications">View publication entry ↑</a>}</section>}
      </div>
    </div>
    <div className="project-page-bottom"><a href={`index.html#${p.id}`}>← Back to projects</a><a href={projectHref(next)}>Next project: {next.name} →</a></div>
    <footer><p>Copyright ©Myeongju Cho</p></footer>
  </main>;
}
