import styles from './IntroducingSteps.module.scss';

const stepsDescriptions = [
  'Get your expert facial analysis',
  'Visualise your best looking self',
  'Get your personalized glow-up protocol',
  'Track your progress and see dramatic results',
];

export const IntroducingSteps = () => (
  <section className="wrapper-border-y">
    <div className={`${styles.stepsGrid} wrapper-inner`}>
      {stepsDescriptions.map((text, index) => (
        <div key={text} className={styles.stepWrapper}>
          <div className={styles.stepCard}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <p className={styles.stepDescription}>{text}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
