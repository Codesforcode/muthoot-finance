
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/banners';
const AUTO_SLIDE_DELAY = 4000;

function HeroCarousel() {
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch banners from the API Gateway
  useEffect(() => {
    const controller = new AbortController();

    async function loadBanners() {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Banner API returned status ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Invalid banner API response');
        }

        setBanners(result.data);
        setActiveIndex(0);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Unable to load banners:', err);
          setError('Banners load nahi ho paaye. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadBanners();

    return () => controller.abort();
  }, []);

  // Automatic slide rotation
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((previous) => (previous + 1) % banners.length);
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(timer);
  }, [isPaused, banners.length]);

  const getRelativeIndex = (offset) =>
    (activeIndex + offset + banners.length) % banners.length;

  if (isLoading) {
    return (
      <section
        aria-label="Promotional banners"
        className="flex min-h-[280px] w-full items-center justify-center bg-white"
      >
        <p role="status" className="text-gray-600">
          Loading banners...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        aria-label="Promotional banners"
        className="flex min-h-[280px] w-full flex-col items-center justify-center gap-3 bg-white"
      >
        <p role="alert" className="text-red-600">
          {error}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded bg-[#c9362d] px-4 py-2 text-white"
        >
          Reload page
        </button>
      </section>
    );
  }

  if (banners.length === 0) {
    return (
      <section
        aria-label="Promotional banners"
        className="flex min-h-[280px] items-center justify-center bg-white"
      >
        <p className="text-gray-600">No banners available.</p>
      </section>
    );
  }

  return (
    <section
      aria-label="Muthoot Finance promotional banners"
      className="w-full overflow-hidden bg-white pt-3"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner slides */}
      <div className="flex w-full items-center justify-center gap-[14px]">
        {[-1, 0, 1].map((offset) => {
          const index = getRelativeIndex(offset);
          const banner = banners[index];
          const isActive = offset === 0;

          return (
            <button
              key={`${banner._id || banner.slug || index}-${offset}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={isActive ? 'true' : undefined}
              className={`relative block shrink-0 overflow-hidden rounded-[15px] transition-all duration-300 ${
                isActive
                  ? 'z-10 w-[78%] opacity-100'
                  : 'w-[18%] opacity-90'
              }`}
            >
              <img
                src={banner.imageUrl}
                alt={banner.altText || banner.title || `Promotional banner ${index + 1}`}
                className="block h-[min(24vw,440px)] min-h-[250px] w-full object-cover max-sm:h-[220px] max-sm:min-h-0"
                onError={(event) => {
                  console.error('Banner image failed to load:', banner.imageUrl);
                  event.currentTarget.style.visibility = 'hidden';
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div
        className="flex items-center justify-center gap-3 py-5"
        aria-label="Choose a banner"
      >
        {banners.map((banner, index) => (
          <button
            key={banner._id || banner.slug || index}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to banner ${index + 1}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-[13px] w-[13px] rounded-full transition-colors duration-200 ${
              activeIndex === index
                ? 'bg-[#c9362d]'
                : 'bg-[#999999] hover:bg-[#666666]'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroCarousel;

