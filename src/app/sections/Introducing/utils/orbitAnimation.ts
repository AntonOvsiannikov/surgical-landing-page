import gsap from 'gsap';

export const ORBIT_CORNER_RADIUS = 18;
export const BEAM_COUNT = 2;
export const BEAM_HEAD_SIZE = 5.38;
export const BEAM_HEAD_CORNER = 1.35;
export const TRAIL_SEGMENT_COUNT = 8;
export const TRAIL_LENGTH_RATIO = 0.03;
export const ORBIT_DURATION_SEC = 22;

// Trail gradient endpoints: from $introducing-step-gradient-to (leading) to $introducing-step-gradient-from (trailing)
export const TRAIL_COLOR_LEADING = [134, 154, 161] as const;
export const TRAIL_COLOR_TRAILING = [205, 219, 225] as const;
export const TRAIL_COLOR_RAIL = 'rgba(215, 229, 235, 1)'; // $introducing-border
export const BEAM_HEAD_COLOR = 'rgba(134, 154, 161, 1)'; // $introducing-step-gradient-to
export const BEAM_HEAD_GLOW_COLOR = 'rgba(154, 174, 181, 0.6)'; // $introducing-accent at 60%

export interface TrailSegmentColor {
  stroke: string;
}

/**
 * Pre-compute per-segment RGBA colours that fade from the
 * leading edge (opaque, dark teal) to the trailing edge (transparent, light).
 */
export const buildTrailColors = (
  beamCount: number,
  segmentsPerBeam: number
): TrailSegmentColor[] => {
  const total = beamCount * segmentsPerBeam;
  const colors: TrailSegmentColor[] = [];

  for (let idx = 0; idx < total; idx++) {
    const j = idx % segmentsPerBeam;
    const t = j / (segmentsPerBeam - 1);

    const r = Math.round(
      TRAIL_COLOR_LEADING[0] +
        t * (TRAIL_COLOR_TRAILING[0] - TRAIL_COLOR_LEADING[0])
    );
    const g = Math.round(
      TRAIL_COLOR_LEADING[1] +
        t * (TRAIL_COLOR_TRAILING[1] - TRAIL_COLOR_LEADING[1])
    );
    const b = Math.round(
      TRAIL_COLOR_LEADING[2] +
        t * (TRAIL_COLOR_TRAILING[2] - TRAIL_COLOR_LEADING[2])
    );
    const opacity = 1 - t * 0.85;

    colors.push({ stroke: `rgba(${r}, ${g}, ${b}, ${opacity})` });
  }

  return colors;
};

export const buildHourglassPath = (
  width: number,
  height: number,
  gap: number,
  cornerRadius: number
): string => {
  const cardWidth = (width - gap) / 2;

  const leftEdge = 0;
  const leftRight = cardWidth;
  const rightLeft = cardWidth + gap;
  const rightEdge = width;

  const upperBridgeY = height * 0.465;
  const lowerBridgeY = height * 0.535;
  const bridgeArc = Math.min(cornerRadius, gap / 3);
  const r = cornerRadius;

  const commands = [
    `M ${leftEdge + r},0`,

    `L ${leftRight - r},0`,
    `Q ${leftRight},0 ${leftRight},${r}`,

    `L ${leftRight},${upperBridgeY - bridgeArc}`,
    `Q ${leftRight},${upperBridgeY} ${leftRight + bridgeArc},${upperBridgeY}`,

    `L ${rightLeft - bridgeArc},${upperBridgeY}`,
    `Q ${rightLeft},${upperBridgeY} ${rightLeft},${upperBridgeY - bridgeArc}`,

    `L ${rightLeft},${r}`,
    `Q ${rightLeft},0 ${rightLeft + r},0`,

    `L ${rightEdge - r},0`,
    `Q ${rightEdge},0 ${rightEdge},${r}`,

    `L ${rightEdge},${height - r}`,
    `Q ${rightEdge},${height} ${rightEdge - r},${height}`,

    `L ${rightLeft + r},${height}`,
    `Q ${rightLeft},${height} ${rightLeft},${height - r}`,

    `L ${rightLeft},${lowerBridgeY + bridgeArc}`,
    `Q ${rightLeft},${lowerBridgeY} ${rightLeft - bridgeArc},${lowerBridgeY}`,

    `L ${leftRight + bridgeArc},${lowerBridgeY}`,
    `Q ${leftRight},${lowerBridgeY} ${leftRight},${lowerBridgeY + bridgeArc}`,

    `L ${leftRight},${height - r}`,
    `Q ${leftRight},${height} ${leftRight - r},${height}`,

    `L ${leftEdge + r},${height}`,
    `Q ${leftEdge},${height} ${leftEdge},${height - r}`,

    `L ${leftEdge},${r}`,
    `Q ${leftEdge},0 ${leftEdge + r},0`,

    `Z`,
  ];

  return commands.join(' ');
};

export interface OrbitLayout {
  svgLeft: number;
  svgTop: number;
  svgWidth: number;
  svgHeight: number;
  gap: number;
}

/**
 * Measure the two photo cards inside the container and return
 * the SVG viewport position / size + the gap between cards.
 */
export const measureOrbitLayout = (
  container: HTMLElement,
  photoSelector: string,
  inset = 10
): OrbitLayout | null => {
  const containerRect = container.getBoundingClientRect();
  const photos = container.querySelectorAll(photoSelector);
  if (photos.length < 2) return null;

  const leftRect = photos[0].getBoundingClientRect();
  const rightRect = photos[1].getBoundingClientRect();

  const svgLeft = leftRect.left - containerRect.left - inset;
  const svgTop = leftRect.top - containerRect.top - inset;
  const svgRight = rightRect.right - containerRect.left + inset;
  const svgBottom =
    Math.max(leftRect.bottom, rightRect.bottom) - containerRect.top + inset;
  const gap = Math.max(0, rightRect.left - leftRect.right - inset * 2);

  return {
    svgLeft,
    svgTop,
    svgWidth: svgRight - svgLeft,
    svgHeight: svgBottom - svgTop,
    gap,
  };
};

export const applySvgLayout = (
  svg: SVGSVGElement,
  layout: OrbitLayout
): void => {
  const { svgLeft, svgTop, svgWidth, svgHeight } = layout;
  svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
  svg.style.left = `${svgLeft}px`;
  svg.style.top = `${svgTop}px`;
  svg.style.width = `${svgWidth}px`;
  svg.style.height = `${svgHeight}px`;
};

export interface TrailInitResult {
  totalLength: number;
  baseOffsets: number[];
}

export const initTrailSegments = (
  segments: SVGPathElement[],
  pathData: string
): TrailInitResult => {
  const sampleSeg = segments[0];
  sampleSeg.setAttribute('d', pathData);
  const totalLength = sampleSeg.getTotalLength();

  const trailLength = totalLength * TRAIL_LENGTH_RATIO;
  const segLength = trailLength / TRAIL_SEGMENT_COUNT;
  const dashArray = `${segLength + 0.5} ${totalLength - segLength - 0.5}`;
  const baseOffsets: number[] = [];

  for (let beam = 0; beam < BEAM_COUNT; beam++) {
    const beamStart = (totalLength / BEAM_COUNT) * beam;
    for (let seg = 0; seg < TRAIL_SEGMENT_COUNT; seg++) {
      const idx = beam * TRAIL_SEGMENT_COUNT + seg;
      const segEl = segments[idx];
      if (!segEl) continue;
      segEl.setAttribute('d', pathData);
      segEl.setAttribute('stroke-dasharray', dashArray);
      baseOffsets[idx] =
        beamStart + (TRAIL_SEGMENT_COUNT - 1 - seg) * segLength;
    }
  }

  return { totalLength, baseOffsets };
};

export const animateBeamHeads = (
  heads: SVGRectElement[],
  hiddenPath: SVGPathElement,
  ctx: gsap.Context
): void => {
  heads.forEach((head, i) => {
    const startProgress = i / BEAM_COUNT + TRAIL_LENGTH_RATIO;
    ctx.add(() => {
      gsap.set(head, { opacity: 1 });
      gsap.to(head, {
        motionPath: {
          path: hiddenPath,
          align: hiddenPath,
          alignOrigin: [0.5, 0.5],
          start: startProgress,
          end: startProgress + 1,
        },
        duration: ORBIT_DURATION_SEC,
        ease: 'none',
        repeat: -1,
      });
    });
  });
};
