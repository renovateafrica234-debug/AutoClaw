import React from 'react';
import { motion } from 'motion/react';
import { NigerianCity } from '../types';
import {
  Car,
  BrainCircuit,
  Calculator,
  ShieldCheck,
  Users,
  PlusCircle,
  Sparkles,
  MapPin,
  TrendingDown,
  Zap,
  Radio,
} from 'lucide-react';

interface HeaderProps {
  currentCity: NigerianCity;
  onSelectCity: (city: NigerianCity) => void;
  activeTab: 'inventory' | 'car-brain' | 'tco-calculator' | 'policy' | 'leads';
  setActiveTab: (tab: 'inventory' | 'car-brain' | 'tco-calculator' | 'policy' | 'leads') => void;
  onOpenAddModal: () => void;
  totalInventoryCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCity,
  onSelectCity,
  activeTab,
  setActiveTab,
  onOpenAddModal,
  totalInventoryCount,
}) => {
  const cities: { label: NigerianCity; coords: string }[] = [
    { label: 'All Nigeria', coords: 'NATIONAL' },
    { label: 'Lagos', coords: '06°27\'N' },
    { label: 'Abuja', coords: '09°04\'N' },
    { label: 'Ibadan', coords: '07°23\'N' },
    { label: 'Port Harcourt', coords: '04°49\'N' },
  ];

  const navItems: { id: 'inventory' | 'car-brain' | 'tco-calculator' | 'policy' | 'leads'; label: string; icon: any; count?: number; tag?: string }[] = [
    { id: 'inventory', label: 'Showroom Lot', icon: Car, count: totalInventoryCount },
    { id: 'car-brain', label: 'Car Brain AI', icon: BrainCircuit, tag: '3.8 Flash' },
    { id: 'tco-calculator', label: 'Fuel vs EV ROI', icon: Calculator },
    { id: 'policy', label: 'Customs & Tariffs', icon: ShieldCheck, tag: '0% Duty' },
    { id: 'leads', label: 'Client Pipeline', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#08090c]/90 backdrop-blur-xl transition-colors">
      {/* Top Telemetry Ticker (Awwwards 363 style) */}
      <div className="border-b border-white/[0.06] bg-black/40 px-4 py-1.5 text-[11px] font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AUTOCLAW INDEX
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
              PMS Petrol: <strong className="text-amber-300 font-medium font-sans">₦1,120/L</strong>
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1 text-emerald-300">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              EV Tariff: <strong className="text-emerald-300">0% Waived</strong> vs Petrol (35% + 35% Levy)
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-slate-400">
            <span>REGIONS: ABUJA // LAGOS // IBADAN // PORT HARCOURT</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center text-white shadow-xl">
              <Car className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-['Cabinet_Grotesk']">
                  AUTOCLAW
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  CAR BRAIN 2.4
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                Nigeria Auto & EV Dealership Suite
              </p>
            </div>
          </div>

          {/* Mobile CTA */}
          <button
            onClick={onOpenAddModal}
            className="md:hidden px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-lg shadow-emerald-500/20"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        {/* Navigation Tabs with Animated Layout Indicator */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer z-10 ${
                  isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 bg-white/10 border border-white/20 rounded-xl shadow-inner -z-10"
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="px-1.5 py-0.2 text-[10px] font-mono rounded-full bg-black/40 text-slate-300 border border-white/10">
                    {item.count}
                  </span>
                )}
                {item.tag && (
                  <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="header-add-vehicle-btn"
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            Add To Showroom
          </button>
        </div>
      </div>

      {/* Regional Telemetry Bar */}
      <div className="border-t border-white/[0.04] bg-black/30 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>METROPOLITAN CLUSTER:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {cities.map((city) => (
              <button
                key={city.label}
                id={`city-filter-${city.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onSelectCity(city.label)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentCity === city.label
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <span>{city.label}</span>
                <span className="text-[10px] opacity-70">[{city.coords}]</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
