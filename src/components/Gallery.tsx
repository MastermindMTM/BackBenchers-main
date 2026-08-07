import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

type Photo = {
  src: string;
  caption: string;
};

const PHOTOS: Photo[] = Array.from({ length: 20 }, (_, index) => ({
  src: new URL(`../groups/${index + 1}.jpg`, import.meta.url).href,
  caption: `Group Photo ${index + 1}`,
}));

export default function Gallery() {
  const [slideIndex, setSlideIndex] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (PHOTOS.length <= 1) return;
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % PHOTOS.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="gallery" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="mb-10 text-center">
          <h2
            className={`mt-3 font-display text-5xl tracking-wider text-gray-100 transition-all duration-700 sm:text-6xl ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            BACK BENCHER VIDEO SECTION GALLERY
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-ink-600 bg-ink-950/80 shadow-2xl">
            <img
              src={PHOTOS[slideIndex]?.src}
              alt={PHOTOS[slideIndex]?.caption}
              className="h-[520px] w-full object-cover transition duration-700 ease-out sm:h-[640px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />

            <button
              type="button"
              onClick={() => setSlideIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-ink-950/70 p-3 text-gray-200 transition hover:bg-ink-900/90 hover:text-amber-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setSlideIndex((prev) => (prev + 1) % PHOTOS.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-ink-950/70 p-3 text-gray-200 transition hover:bg-ink-900/90 hover:text-amber-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-6">
            {PHOTOS.map((photo, idx) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setSlideIndex(idx)}
                className={`overflow-hidden rounded-3xl border transition duration-300 ${
                  idx === slideIndex
                    ? 'border-amber-500 shadow-[0_0_0_3px_rgba(251,191,36,0.12)]'
                    : 'border-ink-600 bg-ink-900/80 hover:border-amber-500/50'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="h-20 w-full object-cover transition duration-500 hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

