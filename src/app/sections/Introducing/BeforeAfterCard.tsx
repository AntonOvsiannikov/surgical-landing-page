import Image from "next/image";
import styles from "./Introducing.module.scss";

export const BeforeAfterCard = () => (
  <div className={styles.card}>
    {/* Before photo */}
    <div className={styles.photoSide}>
      <span className={styles.photoLabel}>Before</span>
      <Image
        src="/images/section-1-before.png"
        alt="Before treatment"
        fill
        className={styles.photo}
        sizes="(min-width: 1440px) 560px, 45vw"
      />
    </div>

    {/* Center zone with arrows */}
    <div className={styles.center}>
      <div className={styles.centerBlock}>
        <svg
          className={styles.arrowRight}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="rgba(154,174,181,1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={styles.centerBlock}>
        <svg
          className={styles.arrowDown}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 5v14M6 13l6 6 6-6"
            stroke="rgba(154,174,181,1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>

    {/* After photo */}
    <div className={styles.photoSide}>
      <span className={styles.photoLabel}>After</span>
      <Image
        src="/images/section-1-after.png"
        alt="After treatment"
        fill
        className={styles.photo}
        sizes="(min-width: 1440px) 560px, 45vw"
      />
    </div>
  </div>
);
