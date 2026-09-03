import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LandingPage } from '@/src/components/LandingPage';
import { SudburyDashboard } from '@/components/sections/sudbury-dashboard';
import { Onboarding } from '@/components/sections/onboarding';
import { WhatsAppProcurementSync } from '@/components/sections/whatsapp-procurement-sync';
import { AgentSwarm } from '@/components/sections/agent-swarm';
import { X, ShieldCheck, MessageCircle, Cpu, ArrowLeft } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'landing' | 'terminal'>('landing');
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [showRadarModal, setShowRadarModal] = useState<boolean>(false);
  const [showSwarmModal, setShowSwarmModal] = useState<boolean>(false);

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col w-full bg-[#0a0a0e] text-white font-sans selection:bg-[#E3FF00] selection:text-black">
      {/* ROUTE 1: PUBLIC LANDING PAGE (DEFAULT EXPERIENCE) */}
      {currentRoute === 'landing' ? (
        <LandingPage
          onEnterDashboard={() => setCurrentRoute('terminal')}
          onOpenOnboarding={() => setShowOnboardingModal(true)}
        />
      ) : (
        /* INTERNAL TERMINAL / DASHBOARD (ACCESS VIA SIGN IN / TERMINAL) */
        <div className="relative min-h-screen w-full bg-black">
          {/* Top Return Banner to Public Landing Page */}
          <div className="bg-[#121212] border-b border-zinc-800 px-4 py-2 flex items-center justify-between z-50">
            <button
              type="button"
              onClick={() => setCurrentRoute('landing')}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-black border border-zinc-800 text-[#E3FF00] font-semibold text-xs uppercase tracking-wider hover:bg-[#E3FF00] hover:text-black transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Exit Terminal & Return to Public Landing Page</span>
            </button>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E3FF00] animate-pulse" />
              <span>AUTOCLAW TERMINAL ACTIVE</span>
            </div>
          </div>

          <SudburyDashboard
            onOpenOnboarding={() => setShowOnboardingModal(true)}
            onOpenProcurementRadar={() => setShowRadarModal(true)}
          />
        </div>
      )}

      {/* DEALERSHIP ONBOARDING WIZARD MODAL */}
      <AnimatePresence>
        {showOnboardingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl rounded-md bg-[#0a0a0a] border border-white/20 p-5 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setShowOnboardingModal(false)}
                className="absolute top-5 right-5 text-[#b3b3b3] hover:text-[#eaff00] p-1 cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6 flex items-center gap-2">
                <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                  <ShieldCheck size={14} />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Licensed Dealership Onboarding Protocol
                </h2>
              </div>

              <Onboarding
                onComplete={() => {
                  setShowOnboardingModal(false);
                }}
                onJumpToDashboard={() => {
                  setShowOnboardingModal(false);
                  setCurrentRoute('terminal');
                }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* WHATSAPP PROCUREMENT RADAR MODAL */}
      <AnimatePresence>
        {showRadarModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-md bg-[#0a0a0a] border border-white/20 p-5 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setShowRadarModal(false)}
                className="absolute top-5 right-5 text-[#b3b3b3] hover:text-[#eaff00] p-1 cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-4 flex items-center gap-2">
                <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                  <MessageCircle size={14} />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  WhatsApp Procurement & BPP Federal Radar
                </h2>
              </div>

              <WhatsAppProcurementSync />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BULLMQ SWARM TELEMETRY MODAL */}
      <AnimatePresence>
        {showSwarmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-md bg-[#0a0a0a] border border-white/20 p-5 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setShowSwarmModal(false)}
                className="absolute top-5 right-5 text-[#b3b3b3] hover:text-[#eaff00] p-1 cursor-pointer transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-4 flex items-center gap-2">
                <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                  <Cpu size={14} />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Autonomous BullMQ Swarm Telemetry
                </h2>
              </div>

              <AgentSwarm />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
