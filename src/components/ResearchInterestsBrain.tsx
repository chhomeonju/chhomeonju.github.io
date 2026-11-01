import { CSSProperties, useEffect, useRef, useState } from 'react';

declare global {
  interface Window { meshes: Array<{ p: string; n: string; i: string }> }
}

const INTERESTS = [
  {
    title: 'Neural Encoding & Decoding',
    description: 'Exploring how cognitive information is represented in neural activity and decoded using deep learning across neural measurement modalities, including EEG, ECoG, and fMRI.',
    tag: 'Decoding', tagClass: 'ri-tag--decode',
  },
  {
    title: 'Brain Dynamics & Network Neuroscience',
    description: 'Characterizing dynamic functional connectivity, latent brain states, and network reconfiguration to understand the temporal organization and interactions of distributed brain networks.',
    tag: 'Network', tagClass: 'ri-tag--net',
  },
  {
    title: 'Neural Mechanisms & Neuromodulation',
    description: 'Investigating how neural activity and brain network interactions support cognition, emotion, and behavior, and how neuromodulation influences brain dynamics and mental health.',
    tag: 'Mechanisms', tagClass: 'ri-tag--mech',
  },
  {
    title: 'Computational Modeling & Foundation Models',
    description: 'Leveraging computational approaches, including deep learning, large language models, and multimodal foundation models, to model neural representations, predict brain responses, and uncover the mechanisms underlying human brain function.',
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
uniform float time; uniform float mode; uniform float stimIdx;
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
void main(){
 vec3 n=normalize(shadingNormal);
 float light=max(dot(n,normalize(vec3(-.6,.9,1.4))),0.);
 float side=max(dot(n,normalize(vec3(.7,-.1,.5))),0.);
 /* Darker base gives activations more visual contrast */
 vec3 base=vec3(.72,.76,.82)*(.60+.28*light+.12*side);
 float activity; vec3 highlight;
 if(mode<0.5){
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
  /* Network: stimulus-driven, network-weight-based regional glow.
     Each RSN painted at its canonical anatomical location.
     Activation = network weight × spatial glow → same as StimulusPanel bars.
     Sources: Menon 2011 (Nat Rev Neurosci), Power et al. 2011 (Neuron),
     Yeo et al. 2011 (J Neurophysiol), Vigneau 2006 (NeuroImage). */
  float pulse=0.82+0.18*sin(time*0.90);

  /* ── Compute each network's spatial glow at canonical anatomical loci ──
     sigma=0.16-0.18 gives a clearly visible blob spanning ~1/3 of brain width.
     foci in brain-mesh coords (empirically calibrated from Broca/Wernicke/SMA). */
  /* DMN: medial PFC + PCC + bilateral inferior parietal lobule */
  float gDmn=max(max(glow(vec3(.00,.30,.16),.18),glow(vec3(.00,-.18,.42),.17)),
                 max(glow(vec3(-.36,.06,.36),.14),glow(vec3(.36,.06,.36),.14)));
  /* FPN-L: L dlPFC (lateral prefrontal) + L IPS/IPL */
  float gFpnl=max(glow(vec3(-.40,.28,.20),.16),glow(vec3(-.42,.14,.36),.14));
  /* FPN-R: R dlPFC + R IPS/IPL */
  float gFpnr=max(glow(vec3(.40,.28,.20),.16),glow(vec3(.42,.14,.36),.14));
  /* LAN: L IFG Broca BA44/45 + L posterior STG Wernicke BA22 */
  float gLan=max(glow(vec3(-.44,.16,.30),.16),glow(vec3(-.48,-.18,.42),.16));
  /* SAN: bilateral anterior insula + bilateral amygdala + dACC */
  float gSan=max(max(glow(vec3(-.36,.12,.22),.15),glow(vec3(.36,.12,.22),.15)),
                 max(glow(vec3(-.26,-.04,.26),.13),glow(vec3(.00,.22,.20),.14)));
  /* SMN: bilateral S1/M1 strip + pre-SMA (superior convexity) */
  float gSmn=max(max(glow(vec3(-.30,.30,.18),.15),glow(vec3(.30,.30,.18),.15)),
                 glow(vec3(.00,.40,.14),.15));
  /* VIS: lateral occipital-temporal cortex (MT/hMT+, LO) on surface (y>0) +
     inferior temporal (z low) — positive y puts these on the visible lateral surface */
  float gVis=max(max(glow(vec3(-.44,.10,.08),.18),glow(vec3(.44,.10,.08),.18)),
                 max(glow(vec3(-.38,.08,-.06),.17),glow(vec3(.38,.08,-.06),.17)));

  /* ── Stimulus-specific weights (match STIMULI[] array in JS: 0=Image, 1=Audio, 2=Video, 3=Text) ── */
  float wDmn,wFpnl,wFpnr,wLan,wSan,wSmn,wVis;
  if(stimIdx<0.5){
   /* Image: VIS>FPNr>SAN>FPNl>SMN>DMN>LAN */
   wVis=1.0;wSan=0.72;wFpnr=0.78;wFpnl=0.38;wSmn=0.18;wDmn=0.10;wLan=0.07;
  }else if(stimIdx<1.5){
   /* Audio: LAN>FPNl>DMN>SMN>FPNr>SAN>VIS */
   wLan=1.0;wFpnl=0.88;wDmn=0.65;wSmn=0.42;wSan=0.20;wFpnr=0.22;wVis=0.06;
  }else if(stimIdx<2.5){
   /* Video: SAN>VIS>DMN>FPNl>FPNr>LAN>SMN */
   wSan=1.0;wVis=0.88;wDmn=0.72;wFpnl=0.55;wFpnr=0.48;wLan=0.30;wSmn=0.22;
  }else{
   /* Text: LAN>DMN>FPNl>FPNr>SAN>VIS>SMN */
   wLan=1.0;wDmn=0.85;wFpnl=0.78;wFpnr=0.35;wSan=0.18;wVis=0.12;wSmn=0.08;
  }

  /* ── Weighted sum → total regional activation ── */
  float aNet=gDmn*wDmn+gFpnl*wFpnl+gFpnr*wFpnr+gLan*wLan+gSan*wSan+gSmn*wSmn+gVis*wVis;
  /* Amplify: 2.5× boost + power curve → even moderate glow produces vivid color
     pow(x,0.60): 0.1→0.22, 0.2→0.38, 0.4→0.60, 0.6→0.74, 1.0→1.0 */
  float aBoosted=clamp(aNet*2.5,0.,1.);
  activity=pow(aBoosted,.60)*pulse;

  /* ── Blend network colors proportionally (spatially coherent hue map) ── */
  vec3 cDmn=vec3(1.00,.18,.22);  /* DMN: vivid red */
  vec3 cFpn=vec3(.22,.60,.98);   /* FPN: vivid blue */
  vec3 cLan=vec3(1.00,.52,.00);  /* LAN: vivid orange */
  vec3 cSan=vec3(1.00,.65,.12);  /* SAN: vivid amber */
  vec3 cSmn=vec3(.12,.82,.38);   /* SMN: vivid green */
  vec3 cVis=vec3(.68,.18,1.00);  /* VIS: vivid purple */
  float tw=max(aNet,.001);
  highlight=( cDmn*(gDmn*wDmn)+cFpn*(gFpnl*wFpnl+gFpnr*wFpnr)+
              cLan*(gLan*wLan)+cSan*(gSan*wSan)+
              cSmn*(gSmn*wSmn)+cVis*(gVis*wVis) )/tw;
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

// ── Mode 1: Language token overlay ────────────────────────────────────────
const LANG_TOKENS = [
  { word: 'speech',   x: 74, y: 16, delay: '0s' },
  { word: 'imagined', x: 79, y: 33, delay: '.35s' },
  { word: 'semantic', x: 76, y: 52, delay: '.7s' },
  { word: 'neural',   x: 78, y: 68, delay: '1.1s' },
  { word: 'language', x: 72, y: 83, delay: '.2s' },
];

function LanguageOverlay() {
  return (
    <svg className="ri-net-overlay ri-lang-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {LANG_TOKENS.map(({ word, x, y, delay }) => (
        <g key={word} style={{ '--ld': delay } as CSSProperties} className="ri-lang-token">
          <line x1={54} y1={50} x2={x + word.length * 1.2} y2={y}
            stroke="rgba(140,70,210,.22)" strokeWidth="0.35" strokeDasharray="2 2" />
          <rect x={x - 1} y={y - 3.5} width={word.length * 2.55 + 2} height={7} rx={1.5}
            fill="rgba(109,40,217,.13)" stroke="rgba(109,40,217,.40)" strokeWidth="0.35" />
          <text x={x + (word.length*2.55/2)} y={y+1.5} textAnchor="middle"
            fontSize="4.2" fill="rgba(167,139,250,1)" fontFamily="system-ui,sans-serif" fontWeight="600">
            {word}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Mode 2: Connectome with real resting-state networks ────────────────────
// Positions in 360×310 space; brain center (180,155), visible radius ~70px
// All nodes ON the brain surface — connections traverse through the brain
const NETS = [
  { id:'dmn',  label:'DMN',   color:'#e63946', x:180, y: 70 }, // medial PFC / PCC — moved up
  { id:'fpnl', label:'FPN-L', color:'#4a90d9', x:110, y:108 }, // L lateral prefrontal (dlPFC)
  { id:'fpnr', label:'FPN-R', color:'#4a90d9', x:250, y:105 }, // R lateral prefrontal
  { id:'lan',  label:'LAN',   color:'#f77f00', x:96,  y:158 }, // L temporal: Broca/Wernicke
  { id:'san',  label:'SAN',   color:'#f4a261', x:262, y:152 }, // R fronto-insular (amygdala)
  { id:'smn',  label:'SMN',   color:'#2d9a4f', x:180, y:110 }, // sensorimotor / premotor — centered, below DMN
  { id:'vis',  label:'VIS',   color:'#7c3aed', x:210, y:218 }, // occipital (V1-V5)
];

// Stimulus types with scientifically grounded network activation weights
// Weights based on meta-analytic activation likelihood estimates
const STIMULI = [
  {
    label: 'Image',
    color: '#7c3aed',
    weights: { vis:1.0, san:0.72, fpnr:0.78, fpnl:0.38, smn:0.18, dmn:0.10, lan:0.07 } as Record<string,number>,
  },
  {
    label: 'Audio',
    color: '#f77f00',
    weights: { lan:1.0, fpnl:0.88, dmn:0.65, smn:0.42, san:0.20, fpnr:0.22, vis:0.06 } as Record<string,number>,
  },
  {
    label: 'Video',
    color: '#e63946',
    weights: { san:1.0, vis:0.88, dmn:0.72, fpnl:0.55, fpnr:0.48, lan:0.30, smn:0.22 } as Record<string,number>,
  },
  {
    label: 'Text',
    color: '#10b981',
    weights: { lan:1.0, dmn:0.85, fpnl:0.78, fpnr:0.35, san:0.18, vis:0.12, smn:0.08 } as Record<string,number>,
  },
];

// [fromIdx, toIdx, baseWeight, freqHz, phaseRad]
const FC: [number,number,number,number,number][] = [
  [0,1, .55,.7, 0.0], [0,2, .55,.7, 0.5],
  [0,3, .63,.6, 0.2], [0,4, .35,.8, 1.1],
  [1,2, .72,.5, 0.0], [1,3, .60,.8, 0.6],
  [1,4, .42,1.1,1.0], [1,5, .32,.7, 0.4],
  [2,4, .52,.9, 1.5], [2,6, .30,.7, 0.9],
  [3,5, .44,.9, 0.8], [4,6, .45,.7, 0.9],
  [5,6, .50,1.0,0.6], [3,4, .28,.6, 1.4],
];

interface Pulse { ei: number; prog: number; spd: number; }

function ConnectomeCanvas({ stimIdx }: { stimIdx: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const stimIdxRef = useRef(stimIdx);
  useEffect(() => { stimIdxRef.current = stimIdx; }, [stimIdx]);

  useEffect(() => {
    let raf = 0, t = 0;
    const pulses: Pulse[] = FC.map((_, ei) => ({
      ei, prog: Math.random(), spd: 0.003 + Math.random() * 0.004,
    }));

    function fcVal(ei: number, t: number): number {
      const [,,base,freq,phase] = FC[ei];
      return Math.max(0, Math.min(1, base + 0.28*Math.sin(2*Math.PI*freq*t + phase)));
    }

    function draw() {
      const cv = ref.current; if (!cv) return;
      const ctx = cv.getContext('2d'); if (!ctx) return;
      const W = cv.width, H = cv.height;
      ctx.clearRect(0,0,W,H);
      const scx = W/360, scy = H/310;
      const nx = (x:number) => x*scx;
      const ny = (y:number) => y*scy;

      const wt = STIMULI[stimIdxRef.current].weights;

      // Edges modulated by stimulus-specific network activation
      FC.forEach(([fi,ti], ei) => {
        const from = NETS[fi], to = NETS[ti];
        const edgeW = ((wt[from.id] ?? 0.05) + (wt[to.id] ?? 0.05)) / 2;
        const fc = fcVal(ei, t) * edgeW;
        if (fc < 0.06) return;
        ctx.globalAlpha = Math.min(0.92, fc * 0.88);
        ctx.strokeStyle = from.color;
        ctx.lineWidth = 0.5 + fc * 4.5;
        ctx.shadowColor = from.color;
        ctx.shadowBlur = fc * 12;
        ctx.beginPath();
        ctx.moveTo(nx(from.x), ny(from.y));
        ctx.lineTo(nx(to.x), ny(to.y));
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      // Traveling pulses — rate proportional to edge activation weight
      for (const p of pulses) {
        const [fi,ti] = FC[p.ei];
        const edgeW = ((wt[NETS[fi].id] ?? 0.1) + (wt[NETS[ti].id] ?? 0.1)) / 2;
        p.prog += p.spd * (0.3 + edgeW * 1.2);
        if (p.prog > 1) {
          p.prog = 0;
          p.ei = Math.floor(Math.random()*FC.length);
          p.spd = 0.003+Math.random()*0.004;
        }
        const fc = fcVal(p.ei, t) * edgeW;
        if (fc < 0.12) continue;
        const from = NETS[fi], to = NETS[ti];
        const px = nx(from.x) + (nx(to.x)-nx(from.x))*p.prog;
        const py = ny(from.y) + (ny(to.y)-ny(from.y))*p.prog;
        ctx.globalAlpha = Math.sin(p.prog*Math.PI)*fc*0.92;
        ctx.fillStyle = from.color;
        ctx.shadowColor = from.color;
        ctx.shadowBlur = 9;
        ctx.beginPath(); ctx.arc(px, py, 2.5 + edgeW, 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
      while (pulses.length < 22) {
        pulses.push({ ei: Math.floor(Math.random()*FC.length), prog: 0, spd: 0.003+Math.random()*0.004 });
      }

      // Network nodes — size and brightness scale with activation weight
      NETS.forEach((net, i) => {
        const x = nx(net.x), y = ny(net.y);
        const aw = wt[net.id] ?? 0.05;
        const pulse = 0.5+0.5*Math.sin(t*(1.1+aw*0.7) + i*0.9);
        const scale = 0.28 + aw * 1.3;   // wider range: quiet=0.28, full=1.58

        // outer halo — more pronounced for highly active nodes
        ctx.globalAlpha = Math.min(0.55, (0.12 + 0.20*pulse) * (0.4 + aw));
        ctx.fillStyle = net.color;
        ctx.beginPath(); ctx.arc(x, y, (8+4*pulse)*scale, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;

        // core node
        ctx.shadowColor = net.color; ctx.shadowBlur = 4 + 16*aw;
        ctx.fillStyle = net.color;
        ctx.globalAlpha = Math.min(1, 0.35 + 0.65*aw);
        ctx.beginPath(); ctx.arc(x, y, Math.max(2, 5*scale), 0, Math.PI*2); ctx.fill();
        ctx.shadowBlur = 0; ctx.globalAlpha = 1;

        // label pill — for all networks with activation ≥0.10
        if (aw < 0.10) return;
        const pillW = net.label.length * 5.2 + 5;
        ctx.fillStyle = `rgba(8,12,22,${0.60 + 0.32*aw})`;
        const lx = x-pillW/2, ly = y + Math.max(6, 7*scale);
        ctx.beginPath();
        ctx.moveTo(lx+3,ly); ctx.lineTo(lx+pillW-3,ly);
        ctx.quadraticCurveTo(lx+pillW,ly,lx+pillW,ly+3);
        ctx.lineTo(lx+pillW,ly+10); ctx.quadraticCurveTo(lx+pillW,ly+13,lx+pillW-3,ly+13);
        ctx.lineTo(lx+3,ly+13); ctx.quadraticCurveTo(lx,ly+13,lx,ly+10);
        ctx.lineTo(lx,ly+3); ctx.quadraticCurveTo(lx,ly,lx+3,ly); ctx.closePath();
        ctx.fill();
        ctx.fillStyle = net.color;
        ctx.font = `bold ${Math.round(7.5+aw*2.5)}px system-ui,sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.globalAlpha = Math.min(1, 0.50 + 0.50*aw);
        ctx.fillText(net.label, x, ly+6.5);
        ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
        ctx.globalAlpha = 1;
      });

      t += 0.016;
    }

    function loop() { draw(); raf = requestAnimationFrame(loop); }
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas ref={ref} width={280} height={240} className="ri-connectome-canvas" aria-hidden="true" />
  );
}

// ── Mode 0: Encoding column (multi-modal stimuli → neural response) ──────
const ENC_STIMS = [
  {
    label: 'Visual',
    color: '#7c3aed',
    icon: (
      <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden="true">
        <rect x="1" y="1" width="26" height="18" rx="3" fill="rgba(124,58,237,.12)" stroke="rgba(124,58,237,.55)" strokeWidth="0.8"/>
        <circle cx="10" cy="10" r="4.5" fill="rgba(124,58,237,.22)" stroke="rgba(124,58,237,.55)" strokeWidth="0.8"/>
        <circle cx="10" cy="10" r="2" fill="rgba(124,58,237,.70)"/>
        <rect x="17" y="5" width="7" height="4" rx="1" fill="rgba(124,58,237,.35)"/>
        <rect x="17" y="11" width="5" height="4" rx="1" fill="rgba(124,58,237,.22)"/>
      </svg>
    ),
  },
  {
    label: 'Audio',
    color: '#f77f00',
    icon: (
      <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden="true">
        <rect x="1" y="1" width="26" height="18" rx="3" fill="rgba(247,127,0,.10)" stroke="rgba(247,127,0,.50)" strokeWidth="0.8"/>
        {[3,5,8,6,4,7,5,3].map((h, i) => (
          <rect key={i} x={5 + i * 2.5} y={10 - h / 2} width="1.8" height={h}
            fill="rgba(247,127,0,.75)" rx="0.9"/>
        ))}
      </svg>
    ),
  },
  {
    label: 'Language',
    color: '#10b981',
    icon: (
      <svg viewBox="0 0 28 20" width="28" height="20" aria-hidden="true">
        <rect x="1" y="1" width="26" height="18" rx="3" fill="rgba(16,185,129,.10)" stroke="rgba(16,185,129,.50)" strokeWidth="0.8"/>
        <rect x="5" y="6" width="18" height="2" rx="1" fill="rgba(16,185,129,.65)"/>
        <rect x="5" y="10" width="14" height="2" rx="1" fill="rgba(16,185,129,.50)"/>
        <rect x="5" y="14" width="10" height="2" rx="1" fill="rgba(16,185,129,.35)"/>
      </svg>
    ),
  },
];

function EncodingCol() {
  return (
    <div className="ri-enc-col" aria-hidden="true">
      <div className="ri-enc-dir-label">encoding →</div>
      <div className="ri-enc-stims">
        {ENC_STIMS.map(s => (
          <div key={s.label} className="ri-enc-stim-row">
            {s.icon}
            <span className="ri-enc-stim-name" style={{ color: s.color }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="ri-enc-down">↓</div>
      <span className="ri-signal-label">EEG response</span>
      <EEGPanel />
      <span className="ri-paradigm-hint">neural activity recorded</span>
    </div>
  );
}

// ── Mode 0: Decoding column (neural signal → model → output) ─────────────
function DecodingCol() {
  return (
    <div className="ri-dec-col" aria-hidden="true">
      <div className="ri-dec-dir-label">← decoding</div>
      <div className="ri-dec-model">
        <span>Foundation</span>
        <span>Model</span>
      </div>
      <div className="ri-dec-down">↓</div>
      <div className="ri-dec-output">
        <span className="ri-decoded-word">imagined</span>
        <span className="ri-decoded-word">speech</span>
      </div>
    </div>
  );
}

// ── Mode 2: Neuromodulation overlay (tDCS/tACS electrodes + activation ramp) ──
function NeuromodOverlay() {
  return (
    <svg className="ri-net-overlay ri-neuromod-overlay" viewBox="0 0 100 100"
      preserveAspectRatio="none" aria-hidden="true">
      {/* tDCS anode pad — forehead / prefrontal */}
      <g className="ri-neuromod-electrode ri-neuromod-anode">
        <rect x="34" y="5" width="18" height="10" rx="2.5"
          fill="rgba(239,68,68,.18)" stroke="rgba(239,68,68,.75)" strokeWidth="0.8"/>
        <text x="43" y="12.2" textAnchor="middle" fontSize="4.5"
          fill="rgba(239,68,68,.90)" fontFamily="system-ui,sans-serif" fontWeight="700">+</text>
        {/* wire down */}
        <line x1="43" y1="15" x2="43" y2="22" stroke="rgba(239,68,68,.55)" strokeWidth="0.6" strokeDasharray="1.5 1"/>
      </g>
      {/* tDCS cathode pad — vertex/parietal */}
      <g className="ri-neuromod-electrode ri-neuromod-cathode">
        <rect x="60" y="8" width="18" height="10" rx="2.5"
          fill="rgba(59,130,246,.18)" stroke="rgba(59,130,246,.75)" strokeWidth="0.8"/>
        <text x="69" y="12.2" textAnchor="middle" fontSize="4.5"
          fill="rgba(59,130,246,.90)" fontFamily="system-ui,sans-serif" fontWeight="700">−</text>
        <line x1="69" y1="18" x2="69" y2="25" stroke="rgba(59,130,246,.55)" strokeWidth="0.6" strokeDasharray="1.5 1"/>
      </g>
      {/* Current flow arc between electrodes */}
      <path d="M43,22 Q56,18 69,25" fill="none"
        stroke="rgba(251,191,36,.50)" strokeWidth="0.7" strokeDasharray="2 1.5"
        className="ri-neuromod-current"/>
      {/* Activation halos — ramp up over time */}
      <circle cx="50" cy="52" r="12" className="ri-neuromod-halo ri-neuromod-halo--1"/>
      <circle cx="50" cy="52" r="20" className="ri-neuromod-halo ri-neuromod-halo--2"/>
      <circle cx="50" cy="52" r="28" className="ri-neuromod-halo ri-neuromod-halo--3"/>
      {/* Label */}
      <text x="50" y="92" textAnchor="middle" fontSize="4.2"
        fill="rgba(251,191,36,.78)" fontFamily="system-ui,sans-serif" fontWeight="700"
        letterSpacing="0.06em">tDCS / tACS</text>
    </svg>
  );
}

// ── Mode 1: TRIBE v2-inspired multimodal input panel ──────────────────────
// Inspired by Meta's TRIBE v2: predicts fMRI brain responses from multi-modal stimuli
const MODALITIES = [
  { label: 'Image', color: '#7c3aed' },
  { label: 'Audio', color: '#f77f00' },
  { label: 'Video', color: '#e63946' },
  { label: 'Text',  color: '#10b981' },
];

function TribeV2Panel({ stimIdx }: { stimIdx: number }) {
  const activeMod = stimIdx % MODALITIES.length;
  return (
    <div className="ri-tribe-panel" aria-hidden="true">
      <div className="ri-tribe-header">Brain Encoding Model</div>
      <div className="ri-tribe-sublabel">stimuli → predicted fMRI</div>
      <div className="ri-tribe-mods">
        {MODALITIES.map((m, i) => (
          <div key={m.label}
            className={`ri-tribe-mod${i === activeMod ? ' ri-tribe-mod--on' : ''}`}
            style={i === activeMod
              ? { background: m.color + '18', borderColor: m.color + '60' } as CSSProperties
              : {}}>
            <span className="ri-tribe-mod-label"
              style={i === activeMod ? { color: m.color } : {}}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
      <div className="ri-tribe-arrow"
        style={{ color: MODALITIES[activeMod].color }}>→</div>
    </div>
  );
}

// ── Mode 3: Computational pipeline (neural data → model → brain repr) ─────
const NEURAL_INPUTS = [
  { label: 'EEG', color: '#3b82f6' },
  { label: 'fMRI', color: '#06b6d4' },
];

function CompModelPanel() {
  return (
    <div className="ri-comp-panel" aria-hidden="true">
      <div className="ri-comp-header">Neural Data</div>
      <div className="ri-comp-inputs">
        {NEURAL_INPUTS.map(inp => (
          <div key={inp.label} className="ri-comp-input"
            style={{ borderColor: inp.color + '60', background: inp.color + '12' }}>
            <span className="ri-comp-input-label" style={{ color: inp.color }}>{inp.label}</span>
          </div>
        ))}
      </div>
      <div className="ri-comp-down" style={{ color: 'rgba(99,102,241,.60)' }}>↓</div>
      <div className="ri-comp-model">
        <span className="ri-comp-model-title">Foundation</span>
        <span className="ri-comp-model-title">Model</span>
        <div className="ri-comp-model-layers">
          {[1,2,3].map(i => (
            <div key={i} className="ri-comp-layer" style={{ opacity: 0.35 + i * 0.22 }}/>
          ))}
        </div>
      </div>
      <div className="ri-comp-down" style={{ color: 'rgba(99,102,241,.60)' }}>↓</div>
      <div className="ri-comp-arrow-label">→</div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export function ResearchInterestsBrain() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stimIdx, setStimIdx] = useState(0);
  const stimIdxRef = useRef(0);

  const activate = (i: number) => { activeRef.current = i; setActive(i); };

  // Cycle stimulus every 3.5s while mode 1 is active
  useEffect(() => {
    if (active !== 1) return;
    const timer = setInterval(() => {
      const next = (stimIdxRef.current + 1) % STIMULI.length;
      stimIdxRef.current = next;
      setStimIdx(next);
    }, 3500);
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
        const r = canvas!.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio || 1, 2);
        const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
        if (canvas!.width !== w || canvas!.height !== h) { canvas!.width = w; canvas!.height = h; }
        gl!.viewport(0, 0, w, h);
        gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);
        gl!.uniform1f(uAngle, 0.38 + userAngle - elapsed * 0.065 + Math.sin(elapsed * 0.22) * 0.08);
        gl!.uniform1f(uTilt, -0.18);
        gl!.uniform1f(uAspect, w / h);
        gl!.uniform1f(uTime, elapsed);
        gl!.uniform1f(uMode, activeRef.current);
        gl!.uniform1f(uStimIdx, stimIdxRef.current);
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
    <div className="ri-layout">
      {/* Visualization panel — brain canvas ALWAYS inside ri-viz-main to preserve WebGL context */}
      <div className={`ri-viz-panel ri-viz--mode${active}`}>
        <div className="ri-viz-main">
          {active === 0 && <EncodingCol />}

          {active === 1 && <TribeV2Panel stimIdx={stimIdx} />}

          <div className="ri-brain-wrap">
            <canvas
              ref={canvasRef}
              className="ri-canvas"
              role="img"
              aria-label="Brain activity visualization"
            />
            {active === 0 && <DecodingOverlay />}
            {active === 1 && <ConnectomeCanvas stimIdx={stimIdx} />}
            {active === 1 && (
              <svg className="ri-net-pulse-ring" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <circle cx="50" cy="50" r="46" className="ri-net-ring-static" style={{ stroke: STIMULI[stimIdx].color + '70' }} />
              </svg>
            )}
            {active === 2 && <NeuromodOverlay />}
          {active === 3 && <LanguageOverlay />}
          </div>

          {active === 0 && <DecodingCol />}
          {active === 3 && <CompModelPanel />}
        </div>

        <span className={`ri-mode-tag ${cur.tagClass}`}>
          {active === 1 ? `${STIMULI[stimIdx % STIMULI.length].label} Input`
            : active === 3 ? 'Neural Data → Model'
            : cur.tag}
        </span>
      </div>

      <div className="ri-cards-col">
        {INTERESTS.map((item, i) => (
          <button
            key={item.title}
            className={`ri-card${active === i ? ' ri-card--active' : ''}`}
            onMouseEnter={() => activate(i)}
            onClick={() => activate(i)}
          >
            <span className="ri-card-num">0{i + 1}</span>
            <div className="ri-card-body">
              <h3 className="ri-card-title">{item.title}</h3>
              <p className="ri-card-desc">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
