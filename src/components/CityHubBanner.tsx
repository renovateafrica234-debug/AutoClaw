import React from 'react';
import { motion } from 'motion/react';
import { NigerianCity } from '../types';
import { NIGERIAN_CITIES_DATA } from '../data/mockData';
import {
  MapPin,
  Fuel,
  BatteryCharging,
  ShieldAlert,
  Sparkles,
  Building2,
  TrendingUp,
  Radio,
  Compass,
} from 'lucide-react';

interface CityHubBannerProps {
  currentCity: NigerianCity;
  onSelectCity: (city: NigerianCity) => void;
}

export const CityHubBanner: React.FC<CityHubBannerProps> = ({ currentCity, onSelectCity }) => {
  const cityData = NIGERIAN_CITIES_DATA.find(
    (c) => c.city.toLowerCase() === currentCity.toLowerCase()
  );

  if (currentCity === 'All Nigeria' || !cityData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 rounded-3xl border border-white/10 bg-[#08090c] p-6 sm:p-7 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Radio className="w-3 h-3 animate-pulse" />
                FEDERAL AUTOMOTIVE REGISTRY
              </span>
              <span className="text-xs font-mono text-slate-400">4 METROPOLITAN CLUSTERS</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
              Nigeria Dealership Shift: 0% EV Tariffs & Green Tax Surcharge
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light leading-relaxed">
              With petrol subsidies eliminated and customs waiving duties on clean energy imports, car dealerships across Abuja, Lagos, Ibadan, and Port Harcourt unlock unprecedented dealer margins.
            </p>
          </div>

          <div className="bg-black/50 border border-white/10 rounded-2xl p-4 shrink-0 text-left lg:text-right backdrop-blur-md">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              PORT CLEARING MARGIN GAIN PER EV
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Cabinet_Grotesk'] block">
              +₦3,800,000 – ₦6,500,000
            </span>
            <span className="text-[11px] font-mono text-slate-400 block">
              (0% Clean Energy Tariff vs 35% Duty + 35% Auto Levy on Petrol)
            </span>
          </div>
        </div>

        {/* 4 Metropolitan Regional Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {NIGERIAN_CITIES_DATA.map((city) => (
            <motion.div
              key={city.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectCity(city.city as any)}
              className="bg-black/40 border border-white/5 hover:border-emerald-500/40 rounded-2xl p-4.5 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white flex items-center gap-1.5 text-sm font-['Cabinet_Grotesk'] group-hover:text-emerald-400 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {city.city}
                </span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  ₦{city.currentPetrolPricePerLitre}/L
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                {city.topChallenge}
              </p>

              <div className="pt-2.5 border-t border-white/5 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 shrink-0 text-amber-300" />
                <span className="truncate">{city.dealerWinningStrategy}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 rounded-3xl border border-emerald-500/30 bg-[#08090c] p-6 sm:p-7 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500 text-slate-950 flex items-center gap-1.5 shadow-md shadow-emerald-500/20">
              <Compass className="w-3.5 h-3.5" />
              {cityData.city.toUpperCase()} HUB TELEMETRY
            </span>
            <span className="text-xs font-mono text-slate-400">{cityData.state}</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
            {cityData.city} Dealership Strategy & Road Dynamics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-light">
            <strong className="text-white font-medium">Active Motor Hub:</strong> {cityData.dealershipClusterArea}
          </p>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-3 gap-3 bg-black/60 border border-white/10 rounded-2xl p-3.5 shrink-0 backdrop-blur-md">
          <div className="text-center px-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <Fuel className="w-3 h-3 text-amber-400" /> Petrol / L
            </span>
            <span className="text-base sm:text-xl font-black text-amber-300 font-['Cabinet_Grotesk']">
              ₦{cityData.currentPetrolPricePerLitre}
            </span>
          </div>
          <div className="text-center px-3 border-x border-white/10">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-center gap-1">
              <BatteryCharging className="w-3 h-3 text-emerald-400" /> Fast Hubs
            </span>
            <span className="text-base sm:text-xl font-black text-emerald-400 font-['Cabinet_Grotesk']">
              {cityData.fastChargersCount} Hubs
            </span>
          </div>
          <div className="text-center px-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Avg. Daily</span>
            <span className="text-base sm:text-xl font-black text-white font-['Cabinet_Grotesk']">
              {cityData.avgDailyCommuteKm} km
            </span>
          </div>
        </div>
      </div>

      {/* City Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-4.5">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            Target Client Profile
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {cityData.keyBuyerDemographic}
          </p>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-4.5">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Local Road Hesitation
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {cityData.topChallenge}
          </p>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4.5">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 mb-2 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Dealer Closing Angle
          </div>
          <p className="text-xs text-slate-200 font-medium leading-relaxed">
            {cityData.dealerWinningStrategy}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
