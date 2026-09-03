import React, { useState } from 'react';
import { POLICY_HIGHLIGHTS } from '../data/mockData';
import {
  ShieldCheck,
  Percent,
  FileText,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Layers,
  Building,
} from 'lucide-react';

export const PolicyAndTariffHub: React.FC = () => {
  // FOB price in USD for comparison
  const [fobPriceUsd, setFobPriceUsd] = useState<number>(30000);
  const [fxRateNgn, setFxRateNgn] = useState<number>(1500); // ₦ / USD customs benchmark rate

  const cifPriceNgn = fobPriceUsd * fxRateNgn;

  // ICE Vehicle Customs calculation (e.g. 3.0L Petrol V6 SUV)
  const iceDutyPct = 35; // 35% Import Duty
  const iceLevyPct = 35; // 35% Auto Levy
  const iceGreenTaxNgn = 3500000; // 2026 Green Tax for >2.5L engines
  const vatPct = 7.5;

  const iceDutyNgn = cifPriceNgn * (iceDutyPct / 100);
  const iceLevyNgn = cifPriceNgn * (iceLevyPct / 100);
  const iceVatNgn = (cifPriceNgn + iceDutyNgn + iceLevyNgn) * (vatPct / 100);
  const totalIcePortLandingNgn = cifPriceNgn + iceDutyNgn + iceLevyNgn + iceGreenTaxNgn + iceVatNgn;

  // EV Vehicle Customs calculation (0% Duty, 0% Levy, Green Tax Exempt)
  const evDutyPct = 0; // Waived to 0%
  const evLevyPct = 0; // Waived
  const evGreenTaxNgn = 0; // 100% Exempt
  const evVatNgn = 0; // VAT waived under IDEC Clean Energy Scheme
  const totalEvPortLandingNgn = cifPriceNgn; // Net CIF with 0% tariff

  // Difference
  const clearingSavingsNgn = totalIcePortLandingNgn - totalEvPortLandingNgn;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Nigerian Customs & Tariff Regulatory Desk
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Federal EV Incentives vs. Petrol Vehicle Green Tax Policy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Nigeria's Energy Transition Plan and the 2026 Fiscal Tax Reforms offer car dealerships significant margin advantages when importing and selling electric vehicles over high-emission petrol cars.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 shrink-0 text-right">
            <span className="text-[11px] text-slate-400 block">Customs Port Clearance Advantage</span>
            <span className="text-lg sm:text-xl font-extrabold text-emerald-400 font-['Cabinet_Grotesk']">
              Save up to ₦{Math.round(clearingSavingsNgn).toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 block">per $30,000 vehicle cleared at port</span>
          </div>
        </div>
      </div>

      {/* Interactive Clearance Calculator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-bold text-white">
              Landed Port Cost Simulator: Standard Petrol vs. Zero-Emission EV
            </h3>
            <p className="text-xs text-slate-400">
              Calculate the landing cost at Tin Can / Apapa / Port Harcourt Onne Ports based on current tariffs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block">Vehicle FOB ($ USD)</span>
              <input
                id="tariff-fob-input"
                type="number"
                value={fobPriceUsd}
                onChange={(e) => setFobPriceUsd(Number(e.target.value))}
                className="w-28 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 font-bold"
              />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Customs FX Rate (₦/$)</span>
              <input
                id="tariff-fx-input"
                type="number"
                value={fxRateNgn}
                onChange={(e) => setFxRateNgn(Number(e.target.value))}
                className="w-24 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Petrol Car Column */}
          <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                3.0L Petrol V6 SUV (Standard Petrol)
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">
                Heavy Tariffs Apply
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base CIF (Value in Naira):</span>
                <span className="font-semibold">₦{cifPriceNgn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-400/90">
                <span>Import Duty (35%):</span>
                <span>+₦{iceDutyNgn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-400/90">
                <span>Automotive Levy (35%):</span>
                <span>+₦{iceLevyNgn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>2026 Green Tax (&gt; 2.5L Engine Surcharge):</span>
                <span>+₦{iceGreenTaxNgn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Value Added Tax (7.5%):</span>
                <span>+₦{iceVatNgn.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-200">Total Landed Clearance:</span>
              <span className="text-xl font-extrabold text-amber-400">
                ₦{Math.round(totalIcePortLandingNgn).toLocaleString()}
              </span>
            </div>
          </div>

          {/* EV Column */}
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Zero-Emission Electric EV / PHEV
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                0% Duty Waived
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base CIF (Value in Naira):</span>
                <span className="font-semibold">₦{cifPriceNgn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Import Duty (0% Incentive):</span>
                <span>₦0 (Waived)</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Automotive Levy (0%):</span>
                <span>₦0 (Waived)</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>2026 Green Tax Exemption:</span>
                <span>₦0 (100% Exempt)</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Clean Energy VAT Incentive:</span>
                <span>₦0 (IDEC Exemption)</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-200">Total Landed Clearance:</span>
              <span className="text-xl font-extrabold text-emerald-400">
                ₦{Math.round(totalEvPortLandingNgn).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Dealer Profit Takeaway */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-300 shrink-0" />
            <div>
              <strong className="text-emerald-300 font-bold block text-sm">
                Dealer Margin Advantage: ₦{Math.round(clearingSavingsNgn).toLocaleString()}
              </strong>
              <p className="text-slate-300 text-xs">
                Dealers in Abuja, Lagos, Ibadan, and Port Harcourt can price modern EVs significantly lower than imported V6/V8 petrol SUVs while still pocketing larger net dealer margins!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Policy Dossier Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-white">
          Active Nigerian Automotive Regulatory Milestones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POLICY_HIGHLIGHTS.map((policy, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-100 line-clamp-1">{policy.title}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shrink-0">
                  {policy.badge}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 block">{policy.authority}</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {policy.summary}
              </p>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-emerald-400 font-medium">
                <strong>Dealer Strategy:</strong> {policy.dealerImpact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
