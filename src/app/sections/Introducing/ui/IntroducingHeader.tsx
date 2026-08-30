import { SectionHeader, TitleAccent } from '@/shared/ui/SectionHeader';
import styles from './IntroducingHeader.module.scss';

export const IntroducingHeader = () => (
  <section className="wrapper-border-y">
    <SectionHeader
      className={`${styles.header} wrapper-inner`}
      as="h1"
      badge="Introducing"
      title={
        <>
          Get your personalised{' '}
          <TitleAccent>
            Qoves<sup className={styles.trademark}>™</sup> plan
          </TitleAccent>
        </>
      }
      subtitle={
        <>
          Understand your facial features and start your glow-up today <br />
          with a proven action plan, no plastic surgery needed.
        </>
      }
    />
  </section>
);
