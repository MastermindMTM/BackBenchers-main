import { useEffect, useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'The Movie', href: '#movie' },
  { label: 'Gallery', href: '#gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-amber-500/10 bg-ink-950/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <button
          onClick={() => handleClick('#hero')}
          className="group flex items-center gap-2.5"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-ink-950 shadow-lg transition-transform duration-300 group-hover:scale-110">
            <GraduationCap className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="font-display text-2xl tracking-wider text-gray-100 transition-colors group-hover:text-amber-400">
            BACK<span className="text-gradient-amber">BENCHERS</span>
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="group relative rounded-lg px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:text-amber-400"
            >
              {link.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-amber-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-600 text-gray-300 transition-colors hover:border-amber-500/40 hover:text-amber-400 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-amber-500/10 bg-ink-950/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-5 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="rounded-lg px-4 py-3 text-left text-base font-medium text-gray-400 transition-colors hover:bg-ink-800 hover:text-amber-400"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
