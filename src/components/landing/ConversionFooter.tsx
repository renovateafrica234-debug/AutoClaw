import React from 'react';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';

interface ConversionFooterProps {
  onBookLotDemo: () => void;
  onTalkConcierge: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export function ConversionFooter({
  onBookLotDemo,
  onTalkConcierge,
  onNavigateSection,
}: ConversionFooterProps) {
  return (
    <footer className="w-full flex flex-col items-center mt-12">
      {/* Full-Width Callout Banner */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="w-full bg-gradient-to-r from-[#14141a] via-[#1a1a24] to-[#14141a] border-2 border-[#E3FF00]/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(227,255,0,0.12)] text-left flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase">
              READY TO 9x YOUR SHOWROOM SALES VELOCITY?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-3 leading-relaxed font-normal">
              Deploy AutoClaw across your Lagos, Abuja, Port Harcourt, or Ibadan lots today. Full onboarding completed in under 48 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
            {/* Electric Yellow "BOOK A LOT DEMO →" */}
            <button
              type="button"
              id="footer-book-demo-btn"
              onClick={onBookLotDemo}
              className="px-8 py-4 bg-[#E3FF00] hover:bg-[#d4ed00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#E3FF00]/25 hover:scale-105 active:scale-95"
            >
              <span>BOOK A LOT DEMO →</span>
            </button>

            {/* Outline "TALK TO DEALER PARTNER CONCIERGE" */}
            <button
              type="button"
              id="footer-concierge-btn"
              onClick={onTalkConcierge}
              className="px-6 py-4 bg-black/80 hover:bg-black border border-zinc-700 hover:border-zinc-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <PhoneCall size={14} className="text-[#E3FF00]" />
              <span>TALK TO DEALER PARTNER CONCIERGE</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Bar */}
      <div className="w-full bg-[#07070a] border-t border-zinc-800/80 py-8 px-4 md:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo image lockup */}
          <div className="flex items-center gap-4">
            <div className="shrink-0 flex items-center gap-2.5">
              <img
                src="/autoclaw-logo.png"
                alt="AutoClaw"
                className="h-8 w-auto object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-white uppercase select-none">
                AUTOCLAW
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-medium text-left">
              © 2026 AUTOCLAW. Built for Nigeria's premier auto dealers.
            </p>
          </div>

          {/* Regional Footprint Tags: Lagos • Abuja • Port Harcourt • Ibadan */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-wider font-sans font-medium text-zinc-400">
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
              Lagos
            </span>
            <span className="text-zinc-600">•</span>
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
              Abuja
            </span>
            <span className="text-zinc-600">•</span>
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
              Port Harcourt
            </span>
            <span className="text-zinc-600">•</span>
            <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
              Ibadan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
