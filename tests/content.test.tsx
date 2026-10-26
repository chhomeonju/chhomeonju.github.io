import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App';
import { portfolio } from '../src/data/portfolio';
import { ProjectCard, Publications, projectHref } from '../src/components/Content';

test('all existing sections and project permalinks are present in initial HTML', () => {
  const html = renderToStaticMarkup(<App />);
  for (const id of ['about', 'publications', 'patents', 'presentations', 'projects', 'activities', 'awards', 'education', 'experience']) assert.ok(html.includes(`id="${id}"`));
  for (const project of portfolio.projects) assert.ok(html.includes(`id="${project.id}"`));
  assert.equal(portfolio.publications.length, 3);
  assert.equal(portfolio.presentations.length, 3);
  assert.equal(portfolio.projects.length, 8);
  assert.ok(html.includes('Copyright ©Myeongju Cho'));
});

test('publication figures resolve locally and Multi-Scale remains text-only', () => {
  const html = renderToStaticMarkup(<Publications />);
  assert.equal((html.match(/<img /g) ?? []).length, 2);
  assert.match(html, /class="mj-paper mj-without-image"/);
  assert.equal(portfolio.publications[0].image, null);
  for (const publication of portfolio.publications) if (publication.image) assert.ok(existsSync(`public/${publication.image}`));
  assert.ok(html.includes('IEEE BCI 2027'));
  assert.ok(html.includes('IEEE CW 2024'));
});

test('preview-only controls and removed explanatory copy stay absent', () => {
  const html = renderToStaticMarkup(<App />);
  for (const text of ['Submission information from CV', '그림 선택', '그림 없이 보기', '클릭하여 확대', 'TL;DR', '3 manuscripts &amp; papers']) assert.ok(!html.includes(text));
});

test('project cards link to separate detail pages and expose their key contribution', () => {
  for (const project of portfolio.projects) {
    const html = renderToStaticMarkup(<ProjectCard project={project} navigate={() => {}} />);
    assert.ok(html.includes(`href="${projectHref(project)}"`));
    assert.ok(!html.includes('<details'));
  }
  const html = renderToStaticMarkup(<ProjectCard project={portfolio.projects[0]} navigate={() => {}} />);
  assert.ok(html.includes('<strong>Latent predictive modeling</strong>'));
  assert.ok(!html.includes('project-workflow'));
});

test('every detail page renders the full content and a working return link', () => {
  for (const project of portfolio.projects) {
    const html = renderToStaticMarkup(<App projectId={project.id} />);
    assert.ok(html.includes(`href="index.html#${project.id}"`));
    assert.ok(html.includes('id="overview"'));
    assert.ok(html.includes('id="contributions"'));
    assert.ok(html.includes('id="approach"'));
    assert.ok(html.includes(`href="${projectHref(project)}#overview"`));
    assert.ok(!html.includes('research-interests-heading'));
    for (const contribution of project.contributions) assert.ok(html.includes(contribution.replaceAll('&', '&amp;')));
  }
});

test('project figures are optional and all configured resources exist', () => {
  const project = portfolio.projects.find(p => p.id === 'project-eeg-llm')!;
  assert.ok(project.image);
  assert.ok(!project.stack.includes('PyTorch'));
  const html = renderToStaticMarkup(<ProjectCard project={project} navigate={() => {}} />);
  assert.ok(html.includes('class="project-visual project-visual-image"'));
  assert.ok(html.includes('OpenAI API'));
  for (const p of portfolio.projects) if (p.image) assert.ok(existsSync(`public/${p.image.src}`));
});

test('all conference entries are posters and repository-specific stacks stay distinct', () => {
  for (const p of portfolio.presentations) assert.match(p.status, /^Poster · /);
  assert.ok(portfolio.projects.find(p => p.id === 'project-tada')!.stack.includes('PyTorch'));
  assert.ok(!portfolio.projects.find(p => p.id === 'project-inner-speech')!.stack.includes('PyTorch'));
});

test('study dates match the owner clarification and the patent remains an application', () => {
  for (const [title, date] of [
    ['Neuroscience Study Group', 'Jul. – Aug. 2023'],
    ['MATLAB for Neuroscience Study Group', 'Jan. – Feb. 2024'],
    ['AI Study Group', 'Mar. – Jun. 2025'],
  ]) assert.equal(portfolio.activities.find(activity => activity.title === title)?.date, date);
  assert.equal(portfolio.patents.length, 1);
  assert.match(portfolio.patents[0].status, /application · Filed/);
});
