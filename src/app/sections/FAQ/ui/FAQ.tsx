'use client';

import { useState } from 'react';
import { SectionHeader, TitleAccent } from '@/shared/ui/SectionHeader';
import { faqCategories } from '../data/faqData';
import { CategoryItem } from './CategoryItem';
import styles from './FAQ.module.scss';

export const FAQ = () => {
  const [openCategory, setOpenCategory] = useState<number | null>(0);
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const handleToggleCategory = (idx: number) => {
    if (openCategory === idx) {
      setOpenCategory(null);
    } else {
      setOpenCategory(idx);
      setOpenQuestion(null);
    }
  };

  const handleToggleQuestion = (idx: number) => {
    setOpenQuestion((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="wrapper-border-y">
      <div className={`${styles.faqSection} wrapper-inner wrapper-border-x`}>
        <SectionHeader
          className={styles.header}
          badge="Your questions"
          title={
            <>
              Frequently asked <TitleAccent>questions</TitleAccent>
            </>
          }
          subtitle={
            <>
              If you have any further questions, please use the chat box in the
              bottom right or contact
              <br />
              us by email at hello@qoves.com
            </>
          }
        />

        <div className={styles.categoriesWrapper}>
          <div className={styles.categories}>
            {faqCategories.map((category, catIdx) => (
              <CategoryItem
                key={catIdx}
                title={category.title}
                items={category.items}
                isOpen={openCategory === catIdx}
                onToggle={() => handleToggleCategory(catIdx)}
                openQuestion={openCategory === catIdx ? openQuestion : null}
                onToggleQuestion={handleToggleQuestion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
