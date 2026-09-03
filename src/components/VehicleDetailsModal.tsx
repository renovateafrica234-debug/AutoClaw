import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle } from '../types';
import {
  X,
  BatteryCharging,
  Zap,
  Gauge,
  ShieldCheck,
  MapPin,
  Building,
  Phone,
  MessageCircle,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onLaunchPitch: (vehicle: Vehicle) => void;
}

export const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({
  vehicle,
  onClose,
  onLaunchPitch,
}) => {
  if (!vehicle) return null;

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ${vehicle.dealershipName}, I am inquiring about the ${vehicle.year} ${vehicle.title} (₦${vehicle.priceNgn.toLocaleString()}) available at your ${vehicle.city} lot.`
    );
    window.open(`https://wa.me/${vehicle.dealerWhatsapp}?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#08090c] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Full-block Hero image */}
          <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
            <img
              src={vehicle.imageUrl}
              alt={vehicle.title}
              className="w-full h-full object-cover brightness-[0.82] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-black/30 to-transparent" />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-emerald-400" />
                {vehicle.city.toUpperCase()} SHOWROOM
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                {vehicle.dutyStatus}
              </span>
            </div>

            <div className="absolute bottom-4 inset-x-6 z-10">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                [ CHASSIS // {vehicle.condition} • {vehicle.fuelType} ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight">
                {vehicle.title}
              </h2>
            </div>
          </div>

          {/* Content body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Price & Savings */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/50 p-5 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  OUT-THE-DOOR LANDED PRICE
                </span>
                <div className="text-3xl font-black text-emerald-400 font-['Cabinet_Grotesk']">
                  ₦{vehicle.priceNgn.toLocaleString()}
                </div>
                {vehicle.priceUsdEquivalent && (
                  <span className="text-xs font-mono text-slate-400">
                    ~${vehicle.priceUsdEquivalent.toLocaleString()} USD (0% DUTY EXEMPTION)
                  </span>
                )}
              </div>

              <div className="sm:border-l sm:border-white/10 sm:pl-6 text-left sm:text-right">
                <span className="text-xs text-emerald-400 font-semibold block flex items-center gap-1.5 sm:justify-end font-mono">
                  <TrendingDown className="w-3.5 h-3.5" /> Monthly Petrol Savings:
                </span>
                <span className="text-xl font-black text-white font-['Cabinet_Grotesk']">
                  ~₦{vehicle.monthlyFuelSavingsNgn.toLocaleString()}
                </span>
                <span className="text-[11px] font-mono text-slate-400 block">vs equivalent petrol SUV</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                EXECUTIVE SUMMARY & NIGERIAN ROAD COMPATIBILITY
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                {vehicle.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                TECHNICAL TELEMETRY SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                {vehicle.rangeKm && (
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">ELECTRIC RANGE</span>
                    <span className="font-bold text-white text-sm">{vehicle.rangeKm} km</span>
                  </div>
                )}
                {vehicle.batteryCapacityKwh && (
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">BATTERY CAPACITY</span>
                    <span className="font-bold text-white text-sm">{vehicle.batteryCapacityKwh} kWh</span>
                  </div>
                )}
                {vehicle.chargingTimeDcMins ? (
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">DC FAST CHARGE</span>
                    <span className="font-bold text-amber-300 text-sm">{vehicle.chargingTimeDcMins} mins</span>
                  </div>
                ) : (
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-slate-500 block">HYBRID SYSTEM</span>
                    <span className="font-bold text-emerald-300 text-sm">Self-Charging HEV</span>
                  </div>
                )}
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">CUSTOMS TARIFF</span>
                  <span className="font-bold text-emerald-400 text-sm">{vehicle.dutyStatus}</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">BATTERY WARRANTY</span>
                  <span className="font-bold text-white text-sm">{vehicle.batteryWarrantyYears} Years</span>
                </div>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                  <span className="text-[10px] text-slate-500 block">GREEN TAX STATUS</span>
                  <span className="font-bold text-teal-400 text-sm">100% Exempt</span>
                </div>
              </div>
            </div>

            {/* Standout Features */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                KEY HIGHLIGHTS & FACTORY EQUIPMENT
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 bg-black/40 border border-white/5 rounded-xl text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dealership Contact Info */}
            <div className="p-4 bg-black/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {vehicle.dealershipName}
                </div>
                <div className="text-slate-400 text-[11px] mt-0.5">{vehicle.showroomLocation}</div>
              </div>
              <div className="text-slate-300 text-[11px]">
                Phone: <strong className="text-white">{vehicle.dealerPhone}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-white/10">
              <button
                id="modal-generate-pitch-btn"
                onClick={() => {
                  onClose();
                  onLaunchPitch(vehicle);
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Launch Car Brain WhatsApp Pitch
              </button>

              <button
                id="modal-whatsapp-dealer-btn"
                onClick={handleWhatsAppDirect}
                className="py-3 px-5 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Showroom Lot
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
