import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (planName: string, price: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing-section" className="w-full flex flex-col gap-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-[#E3FF00] block mb-1">
            SAAS PRICING MATRIX
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dealership Operating Tiers
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal">
            Transparent enterprise software licensing billed directly in Nigerian Naira (NGN).
          </p>
        </div>

        {/* Monthly vs Annual Toggle */}
        <div className="inline-flex items-center p-1 bg-black border border-zinc-800 rounded-lg shrink-0">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold rounded-md transition-colors cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-[#E3FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-bold rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-[#E3FF00] text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Annual (-15%)</span>
          </button>
        </div>
      </div>

      {/* 3 Sleek Carbon Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tier 1: Basic Plan (₦85,000 / mo) */}
        <div className="bg-[#121217] border-t border-zinc-700/50 border-x-zinc-800/40 border-b-zinc-900 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left shadow-xl shadow-black/80">
          <div>
            <div className="text-left mb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 block">
                INDEPENDENT LOTS &amp; SINGLE SHOWROOMS
              </span>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">Basic Plan</h3>
            </div>

            <div className="pb-4 mb-4 border-b border-zinc-800/80 text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {billingCycle === 'annual' ? '₦72,250' : '₦85,000'}
                </span>
                <span className="text-xs uppercase tracking-wider font-medium text-zinc-400">/ mo</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider font-medium text-zinc-500">
                Billed {billingCycle === 'annual' ? 'annually (₦867,000/yr)' : 'monthly'}
              </span>
            </div>

            <p className="text-xs text-zinc-400 mb-6 leading-relaxed text-left font-normal">
              Essential inventory management, syndication, and customs validation for independent dealerships managing up to 15 vehicles.
            </p>

            <ul className="space-y-3 text-xs uppercase tracking-wider font-medium mb-8 text-left">
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Up to 15 active vehicle slots</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>2 Channels: Jiji.ng + Facebook Marketplace</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Direct WhatsApp buyer routing &amp; notification</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Customs SGD C-number basic verification</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Standard technical support &amp; lot setup</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlan('Basic Plan', '₦85,000 / mo')}
            className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 border-t border-zinc-700/50 border-x-zinc-800 border-b-zinc-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center shadow-sm"
          >
            GET STARTED
          </button>
        </div>

        {/* Tier 2: Pro Tier Plan (₦150,000 / mo) — Electric Yellow highlight badge: Dealer Benchmark */}
        <div className="bg-[#14141a] border-2 border-[#E3FF00] rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left relative shadow-[0_0_40px_rgba(227,255,0,0.18)]">
          <div className="absolute -top-3 right-4 px-3 py-1 bg-[#E3FF00] text-black text-[10px] font-black uppercase tracking-wider rounded-full shadow-sm">
            DEALER BENCHMARK
          </div>

          <div>
            <div className="text-left mb-4">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#E3FF00] block">
                COMMERCIAL DEALERSHIP BENCHMARK
              </span>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">Pro Tier Plan</h3>
            </div>

            <div className="pb-4 mb-4 border-b border-zinc-800/80 text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#E3FF00] tracking-tight">
                  {billingCycle === 'annual' ? '₦127,500' : '₦150,000'}
                </span>
                <span className="text-xs uppercase tracking-wider font-medium text-zinc-400">/ mo</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider font-medium text-zinc-500">
                Billed {billingCycle === 'annual' ? 'annually (₦1,530,000/yr)' : 'monthly'}
              </span>
            </div>

            <p className="text-xs text-zinc-300 mb-6 leading-relaxed text-left font-normal">
              Full EV comparison enablement, four active marketplace channels, and automated BPP tender surveillance for active lots.
            </p>

            <ul className="space-y-3 text-xs uppercase tracking-wider font-medium mb-8 text-left">
              <li className="flex items-center gap-2.5 text-white">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Up to 60 active vehicle slots</span>
              </li>
              <li className="flex items-center gap-2.5 text-white">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>4 Channels: Jiji, Cars45, Autochek, Facebook</span>
              </li>
              <li className="flex items-center gap-2.5 text-white">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Petrol vs. Electric (EV) Savings Engine</span>
              </li>
              <li className="flex items-center gap-2.5 text-white">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>BPP Federal Fleet Procurement Radar</span>
              </li>
              <li className="flex items-center gap-2.5 text-white">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>NCS C-number inspection clearance</span>
              </li>
              <li className="flex items-center gap-2.5 text-white">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Priority WhatsApp dealer concierge hotline</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlan('Pro Tier Plan', '₦150,000 / mo')}
            className="w-full py-4 bg-[#E3FF00] hover:bg-[#d4ed00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer text-center shadow-lg shadow-[#E3FF00]/20"
          >
            GET STARTED
          </button>
        </div>

        {/* Tier 3: Command Center (₦350,000 / mo) */}
        <div className="bg-[#121217] border-t border-zinc-700/50 border-x-zinc-800/40 border-b-zinc-900 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-left shadow-xl shadow-black/80">
          <div>
            <div className="text-left mb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400 block">
                MULTI-BRANCH FRANCHISES &amp; AUTO GROUPS
              </span>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-1">Command Center</h3>
            </div>

            <div className="pb-4 mb-4 border-b border-zinc-800/80 text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {billingCycle === 'annual' ? '₦297,500' : '₦350,000'}
                </span>
                <span className="text-xs uppercase tracking-wider font-medium text-zinc-400">/ mo</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider font-medium text-zinc-500">
                Billed {billingCycle === 'annual' ? 'annually (₦3,570,000/yr)' : 'monthly'}
              </span>
            </div>

            <p className="text-xs text-zinc-400 mb-6 leading-relaxed text-left font-normal">
              Unlimited multi-lot capacity, complete seven-channel matrix synchronization, and sub-800ms universal inventory purge for high-volume groups.
            </p>

            <ul className="space-y-3 text-xs uppercase tracking-wider font-medium mb-8 text-left">
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Unlimited lot vehicle capacity</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>All 7 Marketplace Channels</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Universal Sub-800ms Delist Trigger</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>BPP Federal Auto-Bidding Assistant</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Custom API and Webhook Integration</span>
              </li>
              <li className="flex items-center gap-2.5 text-zinc-200">
                <CheckCircle2 size={15} className="text-[#E3FF00] shrink-0" />
                <span>Dedicated Regional Account Director</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => onSelectPlan('Command Center', '₦350,000 / mo')}
            className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 border-t border-zinc-700/50 border-x-zinc-800 border-b-zinc-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center shadow-sm"
          >
            GET STARTED
          </button>
        </div>
      </div>
    </section>
  );
}
