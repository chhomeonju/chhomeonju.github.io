import { useEffect, useState } from 'react';

const TOC_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'research-interests', label: 'Research Interests' },
  { id: 'research-trajectory', label: 'Research Trajectory' },
  { id: 'competencies', label: 'Competencies' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Technical Skills' },
];

export function FloatingTOC() {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const map = new Map<string, number>();

    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          map.set(id, entry.intersectionRatio);
          let best = '';
          let bestRatio = 0;
          map.forEach((ratio, key) => {
            if (ratio > bestRatio) { bestRatio = ratio; best = key; }
          });
          if (best) setActive(best);
        },
        { threshold: [0, 0.1, 0.3, 0.5], rootMargin: '-80px 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      observers.forEach(o => o.disconnect());
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="floating-toc floating-toc--visible" aria-label="Page sections">
      <ul>
        {TOC_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <button
              className={`ftoc-item${active === id ? ' ftoc-item--active' : ''}`}
              onClick={() => scrollTo(id)}
              title={label}
            >
              <span className="ftoc-label">{label}</span>
              <span className="ftoc-dot" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
