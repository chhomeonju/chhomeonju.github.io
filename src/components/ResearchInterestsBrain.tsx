import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window { meshes: Array<{ p: string; n: string; i: string }> }
}

const INTERESTS = [
  {
    title: 'Neural Decoding & Representation Learning',
    description: 'Investigating how cognitive information is encoded in neural signals across EEG, ECoG, and fMRI — spanning classification, reconstruction, and learning representations that generalize across subjects, tasks, and recording modalities.',
    mode: 0,
    tag: 'Decoding',
    tagClass: 'ri-tag--decode',
  },
  {
    title: 'Brain–Language Modeling',
    description: 'Aligning neural representations with language semantics through self-supervised learning and cross-modal objectives, toward foundation models that bridge brain signals and natural language.',
    mode: 1,
    tag: 'Language',
    tagClass: 'ri-tag--lang',
  },
  {
    title: 'Brain Encoding & Network Dynamics',
    description: 'Leveraging multimodal foundation models and generative approaches to understand how distributed neural activity and functional connectivity give rise to human cognition and behavior.',
    mode: 2,
    tag: 'Network',
    tagClass: 'ri-tag--net',
  },
];

// Decoding overlay: speech-area nodes converging to readout center
const DECODE_NODES = [
  { x: 30, y: 37 }, // Broca's area (left inferior frontal)
  { x: 22, y: 56 }, // Wernicke's area (left superior temporal)
  { x: 46, y: 33 }, // Supplementary Motor Area
];
const DECODE_CX = 50, DECODE_CY = 52; // readout center

// Brain region nodes for network overlay (%, % of canvas)
const NET_NODES = [
  { id: 'par',   x: 50, y: 24 },
  { id: 'pfc-l', x: 35, y: 31 },
  { id: 'pfc-r', x: 65, y: 31 },
  { id: 'mot-l', x: 26, y: 44 },
  { id: 'mot-r', x: 74, y: 44 },
  { id: 'tmp-l', x: 19, y: 60 },
  { id: 'tmp-r', x: 81, y: 60 },
  { id: 'occ',   x: 50, y: 74 },
];

const NET_EDGES = [
  { a: 'par',   b: 'pfc-l', w: 0.8 },
  { a: 'par',   b: 'pfc-r', w: 0.8 },
  { a: 'pfc-l', b: 'pfc-r', w: 0.9 },
  { a: 'pfc-l', b: 'mot-l', w: 0.7 },
  { a: 'pfc-r', b: 'mot-r', w: 0.7 },
  { a: 'mot-l', b: 'mot-r', w: 0.85 },
  { a: 'mot-l', b: 'tmp-l', w: 0.5 },
  { a: 'mot-r', b: 'tmp-r', w: 0.5 },
  { a: 'tmp-l', b: 'occ',   w: 0.55 },
  { a: 'tmp-r', b: 'occ',   w: 0.55 },
  { a: 'par',   b: 'mot-l', w: 0.45 },
  { a: 'par',   b: 'mot-r', w: 0.45 },
];

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
uniform float time; uniform float mode;
varying vec3 point; varying vec3 shadingNormal;
float wave(vec3 focus,float offset){
 float d=distance(point,focus);
 float r=mod(time*.22+offset,1.8);
 return exp(-pow((d-r)/.15,2.))*exp(-d*.6);
}
void main(){
 vec3 n=normalize(shadingNormal);
 float light=max(dot(n,normalize(vec3(-.6,.9,1.4))),0.);
 float side=max(dot(n,normalize(vec3(.7,-.1,.5))),0.);
 vec3 base=vec3(.85,.89,.94)*(.63+.31*light+.10*side);
 float activity; vec3 highlight;
 if(mode<0.5){
  /* Decoding: left hemisphere speech areas (Broca, Wernicke, SMA) */
  float a=wave(vec3(-.38,.15,.30),0.);
  float b=wave(vec3(-.40,-.20,.40),.50);
  float c=wave(vec3(-.10,.35,.10),1.0);
  activity=clamp(a*.9+b*.85+c*.6,0.,1.);
  highlight=vec3(.14,.36,.65)*(.72+.28*light);
 }else if(mode<1.5){
  float a=wave(vec3(-.45,.15,.25),0.);
  float b=wave(vec3(-.35,-.05,.40),.55);
  float c=wave(vec3(-.50,.35,-.05),1.1);
  activity=clamp(a*.9+b*.75+c*.55,0.,1.);
  highlight=vec3(.48,.18,.80)*(.72+.28*light);
 }else{
  float a=wave(vec3(.35,.42,.15),0.);
  float b=wave(vec3(-.38,.30,-.22),.38);
  float c=wave(vec3(.05,-.48,.38),.75);
  float d=wave(vec3(-.28,-.42,-.28),1.15);
  activity=clamp(a*.7+b*.7+c*.6+d*.55,0.,1.);
  highlight=vec3(.85,.42,.08)*(.72+.28*light);
 }
 gl_FragColor=vec4(mix(base,highlight,activity*.82),1.);
}`;

function DecodingOverlay() {
  return (
    <svg className="ri-net-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <marker id="di-arrow" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
          <path d="M0,0 L5,2 L0,4 Z" fill="rgba(30,80,200,.8)" />
        </marker>
        <filter id="di-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.7" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {DECODE_NODES.map(({ x, y }, i) => {
        const dx = DECODE_CX - x, dy = DECODE_CY - y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const ex = DECODE_CX - (dx / len) * 5, ey = DECODE_CY - (dy / len) * 5;
        return (
          <g key={i} style={{ '--di': `${i * 0.4}s` } as React.CSSProperties}>
            <circle cx={x} cy={y} r={1.7} className="ri-decode-node" filter="url(#di-glow)" />
            <line x1={x} y1={y} x2={ex} y2={ey}
              className="ri-decode-edge" markerEnd="url(#di-arrow)" />
          </g>
        );
      })}
      <circle cx={DECODE_CX} cy={DECODE_CY} r={2.8} className="ri-decode-center" filter="url(#di-glow)" />
      <circle cx={DECODE_CX} cy={DECODE_CY} r={4.5} className="ri-decode-ring" />
    </svg>
  );
}

function NetworkOverlay() {
  const nodeMap = Object.fromEntries(NET_NODES.map(n => [n.id, n]));
  return (
    <svg className="ri-net-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="ri-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {NET_EDGES.map(({ a, b, w }, i) => {
        const na = nodeMap[a], nb = nodeMap[b];
        return (
          <line
            key={`${a}-${b}`}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            className="ri-net-edge"
            style={{ '--ew': w, '--ed': `${i * 0.13}s` } as React.CSSProperties}
          />
        );
      })}
      {NET_NODES.map((node, i) => (
        <circle
          key={node.id}
          cx={node.x} cy={node.y} r={1.4}
          className="ri-net-node"
          style={{ '--nd': `${i * 0.09}s` } as React.CSSProperties}
          filter="url(#ri-glow)"
        />
      ))}
    </svg>
  );
}

export function ResearchInterestsBrain() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activate = (i: number) => {
    activeRef.current = i;
    setActive(i);
  };

  useEffect(() => {
    let rafId = 0;
    let disposed = false;

    function init() {
      if (disposed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
      if (!gl) return;

      let elapsed = 0, last = 0, lastDraw = 0;
      let userAngle = 0, velocity = 0, lastPointerX: number | null = null;

      function mkShader(type: number, src: string) {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, src); gl!.compileShader(s); return s;
      }
      function decode(s: string, Ctor: typeof Float32Array | typeof Uint16Array) {
        return new Ctor(Uint8Array.from(atob(s), c => c.charCodeAt(0)).buffer);
      }

      const prog = gl.createProgram()!;
      gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(prog); gl.useProgram(prog);

      const aPos  = gl.getAttribLocation(prog, 'position');
      const aNorm = gl.getAttribLocation(prog, 'normal');
      const uAngle  = gl.getUniformLocation(prog, 'angle');
      const uTilt   = gl.getUniformLocation(prog, 'tilt');
      const uAspect = gl.getUniformLocation(prog, 'aspect');
      const uTime   = gl.getUniformLocation(prog, 'time');
      const uMode   = gl.getUniformLocation(prog, 'mode');

      const geo = window.meshes.map(m => {
        const pb = gl.createBuffer()!, nb = gl.createBuffer()!, ib = gl.createBuffer()!;
        const idx = decode(m.i, Uint16Array) as Uint16Array;
        gl.bindBuffer(gl.ARRAY_BUFFER, pb);
        gl.bufferData(gl.ARRAY_BUFFER, decode(m.p, Float32Array), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, nb);
        gl.bufferData(gl.ARRAY_BUFFER, decode(m.n, Float32Array), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);
        return { pb, nb, ib, count: idx.length };
      });

      gl.enable(gl.DEPTH_TEST);
      gl.clearColor(0, 0, 0, 0);

      function draw() {
        const r = canvas!.getBoundingClientRect();
        const dpr = Math.min(devicePixelRatio || 1, 2);
        const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
        if (canvas!.width !== w || canvas!.height !== h) { canvas!.width = w; canvas!.height = h; }
        gl!.viewport(0, 0, w, h);
        gl!.clear(gl!.COLOR_BUFFER_BIT | gl!.DEPTH_BUFFER_BIT);
        gl!.uniform1f(uAngle, 0.38 + userAngle - elapsed * 0.04 + Math.sin(elapsed * 0.16) * 0.06);
        gl!.uniform1f(uTilt, -0.18);
        gl!.uniform1f(uAspect, w / h);
        gl!.uniform1f(uTime, elapsed);
        gl!.uniform1f(uMode, activeRef.current);
        for (const m of geo) {
          gl!.bindBuffer(gl!.ARRAY_BUFFER, m.pb);
          gl!.enableVertexAttribArray(aPos);
          gl!.vertexAttribPointer(aPos, 3, gl!.FLOAT, false, 0, 0);
          gl!.bindBuffer(gl!.ARRAY_BUFFER, m.nb);
          gl!.enableVertexAttribArray(aNorm);
          gl!.vertexAttribPointer(aNorm, 3, gl!.FLOAT, false, 0, 0);
          gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, m.ib);
          gl!.drawElements(gl!.TRIANGLES, m.count, gl!.UNSIGNED_SHORT, 0);
        }
      }

      function frame(stamp: number) {
        if (disposed) return;
        if (last && !document.hidden) elapsed += Math.min((stamp - last) / 1000, 0.1);
        last = stamp;
        if (lastPointerX === null && Math.abs(velocity) > 0.0002) {
          userAngle += velocity; velocity *= 0.90;
        }
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
      const ro = new ResizeObserver(() => { /* next draw auto-resizes */ });
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
      if (existing) {
        existing.addEventListener('load', () => init(), { once: true });
      } else {
        const s = document.createElement('script');
        s.src = '/mesh-data.js';
        s.onload = () => init();
        document.head.appendChild(s);
      }
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
      <div className="ri-brain-col">
        <div className="ri-canvas-wrap">
          <canvas
            ref={canvasRef}
            className="ri-canvas"
            role="img"
            aria-label="Brain activity visualization"
          />
          {active === 0 && <DecodingOverlay />}
          {active === 2 && <NetworkOverlay />}
        </div>
        <span className={`ri-mode-tag ${cur.tagClass}`}>{cur.tag}</span>
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
