import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { portfolio } from '../src/data/portfolio';
import { projectHref } from '../src/components/Content';

const html = readFileSync('dist/index.html', 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Missing prerender mount');
const render = (markup: string, template = html) => template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
writeFileSync('dist/index.html', render(renderToString(<App />)));
mkdirSync('dist/projects', { recursive: true });
for (const project of portfolio.projects) {
  const title = `${project.name} | Myeongju Cho`;
  const template = html.replace('<head>', '<head><base href="../" />').replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  writeFileSync(`dist/${projectHref(project)}`, render(renderToString(<App projectId={project.id} />), template));
}
writeFileSync('dist/.nojekyll', '');
console.log(`Generated homepage and ${portfolio.projects.length} static project detail pages.`);
