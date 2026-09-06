import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-xova-400 to-xova-600 text-white font-semibold shadow-glow hover:from-xova-300 hover:to-xova-500 hover:shadow-glow-lg active:scale-[0.98]',
  secondary:
    'bg-ink-800 text-ink-100 border border-white/[0.06] hover:bg-ink-700 active:scale-[0.98]',
  ghost:
    'text-ink-300 hover:bg-white/[0.06] hover:text-white active:scale-[0.98]',
  outline:
    'border border-white/10 text-ink-100 hover:bg-white/[0.04] hover:border-white/20 active:scale-[0.98]',
  danger:
    'bg-error-500/10 text-error-400 border border-error-500/20 hover:bg-error-500/20 active:scale-[0.98]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-6 text-base rounded-xl gap-2.5',
  icon: 'h-10 w-10 rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 focus-ring disabled:opacity-50 disabled:pointer-events-none select-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
