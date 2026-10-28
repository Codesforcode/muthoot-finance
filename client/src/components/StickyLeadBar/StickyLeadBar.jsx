import { useState, useEffect, useMemo } from 'react';
import { ChevronDown, ChevronUp, RefreshCw, X, Check } from 'lucide-react';

const services = [
  'Gold Loan',
  'Personal Loan',
  'Housing Finance',
  'Small Business Loan',
  'Vehicle Loan',
  'Insurance',
  'Mutual Funds',
  'Money Transfer',
];

const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const makeCaptcha = () =>
  Array.from(
    { length: 6 },
    () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)],
  ).join('');

const fieldClass =
  'w-full border-0 border-b border-white/80 bg-transparent px-0 py-1 text-[14px] text-white outline-none placeholder:text-white/90';

const errorClass = 'mt-1 min-h-[13px] text-[11px] leading-none text-white';

function StickyLeadBar() {
  const [visible, setVisible] = useState(false); // pehli baar slide-up
  const [minimized, setMinimized] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tried, setTried] = useState(false);

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    pincode: '',
    service: '',
    captcha: '',
  });
  const [agreed, setAgreed] = useState(true);
  const [captchaCode, setCaptchaCode] = useState(makeCaptcha);

  // Website open hone ke thodi der baad bar upar aaye
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const captchaChars = useMemo(
    () =>
      captchaCode.split('').map((char, i) => ({
        char: i % 2 ? char.toLowerCase() : char,
        rotate: Math.floor(Math.random() * 30) - 15,
        y: Math.floor(Math.random() * 6) - 3,
      })),
    [captchaCode],
  );

  const errors = {
    name: !form.name.trim() ? 'Please enter Name!' : '',
    mobile: !/^[6-9]\d{9}$/.test(form.mobile)
      ? 'Please enter Phone number!'
      : '',
    pincode: !/^\d{6}$/.test(form.pincode) ? 'Please enter Pincode!' : '',
    service: !form.service ? 'Please select Service!' : '',
    captcha:
      form.captcha.toUpperCase() !== captchaCode
        ? 'Please enter correct captcha!'
        : '',
  };

  const hasErrors = Object.values(errors).some(Boolean) || !agreed;

  const update = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const refreshCaptcha = () => {
    setCaptchaCode(makeCaptcha());
    setForm((prev) => ({ ...prev, captcha: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTried(true);

    if (hasErrors) return;

    // Yahan apni API call lagao
    setSubmitted(true);
    setTimeout(() => setMinimized(true), 2500);
  };

  const showBar = visible && !minimized;

  return (
    <>
      {/* Main bar */}
      <div
        role="region"
        aria-label="Help us serve you better"
        aria-hidden={!showBar}
        className={`fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] overflow-y-auto bg-[#c0352c] font-['Mukta',Arial,Helvetica,sans-serif] text-white transition-transform duration-500 ease-out ${
          showBar
            ? 'translate-y-0 shadow-[0_-3px_10px_rgba(0,0,0,0.25)]'
            : 'translate-y-full'
        }`}
      >
        {/* Minimize */}
        <button
          type="button"
          aria-label="Minimize"
          onClick={() => setMinimized(true)}
          className="absolute right-3 top-2.5 z-10 text-white hover:opacity-80"
        >
          <X size={18} strokeWidth={3} />
        </button>

        {submitted ? (
          <p className="px-5 py-4 text-center text-base font-semibold">
            Thank you! Our team will contact you shortly.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto grid max-w-[1500px] grid-cols-1 gap-x-6 gap-y-2 px-4 py-2.5 pr-10 sm:grid-cols-2 lg:grid-cols-[130px_repeat(3,minmax(0,1fr))_minmax(0,1fr)_minmax(0,1.3fr)_auto] lg:items-start"
          >
            {/* Heading */}
            <h2 className="text-[15px] font-bold uppercase leading-[18px] sm:col-span-2 lg:col-span-1 lg:row-span-2">
              Help us serve you better
            </h2>

            {/* Name */}
            <div>
              <input
                className={fieldClass}
                name="name"
                value={form.name}
                onChange={update}
                placeholder="Name*"
                autoComplete="name"
                aria-label="Name"
              />
              <p className={errorClass}>{tried && errors.name}</p>
            </div>

            {/* Mobile */}
            <div>
              <input
                className={fieldClass}
                name="mobile"
                value={form.mobile}
                onChange={update}
                placeholder="Mobile*"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel"
                aria-label="Mobile number"
              />
              <p className={errorClass}>{tried && errors.mobile}</p>
            </div>

            {/* Pincode */}
            <div>
              <input
                className={fieldClass}
                name="pincode"
                value={form.pincode}
                onChange={update}
                placeholder="Pincode*"
                inputMode="numeric"
                maxLength={6}
                aria-label="Pincode"
              />
              <p className={errorClass}>{tried && errors.pincode}</p>
            </div>

            {/* Service */}
            <div>
              <div className="relative border-b border-white/80">
                <select
                  name="service"
                  value={form.service}
                  onChange={update}
                  aria-label="Select service"
                  className={`w-full cursor-pointer appearance-none border-0 bg-transparent px-0 py-1 pr-6 text-[14px] outline-none ${
                    form.service ? 'text-white' : 'text-white/90'
                  }`}
                >
                  <option value="" className="text-black">
                    Select Service
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service} className="text-black">
                      {service}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={15}
                  strokeWidth={3}
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2"
                />
              </div>
              <p className={errorClass}>{tried && errors.service}</p>
            </div>

            {/* Captcha: input + image + refresh ek hi row me */}
            <div>
              <div className="flex items-end gap-2">
                <input
                  className={`${fieldClass} min-w-0 flex-1`}
                  name="captcha"
                  value={form.captcha}
                  onChange={update}
                  placeholder="Enter Captcha"
                  aria-label="Enter captcha text"
                  autoComplete="off"
                />

                <span className="relative flex h-[30px] w-[96px] shrink-0 select-none items-center justify-center overflow-hidden border border-white/40 bg-[repeating-linear-gradient(165deg,#ffffff,#ffffff_5px,#e8e8e8_6px,#ffffff_7px)]">
                  {captchaChars.map((item, i) => (
                    <span
                      key={i}
                      style={{
                        transform: `translateY(${item.y}px) rotate(${item.rotate}deg)`,
                      }}
                      className="inline-block font-serif text-[13px] font-bold italic tracking-[1px] text-[#333333]"
                    >
                      {item.char}
                    </span>
                  ))}

                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <line x1="0" y1="9" x2="100%" y2="20" stroke="#6b7a8a" strokeWidth="1" />
                    <line x1="0" y1="20" x2="100%" y2="8" stroke="#8a6b6b" strokeWidth="1" />
                  </svg>
                </span>

                <button
                  type="button"
                  onClick={refreshCaptcha}
                  aria-label="Refresh captcha"
                  className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded border border-white/40 bg-white text-[#333333] hover:bg-gray-100"
                >
                  <RefreshCw size={14} />
                </button>
              </div>
              <p className={errorClass}>{tried && errors.captcha}</p>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 lg:col-span-1 lg:pr-2">
              <button
                type="submit"
                className="h-[32px] rounded-full border border-white/60 bg-[#b5573f] px-6 text-[14px] font-bold uppercase text-white/80 transition hover:bg-[#9e3f2a] hover:text-white"
              >
                Submit
              </button>
            </div>

            {/* Terms */}
            <div className="sm:col-span-2 lg:col-span-6 lg:col-start-2">
              <label className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-semibold">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => setAgreed(event.target.checked)}
                  className="peer sr-only"
                />

                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 border-white text-[#c0352c] peer-checked:bg-white">
                  <Check size={10} strokeWidth={4} />
                </span>

                <span>
                  By clicking, you agree to our{' '}
                  <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="font-bold underline"
                  >
                    Terms and Policies
                  </a>
                </span>
              </label>

              {tried && !agreed && (
                <p className="mt-1 text-[11px]">
                  Please accept the Terms and Policies.
                </p>
              )}
            </div>
          </form>
        )}
      </div>

      {/* Minimized tab: bar chhup jaane par ye dikhta hai */}
      <button
        type="button"
        onClick={() => setMinimized(false)}
        aria-label="Open help us serve you better form"
        className={`fixed bottom-0 left-4 z-[70] flex items-center gap-2 rounded-t-lg bg-[#c0352c] px-4 py-2 font-['Mukta',Arial,Helvetica,sans-serif] text-[13px] font-bold uppercase text-white shadow-[0_-2px_8px_rgba(0,0,0,0.25)] transition-all duration-500 hover:bg-[#a52a24] ${
          visible && minimized
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-full opacity-0'
        }`}
      >
        Help us serve you better
        <ChevronUp size={16} strokeWidth={3} />
      </button>
    </>
  );
}

export default StickyLeadBar;