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
    period: '2023 – 2025',
    question: 'What can brain activity reveal about cognition?',
    entries: [
      { year: '2023', projectId: 'project-neurodecoder', desc: 'Imagined speech decoding for alternative communication' },
      { year: '2023', projectId: 'project-inner-speech',  desc: 'Inner speech decoding & functional connectivity analysis' },
      { year: '2024', projectId: 'project-neuralspeech',  desc: 'Voice reconstruction from imagined speech EEG' },
      { year: '2024', projectId: 'project-eeg-llm',       desc: 'Motor imagery classification with an LLM' },
      { year: '2025', projectId: 'project-tada',          desc: 'Multi-scale temporal fusion for ECoG-to-text decoding' },
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

export function ResearchTimeline() {
  const projectMap = Object.fromEntries(
    portfolio.projects.map(p => [p.id, p])
  );
  const [open, setOpen] = useState<Record<string, boolean>>({ '01': true, '02': true, '03': true });

  const toggle = (num: string) =>
    setOpen(prev => ({ ...prev, [num]: !prev[num] }));

  return (
    <section className="research-timeline" aria-labelledby="rt-heading">
      <h2 id="rt-heading">Research Trajectory</h2>

      {/* Fundamental question */}
      <div className="rt-nf-hub">
        <span className="rt-hub-eyebrow">Fundamental Scientific Question</span>
        <p className="rt-hub-question">How does the human brain give rise to cognition?</p>
        <span className="rt-hub-goal">→ Understanding Human Cognition</span>
      </div>

      {/* Phase feed */}
      <div className="rt-nf-feed">
        {phases.map(ph => (
          <div key={ph.num} className={`rt-nf-phase${ph.future ? ' rt-nf-phase--future' : ''}`}>
            {/* Phase header row — clickable to collapse */}
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

            {/* Phase body */}
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
                              <a href={projectHrefById(e.projectId)} className="rt-nf-proj-link">
                                {p.name}
                              </a>
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
                  {ph.keywords.map(kw => (
                    <span key={kw} className="rt-keyword">{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Research Roadmap */}
      <div className="rt-future-section">
        <p className="rt-future-eyebrow">Research Roadmap</p>
        <div className="rt-future-grid">
          {portfolio.futureDirections.map(dir => (
            <div key={dir.label} className="rt-future-card">
              <span className="rt-future-dir-label">Direction {dir.label}</span>
              <h3 className="rt-future-title">{dir.title}</h3>
              <p className="rt-future-desc">{dir.description}</p>
              <div className="rt-keywords">
                {dir.tags.map(tag => (
                  <span key={tag} className="rt-keyword">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
