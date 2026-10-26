import { useCallback, useEffect, useRef, useState } from 'react';
import type { Navigate } from '../components/Content';

export const sections = [
  ['about', 'About'], ['publications', 'Publications'], ['presentations', 'Presentations'],
  ['projects', 'Projects'], ['awards', 'Awards'], ['education', 'Education'], ['experience', 'Experience'],
] as const;

export function useSectionNavigation() {
  const [active, setActive] = useState<string>('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const [openProjects, setOpenProjects] = useState<Set<string>>(() => new Set());
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const toggleProject = useCallback((id: string, open: boolean) => {
    setOpenProjects(previous => {
      if (previous.has(id) === open) return previous;
      const next = new Set(previous);
      if (open) next.add(id); else next.delete(id);
      return next;
    });
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const main = mainRef.current;
    if (!nav || !main) return;
    const lastSection = main.querySelector<HTMLElement>('#experience');
    const footer = main.querySelector('footer');
    let disposed = false;
    let scrollFrame = 0;
    let alignmentFrame = 0;
    let offset = 80;
    function measure() {
      if (!nav || !main || !lastSection || !footer) return;
      offset = Math.ceil(nav.getBoundingClientRect().height) + 20;
      document.documentElement.style.setProperty('--section-offset', `${offset}px`);
      main.style.paddingBottom = `${Math.max(0, window.innerHeight - offset - lastSection.getBoundingClientRect().height - footer.getBoundingClientRect().height)}px`;
    }
    function updateActive() {
      let current: string = 'about';
      for (const [id] of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= offset + 2) current = id;
      }
      setActive(current);
    }
    function alignHash() {
      const id = window.location.hash.slice(1);
      if (!id) { window.scrollTo({ top: 0 }); setActive('about'); return; }
      const target = document.getElementById(id);
      if (!target) return;
      measure();
      window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: 'instant' });
      setActive(id.startsWith('project-') ? 'projects' : id);
    }
    function hashChanged() {
      const id = window.location.hash.slice(1);
      if (id.startsWith('project-')) toggleProject(id, true);
      setMenuOpen(false);
      cancelAnimationFrame(alignmentFrame);
      alignmentFrame = requestAnimationFrame(() => { alignmentFrame = requestAnimationFrame(alignHash); });
    }
    function scroll() {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; updateActive(); });
    }
    function resize() {
      if (window.innerWidth > 680) setMenuOpen(false);
      measure(); updateActive();
    }
    const observer = new ResizeObserver(() => { measure(); updateActive(); });
    observer.observe(nav);
    if (lastSection) observer.observe(lastSection);
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('hashchange', hashChanged);
    window.addEventListener('popstate', hashChanged);
    window.addEventListener('load', hashChanged);
    measure(); updateActive(); hashChanged();
    document.fonts.ready.then(() => { if (!disposed) { measure(); hashChanged(); } });
    return () => {
      disposed = true;
      observer.disconnect(); cancelAnimationFrame(scrollFrame); cancelAnimationFrame(alignmentFrame);
      window.removeEventListener('scroll', scroll); window.removeEventListener('resize', resize);
      window.removeEventListener('hashchange', hashChanged); window.removeEventListener('popstate', hashChanged);
      window.removeEventListener('load', hashChanged);
    };
  }, [toggleProject]);

  const navigate: Navigate = (event, id) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };
  return { active, menuOpen, setMenuOpen, openProjects, toggleProject, navigate, navRef, mainRef };
}
