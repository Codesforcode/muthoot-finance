import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqItems = [
  {
    question: 'What services does Muthoot Finance offer?',
    answer:
      'As part of our core business, we provide business loans secured by gold jewellery or gold loans. We primarily cater to individuals who possess gold jewellery but cannot access formal credit within a reasonable time, or for whom credit may not be available at all. We help our customers meet unanticipated or other short-term liquidity requirements.',
  },
  {
    question: 'Does The Muthoot Group have international branches?',
    answer:
      'The Muthoot Group has a presence in multiple markets through its various businesses. For current branch locations and international operations, please refer to the official company website.',
  },
  {
    question: 'Why should I choose The Muthoot Group?',
    answer:
      'The Muthoot Group offers a range of financial services backed by a long business legacy, an extensive branch network and a focus on customer service.',
  },
  {
    question: 'What makes Muthoot Finance a reliable brand?',
    answer:
      'Muthoot Finance focuses on transparent processes, customer service and accessible gold loan services through its branch network.',
  },
  {
    question: 'Why should I trust Muthoot Finance?',
    answer:
      'Customers can review the company’s official information, loan terms, applicable charges and policies before choosing a financial product. Final loan terms and gold valuation are subject to the company’s applicable policies.',
  },
];

function FAQs() {
  // First question is open by default
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section
      id="faqs"
      className="w-full bg-white px-5 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pt-8"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Heading */}
        <h2 className="mb-6 text-center text-2xl font-bold text-[#171717] sm:mb-8 sm:text-[28px]">
          FAQs
        </h2>

        {/* FAQ container */}
        <div className="rounded-xl border border-[#dddddd] bg-white px-4 py-3 shadow-[0_3px_15px_rgba(0,0,0,0.10)] sm:px-6 sm:py-4 lg:px-8 lg:py-5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`border-b border-[#bdbdbd] last:border-b-0 ${
                  isOpen ? 'pb-3' : ''
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex min-h-[52px] w-full items-center justify-between gap-4 py-3 text-left"
                >
                  <span
                    className={`text-[15px] font-bold sm:text-base ${
                      isOpen ? 'text-[#171717]' : 'text-[#383838]'
                    }`}
                  >
                    {item.question}
                  </span>

                  <span className="shrink-0 text-[#555555]">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="pb-1 pr-1 text-[14px] leading-6 text-[#171717] sm:text-[15px] sm:leading-[26px]"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQs;