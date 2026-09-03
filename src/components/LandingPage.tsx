import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HeroSection } from './landing/HeroSection';
import { AgentSwarmSection } from './landing/AgentSwarmSection';
import { FinancialParitySection } from './landing/FinancialParitySection';
import { SocialProofSection } from './landing/SocialProofSection';
import { AudienceGatewaySection } from './landing/AudienceGatewaySection';
import { PricingSection } from './landing/PricingSection';
import { ConversionFooter } from './landing/ConversionFooter';
import { LandingModals } from './landing/LandingModals';
import { Menu, X } from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
  onOpenOnboarding: () => void;
}

export function LandingPage({ onEnterDashboard, onOpenOnboarding }: LandingPageProps) {
  // Splash Screen State
  const [showSplash, setShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  // Modal states
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [quoteModalData, setQuoteModalData] = useState<{
    petrolCar: string;
    evCar: string;
    annualKm: number;
    fuelPrice: number;
    powerTariff: number;
    fiveYearSavings: number;
  } | null>(null);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState<boolean>(false);
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0e] bg-[radial-gradient(#1e1e26_1px,transparent_1px)] [background-size:24px_24px] text-white font-sans antialiased selection:bg-[#E3FF00] selection:text-black flex flex-col items-center relative">
      {/* Splash Screen: Logo image lockup */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            id="autoclaw-splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setShowSplash(false)}
            className="fixed inset-0 z-50 bg-[#0a0a0e] flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer"
          >
            <div className="shrink-0 flex flex-col items-center">
              <img
                src="/autoclaw-logo.png"
                alt="AutoClaw"
                className="h-20 w-auto object-contain mb-4 drop-shadow-[0_0_24px_rgba(227,255,0,0.35)]"
              />
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 font-semibold mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3FF00] animate-pulse" />
                <span>AUTOCLAW OPERATING SYSTEM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 1. GLOBAL HEADER & NAVIGATION (Carbon Flush Bar)          */}
      {/* ========================================================= */}
      <header
        id="autoclaw-header"
        className="sticky top-0 z-40 w-full bg-[#0a0a0e]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-2xl shadow-black"
      >
        {/* Header Bar: Logo image lockup */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('hero-section')}
            title="AutoClaw Home"
            className="flex items-center group select-none cursor-pointer shrink-0"
          >
            <img
              src="/autoclaw-logo.png"
              alt="AutoClaw"
              className="h-9 w-auto object-contain drop-shadow-[0_0_14px_rgba(227,255,0,0.25)] group-hover:scale-105 transition-transform duration-200"
            />
          </button>
        </div>

        {/* Navigation Links: Trending Lots, Portals, Petrol vs EV Savings, Swarm Agents, Pricing */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-wider font-bold text-zinc-300">
          <button
            type="button"
            onClick={() => scrollToSection('hero-section')}
            className="hover:text-[#E3FF00] transition-colors cursor-pointer"
          >
            Trending Lots
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('audience-gateway-section')}
            className="hover:text-[#E3FF00] transition-colors cursor-pointer"
          >
            Portals
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('tco-engine-section')}
            className="hover:text-[#E3FF00] transition-colors cursor-pointer"
          >
            Petrol vs EV Savings
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('agent-swarm-section')}
            className="hover:text-[#E3FF00] transition-colors cursor-pointer"
          >
            Swarm Agents
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('pricing-section')}
            className="hover:text-[#E3FF00] transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </nav>

        {/* Header Actions: Right side contains ONLY BOOK DEMO and mobile menu trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="header-book-demo-btn"
            onClick={() => setIsDemoModalOpen(true)}
            className="px-5 py-2.5 bg-[#E3FF00] hover:bg-[#d4ed00] text-black font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shadow-[0_0_20px_rgba(227,255,0,0.35)] hover:shadow-[0_0_28px_rgba(227,255,0,0.5)] active:scale-95"
          >
            BOOK DEMO
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-[#0d0d12] border-b border-zinc-800 px-6 py-4 flex flex-col gap-3 text-xs uppercase tracking-wider font-bold text-left z-30">
          <button
            type="button"
            onClick={() => scrollToSection('hero-section')}
            className="text-left py-2 hover:text-[#E3FF00]"
          >
            Trending Lots
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('audience-gateway-section')}
            className="text-left py-2 hover:text-[#E3FF00]"
          >
            Portals
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('tco-engine-section')}
            className="text-left py-2 hover:text-[#E3FF00]"
          >
            Petrol vs EV Savings
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('agent-swarm-section')}
            className="text-left py-2 hover:text-[#E3FF00]"
          >
            Swarm Agents
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('pricing-section')}
            className="text-left py-2 hover:text-[#E3FF00]"
          >
            Pricing
          </button>
          <button
            type="button"
            id="mobile-terminal-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onEnterDashboard();
            }}
            className="w-full py-3 bg-zinc-900 border border-zinc-800 hover:border-[#E3FF00]/50 text-zinc-200 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center cursor-pointer transition-colors mt-2"
          >
            <span>DEALER PORTAL →</span>
          </button>
        </div>
      )}

      {/* Main Page Layout Flow */}
      <main className="w-full flex flex-col items-center">
        {/* ========================================================= */}
        {/* 2. HERO SECTION: SELL CARS 9x FASTER                      */}
        {/* ========================================================= */}
        <div className="w-full px-4 md:px-8">
          <HeroSection
            onBookDemo={() => setIsDemoModalOpen(true)}
            onExploreSavings={() => scrollToSection('tco-engine-section')}
            onOpenTerminal={onEnterDashboard}
          />
        </div>

        {/* ========================================================= */}
        {/* 3. THE TECH STACK: AUTONOMOUS AGENT SWARM                 */}
        {/* Positioned immediately after Hero to establish authority  */}
        {/* ========================================================= */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-14">
          <AgentSwarmSection onInspectAgent={(id) => setActiveAgentId(id)} />
        </div>

        {/* ========================================================= */}
        {/* 4. FINANCIAL PARITY COMPARISON (High-Contrast White)      */}
        {/* ========================================================= */}
        <FinancialParitySection
          onGenerateBuyerQuote={(quoteData) => setQuoteModalData(quoteData)}
        />

        {/* ========================================================= */}
        {/* 5. REAL DEALER SOCIAL PROOF (Testimonials)                */}
        {/* ========================================================= */}
        <div className="w-full px-4 md:px-8">
          <SocialProofSection />
        </div>

        {/* ========================================================= */}
        {/* 6. AUDIENCE SEGMENT GATEWAY                               */}
        {/* Commercial Lots & Direct Consignments                     */}
        {/* ========================================================= */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-14">
          <AudienceGatewaySection
            onEnterDealerPortal={onEnterDashboard}
            onOpenPrivateSeller={() => setIsSellerModalOpen(true)}
          />
        </div>

        {/* ========================================================= */}
        {/* 7. SAAS PRICING MATRIX                                    */}
        {/* ========================================================= */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-14">
          <PricingSection
            onSelectPlan={(planName) => {
              setIsDemoModalOpen(true);
            }}
          />
        </div>

        {/* ========================================================= */}
        {/* 8. FINAL CONVERSION FOOTER                                */}
        {/* ========================================================= */}
        <ConversionFooter
          onBookLotDemo={() => setIsDemoModalOpen(true)}
          onTalkConcierge={() => setIsDemoModalOpen(true)}
          onNavigateSection={scrollToSection}
        />
      </main>

      {/* Interactive Modals */}
      <LandingModals
        isDemoModalOpen={isDemoModalOpen}
        onCloseDemoModal={() => setIsDemoModalOpen(false)}
        quoteModalData={quoteModalData}
        onCloseQuoteModal={() => setQuoteModalData(null)}
        isSellerModalOpen={isSellerModalOpen}
        onCloseSellerModal={() => setIsSellerModalOpen(false)}
        activeAgentId={activeAgentId}
        onCloseAgentModal={() => setActiveAgentId(null)}
        onEnterDashboard={onEnterDashboard}
      />
    </div>
  );
}
