import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  User,
  ShieldCheck,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Building2,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DealerType } from '@/types';

interface WelcomeScreenProps {
  onEnter: (type: DealerType) => void;
  initialType?: DealerType;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onEnter,
  initialType = 'dealer',
}) => {
  const [selectedType, setSelectedType] = useState<DealerType>(initialType);

  const handleStart = () => {
    onEnter(selectedType);
  };

  return (
    <motion.div
      id="welcome-entrance-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
      className="fixed inset-0 z-50 bg-[#050711] flex flex-col justify-between overflow-y-auto px-4 py-8 sm:p-12 selection:bg-violet-600 selection:text-white"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b15_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b15_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Top Bar: Regional info */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold uppercase tracking-wider">Abuja Regional Network</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">Central Area • Maitama • Wuse 2 • Garki</span>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] text-violet-300">
          v2.6 ABUJA
        </div>
      </header>

      {/* Center Welcome Card */}
      <main className="relative z-10 max-w-3xl mx-auto w-full my-auto py-8">
        <div className="text-center space-y-4 mb-8">
          {/* Glowing AutoClaw Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-violet-600 via-indigo-600 to-slate-900 border border-violet-400/40 p-0.5 shadow-[0_0_50px_rgba(124,58,237,0.35)] flex items-center justify-center relative group"
          >
            <div className="w-full h-full rounded-[22px] bg-[#090d1f] flex items-center justify-center">
              <Car className="w-10 h-10 text-violet-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#050711]" />
            </span>
          </motion.div>

          {/* Titles */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight">
              AUTOCLAW
            </h1>
            <p className="text-xs sm:text-sm font-mono text-violet-400 tracking-widest uppercase mt-1">
              Autonomous Dealership Sales Engine & Procurement Radar
            </p>
          </div>

          <p className="text-xs sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
            Welcome to Abuja's automotive sales stack. Select your operation profile to load tailored inventory HUD, syndication queues, and WhatsApp procurement radar.
          </p>
        </div>

        {/* Role Selection Cards: Licensed Dealership vs Private Seller */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Option 1: Licensed Dealership */}
          <button
            type="button"
            id="welcome-role-dealer"
            onClick={() => setSelectedType('dealer')}
            className={`relative p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
              selectedType === 'dealer'
                ? 'bg-gradient-to-b from-violet-950/70 to-slate-900/90 border-violet-500 shadow-[0_0_35px_rgba(139,92,246,0.3)]'
                : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedType === 'dealer'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <Building2 className="w-6 h-6" />
              </div>
              {selectedType === 'dealer' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-violet-950 text-violet-300 border border-violet-500/40">
                  <CheckCircle2 className="w-3 h-3 text-violet-400" />
                  Selected
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  Showrooms & Lots
                </span>
              )}
            </div>

            <div>
              <h2 className="font-bold text-lg text-white font-['Cabinet_Grotesk',sans-serif]">
                Licensed Dealership
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1.5 leading-relaxed">
                For car lots, fleet brokers, and luxury auto showrooms. Includes 6-worker BullMQ swarm, multi-channel syndication, and BPP tender radar.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Full Swarm Automation + Multi-lot Hub</span>
            </div>
          </button>

          {/* Option 2: Private Seller */}
          <button
            type="button"
            id="welcome-role-private"
            onClick={() => setSelectedType('private')}
            className={`relative p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
              selectedType === 'private'
                ? 'bg-gradient-to-b from-violet-950/70 to-slate-900/90 border-violet-500 shadow-[0_0_35px_rgba(139,92,246,0.3)]'
                : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  selectedType === 'private'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}
              >
                <User className="w-6 h-6" />
              </div>
              {selectedType === 'private' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-violet-950 text-violet-300 border border-violet-500/40">
                  <CheckCircle2 className="w-3 h-3 text-violet-400" />
                  Selected
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  Individual
                </span>
              )}
            </div>

            <div>
              <h2 className="font-bold text-lg text-white font-['Cabinet_Grotesk',sans-serif]">
                Private Seller
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1.5 leading-relaxed">
                Selling personal luxury, Tokunbo, or EV vehicle. Direct escrow protection, instant Nigerian market valuation, and verified buyer matching.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Customs Escrow + Fast Payout</span>
            </div>
          </button>
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-3">
          <Button
            id="welcome-get-started-btn"
            variant="glow"
            size="lg"
            onClick={handleStart}
            className="w-full sm:w-auto px-10 py-4 text-base font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <span className="text-xs opacity-75 font-normal">
              as {selectedType === 'dealer' ? 'Dealership' : 'Private Seller'}
            </span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          <p className="text-[11px] font-mono text-slate-500">
            Press Get Started to launch the AutoClaw sales deck & interactive inventory HUD
          </p>
        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Abuja Showroom Headquarters: Central Business District, Abuja FCT</span>
        </div>
        <div>
          <span>© 2026 AutoClaw Inc. All rights reserved.</span>
        </div>
      </footer>
    </motion.div>
  );
};
