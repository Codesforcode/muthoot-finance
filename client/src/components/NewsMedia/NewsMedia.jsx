import { ArrowRight } from 'lucide-react';

const newsItems = [
  {
    title:
      'EXCLUSIVE INTERVIEW OF MR. ALEXANDER GEORGE MUTHOOT, MANAGING DIRECTOR, THE MUTHOOT GROUP; COVERED IN THE ENTREPRENEUR MAGAZINE, TOMORROW INC.',
    image: '/public/assets/news/alexander-george.webp',
    href: '#news-feature',
  },
  {
    title:
      'We, at The Muthoot Group, have engaged Shri Amitabh Bachchan as our Brand Ambassador. He will represent the group across national campaigns.',
    image: '/public/assets/news/brand-ambassador.webp',
    href: '#news-brand-ambassador',
  },
  {
    title: "TRA's Brand Trust Report — Muthoot Finance",
    image: '/public/assets/news/trust-report.webp',
    href: '#news-trust-report',
  },
  {
    title:
      '"MUTHOOT VISHWAAS KI TIJORI" WINS A SPECIAL AWARD FOR MASS CONSUMER OUTREACH AT ECONOMIC TIMES BFSI EXCELLENCE AWARDS 2019',
    image: '/public/assets/news/image.png',
    href: '#news-award',
  },
];

// B&W by default, hover par colour + halka zoom
const imageClass =
  'absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0';

// Card ka text + button
function NewsCard({ item, className = '', titleClass = '' }) {
  return (
    <article
      className={`group relative overflow-hidden bg-gray-200 ${className}`}
    >
      <img src={item.image} alt={item.title} className={imageClass} />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

      {/*
        Block ko button ki height jitna neeche khiska rakha hai (translate-y-[60px]).
        Hover par 0 ho jata hai, to text upar aata hai aur button dikhta hai.
      */}
      <div className="absolute inset-x-0 bottom-0 translate-y-[60px] p-4 transition-transform duration-500 ease-out group-hover:translate-y-0 sm:p-5">
        <h3
          className={`line-clamp-4 font-semibold uppercase leading-[19px] text-white ${titleClass}`}
        >
          {item.title}
        </h3>

        <a
          href={item.href}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#c9362d] px-6 py-2.5 text-sm font-bold text-white opacity-0 transition-all duration-500 hover:bg-[#a9231d] group-hover:opacity-100"
        >
          KNOW MORE <ArrowRight size={16} />
        </a>
      </div>
    </article>
  );
}

function NewsMedia() {
  const [featured, topStory, bottomLeft, bottomRight] = newsItems;

  return (
    <section className="w-full bg-white px-5 py-10 sm:px-8 lg:py-14">
      <div className="mx-auto max-w-[1220px]">
        <h2 className="mb-7 text-2xl font-bold text-[#171717] sm:text-[30px]">
          NEWS & MEDIA
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.8fr_1.35fr]">
          {/* Featured story */}
          <NewsCard
            item={featured}
            className="min-h-[420px] sm:min-h-[500px]"
            titleClass="text-xs sm:text-sm"
          />

          {/* Other news stories */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <NewsCard
              item={topStory}
              className="min-h-[230px] sm:col-span-2 sm:min-h-[290px]"
              titleClass="text-xs sm:text-sm"
            />

            <NewsCard
              item={bottomLeft}
              className="min-h-[220px] sm:min-h-[225px]"
              titleClass="text-xs"
            />

            <NewsCard
              item={bottomRight}
              className="min-h-[220px] sm:min-h-[225px]"
              titleClass="text-xs"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsMedia;