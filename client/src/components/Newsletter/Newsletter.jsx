import { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    // Yahan apni API call lagao (backend ya Mailchimp etc.)
    setStatus({ type: 'success', message: 'Thank you for subscribing!' });
    setEmail('');
  };

  return (
    <section
      id="newsletter"
      className="w-full bg-white px-5 py-10 font-['Mukta',Arial,Helvetica,sans-serif] sm:px-8 sm:py-12"
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <h2 className="mb-5 text-2xl font-bold uppercase text-black sm:text-[28px]">
          Subscribe to our Newsletter
        </h2>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto flex w-full max-w-[600px] overflow-hidden rounded-[5px] shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
        >
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus({ type: '', message: '' });
            }}
            placeholder="E-Mail"
            aria-label="Email address"
            autoComplete="email"
            className="h-[55px] min-w-0 flex-1 rounded-l-[5px] border border-r-0 border-[#c0392b] bg-white px-[18px] text-base text-[#333333] outline-none placeholder:text-[#444444]"
          />

          <button
            type="submit"
            className="h-[55px] shrink-0 bg-[#c0392b] px-8 text-base font-bold uppercase text-white transition-colors hover:bg-[#a52a24] sm:px-9"
          >
            Submit
          </button>
        </form>

        {status.message && (
          <p
            role={status.type === 'error' ? 'alert' : 'status'}
            className={`mt-3 text-sm ${
              status.type === 'error' ? 'text-red-600' : 'text-green-700'
            }`}
          >
            {status.message}
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;