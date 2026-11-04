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
      { year: '2024', projectId: 'project-neuralspeech',  desc: 'Voice reconstruction from imagined speech EEG' },
      { year: '2024', projectId: 'project-eeg-llm',       desc: 'Motor imagery classification with an LLM' },
      { year: '2025', projectId: 'project-inner-speech',  desc: 'Inner speech decoding & functional connectivity analysis' },
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
    period: '2026 – Present',
    question: 'How does the brain encode cognitive information, and can encoding models improve decoding?',
    entries: [
      { year: '2026', projectId: 'project-tada', desc: 'Encoding-guided re-ranking via forward neural response models' },
    ],
    keywords: ['Neural Encoding', 'Stimulus-Evoked Responses', 'fMRI', 'Individual Variability'],
    future: false,
  },
];

/* ── Original Feed layout (accordion + integrated future directions) ── */
function FeedLayout({ projectMap }: { projectMap: Record<string, { name: string }> }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ '01': true, '02': true, '03': true });
  const toggle = (num: string) => setOpen(prev => ({ ...prev, [num]: !prev[num] }));

  return (
    <>
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

        {/* Future directions — same feed style, always open */}
        <div className="rt-nf-future-divider" aria-hidden="true">
          <span className="rt-nf-future-divider-label">→ Future Research Directions</span>
        </div>
        {portfolio.futureDirections.map((dir, i) => (
          <div key={dir.label} className="rt-nf-phase rt-nf-phase--future rt-nf-phase--dir">
            <div className="rt-nf-phase-hd rt-nf-dir-hd">
              <span className="rt-dir-num">0{phases.length + i + 1}</span>
              <span className="rt-dir-sublabel">{dir.title}</span>
              <span className="rt-upcoming-badge">Future</span>
            </div>
            <div className="rt-nf-body">
              <p className="rt-nf-question">{dir.description}</p>
              <div className="rt-keywords">
                {dir.tags.map(tag => <span key={tag} className="rt-keyword">{tag}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

type PhaseItem = typeof phases[number];
type FutureCard = { num: string; label: string; sublabel: string; period: string; future: true; isFutureBlock: true; entries: never[]; keywords: never[]; question: string };
type AnyItem = PhaseItem | FutureCard;

const futureCard: FutureCard = {
  num: '04',
  label: 'FUTURE',
  sublabel: 'Future Directions',
  period: 'Future',
  future: true,
  isFutureBlock: true,
  entries: [],
  keywords: [],
  question: '',
};

/* ── Phases layout (interactive card + detail panel, future as single 04 card) ── */
function PhasesLayout({ projectMap }: { projectMap: Record<string, { name: string }> }) {
  const [selected, setSelected] = useState(0);
  const allItems: AnyItem[] = [...phases, futureCard];
  const item = allItems[selected];
  const isFuture = 'isFutureBlock' in item && item.isFutureBlock;

  return (
    <>
      <div className="rt-phase-cards" role="tablist" aria-label="Research phases">
        {allItems.map((ph, i) => (
          <button
            key={ph.num}
            className={`rt-phase-card${i === selected ? ' rt-phase-card--active' : ''}${ph.future ? ' rt-phase-card--future' : ''}`}
            role="tab"
            aria-selected={i === selected}
            aria-controls="rt-detail-panel"
            onClick={() => setSelected(i)}
            onMouseEnter={() => setSelected(i)}
          >
            <div className="rt-phase-card-top">
              <span className="rt-dir-num">{ph.num}</span>
              <span className="rt-dir-label">{ph.label}</span>
              {ph.future && <span className="rt-upcoming-badge">Future</span>}
            </div>
            <p className="rt-dir-sublabel">{ph.sublabel}</p>
            <span className="rt-phase-card-period">{ph.period}</span>
          </button>
        ))}
      </div>

      <div
        id="rt-detail-panel"
        key={selected}
        className={`rt-detail-panel${item.future ? ' rt-detail-panel--future' : ''}`}
        role="tabpanel"
        aria-label={`${item.label} details`}
      >
        {isFuture ? (
          <div className="rt-future-block">
            {portfolio.futureDirections.map(dir => (
              <div key={dir.label} className="rt-future-block-item">
                <p className="rt-future-block-title">{dir.title}</p>
                <p className="rt-detail-question">{dir.description}</p>
                <div className="rt-keywords">
                  {dir.tags.map(tag => <span key={tag} className="rt-keyword">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p className="rt-detail-question">{(item as PhaseItem).question}</p>
            {(item as PhaseItem).entries.length > 0 && (
              <div className="rt-nf-entries">
                {(item as PhaseItem).entries.map((e, i) => {
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
              {(item as PhaseItem).keywords.map(kw => <span key={kw} className="rt-keyword">{kw}</span>)}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ── Timeline layout (year-axis timeline) ── */
function SpineLayout({ projectMap }: { projectMap: Record<string, { name: string }> }) {
  return (
    <div className="rt-tl-wrap">
      <div className="rt-tl-body">
        <div className="rt-tl-axis" aria-hidden="true" />

        {phases.map(ph => (
          <div key={ph.num} className="rt-tl-phase">
            <div className="rt-tl-phase-hd">
              <span className="rt-tl-phase-num">{ph.num}</span>
              <span className="rt-tl-phase-label">{ph.label}</span>
              <span className="rt-tl-phase-sub">· {ph.sublabel}</span>
              <span className="rt-tl-phase-period">{ph.period}</span>
            </div>
            <p className="rt-tl-phase-q">{ph.question}</p>

            <div className="rt-tl-entries">
              {ph.entries.map((e, ei) => {
                const p = projectMap[e.projectId];
                return (
                  <div key={ei} className="rt-tl-entry">
                    <span className="rt-tl-year">{e.year}</span>
                    <div className="rt-tl-dot" aria-hidden="true" />
                    <div className="rt-tl-entry-body">
                      {p
                        ? <a href={projectHrefById(e.projectId)} className="rt-tl-proj">{p.name}</a>
                        : <span className="rt-tl-proj">{e.projectId}</span>}
                      <span className="rt-tl-desc">{e.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rt-keywords">
              {ph.keywords.map(kw => <span key={kw} className="rt-keyword">{kw}</span>)}
            </div>
          </div>
        ))}

        <div className="rt-tl-phase rt-tl-phase--future">
          <div className="rt-tl-phase-hd">
            <span className="rt-tl-phase-label">FUTURE DIRECTIONS</span>
            <span className="rt-upcoming-badge">Future</span>
          </div>
          <div className="rt-tl-entries">
            {portfolio.futureDirections.map((dir, i) => (
              <div key={i} className="rt-tl-entry rt-tl-entry--future">
                <span className="rt-tl-year">→</span>
                <div className="rt-tl-dot rt-tl-dot--future" aria-hidden="true" />
                <div className="rt-tl-entry-body">
                  <span className="rt-tl-proj">{dir.title}</span>
                  <span className="rt-tl-desc">{dir.description}</span>
                  <div className="rt-keywords" style={{ marginTop: '8px' }}>
                    {dir.tags.map(t => <span key={t} className="rt-keyword">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResearchTimeline() {
  const [layout, setLayout] = useState<'feed' | 'phases' | 'spine'>('feed');
  const projectMap = Object.fromEntries(portfolio.projects.map(p => [p.id, p]));

  return (
    <section id="research-trajectory" className="research-timeline" aria-labelledby="rt-heading">
      <div className="rt-header-row">
        <h2 id="rt-heading">Research Trajectory</h2>
        <div className="rt-layout-tabs" role="group" aria-label="Layout style">
          <button
            className={`rt-layout-tab${layout === 'feed' ? ' rt-layout-tab--active' : ''}`}
            onClick={() => setLayout('feed')}
            aria-pressed={layout === 'feed'}
          >Feed</button>
          <button
            className={`rt-layout-tab${layout === 'phases' ? ' rt-layout-tab--active' : ''}`}
            onClick={() => setLayout('phases')}
            aria-pressed={layout === 'phases'}
          >Phases</button>
          <button
            className={`rt-layout-tab${layout === 'spine' ? ' rt-layout-tab--active' : ''}`}
            onClick={() => setLayout('spine')}
            aria-pressed={layout === 'spine'}
          >Timeline</button>
        </div>
      </div>

      <p className="rt-trajectory-intro">My research has evolved from decoding information from neural activity to learning generalizable neural representations and investigating how the brain encodes and processes information, with a growing focus on brain network dynamics and the neural mechanisms underlying human cognition and behavior.</p>

      {layout === 'feed'   && <FeedLayout   projectMap={projectMap} />}
      {layout === 'phases' && <PhasesLayout projectMap={projectMap} />}
      {layout === 'spine'  && <SpineLayout  projectMap={projectMap} />}
    </section>
  );
}
