import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  Zap,
  CheckCircle2,
  Clock,
  Archive,
  Car,
  TrendingUp,
  Tag,
  DollarSign,
  Share2,
  Sparkles,
  Layers,
  X,
  Eye,
  MessageCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Vehicle, VehicleStatus } from '@/types';

const INITIAL_DASHBOARD_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    make: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2022,
    price: 28500000,
    status: 'listed',
    aiOptimized: true,
    syndication: {
      facebook: true,
      instagram: true,
      jiji: true,
      cars45: true,
    },
    mileage: '34,200 km',
    transmission: 'Automatic',
    fuelType: 'Petrol (V6)',
    location: 'Central Area, Abuja',
    imageUrl: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80',
    viewsCount: 1240,
    leadsCount: 18,
  },
  {
    id: 'veh-2',
    make: 'Honda',
    model: 'CR-V',
    year: 2021,
    price: 18500000,
    status: 'listed',
    aiOptimized: true,
    syndication: {
      facebook: true,
      instagram: true,
      jiji: true,
      cars45: false,
    },
    mileage: '41,000 km',
    transmission: 'CVT Automatic',
    fuelType: 'Petrol Turbo',
    location: 'Maitama, Abuja',
    imageUrl: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=80',
    viewsCount: 890,
    leadsCount: 12,
  },
  {
    id: 'veh-3',
    make: 'BMW',
    model: 'X5 xDrive40i',
    year: 2023,
    price: 52000000,
    status: 'pending',
    aiOptimized: true,
    syndication: {
      facebook: true,
      instagram: true,
      jiji: false,
      cars45: false,
    },
    mileage: '14,800 km',
    transmission: 'Steptronic 8-Speed',
    fuelType: 'Petrol Mild-Hybrid',
    location: 'Wuse 2, Abuja',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    viewsCount: 2150,
    leadsCount: 27,
  },
  {
    id: 'veh-4',
    make: 'Lexus',
    model: 'RX 350 F-Sport',
    year: 2022,
    price: 35000000,
    status: 'sold',
    aiOptimized: true,
    syndication: {
      facebook: true,
      instagram: true,
      jiji: true,
      cars45: true,
    },
    mileage: '28,000 km',
    transmission: '8-Speed Automatic',
    fuelType: 'Petrol (V6)',
    location: 'Garki 2, Abuja',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    viewsCount: 3400,
    leadsCount: 39,
  },
  {
    id: 'veh-5',
    make: 'Hyundai',
    model: 'Tucson Limited',
    year: 2023,
    price: 22000000,
    status: 'draft',
    aiOptimized: false,
    syndication: {
      facebook: false,
      instagram: false,
      jiji: false,
      cars45: false,
    },
    mileage: '19,500 km',
    transmission: 'Shift-by-wire Auto',
    fuelType: 'Petrol',
    location: 'Guzape, Abuja',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    viewsCount: 210,
    leadsCount: 2,
  },
];

interface DashboardProps {
  onConnectWhatsApp?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onConnectWhatsApp }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_DASHBOARD_VEHICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<VehicleStatus>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVehicleForPitch, setSelectedVehicleForPitch] = useState<Vehicle | null>(null);

  // New vehicle form state
  const [newMake, setNewMake] = useState('Mercedes-Benz');
  const [newModel, setNewModel] = useState('GLE 450');
  const [newYear, setNewYear] = useState('2023');
  const [newPrice, setNewPrice] = useState('65000000');
  const [newStatus, setNewStatus] = useState<'listed' | 'pending' | 'draft'>('listed');

  // Computed Stats
  const totalVehicles = vehicles.length;
  const listedCount = vehicles.filter((v) => v.status === 'listed').length;
  const pendingCount = vehicles.filter((v) => v.status === 'pending').length;
  const soldCount = vehicles.filter((v) => v.status === 'sold').length;
  const aiOptimizedCount = vehicles.filter((v) => v.aiOptimized).length;
  const totalInventoryValue = vehicles.reduce((acc, v) => acc + v.price, 0);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesFilter = activeFilter === 'all' || v.status === activeFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      v.make.toLowerCase().includes(query) ||
      v.model.toLowerCase().includes(query) ||
      v.year.toString().includes(query) ||
      v.price.toString().includes(query);
    return matchesFilter && matchesSearch;
  });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const createdVehicle: Vehicle = {
      id: `veh-${Date.now()}`,
      make: newMake.trim(),
      model: newModel.trim(),
      year: parseInt(newYear) || 2023,
      price: parseInt(newPrice) || 25000000,
      status: newStatus,
      aiOptimized: true,
      syndication: {
        facebook: true,
        instagram: true,
        jiji: true,
        cars45: false,
      },
      mileage: '12,000 km',
      transmission: 'Automatic',
      location: 'Maitama, Abuja',
      imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
      viewsCount: 1,
      leadsCount: 0,
    };

    setVehicles([createdVehicle, ...vehicles]);
    setIsAddModalOpen(false);
  };

  const toggleAiOptimization = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, aiOptimized: !v.aiOptimized } : v))
    );
  };

  return (
    <section id="inventory-dashboard" className="py-16 sm:py-20 bg-[#060813] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono mb-2">
              <Car className="w-3.5 h-3.5 text-violet-400" />
              ABUJA SHOWROOM INVENTORY HUD
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight">
              Live Stock & Auto-Syndication
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Active cars managed by AutoClaw swarm. Automatic price parity and multi-channel dispatch.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onConnectWhatsApp && (
              <Button
                variant="outline"
                size="md"
                onClick={onConnectWhatsApp}
                className="text-emerald-400 border-emerald-500/30 hover:bg-emerald-950/30"
              >
                <MessageCircle className="w-4 h-4" />
                Connect WhatsApp Feed
              </Button>
            )}
            <Button
              id="dashboard-add-vehicle-btn"
              variant="glow"
              size="md"
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </Button>
          </div>
        </div>

        {/* STATS ROW (6 items required by spec) */}
        {/* Total Vehicles, Listed, Pending, Sold, AI Optimized, Inventory Value (₦) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {/* Total Vehicles */}
          <Card className="bg-slate-900/60 border-slate-800/80 p-4">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block">
              Total Vehicles
            </span>
            <div className="text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif] mt-1">
              {totalVehicles}
            </div>
            <span className="text-[11px] text-slate-500 font-mono">In Abuja inventory</span>
          </Card>

          {/* Listed */}
          <Card className="bg-slate-900/60 border-slate-800/80 p-4">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Listed
            </span>
            <div className="text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif] mt-1">
              {listedCount}
            </div>
            <span className="text-[11px] text-emerald-400/80 font-mono">Live on channels</span>
          </Card>

          {/* Pending */}
          <Card className="bg-slate-900/60 border-slate-800/80 p-4">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 block flex items-center gap-1">
              <Clock className="w-3 h-3" /> Pending
            </span>
            <div className="text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif] mt-1">
              {pendingCount}
            </div>
            <span className="text-[11px] text-amber-400/80 font-mono">Deposit / Inspection</span>
          </Card>

          {/* Sold */}
          <Card className="bg-slate-900/60 border-slate-800/80 p-4">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-purple-400 block flex items-center gap-1">
              <Archive className="w-3 h-3" /> Sold
            </span>
            <div className="text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif] mt-1">
              {soldCount}
            </div>
            <span className="text-[11px] text-purple-400/80 font-mono">Settled escrow</span>
          </Card>

          {/* Auto-Syndicated */}
          <Card className="bg-slate-900/60 border-slate-800/80 p-4">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-violet-400 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Auto-Syndicated
            </span>
            <div className="text-2xl font-black text-violet-300 font-['Cabinet_Grotesk',sans-serif] mt-1">
              {aiOptimizedCount}
            </div>
            <span className="text-[11px] text-violet-400/80 font-mono">Multi-channel sync</span>
          </Card>

          {/* Inventory Value (₦) */}
          <Card className="bg-slate-900/60 border-slate-800/80 p-4 border-violet-500/30 bg-gradient-to-b from-violet-950/20 to-slate-900/60">
            <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-300 block">
              Inventory Value (₦)
            </span>
            <div className="text-lg sm:text-xl font-black text-white font-['Cabinet_Grotesk',sans-serif] mt-1 tracking-tight">
              ₦{(totalInventoryValue / 1000000).toFixed(1)}M
            </div>
            <span className="text-[10px] text-slate-400 font-mono">₦{totalInventoryValue.toLocaleString()}</span>
          </Card>
        </div>

        {/* SEARCH BAR & FILTER TABS (all, listed, pending, sold, draft) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="dashboard-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search make, model, year, or price (e.g., Prado, BMW, 2022)..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['all', 'listed', 'pending', 'sold', 'draft'] as VehicleStatus[]).map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  id={`filter-tab-${tab}`}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-violet-600 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* VEHICLE CARDS GRID */}
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <Car className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <div className="text-sm font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
              No Vehicles Found
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Try adjusting your search query or switching filter tabs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => {
              return (
                <Card
                  key={vehicle.id}
                  className="bg-slate-900/70 border-slate-800/90 overflow-hidden hover:border-violet-500/50 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    {/* Card Image Banner */}
                    <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden">
                      <img
                        src={vehicle.imageUrl}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        {/* Status Badge (listed / pending / sold / draft) */}
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-md backdrop-blur-md ${
                            vehicle.status === 'listed'
                              ? 'bg-emerald-500 text-slate-950'
                              : vehicle.status === 'pending'
                              ? 'bg-amber-400 text-slate-950'
                              : vehicle.status === 'sold'
                              ? 'bg-purple-500 text-white'
                              : 'bg-slate-700 text-slate-200'
                          }`}
                        >
                          {vehicle.status}
                        </span>

                        {/* Auto-Syndicated Indicator */}
                        <button
                          type="button"
                          onClick={() => toggleAiOptimization(vehicle.id)}
                          title={vehicle.aiOptimized ? 'Auto-Syndication Active' : 'Click to Enable Syndication'}
                          className={`px-2 py-1 rounded-full text-[10px] font-mono font-semibold flex items-center gap-1 transition-all cursor-pointer backdrop-blur-md border ${
                            vehicle.aiOptimized
                              ? 'bg-violet-600/90 text-white border-violet-400/50 shadow-sm shadow-violet-600/40'
                              : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-3 h-3 ${
                              vehicle.aiOptimized ? 'text-emerald-300' : 'text-slate-400'
                            }`}
                          />
                          {vehicle.aiOptimized ? 'AUTO-SYNCED' : 'MANUAL'}
                        </button>
                      </div>

                      {/* Bottom Image Overlay Info */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                        <span>{vehicle.location}</span>
                        <span>{vehicle.mileage}</span>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-5 space-y-3">
                      {/* Make / Model / Year */}
                      <div>
                        <div className="text-xs font-mono text-violet-400 font-semibold tracking-wider uppercase">
                          {vehicle.year} • {vehicle.make}
                        </div>
                        <h3 className="text-lg font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight group-hover:text-violet-300 transition-colors">
                          {vehicle.make} {vehicle.model}
                        </h3>
                      </div>

                      {/* Price in Naira (₦) */}
                      <div className="flex items-baseline justify-between pt-1 border-t border-slate-800/80">
                        <span className="text-xs font-mono text-slate-400">LOT ASKING PRICE</span>
                        <span className="text-xl font-black text-emerald-400 font-['Cabinet_Grotesk',sans-serif]">
                          ₦{vehicle.price.toLocaleString()}
                        </span>
                      </div>

                      {/* Syndication Dots (Facebook, Instagram, Jiji, Cars45) */}
                      <div className="pt-2 border-t border-slate-800/80">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                          <span className="flex items-center gap-1">
                            <Share2 className="w-3 h-3 text-slate-500" /> SYNDICATION MATRIX:
                          </span>
                          <span className="text-slate-500">AutoClaw Hub</span>
                        </div>

                        <div className="grid grid-cols-4 gap-1.5 text-center">
                          {/* Facebook */}
                          <div
                            className={`px-1.5 py-1 rounded-md text-[9px] font-mono font-medium flex items-center justify-center gap-1 ${
                              vehicle.syndication.facebook
                                ? 'bg-blue-950/60 text-blue-300 border border-blue-500/30'
                                : 'bg-slate-800/30 text-slate-600 border border-slate-800'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                vehicle.syndication.facebook ? 'bg-blue-400' : 'bg-slate-600'
                              }`}
                            />
                            FB
                          </div>

                          {/* Instagram */}
                          <div
                            className={`px-1.5 py-1 rounded-md text-[9px] font-mono font-medium flex items-center justify-center gap-1 ${
                              vehicle.syndication.instagram
                                ? 'bg-pink-950/60 text-pink-300 border border-pink-500/30'
                                : 'bg-slate-800/30 text-slate-600 border border-slate-800'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                vehicle.syndication.instagram ? 'bg-pink-400' : 'bg-slate-600'
                              }`}
                            />
                            IG
                          </div>

                          {/* Jiji.ng */}
                          <div
                            className={`px-1.5 py-1 rounded-md text-[9px] font-mono font-medium flex items-center justify-center gap-1 ${
                              vehicle.syndication.jiji
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                : 'bg-slate-800/30 text-slate-600 border border-slate-800'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                vehicle.syndication.jiji ? 'bg-emerald-400' : 'bg-slate-600'
                              }`}
                            />
                            Jiji
                          </div>

                          {/* Cars45 */}
                          <div
                            className={`px-1.5 py-1 rounded-md text-[9px] font-mono font-medium flex items-center justify-center gap-1 ${
                              vehicle.syndication.cars45
                                ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-800/30 text-slate-600 border border-slate-800'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                vehicle.syndication.cars45 ? 'bg-amber-400' : 'bg-slate-600'
                              }`}
                            />
                            Cars45
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 pt-0 border-t border-slate-800/40 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedVehicleForPitch(vehicle)}
                      className="flex-1 py-2 px-3 rounded-lg bg-violet-950/40 hover:bg-violet-900/50 border border-violet-500/30 text-violet-300 hover:text-white text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-violet-400" />
                      WhatsApp Pitch
                    </button>
                    <div className="text-[11px] font-mono text-slate-500 px-2">
                      {vehicle.leadsCount} leads
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Vehicle Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Car className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                  QUICK STOCK ENTRY
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                Add Vehicle to AutoClaw
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-4">
                Will be immediately queued for BullMQ Description and Pricing Swarm Agents.
              </p>

              <form onSubmit={handleAddVehicle} className="space-y-3.5 text-xs font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Make</label>
                    <input
                      type="text"
                      required
                      value={newMake}
                      onChange={(e) => setNewMake(e.target.value)}
                      placeholder="e.g. Toyota, Lexus, BMW"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Model</label>
                    <input
                      type="text"
                      required
                      value={newModel}
                      onChange={(e) => setNewModel(e.target.value)}
                      placeholder="e.g. Land Cruiser, RX 350"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Year</label>
                    <input
                      type="number"
                      required
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Price (₦ Naira)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500"
                  >
                    <option value="listed">Listed (Immediate Syndication)</option>
                    <option value="pending">Pending Inspection</option>
                    <option value="draft">Draft (Review first)</option>
                  </select>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="glow" size="sm">
                    Register Vehicle
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Pitch Preview Modal */}
      <AnimatePresence>
        {selectedVehicleForPitch && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedVehicleForPitch(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                  AUTOCLAW SALES SCRIPT
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                WhatsApp Pitch: {selectedVehicleForPitch.year} {selectedVehicleForPitch.make} {selectedVehicleForPitch.model}
              </h3>
              <div className="mt-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-line">
                {`Good day Sir/Ma,

Trust you are having a productive week in Abuja.

Regarding your inquiry on premium SUVs, we just took delivery of a pristine ${selectedVehicleForPitch.year} ${selectedVehicleForPitch.make} ${selectedVehicleForPitch.model} at our Abuja showroom lot (${selectedVehicleForPitch.location}).

Key Telemetry:
• Asking: ₦${selectedVehicleForPitch.price.toLocaleString()}
• Mileage: ${selectedVehicleForPitch.mileage}
• Condition: Verified clean title, full customs duty paid (zero police/customs hassle along Shehu Shagari Way)
• Fuel/Engine: ${selectedVehicleForPitch.fuelType}

We have arranged physical inspection slots tomorrow between 10am and 4pm. Would you like our manager to reserve a private viewing test drive for you?`}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-emerald-400">
                  Ready to copy or dispatch via WhatsApp Business
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Good day, regarding the ${selectedVehicleForPitch.year} ${selectedVehicleForPitch.make} ${selectedVehicleForPitch.model} (₦${selectedVehicleForPitch.price.toLocaleString()}) in Abuja...`
                    );
                    alert('Pitch copied to clipboard!');
                    setSelectedVehicleForPitch(null);
                  }}
                >
                  Copy to WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
