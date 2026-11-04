import { CSSProperties, Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';

declare global {
  interface Window { meshes: Array<{ p: string; n: string; i: string }> }
}

const INTERESTS = [
  {
    title: 'Neural Encoding & Decoding',
    question: 'What cognitive representations are encoded in neural activity?',
    description: 'Exploring how cognitive information is represented in neural activity and decoded using deep learning across neuroimaging modalities, such as EEG, MEG, ECoG, and fMRI.',
    tag: 'Decoding', tagClass: 'ri-tag--decode',
  },
  {
    title: 'Brain Dynamics & Network Neuroscience',
    question: 'How do brain networks change and interact over time?',
    description: 'Characterizing dynamic functional connectivity, latent brain states, and network reconfiguration to understand the temporal organization and interactions of distributed brain networks.',
    tag: 'Network', tagClass: 'ri-tag--net',
  },
  {
    title: 'Neural Mechanisms & Neuromodulation',
    question: 'How do neural activity and network interactions contribute to cognition, emotion, and behavior?',
    description: 'Investigating how neural activity and brain network interactions support cognition, emotion, and behavior, and how neuromodulation influences brain dynamics and mental health.',
    tag: 'Mechanisms & Modulation', tagClass: 'ri-tag--mech',
  },
  {
    title: 'Computational Modeling & Foundation Models',
    question: 'How can computational models explain and predict brain function and how it changes?',
    description: 'Leveraging computational approaches, including deep learning, large language models, and multimodal foundation models, to model neural representations, predict brain responses, and advance our understanding of the neural mechanisms underlying human brain function.',
    tag: 'Modeling', tagClass: 'ri-tag--comp',
  },
];

// ── WebGL shaders ──────────────────────────────────────────────────────────
const VERTEX = `
attribute vec3 position; attribute vec3 normal;
uniform float angle; uniform float tilt; uniform float aspect;
varying vec3 point; varying vec3 shadingNormal;
void main(){
 point=position;
 vec3 q=vec3(position.y,position.z,position.x);
 vec3 n=vec3(normal.y,normal.z,normal.x);
 mat3 yaw=mat3(cos(angle),0.,-sin(angle),0.,1.,0.,sin(angle),0.,cos(angle));
 mat3 pitch=mat3(1.,0.,0.,0.,cos(tilt),sin(tilt),0.,-sin(tilt),cos(tilt));
 q=pitch*yaw*q; n=pitch*yaw*n;
 float perspective=1.+q.z*.12;
 gl_Position=vec4(q.x/(aspect*.97)*perspective,q.y/.97*perspective,-q.z*.35,1.);
 shadingNormal=normalize(n);
}`;

const FRAGMENT = `
precision mediump float;
uniform float time; uniform float mode; uniform float stimIdx; uniform float networkFocus;
uniform vec3 encColor0; uniform vec3 encColor1; uniform vec3 encColor2; uniform vec3 encWeights;
varying vec3 point; varying vec3 shadingNormal;
float wave(vec3 focus,float offset){
 float d=distance(point,focus);
 float r=mod(time*.24+offset,1.9);
 return exp(-pow((d-r)/.13,2.))*exp(-d*.55);
}
/* Gaussian glow at anatomical focus — no ripple, just regional activation */
float glow(vec3 focus,float sigma){
 vec3 dv=point-focus;
 return exp(-dot(dv,dv)/(2.*sigma*sigma));
}
float surfaceLink(vec3 a,vec3 b){
 vec3 p=normalize(point); a=normalize(a); b=normalize(b);
 float plane=abs(dot(p,normalize(cross(a,b))));
 float gate=smoothstep(dot(a,b),dot(a,b)+.15,min(dot(p,a),dot(p,b)));
 return exp(-pow(plane/.022,2.))*gate;
}
void main(){
 vec3 n=normalize(shadingNormal);
 float light=max(dot(n,normalize(vec3(-.6,.9,1.4))),0.);
 float side=max(dot(n,normalize(vec3(.7,-.1,.5))),0.);
 /* Darker base gives activations more visual contrast */
 vec3 base=vec3(.72,.76,.82)*(.60+.28*light+.12*side);
 float activity; vec3 highlight;
 if(mode>5.5){
  /* Coordinated regional activity and surface coupling, schematic, not an atlas. */
  vec3 p1=vec3(-.40,.20,.26),p2=vec3(.40,.20,.26);
  vec3 p3=vec3(-.32,-.22,.30),p4=vec3(.32,-.22,.30);
  vec3 p5=vec3(-.34,.16,-.27),p6=vec3(.34,.16,-.27);
  float g1=(glow(p1,.15)+glow(p2,.15))*(.55+.45*sin(time*1.4));
  float g2=(glow(p3,.15)+glow(p4,.15))*(.55+.45*sin(time*1.1+2.));
  float g3=(glow(p5,.17)+glow(p6,.17))*(.55+.45*sin(time*1.2+4.));
  float links1=surfaceLink(p1,p2)+surfaceLink(p1,p3)+surfaceLink(p2,p4);
  float links2=surfaceLink(p3,p5)+surfaceLink(p4,p6)+surfaceLink(p5,p6);
  float l1=links1*(.42+.24*sin(time*1.4)),l2=links2*(.42+.24*sin(time*1.1+2.));
  vec3 c1=vec3(.16,.64,1.),c2=vec3(1.,.30,.43),c3=vec3(.56,.30,1.);
  float g4=glow(vec3(0.,-.12,.36),.18)*(.7+.3*sin(time*1.3));
  float g5=(glow(vec3(-.43,-.15,.04),.16)+glow(vec3(.43,-.15,.04),.16))*(.7+.3*sin(time*1.2+2.));
  if(networkFocus>=0.){
    g1*=abs(networkFocus-1.)<.1?1.3:.10;
    g2*=networkFocus<.1?1.3:.10;
    g3*=abs(networkFocus-4.)<.1?1.3:.10;
    g4*=abs(networkFocus-3.)<.1?1.3:.10;
    g5*=abs(networkFocus-2.)<.1?1.3:.10;
    l1*=.35;l2*=.35;
  }
  float sum=g1+g2+g3+g4+g5+l1+l2;
  activity=clamp(sum*1.95,0.,.98);
  highlight=(c1*(g1+l1)+c2*g2+c3*(g3+l2)+vec3(.24,.78,.58)*g4+vec3(.98,.65,.20)*g5)/max(sum,.001);
  highlight*=(.85+.15*light);
 }else if(mode>4.5){
  /* Colors and relative strengths come from the same stimulus data as the bars. */
  float response=.75+.25*sin(time*2.4);
  float front=glow(vec3(-.40,.18,.28),.16)+glow(vec3(.40,.18,.28),.16);
  float temporal=glow(vec3(-.43,-.18,.27),.16)+glow(vec3(.43,-.18,.27),.16);
  float back=glow(vec3(-.38,.12,-.28),.18)+glow(vec3(.38,.12,-.28),.18);
  float crown=glow(vec3(0.,.40,.08),.18)+glow(vec3(0.,-.32,.12),.16);
  float a=(back+front*.18)*encWeights.x;
  float b=(front*.85+crown*.5)*encWeights.y;
  float c=(temporal*.85+crown*.15)*encWeights.z;
  float local=a+b+c;
  activity=clamp(local*response*2.0,0.,1.)*.729;
  highlight=(encColor0*a+encColor1*b+encColor2*c)/max(local,.001);
  highlight*=(.88+.12*light);
 }else if(mode>1.5 && mode<2.5){
  vec3 target=vec3(-.38,.28,.20);
  float pulse=pow(max(0.,sin(time*3.2)),3.);
  activity=clamp(glow(target,.19)*(.9+pulse)+wave(target,.0)*.24,0.,1.);
  highlight=mix(vec3(.96,.26,.35),vec3(1.,.67,.19),pulse)*(.8+.2*light);
 }else if(mode<0.5){
  /* Decoding: Broca, Wernicke, SMA — left hemisphere speech areas */
  float a=wave(vec3(-.38,.15,.30),0.0);
  float b=wave(vec3(-.40,-.20,.42),.45);
  float c=wave(vec3(-.12,.38,.12),.90);
  activity=clamp(a*1.0+b*.95+c*.72,0.,1.);
  highlight=vec3(.10,.33,.72)*(.72+.28*light);
 }else if(mode<1.5){
  /* Language: fronto-temporal bilateral, left-dominant */
  float a=wave(vec3(-.44,.12,.22),0.);
  float b=wave(vec3(-.32,-.08,.38),.50);
  float c=wave(vec3( .30, .10,.28),.85);
  float d=wave(vec3(-.50,.32,-.08),1.20);
  activity=clamp(a*.88+b*.80+c*.55+d*.65,0.,1.);
  highlight=vec3(.46,.16,.82)*(.72+.28*light);
 }else{
  /* Network RSN: stimulus-driven regional activation.
     mode<3.5 → static weighted glow (Brain Dynamics / Neuromod / Comp panels).
     mode≥3.5 → per-network HRF blink (Encoding phase: stimulus→predicted response). */

  /* Spatial glows at canonical anatomical loci */
  float gDmn=max(max(glow(vec3(.00,.30,.16),.18),glow(vec3(.00,-.18,.42),.17)),
                 max(glow(vec3(-.36,.06,.36),.14),glow(vec3(.36,.06,.36),.14)));
  float gFpnl=max(glow(vec3(-.40,.28,.20),.16),glow(vec3(-.42,.14,.36),.14));
  float gFpnr=max(glow(vec3(.40,.28,.20),.16),glow(vec3(.42,.14,.36),.14));
  float gLan=max(glow(vec3(-.44,.16,.30),.16),glow(vec3(-.48,-.18,.42),.16));
  float gSan=max(max(glow(vec3(-.36,.12,.22),.15),glow(vec3(.36,.12,.22),.15)),
                 max(glow(vec3(-.26,-.04,.26),.13),glow(vec3(.00,.22,.20),.14)));
  float gSmn=max(max(glow(vec3(-.30,.30,.18),.15),glow(vec3(.30,.30,.18),.15)),
                 glow(vec3(.00,.40,.14),.15));
  float gVis=max(max(glow(vec3(-.44,.10,.08),.18),glow(vec3(.44,.10,.08),.18)),
                 max(glow(vec3(-.38,.08,-.06),.17),glow(vec3(.38,.08,-.06),.17)));

  float wDmn,wFpnl,wFpnr,wLan,wSan,wSmn,wVis;
  if(stimIdx<0.5){
   wVis=1.0;wSan=0.72;wFpnr=0.78;wFpnl=0.38;wSmn=0.18;wDmn=0.10;wLan=0.07;
  }else if(stimIdx<1.5){
   wLan=1.0;wFpnl=0.88;wDmn=0.65;wSmn=0.42;wSan=0.20;wFpnr=0.22;wVis=0.06;
  }else if(stimIdx<2.5){
   wSan=1.0;wVis=0.88;wDmn=0.72;wFpnl=0.55;wFpnr=0.48;wLan=0.30;wSmn=0.22;
  }else{
   wLan=1.0;wDmn=0.85;wFpnl=0.78;wFpnr=0.35;wSan=0.18;wVis=0.12;wSmn=0.08;
  }

  vec3 cDmn=vec3(1.00,.18,.22);vec3 cFpn=vec3(.22,.60,.98);
  vec3 cLan=vec3(1.00,.52,.00);vec3 cSan=vec3(1.00,.65,.12);
  vec3 cSmn=vec3(.12,.82,.38); vec3 cVis=vec3(.68,.18,1.00);

  /* Effective per-network weight: slow pulse (static) or per-network HRF blink */
  float bDmn=0.,bFpnl=0.,bFpnr=0.,bLan=0.,bSan=0.,bSmn=0.,bVis=0.;
  if(mode<3.5){
   float pulse=0.82+0.18*sin(time*0.90);
   bDmn=wDmn*pulse;bFpnl=wFpnl*pulse;bFpnr=wFpnr*pulse;bLan=wLan*pulse;
   bSan=wSan*pulse;bSmn=wSmn*pulse;bVis=wVis*pulse;
  }else{
   /* pow(max(0,sin()),5) → narrow ~18% duty-cycle peak per network,
      staggered phases so each RSN blinks at a different moment */
   bDmn =pow(max(0.,sin(time*1.80+0.00)),5.)*wDmn;
   bFpnl=pow(max(0.,sin(time*2.10+1.05)),5.)*wFpnl;
   bFpnr=pow(max(0.,sin(time*1.95+2.10)),5.)*wFpnr;
   bLan =pow(max(0.,sin(time*2.25+0.70)),5.)*wLan;
   bSan =pow(max(0.,sin(time*1.65+1.75)),5.)*wSan;
   bSmn =pow(max(0.,sin(time*2.40+3.14)),5.)*wSmn;
   bVis =pow(max(0.,sin(time*2.00+2.45)),5.)*wVis;
  }

  float boost=mode<3.5?2.5:4.0;
  float gam=mode<3.5?0.60:0.52;
  float aNet=gDmn*bDmn+gFpnl*bFpnl+gFpnr*bFpnr+gLan*bLan+gSan*bSan+gSmn*bSmn+gVis*bVis;
  float aBoosted=clamp(aNet*boost,0.,1.);
  activity=pow(aBoosted,gam);
  float tw=max(aNet,.001);
  highlight=(cDmn*(gDmn*bDmn)+cFpn*(gFpnl*bFpnl+gFpnr*bFpnr)+
            cLan*(gLan*bLan)+cSan*(gSan*bSan)+
            cSmn*(gSmn*bSmn)+cVis*(gVis*bVis))/tw;
  highlight*=(.80+.20*light);
 }
 gl_FragColor=vec4(mix(base,highlight,activity),1.);
}`;

// ── Mode 0: EEG signal panel ──────────────────────────────────────────────
// Amplitudes are in pixels directly; frequencies in cycles/pixel (3-6 cycles per canvas width)
const EEG_CHS = [
  { name: 'FC3', color: '#60a5fa', freqs: [{f:.046,a:5.5},{f:.098,a:2.5},{f:.021,a:1.8}] },
  { name: 'C3', color: '#a78bfa', freqs: [{f:.052,a:6.5},{f:.112,a:2.8},{f:.014,a:2.2}] },
  { name: 'T7', color: '#34d399', freqs: [{f:.038,a:5.0},{f:.085,a:3.0},{f:.025,a:1.5}] },
  { name: 'P3', color: '#93c5fd', freqs: [{f:.044,a:4.5},{f:.095,a:2.0},{f:.018,a:1.8}] },
];

function EEGPanel() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let raf = 0, t = 0;
    // amplitude values are direct pixel offsets
    function sig(freqs:{f:number;a:number}[], t:number, x:number) {
      return freqs.reduce((s,{f,a})=>s+a*Math.sin(2*Math.PI*f*(t+x)), 0);
    }
    function draw() {
      const cv = ref.current; if (!cv) return;
      const ctx = cv.getContext('2d'); if (!ctx) return;
      const W = cv.width, H = cv.height;
      ctx.clearRect(0,0,W,H);
      const chH = H / EEG_CHS.length;
      const lw = 20;
      EEG_CHS.forEach((ch, i) => {
        const y0 = i*chH + chH/2;
        ctx.font = 'bold 7px system-ui,sans-serif';
        ctx.fillStyle = ch.color + 'bb';
        ctx.fillText(ch.name, 1, y0+2.5);
        ctx.strokeStyle = 'rgba(148,163,184,.10)';
        ctx.lineWidth = 0.4;
        ctx.beginPath(); ctx.moveTo(lw,y0); ctx.lineTo(W,y0); ctx.stroke();
        ctx.strokeStyle = ch.color;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = ch.color; ctx.shadowBlur = 2;
        ctx.beginPath();
        for (let px = 0; px < W-lw; px++) {
          const sy = y0 + sig(ch.freqs, t, px);   // amplitude already in px
          px===0 ? ctx.moveTo(lw+px, sy) : ctx.lineTo(lw+px, sy);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
      t += 0.4;
    }
    function loop() { draw(); raf = requestAnimationFrame(loop); }
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} width={88} height={160} className="ri-eeg-canvas" aria-hidden="true" />;
}

// ── Mode 0: Decoding overlay (converging arrows to readout center) ─────────
const DECODE_NODES = [
  { x: 30, y: 37 }, // Broca's area
  { x: 22, y: 56 }, // Wernicke's area
  { x: 46, y: 33 }, // SMA
];
const DECODE_CX = 50, DECODE_CY = 52;

function DecodingOverlay() {
  return (
    <svg className="ri-net-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="di-arrow" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
          <path d="M0,0 L5,2 L0,4 Z" fill="rgba(30,80,200,.85)" />
        </marker>
        <filter id="di-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.7" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {DECODE_NODES.map(({ x, y }, i) => {
        const dx = DECODE_CX-x, dy = DECODE_CY-y;
        const len = Math.sqrt(dx*dx+dy*dy);
        const ex = DECODE_CX-(dx/len)*5, ey = DECODE_CY-(dy/len)*5;
        return (
          <g key={i} style={{ '--di': `${i*0.4}s` } as CSSProperties}>
            <circle cx={x} cy={y} r={1.7} className="ri-decode-node" filter="url(#di-glow)" />
            <line x1={x} y1={y} x2={ex} y2={ey} className="ri-decode-edge" markerEnd="url(#di-arrow)" />
          </g>
        );
      })}
      <circle cx={DECODE_CX} cy={DECODE_CY} r={2.8} className="ri-decode-center" filter="url(#di-glow)" />
      <circle cx={DECODE_CX} cy={DECODE_CY} r={4.5} className="ri-decode-ring" />
    </svg>
  );
}

// Shared visual vocabulary for cortical hubs and the abstract modular graph.
// These illustrations do not encode an empirical atlas or estimated edge weights.
const DYNAMICS_COMMUNITIES = [
  {id:'DMN',name:'Default mode',color:'#ed6b83'},
  {id:'FPN',name:'Frontoparietal',color:'#4a9cdb'},
  {id:'SAL',name:'Salience',color:'#e9a346'},
  {id:'SMN',name:'Sensorimotor',color:'#49ad8f'},
  {id:'VIS',name:'Visual',color:'#9871d3'},
];
const CORTICAL_HUBS = [
  {x:50,y:22,g:0,label:'DMN'},
  {x:29,y:37,g:1,label:'FPN-L'},{x:71,y:37,g:1,label:'FPN-R'},
  {x:25,y:57,g:2,label:''},{x:75,y:57,g:2,label:'SAL'},
  {x:50,y:43,g:3,label:'SMN'},{x:50,y:77,g:4,label:'VIS'},
];
const CORTICAL_LINKS=[[0,1],[0,2],[0,5],[1,2],[1,3],[2,4],[3,5],[4,5],[3,6],[4,6],[5,6]];

type NetworkInteraction = {
  focused:number|null;
  selected:number|null;
  onHover:(group:number|null)=>void;
  onSelect:(group:number|null)=>void;
};

function BrainNetworkOverlay() {
  return <svg className="ri-cortical-overlay" viewBox="0 0 100 100" aria-hidden="true">
    {CORTICAL_LINKS.map(([i,j])=>{
      const a=CORTICAL_HUBS[i],b=CORTICAL_HUBS[j];
      return <path key={`${i}-${j}`} d={`M${a.x} ${a.y} Q50 ${(a.y+b.y)/2-9} ${b.x} ${b.y}`} fill="none" stroke={DYNAMICS_COMMUNITIES[a.g].color} className="ri-cortical-link" data-linked={`${a.g} ${b.g}`} style={{'--community-delay':`${-a.g*.65}s`} as CSSProperties}/>;
    })}
    {CORTICAL_HUBS.map((n,i)=><g key={i} className="ri-cortical-hub" data-community={n.g} style={{'--community-delay':`${-n.g*.65}s`} as CSSProperties}>
      <circle cx={n.x} cy={n.y} r="5.5" fill={DYNAMICS_COMMUNITIES[n.g].color} opacity=".18"/>
      <circle cx={n.x} cy={n.y} r="2.4" fill={DYNAMICS_COMMUNITIES[n.g].color} stroke="var(--paper)" strokeWidth=".45"/>
      {n.label&&<g><rect x={n.x-n.label.length*1.22-1.2} y={n.y+3.7} width={n.label.length*2.44+2.4} height="6.2" rx="1.3" className="ri-cortical-label-bg"/><text x={n.x} y={n.y+8.1} textAnchor="middle" className="ri-cortical-label">{n.label}</text></g>}
    </g>)}
  </svg>;
}

function NetworkGraph({selected,onHover,onSelect}: NetworkInteraction) {
  const polar=(angle:number,r:number)=>({x:80+r*Math.cos(angle),y:88+r*Math.sin(angle)});
  const start=-Math.PI/2-Math.PI/7;
  const nodes=DYNAMICS_COMMUNITIES.flatMap((group,g)=>Array.from({length:4},(_,j)=>({...polar(start+g*Math.PI*2/5+(j-1.5)*.16,48),g,color:group.color})));
  const internal=nodes.flatMap((a,i)=>nodes.flatMap((b,j)=>j>i&&a.g===b.g?[[i,j]]:[]));
  const bridges=[[1,5],[3,8],[6,13],[9,15],[11,18],[14,17],[2,19],[7,10]];
  return <div className="ri-network-only ri-network-connectogram">
    <span>Functional organization</span>
    <svg viewBox="0 0 160 178" role="group" aria-label="Explore functional network communities">
      <circle cx="80" cy="88" r="48" className="ri-connectogram-guide"/>
      {[...internal,...bridges].map(([i,j],k)=>{
        const a=nodes[i],b=nodes[j],within=a.g===b.g;
        return <path key={`${i}-${j}`} d={`M${a.x} ${a.y} Q${within?(a.x+b.x)/2:80} ${within?(a.y+b.y)/2:88} ${b.x} ${b.y}`} fill="none" stroke={within?a.color:'var(--muted)'} className={`ri-connectogram-edge${within?' ri-connectogram-edge--within':''}`} data-linked={`${a.g} ${b.g}`} style={{'--community-delay':`${-a.g*.65}s`,'--edge-weight':.55+(k%4)*.22} as CSSProperties}/>;
      })}
      {DYNAMICS_COMMUNITIES.map((group,g)=>{
        const center=start+g*Math.PI*2/5;
        const a=polar(center-.32,56),b=polar(center+.32,56),label=polar(center,70);
        return <g key={group.id} role="button" tabIndex={0} aria-label={`Explore ${group.name} network`} aria-pressed={selected===g} data-community={g} className="ri-community-control" onPointerEnter={()=>onHover(g)} onPointerLeave={()=>onHover(null)} onFocus={()=>onHover(g)} onBlur={()=>onHover(null)} onClick={()=>onSelect(g)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(g);}}}>
          <title>{group.name}</title><path d={`M${a.x} ${a.y} A56 56 0 0 1 ${b.x} ${b.y}`} fill="none" stroke="transparent" strokeWidth="18"/>
          <path d={`M${a.x} ${a.y} A56 56 0 0 1 ${b.x} ${b.y}`} fill="none" stroke={group.color} strokeWidth="2.8" strokeLinecap="round"/><text x={label.x} y={label.y+2.6} textAnchor="middle" className="ri-community-label" fill={group.color}>{group.id}</text></g>;
      })}
      {nodes.map((n,i)=><g key={i} className="ri-graph-hub" data-community={n.g} style={{'--community-delay':`${-n.g*.65}s`} as CSSProperties}><circle cx={n.x} cy={n.y} r="4.5" fill={n.color} opacity=".1"/><circle cx={n.x} cy={n.y} r="2.25" fill={n.color} stroke="var(--paper)" strokeWidth=".7"/></g>)}
    </svg>
  </div>;
}

function NetworkLegend({selected,onHover,onSelect}: NetworkInteraction) {
  return <div className="ri-dynamics-legend" role="group" aria-label="Highlight a functional network">
    {DYNAMICS_COMMUNITIES.map((c,i)=><button type="button" key={c.id} aria-pressed={selected===i} onPointerEnter={()=>onHover(i)} onPointerLeave={()=>onHover(null)} onFocus={()=>onHover(i)} onBlur={()=>onHover(null)} onClick={()=>onSelect(i)} style={{'--community-color':c.color} as CSSProperties}><i style={{background:c.color}}/>{c.name}</button>)}
  </div>;
}

// ── Mode 0: Encoding stimulus panel (card + network activation bars) ──────
const ENC_STIM_DATA = [
  {
    label: 'Visual',
    desc: 'object / scene perception',
    color: '#7c3aed',
    nets: [
      { name: 'VIS',   w: 1.00, color: '#7c3aed' },
      { name: 'FPN-R', w: 0.78, color: '#4a90d9' },
      { name: 'SAN',   w: 0.72, color: '#f4a261' },
    ],
  },
  {
    label: 'Speech',
    desc: 'lexical-phonological processing',
    color: '#f77f00',
    nets: [
      { name: 'LAN',   w: 1.00, color: '#f77f00' },
      { name: 'FPN-L', w: 0.88, color: '#4a90d9' },
      { name: 'DMN',   w: 0.65, color: '#e63946' },
    ],
  },
  {
    label: 'Emotional',
    desc: 'affective & social cognition',
    color: '#e63946',
    nets: [
      { name: 'SAN',   w: 1.00, color: '#f4a261' },
      { name: 'DMN',   w: 0.72, color: '#e63946' },
      { name: 'FPN-L', w: 0.55, color: '#4a90d9' },
    ],
  },
  {
    label: 'Language',
    desc: 'semantic processing',
    color: '#10b981',
    nets: [
      { name: 'LAN',   w: 1.00, color: '#f77f00' },
      { name: 'DMN',   w: 0.85, color: '#e63946' },
      { name: 'FPN-L', w: 0.78, color: '#4a90d9' },
    ],
  },
];

const ENC_STIM_ICONS = [
  // Visual: landscape + sun
  <svg key="vis" viewBox="0 0 58 44" width="58" height="44" aria-hidden="true">
    <rect x="0.5" y="0.5" width="57" height="43" rx="5" fill="rgba(124,58,237,.10)" stroke="rgba(124,58,237,.40)" strokeWidth="0.8"/>
    <circle cx="44" cy="12" r="6" fill="rgba(124,58,237,.55)"/>
    <polygon points="6,40 20,16 34,40" fill="rgba(124,58,237,.30)"/>
    <polygon points="22,40 38,20 54,40" fill="rgba(124,58,237,.50)"/>
  </svg>,
  // Speech: audio waveform bars
  <svg key="spe" viewBox="0 0 58 44" width="58" height="44" aria-hidden="true">
    <rect x="0.5" y="0.5" width="57" height="43" rx="5" fill="rgba(247,127,0,.10)" stroke="rgba(247,127,0,.40)" strokeWidth="0.8"/>
    {[5,10,18,26,32,28,20,13,8,5].map((h,i)=>(
      <rect key={i} x={7+i*4.6} y={36-h} width="3.5" height={h} rx="1.5" fill="rgba(247,127,0,.72)"/>
    ))}
  </svg>,
  // Emotional: 2×2 face grid
  <svg key="emo" viewBox="0 0 58 44" width="58" height="44" aria-hidden="true">
    <rect x="0.5" y="0.5" width="57" height="43" rx="5" fill="rgba(233,62,70,.10)" stroke="rgba(233,62,70,.40)" strokeWidth="0.8"/>
    {([
      [16,14,'M11,18 Q16,22 21,18'],
      [40,14,'M35,18 Q40,14 45,18'],
      [16,32,'M11,36 Q16,40 21,36'],
      [40,32,'M35,34 Q40,30 45,34'],
    ] as [number,number,string][]).map(([cx,cy,mouth],i)=>(
      <g key={i}>
        <circle cx={cx} cy={cy} r="10" fill="rgba(233,62,70,.16)" stroke="rgba(233,62,70,.55)" strokeWidth="0.7"/>
        <circle cx={cx-3} cy={cy-2} r="1.6" fill="rgba(233,62,70,.72)"/>
        <circle cx={cx+3} cy={cy-2} r="1.6" fill="rgba(233,62,70,.72)"/>
        <path d={mouth} fill="none" stroke="rgba(233,62,70,.72)" strokeWidth="1.2" strokeLinecap="round"/>
      </g>
    ))}
  </svg>,
  // Language: text lines
  <svg key="lan" viewBox="0 0 58 44" width="58" height="44" aria-hidden="true">
    <rect x="0.5" y="0.5" width="57" height="43" rx="5" fill="rgba(16,185,129,.10)" stroke="rgba(16,185,129,.40)" strokeWidth="0.8"/>
    <rect x="7" y="9"  width="44" height="5" rx="2.5" fill="rgba(16,185,129,.65)"/>
    <rect x="7" y="18" width="36" height="5" rx="2.5" fill="rgba(16,185,129,.50)"/>
    <rect x="7" y="27" width="40" height="5" rx="2.5" fill="rgba(16,185,129,.40)"/>
    <rect x="7" y="36" width="22" height="5" rx="2.5" fill="rgba(16,185,129,.30)"/>
  </svg>,
];

function EncodingNetworkBars({stimIdx}:{stimIdx:number}) {
  const stim=ENC_STIM_DATA[stimIdx % ENC_STIM_DATA.length];
  return <div className="ri-encoding-networks" aria-hidden="true">
    <span className="ri-encoding-networks-title">Active networks</span>
    <div className="ri-encstim-nets" key={stimIdx}>
      {stim.nets.map((net,i)=><div className="ri-encstim-net-row" key={net.name}>
        <span className="ri-encstim-dot" style={{background:net.color}}/>
        <span className="ri-encstim-net-name">{net.name}</span>
        <span className="ri-encstim-bar-bg"><span className="ri-encstim-bar ri-encoding-network-bar" style={{width:`${net.w*100}%`,background:net.color,animationDelay:`${i*-.45}s`}}/></span>
      </div>)}
    </div>
  </div>;
}

function EncodingStimPanel({ stimIdx, onSelect }: { stimIdx: number; onSelect: (i:number)=>void }) {
  const idx = stimIdx % ENC_STIM_DATA.length;
  const stim = ENC_STIM_DATA[idx];
  return (
    <div className="ri-encstim-panel">
      <div className="ri-encstim-hdr">Input Stimulus</div>
      <div className="ri-encstim-card"
        style={{ borderColor: stim.color + '50', background: stim.color + '0d' } as CSSProperties}>
        <div className={`ri-encstim-icon ri-stim-motion--${idx}`}>{ENC_STIM_ICONS[idx]}</div>
        <div className="ri-encstim-label" style={{ color: stim.color }}>{stim.label}</div>
        <div className="ri-encstim-desc">{stim.desc}</div>
        <div className="ri-encoding-features">{[['Shape','Motion'],['Pitch','Rhythm'],['Valence','Arousal'],['Words','Context']][idx].map((f,i)=><span key={f}><i style={{animationDelay:`${i*.4}s`}}/>{f}</span>)}</div>
      </div>
      <div className="ri-stim-selector" aria-label="Encoding stimulus">{ENC_STIM_DATA.map((item,i)=><button type="button" key={item.label} aria-label={`${item.label} stimulus`} aria-pressed={idx===i} title={item.label} onClick={()=>onSelect(i)} style={{'--choice-color':item.color} as CSSProperties}>{ENC_STIM_ICONS[i]}</button>)}</div>
    </div>
  );
}

// ── Mode 0: Decoding column (neural signal → model → task output) ────────
const DEC_TASKS = [
  { label: 'Emotion Recognition', icon: '🎭', classes: [
    { label: 'Positive', icon: '😊' }, { label: 'Negative', icon: '☹️' }, { label: 'Neutral', icon: '😐' },
  ] },
  { label: 'Motor Imagery', columns: 2, icon: '🖐️', classes: [
    { label: 'Left hand', icon: '👈' }, { label: 'Right hand', icon: '👉' },
    { label: 'Both hands', icon: '🙌' }, { label: 'Both feet', icon: '🦶' },
  ] },
  { label: 'Imagined Speech', columns: 3, icon: '💬', classes: [
    { label: 'Call', icon: '📞' }, { label: 'Music', icon: '🎵' }, { label: 'Down', icon: '⬇️' }, { label: 'Up', icon: '⬆️' },
    { label: 'Thank you', icon: '🙏' }, { label: 'Sorry', icon: '🙇' },
  ] },
  { label: 'Mental Disorder Prediction', icon: '🔎', classes: [
    { label: 'Healthy control', icon: '👤' }, { label: 'Depression', icon: '🌧️' },
  ] },
];

const ENCODE_DECODE_STEP_MS = 5000;
const DECODE_HIGHLIGHT_MS = ENCODE_DECODE_STEP_MS - 200;

function DecodingCol({ taskIdx }: { taskIdx: number }) {
  return (
    <div className="ri-dec-col" aria-hidden="true">
      <div className="ri-dec-dir-label">← decoding</div>
      <div className="ri-dec-model">
        <span>Foundation</span>
        <span>Model</span>
      </div>
      <div className="ri-dec-down">→</div>
      <div className="ri-dec-examples"><span className="ri-dec-examples-label">Tasks</span><ul className="ri-dec-tasks">
        {DEC_TASKS.map((t, i) => (
          <li key={t.label} className={`ri-dec-task${i === taskIdx ? ' ri-dec-task--on' : ''}`}>
            <span className="ri-dec-task-heading"><span className="ri-dec-task-icon">{t.icon}</span><span className="ri-dec-task-label">{t.label}</span></span>
            <span className="ri-dec-classes" style={{ '--class-step': `${DECODE_HIGHLIGHT_MS / t.classes.length}ms` } as CSSProperties}>
              {t.classes.map((item, index) => (
                <Fragment key={item.label}>
                  {t.columns === 2 && index === 2 && <span className="ri-dec-class-break" />}
                  {t.columns === 3 && index === 3 && <span className="ri-dec-class-break ri-dec-class-break--wide" />}
                  {t.columns === 3 && (index === 2 || index === 4) && <span className="ri-dec-class-break ri-dec-class-break--compact" />}
                  <span className="ri-dec-class" style={{ '--class-index': index } as CSSProperties}>
                    <span>{item.icon}</span>{item.label}
                  </span>
                </Fragment>
              ))}
            </span>
          </li>
        ))}
      </ul></div>
    </div>
  );
}

// ── Mode 2: TMS coil overlay on the brain ─────────────────────────────────
function NeuromodOverlay() {
  return (
    <svg className="ri-neuromod-schematic" viewBox="0 0 260 230" aria-hidden="true">
      <defs>
        <linearGradient id="ri-coil-metal" x2="0" y2="1">
          <stop stopColor="#64748b"/><stop offset="1" stopColor="#273548"/>
        </linearGradient>
        <radialGradient id="ri-target-glow">
          <stop stopColor="#fb7185" stopOpacity=".6"/><stop offset="1" stopColor="#fb7185" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <text x="16" y="20" className="ri-nm-svg-label">TMS paradigm</text>
      <path d="M174 19 C205 12 223 32 234 11" stroke="#64748b" strokeWidth="4" fill="none"/>
      <g transform="translate(100 40) rotate(-16)">
        <path d="M40 0 H77" stroke="#475569" strokeWidth="12" strokeLinecap="round"/>
        {[-20, 20].map(x => <g key={x}>
          <ellipse cx={x} rx="23" ry="14" fill="var(--paper)" stroke="url(#ri-coil-metal)" strokeWidth="8"/>
          <ellipse cx={x} rx="16" ry="8" fill="none" stroke="#fb7185" strokeWidth="1.8"/>
        </g>)}
      </g>
      {[0,1,2].map(i => <path key={i} d={`M${77+i*18} 57 Q${90+i*10} 78 107 105`} className="ri-nm-field" fill="none" stroke="#e79936" strokeWidth="1.5" strokeDasharray="4 5" style={{animationDelay:`${i*.2}s`}}/>)}
      <circle cx="107" cy="107" r="30" fill="url(#ri-target-glow)" className="ri-nm-focus"/>
      <circle cx="107" cy="107" r="7" fill="#fb7185" stroke="white" strokeWidth="2"/>
      <circle cx="107" cy="107" r="15" fill="none" stroke="#fb7185" className="ri-nm-focus-ring"/>
      <path d="M115 106 L178 82 H241" fill="none" stroke="#e98088" strokeWidth="1"/>
      <text x="183" y="76" className="ri-nm-svg-label">Cortical target</text>
      <text x="130" y="222" textAnchor="middle" className="ri-nm-svg-label">Perturb activity · probe mechanisms</text>
    </svg>
  );
}

function NeuromodDevicePanel() {
  return <div className="ri-nm-intro" aria-hidden="true">
    <span className="ri-nm-intro-title">Targeted neuromodulation</span>
    <span className="ri-nm-methods"><span>TMS <small>magnetic pulses</small></span><span>tDCS <small>weak current</small></span></span>
  </div>;
}

function NeuromodBeforeAfter() {
  const baseline=useRef<HTMLCanvasElement>(null),modulated=useRef<HTMLCanvasElement>(null);
  useEffect(()=>{
    let raf=0,start=0;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function draw(stamp:number){
      if(!start)start=stamp;
      // Fast left-to-right acquisition, followed by a short hold before the next sweep.
      const cycle=(stamp-start)%3500;
      [baseline,modulated].forEach((ref,row)=>{
        const ctx=ref.current?.getContext('2d');if(!ctx)return;
        const color=row?'#e7627b':'#94a3b8';
        const progress=reduced?1:Math.max(0,Math.min(1,(cycle-(row?1450:0))/1200));
        ctx.setTransform(2,0,0,2,0,0);ctx.clearRect(0,0,180,50);
        ctx.strokeStyle='rgba(148,163,184,.15)';ctx.lineWidth=.6;
        ctx.beginPath();ctx.moveTo(0,25);ctx.lineTo(180,25);ctx.stroke();
        ctx.strokeStyle=color;ctx.lineWidth=1.6;ctx.lineJoin='round';ctx.beginPath();
        let y=25;
        const end=Math.floor(progress*180);
        for(let i=0;i<=end;i++){
          const envelope=row?9+3*Math.sin(i*.035):4;
          y=25+Math.sin(i*(row?.23:.16))*envelope+Math.sin(i*.47)*(row?3:1.5);
          i?ctx.lineTo(i,y):ctx.moveTo(i,y);
        }
        ctx.stroke();
        if(progress>0 && progress<1){ctx.fillStyle=color;ctx.beginPath();ctx.arc(end,y,2,0,Math.PI*2);ctx.fill();}
      });
      if(!reduced)raf=requestAnimationFrame(draw);
    }
    raf=requestAnimationFrame(draw);return()=>cancelAnimationFrame(raf);
  },[]);
  return <div className="ri-nm-response" aria-hidden="true">
    <div className="ri-nm-response-title">Neural response <span>Illustrative</span></div>
    <div className="ri-nm-trace-row"><span>Baseline</span><canvas ref={baseline} width={360} height={100}/></div>
    <div className="ri-nm-trace-row"><span>Modulated</span><canvas ref={modulated} width={360} height={100}/></div>
  </div>;
}

function NeuralInputGlyph() {
  return <svg viewBox="0 0 150 62" className="ri-modalities-glyph" aria-hidden="true">
    {['EEG','MEG','ECoG'].map((label,i)=><g key={label}>
      <text x="0" y={12+i*18} className="ri-modality-name">{label}</text>
      <path className="ri-modality-wave" d={`M24 ${10+i*18} l5 0 3 -4 4 8 4 -12 4 9 6 -3 5 2 5 -4 5 5 5 -3 6 1`} style={{animationDelay:`${i*-.5}s`,stroke:['#548dd6','#9c78d1','#20a99b'][i]}}/>
    </g>)}
    <g transform="translate(94 2)">
      <path className="ri-volume-outline" d="M24 2 C9 0 0 13 1 28 C2 45 11 49 22 46 L24 7 L26 46 C40 48 49 38 48 24 C48 10 39 1 26 2 Z"/>
      <path className="ri-volume-fold" d="M8 16 Q15 10 20 15 M5 28 Q13 21 20 26 M8 37 Q15 30 20 35 M29 14 Q38 9 43 18 M29 25 Q39 20 45 29 M29 35 Q36 30 42 38"/>
      <ellipse cx="13" cy="22" rx="5" ry="7" className="ri-bold-spot"/>
      <ellipse cx="35" cy="33" rx="6" ry="5" className="ri-bold-spot ri-bold-spot--second"/>
      <text x="24" y="59" textAnchor="middle" className="ri-modality-name">fMRI · BOLD</text>
    </g>
  </svg>;
}

function MultimodalContextGlyph() {
  return <svg className="ri-model-context" viewBox="0 0 156 62" aria-hidden="true">
    <g className="ri-context-text">
      <rect className="ri-context-panel" x="1" y="6" width="48" height="48" rx="6" />
      <rect x="7" y="13" width="21" height="14" rx="3" />
      <rect x="14" y="32" width="28" height="14" rx="3" />
      <text x="17.5" y="23">hear</text>
      <text x="28" y="42">birds</text>
    </g>
    <g className="ri-context-vision">
      <rect className="ri-context-panel" x="54" y="6" width="48" height="48" rx="6" />
      <rect x="60" y="13" width="36" height="34" rx="3" fill="#b8dfec" />
      <circle cx="88" cy="21" r="3" fill="#ffe4a0" />
      <polygon points="60,46 60,37 71,27 81,36 88,31 96,38 96,46" fill="#80ab95" />
      <line x1="66" y1="40" x2="91" y2="36" stroke="#534332" strokeWidth="1.2" />
      <ellipse cx="78" cy="33" rx="5" ry="3" fill="#26484e" transform="rotate(-20 78 33)" />
      <circle cx="82" cy="29" r="2.3" fill="#26484e" />
      <polygon points="84,28 88,29 84,30" fill="#9a5928" />
    </g>
    <g className="ri-context-audio">
      <rect className="ri-context-panel" x="107" y="6" width="48" height="48" rx="6" />
      <line x1="112" y1="28" x2="150" y2="28" />
      <polyline points="112,28 114,27 116,30 118,22 120,35 122,18 124,37 126,24 128,28 130,27 132,30 134,21 136,35 138,19 140,33 142,24 144,30 146,26 148,29 150,28" />
      <line x1="112" y1="44" x2="150" y2="44" />
      <line x1="112" y1="42" x2="112" y2="46" />
      <line x1="131" y1="42" x2="131" y2="46" />
      <line x1="150" y1="42" x2="150" y2="46" />
    </g>
  </svg>;
}

function OutputGlyph({kind}:{kind:number}) {
  return <svg viewBox="0 0 90 48" className={`ri-output-glyph ri-output-glyph--${kind}`} aria-hidden="true">
    {kind===0?<>
      <path d="M4 23 l5 0 3 -5 4 11 4 -14 5 9 5 -2" className="ri-output-line"/>
      <path d="M33 23 H43 M40 20 l4 3 -4 3" className="ri-output-line"/>
      {[12,28,18].map((h,i)=><rect key={i} x={50+i*12} y={37-h} width="8" height={h} rx="2" className={`ri-output-bar${i===1?' ri-output-bar--chosen':''}`}/>)}
      <path d="M48 39 H85" className="ri-output-axis"/>
    </>:kind===1?<>
      <path d="M24 5 C8 2 3 16 6 29 C9 40 19 42 24 37 L25 9 L27 38 C40 41 46 31 44 19 C42 8 34 3 27 5 Z" className="ri-output-brain"/>
      <ellipse cx="16" cy="21" rx="5" ry="7" className="ri-output-hotspot"/>
      <ellipse cx="35" cy="27" rx="5" ry="4" className="ri-output-hotspot"/>
      <path d="M52 34 C58 35 58 14 65 16 S72 33 78 24 S84 13 88 18" className="ri-output-response" pathLength="1"/>
    </>:<>
      <rect x="7" y="15" width="24" height="20" rx="4" className="ri-output-transfer-source"/>
      {[0,1,2].map(i=><g key={i}><path d={`M31 25 Q47 25 60 ${10+i*15}`} className="ri-output-transfer-edge"/><rect x="61" y={4+i*15} width="21" height="11" rx="3" className="ri-output-transfer-target" style={{animationDelay:`${i*.35}s`}}/></g>)}
      <path d="M13 24 h4 l3 -4 5 8" className="ri-output-line"/>
    </>}
  </svg>;
}

// Models learn shared representations, then support multiple downstream uses.
function CompModelPanel() {
  const [source,setSource]=useState(0),[task,setTask]=useState(0),[run,setRun]=useState(0);
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const timer=setInterval(()=>{setSource(v=>(v+1)%2);setTask(v=>(v+1)%3);},6667);
    return()=>clearInterval(timer);
  },[run]);
  const outputs=['Neural decoding','Brain response prediction','Cross-task transfer'];
  const detail=['Predict cognitive information from neural representations.','Predict neural responses to multimodal context.','Adapt shared representations to a new task.'];
  const selectSource=(i:number)=>{setSource(i);setRun(n=>n+1);};
  const selectTask=(i:number)=>{setTask(i);setRun(n=>n+1);};
  return <div className={`ri-model-scene ri-model-source--${source} ri-model-task--${task}`}>

    <div className="ri-model-title-row"><div className="ri-diagram-heading">Model neural dynamics &amp; learn representations</div></div>
    <div className="ri-model-input-row">
      <button type="button" className={`ri-model-source${source===0?' is-selected':''}`} aria-pressed={source===0} onClick={()=>selectSource(0)}><strong>Neuroimaging modalities</strong><NeuralInputGlyph /><small>Time series + brain volumes</small></button>
      <span className="ri-model-plus">+</span>
      <button type="button" className={`ri-model-source${source===1?' is-selected':''}`} aria-pressed={source===1} onClick={()=>selectSource(1)}><strong>Multimodal context</strong><MultimodalContextGlyph /><small>Language · vision · audio</small></button>
    </div>
    <div className="ri-model-flow" aria-hidden="true"><span/></div>
    <div className="ri-model-core" key={`core-${run}`}>
      <div className="ri-computational-unit">
        <strong>Computational model</strong>
        <svg viewBox="0 0 140 65" className="ri-model-fit" aria-hidden="true">
          <path d="M6 7 V56 H136" className="ri-fit-axis"/>
          <path d="M8 46 C23 51 25 16 42 22 S64 48 81 33 S105 9 134 17" className="ri-fit-prediction" pathLength="1"/>
          {[[12,46],[26,35],[42,24],[58,34],[76,38],[94,22],[112,15],[130,19]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" className="ri-fit-observation"/>)}
        </svg>
        <small>Fit · simulate · predict</small>
      </div>
      <div className="ri-foundation-unit">
        <strong>Foundation model</strong>
        <svg viewBox="0 0 160 65" className="ri-model-layers" aria-hidden="true">
          {[0,1,2].map(layer=><g key={layer} className="ri-model-layer" style={{animationDelay:`${layer*.4}s`}}>{Array.from({length:5},(_,i)=><g key={i}>{layer<2&&<path d={`M${22+i*29} ${13+layer*20} L${22+((i+2)%5)*29} ${33+layer*20}`}/>}<rect x={16+i*29} y={6+layer*20} width="12" height="9" rx="2"/></g>)}</g>)}
        </svg>
        <small>Pretrain · align · transfer</small>
      </div>
    </div>
    <div className="ri-model-flow" aria-hidden="true"><span/></div>
    <div className="ri-model-latent" key={`latent-${run}`}><span>Shared latent space</span><div>{Array.from({length:16},(_,i)=><i key={i} style={{'--latent-i':i,background:`hsl(${220+i*5} 65% ${45+(i*13)%30}%)`} as CSSProperties}/>)}</div></div>
    <svg className="ri-model-branches" viewBox="0 0 300 28"><path d="M150 0 V12 M50 28 V12 H250 V28 M150 12 V28"/></svg>
    <div className="ri-model-outputs">{outputs.map((label,i)=><button key={label} type="button" aria-pressed={task===i} className={task===i?'is-selected':''} onClick={()=>selectTask(i)}><OutputGlyph kind={i}/><span>{label}</span></button>)}</div>
    <p className="ri-model-task-detail" key={`detail-${run}`}>{detail[task]}</p>
  </div>;
}

// ── Mode 0: Neural signal panel for decoding phase ────────────────────────
function NeuralDecodePanel() {
  return (
    <div className="ri-enc-col" aria-hidden="true">
      <div className="ri-enc-dir-label">← decoding</div>
      <span className="ri-signal-label">Neural Signal</span>
      <EEGPanel />
      <span className="ri-paradigm-hint">neural readout</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export function ResearchInterestsBrain() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [selectedNetwork,setSelectedNetwork]=useState<number|null>(null);
  const [hoveredNetwork,setHoveredNetwork]=useState<number|null>(null);
  const focusedNetwork=hoveredNetwork??selectedNetwork;
  const networkFocusRef=useRef<number|null>(null);
  networkFocusRef.current=focusedNetwork;
  const networkInteraction:NetworkInteraction={focused:focusedNetwork,selected:selectedNetwork,onHover:setHoveredNetwork,onSelect:i=>{setHoveredNetwork(null);setSelectedNetwork(prev=>i===null||prev===i?null:i);}};
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stimIdx, setStimIdx] = useState(0);
  const stimIdxRef = useRef(0);
  const [decTaskIdx, setDecTaskIdx] = useState(0);
  const decTaskIdxRef = useRef(0);

  const hovering = useRef(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const pendingSelectionAnchor=useRef<{element:HTMLButtonElement;top:number}|null>(null);
  const hoverTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const autoRotateTimer=useRef<ReturnType<typeof setInterval>|null>(null);
  const cancelHover=()=>{
    if(hoverTimer.current!==null)clearTimeout(hoverTimer.current);
    hoverTimer.current=null;
  };
  const startAutoRotate=()=>{
    if(autoRotateTimer.current!==null)clearInterval(autoRotateTimer.current);
    autoRotateTimer.current=setInterval(()=>{
      if(hovering.current||pausedRef.current)return;
      const next=(activeRef.current+1)%INTERESTS.length;
      activeRef.current=next;
      setActive(next);
      setHoveredNetwork(null);
    },20000);
  };
  const activate = (i:number,button:HTMLButtonElement) => {
    cancelHover();
    if(activeRef.current===i)return;
    pendingSelectionAnchor.current={element:button,top:button.getBoundingClientRect().top};
    setHoveredNetwork(null);
    activeRef.current=i;
    setActive(i);
    startAutoRotate();
  };
  useLayoutEffect(()=>{
    const anchor=pendingSelectionAnchor.current;
    pendingSelectionAnchor.current=null;
    if(!anchor?.element.isConnected)return;
    const delta=anchor.element.getBoundingClientRect().top-anchor.top;
    if(Math.abs(delta)>.5)window.scrollBy({top:delta,behavior:'instant'});
  },[active]);
  useEffect(()=>()=>{if(hoverTimer.current!==null)clearTimeout(hoverTimer.current);},[]);

  // Auto-rotate through interests every 20 s; pause while the user hovers or presses pause
  useEffect(() => {
    startAutoRotate();
    return () => { if (autoRotateTimer.current !== null) clearInterval(autoRotateTimer.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cycle stimulus idx while mode 0 is active (5 s per stimulus → all 4 complete in 20 s)
  // Reset to 0 on every mode-0 entry so encoding always starts from the first stimulus
  useEffect(() => {
    if (active !== 0) return;
    stimIdxRef.current = 0;
    setStimIdx(0);
    const timer = setInterval(() => {
      const next = (stimIdxRef.current + 1) % ENC_STIM_DATA.length;
      stimIdxRef.current = next;
      setStimIdx(next);
    }, ENCODE_DECODE_STEP_MS);
    return () => clearInterval(timer);
  }, [active]);

  // Cycle decoding task list while mode 0 is active (5 s per task → all 4 complete in 20 s, in sync with encoding)
  useEffect(() => {
    if (active !== 0) return;
    decTaskIdxRef.current = 0;
    setDecTaskIdx(0);
    const timer = setInterval(() => {
      const next = (decTaskIdxRef.current + 1) % DEC_TASKS.length;
      decTaskIdxRef.current = next;
      setDecTaskIdx(next);
    }, ENCODE_DECODE_STEP_MS);
    return () => clearInterval(timer);
  }, [active]);

  useEffect(() => {
    let rafId = 0, disposed = false;

    function init() {
      if (disposed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
      if (!gl) return;

      let elapsed = 0, last = 0, lastDraw = 0;
      let userAngle = 0, velocity = 0, lastPointerX: number | null = null;

      function mkShader(type: number, src: string) {
        const s = gl!.createShader(type)!; gl!.shaderSource(s, src); gl!.compileShader(s); return s;
      }
      function decode(s: string, Ctor: typeof Float32Array | typeof Uint16Array) {
        return new Ctor(Uint8Array.from(atob(s), c => c.charCodeAt(0)).buffer);
      }

      const prog = gl.createProgram()!;
      gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(prog); gl.useProgram(prog);

      const aPos = gl.getAttribLocation(prog, 'position');
      const aNorm = gl.getAttribLocation(prog, 'normal');
      const uAngle = gl.getUniformLocation(prog, 'angle');
      const uTilt = gl.getUniformLocation(prog, 'tilt');
      const uAspect = gl.getUniformLocation(prog, 'aspect');
      const uTime = gl.getUniformLocation(prog, 'time');
      const uMode = gl.getUniformLocation(prog, 'mode');
      const uStimIdx = gl.getUniformLocation(prog, 'stimIdx');
      const uNetworkFocus=gl.getUniformLocation(prog,'networkFocus');
      const uEncColors=[0,1,2].map(i=>gl.getUniformLocation(prog,`encColor${i}`));
      const uEncWeights=gl.getUniformLocation(prog,'encWeights');
      const encodingPalettes=ENC_STIM_DATA.map(stim=>stim.nets.map(net=>
        new Float32Array([1,3,5].map(offset=>parseInt(net.color.slice(offset,offset+2),16)/255))));

      const geo = window.meshes.map(m => {
        const pb = gl.createBuffer()!, nb = gl.createBuffer()!, ib = gl.createBuffer()!;
        const idx = decode(m.i, Uint16Array) as Uint16Array;
        gl.bindBuffer(gl.ARRAY_BUFFER, pb); gl.bufferData(gl.ARRAY_BUFFER, decode(m.p, Float32Array), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, nb); gl.bufferData(gl.ARRAY_BUFFER, decode(m.n, Float32Array), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib); gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
        return { pb, nb, ib, count: idx.length };
      });

      gl.enable(gl.DEPTH_TEST); gl.clearColor(0, 0, 0, 0);

      function draw() {
        if (activeRef.current === 3) return;
        const r = canvas!.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio || 1, 2);
        const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
        if (canvas!.width !== w || canvas!.height !== h) { canvas!.width = w; canvas!.height = h; }
        gl!.viewport(0, 0, w, h);
        gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);
        gl!.uniform1f(uAngle, activeRef.current === 1 ? Math.PI / 2 : activeRef.current === 2
          ? 0.38
          : 0.38 + userAngle - elapsed * 0.065 + Math.sin(elapsed * 0.22) * 0.08);
        gl!.uniform1f(uTilt, -0.18);
        gl!.uniform1f(uAspect, w / h);
        gl!.uniform1f(uTime, elapsed);
        const effectiveMode = activeRef.current === 0
          ? 5.0
          : activeRef.current === 1 ? 6.0 : activeRef.current;
        gl!.uniform1f(uMode, effectiveMode);
        gl!.uniform1f(uStimIdx, stimIdxRef.current);
        gl!.uniform1f(uNetworkFocus,networkFocusRef.current??-1);
        const currentStim=stimIdxRef.current;
        uEncColors.forEach((uniform,i)=>gl!.uniform3fv(uniform,encodingPalettes[currentStim][i]));
        gl!.uniform3f(uEncWeights,...ENC_STIM_DATA[currentStim].nets.map(net=>net.w) as [number,number,number]);
        for (const m of geo) {
          gl!.bindBuffer(gl!.ARRAY_BUFFER, m.pb); gl!.enableVertexAttribArray(aPos); gl!.vertexAttribPointer(aPos, 3, gl!.FLOAT, false, 0, 0);
          gl!.bindBuffer(gl!.ARRAY_BUFFER, m.nb); gl!.enableVertexAttribArray(aNorm); gl!.vertexAttribPointer(aNorm, 3, gl!.FLOAT, false, 0, 0);
          gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, m.ib); gl!.drawElements(gl!.TRIANGLES, m.count, gl!.UNSIGNED_SHORT, 0);
        }
      }

      function frame(stamp: number) {
        if (disposed) return;
        if (last && !document.hidden) elapsed += Math.min((stamp - last) / 1000, 0.1);
        last = stamp;
        if (lastPointerX === null && Math.abs(velocity) > 0.0002) { userAngle += velocity; velocity *= 0.90; }
        if (stamp - lastDraw > 33 && !document.hidden) { draw(); lastDraw = stamp; }
        rafId = requestAnimationFrame(frame);
      }

      const onMove = (e: PointerEvent) => {
        if (lastPointerX !== null) {
          const r = canvas!.getBoundingClientRect();
          userAngle += (e.clientX - lastPointerX) / r.width * 2.5;
          velocity = (e.clientX - lastPointerX) / r.width * 2.5;
        }
        lastPointerX = e.clientX;
      };
      const onLeave = () => { lastPointerX = null; };
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
      const ro = new ResizeObserver(() => {});
      ro.observe(canvas);
      rafId = requestAnimationFrame(frame);
      (canvas as any)._dispose = () => {
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerleave', onLeave);
        ro.disconnect();
      };
    }

    function tryInit() {
      if (window.meshes) { init(); return; }
      const existing = document.querySelector('script[src="/mesh-data.js"]');
      if (existing) { existing.addEventListener('load', () => init(), { once: true }); }
      else { const s = document.createElement('script'); s.src = '/mesh-data.js'; s.onload = () => init(); document.head.appendChild(s); }
    }
    tryInit();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      const c = canvasRef.current;
      if (c && (c as any)._dispose) (c as any)._dispose();
    };
  }, []);

  const cur = INTERESTS[active];

  return (
    <div className={`ri-layout ri-layout--mode${active}`} onMouseEnter={() => { hovering.current = true; }} onMouseLeave={() => { hovering.current = false; }}>
      {/* Visualization panel — brain canvas ALWAYS inside ri-viz-main to preserve WebGL context */}
      <div className={`ri-viz-panel ri-viz--mode${active}`} data-network-focus={focusedNetwork??'all'} style={{'--stim-color':ENC_STIM_DATA[stimIdx].color} as CSSProperties}>
        <div className="ri-viz-main" id="research-interest-visualization">
          {active === 0 && <>
            <div className="ri-flow-heading ri-flow-heading--encoding">Brain Encoding</div>
            <div className="ri-flow-heading ri-flow-heading--decoding">Brain Decoding</div>
            <span className="ri-encoding-arrow" aria-hidden="true">→</span>
            <span className="ri-encoding-arrow ri-encoding-arrow--response" aria-hidden="true">→</span>
          </>}
          {/* Encoding runs left to right in the upper row; the brain stays mounted. */}
          {active === 0 && <EncodingStimPanel stimIdx={stimIdx} onSelect={i=>{stimIdxRef.current=i;setStimIdx(i);}} />}
          {active === 0 && <EncodingNetworkBars stimIdx={stimIdx} />}

          {active === 1 && <><div className="ri-network-title ri-diagram-heading"><span>Brain activity &amp; network dynamics</span></div><NetworkGraph {...networkInteraction} /></>}
          {active === 2 && <NeuromodDevicePanel />}

          <div className="ri-brain-wrap">
            <canvas
              ref={canvasRef}
              className="ri-canvas"
              role="img"
              aria-label="Brain activity visualization"
            />
            {active === 0 && <span className="ri-brain-response-label">Evoked brain activity</span>}
            {active === 1 && <BrainNetworkOverlay />}
            {active === 2 && <NeuromodOverlay />}
          </div>


          {active === 1 && <NetworkLegend {...networkInteraction} />}

          {/* Decoding runs left to right in the lower row. */}
          {active === 0 && (
            <div className="ri-mode0-dec-row">
              <NeuralDecodePanel />
              <span className="ri-dec-down" aria-hidden="true">→</span>
              <DecodingCol taskIdx={decTaskIdx} />
            </div>
          )}
          {active === 2 && <NeuromodBeforeAfter />}
          {active === 3 && <CompModelPanel />}
        </div>

        <span className={`ri-mode-tag ${cur.tagClass}`}>
          {active === 0 ? 'Encode & Decode'
            : active === 1 ? 'Brain dynamics & networks'
            : active === 3 ? 'Computational modeling'
            : cur.tag}
        </span>
      </div>

      <div className="ri-cards-col" data-paused={paused ? 'true' : undefined}>
        <button
          type="button"
          className={`ri-autoplay-btn${paused ? ' ri-autoplay-btn--paused' : ''}`}
          aria-label={paused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
          onClick={() => {
            const next = !pausedRef.current;
            pausedRef.current = next;
            setPaused(next);
          }}
        >
          {paused ? '▶' : '⏸'}
        </button>
        {INTERESTS.map((item, i) => (
          <button
            key={item.title}
            className={`ri-card${active === i ? ' ri-card--active' : ''}`}
            aria-pressed={active===i}
            aria-controls="research-interest-visualization"
            onPointerEnter={e=>{
              if(e.pointerType!=='mouse'||activeRef.current===i)return;
              cancelHover();
              const button=e.currentTarget;
              hoverTimer.current=setTimeout(()=>activate(i,button),140);
            }}
            onPointerLeave={cancelHover}
            onClick={e=>activate(i,e.currentTarget)}
          >
            <span className="ri-card-num">0{i + 1}</span>
            <div className="ri-card-body">
              <h3 className="ri-card-title">{item.title}</h3>
              <p className="ri-card-question">{item.question}</p>
              <p className="ri-card-desc" hidden={active !== i}>{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
