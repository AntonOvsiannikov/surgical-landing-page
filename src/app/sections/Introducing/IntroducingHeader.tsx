import styles from "./Introducing.module.scss";

export const IntroducingHeader = () => (
  <div className={styles.header}>
    <span className={styles.badge}>Personalised Analysis</span>
    <h1 className={styles.title}>
      Get your personalised{" "}
      <em className={styles.brand}>
        Qoves<sup className={styles.tm}>™</sup>
      </em>{" "}
      plan
    </h1>
    <p className={styles.subtitle}>
      Complete your analysis in 10 minutes and get a personalised plan
      with a step-by-step protocol to help you look your best.
    </p>
  </div>
);
