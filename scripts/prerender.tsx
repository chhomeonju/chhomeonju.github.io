import { readFileSync, writeFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

const path = 'dist/index.html';
const html = readFileSync(path, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Missing prerender mount');
writeFileSync(path, html.replace('<div id="root"></div>', `<div id="root">${renderToString(<App />)}</div>`));
writeFileSync('dist/.nojekyll', '');
console.log('Generated complete HTML for search engines and no-JavaScript readers.');
