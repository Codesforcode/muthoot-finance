import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const testimonials = [
{
title: 'Maharashtra Speaks',
image: '/public/assets/testimonials/maharashtra-speaks.webp',
videoUrl: '',
},
{
title: 'Words From Gujarat',
image: '/public/assets/testimonials/words-from-gujarat.webp',
videoUrl: '',
},
{
title: 'Kamla Devi',
image: '/public/assets/testimonials/kamla-devi.webp',
videoUrl: '',
},
{
title: 'Customer Stories',
image: '/public/assets/testimonials/testimonial-4.webp',
videoUrl: '',
},
];

function Testimonials() {
const [activeIndex, setActiveIndex] = useState(0);
const [selectedVideo, setSelectedVideo] = useState(null);

const visibleTestimonials = [0, 1, 2].map(
(offset) => testimonials[(activeIndex + offset) % testimonials.length],
);

const previousSlide = () => {
setActiveIndex(
(current) => (current - 1 + testimonials.length) % testimonials.length,
);
};

const nextSlide = () => {
setActiveIndex((current) => (current + 1) % testimonials.length);
};

return (
<section className="relative w-full overflow-hidden bg-[#f7f7f7] px-5 py-10 sm:px-8 sm:py-12">
{/* Heading */}
<div className="mb-12 text-center">
<h2 className="text-3xl font-bold text-black sm:text-[38px]">
What Our Customers Have To Say
</h2>

    <p className="mt-4 text-base text-[#171717] sm:text-xl">
      Hear from our satisfied customers from around the globe.
    </p>
  </div>

  {/* Decorative quotation marks */}
  <span
    aria-hidden="true"
    className="pointer-events-none absolute left-3 top-[145px] hidden font-serif text-[110px] font-bold leading-none text-black xl:block"
  >
    “
  </span>

  <span
    aria-hidden="true"
    className="pointer-events-none absolute right-3 top-[145px] hidden font-serif text-[110px] font-bold leading-none text-black xl:block"
  >
    ”
  </span>

  {/* Carousel */}
  <div className="relative mx-auto max-w-[1350px]">
    <button
      type="button"
      aria-label="Previous testimonials"
      onClick={previousSlide}
      className="absolute -left-4 top-[38%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#c9362d] text-white shadow-lg transition hover:bg-[#a9231d] sm:-left-5"
    >
      <ChevronLeft size={25} />
    </button>

    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {visibleTestimonials.map((testimonial, index) => (
        <article key={`${testimonial.title}-${index}`} className="min-w-0">
          {/* Video thumbnail */}
          <div className="relative aspect-[1.5/1] overflow-hidden rounded-[15px] border border-[#d5d5d5] bg-black">
            <img
              src={testimonial.image}
              alt={testimonial.title}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />

            <button
              type="button"
              aria-label={`Play ${testimonial.title} video`}
              onClick={() => setSelectedVideo(testimonial)}
              className="absolute left-1/2 top-1/2 flex h-[66px] w-[66px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-md transition hover:scale-105"
            >
              <Play size={28} fill="currentColor" className="ml-1" />
            </button>
          </div>

          <h3 className="mt-7 text-center text-xl font-bold text-[#303030] sm:text-2xl">
            {testimonial.title}
          </h3>
        </article>
      ))}
    </div>

    <button
      type="button"
      aria-label="Next testimonials"
      onClick={nextSlide}
      className="absolute -right-4 top-[38%] z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#c9362d] text-white shadow-lg transition hover:bg-[#a9231d] sm:-right-5"
    >
      <ChevronRight size={25} />
    </button>
  </div>

  {/* Carousel dots */}
  <div className="mt-12 flex items-center justify-center gap-4">
    {testimonials.map((testimonial, index) => (
      <button
        key={testimonial.title}
        type="button"
        onClick={() => setActiveIndex(index)}
        aria-label={`Show testimonial ${index + 1}`}
        aria-current={activeIndex === index ? 'true' : undefined}
        className={`h-[17px] w-[17px] rounded-full transition-colors ${
          activeIndex === index
            ? 'bg-[#c9362d]'
            : 'bg-[#999999] hover:bg-[#666666]'
        }`}
      />
    ))}
  </div>

  {/* Video dialog */}
  {selectedVideo && (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5"
      role="dialog"
      aria-modal="true"
      aria-label={selectedVideo.title}
      onClick={() => setSelectedVideo(null)}
    >
      <div
        className="w-full max-w-4xl rounded-lg bg-white p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="font-bold">{selectedVideo.title}</h3>

          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="rounded px-3 py-1 text-sm font-semibold text-[#c9362d] hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        {selectedVideo.videoUrl ? (
          <video
            src={selectedVideo.videoUrl}
            controls
            autoPlay
            className="max-h-[70vh] w-full bg-black"
          />
        ) : (
          <p className="py-10 text-center text-gray-600">
            Video URL abhi add nahi kiya gaya hai. Original video ka URL
            milne par yahan integrate karenge.
          </p>
        )}
      </div>
    </div>
  )}
</section>

);
}

export default Testimonials;