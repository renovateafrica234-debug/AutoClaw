import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle, NigerianCity, FuelType } from '../types';
import {
  Car,
  Zap,
  BatteryCharging,
  Gauge,
  Sparkles,
  MapPin,
  MessageCircle,
  ExternalLink,
  SlidersHorizontal,
  Search,
  CheckCircle2,
  TrendingDown,
  ShieldCheck,
  Building,
  LayoutGrid,
  Columns3,
  Eye,
  ArrowUpRight,
} from 'lucide-react';

interface InventoryViewProps {
  vehicles: Vehicle[];
  currentCity: NigerianCity;
  onSelectCity: (city: NigerianCity) => void;
  onSelectVehicleForPitch: (vehicle: Vehicle) => void;
  onViewVehicleDetails: (vehicle: Vehicle) => void;
  onOpenAddModal: () => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  vehicles,
  currentCity,
  onSelectCity,
  onSelectVehicleForPitch,
  onViewVehicleDetails,
  onOpenAddModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'range-desc'>('price-asc');
  const [displayMode, setDisplayMode] = useState<'cinematic' | 'grid'>('cinematic');

  const fuelTypes = ['All', 'Electric (EV)', 'Plug-in Hybrid (PHEV)', 'Hybrid (HEV)'];
  const conditions = ['All', 'Brand New', 'Foreign Used (Tokunbo)'];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        // City match
        if (currentCity !== 'All Nigeria' && v.city.toLowerCase() !== currentCity.toLowerCase()) {
          return false;
        }
        // Fuel type match
        if (selectedFuelType !== 'All' && v.fuelType !== selectedFuelType) {
          return false;
        }
        // Condition match
        if (selectedCondition !== 'All' && v.condition !== selectedCondition) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = v.title.toLowerCase().includes(query);
          const matchMake = v.make.toLowerCase().includes(query);
          const matchModel = v.model.toLowerCase().includes(query);
          const matchCity = v.city.toLowerCase().includes(query);
          const matchDealer = v.dealershipName.toLowerCase().includes(query);
          if (!matchTitle && !matchMake && !matchModel && !matchCity && !matchDealer) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceNgn - b.priceNgn;
        if (sortBy === 'price-desc') return b.priceNgn - a.priceNgn;
        if (sortBy === 'range-desc') return (b.rangeKm || 0) - (a.rangeKm || 0);
        return 0;
      });
  }, [vehicles, currentCity, selectedFuelType, selectedCondition, searchQuery, sortBy]);

  const handleQuickWhatsApp = (vehicle: Vehicle) => {
    const text = encodeURIComponent(
      `Hello ${vehicle.dealershipName}, I am interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} listed for ₦${vehicle.priceNgn.toLocaleString()} at your ${vehicle.city} showroom. Is this vehicle currently available for inspection?`
    );
    window.open(`https://wa.me/${vehicle.dealerWhatsapp}?text=${text}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="space-y-8">
      {/* Control & Telemetry Bar */}
      <div className="rounded-3xl border border-white/10 bg-[#08090c] p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="inventory-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by make, model, or dealer (BYD, Tesla, Changan, Lekki, Maitama)..."
              className="w-full rounded-2xl border border-white/10 bg-black/60 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Powertrain Select */}
            <select
              id="filter-fuel-type"
              value={selectedFuelType}
              onChange={(e) => setSelectedFuelType(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {fuelTypes.map((ft) => (
                <option key={ft} value={ft} className="bg-slate-900">
                  {ft === 'All' ? 'Powertrain: All' : ft}
                </option>
              ))}
            </select>

            {/* Condition Select */}
            <select
              id="filter-condition"
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {conditions.map((cond) => (
                <option key={cond} value={cond} className="bg-slate-900">
                  {cond === 'All' ? 'Condition: All' : cond}
                </option>
              ))}
            </select>

            {/* Sort Select */}
            <select
              id="filter-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="price-asc" className="bg-slate-900">Sort: Price Low to High</option>
              <option value="price-desc" className="bg-slate-900">Sort: Price High to Low</option>
              <option value="range-desc" className="bg-slate-900">Sort: Longest Range First</option>
            </select>

            {/* View Mode Switcher (Full Block vs Grid) */}
            <div className="flex items-center rounded-xl border border-white/10 bg-black/60 p-1">
              <button
                onClick={() => setDisplayMode('cinematic')}
                id="view-mode-cinematic"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  displayMode === 'cinematic'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Cinematic Full Block Layout"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">FULL BLOCK</span>
              </button>
              <button
                onClick={() => setDisplayMode('grid')}
                id="view-mode-grid"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  displayMode === 'grid'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Chassis Grid Layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CHASSIS GRID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Telemetry Counter */}
        <div className="flex items-center justify-between flex-wrap gap-2 mt-4 pt-3.5 border-t border-white/[0.06] text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>INDEX:</span>
            <strong className="text-emerald-400 font-bold">{filteredVehicles.length} UNITS REGISTERED</strong>
            <span>IN</span>
            <span className="text-slate-200 font-bold">{currentCity.toUpperCase()}</span>
            {selectedFuelType !== 'All' && (
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px]">
                {selectedFuelType}
              </span>
            )}
          </div>

          {(searchQuery || selectedFuelType !== 'All' || selectedCondition !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFuelType('All');
                setSelectedCondition('All');
              }}
              className="text-emerald-400 hover:text-emerald-300 underline text-xs cursor-pointer"
            >
              RESET ALL PARAMETERS
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {filteredVehicles.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-[#08090c] p-16 text-center shadow-xl">
          <Car className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk']">
            No Machines Match Current Parameters
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1 mb-5 font-mono">
            Switch your region to "All Nigeria" or reset filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFuelType('All');
              setSelectedCondition('All');
              onSelectCity('All Nigeria');
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors"
          >
            SHOWCASE ALL NIGERIAN SHOWROOMS
          </button>
        </div>
      ) : displayMode === 'cinematic' ? (
        /* Cinematic Full-Block Mode (Awwwards 363 style) */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              id={`vehicle-card-${vehicle.id}`}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#08090c] shadow-2xl transition-all hover:border-white/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Full Block Image Area (7 cols on desktop) */}
                <div className="relative aspect-[16/9] lg:aspect-auto lg:col-span-7 overflow-hidden bg-black min-h-[320px] sm:min-h-[380px]">
                  <img
                    src={vehicle.imageUrl}
                    alt={vehicle.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center brightness-[0.82] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#08090c]" />

                  {/* Top Floating Telemetry Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 z-10">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-lg">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        {vehicle.city.toUpperCase()}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/75 backdrop-blur-md text-slate-300 border border-white/10">
                        {vehicle.condition}
                      </span>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-lg shadow-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {vehicle.dutyStatus}
                    </span>
                  </div>

                  {/* Bottom Image Specs Floating Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                      <Zap className="w-3.5 h-3.5" />
                      {vehicle.fuelType}
                    </span>
                    {vehicle.rangeKm && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md text-slate-200 border border-white/10">
                        <Gauge className="w-3.5 h-3.5 text-teal-400" />
                        {vehicle.rangeKm} KM RANGE
                      </span>
                    )}
                  </div>
                </div>

                {/* Machine Details & Editorial Block (5 cols on desktop) */}
                <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div>
                    {/* Machine Header */}
                    <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                      <span>SPEC // 0{index + 1}</span>
                      <span>{vehicle.year} MODEL</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight group-hover:text-emerald-400 transition-colors">
                      {vehicle.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-2 line-clamp-2 leading-relaxed">
                      {vehicle.description}
                    </p>

                    {/* Pricing */}
                    <div className="mt-5 p-4 rounded-2xl bg-black/40 border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        OUT-THE-DOOR LANDED PRICE
                      </span>
                      <div className="flex items-baseline justify-between gap-2 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-['Cabinet_Grotesk']">
                          ₦{vehicle.priceNgn.toLocaleString()}
                        </span>
                        {vehicle.priceUsdEquivalent && (
                          <span className="text-xs font-mono text-slate-400">
                            ~${vehicle.priceUsdEquivalent.toLocaleString()} USD
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Technical Telemetry Grid */}
                    <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-mono">
                      {vehicle.batteryCapacityKwh && (
                        <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-slate-300">
                          <BatteryCharging className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-500 block">BATTERY</span>
                            <span className="font-bold">{vehicle.batteryCapacityKwh} kWh Pack</span>
                          </div>
                        </div>
                      )}

                      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-slate-300">
                        <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-[10px] text-slate-500 block">CHARGING</span>
                          <span className="font-bold">
                            {vehicle.chargingTimeDcMins ? `${vehicle.chargingTimeDcMins}m DC Fast` : 'Self-Charging'}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2 p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-2 text-emerald-300 font-medium">
                        <TrendingDown className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Saves ~₦{vehicle.monthlyFuelSavingsNgn.toLocaleString()} / mo in PMS Petrol</span>
                      </div>
                    </div>

                    {/* Dealership Attribution */}
                    <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="truncate flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        {vehicle.dealershipName}
                      </span>
                      <span className="text-emerald-400 shrink-0">● {vehicle.status}</span>
                    </div>
                  </div>

                  {/* Actions Suite */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    <button
                      id={`btn-pitch-${vehicle.id}`}
                      onClick={() => onSelectVehicleForPitch(vehicle)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      Generate AI WhatsApp Pitch
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id={`btn-wa-${vehicle.id}`}
                        onClick={() => handleQuickWhatsApp(vehicle)}
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        WhatsApp Concierge
                      </button>

                      <button
                        id={`btn-details-${vehicle.id}`}
                        onClick={() => onViewVehicleDetails(vehicle)}
                        className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Chassis Specs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Chassis Grid Mode (3-column technical layout) */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              id={`vehicle-card-${vehicle.id}`}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#08090c] shadow-xl hover:border-emerald-500/40 transition-all"
            >
              {/* Image Block */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-center brightness-[0.82] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-black/20 to-transparent" />

                <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/75 backdrop-blur-md text-white border border-white/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    {vehicle.city}
                  </span>
                  <span className="px-2 py-1 rounded-full text-[9px] font-mono bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                    {vehicle.condition}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-slate-950 shadow-md">
                    {vehicle.dutyStatus}
                  </span>
                </div>

                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs font-mono z-10">
                  <span className="text-emerald-400 font-semibold">{vehicle.fuelType}</span>
                  {vehicle.rangeKm && (
                    <span className="text-slate-200 bg-black/60 px-2 py-0.5 rounded-md border border-white/10">
                      {vehicle.rangeKm} km
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-black text-white font-['Cabinet_Grotesk'] tracking-tight group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {vehicle.title}
                  </h3>

                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <span className="text-2xl font-black text-emerald-400 font-['Cabinet_Grotesk']">
                      ₦{vehicle.priceNgn.toLocaleString()}
                    </span>
                    {vehicle.priceUsdEquivalent && (
                      <span className="text-[11px] font-mono text-slate-400">
                        ${vehicle.priceUsdEquivalent.toLocaleString()} USD
                      </span>
                    )}
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/[0.06] text-[11px] font-mono space-y-1.5">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="text-slate-500">PACK / BATTERY:</span>
                      <span>{vehicle.batteryCapacityKwh ? `${vehicle.batteryCapacityKwh} kWh` : 'Hybrid'}</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-400 font-medium">
                      <span>FUEL SAVINGS:</span>
                      <span>~₦{vehicle.monthlyFuelSavingsNgn.toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-3 border-t border-white/10">
                  <button
                    id={`btn-pitch-${vehicle.id}`}
                    onClick={() => onSelectVehicleForPitch(vehicle)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI WhatsApp Pitch
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`btn-wa-${vehicle.id}`}
                      onClick={() => handleQuickWhatsApp(vehicle)}
                      className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      WhatsApp
                    </button>
                    <button
                      id={`btn-details-${vehicle.id}`}
                      onClick={() => onViewVehicleDetails(vehicle)}
                      className="py-2 px-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-mono flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Specs
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};
