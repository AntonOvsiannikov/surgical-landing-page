'use client';

import { useState } from 'react';
import { faqCategories } from '../data/faqData';
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
    <section className={`wrapper-border-y`}>
      <div className={`${styles.faqSection} wrapper-inner wrapper-border-x`}>
        <div className={styles.header}>
          <span className={styles.badge}>Your questions</span>
          <h2 className={styles.title}>
            Frequently asked{' '}
            <span className={styles.titleAccent}>questions</span>
          </h2>
          <p className={styles.subtitle}>
            If you have any further questions, please use the chat box in the
            bottom right or contact
            <br />
            us by email at hello@qoves.com
          </p>
        </div>

        <div className={styles.categoriesWrapper}>
          <div className={styles.categories}>
            {faqCategories.map((category, catIdx) => {
              const isOpen = openCategory === catIdx;

              return (
                <div
                  key={catIdx}
                  className={`${styles.category} ${isOpen ? styles.categoryOpen : ''}`}
                >
                  <button
                    className={`${styles.categoryHeader} ${isOpen ? styles.categoryHeaderOpen : ''}`}
                    onClick={() => handleToggleCategory(catIdx)}
                  >
                    {category.title}
                    <span
                      className={`${styles.categoryIcon} ${isOpen ? styles.categoryIconOpen : ''}`}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="12"
                          y1="4"
                          x2="12"
                          y2="20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className={styles.iconLineV}
                        />
                        <line
                          x1="4"
                          y1="12"
                          x2="20"
                          y2="12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`${styles.questionsOuter} ${isOpen ? styles.questionsOuterOpen : ''}`}
                  >
                    <div className={styles.questions}>
                      <div className={styles.questionsContent}>
                        {category.items.map((item, qIdx) => {
                          const isQOpen = openQuestion === qIdx;

                          return (
                            <div
                              key={qIdx}
                              className={`${styles.questionItem} ${isQOpen ? styles.questionItemOpen : ''}`}
                            >
                              <button
                                className={styles.questionHeader}
                                onClick={() => handleToggleQuestion(qIdx)}
                              >
                                {item.question}
                                <span
                                  className={`${styles.questionIcon} ${isQOpen ? styles.questionIconOpen : ''}`}
                                >
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <line
                                      x1="10"
                                      y1="3"
                                      x2="10"
                                      y2="17"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      className={styles.iconLineV}
                                    />
                                    <line
                                      x1="3"
                                      y1="10"
                                      x2="17"
                                      y2="10"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </span>
                              </button>
                              <div
                                className={`${styles.answerOuter} ${isQOpen ? styles.answerOuterOpen : ''}`}
                              >
                                <div className={`${styles.answer}`}>
                                  <p className={styles.answerText}>
                                    {item.answer}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
