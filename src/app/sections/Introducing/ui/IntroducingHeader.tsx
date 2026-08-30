import styles from './IntroducingHeader.module.scss';

export const IntroducingHeader = () => (
  <section className="wrapper-border-y">
    <div className={`${styles.header} wrapper-inner`}>
      <span className={styles.badge}>Introducing</span>
      <h1 className={styles.title}>
        Get your personalised{' '}
        <span className={styles.brandHighlight}>
          Qoves<sup className={styles.trademark}>™</sup> plan
        </span>
      </h1>
      <p className={styles.subtitle}>
        Understand your facial features and start your glow-up today <br />
        with a proven action plan, no plastic surgery needed.
      </p>
    </div>
  </section>
);
