import { useState, useMemo } from 'react';
import { Search, Quote, Trophy } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

type Classmate = {
  nickname: string;
  realName: string;
  mostLikelyTo: string;
  catchphrase: string;
  accent: 'amber' | 'cyan';
};

const CLASSMATES: Classmate[] = [
  {
    nickname: 'Sleepy',
    realName: 'Arjun Mehta',
    mostLikelyTo: 'Sleep through the apocalypse',
    catchphrase: '“I was NOT sleeping, I was thinking with my eyes closed.”',
    accent: 'amber',
  },
  {
    nickname: 'Snacklord',
    realName: 'Priya Sharma',
    mostLikelyTo: 'Open a vending machine empire',
    catchphrase: '“Lecture’s free, the chips cost extra.”',
    accent: 'cyan',
  },
  {
    nickname: 'Ghost',
    realName: 'Rahul Verma',
    mostLikelyTo: 'Vanish before attendance is taken',
    catchphrase: '“I was here in spirit. Mostly spirit.”',
    accent: 'amber',
  },
  {
    nickname: 'Meme King',
    realName: 'Karan Iyer',
    mostLikelyTo: 'Replace every textbook with memes',
    catchphrase: '“Why study when you can screenshot?”',
    accent: 'cyan',
  },
  {
    nickname: 'Last Minute',
    realName: 'Sneha Reddy',
    mostLikelyTo: 'Finish a project in the corridor',
    catchphrase: '“Deadline? That’s a suggestion, right?”',
    accent: 'amber',
  },
  {
    nickname: 'DJ Backbench',
    realName: 'Vikram Nair',
    mostLikelyTo: 'Host a party in the library',
    catchphrase: '“Shhh… this is a remix, not noise.”',
    accent: 'cyan',
  },
  {
    nickname: 'Professor Whisper',
    realName: 'Ananya Gupta',
    mostLikelyTo: 'Pass on pure gossip alone',
    catchphrase: '“Did you hear what happened in 3B?”',
    accent: 'amber',
  },
  {
    nickname: 'Doodle Master',
    realName: 'Rohit Das',
    mostLikelyTo: 'Sell notebooks as modern art',
    catchphrase: '“That’s not scribbling, it’s abstract notes.”',
    accent: 'cyan',
  },
];

export default function RollCall() {
  const [query, setQuery] = useState('');
  const { ref, inView } = useInView();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLASSMATES;
    return CLASSMATES.filter((c) =>
      [c.nickname, c.realName, c.mostLikelyTo, c.catchphrase]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <section id="rollcall" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="mb-10 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-cyan-400">
            03 — The Legends
          </span>
          <h2
            className={`mt-3 font-display text-5xl tracking-wider text-gray-100 transition-all duration-700 sm:text-6xl ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            ROLL CALL & <span className="text-gradient-amber">QUOTE BOARD</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            The names that echoed from the back row. Search your favourite legend.
          </p>
        </div>

        {/* Search bar */}
        <div className="mx-auto mb-10 max-w-md">
          <div className="group relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-amber-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a nickname, catchphrase..."
              className="w-full rounded-xl border border-ink-600 bg-ink-900/80 py-3.5 pl-12 pr-4 text-gray-200 placeholder-gray-500 outline-none transition-all duration-300 focus:border-amber-500/50 focus:bg-ink-800 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          {filtered.length === 0 && (
            <p className="mt-4 text-center text-sm text-gray-500">
              No legends found. Try another search.
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((c, i) => (
            <ClassmateCard key={c.nickname} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassmateCard({ c, index }: { c: Classmate; index: number }) {
  const isAmber = c.accent === 'amber';
  return (
    <div
      className="group relative"
      style={{ animation: 'fadeUp 0.6s ease-out both', animationDelay: `${index * 0.06}s` }}
    >
      {/* Glow */}
      <div
        className={`absolute -inset-0.5 rounded-2xl opacity-0 blur transition-opacity duration-500 group-hover:opacity-60 ${
          isAmber ? 'bg-amber-500' : 'bg-cyan-500'
        }`}
      />
      <div className="relative h-full rounded-2xl border border-ink-600 bg-ink-900/90 p-6 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">
        {/* Avatar circle */}
        <div className="mb-4 flex items-center justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full font-display text-2xl ${
              isAmber
                ? 'bg-amber-500/15 text-amber-400 ring-2 ring-amber-500/30'
                : 'bg-cyan-500/15 text-cyan-400 ring-2 ring-cyan-500/30'
            }`}
          >
            {c.nickname.charAt(0)}
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isAmber ? 'bg-amber-500/10 text-amber-300' : 'bg-cyan-500/10 text-cyan-300'
            }`}
          >
            #{index + 1}
          </span>
        </div>

        <h3 className="font-display text-2xl tracking-wide text-gray-100">{c.nickname}</h3>
        <p className="mb-4 text-sm text-gray-500">{c.realName}</p>

        {/* Most likely to */}
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-ink-600 bg-ink-800/50 p-3">
          <Trophy
            className={`mt-0.5 h-4 w-4 shrink-0 ${isAmber ? 'text-amber-400' : 'text-cyan-400'}`}
          />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Most Likely To...
            </p>
            <p className="text-sm font-medium text-gray-200">{c.mostLikelyTo}</p>
          </div>
        </div>

        {/* Catchphrase */}
        <div className="flex items-start gap-2">
          <Quote className={`mt-0.5 h-4 w-4 shrink-0 ${isAmber ? 'text-amber-400/70' : 'text-cyan-400/70'}`} />
          <p className="font-hand text-lg leading-snug text-gray-300">{c.catchphrase}</p>
        </div>
      </div>
    </div>
  );
}
