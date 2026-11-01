import { useEffect, useState } from 'react';
import type { Project } from '../types';
import { portfolio } from '../data/portfolio';
import { ExternalLink, projectHref } from './Content';
import { CustomCursor } from './CustomCursor';
import { Moon, Sun } from 'lucide-react';
import { ResultTables } from './ResultTables';

export function ProjectPage({ project: p }: { project: Project }) {
  const index = portfolio.projects.findIndex(project => project.id === p.id);
  const next = portfolio.projects[(index + 1) % portfolio.projects.length];
  const previous = portfolio.projects[(index - 1 + portfolio.projects.length) % portfolio.projects.length];

  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark'; } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
  }, [dark]);

  return <><CustomCursor /><main className="project-page">
    <nav className="project-page-nav" aria-label="Project navigation"><a className="detail-site-name" href="index.html#about">Myeongju Cho</a><div className="project-page-nav-right"><a href={`index.html#${p.id}`}>← All projects</a><button className="theme-toggle" onClick={() => setDark(d => !d)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button></div></nav>
    <header className="project-page-hero">
      <div className="project-page-meta"><span>{p.category}</span>{p.date && <span>{p.date}</span>}</div>
      <h1>{p.name}</h1><p className="project-page-subtitle">{p.subtitle}</p><p className="project-page-lead">{p.teaser}</p>
      <div className="detail-resources">{p.code && <ExternalLink href={p.code}>GitHub ↗</ExternalLink>}{p.relatedPublication && (p.relatedPublication.url ? <ExternalLink href={p.relatedPublication.url}>Paper ↗</ExternalLink> : <a href="index.html#publications">Related paper ↑</a>)}</div>
    </header>
    {p.heroImages ? (
      <div className="project-hero-images">{p.heroImages.map(img => <figure key={img.src} className="project-hero-img"><img src={img.src} alt={img.alt} />{img.caption && <figcaption>{img.caption}</figcaption>}</figure>)}</div>
    ) : p.image ? (
      <figure className="project-page-figure"><img src={p.image.src} alt={p.image.alt} />{p.image.caption && <figcaption>{p.image.caption}</figcaption>}</figure>
    ) : null}
    <div className="project-page-layout">
      <aside className="project-page-aside" aria-label="On this page"><p>On this page</p><a href={`${projectHref(p)}#overview`}>Overview</a>{p.contributions && p.contributions.length > 0 && <a href={`${projectHref(p)}#contributions`}>{p.contributionLabel}</a>}<a href={`${projectHref(p)}#approach`}>Approach</a>{p.studyFindings && <a href={`${projectHref(p)}#findings`}>Key findings</a>}{p.datasetExperience && <a href={`${projectHref(p)}#datasets`}>Datasets</a>}{p.experimentalExperience && <a href={`${projectHref(p)}#experiments`}>{p.experimentalExperienceLabel ?? 'Experimental experience'}</a>}{p.screenshots && <a href={`${projectHref(p)}#screenshots`}>{p.screenshotsLabel ?? 'Platform Screenshots'}</a>}{(p.modelComparison || p.resultTables) && <a href={`${projectHref(p)}#results`}>Results</a>}{p.stack.length > 0 && <a href={`${projectHref(p)}#technology`}>Technology</a>}{p.relatedPublication && <a href={`${projectHref(p)}#publication`}>Publication</a>}</aside>
      <div className="project-page-body">
        <section id="overview"><h2>Overview</h2>{p.goal.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}</section>
        {p.contributions && p.contributions.length > 0 && <section id="contributions"><h2>{p.contributionLabel}</h2><ul>{p.contributions.map(text => <li key={text}>{text}</li>)}</ul></section>}
        <section id="approach"><h2>Approach</h2><ol>{p.steps.map(step => <li key={step}>{step}</li>)}</ol></section>
        {p.studyFindings && <section id="findings"><h2>Key Findings</h2><ul>{p.studyFindings.highlights.map(text => <li key={text}>{text}</li>)}</ul><div className="study-scope"><h3>Evaluation scope</h3><p>{p.studyFindings.scope}</p></div><p className="dataset-source"><ExternalLink href={p.studyFindings.source.href}>{p.studyFindings.source.label} ↗</ExternalLink></p></section>}
        {p.datasetExperience && <section id="datasets"><h2>Datasets &amp; Benchmarks</h2>{p.datasetExperience.map(group =>
          <div className="dataset-group" key={group.title}><h3>{group.title}</h3><p>{group.description}</p>
            <table className="dataset-table"><caption className="sr-only">{group.title}</caption><thead><tr><th scope="col">Dataset</th><th scope="col">Task / use</th></tr></thead><tbody>{group.datasets.map(dataset => <tr key={dataset.name}><th scope="row">{dataset.name}</th><td>{dataset.task}</td></tr>)}</tbody></table>
            {group.source && <p className="dataset-source"><ExternalLink href={group.source.href}>{group.source.label} ↗</ExternalLink></p>}
          </div>
        )}</section>}
        {p.experimentalExperience && <section id="experiments"><h2>{p.experimentalExperienceLabel ?? 'Experimental Experience'}</h2><dl className="experiment-list">{p.experimentalExperience.map(experiment => <div key={experiment.title} className={experiment.image ? 'experiment-with-image' : undefined}><dt>{experiment.title}</dt><dd>{experiment.description}</dd>{experiment.image && <dd className="experiment-image"><img src={experiment.image.src} alt={experiment.image.alt} /></dd>}</div>)}</dl></section>}
        {p.screenshots && <section id="screenshots"><h2>{p.screenshotsLabel ?? 'Platform Screenshots'}</h2><div className="screenshot-gallery">{p.screenshots.map(s => <figure key={s.src} className="screenshot-item"><div className="screenshot-meta">{s.caption && <strong>{s.caption}</strong>}{s.description && <p>{s.description}</p>}</div><img src={s.src} alt={s.alt} /></figure>)}</div></section>}
        {p.modelComparison && <section id="results"><h2>Results</h2><table className="dataset-table model-comparison-table"><thead><tr>{p.modelComparison.columns.map(c => <th scope="col" key={c}>{c}</th>)}</tr></thead><tbody>{p.modelComparison.rows.map((row, i) => <tr key={i} className={row.highlight ? 'model-row-highlight' : ''}>{row.cells.map((c, j) => j === 0 ? <th scope="row" key={j}>{c}</th> : <td key={j}>{c}</td>)}</tr>)}</tbody></table></section>}
        {p.resultTables && <ResultTables tables={p.resultTables} note={p.resultsNote} />}
        {p.relatedExperience && <section id="dataset-context"><h2>Related project</h2><a href={p.relatedExperience.href}>{p.relatedExperience.label}</a></section>}
        {p.stack.length > 0 && <section id="technology"><h2>Technology</h2><ul className="detail-technology">{p.stack.map(tool => <li key={tool}>{tool}</li>)}</ul></section>}
        {p.relatedPublication && <section id="publication"><h2>Related publication</h2><p className="detail-paper-title">{p.relatedPublication.title}</p><p className="detail-paper-venue">{p.relatedPublication.venue}</p>{p.relatedPublication.url ? <ExternalLink href={p.relatedPublication.url}>Read on arXiv ↗</ExternalLink> : <a href="index.html#publications">View publication entry ↑</a>}</section>}
      </div>
    </div>
    <div className="project-page-bottom"><a href={`index.html#${p.id}`}>← Back to projects</a><nav className="project-page-neighbors" aria-label="Previous and next projects"><a href={`../${projectHref(previous)}`} rel="prev">← Previous project: {previous.name}</a><a href={`../${projectHref(next)}`} rel="next">Next project: {next.name} →</a></nav></div>
    <footer><p>© 2026 Myeongju Cho<br />All rights reserved.</p></footer>
  </main></>;

}
