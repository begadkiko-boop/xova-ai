import {
  LayoutTemplate,
  ScanEye,
  PenLine,
  Code2,
  Telescope,
  Sparkles,
} from 'lucide-react';
import { suggestionCards } from '@/data/demoData';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutTemplate,
  ScanEye,
  PenLine,
  Code2,
  Telescope,
  Sparkles,
};

interface ChatEmptyStateProps {
  onSuggestionClick?: (title: string) => void;
}

export function ChatEmptyState({ onSuggestionClick }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
      {/* Hero */}
      <div className="relative mb-8 text-center">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-32 w-32 rounded-full bg-xova-500/10 blur-3xl" />
        <div className="relative">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-xova-400 to-xova-600 shadow-glow-lg">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Meet <span className="gradient-text">XOVA AI</span>
          </h2>
          <p className="mt-3 max-w-md text-balance text-base text-ink-400 leading-relaxed">
            One intelligent workspace for your ideas, work, creativity, and
            code.
          </p>
        </div>
      </div>

      {/* Suggestion cards */}
      <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {suggestionCards.map((card, i) => {
          const Icon = iconMap[card.icon];
          return (
            <button
              key={card.id}
              onClick={() => onSuggestionClick?.(card.title)}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group glass-card p-4 text-left transition-all duration-300 hover:border-white/12 hover:bg-ink-900/60 hover:shadow-float hover:-translate-y-0.5 animate-fade-in-up focus-ring"
            >
              <div
                className={cn(
                  'mb-3 grid h-10 w-10 place-items-center rounded-xl transition-transform group-hover:scale-110',
                  card.accent === 'accent'
                    ? 'bg-accent-500/10 text-accent-400'
                    : 'bg-xova-500/10 text-xova-400'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-1 text-xs text-ink-400 leading-relaxed">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
