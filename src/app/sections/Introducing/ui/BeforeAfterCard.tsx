'use client';

import useOrbitAnimation from '../hooks/useOrbitAnimation';
import { OrbitOverlay } from './OrbitOverlay';
import styles from './BeforeAfterCard.module.scss';

export const BeforeAfterCard = () => {
  const {
    containerRef,
    svgRef,
    railRef,
    hiddenPathRef,
    trailSegmentRefs,
    beamHeadRefs,
  } = useOrbitAnimation(`.${styles.photoSide}`);

  return (
    <section ref={containerRef} className={`${styles.card} wrapper-border-x`}>
      <OrbitOverlay
        ref={svgRef}
        className={styles.svgOverlay}
        railRef={railRef}
        hiddenPathRef={hiddenPathRef}
        trailSegmentRefs={trailSegmentRefs}
        beamHeadRefs={beamHeadRefs}
      />

      <div className={`${styles.cardInner} wrapper-inner wrapper-border-x`}>
        <div className={`${styles.photoSide} ${styles.photoBefore}`}>
          <span className={styles.photoLabel}>Before</span>
        </div>
        <div className={`${styles.photoSide} ${styles.photoAfter}`}>
          <span className={styles.photoLabel}>After</span>
        </div>
      </div>
    </section>
  );
};
