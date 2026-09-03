import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Zap,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  HelpCircle,
  Clock,
  Building2,
  Car,
} from 'lucide-react';
import { SAAS_PRICING_TIERS } from '@/src/data/omnichannelData';
import { SaaSPricingTier, SubscriptionTierId } from '@/src/types';

export function SaasPricingModal({
  onClose,
  onSelectTier,
}: {
  onClose?: () => void;
  onSelectTier?: (tierId: SubscriptionTierId) => void;
}) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [selectedTier, setSelectedTier] = useState<SubscriptionTierId>('pro');
  const [inventoryCount, setInventoryCount] = useState<number>(45);

  // ROI Estimator
  const manualLaborSavedNgn = 180000; // Salary of data entry staff posting across 7 sites
  const doubleBookingLossPreventedNgn = 450000; // Value of avoiding customer churn from sold cars
  const totalMonthlySavingsNgn = manualLaborSavedNgn + doubleBookingLossPreventedNgn;

  const currentTierObj = SAAS_PRICING_TIERS.find((t) => t.id === selectedTier) || SAAS_PRICING_TIERS[1];
  const netMonthlyCost =
    billingCycle === 'annual'
      ? Math.round(currentTierObj.monthlyPriceNgn * (1 - currentTierObj.annualDiscountPct / 100))
      : currentTierObj.monthlyPriceNgn;

  return (
    <div className="w-full text-white bg-[#000000] p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#141414] border border-[#262626] rounded-full text-xs font-mono text-[#b3b3b3]">
          <span className="h-2 w-2 rounded-full bg-[#eaff00]" />
          <span>Strategic Dealership SaaS Pricing • Nigerian Market</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-bold font-mono uppercase tracking-tight text-white">
          The Central Command Hub for Automotive Dealers
        </h2>

        <p className="text-sm text-[#b3b3b3]">
          Eliminate repetitive manual cross-posting to Jiji, Cars45, and Facebook. Lock in zero double-booking errors while equipping your showroom with instant EV TCO sales math.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="inline-flex items-center gap-2 bg-[#141414] p-1 rounded-sm border border-[#262626] mt-4">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 text-xs font-mono font-bold rounded-sm transition-colors cursor-pointer ${
              billingCycle === 'monthly' ? 'bg-[#eaff00] text-black' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 text-xs font-mono font-bold rounded-sm transition-colors cursor-pointer ${
              billingCycle === 'annual' ? 'bg-[#eaff00] text-black' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            Annual Billing (Save up to 25%)
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {SAAS_PRICING_TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id;
          const displayPrice =
            billingCycle === 'annual'
              ? Math.round(tier.monthlyPriceNgn * (1 - tier.annualDiscountPct / 100))
              : tier.monthlyPriceNgn;

          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`relative rounded-sm p-6 flex flex-col justify-between transition-all cursor-pointer border ${
                tier.isPopular
                  ? 'bg-[#0f0f0f] border-[#eaff00] shadow-[0_0_25px_rgba(234,255,0,0.08)]'
                  : isSelected
                  ? 'bg-[#0f0f0f] border-[#eaff00]'
                  : 'bg-[#0a0a0a] border-[#262626] hover:border-[#4d4d4d]'
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#eaff00] text-black font-mono font-bold text-[10px] tracking-wider uppercase rounded-xs">
                  Most Popular For Dealerships
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-mono text-white uppercase">{tier.name}</h3>
                  <p className="text-xs text-[#808080] font-mono mt-1">{tier.targetAudience}</p>
                </div>

                <div className="py-2 border-y border-[#1f1f1f] font-mono">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      ₦{displayPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#808080]">/ month</span>
                  </div>
                  {billingCycle === 'annual' && (
                    <span className="text-[10px] text-[#eaff00] block mt-0.5">
                      Billed annually (Includes {tier.annualDiscountPct}% discount)
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                    <span className="text-[#808080]">Listings Limit:</span>
                    <span className="text-white font-bold">
                      {typeof tier.maxListings === 'number' ? `${tier.maxListings} Vehicles` : 'Unlimited'}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                    <span className="text-[#808080]">Platform Sync:</span>
                    <span className="text-[#eaff00] font-bold">
                      {typeof tier.platformsSupported === 'number'
                        ? `Up to ${tier.platformsSupported} Platform${tier.platformsSupported > 1 ? 's' : ''}`
                        : 'All 7 Platforms'}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-mono text-[#808080] uppercase tracking-wider block">
                    Included Core Capabilities
                  </span>
                  {tier.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#b3b3b3]">
                      <Check size={14} className="text-[#eaff00] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectTier) onSelectTier(tier.id);
                  }}
                  className={`w-full py-2.5 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer ${
                    tier.isPopular || isSelected
                      ? 'bg-[#eaff00] hover:bg-[#bbcc03] text-black'
                      : 'bg-[#1f1f1f] hover:bg-[#262626] text-white'
                  }`}
                >
                  Activate {tier.name} Plan
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ROI & Payback Math Callout */}
      <div className="max-w-4xl mx-auto bg-[#0d0d0d] border border-[#262626] p-6 rounded-sm space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-[#eaff00]" />
          <h3 className="text-base font-bold font-mono uppercase text-white">
            Dealership ROI & Cost Justification Calculator
          </h3>
        </div>

        <p className="text-xs text-[#b3b3b3]">
          Because AutoClaw functions as a central command hub that actively replaces the manual labor of cross-posting and prevents costly double-booking errors, dealership retention is exceptionally high.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
          <div className="bg-[#141414] p-3 rounded-xs border border-[#1f1f1f]">
            <span className="text-[#808080] block text-[10px] uppercase">Manual Cross-Posting Labor Saved</span>
            <span className="text-base font-bold text-white mt-1 block">~₦180,000 / mo</span>
            <span className="text-[10px] text-[#666666]">Replaces manual social media manager posting to 7 sites</span>
          </div>
          <div className="bg-[#141414] p-3 rounded-xs border border-[#1f1f1f]">
            <span className="text-[#808080] block text-[10px] uppercase">Double-Booking Churn Avoided</span>
            <span className="text-base font-bold text-white mt-1 block">~₦450,000 / mo</span>
            <span className="text-[10px] text-[#666666]">Prevents angry buyer escalations from sold inventory</span>
          </div>
          <div className="bg-[#141414] p-3 rounded-xs border border-[#eaff00]/30">
            <span className="text-[#eaff00] block text-[10px] uppercase">Net Dealership Value Multiplier</span>
            <span className="text-base font-bold text-[#eaff00] mt-1 block">
              +₦{(totalMonthlySavingsNgn - netMonthlyCost).toLocaleString()} / mo
            </span>
            <span className="text-[10px] text-[#808080]">Software pays for itself in first 3 days of each month</span>
          </div>
        </div>
      </div>
    </div>
  );
}
