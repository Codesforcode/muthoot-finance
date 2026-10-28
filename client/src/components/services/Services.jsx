import { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChartNoAxesColumnIncreasing,
  Gem,
  House,
  HandCoins,
  BriefcaseBusiness,
  Umbrella,
  Wallet,
  Building2,
  CarFront,
  ChartNoAxesCombined,
  Banknote,
  Smartphone,
  Gift,
  CreditCard,
  Coins,
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api/services';

const iconMap = {
  'credit score': ChartNoAxesColumnIncreasing,
  'gold loan': Gem,
  'housing finance': House,
  'home loan': House,
  'personal loan': HandCoins,
  'small business loan': BriefcaseBusiness,
  insurance: Umbrella,
  'sme loan': Wallet,
  'corporate business loan': Building2,
  'vehicle loan': CarFront,
  'mutual funds': ChartNoAxesCombined,
  'money transfer': Banknote,
  'loan against property': House,
  ncd: Coins,
  'custom offers': Gift,
  'pan card': CreditCard,
  'micro finance': HandCoins,
  'digital & cashless': Smartphone,
  'milligram rewards': Gift,
};

const fallbackIcons = [
  Gem,
  House,
  HandCoins,
  BriefcaseBusiness,
  Umbrella,
  Wallet,
];

function getServiceIcon(name, index) {
  return (
    iconMap[name?.trim().toLowerCase()] ||
    fallbackIcons[index % fallbackIcons.length]
  );
}

function Services() {
  const [services, setServices] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadServices() {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Invalid API response');
        }

        setServices(result.data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Services API error:', err);
          setError('Unable to load services.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadServices();

    return () => controller.abort();
  }, []);

  const previousServices = () => {
    setStartIndex((current) =>
      (current - 1 + services.length) % services.length
    );
  };

  const nextServices = () => {
    setStartIndex((current) =>
      (current + 1) % services.length
    );
  };

  const visibleServices = services.length
    ? Array.from(
        { length: Math.min(7, services.length) },
        (_, index) => services[(startIndex + index) % services.length]
      )
    : [];

  return (
    <section
      id="services"
      className="w-full bg-white px-5 pb-14 pt-8 font-['Mukta',Arial,Helvetica,sans-serif] sm:px-8"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex-1" />

          <h2 className="flex-1 text-center text-2xl font-bold text-[#171717] sm:text-[29px]">
            Services We Provide
          </h2>

          <div className="flex flex-1 justify-end">
            <span className="rounded-full bg-gradient-to-b from-[#c9362d] to-[#a9231d] px-6 py-2.5 text-sm font-bold text-white shadow-[0_3px_8px_rgba(0,0,0,0.25)]">
              Choose Language ▼
            </span>
          </div>
        </div>

        {isLoading && (
          <p className="py-12 text-center text-gray-500">
            Loading services...
          </p>
        )}

        {!isLoading && error && (
          <p role="alert" className="py-12 text-center text-red-600">
            {error}
          </p>
        )}

        {!isLoading && !error && services.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No services available.
          </p>
        )}

        {!isLoading && !error && services.length > 0 && (
          <div className="relative px-0 md:px-0">
            <button
              type="button"
              aria-label="Previous services"
              onClick={previousServices}
              className="absolute -left-11 top-1/2 z-10 hidden -translate-y-1/2 text-[#bdbdbd] transition hover:text-[#777777] md:block"
            >
              <ChevronLeft size={42} strokeWidth={3.5} />
            </button>

            <div className="grid grid-cols-2 rounded-2xl border border-[#e1e1e1] bg-white px-1 py-3 shadow-[0_3px_14px_rgba(0,0,0,0.14)] sm:grid-cols-4 lg:grid-cols-7">
              {visibleServices.map((service, index) => {
                const Icon = getServiceIcon(service.name, index);

                return (
                  <a
                    key={service._id || service.slug}
                    href={service.href || `#service-${service.slug}`}
                    className="relative flex min-h-[125px] flex-col items-center justify-center gap-3 px-2 py-3 transition-colors hover:bg-gray-50"
                  >
                    <Icon
                      size={46}
                      strokeWidth={1.6}
                      className="text-[#9b783b]"
                      aria-hidden="true"
                    />

                    <span className="text-center text-[13px] font-semibold uppercase leading-tight text-[#c9362d] sm:text-[15px]">
                      {service.name}
                    </span>

                    {/* Divider: upar-neeche se chhoti line */}
                    {index !== visibleServices.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-3 right-0 top-3 w-px bg-[#e3e3e3]"
                      />
                    )}
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next services"
              onClick={nextServices}
              className="absolute -right-11 top-1/2 z-10 hidden -translate-y-1/2 text-[#bdbdbd] transition hover:text-[#777777] md:block"
            >
              <ChevronRight size={42} strokeWidth={3.5} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;