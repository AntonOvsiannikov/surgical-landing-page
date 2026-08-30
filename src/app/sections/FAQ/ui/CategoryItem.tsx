import { cn } from '@/shared/lib/cn';
import { PlusIcon } from '@/shared/ui/PlusIcon';
import type { FAQItem } from '../data/faqData';
import { QuestionItem } from './QuestionItem';
import styles from './FAQ.module.scss';

interface CategoryItemProps {
  title: string;
  items: FAQItem[];
  isOpen: boolean;
  onToggle: () => void;
  openQuestion: number | null;
  onToggleQuestion: (idx: number) => void;
}

export const CategoryItem = ({
  title,
  items,
  isOpen,
  onToggle,
  openQuestion,
  onToggleQuestion,
}: CategoryItemProps) => (
  <div className={cn(styles.category, isOpen && styles.categoryOpen)}>
    <button
      className={cn(styles.categoryHeader, isOpen && styles.categoryHeaderOpen)}
      onClick={onToggle}
    >
      {title}
      <span
        className={cn(styles.categoryIcon, isOpen && styles.categoryIconOpen)}
      >
        <PlusIcon size={24} lineClassName={styles.iconLineV} />
      </span>
    </button>

    <div
      className={cn(styles.questionsOuter, isOpen && styles.questionsOuterOpen)}
    >
      <div className={styles.questions}>
        <div className={styles.questionsContent}>
          {items.map((item, qIdx) => (
            <QuestionItem
              key={qIdx}
              question={item.question}
              answer={item.answer}
              isOpen={openQuestion === qIdx}
              onToggle={() => onToggleQuestion(qIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
