import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { portfolio } from '../src/data/portfolio';
import { projectHref } from '../src/components/Content';

const html = readFileSync('dist/index.html', 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Missing prerender mount');
const render = (markup: string, template = html) => template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
const homeUrl = 'https://chhomeonju.github.io/';
const previewImage = new URL('assets/images/home-preview.png', homeUrl).href;
const homeMetadata = `
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${homeUrl}" />
    <meta property="og:title" content="Myeongju Cho" />
    <meta property="og:description" content="Understanding human cognition and behavior through neuroimaging and AI." />
    <meta property="og:image" content="${previewImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Myeongju Cho's portfolio homepage with a 3D brain illustration and research introduction." />
    <meta name="twitter:card" content="summary_large_image" />
  `;
const homeTemplate = html.replace('</head>', `${homeMetadata}</head>`);
writeFileSync('dist/index.html', render(renderToString(<App />), homeTemplate));
mkdirSync('dist/projects', { recursive: true });
for (const project of portfolio.projects) {
  const title = `${project.name} | Myeongju Cho`;
  const template = html.replace('<head>', '<head><base href="../" />').replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
  writeFileSync(`dist/${projectHref(project)}`, render(renderToString(<App projectId={project.id} />), template));
}
writeFileSync('dist/.nojekyll', '');
console.log(`Generated homepage and ${portfolio.projects.length} static project detail pages.`);
