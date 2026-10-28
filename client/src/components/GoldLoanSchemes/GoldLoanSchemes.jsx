import { useState, useEffect, useRef } from 'react';
import {
  HandCoins,
  ThumbsUp,
  Coins,
  UserRound,
  BadgeIndianRupee,
  Award,
  ChevronUp,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

const schemes = [
  {
    name: 'SMALL VALUE INTEREST REPAYMENT SCHEME (SIR)',
    shortName: 'SIR',
    icon: HandCoins,
    interest: '85%',
    amount: '₹5,000 to ₹2.5 Lakhs',
    extra: '',
  },
  {
    name: 'MEDIUM VALUE INTEREST REPAYABLE SCHEME (MIR)',
    shortName: 'MIR',
    icon: ThumbsUp,
    interest: '80%',
    amount: '₹5,000 to ₹5 Lakhs',
    extra: '',
  },
  {
    name: 'HIGH VALUE INTEREST REPAYABLE SCHEME (HVG)',
    shortName: 'HVG',
    icon: Coins,
    interest: '75%',
    amount: '₹5 Lakhs to ₹5 Crores',
    extra: '',
  },
  {
    name: 'SMALL VALUE INTEREST REPAYABLE SCHEME (SVI)',
    shortName: 'SVI',
    icon: UserRound,
    interest: '85%',
    amount: '₹5,000 to ₹2.5 Lakhs',
    extra: 'With E-Nach Facility (Monthly interest through EMI)',
  },
  {
    name: 'MEDIUM VALUE INTEREST REPAYABLE SCHEME (MVI)',
    shortName: 'MVI',
    icon: BadgeIndianRupee,
    interest: '80%',
    amount: '₹5,000 to ₹5 Lakhs',
    extra: 'With E-Nach Facility (Monthly interest through EMI)',
  },
  {
    name: 'HIGH VALUE INTEREST REPAYABLE SCHEME (HVI)',
    shortName: 'HVI',
    icon: Award,
    interest: '75%',
    amount: '₹5 Lakhs to ₹5 Crores',
    extra: 'With E-Nach Facility (Monthly interest through EMI)',
  },
];

const schemeList = [
  'SMALL VALUE INTEREST REPAYMENT SCHEME (SIR)',
  'MEDIUM VALUE INTEREST REPAYABLE SCHEME (MIR)',
  'HIGH VALUE INTEREST REPAYABLE SCHEME (HVG)',
  'SMALL VALUE INTEREST REPAYABLE SCHEME (SVI)',
  'MEDIUM VALUE INTEREST REPAYABLE SCHEME (MVI)',
  'HIGH VALUE INTEREST REPAYABLE SCHEME (HVI)',
  'HIGH VALUE MILLENIUM GOLD (HMG)',
  'HIGH VALUE PREMIUM GOLD (HPG)',
  'MEDIUM VALUE BALANCE TRANSFER SCHEME (MVB)',
  'HIGH VALUE BALANCE TRANSFER SCHEME (HVB)',
  'BALANCE TRANSFER MONTHLY INTEREST REPAYABLE SCHEME (BTI)',
  'HIGH VALUE ELITE GOLD (HEG)',
  'ULTIMATE BT INTEREST REPAYABLE (UBI)',
];

// Section viewport me aate hi ek baar true ho jata hai
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// Card apne mount hone par right se slide-in hota hai
function SchemeCard({ scheme, index, show, onLearnMore }) {
  const [mounted, setMounted] = useState(false);
  const Icon = scheme.icon;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const visible = show && mounted;

  return (
    <article
      style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}
      className={`relative flex min-h-[270px] flex-col border-2 border-[#d4d4d4] bg-white px-4 pb-5 pt-12 transition-all duration-700 ease-out ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'
      }`}
    >
      {/* Icon badge */}
      <div className="absolute -top-[19px] left-4 flex h-[44px] w-[64px] items-center justify-center bg-white">
        <Icon size={35} strokeWidth={1.6} className="text-[#9a7b3d]" />
      </div>

      <h3 className="mb-5 min-h-[38px] text-[13px] font-bold uppercase leading-[16px] text-[#14253a]">
        {scheme.name}
      </h3>

      <ul className="space-y-1 text-[12px] leading-[18px] text-[#454545]">
        <li className="flex items-start gap-2">
          <ChevronRight
            size={14}
            className="mt-[2px] shrink-0 text-[#c9362d]"
          />
          <span>
            Monthly Interest repayment scheme with Full LTV ({scheme.interest})
          </span>
        </li>

        <li className="flex items-start gap-2">
          <ChevronRight
            size={14}
            className="mt-[2px] shrink-0 text-[#c9362d]"
          />
          <span>Loan Amount {scheme.amount}</span>
        </li>

        {scheme.extra && (
          <li className="flex items-start gap-2">
            <ChevronRight
              size={14}
              className="mt-[2px] shrink-0 text-[#c9362d]"
            />
            <span>{scheme.extra}</span>
          </li>
        )}
      </ul>

      <a
        href={`#scheme-${scheme.shortName.toLowerCase()}`}
        onClick={onLearnMore}
        className="mt-auto pt-6 text-sm font-semibold text-[#c9362d] hover:underline"
      >
        Learn More
      </a>
    </article>
  );
}

function GoldLoanSchemes() {
  const [activeScheme, setActiveScheme] = useState(0);
  const [page, setPage] = useState(0);
  const [sectionRef, inView] = useInView();

  const visibleSchemes = schemes.map((scheme, index) => ({
    ...scheme,
    originalIndex: index,
  }));

  const movePage = (direction) => {
    setPage((current) => {
      const nextPage = current + direction;
      return Math.max(0, Math.min(1, nextPage));
    });
  };

  return (
    <section
      ref={sectionRef}
      id="gold-loan"
      className="min-h-screen w-full overflow-x-clip bg-[#f7f7f7] bg-[radial-gradient(#e7e7e7_0.7px,transparent_0.7px)] bg-[length:5px_5px] px-5 py-12 sm:px-8 lg:py-16"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-11">
        {/* Left scheme list: left se aayegi */}
        <aside
          className={`transition-all duration-700 ease-out ${
            inView ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'
          }`}
        >
          <h2 className="mb-3 text-xl font-bold text-[#222222]">
            GOLD LOAN SCHEMES
          </h2>

          <div className="flex flex-col">
            {schemeList.map((scheme, index) => (
              <button
                key={scheme}
                type="button"
                onClick={() => {
                  setActiveScheme(index % schemes.length);
                  setPage(index >= 6 ? 1 : 0);
                }}
                style={{ transitionDelay: inView ? `${index * 50}ms` : '0ms' }}
                className={`border-b border-[#c8c8c8] py-[9px] text-left text-[11px] font-bold leading-[18px] transition-all duration-500 ${
                  inView
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-8 opacity-0'
                } ${
                  activeScheme === index % schemes.length
                    ? 'text-[#c9362d]'
                    : 'text-[#414141] hover:text-[#c9362d]'
                }`}
              >
                {scheme}
              </button>
            ))}
          </div>
        </aside>

        {/* Right scheme cards: right se aayenge */}
        <div className="relative">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {visibleSchemes
              .slice(page === 0 ? 0 : 3, 6)
              .map((scheme, i) => (
                <SchemeCard
                  key={`${page}-${scheme.shortName}`} // page change par remount => animation dobara
                  scheme={scheme}
                  index={i}
                  show={inView}
                  onLearnMore={() => setActiveScheme(scheme.originalIndex)}
                />
              ))}
          </div>

          {/* Vertical controls */}
          <div className="absolute -right-12 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
            <button
              type="button"
              aria-label="Previous schemes"
              onClick={() => movePage(-1)}
              disabled={page === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9362d] text-white shadow-md transition hover:bg-[#a9231d] disabled:opacity-40"
            >
              <ChevronUp size={20} />
            </button>

            <button
              type="button"
              aria-label="Next schemes"
              onClick={() => movePage(1)}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9362d] text-white shadow-md transition hover:bg-[#a9231d] disabled:opacity-40"
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoldLoanSchemes;