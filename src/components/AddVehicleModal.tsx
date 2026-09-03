import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Vehicle, FuelType, VehicleCondition } from '../types';
import { X, PlusCircle, Sparkles, ShieldCheck, Car } from 'lucide-react';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (vehicle: Vehicle) => void;
  defaultCity?: string;
}

export const AddVehicleModal: React.FC<AddVehicleModalProps> = ({
  isOpen,
  onClose,
  onAddVehicle,
  defaultCity = 'Lagos',
}) => {
  const [title, setTitle] = useState('');
  const [make, setMake] = useState('BYD');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('2024');
  const [fuelType, setFuelType] = useState<FuelType>('Electric (EV)');
  const [condition, setCondition] = useState<VehicleCondition>('Brand New');
  const [priceNgn, setPriceNgn] = useState('42000000');
  const [batteryCapacityKwh, setBatteryCapacityKwh] = useState('60');
  const [rangeKm, setRangeKm] = useState('420');
  const [city, setCity] = useState<'Abuja' | 'Lagos' | 'Ibadan' | 'Port Harcourt'>(
    (defaultCity as any) || 'Lagos'
  );
  const [dealershipName, setDealershipName] = useState('Autoclaw Certified Motors');
  const [dealerPhone, setDealerPhone] = useState('+234 803 000 1234');
  const [dealerWhatsapp, setDealerWhatsapp] = useState('2348030001234');
  const [showroomLocation, setShowroomLocation] = useState('Lekki Phase 1, Lagos');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80'
  );
  const [featuresString, setFeaturesString] = useState('Fast Charging, Smart ADAS, Leather Interior, Touchscreen');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEv = fuelType === 'Electric (EV)' || fuelType === 'Plug-in Hybrid (PHEV)';
    const dutyStatus = isEv ? '0% Duty Waived (EV)' : 'Standard Duty (Petrol)';

    const newVehicle: Vehicle = {
      id: `veh-${Date.now()}`,
      title: title.trim() || `${year} ${make} ${model}`,
      make,
      model,
      year: Number(year) || 2024,
      fuelType,
      condition,
      priceNgn: Number(priceNgn) || 35000000,
      priceUsdEquivalent: Math.round((Number(priceNgn) || 35000000) / 1500),
      batteryCapacityKwh: Number(batteryCapacityKwh) || undefined,
      rangeKm: Number(rangeKm) || undefined,
      city,
      dealershipName,
      dealerPhone,
      dealerWhatsapp,
      showroomLocation,
      imageUrl:
        imageUrl.trim() ||
        'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
      features: featuresString.split(',').map((s) => s.trim()),
      dutyStatus,
      greenTaxExempt: isEv,
      batteryWarrantyYears: isEv ? 8 : 3,
      monthlyFuelSavingsNgn: isEv ? 180000 : 80000,
      status: 'Available',
      description:
        description.trim() ||
        `Clean, high-performance vehicle located at our ${city} dealership. Inspected and ready for delivery nationwide with fast registration and paperwork support.`,
    };

    onAddVehicle(newVehicle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#08090c] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-xl bg-white/10 text-emerald-400 border border-white/15">
            <Car className="w-4 h-4" />
          </span>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
            SHOWROOM LOT ENTRY
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-['Cabinet_Grotesk']">
          Register New Machine into Autoclaw
        </h2>
        <p className="text-xs text-slate-400 font-mono mb-6">
          Add inventory to Abuja, Lagos, Ibadan, or Port Harcourt showroom lots.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 block mb-1">Make</label>
              <input
                type="text"
                required
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="BYD, Tesla, Changan, Toyota..."
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">Model</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Atto 3, Deepal S07, Model Y..."
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 block mb-1">Year</label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Fuel / Powertrain</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as FuelType)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Electric (EV)">Electric (EV)</option>
                <option value="Plug-in Hybrid (PHEV)">Plug-in Hybrid (PHEV)</option>
                <option value="Hybrid (HEV)">Hybrid (HEV)</option>
                <option value="Petrol">Petrol</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as VehicleCondition)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Brand New">Brand New</option>
                <option value="Foreign Used (Tokunbo)">Foreign Used (Tokunbo)</option>
                <option value="Nigerian Used">Nigerian Used</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-slate-300 block mb-1">Price (₦ NGN)</label>
              <input
                type="number"
                required
                value={priceNgn}
                onChange={(e) => setPriceNgn(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-bold"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Battery (kWh)</label>
              <input
                type="number"
                value={batteryCapacityKwh}
                onChange={(e) => setBatteryCapacityKwh(e.target.value)}
                placeholder="60"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Range (km)</label>
              <input
                type="number"
                value={rangeKm}
                onChange={(e) => setRangeKm(e.target.value)}
                placeholder="420"
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 block mb-1">City Lot</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value as any)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Lagos">Lagos (Berger / Lekki / VI)</option>
                <option value="Abuja">Abuja (Central / Maitama / Airport)</option>
                <option value="Ibadan">Ibadan (Ring Road / Bodija)</option>
                <option value="Port Harcourt">Port Harcourt (Aba Road / Trans-Amadi)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Dealership Name</label>
              <input
                type="text"
                required
                value={dealershipName}
                onChange={(e) => setDealershipName(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 block mb-1">WhatsApp (e.g. 2348031234567)</label>
              <input
                type="text"
                required
                value={dealerWhatsapp}
                onChange={(e) => setDealerWhatsapp(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">High-Res Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Features (comma separated)</label>
            <input
              type="text"
              value={featuresString}
              onChange={(e) => setFeaturesString(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-1">Description & Local Road Context</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ground clearance, charging speed, V2L home backup perks..."
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-emerald-500/20"
            >
              Add To Showroom
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
