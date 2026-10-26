import { About, Awards, Presentations, ProjectCard, Publications, Timeline } from './components/Content';
import { portfolio } from './data/portfolio';
import { sections, useSectionNavigation } from './hooks/useSectionNavigation';

export default function App() {
  const navigation = useSectionNavigation();
  return <main ref={navigation.mainRef}>
    <div ref={navigation.navRef} className={`site-nav${navigation.menuOpen ? ' is-open' : ''}`} onKeyDown={event => {
      if (event.key === 'Escape' && navigation.menuOpen) {
        navigation.setMenuOpen(false);
        navigation.navRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
      }
    }}>
      <a className="site-name" href="#about" onClick={event => navigation.navigate(event, 'about')}>Myeongju Cho</a>
      <div className="mobile-menu"><span>Myeongju Cho</span><button className="menu-toggle" type="button" aria-expanded={navigation.menuOpen} aria-controls="section-navigation" onClick={() => navigation.setMenuOpen(open => !open)}>{navigation.menuOpen ? 'Close menu' : 'Menu'}</button></div>
      <nav id="section-navigation" className="section-nav" aria-label="Page sections">{sections.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={navigation.active === id ? 'location' : undefined} onClick={event => navigation.navigate(event, id)}>{label}</a>)}</nav>
    </div>
    <About /><Publications /><Presentations />
    <section id="projects"><div className="projects-heading"><h2>Projects</h2><p>Research and applied work, from neural signals to language.</p></div><div className="project-grid">{portfolio.projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} open={navigation.openProjects.has(project.id)} onToggle={navigation.toggleProject} navigate={navigation.navigate} />)}</div></section>
    <Awards />
    <Timeline id="education" title="Education" entries={portfolio.education} />
    <Timeline id="experience" title="Research Experience" entries={portfolio.experience} />
    <footer><p>Copyright ©Myeongju Cho</p></footer>
  </main>;
}
