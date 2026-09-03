import React, { useState } from 'react';
import { NigerianCity } from '../types';
import {
  Calculator,
  TrendingDown,
  Fuel,
  Zap,
  Sparkles,
  Printer,
  Copy,
  Check,
  MapPin,
  Car,
  Coins,
} from 'lucide-react';

interface TcoCalculatorProps {
  currentCity: NigerianCity;
  onSendToWhatsAppPitch?: (summary: string) => void;
}

export const TcoCalculator: React.FC<TcoCalculatorProps> = ({ currentCity }) => {
  // Configurable parameters
  const [dailyCommuteKm, setDailyCommuteKm] = useState<number>(55);
  const [petrolPriceNgn, setPetrolPriceNgn] = useState<number>(1120);
  const [iceFuelEconomyL100km, setIceFuelEconomyL100km] = useState<number>(10.5); // Litres per 100km
  const [evEfficiencyKwh100km, setEvEfficiencyKwh100km] = useState<number>(15.5); // kWh per 100km
  const [electricityTariffKwh, setElectricityTariffKwh] = useState<number>(68); // Grid Band A or Solar Inverter
  const [maintenanceDiffPct, setMaintenanceDiffPct] = useState<number>(70); // EVs require ~70% less servicing
  const [copied, setCopied] = useState(false);

  // Calculations
  const monthlyKm = dailyCommuteKm * 30;
  const annualKm = dailyCommuteKm * 365;

  // ICE costs
  const monthlyIceLitres = (monthlyKm / 100) * iceFuelEconomyL100km;
  const monthlyIceFuelCostNgn = monthlyIceLitres * petrolPriceNgn;
  const monthlyIceMaintenanceNgn = 35000; // Engine oil, filters, plugs, coolant
  const totalMonthlyIceNgn = monthlyIceFuelCostNgn + monthlyIceMaintenanceNgn;

  // EV costs
  const monthlyEvKwh = (monthlyKm / 100) * evEfficiencyKwh100km;
  const monthlyEvChargingCostNgn = monthlyEvKwh * electricityTariffKwh;
  const monthlyEvMaintenanceNgn = 10000; // Cabin air filter, tire wear check
  const totalMonthlyEvNgn = monthlyEvChargingCostNgn + monthlyEvMaintenanceNgn;

  // Direct Savings
  const monthlySavingsNgn = Math.max(0, totalMonthlyIceNgn - totalMonthlyEvNgn);
  const annualSavingsNgn = monthlySavingsNgn * 12;
  const threeYearSavingsNgn = annualSavingsNgn * 3;

  // City preset handler
  const handleCityPreset = (city: string) => {
    switch (city) {
      case 'Lagos':
        setDailyCommuteKm(55);
        setPetrolPriceNgn(1120);
        setIceFuelEconomyL100km(12.0); // Higher due to gridlock idling
        setElectricityTariffKwh(68);
        break;
      case 'Abuja':
        setDailyCommuteKm(70);
        setPetrolPriceNgn(1180);
        setIceFuelEconomyL100km(9.5); // Smooth highway cruising
        setElectricityTariffKwh(68);
        break;
      case 'Ibadan':
        setDailyCommuteKm(85);
        setPetrolPriceNgn(1080);
        setIceFuelEconomyL100km(10.0);
        setElectricityTariffKwh(75);
        break;
      case 'Port Harcourt':
        setDailyCommuteKm(50);
        setPetrolPriceNgn(1240);
        setIceFuelEconomyL100km(11.5);
        setElectricityTariffKwh(85);
        break;
    }
  };

  const generateReportSummary = () => {
    return `⚡ *AUTOCLAW FUEL VS EV SAVINGS BREAKDOWN* ⚡\n\nBased on your driving route (${dailyCommuteKm} km/day @ ₦${petrolPriceNgn}/L PMS):\n\n⛽ *Current Petrol Car:* ₦${Math.round(totalMonthlyIceNgn).toLocaleString()} / month\n🔌 *Modern EV / Hybrid:* ₦${Math.round(totalMonthlyEvNgn).toLocaleString()} / month\n\n💰 *Your Net Monthly Cash Savings:* ₦${Math.round(monthlySavingsNgn).toLocaleString()}\n🎉 *Annual Savings In Your Pocket:* ₦${Math.round(annualSavingsNgn).toLocaleString()}\n💎 *3-Year Total Savings:* ₦${Math.round(threeYearSavingsNgn).toLocaleString()}\n\nPlus: 0% Customs import duty on new EV purchase!`;
  };

  const copyReport = () => {
    navigator.clipboard.writeText(generateReportSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Fuel vs. Electric ROI & Cost of Ownership Engine
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Show Nigerian car buyers the undeniable math of switching away from petrol at ₦{petrolPriceNgn}/Litre.
          </p>
        </div>

        {/* City Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-slate-400 mr-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-400" /> Presets:
          </span>
          {['Lagos', 'Abuja', 'Ibadan', 'Port Harcourt'].map((c) => (
            <button
              key={c}
              onClick={() => handleCityPreset(c)}
              className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders / Inputs */}
        <div className="lg:col-span-6 space-y-5 bg-slate-950/60 p-4 sm:p-5 rounded-xl border border-slate-800">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Customer Driving Parameters
          </h3>

          {/* Daily Commute */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300">Daily Commute Distance:</span>
              <span className="font-bold text-emerald-400">{dailyCommuteKm} km/day</span>
            </div>
            <input
              id="slider-daily-commute"
              type="range"
              min="15"
              max="200"
              step="5"
              value={dailyCommuteKm}
              onChange={(e) => setDailyCommuteKm(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 rounded-lg h-2"
            />
            <span className="text-[11px] text-slate-500 block mt-1">
              ~{monthlyKm.toLocaleString()} km monthly (e.g. Mainland-Island Lagos, or Abuja Airport Road)
            </span>
          </div>

          {/* Petrol Pump Price */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300">Current Petrol Pump Price:</span>
              <span className="font-bold text-amber-400">₦{petrolPriceNgn} / Litre</span>
            </div>
            <input
              id="slider-petrol-price"
              type="range"
              min="950"
              max="1500"
              step="10"
              value={petrolPriceNgn}
              onChange={(e) => setPetrolPriceNgn(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-800 rounded-lg h-2"
            />
          </div>

          {/* ICE Fuel Economy */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300">Petrol Car Consumption (L/100km):</span>
              <span className="font-bold text-slate-200">{iceFuelEconomyL100km} L / 100km</span>
            </div>
            <input
              id="slider-fuel-economy"
              type="range"
              min="6.0"
              max="20.0"
              step="0.5"
              value={iceFuelEconomyL100km}
              onChange={(e) => setIceFuelEconomyL100km(Number(e.target.value))}
              className="w-full accent-slate-400 bg-slate-800 rounded-lg h-2"
            />
            <span className="text-[11px] text-slate-500 block mt-1">
              (Typical 4-cyl: 9-11L/100km; V6 SUV in traffic: 14-18L/100km)
            </span>
          </div>

          {/* Electricity Tariff */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-300">EV Home / Solar Charging Rate:</span>
              <span className="font-bold text-teal-400">₦{electricityTariffKwh} / kWh</span>
            </div>
            <input
              id="slider-charging-rate"
              type="range"
              min="40"
              max="150"
              step="2"
              value={electricityTariffKwh}
              onChange={(e) => setElectricityTariffKwh(Number(e.target.value))}
              className="w-full accent-teal-400 bg-slate-800 rounded-lg h-2"
            />
            <span className="text-[11px] text-slate-500 block mt-1">
              Band A Disco grid rate (~₦68/kWh) or amortized residential solar/inverter setup.
            </span>
          </div>
        </div>

        {/* Results & Comparison Output */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          {/* Monthly Comparison Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* ICE Cost */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Fuel className="w-3.5 h-3.5 text-amber-400" />
                <span>Current Petrol Bill</span>
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-amber-300">
                ₦{Math.round(totalMonthlyIceNgn).toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 block">per month (fuel + oil/filters)</span>
            </div>

            {/* EV Cost */}
            <div className="bg-slate-950 border border-emerald-900/50 rounded-xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <Zap className="w-3.5 h-3.5" />
                <span>EV Running Cost</span>
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-emerald-400">
                ₦{Math.round(totalMonthlyEvNgn).toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 block">per month (electricity + cabin filter)</span>
            </div>
          </div>

          {/* Giant Savings Banner */}
          <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 rounded-2xl p-5 shadow-lg space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Customer Cash Kept In Pocket
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-['Cabinet_Grotesk'] tracking-tight">
              ₦{Math.round(monthlySavingsNgn).toLocaleString()} <span className="text-sm font-normal text-slate-300">/ month</span>
            </div>
            <p className="text-xs text-slate-300">
              Equals <strong className="text-emerald-300">₦{Math.round(annualSavingsNgn).toLocaleString()} saved annually</strong> in direct fuel costs alone!
            </p>

            <div className="pt-3 mt-3 border-t border-emerald-900/50 flex items-center justify-between text-xs">
              <span className="text-slate-300">3-Year Accumulated Savings:</span>
              <strong className="text-emerald-400 font-extrabold text-sm">
                ₦{Math.round(threeYearSavingsNgn).toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 pt-2">
            <button
              id="btn-copy-tco-summary"
              onClick={copyReport}
              className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied WhatsApp Summary!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Customer Savings Pitch
                </>
              )}
            </button>

            <button
              id="btn-print-tco"
              onClick={() => window.print()}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
              title="Print Customer Quotation"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
