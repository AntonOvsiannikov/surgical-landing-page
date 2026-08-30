import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
  badge: string;
  title: ReactNode;
  subtitle: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}

export const SectionHeader = ({
  badge,
  title,
  subtitle,
  as: Tag = 'h2',
  className,
}: SectionHeaderProps) => (
  <div className={cn(styles.header, className)}>
    <span className={styles.badge}>{badge}</span>
    <Tag className={styles.title}>{title}</Tag>
    <p className={styles.subtitle}>{subtitle}</p>
  </div>
);

export const TitleAccent = ({ children }: { children: ReactNode }) => (
  <span className={styles.titleAccent}>{children}</span>
);
