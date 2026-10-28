import { useState } from 'react';

const blogPosts = [
{
title: 'HOW TO FIND THE EXACT VALUE OF YOUR GOLD: 7 KEY FACTORS TO CONSIDER',
image: '/public/assets/blogs/gold-value.webp',
url: '#blog-gold-value',
},
{
title: "10 FACTORS THAT MAKE MUTHOOT FINANCE ONE OF INDIA'S MOST TRUSTED FINANCIAL BRANDS",
image: '/public/assets/blogs/muthoot-finance.webp',
url: '#blog-trusted-finance',
},
{
title: 'GOLD COIN VS GOLD JEWELLERY ON DHANTERAS: WHICH IS THE SMARTER CHOICE?',
image: '/public/assets/blogs/gold-coin-vs-jewellery.webp',
url: '#blog-gold-coin',
},
{
title: 'DHANTERAS OR DUSSEHRA 2026: WHICH IS THE RIGHT TIME TO BUY GOLD?',
image: '/public/assets/blogs/dhanteras-gold.webp',
url: '#blog-dhanteras',
},
{
title: 'HOW GOLD PRICES DURING THE FESTIVE SEASON AFFECT GOLD LOAN ELIGIBILITY',
image: '/public/assets/blogs/gold-price-festive.webp',
url: '#blog-gold-price',
},
];

function Blogs() {
const [showAll, setShowAll] = useState(false);

const visiblePosts = showAll ? blogPosts : blogPosts.slice(0, 5);

return (
<section id="blogs" className="w-full bg-white px-5 pb-10 pt-8 sm:px-8 sm:pb-12" >
<div className="mx-auto max-w-[1400px]">
{/* Section heading */}
<h2 className="mb-10 text-center text-2xl font-bold text-[#171717] sm:text-[30px]">
Our Blogs
</h2>

    {/* Blog cards */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {visiblePosts.map((post) => (
        <article
          key={post.url}
          className="group flex min-w-0 flex-col overflow-hidden bg-white shadow-[0_4px_18px_rgba(0,0,0,0.13)] transition-shadow duration-300 hover:shadow-[0_6px_24px_rgba(0,0,0,0.2)]"
        >
          <a href={post.url} className="block overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="h-[210px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </a>

          <div className="flex flex-1 items-start px-6 py-5">
            <a
              href={post.url}
              className="line-clamp-3 text-sm font-semibold uppercase leading-[27px] text-[#c9362d] transition-colors hover:text-[#a9231d]"
            >
              {post.title}
            </a>
          </div>
        </article>
      ))}
    </div>

    {/* View more */}
    <div className="mt-9 flex justify-center">
      <button
        type="button"
        onClick={() => setShowAll((previous) => !previous)}
        className="rounded-full border border-[#a9231d] bg-gradient-to-r from-[#c9362d] to-[#a9231d] px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:brightness-95"
      >
        {showAll ? 'VIEW LESS' : 'VIEW MORE'}
      </button>
    </div>
  </div>
</section>

);
}

export default Blogs;