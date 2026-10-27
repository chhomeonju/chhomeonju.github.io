import { useState } from 'react';
import { portfolio } from '../data/portfolio';

function projectHrefById(id: string) {
  return `projects/${id.replace(/^project-/, '')}.html`;
}

const phases = [
  {
    num: '01',
    label: 'DECODING',
    sublabel: 'Neural Decoding',
    period: '2023 – 2026',
    question: 'What can brain activity reveal about cognition?',
    entries: [
      { year: '2023', projectId: 'project-neurodecoder', desc: 'Imagined speech decoding for alternative communication' },
      { year: '2023', projectId: 'project-inner-speech',  desc: 'Inner speech decoding & functional connectivity analysis' },
      { year: '2024', projectId: 'project-neuralspeech',  desc: 'Voice reconstruction from imagined speech EEG' },
      { year: '2024', projectId: 'project-eeg-llm',       desc: 'Motor imagery classification with an LLM' },
      { year: '2026', projectId: 'project-tada',          desc: 'Multi-scale temporal fusion for ECoG-to-text decoding' },
    ],
    keywords: ['Imagined Speech', 'Motor Imagery', 'Inner Speech', 'ECoG-to-Text'],
    future: false,
  },
  {
    num: '02',
    label: 'REPRESENTATION',
    sublabel: 'Neural Representation Learning',
    period: '2026 – Present',
    question: 'Can we learn generalizable representations that bridge brain activity and language to enable unified decoding?',
    entries: [
      { year: '2026', projectId: 'project-celp', desc: 'Continuous EEG latent predictive encoder' },
      { year: '2026', projectId: 'project-blpm', desc: 'Brain latent predictive model for unified decoding' },
    ],
    keywords: ['EEG Foundation Models', 'Self-Supervised Learning', 'Brain–Language Alignment', 'Multi-task Decoding'],
    future: false,
  },
  {
    num: '03',
    label: 'ENCODING',
    sublabel: 'Neural Encoding',
    period: 'Upcoming',
    question: 'How does the brain encode cognitive information?',
    entries: [],
    keywords: ['Neural Encoding', 'Stimulus-Evoked Responses', 'fMRI', 'Individual Variability'],
    future: true,
  },
];

function SpineLayout({ projectMap }: { projectMap: Record<string, { name: string }> }) {
  return (
    <>
      <div className="rt-spine-wrap">
        <div className="rt-spine-line" aria-hidden="true" />

        <div className="rt-spine-hub-row">
          <div className="rt-spine-hub">
            <span className="rt-hub-eyebrow">Fundamental Scientific Question</span>
            <p className="rt-hub-question">How does the human brain give rise to cognition?</p>
            <span className="rt-hub-goal">→ Understanding Human Cognition</span>
          </div>
          <div className="rt-spine-node rt-spine-node--hub" aria-hidden="true" />
        </div>

        {phases.map((dir, i) => {
          const isRight = i % 2 === 1;
          const card = (
            <div className={`rt-spine-card${dir.future ? ' rt-spine-card--future' : ''}`}>
              <div className="rt-dir-top">
                <span className="rt-dir-num">{dir.num}</span>
                <span className="rt-dir-label">{dir.label}</span>
                {dir.future && <span className="rt-upcoming-badge">Upcoming</span>}
              </div>
              <p className="rt-dir-sublabel">{dir.sublabel}</p>
              <span className="rt-spine-period">{dir.period}</span>
              <p className="rt-dir-question">{dir.question}</p>
              {dir.entries.length > 0 && (
                <div className="rt-projects">
                  {dir.entries.map(e => {
                    const p = projectMap[e.projectId];
                    if (!p) return null;
                    return (
                      <a key={e.projectId} href={projectHrefById(e.projectId)} className="rt-project-chip">
                        {p.name}
                      </a>
                    );
                  })}
                </div>
              )}
              <div className="rt-keywords">
                {dir.keywords.map(kw => <span key={kw} className="rt-keyword">{kw}</span>)}
              </div>
            </div>
          );

          return (
            <div key={dir.num} className={`rt-spine-row${isRight ? ' rt-spine-row--right' : ''}`}>
              <div className="rt-spine-side rt-spine-side--left">{!isRight && card}</div>
              <div className="rt-spine-mid" aria-hidden="true">
                <div className={`rt-spine-node${dir.future ? ' rt-spine-node--future' : ''}`} />
              </div>
              <div className="rt-spine-side rt-spine-side--right">{isRight && card}</div>
            </div>
          );
        })}

        <div className="rt-spine-bottom-row" aria-hidden="true">
          <div className="rt-spine-node rt-spine-node--bottom" />
        </div>
      </div>

      <FutureSection />
    </>
  );
}

function FeedLayout({ projectMap }: { projectMap: Record<string, { name: string }> }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ '01': true, '02': true, '03': true });
  const toggle = (num: string) => setOpen(prev => ({ ...prev, [num]: !prev[num] }));

  return (
    <>
      <div className="rt-nf-hub">
        <span className="rt-hub-eyebrow">Fundamental Scientific Question</span>
        <p className="rt-hub-question">How does the human brain give rise to cognition?</p>
        <span className="rt-hub-goal">→ Understanding Human Cognition</span>
      </div>

      <div className="rt-nf-feed">
        {phases.map(ph => (
          <div key={ph.num} className={`rt-nf-phase${ph.future ? ' rt-nf-phase--future' : ''}`}>
            <button
              className="rt-nf-phase-hd"
              onClick={() => toggle(ph.num)}
              aria-expanded={open[ph.num]}
              aria-controls={`rt-nf-body-${ph.num}`}
            >
              <span className="rt-dir-num">{ph.num}</span>
              <span className="rt-dir-label">{ph.label}</span>
              <span className="rt-dir-sublabel">{ph.sublabel}</span>
              <span className="rt-nf-period">{ph.period}</span>
              {ph.future && <span className="rt-upcoming-badge">Upcoming</span>}
              <span className="rt-nf-chevron" aria-hidden="true">{open[ph.num] ? '▾' : '▸'}</span>
            </button>

            {open[ph.num] && (
              <div id={`rt-nf-body-${ph.num}`} className="rt-nf-body">
                <p className="rt-nf-question">{ph.question}</p>
                {ph.entries.length > 0 && (
                  <div className="rt-nf-entries">
                    {ph.entries.map((e, i) => {
                      const p = projectMap[e.projectId];
                      return (
                        <div key={i} className="rt-nf-entry">
                          <span className="rt-nf-year">{e.year}</span>
                          <span className="rt-nf-tick" aria-hidden="true" />
                          <div className="rt-nf-entry-content">
                            {p ? (
                              <a href={projectHrefById(e.projectId)} className="rt-nf-proj-link">{p.name}</a>
                            ) : (
                              <span className="rt-nf-proj-name">{e.projectId}</span>
                            )}
                            <span className="rt-nf-desc">{e.desc}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="rt-keywords">
                  {ph.keywords.map(kw => <span key={kw} className="rt-keyword">{kw}</span>)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <FutureSection />
    </>
  );
}

function FutureSection() {
  return (
    <div className="rt-future-section">
      <p className="rt-future-eyebrow">Research Roadmap</p>
      <div className="rt-future-grid">
        {portfolio.futureDirections.map(dir => (
          <div key={dir.label} className="rt-future-card">
            <span className="rt-future-dir-label">Direction {dir.label}</span>
            <h3 className="rt-future-title">{dir.title}</h3>
            <p className="rt-future-desc">{dir.description}</p>
            <div className="rt-keywords">
              {dir.tags.map(tag => <span key={tag} className="rt-keyword">{tag}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ResearchTimeline() {
  const [layout, setLayout] = useState<'spine' | 'feed'>('feed');
  const projectMap = Object.fromEntries(portfolio.projects.map(p => [p.id, p]));

  return (
    <section className="research-timeline" aria-labelledby="rt-heading">
      <div className="rt-header-row">
        <h2 id="rt-heading">Research Trajectory</h2>
        <div className="rt-layout-tabs" role="group" aria-label="Layout style">
          <button
            className={`rt-layout-tab${layout === 'feed' ? ' rt-layout-tab--active' : ''}`}
            onClick={() => setLayout('feed')}
            aria-pressed={layout === 'feed'}
          >
            Feed
          </button>
          <button
            className={`rt-layout-tab${layout === 'spine' ? ' rt-layout-tab--active' : ''}`}
            onClick={() => setLayout('spine')}
            aria-pressed={layout === 'spine'}
          >
            Timeline
          </button>
        </div>
      </div>

      {layout === 'spine'
        ? <SpineLayout projectMap={projectMap} />
        : <FeedLayout projectMap={projectMap} />
      }
    </section>
  );
}
