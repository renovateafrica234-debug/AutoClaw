import React, { useState } from 'react';
import {
  Store,
  UserCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  Shield,
  Zap,
  Layers,
  MessageCircle,
  FileCheck2,
  BarChart3,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AudienceGatewaySectionProps {
  onEnterDealerPortal: () => void;
  onOpenPrivateSeller: () => void;
}

type JourneyType = 'dealership' | 'private' | 'fleet';

export function AudienceGatewaySection({
  onEnterDealerPortal,
  onOpenPrivateSeller,
}: AudienceGatewaySectionProps) {
  const [activeJourney, setActiveJourney] = useState<JourneyType>('dealership');

  return (
    <section id="audience-gateway-section" className="w-full flex flex-col gap-8 text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-zinc-800/80">
        <div>
          <span className="text-xs uppercase tracking-wider font-black text-[#E3FF00] block mb-1">
            TARGET OPERATING PROFILES
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Commercial Lots &amp; Direct Consignments
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-bold text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-lg">
            3 DEDICATED PIPELINES
          </span>
        </div>
      </div>

      {/* Heavy-Duty 3-Block Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Block 1: Dealership Enterprise Portal */}
        <div
          onClick={() => setActiveJourney('dealership')}
          className={`bg-gradient-to-b from-[#14141a] via-[#121217] to-[#0d0d12] border-2 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-black/80 transition-all cursor-pointer ${
            activeJourney === 'dealership'
              ? 'border-[#E3FF00] ring-1 ring-[#E3FF00]/30'
              : 'border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <Store size={80} className="text-[#E3FF00]" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[11px] text-[#E3FF00] font-black uppercase tracking-wider rounded-md">
                PORTAL A • ENTERPRISE DEALERS
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 bg-black/50 px-2 py-0.5 rounded">
                15+ LOT CAPACITY
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Dealership Enterprise Portal
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
              Unified operating engine for multi-lot dealership franchises in Lagos, Abuja, and Port Harcourt with two-way syndication and instant delist.
            </p>

            <div className="space-y-3 text-xs text-zinc-300 font-medium mb-8">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>7-Platform Automated Syndication:</strong> Instant 2-way sync across Jiji, Cars45, Autochek, and Carmart.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Sub-800ms Universal Delist:</strong> Eliminates duplicate deposit collisions and dead leads automatically.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Team CRM Lead-Routing:</strong> High-ticket buyer assignment, WhatsApp dispatch, and rep performance tracking.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Wholesale Volume Analytics:</strong> Live aged-inventory liquidation alerts and multi-branch floor plan margins.</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEnterDealerPortal();
            }}
            className="w-full py-3.5 bg-[#E3FF00] hover:bg-[#d4ed00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#E3FF00]/10 hover:shadow-[#E3FF00]/30 active:scale-95"
          >
            <span>DEALER PORTAL →</span>
          </button>
        </div>

        {/* Block 2: Private Seller & Direct Consignments */}
        <div
          onClick={() => setActiveJourney('private')}
          className={`bg-gradient-to-b from-[#14141a] via-[#121217] to-[#0d0d12] border-2 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-black/80 transition-all cursor-pointer ${
            activeJourney === 'private'
              ? 'border-[#E3FF00] ring-1 ring-[#E3FF00]/30'
              : 'border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <UserCheck size={80} className="text-[#E3FF00]" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[11px] text-white font-black uppercase tracking-wider rounded-md">
                PORTAL B • PRIVATE SELLERS
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 bg-black/50 px-2 py-0.5 rounded">
                0% MIDDLEMAN MARKUP
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Private Seller &amp; Consignment Hub
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
              High-net-worth vehicle liquidation and peer-to-peer price discovery calibrated to real-time Abuja and Lagos dealer clearing prices.
            </p>

            <div className="space-y-3 text-xs text-zinc-300 font-medium mb-8">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Single-Unit Luxury Disposition:</strong> Rapid private valuation without street touts or commission dilution.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Verified Escrow Protection:</strong> Funds held in licensed trustee accounts until physical lot handover.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Direct WhatsApp Buyer Routing:</strong> Pre-screened vetted corporate and retail buyers dispatched directly.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Zero-Commission Price Discovery:</strong> Live transaction benchmarks prevent undervaluation on fast sales.</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPrivateSeller();
            }}
            className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>SELL MY CAR NOW →</span>
          </button>
        </div>

        {/* Block 3: Corporate Fleet & Institutional Tender Radar */}
        <div
          onClick={() => setActiveJourney('fleet')}
          className={`bg-gradient-to-b from-[#14141a] via-[#121217] to-[#0d0d12] border-2 rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-black/80 transition-all cursor-pointer ${
            activeJourney === 'fleet'
              ? 'border-[#E3FF00] ring-1 ring-[#E3FF00]/30'
              : 'border-zinc-800/80 hover:border-zinc-700'
          }`}
        >
          <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
            <Building2 size={80} className="text-[#E3FF00]" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[11px] text-emerald-400 font-black uppercase tracking-wider rounded-md">
                PORTAL C • CORPORATE FLEETS
              </span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-400 bg-black/50 px-2 py-0.5 rounded">
                BPP &amp; OIL/GAS COMPLIANT
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Corporate Fleet &amp; Tenders
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
              Turnkey fleet replacement, multi-unit bulk procurement, and automated Bureau of Public Procurement tender tracking for enterprise clients.
            </p>

            <div className="space-y-3 text-xs text-zinc-300 font-medium mb-8">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>BPP Procurement Radar:</strong> Real-time indexing of Federal ministries and parastatals vehicle RFPs.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>NCS Customs Duty Audited:</strong> 100% genuine Single Goods Declaration (SGD) C-Number guarantee.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Fuel-to-Fleet TCO Optimization:</strong> Live diesel vs. EV parity models for 20+ vehicle commercial fleets.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#E3FF00] shrink-0 mt-0.5" />
                <span><strong>Bank Guarantee Settlement:</strong> Integrated LPO and commercial invoice financing facilitation.</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEnterDealerPortal();
            }}
            className="w-full py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <span>ACCESS FLEET TENDERS →</span>
          </button>
        </div>
      </div>

      {/* Interactive Workflow Views: Distinct User Journey Demonstration */}
      <div className="w-full bg-[#101015] border border-zinc-800/90 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-800/80">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-black text-[#E3FF00] block mb-1">
              INTERACTIVE DISPATCH WORKFLOW
            </span>
            <h4 className="text-lg sm:text-xl font-black text-white">
              {activeJourney === 'dealership' && 'Multi-Lot Dealership Dispatch Engine'}
              {activeJourney === 'private' && 'Private Seller Escrow & Direct Routing Workflow'}
              {activeJourney === 'fleet' && 'Enterprise Fleet Tender & NCS Clearance Pipeline'}
            </h4>
          </div>

          {/* Workflow Toggle Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-zinc-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveJourney('dealership')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeJourney === 'dealership'
                  ? 'bg-[#E3FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Dealership
            </button>
            <button
              type="button"
              onClick={() => setActiveJourney('private')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeJourney === 'private'
                  ? 'bg-[#E3FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Private Seller
            </button>
            <button
              type="button"
              onClick={() => setActiveJourney('fleet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeJourney === 'fleet'
                  ? 'bg-[#E3FF00] text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Corporate Fleet
            </button>
          </div>
        </div>

        {/* Dynamic Workflow Steps */}
        <AnimatePresence mode="wait">
          {activeJourney === 'dealership' && (
            <motion.div
              key="dealership-flow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-[#E3FF00]/10 text-[#E3FF00] font-black text-xs flex items-center justify-center mb-3">
                  01
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  VIN &amp; Duty Ingestion
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Scan C-Number SGD customs certificate and ingest lot specs directly from staging inventory.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-[#E3FF00]/10 text-[#E3FF00] font-black text-xs flex items-center justify-center mb-3">
                  02
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  7-Portal Broadcast
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Automated publication to Jiji, Cars45, Autochek, Carmart, and Facebook Marketplace simultaneously.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-[#E3FF00]/10 text-[#E3FF00] font-black text-xs flex items-center justify-center mb-3">
                  03
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Deposit Kill Switch
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  When deposit hits Providus or Zenith accounts, universal delist pulls listings across all 7 sites in 800ms.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-[#E3FF00]/10 text-[#E3FF00] font-black text-xs flex items-center justify-center mb-3">
                  04
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Wholesale Ledger Update
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Automated sales commission distribution, lot balance sheets, and replacement stock procurement suggestions.
                </p>
              </div>
            </motion.div>
          )}

          {activeJourney === 'private' && (
            <motion.div
              key="private-flow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-emerald-400/10 text-emerald-400 font-black text-xs flex items-center justify-center mb-3">
                  01
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  60s Auction Benchmark
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Input vehicle model and year to instantly pull Lagos and Abuja dealer clearing prices with zero broker skew.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-emerald-400/10 text-emerald-400 font-black text-xs flex items-center justify-center mb-3">
                  02
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Hub Certification
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Drive into a partner Maitama or Lekki verification lot for a 150-point diagnostic and escrow certification.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-emerald-400/10 text-emerald-400 font-black text-xs flex items-center justify-center mb-3">
                  03
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Direct WhatsApp Leads
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Only pre-qualified buyers with verified proof of funds are dispatched directly to your private WhatsApp line.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-emerald-400/10 text-emerald-400 font-black text-xs flex items-center justify-center mb-3">
                  04
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Guaranteed Escrow Payout
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Buyer funds lock in regulated escrow. Instant settlement to your Nigerian bank upon transfer receipt sign-off.
                </p>
              </div>
            </motion.div>
          )}

          {activeJourney === 'fleet' && (
            <motion.div
              key="fleet-flow"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-blue-400/10 text-blue-400 font-black text-xs flex items-center justify-center mb-3">
                  01
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  BPP Tender Extraction
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Autonomous scraping of Nigerian public sector and corporate fleet replacement tenders matching inventory.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-blue-400/10 text-blue-400 font-black text-xs flex items-center justify-center mb-3">
                  02
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Fuel vs. EV Parity Matrix
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Generate instant 36-month TCO comparison reports showing corporate CFOs annual OpEx savings exceeding ₦30M.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-blue-400/10 text-blue-400 font-black text-xs flex items-center justify-center mb-3">
                  03
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Customs &amp; Compliance Audit
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Full packet of verifiable NCS SGD duty papers, Tax Clearance Certificates (TCC), and PENCOM compliance.
                </p>
              </div>

              <div className="p-4 bg-black/50 border border-zinc-800 rounded-xl">
                <div className="w-7 h-7 rounded-lg bg-blue-400/10 text-blue-400 font-black text-xs flex items-center justify-center mb-3">
                  04
                </div>
                <h5 className="text-xs uppercase tracking-wider font-bold text-white mb-1">
                  Bulk Delivery &amp; LPO Financing
                </h5>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Coordinated interstate transport carriers, tracking telemetry, and institutional payment clearance.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
