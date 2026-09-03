import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Zap,
  Gauge,
  Sliders,
  DollarSign,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  BatteryCharging,
  Fuel,
  Info,
  Layers,
} from 'lucide-react';
import { BEST_SELLING_EVS, BENCHMARK_ICE_VEHICLES, calculateTco, generateDynamicComparison, BestSellingEV, BenchmarkIceVehicle } from '@/src/data/evCatalog';
import { ArrowOutward } from '@/components/ui/arrow-hover';

export function EvComparisonModule({
  initialEvId = 'ev-byd-atto3',
  initialIceId = 'veh-ice-rav4',
  onClose,
}: {
  initialEvId?: string;
  initialIceId?: string;
  onClose?: () => void;
}) {
  // State for vehicle selection
  const [selectedEvId, setSelectedEvId] = useState<string>(initialEvId);
  const [selectedIceId, setSelectedIceId] = useState<string>(initialIceId);

  // TCO Calculator Parameters
  const [annualKm, setAnnualKm] = useState<number>(22000);
  const [petrolPriceNgn, setPetrolPriceNgn] = useState<number>(1180);
  const [electricityRateNgn, setElectricityRateNgn] = useState<number>(209);
  const [tcoHorizon, setTcoHorizon] = useState<3 | 5 | 10>(5);

  // Kinetic swipe view state (desktop side-by-side or mobile drag-split)
  const [comparisonSplit, setComparisonSplit] = useState<number>(50); // 0 to 100%

  const selectedEv = BEST_SELLING_EVS.find((e) => e.id === selectedEvId) || BEST_SELLING_EVS[0];
  const selectedIce = BENCHMARK_ICE_VEHICLES.find((i) => i.id === selectedIceId) || BENCHMARK_ICE_VEHICLES[0];

  const comparisonData = generateDynamicComparison(selectedEv.id, selectedIce.id, {
    annualKm,
    petrolPrice: petrolPriceNgn,
    electricityPrice: electricityRateNgn,
  });

  const tcoResult = calculateTco(selectedEv, selectedIce, {
    annualKm,
    petrolPricePerLitreNgn: petrolPriceNgn,
    electricityPricePerKwhNgn: electricityRateNgn,
    years: tcoHorizon,
  });

  // Calculate 500km trip costs
  const evTripCost500km = Math.round(((500 / 100) * selectedEv.energyConsumptionKwhPer100Km) * electricityRateNgn);
  const iceTripCost500km = Math.round((500 / selectedIce.fuelEfficiencyKmPerLitre) * petrolPriceNgn);
  const tripSavings = iceTripCost500km - evTripCost500km;

  return (
    <div className="w-full text-white bg-[#000000] p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-black text-xs">
              EV
            </span>
            <span className="text-xs font-mono tracking-widest text-[#b3b3b3] uppercase">
              Module 1 • Dynamic Comparison & TCO Engine
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase font-mono">
            Best-Selling EVs vs. Traditional ICE
          </h2>
          <p className="text-sm text-[#b3b3b3] max-w-2xl mt-1">
            Evaluate electric powertrain efficiencies, 0% Nigerian Customs duty waivers, and 3/5/10-year Total Cost of Ownership calibrated to current ₦/L petrol inflation.
          </p>
        </div>

        {/* Quick Horizon Buttons */}
        <div className="flex items-center gap-2 bg-[#141414] p-1.5 rounded-sm border border-[#262626]">
          <span className="text-xs text-[#808080] px-2 font-mono uppercase">TCO Horizon:</span>
          {([3, 5, 10] as const).map((yr) => (
            <button
              key={yr}
              type="button"
              onClick={() => setTcoHorizon(yr)}
              className={`px-3 py-1 text-xs font-mono font-bold transition-colors cursor-pointer rounded-sm ${
                tcoHorizon === yr
                  ? 'bg-[#eaff00] text-black'
                  : 'text-[#b3b3b3] hover:text-white hover:bg-[#262626]'
              }`}
            >
              {yr} Years
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* EV Model Selector */}
        <div className="bg-[#0f0f0f] border border-[#262626] p-4 rounded-sm">
          <label className="text-xs font-mono text-[#808080] uppercase block mb-2">
            Select Pure Electric Vehicle (EV)
          </label>
          <select
            value={selectedEvId}
            onChange={(e) => setSelectedEvId(e.target.value)}
            className="w-full bg-[#141414] border border-[#333333] text-white text-sm p-2.5 rounded-sm focus:border-[#eaff00] focus:outline-none font-mono"
          >
            {BEST_SELLING_EVS.map((ev) => (
              <option key={ev.id} value={ev.id}>
                #{ev.marketRank} {ev.make} {ev.model} {ev.trim} (₦{(ev.baseMsrpNgn / 1000000).toFixed(1)}M)
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between text-xs text-[#b3b3b3] mt-2 font-mono">
            <span>Battery: {selectedEv.batteryCapacityKwh} kWh Blade</span>
            <span className="text-[#eaff00] font-bold">{selectedEv.realWorldRangeKm} km Real Range</span>
          </div>
        </div>

        {/* ICE Benchmark Selector */}
        <div className="bg-[#0f0f0f] border border-[#262626] p-4 rounded-sm">
          <label className="text-xs font-mono text-[#808080] uppercase block mb-2">
            Select Traditional Petrol/Diesel ICE Benchmark
          </label>
          <select
            value={selectedIceId}
            onChange={(e) => setSelectedIceId(e.target.value)}
            className="w-full bg-[#141414] border border-[#333333] text-white text-sm p-2.5 rounded-sm focus:border-[#eaff00] focus:outline-none font-mono"
          >
            {BENCHMARK_ICE_VEHICLES.map((ice) => (
              <option key={ice.id} value={ice.id}>
                {ice.name} (₦{(ice.priceNgn / 1000000).toFixed(1)}M)
              </option>
            ))}
          </select>
          <div className="flex items-center justify-between text-xs text-[#b3b3b3] mt-2 font-mono">
            <span>Displacement: {selectedIce.engineDispLitres}L ({selectedIce.horsepower} HP)</span>
            <span className="text-red-400 font-bold">{selectedIce.fuelEfficiencyKmPerLitre} km/L Fuel Burn</span>
          </div>
        </div>
      </div>

      {/* Kinetic Interactive Side-by-Side Comparison (Landon Norris inspired dynamic slider) */}
      <div className="bg-[#0d0d0d] border border-[#262626] rounded-sm p-5 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#eaff00] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-white">
              Kinetic Head-to-Head Specification Matrix
            </span>
          </div>
          <div className="text-xs font-mono text-[#808080]">
            Drag slider to inspect vehicle dynamic balance
          </div>
        </div>

        {/* Interactive Kinetic Split Visualizer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#eaff00] font-bold">
              ⚡ {selectedEv.make} {selectedEv.model} ({100 - comparisonSplit}%)
            </span>
            <span className="text-white font-bold">
              ⛽ {selectedIce.model} ({comparisonSplit}%)
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="90"
            value={comparisonSplit}
            onChange={(e) => setComparisonSplit(Number(e.target.value))}
            className="w-full accent-[#eaff00] cursor-ew-resize h-1.5 bg-[#262626] rounded-sm appearance-none"
          />
        </div>

        {/* Side-by-side Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* EV Card */}
          <div className="bg-[#141414] border border-[#333333] hover:border-[#eaff00] transition-colors rounded-sm p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#eaff00] text-black rounded-xs uppercase">
                  Zero Emission EV
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedEv.make} {selectedEv.model}
                </h3>
                <p className="text-xs font-mono text-[#b3b3b3]">{selectedEv.trim}</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-[#808080] block">Base MSRP</span>
                <span className="text-base font-bold text-[#eaff00]">
                  ₦{(selectedEv.baseMsrpNgn / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#262626] text-center font-mono">
              <div className="bg-[#0a0a0a] p-2 rounded-xs">
                <span className="text-[10px] text-[#808080] block uppercase">0-100 km/h</span>
                <span className="text-sm font-bold text-white">{selectedEv.zeroToHundredSec}s</span>
              </div>
              <div className="bg-[#0a0a0a] p-2 rounded-xs">
                <span className="text-[10px] text-[#808080] block uppercase">Real Range</span>
                <span className="text-sm font-bold text-[#eaff00]">{selectedEv.realWorldRangeKm} km</span>
              </div>
              <div className="bg-[#0a0a0a] p-2 rounded-xs">
                <span className="text-[10px] text-[#808080] block uppercase">DC 10-80%</span>
                <span className="text-sm font-bold text-white">{selectedEv.chargingSpeeds.l3MinsTo80Pct} min</span>
              </div>
            </div>

            {/* In-depth Specs */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                <span className="text-[#808080]">Battery Chemistry</span>
                <span className="text-white font-medium">LFP Blade (Thermal Puncture Proof)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                <span className="text-[#808080]">Import Duty (Customs)</span>
                <span className="text-[#eaff00] font-bold">0% Duty Waived (saves ~₦14.5M)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                <span className="text-[#808080]">2026 Luxury Green Tax</span>
                <span className="text-[#eaff00] font-bold">100% Exempt</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                <span className="text-[#808080]">Cost for 500 km Trip</span>
                <span className="text-[#eaff00] font-bold">₦{evTripCost500km.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#808080]">Level 2 Home Wallbox</span>
                <span className="text-white">{selectedEv.chargingSpeeds.l2Hours} hrs (Overnight Band A/Solar)</span>
              </div>
            </div>
          </div>

          {/* ICE Card */}
          <div className="bg-[#141414] border border-[#333333] hover:border-[#4d4d4d] transition-colors rounded-sm p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#262626] text-[#b3b3b3] rounded-xs uppercase">
                  Internal Combustion (ICE)
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedIce.name}
                </h3>
                <p className="text-xs font-mono text-[#b3b3b3]">{selectedIce.year} Model Year</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-xs text-[#808080] block">Market Price</span>
                <span className="text-base font-bold text-white">
                  ₦{(selectedIce.priceNgn / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#262626] text-center font-mono">
              <div className="bg-[#0a0a0a] p-2 rounded-xs">
                <span className="text-[10px] text-[#808080] block uppercase">Engine Output</span>
                <span className="text-sm font-bold text-white">{selectedIce.horsepower} HP</span>
              </div>
              <div className="bg-[#0a0a0a] p-2 rounded-xs">
                <span className="text-[10px] text-[#808080] block uppercase">Fuel Mileage</span>
                <span className="text-sm font-bold text-red-400">{selectedIce.fuelEfficiencyKmPerLitre} km/L</span>
              </div>
              <div className="bg-[#0a0a0a] p-2 rounded-xs">
                <span className="text-[10px] text-[#808080] block uppercase">Refuel Time</span>
                <span className="text-sm font-bold text-white">5-10 min</span>
              </div>
            </div>

            {/* In-depth Specs */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                <span className="text-[#808080]">Powertrain Architecture</span>
                <span className="text-white font-medium">{selectedIce.engineDispLitres}L V{selectedIce.cylinders} Petrol</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                <span className="text-[#808080]">Import Duty (Customs)</span>
                <span className="text-red-400 font-bold">35% Standard Duty + 5% Levy</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                <span className="text-[#808080]">2026 Luxury Green Tax</span>
                <span className={selectedIce.greenTaxApplicable ? "text-red-400 font-bold" : "text-white"}>
                  {selectedIce.greenTaxApplicable ? `+₦${(selectedIce.greenTaxAmountNgn / 1000000).toFixed(1)}M Surcharge` : 'Standard'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1f1f1f]">
                <span className="text-[#808080]">Cost for 500 km Trip</span>
                <span className="text-red-400 font-bold">₦{iceTripCost500km.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#808080]">Est. Annual Maintenance</span>
                <span className="text-white">₦{(selectedIce.annualMaintenanceEstNgn / 1000000).toFixed(2)}M / yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Trip Savings Banner */}
        <div className="bg-[#141414] border border-[#eaff00]/30 rounded-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-sm bg-[#eaff00] flex items-center justify-center text-black font-bold text-lg">
              ₦
            </div>
            <div>
              <span className="text-xs font-mono text-[#b3b3b3] uppercase block">
                Direct Fuel Cost Savings per 500 km Trip
              </span>
              <span className="text-xl font-bold font-mono text-white">
                Saves <span className="text-[#eaff00]">₦{tripSavings.toLocaleString()}</span> every trip
              </span>
            </div>
          </div>
          <div className="text-xs font-mono text-[#808080] text-center sm:text-right">
            Based on ₦{petrolPriceNgn}/L petrol vs ₦{electricityRateNgn}/kWh grid power
          </div>
        </div>
      </div>

      {/* TCO Mathematical Analytics Engine (3, 5, 10 Years) */}
      <div className="bg-[#0d0d0d] border border-[#262626] rounded-sm p-5 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown size={18} className="text-[#eaff00]" />
              <h3 className="text-lg font-bold font-mono uppercase text-white">
                Total Cost of Ownership (TCO) Mathematical Engine
              </h3>
            </div>
            <p className="text-xs text-[#b3b3b3]">
              Calculates fuel/energy, scheduled maintenance, and depreciation curves over {tcoHorizon} years.
            </p>
          </div>

          <div className="text-right font-mono">
            <span className="text-xs text-[#808080] block uppercase">Net {tcoHorizon}-Year Buyer Savings</span>
            <span className="text-2xl font-bold text-[#eaff00]">
              ₦{tcoResult[tcoHorizon === 3 ? 'threeYearSavings' : tcoHorizon === 5 ? 'fiveYearSavings' : 'tenYearSavings'].toLocaleString()}
            </span>
          </div>
        </div>

        {/* Live Interactive Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#141414] p-4 rounded-sm border border-[#262626]">
          {/* Annual Commute Mileage Slider */}
          <div className="space-y-1 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-[#808080] uppercase">Annual Mileage:</span>
              <span className="text-white font-bold">{annualKm.toLocaleString()} km/yr</span>
            </div>
            <input
              type="range"
              min="10000"
              max="45000"
              step="1000"
              value={annualKm}
              onChange={(e) => setAnnualKm(Number(e.target.value))}
              className="w-full accent-[#eaff00] h-1.5 bg-[#262626] rounded-sm"
            />
            <span className="text-[10px] text-[#666666] block">~{Math.round(annualKm / 365)} km/day daily commute</span>
          </div>

          {/* Local Petrol Price Slider */}
          <div className="space-y-1 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-[#808080] uppercase">Petrol Pump Rate:</span>
              <span className="text-white font-bold">₦{petrolPriceNgn} / Litre</span>
            </div>
            <input
              type="range"
              min="950"
              max="1450"
              step="10"
              value={petrolPriceNgn}
              onChange={(e) => setPetrolPriceNgn(Number(e.target.value))}
              className="w-full accent-[#eaff00] h-1.5 bg-[#262626] rounded-sm"
            />
            <span className="text-[10px] text-[#666666] block">Current FCT / Lagos pump price range</span>
          </div>

          {/* Electricity Tariff Slider */}
          <div className="space-y-1 font-mono">
            <div className="flex justify-between text-xs">
              <span className="text-[#808080] uppercase">Electricity / Solar Tariff:</span>
              <span className="text-white font-bold">₦{electricityRateNgn} / kWh</span>
            </div>
            <input
              type="range"
              min="45"
              max="260"
              step="5"
              value={electricityRateNgn}
              onChange={(e) => setElectricityRateNgn(Number(e.target.value))}
              className="w-full accent-[#eaff00] h-1.5 bg-[#262626] rounded-sm"
            />
            <span className="text-[10px] text-[#666666] block">Band A grid rate vs solar amortized</span>
          </div>
        </div>

        {/* TCO Cost Breakdown Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#333333] text-[#808080] uppercase">
                <th className="py-2.5 px-3">Cost Component</th>
                <th className="py-2.5 px-3 text-[#eaff00]">EV ({selectedEv.model})</th>
                <th className="py-2.5 px-3 text-white">ICE ({selectedIce.model})</th>
                <th className="py-2.5 px-3 text-right">Cumulative Delta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f1f1f]">
              <tr>
                <td className="py-2.5 px-3 text-[#b3b3b3] font-sans">
                  {tcoHorizon}-Year Fuel / Energy Expense
                </td>
                <td className="py-2.5 px-3 text-[#eaff00] font-bold">
                  ₦{tcoResult.evEnergyTotal.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-white font-bold">
                  ₦{tcoResult.iceFuelTotal.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-right text-[#eaff00] font-bold">
                  -₦{(tcoResult.iceFuelTotal - tcoResult.evEnergyTotal).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-[#b3b3b3] font-sans">
                  Scheduled Servicing & Routine Maintenance
                </td>
                <td className="py-2.5 px-3 text-[#eaff00] font-bold">
                  ₦{tcoResult.evMaintTotal.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-white font-bold">
                  ₦{tcoResult.iceMaintTotal.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-right text-[#eaff00] font-bold">
                  -₦{(tcoResult.iceMaintTotal - tcoResult.evMaintTotal).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 text-[#b3b3b3] font-sans">
                  Vehicle Depreciation ({tcoHorizon} Yrs Residual)
                </td>
                <td className="py-2.5 px-3 text-[#b3b3b3]">
                  ₦{tcoResult.evDeprecTotal.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-[#b3b3b3]">
                  ₦{tcoResult.iceDeprecTotal.toLocaleString()}
                </td>
                <td className="py-2.5 px-3 text-right text-[#b3b3b3]">
                  ₦{(tcoResult.iceDeprecTotal - tcoResult.evDeprecTotal).toLocaleString()}
                </td>
              </tr>
              <tr className="bg-[#141414] font-bold">
                <td className="py-3 px-3 text-white uppercase">
                  Total {tcoHorizon}-Year Operational Outlay
                </td>
                <td className="py-3 px-3 text-[#eaff00]">
                  ₦{(tcoResult.evEnergyTotal + tcoResult.evMaintTotal + tcoResult.evDeprecTotal).toLocaleString()}
                </td>
                <td className="py-3 px-3 text-white">
                  ₦{(tcoResult.iceFuelTotal + tcoResult.iceMaintTotal + tcoResult.iceDeprecTotal).toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right text-[#eaff00] text-sm">
                  ₦{tcoResult[tcoHorizon === 3 ? 'threeYearSavings' : tcoHorizon === 5 ? 'fiveYearSavings' : 'tenYearSavings'].toLocaleString()} SAVED
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Breakeven Summary Callout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="bg-[#141414] p-3 rounded-xs border border-[#262626]">
            <span className="text-[#808080] block uppercase text-[10px]">3-Year Cumulative Savings</span>
            <span className="text-base font-bold text-white">
              ₦{tcoResult.threeYearSavings.toLocaleString()}
            </span>
          </div>
          <div className="bg-[#141414] p-3 rounded-xs border border-[#262626]">
            <span className="text-[#808080] block uppercase text-[10px]">5-Year Cumulative Savings</span>
            <span className="text-base font-bold text-[#eaff00]">
              ₦{tcoResult.fiveYearSavings.toLocaleString()}
            </span>
          </div>
          <div className="bg-[#141414] p-3 rounded-xs border border-[#262626]">
            <span className="text-[#808080] block uppercase text-[10px]">10-Year Cumulative Savings</span>
            <span className="text-base font-bold text-[#eaff00]">
              ₦{tcoResult.tenYearSavings.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Best-Selling EVs Catalog Grid (Nigerian Market) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold font-mono uppercase text-white">
              Top 5 Best-Selling EVs in Nigeria
            </h3>
            <p className="text-xs text-[#b3b3b3]">
              Relational dataset linked to dealership inventory with duty exemption clearance status.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BEST_SELLING_EVS.map((ev) => (
            <div
              key={ev.id}
              onClick={() => setSelectedEvId(ev.id)}
              className={`p-4 rounded-sm border transition-all cursor-pointer ${
                selectedEvId === ev.id
                  ? 'bg-[#141414] border-[#eaff00]'
                  : 'bg-[#0f0f0f] border-[#262626] hover:border-[#4d4d4d]'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#262626] text-[#b3b3b3] rounded-xs uppercase">
                    Rank #{ev.marketRank}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">
                    {ev.make} {ev.model}
                  </h4>
                  <p className="text-xs font-mono text-[#808080]">{ev.trim}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-[#eaff00]">
                    ₦{(ev.baseMsrpNgn / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#1f1f1f] text-xs font-mono">
                <div>
                  <span className="text-[#808080] block text-[10px]">Real Range:</span>
                  <span className="text-white font-bold">{ev.realWorldRangeKm} km</span>
                </div>
                <div>
                  <span className="text-[#808080] block text-[10px]">Battery:</span>
                  <span className="text-white font-bold">{ev.batteryCapacityKwh} kWh</span>
                </div>
                <div>
                  <span className="text-[#808080] block text-[10px]">Duty Waiver:</span>
                  <span className="text-[#eaff00] font-bold">0% Waived</span>
                </div>
                <div>
                  <span className="text-[#808080] block text-[10px]">DC Fast Charge:</span>
                  <span className="text-white font-bold">{ev.chargingSpeeds.l3MinsTo80Pct} mins</span>
                </div>
              </div>

              <p className="text-[11px] text-[#808080] mt-3 line-clamp-2">
                {ev.salesVolumeNotes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
