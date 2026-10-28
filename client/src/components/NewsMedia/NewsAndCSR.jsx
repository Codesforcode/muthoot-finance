import NewsMedia from './NewsMedia';
import CSR from '../CSR/CSR';

function NewsAndCSR() {
return (
<section className="w-full bg-white px-5 py-10 sm:px-8 lg:py-14">
<div className="mx-auto grid max-w-[1220px] grid-cols-1 items-start gap-10 lg:grid-cols-[1.7fr_0.9fr] lg:gap-9">
<NewsMedia />
<CSR />
</div>
</section>
);
}

export default NewsAndCSR;