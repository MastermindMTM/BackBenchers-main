import { useEffect, useState } from 'react';
import { Send, Heart, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { addMessage, loadMessages as loadMessagesFromStore, type FarewellMessage } from '@/lib/supabase';
import { useInView } from '@/hooks/useInView';

export default function Farewell() {
  const { ref, inView } = useInView();
  const [messages, setMessages] = useState<FarewellMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    void loadMessages();
  }, []);

  async function loadMessages() {
    setLoading(true);
    setError(null);

    try {
      const data = await loadMessagesFromStore();
      setMessages(data);
    } catch {
      setError('Could not load messages. Please try again.');
    }

    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    setError(null);

    try {
      const data = await addMessage({
        name: name.trim(),
        nickname: nickname.trim() || null,
        message: message.trim(),
      });

      setMessages((prev) => [data, ...prev]);
      setName('');
      setNickname('');
      setMessage('');
    } catch {
      setError('Could not post your message. Please try again.');
    }

    setSubmitting(false);
  }

  return (
    <section id="farewell" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        {/* Heading */}
        <div ref={ref} className="mb-12 text-center">
          <span className="font-mono text-sm uppercase tracking-[0.3em] text-amber-400">
            04 — The Goodbye
          </span>
          <h2
            className={`mt-3 font-display text-5xl tracking-wider text-gray-100 transition-all duration-700 sm:text-6xl ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            FAREWELL <span className="text-gradient-cyan">MESSAGE BOARD</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Leave a note for the back row. It stays here forever — or until the internet dies.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-ink-600 bg-ink-900/80 p-6 backdrop-blur-sm sm:p-7">
              <div className="mb-5 flex items-center gap-2">
                <Send className="h-5 w-5 text-amber-400" />
                <h3 className="font-display text-xl tracking-wide text-gray-100">
                  Drop Your Note
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Field label="Your Name" required>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={60}
                    placeholder="e.g. Jordan Lee"
                    className="input-base"
                  />
                </Field>

                <Field label="Nickname">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={40}
                    placeholder="e.g. The Sleepy One"
                    className="input-base"
                  />
                </Field>

                <Field label="Your Farewell Note" required>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={400}
                    rows={4}
                    placeholder="Write something the back row will remember..."
                    className="input-base resize-none"
                  />
                </Field>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3.5 text-base font-semibold text-ink-950 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-amber-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                  Post Farewell
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Message list */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex h-64 items-center justify-center text-gray-500">
                <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
              </div>
            ) : messages.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="space-y-4">
                <p className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                  <MessageSquare className="h-4 w-4 text-amber-400" />
                  {messages.length} {messages.length === 1 ? 'note' : 'notes'} on the board
                </p>
                {messages.map((m, i) => (
                  <MessageCard key={m.id} m={m} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
        {label} {required && <span className="text-amber-400">*</span>}
      </label>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-ink-600 text-center">
      <MessageSquare className="mb-3 h-10 w-10 text-gray-600" />
      <p className="font-display text-xl tracking-wide text-gray-400">The board is empty</p>
      <p className="mt-1 text-sm text-gray-600">Be the first to leave a farewell note.</p>
    </div>
  );
}

function MessageCard({ m, index }: { m: FarewellMessage; index: number }) {
  const accents = ['amber', 'cyan'] as const;
  const accent = accents[index % accents.length];
  const isAmber = accent === 'amber';

  return (
    <div
      className="group relative rounded-2xl border border-ink-600 bg-ink-900/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-ink-800/60"
      style={{ animation: 'fadeUp 0.5s ease-out both', animationDelay: `${index * 0.05}s` }}
    >
      <div
        className={`absolute left-0 top-5 h-12 w-1 rounded-r-full ${
          isAmber ? 'bg-amber-500' : 'bg-cyan-500'
        }`}
      />
      <div className="pl-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                isAmber ? 'bg-amber-500/15 text-amber-400' : 'bg-cyan-500/15 text-cyan-400'
              }`}
            >
              {m.name.charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="font-semibold text-gray-100">{m.name}</p>
              {m.nickname && (
                <p className={`font-hand text-base leading-none ${isAmber ? 'text-amber-300' : 'text-cyan-300'}`}>
                  “{m.nickname}”
                </p>
              )}
            </div>
          </div>
          <Heart className="h-4 w-4 text-gray-600 transition-colors group-hover:text-amber-400" />
        </div>
        <p className="text-gray-300 leading-relaxed">{m.message}</p>
        <p className="mt-3 text-xs text-gray-600">{formatDate(m.created_at)}</p>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
