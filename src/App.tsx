import { useEffect, useState } from 'react';
import { About, Activities, Awards, Competencies, FutureDirections, GitHubCard, Patents, Presentations, ProjectCard, Publications, Timeline, TechnicalSkills } from './components/Content';
import { HeroBrain } from './components/HeroBrain';
import { ProjectsSection } from './components/ProjectsSection';
import { CustomCursor } from './components/CustomCursor';
import { News } from './components/News';
import { ProjectPage } from './components/ProjectPage';
import { portfolio } from './data/portfolio';
import { sections, useSectionNavigation } from './hooks/useSectionNavigation';
import { Moon, Sun } from 'lucide-react';

export default function App({ projectId }: { projectId?: string } = {}) {
  const project = portfolio.projects.find(project => project.id === projectId);
  return project ? <ProjectPage project={project} /> : <HomePage />;
}

function HomePage() {
  const navigation = useSectionNavigation();

  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem('theme') === 'dark'; } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch { /* ignore */ }
  }, [dark]);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('section, .mj-paper, .project-card, .research-interest');
    const obs = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.removeAttribute('data-hidden');
          obs.unobserve(entry.target);
        }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
    );
    targets.forEach((el, i) => {
      el.setAttribute('data-hidden', '');
      el.style.transitionDelay = `${Math.min(i % 4 * 60, 180)}ms`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return <><CustomCursor /><main className="homepage" ref={navigation.mainRef}>
    <a className="skip-link" href="#about">Skip to content</a>
    <div ref={navigation.navRef} className={`site-nav${navigation.menuOpen ? ' is-open' : ''}`} onKeyDown={event => {
      if (event.key === 'Escape' && navigation.menuOpen) {
        navigation.setMenuOpen(false);
        navigation.navRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
      }
    }}>
      <a className="site-name" href="#about" onClick={event => navigation.navigate(event, 'about')}>Myeongju Cho</a>
      <div className="mobile-menu"><span>Myeongju Cho</span><button className="menu-toggle" type="button" aria-expanded={navigation.menuOpen} aria-controls="section-navigation" onClick={() => navigation.setMenuOpen(open => !open)}>{navigation.menuOpen ? 'Close menu' : 'Menu'}</button></div>
      <nav id="section-navigation" className="section-nav" aria-label="Page sections">{sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={navigation.active === id ? 'location' : undefined} onClick={event => navigation.navigate(event, id)}>{label}</a>)}</nav>
      <button className="theme-toggle" onClick={() => setDark(d => !d)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>{dark ? <Sun size={15} /> : <Moon size={15} />}</button>
    </div>
    <HeroBrain />
    <div className="about-area">
      <About />
      <FutureDirections />
      <Competencies />
      <News />
      <Timeline id="experience" title="Research Experience" entries={portfolio.experience} />
      <Timeline id="education" title="Education" entries={portfolio.education} />
      <TechnicalSkills />
    </div>
    <Publications /><Presentations />
    <ProjectsSection navigate={navigation.navigate} />
    <Activities /><Patents /><Awards />
    <footer><p>Copyright ©Myeongju Cho</p></footer>
  </main></>;
}
