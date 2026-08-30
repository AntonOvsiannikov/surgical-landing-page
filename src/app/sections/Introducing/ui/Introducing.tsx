'use client';

import { IntroducingHeader } from './IntroducingHeader';
import { BeforeAfterCard } from './BeforeAfterCard';
import { IntroducingSteps } from './IntroducingSteps';
import { IntroducingSpacer } from './IntroducingSpacer';
import styles from './Introducing.module.scss';

export const Introducing = () => (
  <div className={styles.introducingSection}>
    <IntroducingHeader />
    <BeforeAfterCard />
    <IntroducingSteps />
    <IntroducingSpacer />
  </div>
);
