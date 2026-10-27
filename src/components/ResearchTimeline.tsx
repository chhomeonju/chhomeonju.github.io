import { portfolio } from '../data/portfolio';

function projectHrefById(id: string) {
  return `projects/${id.replace(/^project-/, '')}.html`;
}

const directions = [
  {
    num: '01',
    label: 'DECODING',
    sublabel: 'Neural Decoding',
    period: '2021 – 2023',
    question: 'What can brain activity reveal about cognition?',
    projectIds: ['project-neurodecoder', 'project-inner-speech', 'project-neuralspeech', 'project-eeg-llm', 'project-tada'],
    keywords: ['Imagined Speech', 'Motor Imagery', 'Inner Speech', 'ECoG-to-Text'],
    future: false,
  },
  {
    num: '02',
    label: 'REPRESENTATION',
    sublabel: 'Neural Representation Learning',
    period: '2023 – 2024',
    question: 'Can we learn generalizable representations that bridge brain activity and language to enable unified decoding across cognitive tasks?',
    projectIds: ['project-celp', 'project-blpm'],
    keywords: ['EEG Foundation Models', 'Self-Supervised Learning', 'Brain–Language Alignment', 'Multi-task Decoding'],
    future: false,
  },
  {
    num: '03',
    label: 'ENCODING',
    sublabel: 'Neural Encoding',
    period: 'Upcoming',
    question: 'How does the brain encode cognitive information?',
    projectIds: [],
    keywords: ['Neural Encoding', 'Stimulus-Evoked Responses', 'fMRI', 'Individual Variability'],
    future: true,
  },
];

export function ResearchTimeline() {
  const projectMap = Object.fromEntries(
    portfolio.projects.map(p => [p.id, p])
  );

  return (
    <section className="research-timeline" aria-labelledby="rt-heading">
      <h2 id="rt-heading">Research Trajectory</h2>

      {/* Fundamental scientific question — centered */}
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

        {/* Three research directions, alternating left / right */}
        {directions.map((dir, i) => {
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

              {dir.projectIds.length > 0 && (
                <div className="rt-projects">
                  {dir.projectIds.map(id => {
                    const p = projectMap[id];
                    if (!p) return null;
                    return (
                      <a key={id} href={projectHrefById(id)} className="rt-project-chip">
                        {p.name}
                      </a>
                    );
                  })}
                </div>
              )}

              <div className="rt-keywords">
                {dir.keywords.map(kw => (
                  <span key={kw} className="rt-keyword">{kw}</span>
                ))}
              </div>
            </div>
          );

          return (
            <div key={dir.num} className={`rt-spine-row${isRight ? ' rt-spine-row--right' : ''}`}>
              <div className="rt-spine-side rt-spine-side--left">
                {!isRight && card}
              </div>
              <div className="rt-spine-mid" aria-hidden="true">
                <div className={`rt-spine-node${dir.future ? ' rt-spine-node--future' : ''}`} />
              </div>
              <div className="rt-spine-side rt-spine-side--right">
                {isRight && card}
              </div>
            </div>
          );
        })}

        {/* Bottom node */}
        <div className="rt-spine-bottom-row" aria-hidden="true">
          <div className="rt-spine-node rt-spine-node--bottom" />
        </div>
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
