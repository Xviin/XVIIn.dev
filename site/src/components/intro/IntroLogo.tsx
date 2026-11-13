"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { INTRO_LETTERS, INTRO_STAR } from "./introLogoPaths";

/**
 * Animated XVII'n badge for the intro:
 * 1. pieces settle in grey, outside → in (rings, inner line, letters one by one, star drops from top-left)
 * 2. colour spreads from top-centre and bottom-centre towards left and right
 * 3. the cursor in the star starts blinking
 * Step 1 is pure CSS (globals.css, `intro-*`); steps 2–3 start when the star has landed.
 */

const SWEEP_MS = 1400;
const CURSOR_DELAY_MS = 250;

const RINGS = [
  { rx: 218.5, ry: 110.5, fill: "#5DB7E8" },
  { rx: 211.5, ry: 103.5, fill: "#F4ECD4" },
  { rx: 204.5, ry: 96.5, fill: "#2B2B2C" },
];
const RING_START = 0.35;
const RING_STEP = 0.38;
const LINE_DELAY = RING_START + RING_STEP * RINGS.length;
const LETTER_START = LINE_DELAY + RING_STEP + 0.1;
const LETTER_STEP = 0.3;
const STAR_DELAY = LETTER_START + LETTER_STEP * INTRO_LETTERS.length + 0.15;

const delay = (s: number) => ({ "--d": `${s.toFixed(2)}s` }) as CSSProperties;

/** Two wedges around the origin centred on 12 and 6 o'clock, each `a` degrees to either side. */
function sweepPath(a: number) {
  if (a <= 0) return "";
  const wedge = (c: number) => {
    const pts: string[] = [];
    for (let k = 0; k <= 24; k++) {
      const t = ((c - a + (2 * a * k) / 24) * Math.PI) / 180;
      pts.push(`${(420 * Math.cos(t)).toFixed(1)},${(420 * Math.sin(t)).toFixed(1)}`);
    }
    return `M0,0 L${pts.join(" L")}Z`;
  };
  return wedge(-90) + wedge(90);
}

function Pieces({ starRef }: { starRef?: React.Ref<SVGGElement> }) {
  return (
    <>
      {RINGS.map((r, i) => (
        <ellipse key={i} rx={r.rx} ry={r.ry} fill={r.fill} className="intro-pc" style={delay(RING_START + RING_STEP * i)} />
      ))}
      <ellipse
        rx={193.5}
        ry={85.5}
        fill="none"
        stroke="#F3F0E9"
        strokeWidth={2.5}
        pathLength={1}
        className="intro-line"
        style={delay(LINE_DELAY)}
      />
      {INTRO_LETTERS.map((d, i) => (
        <path key={i} d={d} fill="#F3F0E9" className="intro-pc intro-letter" style={delay(LETTER_START + LETTER_STEP * i)} />
      ))}
      <g ref={starRef} className="intro-pc intro-star" style={delay(STAR_DELAY)}>
        <path d={INTRO_STAR} fill="#5DB7E8" stroke="#5DB7E8" strokeWidth={16} strokeLinejoin="round" />
        <path d={INTRO_STAR} fill="#F4ECD4" stroke="#F4ECD4" strokeWidth={8} strokeLinejoin="round" />
        <path d={INTRO_STAR} fill="#2B2B2C" />
      </g>
    </>
  );
}

export function IntroLogo() {
  const starRef = useRef<SVGGElement>(null);
  const sweepRef = useRef<SVGPathElement>(null);
  const [cursorOn, setCursorOn] = useState(false);

  useEffect(() => {
    const star = starRef.current;
    const sweep = sweepRef.current;
    if (!star || !sweep) return;
    let raf = 0;
    let timer = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sweep.setAttribute("d", sweepPath(91));
      timer = window.setTimeout(() => setCursorOn(true), 0);
      return () => window.clearTimeout(timer);
    }

    const run = () => {
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / SWEEP_MS);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        sweep.setAttribute("d", sweepPath(e * 91));
        if (k < 1) raf = requestAnimationFrame(step);
        else timer = window.setTimeout(() => setCursorOn(true), CURSOR_DELAY_MS);
      };
      raf = requestAnimationFrame(step);
    };
    const onEnd = (e: AnimationEvent) => {
      if (e.target === star) run();
    };
    star.addEventListener("animationend", onEnd);
    return () => {
      star.removeEventListener("animationend", onEnd);
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <svg
      viewBox="-270 -146 540 292"
      role="img"
      aria-label="XVIIn"
      className="intro-logo mx-auto h-auto w-[min(92vw,900px)] overflow-visible"
    >
      <defs>
        <filter id="intro-mono">
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <mask id="intro-sweep" maskUnits="userSpaceOnUse" x={-300} y={-200} width={600} height={400}>
          <path ref={sweepRef} fill="#fff" d="" />
        </mask>
        <filter id="intro-grain">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.4 -.45" />
        </filter>
      </defs>
      <g filter="url(#intro-mono)">
        <Pieces />
      </g>
      <g mask="url(#intro-sweep)" data-intro-color="">
        <Pieces starRef={starRef} />
        <rect
          x={73}
          y={-12}
          width={9}
          height={16}
          fill="#F4ECD4"
          data-testid="intro-cursor"
          className={cursorOn ? "intro-cursor intro-cursor-on" : "intro-cursor"}
        />
      </g>
      <rect x={-270} y={-146} width={540} height={292} filter="url(#intro-grain)" opacity={0.12} pointerEvents="none" />
    </svg>
  );
}
