import { Film, Clapperboard, Users, Clock } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export default function VideoSection() {
  const { ref, inView } = useInView();

  return (
    <section id="movie" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="mb-12 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
            A special Video for the Backbenchers
          </span>
          <h2
            className={`mt-3 font-display text-5xl tracking-wider text-gray-100 transition-all duration-700 sm:text-6xl ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            THE FINAL <span className="text-gradient-amber">CHAPTER</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            A small token of Gratitude for the Backbenchers who made the last row the most memorable one. This is a special video dedicated to all the legends of the back row, capturing the essence of our journey together.  
          </p>
        </div>

        {/* Video frame */}
        <div
          className={`group relative transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Glow border */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-500 opacity-60 blur-lg transition-opacity duration-500 group-hover:opacity-100" />

          {/* Corner accents */}
          <div className="absolute -left-3 -top-3 h-8 w-8 border-l-2 border-t-2 border-amber-400 rounded-tl-lg" />
          <div className="absolute -right-3 -top-3 h-8 w-8 border-r-2 border-t-2 border-cyan-400 rounded-tr-lg" />
          <div className="absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
          <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg" />

          <div className="relative overflow-hidden rounded-2xl bg-ink-900 shadow-2xl">
            <div className="relative aspect-video w-full">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/rfG0h6US_bY"
                title="The Final Chapter - Backbenchers Official Aftermovie"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Description card */}
        <div
          className={`mt-8 transition-all delay-200 duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="rounded-2xl border border-ink-600 bg-ink-900/80 p-6 backdrop-blur-sm sm:p-8">
            <div className="mb-4 flex items-start gap-3">
              <Film className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
              <h3 className="font-display text-2xl tracking-wide text-gray-100">
                The Final Chapter — Backbenchers Official 
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <InfoCard icon={<Clapperboard className="h-4 w-4" />} label="Directed by">
                <p className="text-gray-200">The Back Row Collective</p>
              </InfoCard>
              <InfoCard icon={<Users className="h-4 w-4" />} label="Cast">
                <p className="text-gray-200">The Entire Last Bench</p>
                <p className="text-sm text-gray-500">Featuring Every Back Benchers</p>
              </InfoCard>
              <InfoCard icon={<Clock className="h-4 w-4" />} label="Runtime">
                <p className="text-gray-200">5 min 27 sec</p>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-ink-600 bg-ink-800/60 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-amber-400">
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}
