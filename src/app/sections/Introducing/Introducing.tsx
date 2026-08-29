"use client";

import styles from "./Introducing.module.scss";
import { IntroducingHeader } from "./IntroducingHeader";
import { BeforeAfterCard } from "./BeforeAfterCard";
import { IntroducingSteps } from "./IntroducingSteps";

export const Introducing = () => (
  <section className={styles.section} id="personalised-analysis">
    <IntroducingHeader />
    <div className={styles.cardWrap}>
      <BeforeAfterCard />
      <IntroducingSteps />
    </div>
  </section>
);
