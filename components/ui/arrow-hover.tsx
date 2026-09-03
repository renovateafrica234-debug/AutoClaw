import React from 'react';
import { ArrowUpRight, ArrowDownLeft, ArrowUpLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArrowProps {
  className?: string;
  size?: number;
}

/**
 * Replicates the signature 363 Sudbury diagonal arrow hover animation:
 * On hover, the primary arrow slides up and right (translate-x-full -translate-y-full),
 * while an incoming arrow enters seamlessly from bottom-left to center.
 */
export const ArrowOutward: React.FC<ArrowProps> = ({ className, size = 16 }) => {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden shrink-0',
        className
      )}
      style={{ width: size, height: size }}
    >
      <ArrowUpRight
        size={size}
        className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:translate-x-full group-hover:-translate-y-full"
      />
      <ArrowUpRight
        size={size}
        className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 text-[#eaff00]"
      />
    </div>
  );
};

export const ArrowInward: React.FC<ArrowProps> = ({ className, size = 16 }) => {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden shrink-0',
        className
      )}
      style={{ width: size, height: size }}
    >
      <ArrowUpLeft
        size={size}
        className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:-translate-x-full group-hover:-translate-y-full"
      />
      <ArrowUpLeft
        size={size}
        className="absolute inset-0 translate-x-full translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 text-[#eaff00]"
      />
    </div>
  );
};
