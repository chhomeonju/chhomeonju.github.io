import { portfolio } from '../data/portfolio';

function projectHrefById(id: string) {
  return `projects/${id.replace(/^project-/, '')}.html`;
}

const directions = [
  {
    num: '01',
    label: 'DECODING',
    sublabel: 'Neural Decoding',
    question: 'What can brain activity reveal about cognition?',
    projectIds: ['project-neurodecoder', 'project-inner-speech', 'project-neuralspeech', 'project-eeg-llm', 'project-tada'],
    keywords: ['Imagined Speech', 'Motor Imagery', 'Inner Speech', 'ECoG-to-Text'],
    future: false,
  },
  {
    num: '02',
    label: 'REPRESENTATION',
    sublabel: 'Neural Representation Learning',
    question: 'Can we learn generalizable representations that bridge brain activity and language to enable unified decoding across cognitive tasks?',
    projectIds: ['project-celp', 'project-blpm'],
    keywords: ['EEG Foundation Models', 'Self-Supervised Learning', 'Brain–Language Alignment', 'Multi-task Decoding'],
    future: false,
  },
  {
    num: '03',
    label: 'ENCODING',
    sublabel: 'Neural Encoding',
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

      {/* Fundamental scientific question */}
      <div className="rt-hub">
        <span className="rt-hub-eyebrow">Fundamental Scientific Question</span>
        <p className="rt-hub-question">
          How does the human brain give rise to cognition?
        </p>
        <span className="rt-hub-goal">→ Understanding Human Cognition</span>
      </div>

      {/* Branch to 3 directions */}
      <div className="rt-branch" aria-hidden="true">
        <svg viewBox="0 0 300 44" preserveAspectRatio="none" className="rt-branch-svg">
          <line x1="150" y1="0"  x2="150" y2="20" />
          <line x1="50"  y1="20" x2="250" y2="20" />
          <line x1="50"  y1="20" x2="50"  y2="44" />
          <line x1="150" y1="20" x2="150" y2="44" />
          <line x1="250" y1="20" x2="250" y2="44" />
        </svg>
        <p className="rt-branch-label">approached through three complementary research directions</p>
      </div>

      {/* Three directions */}
      <div className="rt-directions">
        {directions.map(dir => (
          <div key={dir.num} className={`rt-dir${dir.future ? ' rt-dir--future' : ''}`}>
            <div className="rt-dir-top">
              <span className="rt-dir-num">{dir.num}</span>
              <span className="rt-dir-label">{dir.label}</span>
            </div>
            <p className="rt-dir-sublabel">{dir.sublabel}</p>
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

            {dir.future && (
              <p className="rt-upcoming">Upcoming research direction</p>
            )}

            <div className="rt-keywords">
              {dir.keywords.map(kw => (
                <span key={kw} className="rt-keyword">{kw}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Converging connector to future */}
      <div className="rt-toward" aria-hidden="true">
        <svg viewBox="0 0 300 40" preserveAspectRatio="none" className="rt-branch-svg">
          <line x1="50"  y1="0"  x2="50"  y2="20" />
          <line x1="150" y1="0"  x2="150" y2="20" />
          <line x1="250" y1="0"  x2="250" y2="20" />
          <line x1="50"  y1="20" x2="250" y2="20" />
          <line x1="150" y1="20" x2="150" y2="40" />
        </svg>
        <p className="rt-branch-label">toward</p>
      </div>

      {/* Future research directions */}
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
