import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';

const states = [
  'Andhra Pradesh',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
];

const goldTypes = [
  { label: '22 Carat Gold', value: '22', rate: 6500 },
  { label: '24 Carat Gold', value: '24', rate: 7100 },
  { label: '18 Carat Gold', value: '18', rate: 5300 },
];

function GoldLoanCalculator() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    state: '',
    pinCode: '',
    goldType: '',
    amount: '',
    captcha: '',
  });

  const [captchaCode, setCaptchaCode] = useState('MYSKTA');
  const [requiredGold, setRequiredGold] = useState(null);
  const [error, setError] = useState('');

  // Captcha ke har letter ko random tilt aur upar-neeche shift
  const captchaChars = useMemo(
    () =>
      captchaCode.split('').map((char, i) => ({
        char: i % 2 ? char.toLowerCase() : char,
        rotate: Math.floor(Math.random() * 30) - 15,
        y: Math.floor(Math.random() * 8) - 4,
      })),
    [captchaCode],
  );

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
  };

  const refreshCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    const newCode = Array.from(
      { length: 6 },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join('');

    setCaptchaCode(newCode);
    setForm((previous) => ({ ...previous, captcha: '' }));
  };

  const calculateGold = (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !/^[6-9]\d{9}$/.test(form.contact) ||
      !form.state ||
      !/^\d{6}$/.test(form.pinCode) ||
      !form.goldType ||
      !form.amount ||
      Number(form.amount) <= 0
    ) {
      setError('Please fill in all fields with valid details.');
      return;
    }

    if (form.captcha.toUpperCase() !== captchaCode) {
      setError('Captcha does not match. Please try again.');
      return;
    }

    const selectedGold = goldTypes.find((gold) => gold.value === form.goldType);

    const estimatedWeight = Number(form.amount) / selectedGold.rate;

    setRequiredGold(estimatedWeight.toFixed(2));
    setError('');
  };

  const inputClass =
    'w-full border-0 border-b border-[#c9c9c9] bg-transparent px-0 py-3 text-[15px] text-[#333333] outline-none placeholder:text-[#666666] focus:border-[#c9362d]';

  return (
    <section className="w-full overflow-hidden bg-white px-5 py-12 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-[1500px]">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold tracking-wide text-[#171717] sm:text-[29px]">
            GOLD LOAN CALCULATOR
          </h2>

          <p className="mt-4 text-base text-[#222222] sm:text-lg">
            Calculate your eligibility for a gold loan by Muthoot Finance.
          </p>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.9fr] lg:gap-12">
          {/* Left: photo + video */}
          <div className="flex min-h-[300px] items-end justify-center lg:min-h-[470px]">
            <img
              src="/public/assets/gold-calculator/Amitabh-bachhan.webp"
              alt="Brand ambassador"
              className="relative z-10 -mr-8 h-[300px] w-auto shrink-0 object-contain sm:h-[380px] lg:-mr-14 lg:h-[470px]"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />

            <video
              className="max-h-[470px] w-[72%] object-contain"
              src="/public/videos/solidgold.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Gold and money balance illustration"
            />
          </div>

          {/* Calculator form */}
          <div className="w-full max-w-[620px] justify-self-center lg:justify-self-end">
            <form onSubmit={calculateGold} noValidate>
              <div className="grid grid-cols-1 gap-x-9 gap-y-6 sm:grid-cols-2">
                <input
                  className={inputClass}
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Name*"
                  autoComplete="name"
                  aria-label="Name"
                />

                <input
                  className={inputClass}
                  name="contact"
                  value={form.contact}
                  onChange={updateField}
                  placeholder="Contact No.*"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  autoComplete="tel"
                  aria-label="Contact number"
                />

                <select
                  className={`${inputClass} cursor-pointer`}
                  name="state"
                  value={form.state}
                  onChange={updateField}
                  aria-label="Select state"
                >
                  <option value="">Select State</option>

                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <input
                  className={inputClass}
                  name="pinCode"
                  value={form.pinCode}
                  onChange={updateField}
                  placeholder="Pin Code*"
                  inputMode="numeric"
                  maxLength={6}
                  aria-label="PIN code"
                />

                <select
                  className={`${inputClass} cursor-pointer`}
                  name="goldType"
                  value={form.goldType}
                  onChange={updateField}
                  aria-label="Gold type"
                >
                  <option value="">Gold Type</option>

                  {goldTypes.map((gold) => (
                    <option key={gold.value} value={gold.value}>
                      {gold.label}
                    </option>
                  ))}
                </select>

                <input
                  className={inputClass}
                  name="amount"
                  value={form.amount}
                  onChange={updateField}
                  placeholder="Amount you require (INR)"
                  type="number"
                  min="1"
                  aria-label="Required loan amount in INR"
                />
              </div>

              {/* Gold weight + captcha */}
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-bold text-[#333333]">
                    Required Gold (gm)
                  </p>

                  <p
                    className={`mt-3 text-lg font-semibold ${
                      requiredGold !== null
                        ? 'text-[#c9362d]'
                        : 'text-[#555555]'
                    }`}
                    aria-live="polite"
                  >
                    {requiredGold !== null
                      ? `${requiredGold} gm`
                      : 'Weight of Gold (gm)'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-[43px] flex-1 select-none items-center justify-center overflow-hidden border border-[#dddddd] bg-[repeating-linear-gradient(165deg,#ffffff,#ffffff_5px,#e8e8e8_6px,#ffffff_7px)]">
                      {captchaChars.map((item, i) => (
                        <span
                          key={i}
                          style={{
                            transform: `translateY(${item.y}px) rotate(${item.rotate}deg)`,
                          }}
                          className="inline-block font-serif text-xl font-bold italic tracking-[3px] text-[#333333]"
                        >
                          {item.char}
                        </span>
                      ))}

                      {/* Cut lines */}
                      <svg
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        aria-hidden="true"
                      >
                        <line
                          x1="0"
                          y1="14"
                          x2="100%"
                          y2="30"
                          stroke="#6b7a8a"
                          strokeWidth="1"
                        />
                        <line
                          x1="0"
                          y1="32"
                          x2="100%"
                          y2="12"
                          stroke="#8a6b6b"
                          strokeWidth="1"
                        />
                      </svg>
                    </span>

                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      aria-label="Refresh captcha"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-[#cccccc] text-[#555555] hover:bg-gray-100"
                    >
                      <RefreshCw size={17} />
                    </button>
                  </div>

                  <input
                    className={`${inputClass} mt-2`}
                    name="captcha"
                    value={form.captcha}
                    onChange={updateField}
                    placeholder="Enter the text you see above"
                    aria-label="Enter captcha text"
                    autoComplete="off"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-600" role="alert">
                  {error}
                </p>
              )}

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="rounded-full bg-[#d78a80] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c9362d]"
                >
                  CALCULATE
                </button>
              </div>

              <p className="mt-6 text-center text-xs leading-6 text-[#222222] sm:text-sm">
                #Note: This is an approximate value. The final value depends on
                the gold valuation done at the branch.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoldLoanCalculator;