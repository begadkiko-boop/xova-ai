import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

const sizeMap = {
  sm: { box: 'h-7 w-7', text: 'text-base', sub: 'text-[10px]' },
  md: { box: 'h-9 w-9', text: 'text-lg', sub: 'text-[11px]' },
  lg: { box: 'h-12 w-12', text: 'text-2xl', sub: 'text-xs' },
};

export function Logo({ className, size = 'md', showWordmark = true }: LogoProps) {
  const s = sizeMap[size];
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'relative grid place-items-center rounded-xl bg-gradient-to-br from-xova-400 to-xova-600 shadow-glow',
          s.box
        )}
      >
        <svg viewBox="0 0 32 32" className="h-2/3 w-2/3" fill="none">
          <path
            d="M8 8L16 16L24 8M8 24L16 16L24 24"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="16" r="2.5" fill="white" />
        </svg>
      </div>
      {showWordmark && (
        <div className="leading-none">
          <span className={cn('font-bold tracking-tight text-white', s.text)}>
            XOVA <span className="text-xova-400">AI</span>
          </span>
          <div className={cn('mt-0.5 text-ink-500 font-medium', s.sub)}>
            by begad
          </div>
        </div>
      )}
    </div>
  );
}
