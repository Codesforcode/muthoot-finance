import { useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const csrItems = [
  {
    title:
      'Muthoot Finance Distributes School Bags to Underprivileged Students at Government Primary School Makasudabad, Kalyanpur, Kanpur, Uttar Pradesh',
    image: '/public/assets/csr/school-bags-1.webp',
  },
  {
    title:
      'Muthoot Finance Distributes School Bags to Underprivileged Students at Government Upper Primary School Aterna, Meerut, Uttar Pradesh',
    image: '/public/assets/csr/school-bags-2.webp',
  },
  {
    title:
      'Muthoot Finance Distributes School Bags to Needy Students in Ludhiana',
    image: '/public/assets/csr/school-bags-3.webp',
  },
  {
    title: 'Muthoot Finance CSR Initiative for Students',
    image: '/public/assets/csr/school-bags-4.webp',
  },
];

function CSR() {
  const listRef = useRef(null);

  const scrollList = (direction) => {
    if (!listRef.current) return;

    listRef.current.scrollBy({
      top: direction === 'down' ? 180 : -180,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full bg-white px-5 py-10 sm:px-8 lg:py-14">
      <div className="mx-auto max-w-[1220px]">
        <h2 className="mb-7 text-2xl font-bold text-[#171717] sm:text-[30px]">
          CSR
        </h2>

        <div className="overflow-hidden border-2 border-[#cfcfcf] bg-white">
          {/* Scrollable CSR stories (scrollbar hidden) */}
          <div
            ref={listRef}
            className="max-h-[580px] space-y-6 overflow-y-auto p-4 [scrollbar-width:none] [-ms-overflow-style:none] sm:p-5 [&::-webkit-scrollbar]:hidden"
          >
            {csrItems.map((item) => (
              <article
                key={item.title}
                className="group grid grid-cols-1 items-start gap-4 sm:grid-cols-[42%_1fr]"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[150px] w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                <div>
                  <p className="line-clamp-5 text-sm leading-[22px] text-[#505050]">
                    {item.title}
                  </p>

                  <a
                    href="#csr-story"
                    className="mt-1 inline-block text-sm font-semibold text-[#c9362d] hover:underline"
                  >
                    Know More
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom controls */}
          <div className="grid grid-cols-2 border-t-2 border-[#cfcfcf]">
            <button
              type="button"
              aria-label="Scroll CSR list down"
              onClick={() => scrollList('down')}
              className="flex h-9 items-center justify-center border-r-2 border-[#cfcfcf] text-[#333333] hover:bg-gray-100"
            >
              <ChevronDown size={20} />
            </button>

            <button
              type="button"
              aria-label="Scroll CSR list up"
              onClick={() => scrollList('up')}
              className="flex h-9 items-center justify-center text-[#333333] hover:bg-gray-100"
            >
              <ChevronUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CSR;