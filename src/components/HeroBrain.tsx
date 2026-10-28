import { useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';

declare global {
  interface Window { meshes: Array<{ p: string; n: string; i: string }> }
}

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
uniform float time;
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
 float a=wave(vec3(.46,.33,.28),0.);
 float b=wave(vec3(-.48,-.35,.40),.65);
 float c=wave(vec3(.40,-.55,-.05),1.2);
 float activity=clamp(a*.8+b*.65+c*.55,0.,1.);
 vec3 blue=vec3(.14,.36,.65)*(.72+.28*light);
 vec3 color=mix(base,blue,activity*.82);
 gl_FragColor=vec4(color,1.);
}`;

export function HeroBrain({ onExplore }: { onExplore?: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let rafId = 0;
    let disposed = false;

    function init() {
      if (disposed) return;
      const canvas = canvasRef.current;
      const control = buttonRef.current;
      if (!canvas || !control) return;

      const gl = canvas.getContext('webgl', { alpha: true, antialias: true, preserveDrawingBuffer: true });
      if (!gl) {
        canvas.textContent = 'Cortical activity preview requires WebGL.';
        control.hidden = true;
        return;
      }

      let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
      let elapsed = 3.2, last = 0, lastDraw = 0, userAngle = 0, velocity = 0, lastPointerX: number | null = null, dirty = true;

      function mkShader(type: number, src: string) {
        const s = gl!.createShader(type)!;
        gl!.shaderSource(s, src);
        gl!.compileShader(s);
        return s;
      }
      function decode(s: string, Ctor: typeof Float32Array | typeof Uint16Array) {
        const bytes = Uint8Array.from(atob(s), c => c.charCodeAt(0));
        return new Ctor(bytes.buffer);
      }

      const program = gl.createProgram()!;
      gl.attachShader(program, mkShader(gl.VERTEX_SHADER, VERTEX));
      gl.attachShader(program, mkShader(gl.FRAGMENT_SHADER, FRAGMENT));
      gl.linkProgram(program);
      gl.useProgram(program);

      const aPos  = gl.getAttribLocation(program, 'position');
      const aNorm = gl.getAttribLocation(program, 'normal');
      const uAngle  = gl.getUniformLocation(program, 'angle');
      const uTilt   = gl.getUniformLocation(program, 'tilt');
      const uAspect = gl.getUniformLocation(program, 'aspect');
      const uTime   = gl.getUniformLocation(program, 'time');

      const geometry = window.meshes.map(m => {
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
        gl!.uniform1f(uAngle, 0.38 + userAngle - elapsed * 0.025 + Math.sin(elapsed * 0.16) * 0.06);
        gl!.uniform1f(uTilt, -0.18);
        gl!.uniform1f(uAspect, w / h);
        gl!.uniform1f(uTime, elapsed);
        for (const m of geometry) {
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
        if (disposed) { return; }
        if (last && !paused && !document.hidden) elapsed += Math.min((stamp - last) / 1000, 0.1);
        last = stamp;
        if (lastPointerX === null && Math.abs(velocity) > 0.0002) {
          userAngle += velocity;
          velocity *= 0.90;
          dirty = true;
        }
        if (stamp - lastDraw > 33 && !document.hidden && (!paused || dirty)) {
          draw(); lastDraw = stamp; dirty = false;
        }
        rafId = requestAnimationFrame(frame);
      }

      const onMove = (e: PointerEvent) => {
        if (lastPointerX !== null) {
          const r = canvas!.getBoundingClientRect();
          const dx = (e.clientX - lastPointerX) / r.width * 2.5;
          userAngle += dx;
          velocity = dx;
          dirty = true;
        }
        lastPointerX = e.clientX;
      };
      const onLeave = () => { lastPointerX = null; };
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
      const ro = new ResizeObserver(() => { dirty = true; });
      ro.observe(canvas);

      rafId = requestAnimationFrame(frame);

      function sync() {
        control!.setAttribute('aria-pressed', String(paused));
        control!.textContent = paused ? 'Play animation' : 'Pause animation';
      }
      control.addEventListener('click', () => { paused = !paused; sync(); });
      sync();

      const origDispose = () => {
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerleave', onLeave);
        ro.disconnect();
      };
      (canvas as any)._brainDispose = origDispose;
    }

    if (window.meshes) {
      init();
    } else {
      const script = document.createElement('script');
      script.src = '/mesh-data.js';
      script.onload = () => init();
      document.head.appendChild(script);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      const canvas = canvasRef.current;
      if (canvas && (canvas as any)._brainDispose) (canvas as any)._brainDispose();
    };
  }, []);

  return (
    <section className="hero-brain" aria-label="Introduction">
      <div className="hero-intro">
        <canvas
          ref={canvasRef}
          className="brain-canvas"
          role="img"
          aria-label="Three-dimensional cortical surface with illustrative activity spreading across brain regions"
        >
          Animated cortical activity illustration
        </canvas>
        <h1 className="hero-name">Myeongju Cho</h1>
        <p className="hero-role">M.S. Researcher at Korea University · PRML Lab</p>
        <p className="hero-vision">Understanding Human Cognition<br />Through AI</p>
        <p className="hero-subjects">Brain–Computer Interfaces, Neural Decoding,<br />and EEG–Language Foundation Models</p>
        <a className="hero-explore" href="#about" onClick={onExplore}>Explore my research</a>
      </div>
      <div className="hero-bottom">
        <span className="hero-place">
          Copyright © Myeongju Cho
        </span>
        <div className="hero-contacts">
          <a href="mailto:mj_cho@korea.ac.kr">Email</a>
          <a href="https://github.com/Myeongjuuu" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/myeongju-cho-a690a0387/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <button ref={buttonRef} className="motion-button" type="button">Pause animation</button>
      </div>
    </section>
  );
}
