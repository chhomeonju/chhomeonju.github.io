import type { Project } from '../types';

function ResultValue({ value }: { value: string }) {
  const match = value.match(/^(.*?)(\d+(?:\.\d+)?)\s*±\s*(\d+(?:\.\d+)?)$/);
  if (!match) return <>{value}</>;
  return <>{match[1] && <span className="result-method">{match[1].replace(/\s*·\s*$/, '')}</span>}<span className="result-estimate"><span>{match[2]}</span><span>± {match[3]}</span></span></>;
}

export function ResultTables({ tables, note }: { tables: NonNullable<Project['resultTables']>; note?: string }) {
  return <section id="results"><h2>Results</h2><p>{note ?? 'Mean ± standard deviation across participants. Higher is better for all metrics.'}</p>{tables.map(table => {
    const content = <><p>{table.description}</p>{table.groups.map(group => <div className="result-table-scroll" key={group.label} role="region" aria-label={`${table.title} — ${group.label}`} tabIndex={0}><table className={`dataset-table result-table${table.columns.length > 6 ? ' result-table-wide' : table.columns.length <= 4 ? ' result-table-compact' : ''}`}><caption>{group.label}</caption><thead><tr>{table.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{group.rows.map(row => <tr key={row.cells[0]} className={row.highlight ? 'model-row-highlight' : undefined}>{row.cells.map((cell, i) => i === 0 ? <th scope="row" key={i}>{cell}</th> : <td key={i} data-label={table.columns[i]}><ResultValue value={cell} /></td>)}</tr>)}</tbody></table></div>)}</>;
    return table.collapsed ? <details className="result-table-group result-table-details" key={table.title}><summary>{table.title}</summary>{content}</details> : <div className="result-table-group" key={table.title}><h3>{table.title}</h3>{content}</div>;
  })}</section>;
}
