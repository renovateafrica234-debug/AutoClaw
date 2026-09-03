import React, { useState } from 'react';
import { Fuel, Zap, ArrowRight, ShieldCheck, CheckCircle2, Sliders, FileText } from 'lucide-react';
import { Vehicle360Viewer } from './Vehicle360Viewer';

interface FinancialParitySectionProps {
  onGenerateBuyerQuote: (quoteData: {
    petrolCar: string;
    evCar: string;
    annualKm: number;
    fuelPrice: number;
    powerTariff: number;
    fiveYearSavings: number;
  }) => void;
}

export function FinancialParitySection({ onGenerateBuyerQuote }: FinancialParitySectionProps) {
  const [annualKm, setAnnualKm] = useState<number>(20000);
  const [fuelPrice, setFuelPrice] = useState<number>(1050);
  const [powerTariff, setPowerTariff] = useState<number>(225);
  const [comparisonYears] = useState<number>(5);

  // Range Rover Velar P250 Petrol specs
  const petrolLitersPer100Km = 11.5;
  const petrolAnnualService = 850000;
  const petrolAnnualFuelCost = Math.round((annualKm / 100) * petrolLitersPer100Km * fuelPrice);
  const petrolFiveYearFuel = petrolAnnualFuelCost * comparisonYears;
  const petrolFiveYearService = petrolAnnualService * comparisonYears;
  const petrolFiveYearTotal = petrolFiveYearFuel + petrolFiveYearService;

  // BYD Seal Performance EV specs
  const evKwhPer100Km = 17.5;
  const evAnnualService = 120000;
  const evAnnualPowerCost = Math.round((annualKm / 100) * evKwhPer100Km * powerTariff);
  const evFiveYearPower = evAnnualPowerCost * comparisonYears;
  const evFiveYearService = evAnnualService * comparisonYears;
  const evFiveYearTotal = evFiveYearPower + evFiveYearService;

  // Exact Delta: ₦11,787,500 at default settings (20,000km, ₦1050/L, ₦225/kWh)
  const fiveYearTcoDelta = petrolFiveYearTotal - evFiveYearTotal;
  const annualEnergyDelta = petrolAnnualFuelCost - evAnnualPowerCost;

  return (
    <section
      id="tco-engine-section"
      className="w-full bg-zinc-100 text-black py-20 px-4 md:px-8 border-y border-zinc-300"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex flex-col text-left max-w-4xl">
          <div className="inline-block self-start">
            <span className="px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-wider rounded-sm">
              FINANCIAL PARITY COMPARISON
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase mt-4 mb-3 leading-tight">
            PETROL VS. ELECTRIC (EV) SAVINGS ENGINE
          </h2>

          <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal">
            With PMS petrol above ₦1,050/L across Abuja and Lagos, vehicle buyers hesitate on high-displacement petrol models. AutoClaw arms your sales reps with verifiable comparison data explaining real fuel parity against Band A grid tariffs.
          </p>
        </div>

        {/* Interactive Sliders Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-zinc-300 p-6 rounded-2xl shadow-sm text-left">
          {/* Slider 1: Mileage */}
          <div>
            <div className="flex justify-between text-xs uppercase tracking-wider font-semibold mb-2">
              <span className="text-zinc-600">ANNUAL DRIVING MILEAGE</span>
              <span className="text-black font-extrabold">{annualKm.toLocaleString()} KM</span>
            </div>
            <input
              type="range"
              min="10000"
              max="45000"
              step="2500"
              value={annualKm}
              onChange={(e) => setAnnualKm(Number(e.target.value))}
              className="w-full accent-black h-2 bg-zinc-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mt-1 font-medium">
              <span>10,000 KM</span>
              <span>45,000 KM</span>
            </div>
          </div>

          {/* Slider 2: Petrol Price */}
          <div>
            <div className="flex justify-between text-xs uppercase tracking-wider font-semibold mb-2">
              <span className="text-zinc-600">PETROL BENCHMARK (PMS)</span>
              <span className="text-black font-extrabold">₦{fuelPrice} / LITRE</span>
            </div>
            <input
              type="range"
              min="900"
              max="1400"
              step="25"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(Number(e.target.value))}
              className="w-full accent-black h-2 bg-zinc-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mt-1 font-medium">
              <span>₦900 / L</span>
              <span>₦1,400 / L</span>
            </div>
          </div>

          {/* Slider 3: Band A Tariff */}
          <div>
            <div className="flex justify-between text-xs uppercase tracking-wider font-semibold mb-2">
              <span className="text-zinc-600">BAND A GRID TARIFF</span>
              <span className="text-black font-extrabold">₦{powerTariff} / KWH</span>
            </div>
            <input
              type="range"
              min="150"
              max="350"
              step="15"
              value={powerTariff}
              onChange={(e) => setPowerTariff(Number(e.target.value))}
              className="w-full accent-black h-2 bg-zinc-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 mt-1 font-medium">
              <span>₦150 / kWh</span>
              <span>₦350 / kWh</span>
            </div>
          </div>
        </div>

        {/* 3-Column Comparison Grid with 360 Visual Viewers & Center Obsidian Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Range Rover Velar P250 (Petrol) */}
          <div className="lg:col-span-4 bg-white border border-zinc-300 rounded-2xl p-6 shadow-md flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-red-100 border border-red-200 text-red-700 text-xs uppercase tracking-wider font-bold rounded-md">
                  Standard Petrol
                </span>
                <Fuel size={18} className="text-red-600" />
              </div>

              <h3 className="text-xl font-extrabold text-black tracking-tight mb-1">
                Range Rover Velar P250
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-4">
                2.0L Turbocharged Petrol • ₦84,000,000
              </p>

              {/* 360° Sequence Viewer UI for Velar */}
              <div className="mb-5">
                <Vehicle360Viewer
                  vehicleName="Range Rover Velar P250"
                  vehicleType="petrol"
                  baseImage="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
                  badge="PETROL INSPECTION"
                />
              </div>

              {/* Metrics Stack */}
              <div className="space-y-3">
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    ANNUAL PETROL EXPENDITURE
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-black tracking-tight">
                      ₦{petrolAnnualFuelCost.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded">
                      /YR
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    @ ₦{fuelPrice}/L prevailing pump price
                  </span>
                </div>

                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    YEARLY SCHEDULED MAINTENANCE
                  </span>
                  <span className="text-base font-extrabold text-black tracking-tight block">
                    ₦{petrolAnnualService.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    Engine oil, filters, spark plugs, injectors
                  </span>
                </div>

                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    CUSTOMS IMPORT CLEARANCE
                  </span>
                  <div className="inline-flex items-center px-2 py-0.5 bg-red-100 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider rounded-md mt-0.5">
                    35% Duty + 35% Auto Levy
                  </div>
                  <span className="text-[11px] text-zinc-500 block mt-1">
                    Standard luxury combustion tariff
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 text-xs uppercase tracking-wider font-semibold text-zinc-600">
              5-YR TOTAL PETROL TCO: <span className="text-black font-extrabold">₦{petrolFiveYearTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Center Focus Card: Deep obsidian card (bg-zinc-950 text-white rounded-2xl p-8 shadow-2xl) */}
          <div className="lg:col-span-4 bg-zinc-950 text-white rounded-2xl p-8 shadow-2xl flex flex-col justify-between text-center relative overflow-hidden border border-zinc-800">
            {/* Electric Ambient Glows */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-[#E3FF00]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#E3FF00]/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E3FF00]/15 border border-[#E3FF00]/40 text-[#E3FF00] text-xs font-bold uppercase tracking-wider rounded-full mb-4 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#E3FF00] animate-pulse" />
                <span>5-YEAR TCO CASH DELTA</span>
              </div>

              <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                NET BUYER LIQUID CASH ADVANTAGE
              </span>

              {/* Bold Electric Yellow Value: ₦11,787,500 Saved */}
              <div className="py-2">
                <div className="text-4xl sm:text-5xl font-black text-[#E3FF00] tracking-tight drop-shadow-[0_0_25px_rgba(227,255,0,0.35)]">
                  ₦{fiveYearTcoDelta.toLocaleString()}
                </div>
                <div className="text-sm uppercase tracking-wider text-[#E3FF00] font-black mt-1">
                  SAVED OVER 5 YEARS
                </div>
              </div>

              <p className="text-xs text-zinc-300 max-w-xs mx-auto leading-relaxed my-4 font-normal">
                Direct fuel displacement against grid tariffs combined with zero-oil-change EV maintenance savings.
              </p>

              {/* Energy Ratio Telemetry Gauge */}
              <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-2 text-left mb-6">
                <div className="flex justify-between text-[11px] uppercase tracking-wider font-semibold">
                  <span className="text-zinc-400">PETROL VS ELECTRIC RATIO</span>
                  <span className="text-[#E3FF00] font-bold">
                    {Math.round((petrolAnnualFuelCost / (evAnnualPowerCost || 1)) * 10) / 10}x Cheaper Per KM
                  </span>
                </div>
                <div className="h-2.5 w-full bg-zinc-900 overflow-hidden flex rounded-full">
                  <div
                    className="bg-red-500 h-full"
                    style={{
                      width: `${Math.min(
                        85,
                        (petrolAnnualFuelCost / (petrolAnnualFuelCost + evAnnualPowerCost)) * 100
                      )}%`,
                    }}
                  />
                  <div className="bg-[#E3FF00] h-full flex-1" />
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                  <span>PETROL (RED)</span>
                  <span>GRID POWER (YELLOW)</span>
                </div>
              </div>

              <div className="text-xs text-zinc-400 space-y-1.5 text-left bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 mb-6">
                <div className="flex justify-between">
                  <span>Annual Fuel Savings:</span>
                  <span className="text-[#E3FF00] font-bold">₦{annualEnergyDelta.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual Service Delta:</span>
                  <span className="text-emerald-400 font-bold">₦{(petrolAnnualService - evAnnualService).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customs Duty Waiver:</span>
                  <span className="text-emerald-400 font-bold">0% Clean Energy</span>
                </div>
              </div>
            </div>

            {/* Prominent Action Button: GENERATE BUYER QUOTE */}
            <button
              type="button"
              id="generate-buyer-quote-btn"
              onClick={() =>
                onGenerateBuyerQuote({
                  petrolCar: 'Range Rover Velar P250',
                  evCar: 'BYD Seal Performance AWD',
                  annualKm,
                  fuelPrice,
                  powerTariff,
                  fiveYearSavings: fiveYearTcoDelta,
                })
              }
              className="w-full py-4 bg-[#E3FF00] hover:bg-[#d4ed00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#E3FF00]/20 hover:shadow-[0_0_30px_rgba(227,255,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText size={16} className="text-black" />
              <span>GENERATE BUYER QUOTE</span>
            </button>
          </div>

          {/* Card 3: BYD Seal Performance (EV) */}
          <div className="lg:col-span-4 bg-white border border-zinc-300 rounded-2xl p-6 shadow-md flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs uppercase tracking-wider font-bold rounded-md">
                  100% Electric EV
                </span>
                <Zap size={18} className="text-emerald-600" />
              </div>

              <h3 className="text-xl font-extrabold text-black tracking-tight mb-1">
                BYD Seal Performance
              </h3>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-4">
                82.5 kWh Blade Battery AWD • ₦68,000,000
              </p>

              {/* 360° Sequence Viewer UI for BYD Seal */}
              <div className="mb-5">
                <Vehicle360Viewer
                  vehicleName="BYD Seal Performance"
                  vehicleType="ev"
                  baseImage="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
                  badge="EV 360 INSPECTION"
                />
              </div>

              {/* Metrics Stack */}
              <div className="space-y-3">
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    ANNUAL GRID POWER COST
                  </span>
                  <span className="text-2xl font-black text-black tracking-tight">
                    ₦{evAnnualPowerCost.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    @ ₦{powerTariff}/kWh Band A grid baseline
                  </span>
                </div>

                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    YEARLY SCHEDULED MAINTENANCE
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-black tracking-tight block">
                      ₦{evAnnualService.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase rounded">
                      LOW OVERHEAD
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-500 block mt-0.5">
                    Cabin filters, tire rotation, coolant check
                  </span>
                </div>

                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <span className="text-zinc-500 block text-[11px] uppercase tracking-wider mb-1 font-bold">
                    CUSTOMS IMPORT CLEARANCE
                  </span>
                  <div className="inline-flex items-center px-2 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-md mt-0.5">
                    0% Green Tariff (Exempt)
                  </div>
                  <span className="text-[11px] text-zinc-500 block mt-1">
                    Federal clean energy import waiver
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200 text-xs uppercase tracking-wider font-semibold text-emerald-700">
              5-YR TOTAL EV TCO: <span className="text-black font-extrabold">₦{evFiveYearTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
