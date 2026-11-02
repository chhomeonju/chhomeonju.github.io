import { useEffect, useState } from 'react';

const TOC_ITEMS = [
  { id: 'about',  label: 'About' },
  { id: 'research-interests', label: 'Research Interests' },
  { id: 'research-trajectory', label: 'Research Trajectory' },
  { id: 'competencies', label: 'Competencies' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Technical Skills' },
];

export function FloatingTOC() {
  const [active, setActive] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [inAbout, setInAbout] = useState(true);

  useEffect(() => {
    let frame=0;
    const update=()=>{
      frame=0;
      const nav=document.querySelector('.site-nav');
      const offset=(nav?.getBoundingClientRect().height??72)+20;
      const readingLine=offset+Math.min(120,window.innerHeight*.18);
      let current=TOC_ITEMS[0].id;
      for(const {id} of TOC_ITEMS){
        const el=document.getElementById(id);
        if(el&&el.getBoundingClientRect().top<=readingLine)current=id;
      }
      setActive(current);
      setScrolled(window.scrollY>80);
      const skills=document.getElementById('skills');
      // Hide the TOC only after the last TOC section (Technical Skills) has scrolled off the top.
      setInAbout(!skills||skills.getBoundingClientRect().bottom>offset);
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    const observer=new ResizeObserver(schedule);
    const area=document.querySelector('.about-area');
    if(area)observer.observe(area);
    update();
    return()=>{
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll',schedule);
      window.removeEventListener('resize',schedule);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`floating-toc${inAbout ? ' floating-toc--visible' : ''}${scrolled ? ' floating-toc--scrolled' : ''}`} aria-label="Page sections">
      <ul>
        {TOC_ITEMS.map(({ id, label }) => (
          <li key={id}>
            <button
              className={`ftoc-item${active === id ? ' ftoc-item--active' : ''}`}
              onClick={() => scrollTo(id)}
              title={label}
              aria-label={label}
              aria-current={active===id?'location':undefined}
            >
              <span className="ftoc-label">{label}</span>
              <span className="ftoc-dot" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
