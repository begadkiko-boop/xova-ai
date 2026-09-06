import { useState } from 'react';
import {
  Search,
  ChevronDown,
  Mail,
  FileText,
  MessageSquare,
  LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import { faqData } from '@/data/demoData';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function HelpView() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="flex h-full flex-col">
      {/* Hero + search */}
      <div className="shrink-0 border-b border-white/[0.06]">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-xova-400 to-xova-600 shadow-glow">
            <LifeBuoy className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            How can we help?
          </h2>
          <p className="mt-2 text-sm text-ink-400">
            Search our knowledge base or browse common questions below.
          </p>
          <div className="relative mt-6">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles…"
              className="w-full rounded-2xl border border-white/[0.06] bg-ink-900/60 py-3.5 pl-12 pr-4 text-sm text-ink-100 placeholder:text-ink-500 focus:border-xova-500/40 focus:outline-none shadow-float"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 sm:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Quick links */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <QuickLink
              icon={FileText}
              title="Documentation"
              description="Guides and references"
            />
            <QuickLink
              icon={MessageSquare}
              title="Community"
              description="Ask other users"
            />
            <QuickLink
              icon={Mail}
              title="Contact Support"
              description="Email our team"
            />
          </div>

          {/* FAQ */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-500">
              Frequently Asked Questions
            </h3>
            {filtered.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <p className="text-sm text-ink-400">
                  No results for "{search}". Try a different search or contact support.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filtered.map((cat) => (
                  <div key={cat.category}>
                    <h4 className="mb-2 text-sm font-medium text-ink-300">
                      {cat.category}
                    </h4>
                    <div className="glass-card divide-y divide-white/[0.04] overflow-hidden">
                      {cat.items.map((item) => {
                        const id = `${cat.category}-${item.q}`;
                        const isOpen = openId === id;
                        return (
                          <div key={id}>
                            <button
                              onClick={() => setOpenId(isOpen ? null : id)}
                              className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-white/[0.02]"
                            >
                              <span className="text-sm font-medium text-ink-100">
                                {item.q}
                              </span>
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 shrink-0 text-ink-500 transition-transform',
                                  isOpen && 'rotate-180'
                                )}
                              />
                            </button>
                            <div
                              className={cn(
                                'grid transition-all duration-300',
                                isOpen
                                  ? 'grid-rows-[1fr] opacity-100'
                                  : 'grid-rows-[0fr] opacity-0'
                              )}
                            >
                              <div className="overflow-hidden">
                                <p className="px-4 pb-4 text-sm text-ink-400 leading-relaxed">
                                  {item.a}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact card */}
          <div className="glass-card p-6 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-xova-500/10">
              <Mail className="h-6 w-6 text-xova-400" />
            </div>
            <h3 className="text-base font-semibold text-white">
              Still need help?
            </h3>
            <p className="mt-1 text-sm text-ink-400">
              Our support team typically responds within one business day.
            </p>
            <Button variant="primary" className="mt-4 gap-2 mx-auto">
              Contact Support <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickLink({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
}) {
  return (
    <button className="group glass-card p-4 text-left transition-all hover:border-white/12 hover:bg-ink-900/60 hover:shadow-float hover:-translate-y-0.5">
      <div className="mb-2.5 grid h-10 w-10 place-items-center rounded-xl bg-ink-800/60 text-xova-400 transition-transform group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-0.5 text-xs text-ink-500">{description}</p>
    </button>
  );
}
