import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-ink-700 bg-ink-950">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <button onClick={() => scrollTo('#hero')} className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-ink-950 shadow-lg transition-transform group-hover:scale-110">
              <GraduationCap className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="font-display text-2xl tracking-wider text-gray-100">
              BACK<span className="text-gradient-amber">BENCHERS</span>
            </span>
          </button>

          <p className="max-w-md text-sm text-gray-500">
            "First benchers create notes, but backbenchers create memories. 💥
Though the classes have ended, our bond never will. 🔥"
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {[
              { label: 'The Movie', href: '#movie' },
              { label: 'Gallery', href: '#gallery' },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-gray-500 transition-colors hover:text-amber-400"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-600">
            Made with <Heart className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> by the back row
          </div>
        </div>
      </div>
    </footer>
  );
}
