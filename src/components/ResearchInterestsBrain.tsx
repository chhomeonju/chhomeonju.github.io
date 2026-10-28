import { CSSProperties, useEffect, useRef, useState } from 'react';

declare global {
  interface Window { meshes: Array<{ p: string; n: string; i: string }> }
}

const INTERESTS = [
  {
    title: 'Neural Decoding & Representation Learning',
    description: 'Investigating how cognitive information is encoded in neural signals across EEG, ECoG, and fMRI — spanning classification, reconstruction, and learning representations that generalize across subjects, tasks, and recording modalities.',
    tag: 'Decoding', tagClass: 'ri-tag--decode',
  },
  {
    title: 'Brain–Language Modeling',
    description: 'Aligning neural representations with language semantics through self-supervised learning and cross-modal objectives, toward foundation models that bridge brain signals and natural language.',
    tag: 'Language', tagClass: 'ri-tag--lang',
  },
  {
    title: 'Brain Encoding & Network Dynamics',
    description: 'To understand how neural responses and dynamic interactions across brain networks give rise to human cognition, emotion, and behavior through advanced computational modeling approaches, such as multimodal and multi-scale foundation models.',
    tag: 'Network', tagClass: 'ri-tag--net',
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

  /* ── Stimulus-specific weights (match STIMULI[] array in JS: 0=Emotional, 1=Speech, 2=Visual) ── */
  float wDmn,wFpnl,wFpnr,wLan,wSan,wSmn,wVis;
  if(stimIdx<0.5){
   /* Emotional: SAN>DMN>FPNl>FPNr>LAN>SMN>VIS */
   wSan=1.0;wDmn=0.92;wFpnl=0.65;wFpnr=0.28;wLan=0.18;wSmn=0.10;wVis=0.08;
  }else if(stimIdx<1.5){
   /* Speech: LAN>FPNl>DMN>SMN>FPNr>SAN>VIS */
   wLan=1.0;wFpnl=0.88;wDmn=0.65;wSmn=0.42;wSan=0.20;wFpnr=0.22;wVis=0.06;
  }else{
   /* Visual: VIS>FPNr>SAN>FPNl>SMN>DMN>LAN */
   wVis=1.0;wSan=0.72;wFpnr=0.78;wFpnl=0.38;wSmn=0.18;wDmn=0.10;wLan=0.07;
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
    label: 'Emotional',
    sublabel: 'affective & social cognition',
    color: '#e63946',
    // Primary: SAN (amygdala-insula); DMN (vmPFC/mPFC social); FPN-L (emotion regulation)
    weights: { san:1.0, dmn:0.92, fpnl:0.65, fpnr:0.28, lan:0.18, smn:0.10, vis:0.08 } as Record<string,number>,
  },
  {
    label: 'Speech',
    sublabel: 'lexical-phonological processing',
    color: '#f77f00',
    // Primary: LAN (Broca BA44/45, Wernicke BA22); FPN-L (phonological WM); DMN (semantic)
    weights: { lan:1.0, fpnl:0.88, dmn:0.65, smn:0.42, san:0.20, fpnr:0.22, vis:0.06 } as Record<string,number>,
  },
  {
    label: 'Visual',
    sublabel: 'object / scene perception',
    color: '#7c3aed',
    // Primary: VIS (occipital-temporal stream); SAN (salience); FPN-R (dorsal attention)
    weights: { vis:1.0, san:0.72, fpnr:0.78, fpnl:0.38, smn:0.18, dmn:0.10, lan:0.07 } as Record<string,number>,
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

// ── Mode 2: Stimulus input panel ──────────────────────────────────────────────
function StimulusPanel({ stim }: { stim: typeof STIMULI[0] }) {
  // Networks with activation weight ≥ 0.4, sorted highest first
  const activeNets = [...NETS]
    .filter(n => (stim.weights[n.id] ?? 0) >= 0.4)
    .sort((a, b) => (stim.weights[b.id] ?? 0) - (stim.weights[a.id] ?? 0));
  return (
    <div className="ri-stim-panel" aria-hidden="true">
      <div className="ri-stim-header">INPUT STIMULUS</div>
      <div className="ri-stim-box" style={{ borderColor: stim.color + '80', background: stim.color + '14' }}>
        <div className="ri-stim-icon" style={{ color: stim.color }}>
          {stim.label === 'Visual' ? '👁' : stim.label === 'Speech' ? '🗣' : '💭'}
        </div>
        <div className="ri-stim-name" style={{ color: stim.color }}>{stim.label}</div>
        <div className="ri-stim-sub">{stim.sublabel}</div>
      </div>
      <div className="ri-stim-arrow" style={{ color: stim.color }}>↓</div>
      <div className="ri-stim-acts-label">Active Networks</div>
      <div className="ri-stim-nets">
        {activeNets.map(net => {
          const w = stim.weights[net.id] ?? 0;
          return (
            <div key={net.id} className="ri-stim-net">
              <span className="ri-stim-dot" style={{ background: net.color }} />
              <span className="ri-stim-net-label" style={{ color: net.color }}>{net.id.toUpperCase()}</span>
              <span className="ri-stim-bar-wrap">
                <span className="ri-stim-bar" style={{ width: `${w * 100}%`, background: net.color + 'cc' }} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Representation Learning diagram (mode 0 only) ─────────────────────────
const RL_INPUTS = [
  { l: 'EEG',  x: 52,  c: '#3b82f6' },
  { l: 'ECoG', x: 150, c: '#8b5cf6' },
  { l: 'fMRI', x: 248, c: '#06b6d4' },
];
const RL_TASKS = [
  { l: 'Decoding',   x: 52,  c: '#3b82f6' },
  { l: 'Generation', x: 150, c: '#10b981' },
  { l: 'Transfer',   x: 248, c: '#f59e0b' },
];

function RepLearningPanel() {
  return (
    <div className="ri-replearn" aria-hidden="true">
      <div className="ri-rl-header">Foundation Model · Representation Learning</div>
      <svg viewBox="0 0 300 88" className="ri-rl-svg" preserveAspectRatio="xMidYMid meet">
        {RL_INPUTS.map(({ l, x, c }) => (
          <g key={l}>
            <rect x={x-20} y={1} width={40} height={14} rx={3.5}
              fill="rgba(59,130,246,.10)" stroke={c} strokeWidth={0.85} strokeOpacity={0.5} />
            <text x={x} y={11} textAnchor="middle" fontSize={7} fill={c}
              fontFamily="system-ui,sans-serif" fontWeight={700}>{l}</text>
            <line x1={x} y1={15} x2={x} y2={22} stroke={c}
              strokeWidth={0.8} strokeOpacity={0.4} strokeDasharray="2 1.5" />
          </g>
        ))}
        <path d="M52,22 Q52,26 150,28 M150,22 L150,28 M248,22 Q248,26 150,28"
          stroke="rgba(99,102,241,.28)" strokeWidth={0.8} fill="none" strokeDasharray="2 1.5" />
        <rect x={55} y={26} width={190} height={18} rx={5}
          fill="rgba(79,70,229,.18)" stroke="rgba(99,102,241,.65)" strokeWidth={1} />
        <text x={150} y={38} textAnchor="middle" fontSize={8} fill="rgba(199,210,254,.95)"
          fontFamily="system-ui,sans-serif" fontWeight={700}>Foundation Encoder</text>
        <line x1={150} y1={44} x2={150} y2={50} stroke="rgba(99,102,241,.45)" strokeWidth={0.9} />
        <polygon points="146,50 154,50 150,54" fill="rgba(99,102,241,.45)" />
        <rect x={65} y={53} width={170} height={14} rx={4}
          fill="rgba(109,40,217,.14)" stroke="rgba(139,92,246,.52)" strokeWidth={0.85} />
        <text x={150} y={63} textAnchor="middle" fontSize={7} fill="rgba(196,181,253,.9)"
          fontFamily="system-ui,sans-serif" fontWeight={600}>Universal Representations z</text>
        <path d="M120,67 Q52,70 52,75 M150,67 L150,75 M180,67 Q248,70 248,75"
          stroke="rgba(139,92,246,.28)" strokeWidth={0.8} fill="none" strokeDasharray="2 1.5" />
        {RL_TASKS.map(({ l, x, c }) => (
          <g key={l}>
            <rect x={x-28} y={74} width={56} height={13} rx={3}
              fill={c + '18'} stroke={c} strokeWidth={0.8} strokeOpacity={0.45} />
            <text x={x} y={83} textAnchor="middle" fontSize={6.5} fill={c}
              fontFamily="system-ui,sans-serif" fontWeight={600} fillOpacity={0.88}>{l}</text>
          </g>
        ))}
      </svg>
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

  // Cycle stimulus every 3.5s while mode 2 is active
  useEffect(() => {
    if (active !== 2) return;
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
          {active === 0 && (
            <div className="ri-eeg-col">
              <span className="ri-signal-label">EEG channels</span>
              <EEGPanel />
              <span className="ri-paradigm-hint">4s covert articulation · no vocalization</span>
            </div>
          )}

          {active === 2 && <StimulusPanel stim={STIMULI[stimIdx]} />}

          <div className="ri-brain-wrap">
            <canvas
              ref={canvasRef}
              className="ri-canvas"
              role="img"
              aria-label="Brain activity visualization"
            />
            {active === 0 && <DecodingOverlay />}
            {active === 1 && <LanguageOverlay />}
            {active === 2 && <ConnectomeCanvas stimIdx={stimIdx} />}
            {active === 2 && (
              <svg className="ri-net-pulse-ring" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <circle cx="50" cy="50" r="46" className="ri-net-ring-static" style={{ stroke: STIMULI[stimIdx].color + '70' }} />
              </svg>
            )}
          </div>

          {active === 0 && (
            <div className="ri-decode-out" aria-hidden="true">
              <div className="ri-decode-arrow">→</div>
              <div className="ri-decode-words">
                <span className="ri-decoded-word">imagined</span>
                <span className="ri-decoded-word">speech</span>
              </div>
            </div>
          )}
        </div>

        {active === 0 && <RepLearningPanel />}

        <span className={`ri-mode-tag ${cur.tagClass}`}>
          {active === 2 ? `${STIMULI[stimIdx].label} Stimulus` : cur.tag}
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
