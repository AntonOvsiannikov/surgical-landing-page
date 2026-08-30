'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

import {
  ORBIT_CORNER_RADIUS,
  ORBIT_DURATION_SEC,
  buildHourglassPath,
  measureOrbitLayout,
  applySvgLayout,
  initTrailSegments,
  animateBeamHeads,
} from '../utils/orbitAnimation';

gsap.registerPlugin(useGSAP, MotionPathPlugin);

export interface OrbitRefs {
  containerRef: React.RefObject<HTMLDivElement | null>;
  svgRef: React.RefObject<SVGSVGElement | null>;
  railRef: React.RefObject<SVGPathElement | null>;
  hiddenPathRef: React.RefObject<SVGPathElement | null>;
  trailSegmentRefs: React.RefObject<(SVGPathElement | null)[]>;
  beamHeadRefs: React.RefObject<(SVGRectElement | null)[]>;
}

const useOrbitAnimation = (photoSelector: string): OrbitRefs => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const railRef = useRef<SVGPathElement | null>(null);
  const hiddenPathRef = useRef<SVGPathElement | null>(null);
  const trailSegmentRefs = useRef<(SVGPathElement | null)[]>([]);
  const beamHeadRefs = useRef<(SVGRectElement | null)[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      const svg = svgRef.current;
      const hiddenPath = hiddenPathRef.current;
      if (!container || !svg || !hiddenPath) return;

      let debounceTimer: ReturnType<typeof setTimeout>;
      let tickerFn: (() => void) | null = null;

      const runAnimation = (ctx: gsap.Context) => {
        const segments = trailSegmentRefs.current.filter(
          Boolean
        ) as SVGPathElement[];
        const heads = beamHeadRefs.current.filter(Boolean) as SVGRectElement[];
        if (segments.length === 0) return;

        const layout = measureOrbitLayout(container, photoSelector);
        if (!layout) return;

        applySvgLayout(svg, layout);

        const pathData = buildHourglassPath(
          layout.svgWidth,
          layout.svgHeight,
          layout.gap,
          ORBIT_CORNER_RADIUS
        );
        hiddenPath.setAttribute('d', pathData);
        railRef.current?.setAttribute('d', pathData);

        const { totalLength, baseOffsets } = initTrailSegments(
          segments,
          pathData
        );
        const cycleDurationMs = ORBIT_DURATION_SEC * 1000;

        let elapsed = 0;
        tickerFn = () => {
          elapsed += gsap.ticker.deltaRatio() * (1000 / 60);
          const shift =
            ((elapsed % cycleDurationMs) / cycleDurationMs) * totalLength;
          for (let idx = 0; idx < segments.length; idx++) {
            segments[idx]?.setAttribute(
              'stroke-dashoffset',
              String(-(baseOffsets[idx] + shift))
            );
          }
        };
        gsap.ticker.add(tickerFn);

        animateBeamHeads(heads, hiddenPath, ctx);
      };

      const animCtx = gsap.context(() => {});
      runAnimation(animCtx);

      const resizeObserver = new ResizeObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (tickerFn) gsap.ticker.remove(tickerFn);
          tickerFn = null;
          animCtx.revert();
          runAnimation(animCtx);
        }, 150);
      });
      resizeObserver.observe(container);

      return () => {
        clearTimeout(debounceTimer);
        if (tickerFn) gsap.ticker.remove(tickerFn);
        resizeObserver.disconnect();
        animCtx.revert();
      };
    },
    { scope: containerRef }
  );

  return {
    containerRef,
    svgRef,
    railRef,
    hiddenPathRef,
    trailSegmentRefs,
    beamHeadRefs,
  };
};

export default useOrbitAnimation;
