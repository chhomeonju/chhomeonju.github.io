import { useEffect, useRef, useState } from 'react';
import type { Navigate } from '../components/Content';

export const sections = [
  ['about', 'About'], ['publications', 'Publications'],
  ['presentations', 'Presentations'], ['projects', 'Projects'], ['activities', 'Activities'],
  ['patents', 'Patent'], ['awards', 'Awards'],
] as const;

export function useSectionNavigation() {
  const [active, setActive] = useState<string>('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const main = mainRef.current;
    if (!nav || !main) return;
    let disposed = false;
    let interacted = false;
    let scrollFrame = 0;
    let alignmentFrame = 0;
    let offset = 80;
    function measure() {
      const lastSection = main!.querySelector<HTMLElement>('#awards');
      const footer = main!.querySelector('footer');
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
    function alignHash(animate: boolean) {
      const id = window.location.hash.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (id && !target) return;
      measure();
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: target ? Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset) : 0,
        behavior: animate && !reducedMotion ? 'smooth' : 'instant',
      });
      if (!animate || reducedMotion) updateActive();
    }
    function scheduleAlignment(animate: boolean) {
      setMenuOpen(false);
      cancelAnimationFrame(alignmentFrame);
      // Wait for the mobile menu to close before measuring the sticky navigation.
      alignmentFrame = requestAnimationFrame(() => {
        alignmentFrame = requestAnimationFrame(() => alignHash(animate));
      });
    }
    function navigateRequested() { interacted = true; scheduleAlignment(true); }
    function hashChanged() { interacted = true; scheduleAlignment(true); }
    function initialAlignment() { if (!interacted) scheduleAlignment(false); }
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
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', resize);
    window.addEventListener('hashchange', hashChanged);
    window.addEventListener('popstate', hashChanged);
    window.addEventListener('portfolio:navigate', navigateRequested);
    window.addEventListener('load', initialAlignment);
    measure(); updateActive(); initialAlignment();
    document.fonts.ready.then(() => { if (!disposed) initialAlignment(); });
    return () => {
      disposed = true;
      observer.disconnect(); cancelAnimationFrame(scrollFrame); cancelAnimationFrame(alignmentFrame);
      window.removeEventListener('scroll', scroll); window.removeEventListener('resize', resize);
      window.removeEventListener('hashchange', hashChanged); window.removeEventListener('popstate', hashChanged);
      window.removeEventListener('portfolio:navigate', navigateRequested);
      window.removeEventListener('load', initialAlignment);
    };
  }, []);

  const navigate: Navigate = (event, id) => {
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    window.dispatchEvent(new Event('portfolio:navigate'));
  };
  return { active, menuOpen, setMenuOpen, navigate, navRef, mainRef };
}
