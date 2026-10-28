import Header from './components/Header/Header';
import HeroCarousel from './components/HeroCarousel/HeroCarousel';
import Services from './components/services/Services';
import WhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import GoldLoanSchemes from './components/GoldLoanSchemes/GoldLoanSchemes';
import GoldLoanCalculator from './components/GoldLoanCalculator/GoldLoanCalculator';
import Testimonials from './components/Testimonials/Testimonials';
import NewsAndCSR from './components/NewsMedia/NewsAndCSR';
import Blogs from './components/Blogs/Blogs';
import FAQs from './components/FAQs/FAQs';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import StickyLeadBar from './components/StickyLeadBar/StickyLeadBar';

function App() {
return (
<div className="min-h-screen w-full bg-white">
<Header />

 <main id="home">
    <HeroCarousel />
    <Services />
    <WhyChooseUs />
    <GoldLoanSchemes />
    <GoldLoanCalculator />
    <Testimonials />
    <NewsAndCSR />
    <Blogs />
    <FAQs />
    <Newsletter />
    <Footer />
    <StickyLeadBar /> 
  </main>

 
</div>

);
}

export default App;