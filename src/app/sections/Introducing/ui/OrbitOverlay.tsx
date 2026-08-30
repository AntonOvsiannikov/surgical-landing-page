import {
  BEAM_COUNT,
  BEAM_HEAD_SIZE,
  BEAM_HEAD_CORNER,
  TRAIL_SEGMENT_COUNT,
  TRAIL_COLOR_RAIL,
  BEAM_HEAD_COLOR,
  BEAM_HEAD_GLOW_COLOR,
  buildTrailColors,
} from '../utils/orbitAnimation';

const TRAIL_STROKE_WIDTH = 1.35;
const trailColors = buildTrailColors(BEAM_COUNT, TRAIL_SEGMENT_COUNT);

interface OrbitOverlayProps {
  ref: React.RefObject<SVGSVGElement | null>;
  className?: string;
  railRef: React.RefObject<SVGPathElement | null>;
  hiddenPathRef: React.RefObject<SVGPathElement | null>;
  trailSegmentRefs: React.RefObject<(SVGPathElement | null)[]>;
  beamHeadRefs: React.RefObject<(SVGRectElement | null)[]>;
}

export const OrbitOverlay = ({
  ref,
  className,
  railRef,
  hiddenPathRef,
  trailSegmentRefs,
  beamHeadRefs,
}: OrbitOverlayProps) => (
  <svg
    ref={ref}
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="trailGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="1.5" in="SourceGraphic" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="headGlow" x="-150%" y="-150%" width="400%" height="400%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="2"
          floodColor={BEAM_HEAD_GLOW_COLOR}
        />
      </filter>
    </defs>

    <path
      ref={hiddenPathRef}
      stroke="none"
      fill="none"
      style={{ visibility: 'hidden' }}
    />

    <path
      ref={railRef}
      stroke={TRAIL_COLOR_RAIL}
      strokeWidth={TRAIL_STROKE_WIDTH}
      strokeLinecap="round"
      fill="none"
    />

    {trailColors.map(({ stroke }, idx) => (
      <path
        key={`trail-${idx}`}
        ref={(el) => {
          trailSegmentRefs.current[idx] = el;
        }}
        stroke={stroke}
        strokeWidth={TRAIL_STROKE_WIDTH}
        strokeLinecap="round"
        fill="none"
        filter="url(#trailGlow)"
      />
    ))}

    {Array.from({ length: BEAM_COUNT }, (_, i) => (
      <rect
        key={`head-${i}`}
        ref={(el) => {
          beamHeadRefs.current[i] = el;
        }}
        width={BEAM_HEAD_SIZE}
        height={BEAM_HEAD_SIZE}
        rx={BEAM_HEAD_CORNER}
        ry={BEAM_HEAD_CORNER}
        fill={BEAM_HEAD_COLOR}
        filter="url(#headGlow)"
        opacity={0}
      />
    ))}
  </svg>
);
