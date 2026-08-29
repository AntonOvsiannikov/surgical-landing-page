import styles from "./Introducing.module.scss";

const steps = [
  { id: 1, text: "Get your expert facial analysis" },
  { id: 2, text: "Visualise your best looking self" },
  { id: 3, text: "Get your personalized glow-up protocol" },
  { id: 4, text: "Track your progress and see dramatic results" },
] as const;

export const IntroducingSteps = () => (
  <div className={styles.steps}>
    {steps.map((step) => (
      <div
        key={step.id}
        className={`${styles.step} ${step.id === 2 ? styles.stepActive : ""}`}
      >
        <span className={styles.stepNumber}>{step.id}</span>
        <p className={styles.stepText}>{step.text}</p>
      </div>
    ))}
  </div>
);
