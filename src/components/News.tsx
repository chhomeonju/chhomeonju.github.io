import { useState } from 'react';
import { portfolio } from '../data/portfolio';

const CATEGORIES = ['All', 'Paper', 'Award', 'Career', 'Education', 'Activity'] as const;

const tagClass: Record<string, string> = {
  Paper: 'cat-paper',
  Award: 'cat-award',
  Career: 'cat-career',
  Education: 'cat-edu',
  Activity: 'cat-activity',
};

const DEFAULT_VISIBLE = 4;

export function News() {
  const [filter, setFilter] = useState<string>('All');
  const [expanded, setExpanded] = useState(false);

  const filtered = filter === 'All'
    ? portfolio.news
    : portfolio.news.filter(n => n.category === filter);

  const items = expanded ? filtered : filtered.slice(0, DEFAULT_VISIBLE);
  const hasMore = filtered.length > DEFAULT_VISIBLE;

  return (
    <section id="news">
      <div className="news-heading">
        <h2>News</h2>
        <div className="news-filters" role="group" aria-label="Filter by category">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`news-filter-btn${filter === cat ? ' active' : ''}`}
              onClick={() => { setFilter(cat); setExpanded(false); }}
              aria-pressed={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="news-list">
        {items.map((item, i) => (
          <div key={i} className="news-item">
            <span className="news-date">{item.date}</span>
            <span className={`news-tag ${tagClass[item.category] ?? ''}`}>{item.category}</span>
            <div className="news-body">
              <p className="news-title">{item.title}</p>
              {item.detail && <p className="news-detail">{item.detail}</p>}
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className="news-more-btn" onClick={() => setExpanded(e => !e)}>
          {expanded ? 'Show less' : `Show ${filtered.length - DEFAULT_VISIBLE} more`}
        </button>
      )}
    </section>
  );
}
