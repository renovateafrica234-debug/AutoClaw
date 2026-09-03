import React, { useState, useEffect } from 'react';
import { Zap, ChevronLeft, ChevronRight, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroSectionProps {
  onBookDemo: () => void;
  onExploreSavings: () => void;
  onOpenTerminal: () => void;
}

interface HeroVehicle {
  id: string;
  name: string;
  badge1: string;
  badge2: string;
  price: string;
  type: string;
  location: string;
  imageUrl: string;
  specs: {
    label: string;
    value: string;
    highlight?: boolean;
    emerald?: boolean;
  }[];
}

const HERO_VEHICLES: HeroVehicle[] = [
  {
    id: 'deepal-s07',
    name: 'Changan Deepal S07 EV SUV',
    badge1: 'Abuja Fleet Pick',
    badge2: '₦2.10M Annual TCO Delta',
    price: '₦54,000,000',
    type: '100% ELECTRIC SUV',
    location: 'Abuja Fleet Yard & Port Harcourt Hub',
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'POWERTRAIN', value: '218 HP Rear Drive E-Motor' },
      { label: 'RANGE EFFICIENCY', value: '620 KM CLTC Range' },
      { label: 'POWER TARIFF', value: '₦225/kWh Band A Tariff', highlight: true },
      { label: 'CUSTOMS DUTY', value: '0% Clean Energy Exemption', emerald: true },
    ],
  },
  {
    id: 'byd-seal',
    name: 'BYD Seal Performance AWD',
    badge1: 'Lagos Executive Tier',
    badge2: '₦3.45M Annual TCO Delta',
    price: '₦68,500,000',
    type: 'DUAL MOTOR SEDAN',
    location: 'Victoria Island Flagship Lot, Lagos',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'POWERTRAIN', value: '523 HP Dual Motor AWD' },
      { label: 'RANGE EFFICIENCY', value: '570 KM WLTP Range' },
      { label: 'ACCELERATION', value: '3.8s 0-100 km/h Launch', highlight: true },
      { label: 'CUSTOMS DUTY', value: '0% Clean Energy Exemption', emerald: true },
    ],
  },
  {
    id: 'velar-p250',
    name: 'Range Rover Velar P250 R-Dynamic',
    badge1: 'Benchmark Luxury ICE',
    badge2: '₦5.55M Annual Fuel OpEx',
    price: '₦92,000,000',
    type: '2.0L TURBO PETROL LUXURY SUV',
    location: 'Maitama Showroom, Abuja',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80',
    specs: [
      { label: 'POWERTRAIN', value: '247 HP Turbocharged Petrol' },
      { label: 'CONSUMPTION', value: '11.2 L/100km City Consumption' },
      { label: 'FUEL BASELINE', value: '₦1,050/L Premium Baseline', highlight: true },
      { label: 'CUSTOMS STATUS', value: '35% SGD Duty Clearance', emerald: true },
    ],
  },
];

export function HeroSection({
  onBookDemo,
  onExploreSavings,
  onOpenTerminal,
}: HeroSectionProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle slider
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_VEHICLES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % HERO_VEHICLES.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + HERO_VEHICLES.length) % HERO_VEHICLES.length);
  };

  const handleBookDemoScroll = () => {
    const el = document.getElementById('conversion-footer') || document.getElementById('audience-gateway-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    onBookDemo();
  };

  const handleSavingsScroll = () => {
    const el = document.getElementById('tco-engine-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onExploreSavings();
    }
  };

  const activeVehicle = HERO_VEHICLES[currentIdx];

  return (
    <section
      id="hero-section"
      className="w-full bg-[#0a0a0e] text-white pt-8 pb-16 flex flex-col items-center"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Anchor: Bold Headline & Clean Copy */}
        <div className="lg:col-span-7 flex flex-col text-left">
          {/* Bold Headline: SELL CARS 9x FASTER. */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] uppercase mb-6">
            SELL CARS <br className="hidden sm:inline" />
            <span className="text-[#E3FF00] drop-shadow-[0_0_35px_rgba(227,255,0,0.35)]">
              9x FASTER.
            </span>
          </h1>

          {/* Clean sans-serif copy focusing on 800ms universal delisting across 7 portals and real-time fuel-to-grid savings calculations */}
          <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl mb-8">
            The autonomous sales infrastructure built for Nigeria's premier auto dealerships. Delist sold vehicles across all 7 automotive portals in under 800ms to eliminate deposit collisions, while arming sales reps with real-time fuel-to-grid savings calculations that close petrol and EV deals on the spot.
          </p>

          {/* Action CTAs: Smooth scroll actions + clean DEALER PORTAL button without icons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
            <button
              type="button"
              id="hero-book-demo-btn"
              onClick={handleBookDemoScroll}
              className="px-8 py-4 bg-[#E3FF00] hover:bg-[#d4ed00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(227,255,0,0.35)] hover:shadow-[0_0_45px_rgba(227,255,0,0.5)] hover:scale-105 active:scale-95"
            >
              <span>BOOK A LOT DEMO →</span>
            </button>

            <button
              type="button"
              id="hero-savings-btn"
              onClick={handleSavingsScroll}
              className="px-6 py-4 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Zap size={14} className="text-[#E3FF00]" />
              <span>EXPLORE PETROL VS EV SAVINGS</span>
            </button>

            <button
              type="button"
              id="hero-terminal-btn"
              onClick={onOpenTerminal}
              className="px-6 py-4 bg-zinc-950/90 hover:bg-zinc-900 border border-zinc-800 hover:border-[#E3FF00]/60 text-zinc-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center shadow-sm"
            >
              <span>DEALER PORTAL →</span>
            </button>
          </div>

          {/* 3 High-Authority Bullet Proofs */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 max-w-xl">
            <div>
              <span className="text-xl sm:text-2xl font-black text-white block tracking-tight">
                &lt;800ms
              </span>
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium mt-0.5 block">
                Universal Delist
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-white block tracking-tight">
                7 Portals
              </span>
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium mt-0.5 block">
                Two-Way Syndication
              </span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-[#E3FF00] block tracking-tight">
                100% NCS
              </span>
              <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium mt-0.5 block">
                C-Number Audit
              </span>
            </div>
          </div>
        </div>

        {/* Right Showcase: Dynamic Multi-Vehicle Hero Slider */}
        <div
          className="lg:col-span-5 flex flex-col text-left"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-[#121217] border-2 border-zinc-700/60 hover:border-[#E3FF00]/60 transition-all rounded-3xl p-6 shadow-2xl shadow-black relative overflow-hidden group">
            {/* Ambient Corner Flare */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#E3FF00]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Telemetry Badges & Slider Controls */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                {/* Dynamic Telemetry Badge 1 */}
                <span className="px-3 py-1 bg-[#E3FF00] text-black text-xs font-black uppercase tracking-wider rounded-md shadow-sm">
                  {activeVehicle.badge1}
                </span>

                {/* Dynamic Telemetry Badge 2 */}
                <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-700 text-[#E3FF00] text-xs font-bold uppercase tracking-wider rounded-md">
                  {activeVehicle.badge2}
                </span>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handlePrev}
                  title="Previous Vehicle"
                  className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  title="Next Vehicle"
                  className="p-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Vehicle Image Stage with Transitions */}
            <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-black/80 border border-zinc-800 mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeVehicle.id}
                  src={activeVehicle.imageUrl}
                  alt={activeVehicle.name}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0.4, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.3 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Bottom Image Overlay: Price Tag & Type */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 block">
                    PRICE (TAX INCL.)
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {activeVehicle.price}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-black/80 border border-white/20 text-[10px] uppercase tracking-wider font-bold text-[#E3FF00] rounded">
                  {activeVehicle.type}
                </span>
              </div>
            </div>

            {/* Vehicle Title & Location */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activeVehicle.name}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400 mt-1">
                <MapPin size={13} className="text-[#E3FF00]" />
                <span>{activeVehicle.location}</span>
              </div>
            </div>

            {/* 4 Active Telemetry Spec Badges */}
            <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-zinc-800/80 text-xs">
              {activeVehicle.specs.map((spec, i) => (
                <div key={i} className="p-2.5 bg-black/60 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 text-[10px] uppercase tracking-wider block font-bold">
                    {spec.label}
                  </span>
                  <span
                    className={`font-bold tracking-wide ${
                      spec.highlight
                        ? 'text-[#E3FF00]'
                        : spec.emerald
                        ? 'text-emerald-400'
                        : 'text-zinc-200'
                    }`}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Slide Indicators & Quick Action */}
            <div className="flex items-center justify-between mt-4 pt-2">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {HERO_VEHICLES.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    title={`Slide to ${v.name}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIdx
                        ? 'w-6 bg-[#E3FF00]'
                        : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-zinc-500 font-mono">
                0{currentIdx + 1} / 0{HERO_VEHICLES.length}
              </span>
            </div>

            {/* Card Footer Quick CTA */}
            <button
              type="button"
              onClick={handleBookDemoScroll}
              className="w-full mt-3 py-3 bg-zinc-900 hover:bg-[#E3FF00] text-zinc-200 hover:text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center border border-zinc-800 flex items-center justify-center gap-2"
            >
              <span>INSPECT LOT TELEMETRY IN LIVE DEMO</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
