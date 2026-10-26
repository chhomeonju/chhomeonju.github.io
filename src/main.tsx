import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/fonts.css';
import './styles/portfolio.css';
import './styles/project-detail.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing page root');
const slug = window.location.pathname.match(/\/projects\/([a-z0-9-]+)\.html$/)?.[1];
const app = <StrictMode><App projectId={slug ? `project-${slug}` : undefined} /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
