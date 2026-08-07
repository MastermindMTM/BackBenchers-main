import { Play, ArrowDown, Images, Sparkles } from 'lucide-react';

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/60 to-ink-950" />

      {/* Glow orbs */}
      <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-amber-500/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse-glow" />

      {/* Floating decorative caps */}
      <div className="absolute left-[8%] top-[20%] hidden animate-float lg:block">
        <Sparkles className="h-6 w-6 text-amber-400/40" />
      </div>
      <div className="absolute right-[12%] top-[30%] hidden animate-float lg:block" style={{ animationDelay: '1.5s' }}>
        <Sparkles className="h-8 w-8 text-cyan-400/40" />
      </div>
      <div className="absolute left-[15%] bottom-[25%] hidden animate-float lg:block" style={{ animationDelay: '3s' }}>
        <Sparkles className="h-5 w-5 text-amber-400/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        {/* Title */}
        <h1
          className="font-display text-7xl leading-none tracking-wider text-gray-100 sm:text-8xl md:text-9xl lg:text-[11rem]"
          style={{ animation: 'fadeUp 0.8s ease-out 0.15s both' }}
        >
          <span className="shimmer-text animate-shimmer">BACKBENCHERS</span>
        </h1>

        {/* Subtitle */}
        <p
          className="mx-auto mt-6 max-w-2xl text-lg font-medium text-gray-400 sm:text-xl md:text-2xl"
          style={{ animation: 'fadeUp 0.8s ease-out 0.3s both' }}
        >
          First bencher create notes but 💥💥 <br /> Last benchers create memories 🔥🔥
        </p>

        {/* Buttons */}
        <div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animation: 'fadeUp 0.8s ease-out 0.45s both' }}
        >
          <button
            onClick={() => scrollTo('#movie')}
            className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 text-base font-semibold text-ink-950 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-amber-500/40"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            <Play className="h-5 w-5 fill-current" />
            Watch The Movie 🍿
          </button>
          <button
            onClick={() => scrollTo('#gallery')}
            className="group flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 px-8 py-4 text-base font-semibold text-cyan-300 transition-all duration-300 hover:scale-105 hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:shadow-cyan-500/20"
          >
            <Images className="h-5 w-5" />
            Explore Memories
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('#movie')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 transition-colors hover:text-amber-400"
        style={{ animation: 'fadeUp 0.8s ease-out 0.6s both' }}
        aria-label="Scroll down"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
}
