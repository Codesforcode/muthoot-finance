import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaGooglePlay, FaApple } from 'react-icons/fa';

// Har column = sections ki list. Pehla section column ka main heading hai.
// plain: true => heading bold nahi, normal weight (screenshot me BLOG, DIGITAL INITIATIVES)
const columns = [
  [
    {
      title: 'SERVICES',
      links: [
        'Gold Loan', 'Housing Finance', 'Personal Loan', 'Small Business Loan',
        'Insurance', 'SME Loan', 'Corporate Business Loan', 'Vehicle Loan',
        'Mutual Funds', 'Money Transfer', 'NCD', 'Custom Offers', 'PAN Card',
        'Micro Finance', 'Digital & Cashless', 'Bank Mapping',
        'Milligram Rewards', 'NPS',
      ],
    },
    {
      title: 'BRAND CAMPAIGNS',
      links: [
        'Kholiye Khushiyon Ki Tijori', 'Big Business Loan',
        'Gold Loan Mela', 'Sunheri Soch',
      ],
    },
  ],
  [
    {
      title: 'TOOLS & CALCULATOR',
      links: [
        'Gold Loan Calculator', 'Personal Loan Calculator',
        'Mutual Fund Calculator', 'CIBIL Score',
      ],
    },
    {
      title: 'NEWS',
      links: [
        'News Board', 'Newsletter', 'Press', 'Ratings',
        'Gold Rate Today', 'Safe Banking Practices',
      ],
    },
    { title: 'BLOG', plain: true, links: ['Fin Shorts'] },
    { title: 'DIGITAL INITIATIVES', plain: true, links: [] },
  ],
  [
    {
      title: 'CORPORATE',
      links: [
        'About Us', 'About Late Shri M. G. GEORGE MUTHOOT', 'Our Directors',
        'New Generation', 'Corporate Ethos', 'Milestones',
        'Social Responsibility', 'In Memoriam', 'Subsidiary',
        'M. G. George Muthoot Cancer Centre',
      ],
    },
    {
      title: 'CUSTOMER SERVICE',
      links: [
        'Customer Service', 'CKYCR Awareness', 'Queries/Feedback/Complaints',
      ],
    },
  ],
  [
    {
      title: 'INVESTORS',
      links: [
        'Annual Reports', 'Financial Reports', 'Shareholders Meetings',
        'Investor Presentation', 'Share Holding Pattern', 'Dividend History',
        'Notice To Investors', 'Share Price', 'Board Committees',
        'Corporate Governance Report', 'Familiarization Program',
        'Board Meeting', 'ESOP Disclosure', 'Notice To Customers', 'IEPF',
        'Other Disclosure', 'Shareholder Details',
        'Disclosures On Liquidity Risk',
      ],
    },
  ],
  [
    {
      title: 'POLICY',
      links: [
        'Fair Practices Code', 'Code Of Conduct', 'Interest Rate Policy',
        'Privacy Policy', 'Vigil Mechanism', 'Policy for Investor',
        'App Disclaimer', 'Auction Policy', 'Loan Policy',
        'Code of Fair Practices', 'Terms and Conditions',
        'Mandate Cancellation', 'RBI Gold Loan Rules', 'Insider Trading Policy',
      ],
    },
    { title: 'SITEMAP', links: [] },
  ],
  [
    {
      title: 'MEDIA',
      links: [
        'Video Gallery', 'Image Gallery', 'Downloads',
        'Awards & Recognition', 'Unique & Amazing Facts',
      ],
    },
    {
      title: 'CONTACT',
      links: ['General Queries', 'NCD Queries', 'Branch Locator'],
      showSocial: true, // is section ke neeche social + app block aayega
    },
  ],
];

// Jin links ka page par section hai unka target
const linkTargets = {
  'Gold Loan': '#gold-loan',
  'Gold Loan Calculator': '#gold-loan',
  'News Board': '#news',
  Newsletter: '#newsletter',
  'Social Responsibility': '#csr',
};

const socialLinks = [
  { label: 'Facebook', Icon: FaFacebookF, url: 'https://www.facebook.com/' },
  { label: 'Twitter', Icon: FaTwitter, url: 'https://twitter.com/' },
  { label: 'YouTube', Icon: FaYoutube, url: 'https://www.youtube.com/' },
  { label: 'Instagram', Icon: FaInstagram, url: 'https://www.instagram.com/' },
];

function FooterLink({ label }) {
  const href = linkTargets[label] || '#';

  return (
    <li>
      <a
        href={href}
        onClick={href === '#' ? (event) => event.preventDefault() : undefined}
        className="text-[13.5px] leading-5 text-white transition-colors hover:text-[#f0c9c5] hover:underline"
      >
        {label}
      </a>
    </li>
  );
}

function SocialAndApp() {
  return (
    <div className="mt-10">
      <h3 className="mb-4 text-[13px] font-bold uppercase text-white">
        Follow us on
      </h3>

      <div className="flex items-center gap-[10px]">
        {socialLinks.map(({ label, Icon, url }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white text-[#2f2f2f] transition hover:bg-gray-200"
          >
            <Icon size={17} />
          </a>
        ))}
      </div>

      <p className="mb-3 mt-6 text-[11px] font-semibold uppercase leading-[20px] text-white">
        Download iMuthoot mobile app
      </p>

      <div className="flex items-center gap-1.5">
        {/* App icon (asli logo ho to <img src="/assets/footer/imuthoot.png"> laga do) */}
        <div className="flex h-[65px] w-[65px] shrink-0 flex-col items-center justify-center rounded-lg bg-[#c9362d] text-white">
          <span className="font-serif text-2xl font-bold italic leading-none">
            iM
          </span>
          <span className="mt-1 text-[10px] font-bold italic">Muthoot</span>
        </div>

        <div className="flex flex-col gap-1">
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noreferrer"
            className="flex h-[30px] w-[93px] items-center gap-1.5 rounded-md border border-gray-500 bg-black px-2 text-white"
          >
            <FaGooglePlay size={13} />
            <span className="text-[8px] leading-[9px]">
              GET IT ON
              <br />
              <span className="text-[11px] font-semibold">Google Play</span>
            </span>
          </a>

          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noreferrer"
            className="flex h-[30px] w-[93px] items-center gap-1.5 rounded-md border border-gray-500 bg-black px-2 text-white"
          >
            <FaApple size={16} />
            <span className="text-[7px] leading-[9px]">
              Download on the
              <br />
              <span className="text-[11px] font-semibold">App Store</span>
            </span>
          </a>
        </div>
      </div>

      <p className="mt-4 text-[13px] uppercase text-white">
        One app many benefits
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="w-full bg-[#404040] font-['Mukta',Arial,Helvetica,sans-serif] text-white"
    >
      {/* Link columns */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-6 gap-y-10 px-5 pb-12 pt-9 sm:grid-cols-3 lg:grid-cols-6">
        {columns.map((sections, columnIndex) => (
          <div key={columnIndex} className="min-w-0">
            {sections.map((section, sectionIndex) => (
              <div key={section.title} className={sectionIndex > 0 ? 'mt-10' : ''}>
                <h3
                  className={`mb-4 text-[13px] uppercase ${
                    section.plain ? 'font-normal' : 'font-bold'
                  }`}
                >
                  {section.title}
                </h3>

                {section.links.length > 0 && (
                  <ul className="space-y-[5px]">
                    {section.links.map((link) => (
                      <FooterLink key={link} label={link} />
                    ))}
                  </ul>
                )}

                {section.showSocial && <SocialAndApp />}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="border-t border-[#7d7d7d]">
        <div className="mx-auto max-w-[1200px] px-5 py-6 text-[11px] leading-[17px] text-white">
          <p>
            Beware of spam mails sent by fraudsters in the name of MUTHOOT
            GROUP/MUTHOOT FINANCE offering loans in Indian Rupee/Foreign
            currencies. Muthoot Finance Ltd Sanctions loans only against pledge
            of gold ornaments. Do not respond to such mails. We will communicate
            you only through the mail ID{' '}
            <a href="mailto:mails@muthootgroup.com" className="font-bold">
              mails@muthootgroup.com
            </a>
          </p>

          <p className="mt-4">
            MUTHOOT FINANCE LTD.
            <br />
            Reg Office: Muthoot Finance Limited, NH Bypass, Palarivattom, Kochi
            - 682028 Kerala, India, CIN: L65910KL1997PLC011300, RBI Regn. No:
            N.16.00167, For{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="font-bold">
              More Info
            </a>
            <br />©{new Date().getFullYear()} All Rights Reserved.{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="font-bold">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;