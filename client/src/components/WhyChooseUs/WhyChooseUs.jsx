import { useState } from 'react';

const highlights = [
{
title: "India's No. 1 Most Trusted Financial Services Brand*",
description:
"Muthoot Finance is India's No. 1 Most Trusted Financial Services Brand for the 10th year in a row (since 2016) by TRA's Brand Trust Report 2026. With a resolute focus on providing customers with the best services, Muthoot Finance has managed to earn the trust of millions.",
image: '/public/assets/why-choose-us/brand-ambassadors.webp',
},
{
title: 'Trusted by 72 Cr+ Satisfied Customers*',
description:
'Muthoot Finance focuses on providing reliable financial services and building long-term customer trust.',
image: '/public/assets/why-choose-us/brand-ambassadors.webp',
},
{
title: 'Largest Gold Loan Portfolio in India*',
description:
'Muthoot Finance offers gold loan services through its extensive branch network across India.',
image: '/assets/why-choose-us/brand-ambassadors.webp',
},
{
title: 'Large Network of 7,500+ Branches*',
description:
'A broad branch network helps customers access financial services across many locations.',
image: '/assets/why-choose-us/brand-ambassadors.webp',
},
{
title: '800 Years of Family Business Legacy',
description:
'The Muthoot Group highlights its long-standing family business heritage and financial services experience.',
image: '/assets/why-choose-us/brand-ambassadors.webp',
},
{
title: 'Management Speaks',
description:
'Learn about the company, its leadership and its approach to customer service.',
image: '/assets/why-choose-us/brand-ambassadors.webp',
},
];

function WhyChooseUs() {
const [activeIndex, setActiveIndex] = useState(0);
const activeHighlight = highlights[activeIndex];

return (
<section className="w-full bg-white px-5 pb-16 pt-8 sm:px-8">
<div className="mx-auto max-w-[1160px]">
<h2 className="mb-5 text-center text-2xl font-bold text-[#171717]">
Why Choose Us?
</h2>

    {/* Highlight headings */}
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {highlights.map((item, index) => (
        <button
          key={item.title}
          type="button"
          onClick={() => setActiveIndex(index)}
          className={`min-h-[66px] px-1 text-center text-xs font-semibold leading-6 transition-colors sm:text-sm ${
            activeIndex === index
              ? 'text-[#333333]'
              : 'text-[#444444] hover:text-[#c9362d]'
          }`}
        >
          {item.title}
        </button>
      ))}
    </div>

    {/* Timeline */}
    <div className="relative mx-auto mb-12 mt-5 flex max-w-[980px] items-center justify-between">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[#b5b5b5]" />

      {highlights.map((item, index) => (
        <button
          key={item.title}
          type="button"
          aria-label={`Show ${item.title}`}
          aria-current={activeIndex === index ? 'true' : undefined}
          onClick={() => setActiveIndex(index)}
          className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full transition-all ${
            activeIndex === index
              ? 'bg-white shadow-[0_0_0_3px_rgba(201,54,45,0.12)]'
              : 'bg-white'
          }`}
        >
          <span
            className={`h-3 w-3 rounded-full transition-colors ${
              activeIndex === index ? 'bg-[#c9362d]' : 'bg-[#d1d1d1]'
            }`}
          />
        </button>
      ))}
    </div>

    {/* Image and description */}
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
      <div className="relative mx-auto w-full max-w-[430px]">
        <div className="absolute -bottom-3 -left-3 h-full w-full rounded-xl bg-[#999999]" />

        <div className="relative overflow-hidden rounded-xl bg-white shadow-[0_5px_25px_rgba(0,0,0,0.16)]">
          <img
            src={activeHighlight.image}
            alt="Muthoot Finance"
            className="h-[310px] w-full object-contain"
          />
        </div>
      </div>

      <div className="pt-1">
        <p className="text-sm leading-6 text-[#444444] sm:text-[15px]">
          {activeHighlight.description}
        </p>

        <a
          href="#corporate"
          className="mt-6 inline-flex min-w-[140px] items-center justify-center rounded-full bg-gradient-to-r from-[#c9362d] to-[#a9231d] px-6 py-3 text-xs font-bold text-white shadow-[0_5px_15px_rgba(169,35,29,0.25)] transition hover:brightness-95"
        >
          KNOW MORE
        </a>
      </div>
    </div>
  </div>
</section>

);
}

export default WhyChooseUs;