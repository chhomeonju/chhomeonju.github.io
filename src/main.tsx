import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './styles/stylesheet.css';
import './styles/custom.css';
import './styles/projects.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing page root');
const app = <StrictMode><App /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
