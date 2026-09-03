import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  Menu,
  X,
  CloudSun,
  Instagram,
  MessageSquare,
  Search,
  Check,
  Copy,
  ChevronRight,
  ExternalLink,
  Phone,
  Gauge,
  Zap,
  TrendingDown,
  Layers,
  ShoppingBag,
  Share2,
  DollarSign,
  Radio,
} from 'lucide-react';
import { ArrowOutward, ArrowInward } from '@/components/ui/arrow-hover';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EvComparisonModule } from '@/components/sections/ev-comparison-module';
import { OmnichannelModule } from '@/components/sections/omnichannel-module';
import { SaasPricingModal } from '@/components/sections/saas-pricing-modal';

// Navigation / View modes
export type DashboardViewMode =
  | 'bento'
  | 'inventory'
  | 'ev-comparison'
  | 'omnichannel'
  | 'pricing'
  | 'vehicle-amenities'
  | 'social-amenities'
  | 'upcoming-events'
  | 'membership'
  | 'road-closed';

interface SudburyDashboardProps {
  onOpenOnboarding?: () => void;
  onOpenProcurementRadar?: () => void;
}

interface VehicleItem {
  id: string;
  name: string;
  category: 'Luxury SUV' | 'Clean EV' | 'Executive Sedan' | 'Tokunbo';
  price: string;
  priceNum: number;
  year: number;
  specs: string;
  transmission: string;
  dutyStatus: string;
  imageUrl: string;
  highlight: string;
  leadsCount: number;
  talkTrack: string;
}

const VEHICLES: VehicleItem[] = [
  {
    id: 'lc300',
    name: '2024 Toyota Land Cruiser 300 VXR',
    category: 'Luxury SUV',
    price: '₦185,000,000',
    priceNum: 185000000,
    year: 2024,
    specs: 'Twin-Turbo 3.5L V6 • 409 HP • 4WD',
    transmission: '10-Speed Direct-Shift',
    dutyStatus: '100% Fully Cleared',
    imageUrl: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=85',
    highlight: 'Car of the Month • Flagship Abuja Lot',
    leadsCount: 19,
    talkTrack:
      'Good day Sir. The 2024 Land Cruiser 300 VXR is fully customs cleared with authentic single-document duty papers. Available for immediate physical inspection at our Abuja Central District lot.',
  },
  {
    id: 'g63',
    name: '2024 Mercedes-AMG G 63 Magno',
    category: 'Luxury SUV',
    price: '₦295,000,000',
    priceNum: 295000000,
    year: 2024,
    specs: '4.0L V8 Biturbo • 577 HP • Night Package II',
    transmission: 'AMG SPEEDSHIFT PLUS 9G',
    dutyStatus: '100% Customs Cleared',
    imageUrl: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=85',
    highlight: 'Exclusive Showroom Storage',
    leadsCount: 24,
    talkTrack:
      'Executive greetings. 2024 G63 AMG Magno Night Edition with 0 km mileage. Ready for Maitama delivery or diplomatic escort dispatch.',
  },
  {
    id: 'byd-song',
    name: '2024 BYD Song Plus EV Flagship',
    category: 'Clean EV',
    price: '₦42,500,000',
    priceNum: 425000000,
    year: 2024,
    specs: '82 kWh Blade Battery • 520 km Range • 0% Duty',
    transmission: 'Single-Speed Direct EV',
    dutyStatus: '0% Clean Energy Duty Exemption',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
    highlight: 'Fuel Hedge: Save ₦4.8M / yr vs PMS',
    leadsCount: 14,
    talkTrack:
      'Hello. With petrol at ₦1,120/L in Abuja, this BYD Song Plus EV cuts your monthly fleet fueling cost by 82%. Solar fast-charge adapter included.',
  },
  {
    id: 'porsche-911',
    name: '2023 Porsche 911 GT3 (992)',
    category: 'Luxury SUV',
    price: '₦215,000,000',
    priceNum: 215000000,
    year: 2023,
    specs: '4.0L Naturally Aspirated Boxer-6 • 502 HP',
    transmission: '7-Speed Dual-Clutch PDK',
    dutyStatus: 'Full Federal Customs Cleared',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    highlight: 'Climate Controlled Bay 3',
    leadsCount: 11,
    talkTrack:
      'Good day. The 992 GT3 has just concluded its 180-point pre-delivery inspection with full ceramic coating. Available for private view in our VIP bay.',
  },
  {
    id: 'lx600',
    name: '2024 Lexus LX 600 Ultra Luxury',
    category: 'Luxury SUV',
    price: '₦220,000,000',
    priceNum: 220000000,
    year: 2024,
    specs: '3.5L V6 Twin-Turbo • Executive 4-Seat VIP Lounge',
    transmission: '10-Speed Automatic',
    dutyStatus: '100% Fully Cleared Duty',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=85',
    highlight: 'Ministerial & Diplomatic Spec',
    leadsCount: 18,
    talkTrack:
      'Official greetings. The LX 600 Ultra Luxury with rear massaging ottoman seats matches BPP National Assembly procurement standards.',
  },
  {
    id: 'camry-tokunbo',
    name: '2021 Toyota Camry XSE V6 (Tokunbo)',
    category: 'Tokunbo',
    price: '₦34,500,000',
    priceNum: 34500000,
    year: 2021,
    specs: '3.5L V6 • Panoramic Roof • Red Leather • Clean US Title',
    transmission: '8-Speed Automatic',
    dutyStatus: 'Tincan Customs Tinfis Verified',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=85',
    highlight: 'High Demand Abuja Daily Driver',
    leadsCount: 29,
    talkTrack:
      'Good day. Clean Tokunbo 2021 Camry XSE with authentic Lagos port release notes. Buy with complete customs escrow guarantee.',
  },
];

export const SudburyDashboard: React.FC<SudburyDashboardProps> = ({
  onOpenOnboarding,
  onOpenProcurementRadar,
}) => {
  const [viewMode, setViewMode] = useState<DashboardViewMode>('bento');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null);
  const [copiedPitchId, setCopiedPitchId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showMemberLogin, setShowMemberLogin] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginRole, setLoginRole] = useState<'dealer' | 'private'>('dealer');
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  // Live Abuja Time (WAT UTC+1)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyPitch = (vehicle: VehicleItem) => {
    navigator.clipboard.writeText(vehicle.talkTrack);
    setCopiedPitchId(vehicle.id);
    setTimeout(() => setCopiedPitchId(null), 2500);
  };

  const filteredVehicles = VEHICLES.filter((v) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'SUVs' && v.category === 'Luxury SUV') ||
      (selectedCategory === 'EVs' && v.category === 'Clean EV') ||
      (selectedCategory === 'Tokunbo' && v.category === 'Tokunbo');
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.dutyStatus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      id="sudbury-dashboard-root"
      className="relative min-h-screen w-full bg-[#000000] text-white selection:bg-[#eaff00] selection:text-black font-sans"
    >
      {/* Background Video / Cinematic Supercar Imagery with 50% dark overlay */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2000&q=85"
          alt="Atmospheric Background"
          className="h-full w-full object-cover scale-105 filter brightness-[0.28] contrast-125"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-3 sm:px-5 lg:px-8 pt-4 pb-28 min-h-screen flex flex-col justify-between">
        {/* VIEW 1: 363 SUDBURY BENTO DASHBOARD */}
        {viewMode === 'bento' && (
          <motion.main
            key="bento"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full flex-1 flex flex-col"
          >
            {/* Top Bar: Logo, Social Links, Fast Navigation Switchers, Weather */}
            <div className="grid grid-cols-1 md:grid-cols-16 gap-2 mb-2">
              {/* Logo Panel (col-span-6) */}
              <div className="md:col-span-6 rounded-md bg-black/50 border border-white/10 p-3 sm:p-4 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="inline-flex aspect-square h-8 w-8 items-center justify-center rounded-sm bg-[#eaff00] text-black font-black text-sm">
                    363
                  </div>
                  <div>
                    <h1 className="text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                      AutoClaw Car & Sales Club
                    </h1>
                    <p className="text-[11px] font-mono text-[#b3b3b3] uppercase tracking-wider">
                      Abuja Regional Network • FCT Central District
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setViewMode('road-closed')}
                  title="Simulate 363 /b route"
                  className="hidden sm:inline-flex text-[11px] font-mono text-[#b3b3b3] hover:text-[#eaff00] px-2 py-1 rounded bg-black/40 border border-white/10"
                >
                  /b
                </button>
              </div>

              {/* Fast Module Switcher (col-span-6) */}
              <div className="md:col-span-6 rounded-md bg-black/50 border border-white/10 p-2 flex items-center justify-between gap-1.5 backdrop-blur-md overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('ev-comparison')}
                  className="px-2.5 py-1.5 rounded-sm bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 hover:border-[#eaff00] text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Zap size={13} className="text-[#eaff00]" />
                  <span>EV vs. ICE</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('omnichannel')}
                  className="px-2.5 py-1.5 rounded-sm bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 hover:border-[#eaff00] text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Share2 size={13} className="text-[#eaff00]" />
                  <span>7-Platform Sync</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('pricing')}
                  className="px-2.5 py-1.5 rounded-sm bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 hover:border-[#eaff00] text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <DollarSign size={13} className="text-[#eaff00]" />
                  <span>SaaS Plans</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('inventory')}
                  className="px-2.5 py-1.5 rounded-sm bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 hover:border-[#eaff00] text-white text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <Car size={13} className="text-[#eaff00]" />
                  <span>Lot</span>
                </button>
              </div>

              {/* Weather & Live Time Widget (col-span-4) */}
              <div className="md:col-span-4 rounded-md bg-black/50 border border-white/10 p-3 flex items-center justify-between backdrop-blur-md font-mono text-xs">
                <div className="flex items-center gap-2">
                  <CloudSun size={16} className="text-[#eaff00]" />
                  <div>
                    <span className="text-white font-bold block leading-none">
                      29°C Partly Cloudy
                    </span>
                    <span className="text-[10px] text-[#b3b3b3]">Abuja, Nigeria</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[#eaff00] font-bold block">{currentTime || '12:00 PM'}</span>
                  <span className="text-[10px] text-[#b3b3b3]">WAT</span>
                </div>
              </div>
            </div>

            {/* Main Asymmetric Bento Grid (16 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-16 gap-2">
              {/* PANEL 1: About / Impact Showcase (col-span-11, row-span-2) */}
              <div
                onClick={() => setViewMode('inventory')}
                className="group md:col-span-11 relative rounded-md overflow-hidden bg-black/60 border border-white/10 min-h-[360px] md:min-h-[420px] flex flex-col justify-between p-5 sm:p-7 backdrop-blur-md hover:border-[#eaff00]/50 transition-all duration-500 cursor-pointer"
              >
                {/* Background Image inside card */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
                    alt="AutoClaw Exotic Sanctuary"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Top Header Row of card */}
                <div className="flex items-center justify-between w-full">
                  <div className="inline-flex items-center gap-2">
                    <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                      <Car size={14} />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#eaff00]">
                      Abuja Automotive Sanctuary
                    </span>
                  </div>

                  <div className="text-white group-hover:text-[#eaff00] transition-colors">
                    <ArrowOutward size={20} />
                  </div>
                </div>

                {/* Bottom Content Row */}
                <div className="space-y-3 max-w-2xl">
                  <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.1] group-hover:text-white">
                    What is AutoClaw?
                  </h2>
                  <p className="text-sm sm:text-base text-[#b3b3b3] font-normal leading-relaxed">
                    AutoClaw is the ultimate automotive destination where passion, precision, and verified Nigerian market execution converge. More than storage, it’s a sanctuary for extraordinary automobiles, guaranteed customs duty escrow, and autonomous dealer syndication across Abuja.
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#eaff00]">
                    <span>Explore 6 Flagship Lots</span>
                    <span>•</span>
                    <span>100% Customs Cleared</span>
                    <span>•</span>
                    <span>Click to Enter Showroom</span>
                  </div>
                </div>
              </div>

              {/* PANEL 2: Event & Car of the Month (col-span-5) */}
              <div className="md:col-span-5 rounded-md bg-black/60 border border-white/10 p-5 flex flex-col justify-between backdrop-blur-md hover:border-[#eaff00]/50 transition-colors duration-300">
                {/* Upcoming Event Section */}
                <div
                  onClick={() => setViewMode('upcoming-events')}
                  className="group pb-4 border-b border-white/10 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="inline-flex aspect-square h-5 w-5 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                        <Calendar size={12} />
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#b3b3b3]">
                        Upcoming Event
                      </span>
                    </div>
                    <ArrowOutward size={14} />
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-[#eaff00] transition-colors">
                    BPP Federal Fleet Procurement
                  </h3>
                  <p className="text-xs text-[#b3b3b3] font-mono mt-0.5">
                    Ministerial Tender Session • ECOWAS Chancery Protocol
                  </p>
                </div>

                {/* Car of the Month Section */}
                <div
                  onClick={() => {
                    setSelectedVehicle(VEHICLES[0]);
                    setViewMode('inventory');
                  }}
                  className="group pt-4 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#eaff00]">
                      Car of the Month
                    </span>
                    <ArrowOutward size={14} />
                  </div>

                  <div className="relative h-28 w-full rounded overflow-hidden mb-2 border border-white/10">
                    <img
                      src={VEHICLES[0].imageUrl}
                      alt={VEHICLES[0].name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-sm bg-black/80 text-[10px] font-mono text-[#eaff00]">
                      LC300 VXR
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-white group-hover:text-[#eaff00] transition-colors truncate">
                      {VEHICLES[0].name}
                    </span>
                    <span className="text-sm font-bold text-[#eaff00] font-mono ml-2">
                      {VEHICLES[0].price}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#b3b3b3] block mt-0.5">
                    100% Fully Cleared Duty • Single Doc Verified
                  </span>
                </div>
              </div>

              {/* PANEL 3 (MODULE 1): EV & Dynamic Comparison / TCO Engine (col-span-8) */}
              <div
                onClick={() => setViewMode('ev-comparison')}
                className="group md:col-span-8 relative rounded-md overflow-hidden bg-black/60 border border-white/10 min-h-[240px] flex flex-col justify-between p-5 backdrop-blur-md hover:border-[#eaff00]/70 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=85"
                    alt="Pure Electric EV Showcase"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                      <Zap size={14} />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#eaff00] font-bold">
                      Module 1 • EV & TCO Comparison
                    </span>
                  </div>
                  <div className="text-white group-hover:text-[#eaff00] transition-colors">
                    <ArrowOutward size={18} />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#eaff00] transition-colors">
                      Best-Selling EVs vs. Traditional ICE
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#b3b3b3] max-w-lg">
                    Real-world 3/5/10-year TCO math, 0% customs duty waivers, and kinetic side-by-side comparison for BYD, Changan Deepal, and Tesla.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-xs bg-[#eaff00]/15 text-[#eaff00] border border-[#eaff00]/30 font-bold">
                      Saves ~₦1.85M/yr on fuel
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-black/60 text-white border border-white/10">
                      0% Duty Customs Clearance
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-black/60 text-white border border-white/10">
                      Side-by-Side Kinetic Swipe
                    </span>
                  </div>
                </div>
              </div>

              {/* PANEL 4 (MODULE 2): Omnichannel Aggregation Hub & Source of Truth (col-span-8) */}
              <div
                onClick={() => setViewMode('omnichannel')}
                className="group md:col-span-8 relative rounded-md overflow-hidden bg-black/60 border border-white/10 min-h-[240px] flex flex-col justify-between p-5 backdrop-blur-md hover:border-[#eaff00]/70 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=85"
                    alt="Omnichannel Aggregation Hub"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                </div>

                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                      <Share2 size={14} />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#eaff00] font-bold">
                      Module 2 • Omnichannel Aggregation
                    </span>
                  </div>
                  <div className="text-white group-hover:text-[#eaff00] transition-colors">
                    <ArrowOutward size={18} />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#eaff00] transition-colors">
                    Universal Multi-Platform Hub (7 Channels)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b3b3b3] max-w-lg">
                    Two-way sync across Jiji, Cars45, Autochek, Carmart, BuyCars, Facebook Marketplace, and TikTok. Automated instant universal delist upon sale.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded-xs bg-[#eaff00]/15 text-[#eaff00] border border-[#eaff00]/30 font-bold">
                      7/7 Channels Connected
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-black/60 text-white border border-white/10">
                      Zero Double-Booking Risk
                    </span>
                    <span className="px-2 py-0.5 rounded-xs bg-black/60 text-white border border-white/10">
                      Unified CRM Leads
                    </span>
                  </div>
                </div>
              </div>

              {/* THREE EXPANDABLE CALLOUT LINKS (Flex basis hover expand like 363 Sudbury) */}
              <div
                onClick={() => setViewMode('pricing')}
                className="group col-span-16 md:col-span-5 rounded-md bg-black/60 border border-white/10 p-4 flex flex-col justify-between backdrop-blur-md hover:border-[#eaff00]/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                    <DollarSign size={14} />
                  </div>
                  <ArrowOutward size={16} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white group-hover:text-[#eaff00] transition-colors">
                    Dealership SaaS Plans
                  </h4>
                  <p className="text-xs text-[#b3b3b3] font-mono mt-0.5">
                    Basic (₦45k) • Pro (₦120k) • Command Center (₦285k+)
                  </p>
                </div>
              </div>

              <div
                onClick={() => {
                  if (onOpenProcurementRadar) {
                    onOpenProcurementRadar();
                  } else {
                    setViewMode('upcoming-events');
                  }
                }}
                className="group col-span-16 md:col-span-6 rounded-md bg-black/60 border border-white/10 p-4 flex flex-col justify-between backdrop-blur-md hover:border-[#eaff00]/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                    <Calendar size={14} />
                  </div>
                  <ArrowOutward size={16} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white group-hover:text-[#eaff00] transition-colors">
                    BPP Federal Fleet Procurement
                  </h4>
                  <p className="text-xs text-[#b3b3b3] font-mono mt-0.5">
                    Live ECOWAS Chancery & Ministerial Tenders
                  </p>
                </div>
              </div>

              <div
                onClick={() => {
                  if (onOpenOnboarding) {
                    onOpenOnboarding();
                  } else {
                    setViewMode('membership');
                  }
                }}
                className="group col-span-16 md:col-span-5 rounded-md bg-black/60 border border-white/10 p-4 flex flex-col justify-between backdrop-blur-md hover:border-[#eaff00]/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                    <ShieldCheck size={14} />
                  </div>
                  <ArrowOutward size={16} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white group-hover:text-[#eaff00] transition-colors">
                    Dealership Onboarding
                  </h4>
                  <p className="text-xs text-[#b3b3b3] font-mono mt-0.5">
                    Join Abuja & Lagos Verified Lot Syndicate
                  </p>
                </div>
              </div>
            </div>
          </motion.main>
        )}

        {/* VIEW 2: VEHICLE INVENTORY SHOWROOM */}
        {viewMode === 'inventory' && (
          <motion.div
            key="inventory"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full space-y-6"
          >
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                    <Car size={14} />
                  </div>
                  <h2 className="text-2xl font-semibold text-white tracking-tight">
                    Vehicle Inventory & Lots
                  </h2>
                </div>
                <p className="text-xs font-mono text-[#b3b3b3] mt-1">
                  Abuja Central District • 100% Customs Cleared • Instant WhatsApp Dealership Talk Track
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {['All', 'SUVs', 'EVs', 'Tokunbo'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#eaff00] text-black font-bold'
                        : 'bg-black/60 text-[#b3b3b3] hover:text-white border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b3b3b3]"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Land Cruiser, G63, BYD EV, Tokunbo..."
                className="w-full pl-9 pr-4 py-2.5 rounded-md bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-[#808080] focus:outline-none focus:border-[#eaff00]"
              />
            </div>

            {/* Vehicle Grid (clean images, no unnecessary icons) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="group rounded-md bg-black/60 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#eaff00]/60 transition-all duration-300"
                >
                  {/* Vehicle Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-black">
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5 flex gap-2">
                      <span className="px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-md text-[10px] font-mono text-[#eaff00] border border-white/10">
                        {vehicle.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-sm bg-black/80 backdrop-blur-md text-[10px] font-mono text-white border border-white/10">
                        {vehicle.year}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-sm bg-black/90 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30">
                        {vehicle.dutyStatus}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-semibold text-white leading-tight">
                        {vehicle.name}
                      </h3>
                      <span className="text-base font-bold text-[#eaff00] font-mono shrink-0">
                        {vehicle.price}
                      </span>
                    </div>

                    <p className="text-xs text-[#b3b3b3] font-mono leading-normal">
                      {vehicle.specs}
                    </p>

                    <div className="text-[11px] font-mono text-[#808080] pt-1 border-t border-white/10 flex items-center justify-between">
                      <span>Transmission: {vehicle.transmission}</span>
                      <span className="text-[#eaff00]">{vehicle.leadsCount} buyer leads</span>
                    </div>
                  </div>

                  {/* Footer CTAs */}
                  <div className="p-4 pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyPitch(vehicle)}
                      className="flex-1 py-2 px-3 rounded-sm bg-black/80 border border-white/20 hover:border-[#eaff00] text-white hover:text-[#eaff00] text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedPitchId === vehicle.id ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span>Copied WhatsApp Pitch</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Sales Pitch</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const url = `https://wa.me/2348092886252?text=${encodeURIComponent(
                          `Hello AutoClaw Abuja. I am inquiring about the ${vehicle.name} (${vehicle.price}). Please send full customs papers and lot location.`
                        )}`;
                        window.open(url, '_blank');
                      }}
                      className="py-2 px-3 rounded-sm bg-[#eaff00] hover:bg-[#bbcc03] text-black font-semibold text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Phone size={12} />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 3: VEHICLE AMENITIES & STORAGE */}
        {viewMode === 'vehicle-amenities' && (
          <motion.div
            key="vehicle-amenities"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full space-y-6"
          >
            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                  <Car size={14} />
                </div>
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Storage & Vehicle Amenities
                </h2>
              </div>
              <p className="text-xs font-mono text-[#b3b3b3] mt-1">
                State-of-the-art climate-controlled facility including shared space for up to 60 top-tier collectible cars in Abuja.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Highlight 1: Storage */}
              <div className="rounded-md bg-black/60 border border-white/10 overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80"
                    alt="Storage Facility"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-semibold text-white">
                    Climate-Controlled Storage
                  </h3>
                  <p className="text-xs text-[#b3b3b3] leading-relaxed">
                    363’s open concept guarantees your car gets the attention it deserves. Monitored 24/7 with biometric access and battery trickle tenders.
                  </p>
                </div>
              </div>

              {/* Highlight 2: Detailing */}
              <div className="rounded-md bg-black/60 border border-white/10 overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
                    alt="Ceramic Coating"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-semibold text-white">
                    Detailing & Paint Protection (PPF)
                  </h3>
                  <p className="text-xs text-[#b3b3b3] leading-relaxed">
                    Full vehicle decontamination, paint correction, self-healing PPF, and ceramic glass coatings executed by master technicians.
                  </p>
                </div>
              </div>

              {/* Highlight 3: Customs Verification */}
              <div className="rounded-md bg-black/60 border border-white/10 overflow-hidden flex flex-col">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
                    alt="Inspection & Telemetry"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-semibold text-white">
                    180-Point Customs Escrow
                  </h3>
                  <p className="text-xs text-[#b3b3b3] leading-relaxed">
                    Single-document Nigerian customs verification, chassis VIN scrub against INTERPOL databases, and EV battery health telemetry.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 4: SOCIAL AMENITIES */}
        {viewMode === 'social-amenities' && (
          <motion.div
            key="social-amenities"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full space-y-6"
          >
            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                  <Users size={14} />
                </div>
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Social Amenities & Club Lounges
                </h2>
              </div>
              <p className="text-xs font-mono text-[#b3b3b3] mt-1">
                Abuja’s private automotive clubhouse for private negotiations, corporate retreats, and diplomatic gatherings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md bg-black/60 border border-white/10 overflow-hidden">
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=85"
                    alt="Executive Boardroom"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    The Private Negotiation Suite
                  </h3>
                  <p className="text-xs text-[#b3b3b3] leading-relaxed">
                    A soundproof, confidential boardroom configured for multi-vehicle fleet acquisitions, government tenders, and escrow closings. High-speed fiber, video conferencing, and bar service included.
                  </p>
                </div>
              </div>

              <div className="rounded-md bg-black/60 border border-white/10 overflow-hidden">
                <div className="h-64 w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85"
                    alt="Member Lounge"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    Members Lounge & Racing Sim
                  </h3>
                  <p className="text-xs text-[#b3b3b3] leading-relaxed">
                    Fully stocked bar and lounge for automotive enthusiasts, featuring a commercial-grade GT racing simulator for track telemetry practice and Cars & Coffee social gatherings.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 5: UPCOMING EVENTS & BPP TENDERS */}
        {viewMode === 'upcoming-events' && (
          <motion.div
            key="upcoming-events"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full space-y-6"
          >
            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                  <Calendar size={14} />
                </div>
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  Upcoming Events & Tenders
                </h2>
              </div>
              <p className="text-xs font-mono text-[#b3b3b3] mt-1">
                Calendar of verified Bureau of Public Procurement (BPP) federal fleet bids and private collector showcases.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  date: 'OCT 12, 2026',
                  title: 'BPP Federal Ministry Fleet Procurement Tender',
                  location: 'Abuja International Conference Centre',
                  desc: 'Procurement of 40 VIP Armored & Non-Armored SUVs for Federal Parastatals.',
                  badge: 'Verified Tender',
                },
                {
                  date: 'OCT 26, 2026',
                  title: 'Abuja Supercar & Tokunbo Verified Auction',
                  location: 'AutoClaw Showroom Bay 1, Central Business District',
                  desc: 'Public bidding on 18 customs-cleared luxury vehicles and EV clean fleet models.',
                  badge: 'Public Event',
                },
                {
                  date: 'NOV 08, 2026',
                  title: 'ECOWAS Diplomatic Duty-Free Vehicle Protocol',
                  location: 'Maitama Diplomatic Quarter',
                  desc: 'Protocol meeting on duty-free vehicle swaps and diplomatic plates documentation.',
                  badge: 'Members Only',
                },
              ].map((ev, i) => (
                <div
                  key={i}
                  className="rounded-md bg-black/60 border border-white/10 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#eaff00]/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="px-3 py-2 rounded-sm bg-black/80 border border-white/10 font-mono text-center shrink-0">
                      <span className="text-[10px] text-[#b3b3b3] block uppercase">Date</span>
                      <span className="text-xs font-bold text-[#eaff00]">{ev.date}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">{ev.title}</h3>
                        <span className="px-2 py-0.5 rounded-sm bg-[#eaff00]/10 text-[#eaff00] text-[10px] font-mono">
                          {ev.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#b3b3b3] mt-0.5">{ev.desc}</p>
                      <span className="text-[11px] font-mono text-[#808080] mt-1 block">
                        Location: {ev.location}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenProcurementRadar}
                    className="py-2 px-4 rounded-sm bg-black/80 border border-white/20 hover:border-[#eaff00] text-xs font-mono text-white hover:text-[#eaff00] flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                  >
                    <span>Receive Radar Alerts</span>
                    <ArrowOutward size={13} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW 6: MEMBERSHIP & ONBOARDING */}
        {viewMode === 'membership' && (
          <motion.div
            key="membership"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full space-y-6"
          >
            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-bold">
                  <ShieldCheck size={14} />
                </div>
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  AutoClaw Membership & Lots
                </h2>
              </div>
              <p className="text-xs font-mono text-[#b3b3b3] mt-1">
                Select your operation profile to connect with verified Abuja buyers and customs escrow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md bg-black/60 border border-white/10 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#eaff00]">
                    Showroom Tier
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-1">
                    Licensed Dealership Membership
                  </h3>
                  <p className="text-xs text-[#b3b3b3] mt-2 leading-relaxed">
                    Designed for car lots and luxury fleet dealers in Abuja. Includes automatic multi-channel syndication to Jiji, Cars45, and Instagram, plus WhatsApp procurement radar notifications.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-[#b3b3b3]">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#eaff00]" />
                    <span>6-Worker BullMQ Automation Engine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#eaff00]" />
                    <span>Unlimited Inventory Listings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#eaff00]" />
                    <span>BPP Federal Procurement Radar Integration</span>
                  </div>
                </div>

                <Button
                  variant="yellow"
                  size="md"
                  onClick={() => {
                    if (onOpenOnboarding) onOpenOnboarding();
                  }}
                  className="w-full text-xs font-mono uppercase tracking-wider"
                >
                  Launch Dealership Setup
                </Button>
              </div>

              <div className="rounded-md bg-black/60 border border-white/10 p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#b3b3b3]">
                    Collector Tier
                  </span>
                  <h3 className="text-xl font-semibold text-white mt-1">
                    Private Seller & Collector Escrow
                  </h3>
                  <p className="text-xs text-[#b3b3b3] mt-2 leading-relaxed">
                    For individuals selling private luxury, Tokunbo, or EV vehicles in Nigeria. Benefit from verified customs duty authentication, bank escrow payout, and serious pre-screened buyers.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10 text-xs font-mono text-[#b3b3b3]">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#eaff00]" />
                    <span>100% Guaranteed Escrow Protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#eaff00]" />
                    <span>Instant Fair Nigerian Valuation Model</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-[#eaff00]" />
                    <span>Direct WhatsApp Buyer Introductions</span>
                  </div>
                </div>

                <Button
                  variant="action"
                  size="md"
                  onClick={() => setViewMode('inventory')}
                  className="w-full text-xs font-mono uppercase tracking-wider"
                >
                  Explore Inventory First
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 7: EXACT 363 ROAD CLOSED 404 PAGE (/b) */}
        {viewMode === 'road-closed' && (
          <motion.div
            key="road-closed"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full flex-1 flex flex-col items-center justify-center text-center py-16"
          >
            {/* 404 Graphic text */}
            <div className="text-7xl sm:text-9xl font-black font-mono tracking-tighter text-[#eaff00]/20 select-none mb-2">
              404
            </div>

            <div className="space-y-2 max-w-md mx-auto mb-6">
              <h2 className="text-3xl font-semibold text-[#eaff00]">Road closed</h2>
              <p className="text-sm text-[#b3b3b3]">
                The page you're looking for doesn't exist or cannot be found.
              </p>
            </div>

            <Button
              variant="yellow"
              size="md"
              onClick={() => setViewMode('bento')}
              className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <span>Return to Dashboard</span>
              <ArrowOutward size={14} />
            </Button>
          </motion.div>
        )}

        {/* VIEW 8: MODULE 1 - EV & DYNAMIC COMPARISON / TCO ENGINE */}
        {viewMode === 'ev-comparison' && (
          <motion.div
            key="ev-comparison"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <EvComparisonModule onClose={() => setViewMode('bento')} />
          </motion.div>
        )}

        {/* VIEW 9: MODULE 2 - OMNICHANNEL MULTI-PLATFORM AGGREGATION & SOURCE OF TRUTH */}
        {viewMode === 'omnichannel' && (
          <motion.div
            key="omnichannel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <OmnichannelModule onClose={() => setViewMode('bento')} />
          </motion.div>
        )}

        {/* VIEW 10: SAAS STRATEGIC PRICING & ROI CALCULATOR */}
        {viewMode === 'pricing' && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <SaasPricingModal
              onClose={() => setViewMode('bento')}
              onSelectTier={() => setViewMode('bento')}
            />
          </motion.div>
        )}

        {/* BOTTOM FIXED ACTION DOCK (Exact 363 Sudbury implementation with Landon Norris kinetic feel) */}
        <div
          data-action-buttons
          className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-black/85 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-3 sm:px-8"
        >
          {/* Left Location Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-[#b3b3b3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#eaff00] animate-pulse" />
            <span>Abuja Central District • 7 Channels Synced</span>
          </div>

          {/* Center Action Group */}
          <div className="mx-auto flex items-center gap-1.5 sm:gap-2">
            {viewMode !== 'bento' && (
              <button
                type="button"
                id="sudbury-back-action-btn"
                onClick={() => setViewMode('bento')}
                className="group px-4 sm:px-5 py-2 rounded-full bg-black/80 border border-white/20 hover:border-[#eaff00] text-white hover:text-[#eaff00] transition-all duration-300 font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg cursor-pointer"
              >
                <ArrowInward size={14} />
                <span>Dashboard</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setViewMode('ev-comparison')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'ev-comparison'
                  ? 'bg-[#eaff00] text-black font-bold'
                  : 'bg-black/60 border border-white/15 text-white hover:border-[#eaff00]'
              }`}
            >
              <Zap size={13} className={viewMode === 'ev-comparison' ? 'text-black' : 'text-[#eaff00]'} />
              <span className="hidden sm:inline">EV vs. ICE</span>
              <span className="sm:hidden">EV</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('omnichannel')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'omnichannel'
                  ? 'bg-[#eaff00] text-black font-bold'
                  : 'bg-black/60 border border-white/15 text-white hover:border-[#eaff00]'
              }`}
            >
              <Share2 size={13} className={viewMode === 'omnichannel' ? 'text-black' : 'text-[#eaff00]'} />
              <span className="hidden sm:inline">Omnichannel</span>
              <span className="sm:hidden">Omni</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('pricing')}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'pricing'
                  ? 'bg-[#eaff00] text-black font-bold'
                  : 'bg-black/60 border border-white/15 text-white hover:border-[#eaff00]'
              }`}
            >
              <DollarSign size={13} className={viewMode === 'pricing' ? 'text-black' : 'text-[#eaff00]'} />
              <span className="hidden sm:inline">SaaS Plans</span>
              <span className="sm:hidden">Plans</span>
            </button>

            <button
              type="button"
              id="sudbury-explore-action-btn"
              onClick={() => setViewMode('inventory')}
              className={`px-3.5 sm:px-5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'inventory'
                  ? 'bg-[#eaff00] text-black font-bold'
                  : 'bg-black/60 border border-white/15 text-white hover:border-[#eaff00]'
              }`}
            >
              <Car size={13} className={viewMode === 'inventory' ? 'text-black' : 'text-[#eaff00]'} />
              <span>Lot</span>
            </button>
          </div>

          {/* Right Member Login Link (underlined with yellow hover) */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowMemberLogin(true)}
              className="relative text-xs font-mono text-white transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:block after:h-[1px] after:w-full after:bg-white after:transition-colors after:duration-300 hover:text-[#eaff00] hover:after:bg-[#eaff00] cursor-pointer"
            >
              Dealer Login
            </button>
          </div>
        </div>
      </div>

      {/* MEMBER / DEALER LOGIN MODAL */}
      <AnimatePresence>
        {showMemberLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-md bg-[#0a0a0a] border border-white/15 p-6 space-y-5 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => {
                  setShowMemberLogin(false);
                  setLoginSuccess(false);
                }}
                className="absolute top-4 right-4 text-[#b3b3b3] hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="space-y-1">
                <div className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] text-black font-black text-xs mb-2">
                  363
                </div>
                <h3 className="text-xl font-semibold text-white">Member & Dealer Portal</h3>
                <p className="text-xs font-mono text-[#b3b3b3]">
                  Enter your Abuja Dealership PIN or Private Collector credentials.
                </p>
              </div>

              {loginSuccess ? (
                <div className="p-4 rounded bg-[#eaff00]/10 border border-[#eaff00]/30 text-[#eaff00] text-xs font-mono text-center space-y-2">
                  <p className="font-bold">✓ Authenticated to Abuja Dealership Cloud</p>
                  <p className="text-[#b3b3b3]">Redirecting to lot syndication console...</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setLoginSuccess(true);
                    setTimeout(() => {
                      setShowMemberLogin(false);
                      setLoginSuccess(false);
                      setViewMode('inventory');
                    }, 1200);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLoginRole('dealer')}
                      className={`py-2 px-3 rounded-sm text-xs font-mono transition-colors ${
                        loginRole === 'dealer'
                          ? 'bg-[#eaff00] text-black font-bold'
                          : 'bg-black/40 text-[#b3b3b3] border border-white/10'
                      }`}
                    >
                      Licensed Dealer
                    </button>
                    <button
                      type="button"
                      onClick={() => setLoginRole('private')}
                      className={`py-2 px-3 rounded-sm text-xs font-mono transition-colors ${
                        loginRole === 'private'
                          ? 'bg-[#eaff00] text-black font-bold'
                          : 'bg-black/40 text-[#b3b3b3] border border-white/10'
                      }`}
                    >
                      Private Seller
                    </button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#b3b3b3] block uppercase">
                      Official Email or Abuja Phone
                    </label>
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. dealer@maitama-motors.ng"
                      className="w-full px-3 py-2 rounded bg-black border border-white/20 text-xs font-mono text-white placeholder:text-[#666] focus:outline-none focus:border-[#eaff00]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-[#b3b3b3] block uppercase">
                      Access Passcode / Security PIN
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded bg-black border border-white/20 text-xs font-mono text-white placeholder:text-[#666] focus:outline-none focus:border-[#eaff00]"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="yellow"
                    size="md"
                    className="w-full text-xs font-mono uppercase tracking-wider"
                  >
                    Authenticate Portal
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
