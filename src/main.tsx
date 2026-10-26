import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/stylesheet.css';
import './styles/custom.css';
import './styles/projects.css';
import './styles/interests.css';
import './styles/theme.css';
import './styles/project-pages.css';
import './styles/profile.css';
import './styles/activities.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing page root');
const slug = window.location.pathname.match(/\/projects\/([a-z0-9-]+)\.html$/)?.[1];
const app = <StrictMode><App projectId={slug ? `project-${slug}` : undefined} /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
