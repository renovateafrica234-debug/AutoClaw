import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle, NigerianCity } from '../types';
import {
  Zap,
  BatteryCharging,
  Gauge,
  ShieldCheck,
  MapPin,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  TrendingDown,
  Compass,
  Radio,
  Eye,
} from 'lucide-react';

interface FeaturedShowcaseBlockProps {
  vehicles: Vehicle[];
  currentCity: NigerianCity;
  onSelectVehicleForPitch: (vehicle: Vehicle) => void;
  onViewVehicleDetails: (vehicle: Vehicle) => void;
}

export const FeaturedShowcaseBlock: React.FC<FeaturedShowcaseBlockProps> = ({
  vehicles,
  currentCity,
  onSelectVehicleForPitch,
  onViewVehicleDetails,
}) => {
  // Filter featured vehicles suitable for the showcase
  const showcasePool = vehicles.filter((v) => {
    if (currentCity !== 'All Nigeria') {
      return v.city.toLowerCase() === currentCity.toLowerCase() || v.fuelType.includes('Electric');
    }
    return true;
  });

  const featuredList = showcasePool.length > 0 ? showcasePool.slice(0, 5) : vehicles.slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const currentVehicle = featuredList[currentIndex] || vehicles[0];

  // Auto-advance every 7 seconds if autoplay active
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredList.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredList.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % featuredList.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + featuredList.length) % featuredList.length);
  };

  if (!currentVehicle) return null;

  return (
    <div className="relative mb-10 w-full overflow-hidden rounded-3xl border border-white/10 bg-[#08090c] shadow-2xl">
      {/* Top Telemetry Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-black/40 px-5 py-3 backdrop-blur-md text-[11px] uppercase tracking-wider font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            LIVE TELEMETRY // 363 AUTOMOTIVE ARCHIVE
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-slate-300">
            LOC: {currentVehicle.city.toUpperCase()} SHOWROOM
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400">
            MACHINE {currentIndex + 1} OF {featuredList.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              id="showcase-prev-btn"
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
              title="Previous Machine"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              id="showcase-next-btn"
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10"
              title="Next Machine"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Full-Block Imagery & HUD Area */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[480px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentVehicle.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* Cinematic Background Image */}
            <img
              src={currentVehicle.imageUrl}
              alt={currentVehicle.title}
              className="h-full w-full object-cover object-center brightness-[0.78] contrast-[1.08]"
            />

            {/* Subtle Gradient Overlays for Cinematic Film Look */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090c]/90 via-transparent to-[#08090c]/40" />

            {/* Film Grain & Letterbox Effect */}
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#08090c] to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Top Badges */}
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3 pointer-events-none z-10">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {currentVehicle.dutyStatus}
            </span>
            {currentVehicle.greenTaxExempt && (
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                2026 Green Tax Exempt
              </span>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-xs text-slate-300 font-mono">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            {currentVehicle.dealershipName}
          </div>
        </div>

        {/* Main Floating Editorial Content Block */}
        <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          {/* Machine Identity & Description */}
          <div className="max-w-2xl">
            <motion.div
              key={`title-${currentVehicle.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase">
                <span>[ CHASSIS // {currentVehicle.condition} ]</span>
                <span>•</span>
                <span>{currentVehicle.fuelType}</span>
                <span>•</span>
                <span>{currentVehicle.year}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Cabinet_Grotesk'] drop-shadow-md">
                {currentVehicle.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl font-light leading-relaxed">
                {currentVehicle.description}
              </p>
            </motion.div>

            {/* Quick Specs Pills floating over image */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
              {currentVehicle.rangeKm && (
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-slate-200">
                  <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentVehicle.rangeKm} KM RANGE</span>
                </div>
              )}
              {currentVehicle.batteryCapacityKwh && (
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-slate-200">
                  <BatteryCharging className="w-3.5 h-3.5 text-teal-400" />
                  <span>{currentVehicle.batteryCapacityKwh} kWh PACK</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-300">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>SAVE ~₦{currentVehicle.monthlyFuelSavingsNgn.toLocaleString()}/MO</span>
              </div>
            </div>
          </div>

          {/* Pricing & High-End Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 shrink-0 bg-black/60 backdrop-blur-xl border border-white/15 p-4 sm:p-5 rounded-2xl shadow-2xl">
            <div className="text-left lg:text-right">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                OUT-THE-DOOR LANDED PRICE
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight">
                ₦{currentVehicle.priceNgn.toLocaleString()}
              </div>
              {currentVehicle.priceUsdEquivalent && (
                <span className="text-[11px] font-mono text-emerald-400 block">
                  ~${currentVehicle.priceUsdEquivalent.toLocaleString()} USD (0% DUTY)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                id="showcase-view-specs-btn"
                onClick={() => onViewVehicleDetails(currentVehicle)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                Chassis Specs
              </button>

              <button
                id="showcase-ai-pitch-btn"
                onClick={() => onSelectVehicleForPitch(currentVehicle)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Car Brain Pitch
              </button>

              <a
                id="showcase-whatsapp-btn"
                href={`https://wa.me/${currentVehicle.dealerWhatsapp}?text=${encodeURIComponent(
                  `Hello ${currentVehicle.dealershipName}, inquiring about the ${currentVehicle.year} ${currentVehicle.title} showcased on Autoclaw in ${currentVehicle.city}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-white/10 transition-colors"
                title="Direct Dealer WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Machine Selector Thumbnail Strip */}
      <div className="border-t border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest shrink-0 hidden sm:inline">
            ARCHIVE //
          </span>
          {featuredList.map((veh, idx) => (
            <button
              key={veh.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(idx);
              }}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 cursor-pointer ${
                currentIndex === idx
                  ? 'bg-emerald-500/20 border-emerald-500/60 text-white shadow-md'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10'
              }`}
            >
              <div className="w-6 h-4 rounded overflow-hidden relative">
                <img src={veh.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="truncate max-w-[130px] font-semibold">{veh.model}</span>
              <span className="text-[10px] text-emerald-400">₦{(veh.priceNgn / 1000000).toFixed(1)}M</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
