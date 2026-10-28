
import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/services`;

const navigationLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'SERVICES', href: '#services', dropdown: true },
  { label: 'CORPORATE', href: '#corporate' },
  { label: 'INVESTORS', href: '#investors' },
  { label: 'POLICY', href: '#policy' },
  { label: 'DIGITAL INITIATIVES', href: '#digital-initiatives' },
  { label: 'CAREERS', href: '#careers' },
  { label: 'CSR', href: '#csr' },
  { label: 'MEDIA', href: '#media' },
  { label: 'NEWS', href: '#news' },
  { label: 'CONTACT', href: '#contact' },
];

const popularServices = [
  { name: 'CREDIT SCORE', icon: '📊', href: '#services' },
  { name: 'GOLD LOAN', icon: '💎', href: '#services' },
  { name: 'HOUSING FINANCE', icon: '🏠', href: '#services' },
  { name: 'PERSONAL LOAN', icon: '💰', href: '#services' },
  { name: 'SMALL BUSINESS LOAN', icon: '🏪', href: '#services' },
  { name: 'INSURANCE', icon: '🛡️', href: '#services' },
  { name: 'SME LOAN', icon: '💳', href: '#services' },
];

const navItemClass =
  'flex h-[24px] items-center justify-center whitespace-nowrap border-r-2 border-dotted border-[#cccccc] px-[13px] text-[17px] font-semibold leading-none transition-colors hover:text-[#c9362d] max-[1450px]:px-[10px] max-[1450px]:text-[15px] max-[1150px]:px-[6px] max-[1150px]:text-[12px] max-[900px]:h-auto max-[900px]:min-h-[44px] max-[900px]:justify-start max-[900px]:border-x-0 max-[900px]:border-b max-[900px]:border-solid max-[900px]:border-[#eeeeee] max-[900px]:px-5 max-[900px]:py-3 max-[900px]:text-[14px]';

function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState('');

  const headerRef = useRef(null);

  // Load services from the API Gateway.
  useEffect(() => {
    const controller = new AbortController();

    async function loadServices() {
      try {
        setServicesLoading(true);
        setServicesError('');

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Services API returned status ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Invalid response received from Services API');
        }

        setServices(result.data);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Unable to load services:', error);
          setServicesError(
            'Services load nahi ho paayi. Please try again.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setServicesLoading(false);
        }
      }
    }

    loadServices();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setServicesOpen(false);
        setSearchOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setServicesOpen(false);
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  function closeMenus() {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }

  function getServiceHref(service) {
    return service.href || `#service-${service.slug}`;
  }

  return (
    <header
      ref={headerRef}
      className="relative z-50 w-full bg-white font-['Mukta',Arial,Helvetica,sans-serif] text-[#171717] shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
    >
      {/* Header row */}
      <div className="relative z-[70] flex min-h-[110px] w-full items-stretch bg-white px-4 max-[1150px]:min-h-[100px] max-[900px]:min-h-[80px]">
        {/* Company logo */}
        <a
          href="#home"
          aria-label="Muthoot Finance Home"
          onClick={closeMenus}
          className="flex w-[250px] shrink-0 items-center max-[1450px]:w-[230px] max-[1150px]:w-[200px] max-[900px]:w-auto max-[900px]:flex-1"
        >
          <img
           src="/assets/logo/image.png"
            alt="Muthoot Finance"
            className="block h-auto w-[220px] object-contain max-[1450px]:w-[205px] max-[1150px]:w-[185px] max-[900px]:w-[190px] max-[480px]:w-[150px]"
          />
        </a>

        {/* Right-side header */}
        <div className="relative flex min-w-0 flex-1 flex-col">
          {/* WhatsApp and language */}
          <div className="flex h-[40px] shrink-0 items-stretch justify-end gap-5 max-[1150px]:gap-3 max-[900px]:h-auto max-[900px]:min-h-[38px] max-[600px]:gap-2">
            <a
              href="https://wa.me/917558077666"
              target="_blank"
              rel="noreferrer"
              aria-label="Contact us on WhatsApp"
              className="inline-flex items-center gap-2 self-center whitespace-nowrap text-[19px] font-semibold text-[#686868] hover:text-[#419b3b] max-[1450px]:text-[17px] max-[1150px]:text-[14px] max-[600px]:gap-1 max-[600px]:text-[11px]"
            >
              <svg
                viewBox="0 0 32 32"
                fill="currentColor"
                aria-hidden="true"
                className="h-[30px] w-[30px] shrink-0 text-[#419b3b] max-[1150px]:h-[25px] max-[1150px]:w-[25px] max-[600px]:h-[21px] max-[600px]:w-[21px]"
              >
                <path d="M16 .8A15.1 15.1 0 0 0 3.1 23.8L1 31l7.4-1.9A15.1 15.1 0 1 0 16 .8Zm0 27.4c-2.4 0-4.7-.7-6.7-2l-.5-.3-4.4 1.1 1.2-4.3-.3-.5A12.2 12.2 0 1 1 16 28.2Zm6.7-9.1c-.4-.2-2.2-1.1-2.5-1.2-.4-.1-.6-.2-.8.2-.3.4-.9 1.2-1.1 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.1.7.9.3 1.8.3 2.5.2.8-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.3-.3-.7-.5Z" />
              </svg>

              <span>WhatsApp: +91-7558077666</span>
            </a>

            <label className="relative block w-[175px] shrink-0 bg-[#e8e8e8] max-[1150px]:w-[140px] max-[600px]:w-[105px]">
              <span className="sr-only">Select language</span>

              <select
                value={selectedLanguage}
                onChange={(event) => setSelectedLanguage(event.target.value)}
                aria-label="Select language"
                className="h-full w-full cursor-pointer appearance-none border-0 bg-transparent px-3 pr-8 text-[16px] text-[#666666] outline-none max-[1150px]:text-[14px] max-[600px]:px-2 max-[600px]:text-[11px]"
              >
                <option value="">Select Language</option>
                <option value="hi">Hindi</option>
                <option value="en-IN">English</option>
              </select>

              <ChevronDown
                size={15}
                aria-hidden="true"
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#444444]"
              />
            </label>
          </div>

          {/* Navigation */}
          <div className="flex min-w-0 flex-1 items-center justify-end pb-4 max-[900px]:pb-0">
            <nav
              aria-label="Main navigation"
              className={`flex min-w-0 items-center justify-end max-[900px]:absolute max-[900px]:left-0 max-[900px]:right-0 max-[900px]:top-full max-[900px]:z-[70] max-[900px]:hidden max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:bg-white max-[900px]:shadow-lg ${
                mobileMenuOpen ? 'max-[900px]:!flex' : ''
              }`}
            >
              {navigationLinks.map((link, index) =>
                link.dropdown ? (
                  <button
                    key={link.label}
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-controls="services-mega-menu"
                    onClick={() => {
                      setServicesOpen((previous) => !previous);
                      setSearchOpen(false);
                    }}
                    className={`${navItemClass} ${
                      servicesOpen ? 'text-[#c9362d]' : 'text-[#171717]'
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className="ml-1 shrink-0"
                      aria-hidden="true"
                    />
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenus}
                    className={`${navItemClass} ${
                      index === 0 ? 'text-[#c9362d]' : 'text-[#171717]'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* Mobile menu */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((previous) => !previous)}
              className="hidden h-[42px] w-[42px] shrink-0 items-center justify-center bg-transparent text-[#171717] hover:text-[#c9362d] max-[900px]:inline-flex"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Search */}
            <button
              type="button"
              aria-label="Toggle search"
              aria-expanded={searchOpen}
              onClick={() => {
                setSearchOpen((previous) => !previous);
                setServicesOpen(false);
              }}
              className="ml-0 inline-flex h-[42px] w-[44px] shrink-0 items-center justify-center bg-transparent text-[#171717] hover:text-[#c9362d] max-[1150px]:w-[32px] max-[900px]:w-[35px] max-[480px]:w-[28px]"
            >
              <Search size={20} strokeWidth={3} />
            </button>
          </div>

          {/* Search panel */}
          {searchOpen && (
            <form
              onSubmit={(event) => event.preventDefault()}
              className="absolute right-0 top-full z-[80] flex w-[min(360px,90vw)] gap-2 border border-[#dddddd] bg-white p-3 shadow-lg"
            >
              <input
                type="search"
                placeholder="Search..."
                aria-label="Search website"
                className="min-w-0 flex-1 border border-[#cccccc] px-3 py-2 text-sm outline-none focus:border-[#c9362d]"
              />

              <button
                type="submit"
                className="bg-[#c9362d] px-4 text-sm text-white hover:bg-[#a52a24]"
              >
                Search
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Services mega menu */}
      <div
        id="services-mega-menu"
        aria-hidden={!servicesOpen}
        className={`absolute left-0 right-0 top-full z-[65] grid bg-white transition-[grid-template-rows,visibility,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          servicesOpen
            ? 'visible grid-rows-[1fr] shadow-[0_12px_24px_rgba(0,0,0,0.18)]'
            : 'invisible grid-rows-[0fr] shadow-none'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-gray-200">
            <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-[minmax(0,2.2fr)_minmax(280px,0.9fr)]">
              {/* Services list */}
              <section className="min-w-0 px-5 py-6 sm:px-8 lg:px-10">
                <h2 className="mb-5 text-2xl font-normal text-[#171717]">
                  Our Services
                </h2>

                {servicesLoading && (
                  <p className="py-8 text-sm text-gray-600" role="status">
                    Loading services...
                  </p>
                )}

                {!servicesLoading && servicesError && (
                  <div className="py-6" role="alert">
                    <p className="text-sm text-red-600">{servicesError}</p>
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="mt-3 rounded bg-[#c9362d] px-4 py-2 text-sm text-white"
                    >
                      Reload page
                    </button>
                  </div>
                )}

                {!servicesLoading &&
                  !servicesError &&
                  services.length === 0 && (
                    <p className="py-8 text-sm text-gray-600">
                      No services are currently available.
                    </p>
                  )}

                {!servicesLoading &&
                  !servicesError &&
                  services.length > 0 && (
                    <div className="grid max-h-[390px] grid-cols-1 gap-x-5 gap-y-2 overflow-y-auto pr-2 sm:grid-cols-2 xl:grid-cols-3">
                      {services.map((service) => (
                        <a
                          key={service._id || service.slug}
                          href={getServiceHref(service)}
                          onClick={closeMenus}
                          tabIndex={servicesOpen ? 0 : -1}
                          className="flex min-h-[60px] items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-[#c9362d] transition-colors hover:bg-[#f4f4f4]"
                        >
                          <span
                            aria-hidden="true"
                            className="flex h-10 w-10 shrink-0 items-center justify-center text-[27px]"
                          >
                            {service.icon || '💼'}
                          </span>

                          <span>{service.name}</span>
                        </a>
                      ))}
                    </div>
                  )}
              </section>

              {/* Promotional panel */}
              <aside className="flex flex-col justify-center bg-[#f4f4f4] px-6 py-7 sm:px-8 lg:px-7">
                <h2 className="text-xl font-bold leading-7 text-[#171717]">
                  India's No.1 Most Trusted Financial Services Brand
                </h2>

                <p className="mt-3 text-[15px] leading-6 text-[#171717]">
                  Bringing joy to millions through a diversified product
                  portfolio, setting benchmarks for quality services,
                  customer relationships and management processes.
                </p>

                <div className="mt-5 flex min-h-[140px] items-end justify-center overflow-hidden">
                  <img
                    src="/assets/images/image.png"
                    alt="Brand ambassador"
                    className="relative z-10 max-h-[220px] w-auto object-contain object-bottom"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </aside>
            </div>

            {/* Popular services strip */}
            <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="mx-auto flex max-w-[1400px] gap-0 overflow-x-auto">
                {popularServices.map((service) => (
                  <a
                    key={service.name}
                    href={service.href}
                    onClick={closeMenus}
                    tabIndex={servicesOpen ? 0 : -1}
                    className="flex min-w-[145px] flex-1 flex-col items-center justify-center gap-2 border-r border-gray-200 px-4 py-2 text-center text-xs font-semibold text-[#c9362d] transition-colors hover:bg-gray-50 sm:min-w-[160px]"
                  >
                    <span aria-hidden="true" className="text-3xl">
                      {service.icon}
                    </span>
                    <span>{service.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

