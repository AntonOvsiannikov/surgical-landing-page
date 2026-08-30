import { cn } from '@/shared/lib/cn';
import { PlusIcon } from '@/shared/ui/PlusIcon';
import styles from './FAQ.module.scss';

interface QuestionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const QuestionItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: QuestionItemProps) => (
  <div className={cn(styles.questionItem, isOpen && styles.questionItemOpen)}>
    <button className={styles.questionHeader} onClick={onToggle}>
      {question}
      <span
        className={cn(styles.questionIcon, isOpen && styles.questionIconOpen)}
      >
        <PlusIcon size={20} lineClassName={styles.iconLineV} />
      </span>
    </button>

    <div className={cn(styles.answerOuter, isOpen && styles.answerOuterOpen)}>
      <div className={styles.answer}>
        <p className={styles.answerText}>{answer}</p>
      </div>
    </div>
  </div>
);
