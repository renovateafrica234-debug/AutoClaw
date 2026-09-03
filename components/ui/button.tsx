import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow' | 'yellow' | 'action';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'yellow', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#eaff00] disabled:pointer-events-none disabled:opacity-40 select-none cursor-pointer rounded-md';

    const variants = {
      yellow:
        'bg-[#eaff00] hover:bg-[#bbcc03] text-black font-semibold transition-colors duration-300',
      action:
        'bg-black/80 hover:bg-black text-white hover:text-[#eaff00] border border-white/20 hover:border-[#eaff00] backdrop-blur-md transition-all duration-300 rounded-full',
      primary:
        'bg-[#eaff00] hover:bg-[#bbcc03] text-black font-semibold transition-colors duration-300',
      secondary:
        'bg-[#141414] hover:bg-[#1f1f1f] text-white border border-white/10 hover:border-white/25',
      outline:
        'border border-white/20 bg-transparent hover:bg-white/5 text-white hover:text-[#eaff00] hover:border-[#eaff00]',
      ghost:
        'bg-transparent hover:bg-white/5 text-[#b3b3b3] hover:text-white',
      glow:
        'bg-[#eaff00] hover:bg-[#bbcc03] text-black font-semibold shadow-[0_0_25px_rgba(234,255,0,0.35)]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 h-8',
      md: 'text-sm px-4 py-2 gap-2 h-10',
      lg: 'text-base px-6 py-3 gap-2.5 h-12',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

