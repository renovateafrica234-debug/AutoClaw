import { BestSellingEV, DynamicComparisonResult, YearTcoBreakdown } from '../types';
import { INITIAL_VEHICLES } from './mockData';

export type { BestSellingEV, DynamicComparisonResult, YearTcoBreakdown };

export const BEST_SELLING_EVS: BestSellingEV[] = [
  {
    id: 'ev-byd-atto3',
    vehicleId: 'veh-001',
    make: 'BYD',
    model: 'Atto 3',
    trim: 'Extended Range Superior',
    batteryCapacityKwh: 60.5,
    usableCapacityKwh: 58.0,
    realWorldRangeKm: 420,
    wltpRangeKm: 480,
    chargingSpeeds: {
      l1Kw: 2.3,
      l1Hours: 25.0,
      l2Kw: 7.4,
      l2Hours: 7.5,
      l3DcKw: 88.0,
      l3MinsTo80Pct: 35,
    },
    taxImportIncentives: {
      importDutyPct: 0,
      standardIceDutyPct: 35,
      greenTaxExempt: true,
      idecEligible: true,
      estDutySavingsNgn: 14500000,
    },
    baseMsrpNgn: 43500000,
    baseMsrpUsd: 29000,
    driveType: 'FWD',
    zeroToHundredSec: 7.3,
    motorPowerHp: 204,
    motorTorqueNm: 310,
    defaultBenchmarkIceId: 'veh-ice-rav4',
    marketRank: 1,
    salesVolumeNotes: 'Rank #1 best-selling compact electric SUV in Nigeria (over 340 units registered in Lagos & Abuja 2025-2026).',
    energyConsumptionKwhPer100Km: 15.6,
    warrantyYears: 8,
  },
  {
    id: 'ev-changan-deepal-s07',
    vehicleId: 'veh-002',
    make: 'Changan',
    model: 'Deepal S07',
    trim: 'Flagship Luxury Pure Electric',
    batteryCapacityKwh: 66.8,
    usableCapacityKwh: 64.0,
    realWorldRangeKm: 520,
    wltpRangeKm: 620,
    chargingSpeeds: {
      l1Kw: 2.3,
      l1Hours: 28.0,
      l2Kw: 11.0,
      l2Hours: 6.2,
      l3DcKw: 120.0,
      l3MinsTo80Pct: 30,
    },
    taxImportIncentives: {
      importDutyPct: 0,
      standardIceDutyPct: 35,
      greenTaxExempt: true,
      idecEligible: true,
      estDutySavingsNgn: 18200000,
    },
    baseMsrpNgn: 54000000,
    baseMsrpUsd: 36000,
    driveType: 'RWD',
    zeroToHundredSec: 6.7,
    motorPowerHp: 258,
    motorTorqueNm: 320,
    defaultBenchmarkIceId: 'veh-ice-rx350',
    marketRank: 2,
    salesVolumeNotes: 'Top choice among corporate directors in Abuja & Victoria Island; AR HUD & zero-gravity seats.',
    energyConsumptionKwhPer100Km: 16.2,
    warrantyYears: 8,
  },
  {
    id: 'ev-tesla-model-y',
    vehicleId: 'veh-005',
    make: 'Tesla',
    model: 'Model Y',
    trim: 'Long Range Dual Motor AWD',
    batteryCapacityKwh: 78.1,
    usableCapacityKwh: 75.0,
    realWorldRangeKm: 505,
    wltpRangeKm: 533,
    chargingSpeeds: {
      l1Kw: 2.3,
      l1Hours: 32.0,
      l2Kw: 11.5,
      l2Hours: 7.0,
      l3DcKw: 250.0,
      l3MinsTo80Pct: 27,
    },
    taxImportIncentives: {
      importDutyPct: 0,
      standardIceDutyPct: 35,
      greenTaxExempt: true,
      idecEligible: true,
      estDutySavingsNgn: 23800000,
    },
    baseMsrpNgn: 68000000,
    baseMsrpUsd: 45000,
    driveType: 'AWD',
    zeroToHundredSec: 4.8,
    motorPowerHp: 384,
    motorTorqueNm: 510,
    defaultBenchmarkIceId: 'veh-ice-prado',
    marketRank: 3,
    salesVolumeNotes: 'Unrivaled status symbol in Maitama, Ikoyi, and Peter Odili. Supercharger compatible with CCS2 adapter.',
    energyConsumptionKwhPer100Km: 17.1,
    warrantyYears: 8,
  },
  {
    id: 'ev-byd-song-plus',
    vehicleId: 'veh-byd-song-ev',
    make: 'BYD',
    model: 'Song Plus EV',
    trim: 'Champion Flagship Edition',
    batteryCapacityKwh: 82.0,
    usableCapacityKwh: 78.5,
    realWorldRangeKm: 520,
    wltpRangeKm: 605,
    chargingSpeeds: {
      l1Kw: 2.3,
      l1Hours: 34.0,
      l2Kw: 7.4,
      l2Hours: 10.5,
      l3DcKw: 140.0,
      l3MinsTo80Pct: 28,
    },
    taxImportIncentives: {
      importDutyPct: 0,
      standardIceDutyPct: 35,
      greenTaxExempt: true,
      idecEligible: true,
      estDutySavingsNgn: 15400000,
    },
    baseMsrpNgn: 48500000,
    baseMsrpUsd: 32300,
    driveType: 'FWD',
    zeroToHundredSec: 7.9,
    motorPowerHp: 218,
    motorTorqueNm: 330,
    defaultBenchmarkIceId: 'veh-ice-highlander',
    marketRank: 4,
    salesVolumeNotes: 'Ultra-safe Blade battery design with extreme ambient temperature resilience. Over 280 units in fleet service.',
    energyConsumptionKwhPer100Km: 16.5,
    warrantyYears: 8,
  },
  {
    id: 'ev-dongfeng-nammi',
    vehicleId: 'veh-006',
    make: 'Dongfeng',
    model: 'Nammi 01',
    trim: '430 Max City Edition',
    batteryCapacityKwh: 42.3,
    usableCapacityKwh: 40.0,
    realWorldRangeKm: 330,
    wltpRangeKm: 430,
    chargingSpeeds: {
      l1Kw: 2.3,
      l1Hours: 18.0,
      l2Kw: 6.6,
      l2Hours: 5.5,
      l3DcKw: 50.0,
      l3MinsTo80Pct: 30,
    },
    taxImportIncentives: {
      importDutyPct: 0,
      standardIceDutyPct: 35,
      greenTaxExempt: true,
      idecEligible: true,
      estDutySavingsNgn: 9200000,
    },
    baseMsrpNgn: 26800000,
    baseMsrpUsd: 17800,
    driveType: 'FWD',
    zeroToHundredSec: 9.1,
    motorPowerHp: 95,
    motorTorqueNm: 160,
    defaultBenchmarkIceId: 'veh-ice-corolla',
    marketRank: 5,
    salesVolumeNotes: 'Most accessible entry-point EV in Nigeria; ideal for daily commuter runs between Mainland and Island.',
    energyConsumptionKwhPer100Km: 13.2,
    warrantyYears: 8,
  },
];

// BENCHMARK ICE (Internal Combustion Engine) Vehicles in the current platform
export interface BenchmarkIceVehicle {
  id: string;
  name: string;
  make: string;
  model: string;
  year: number;
  engineDispLitres: number;
  cylinders: number;
  horsepower: number;
  torqueNm: number;
  fuelType: 'Petrol (PMS)' | 'Diesel';
  fuelEfficiencyKmPerLitre: number; // e.g. 7.5 km/L (city/highway combined)
  priceNgn: number;
  dutyRatePct: number;
  greenTaxApplicable: boolean;
  greenTaxAmountNgn: number;
  annualMaintenanceEstNgn: number;
  imageUrl: string;
}

export const BENCHMARK_ICE_VEHICLES: BenchmarkIceVehicle[] = [
  {
    id: 'veh-ice-lc300',
    name: '2024 Toyota Land Cruiser 300 VXR (3.5L Twin-Turbo V6)',
    make: 'Toyota',
    model: 'Land Cruiser 300',
    year: 2024,
    engineDispLitres: 3.5,
    cylinders: 6,
    horsepower: 409,
    torqueNm: 650,
    fuelType: 'Petrol (PMS)',
    fuelEfficiencyKmPerLitre: 6.2, // ~16.1 L/100km
    priceNgn: 185000000,
    dutyRatePct: 35,
    greenTaxApplicable: true,
    greenTaxAmountNgn: 5500000,
    annualMaintenanceEstNgn: 2800000,
    imageUrl: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'veh-ice-prado',
    name: '2023 Toyota Land Cruiser Prado TX-L (2.7L Petrol)',
    make: 'Toyota',
    model: 'Prado TX-L',
    year: 2023,
    engineDispLitres: 2.7,
    cylinders: 4,
    horsepower: 163,
    torqueNm: 246,
    fuelType: 'Petrol (PMS)',
    fuelEfficiencyKmPerLitre: 7.8, // ~12.8 L/100km
    priceNgn: 75000000,
    dutyRatePct: 35,
    greenTaxApplicable: true,
    greenTaxAmountNgn: 2500000,
    annualMaintenanceEstNgn: 1650000,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'veh-ice-rx350',
    name: '2022 Lexus RX350 Luxury (3.5L V6 Petrol)',
    make: 'Lexus',
    model: 'RX350',
    year: 2022,
    engineDispLitres: 3.5,
    cylinders: 6,
    horsepower: 295,
    torqueNm: 362,
    fuelType: 'Petrol (PMS)',
    fuelEfficiencyKmPerLitre: 8.4, // ~11.9 L/100km
    priceNgn: 58000000,
    dutyRatePct: 35,
    greenTaxApplicable: true,
    greenTaxAmountNgn: 3200000,
    annualMaintenanceEstNgn: 1450000,
    imageUrl: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'veh-ice-rav4',
    name: '2022 Toyota RAV4 2.5L Petrol AWD',
    make: 'Toyota',
    model: 'RAV4 Petrol',
    year: 2022,
    engineDispLitres: 2.5,
    cylinders: 4,
    horsepower: 203,
    torqueNm: 249,
    fuelType: 'Petrol (PMS)',
    fuelEfficiencyKmPerLitre: 10.5, // ~9.5 L/100km
    priceNgn: 39500000,
    dutyRatePct: 35,
    greenTaxApplicable: false,
    greenTaxAmountNgn: 0,
    annualMaintenanceEstNgn: 1100000,
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'veh-ice-corolla',
    name: '2021 Toyota Corolla 1.8L Petrol',
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    engineDispLitres: 1.8,
    cylinders: 4,
    horsepower: 139,
    torqueNm: 171,
    fuelType: 'Petrol (PMS)',
    fuelEfficiencyKmPerLitre: 12.5, // ~8.0 L/100km
    priceNgn: 23500000,
    dutyRatePct: 35,
    greenTaxApplicable: false,
    greenTaxAmountNgn: 0,
    annualMaintenanceEstNgn: 750000,
    imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=80',
  },
];

// =========================================================================
// TOTAL COST OF OWNERSHIP (TCO) MATHEMATICAL ENGINE (3, 5, 10 YEARS)
// =========================================================================

export interface TcoCalculationParams {
  annualKm: number;
  petrolPricePerLitreNgn: number;
  electricityPricePerKwhNgn: number;
  years: 3 | 5 | 10;
  customEvMsrpNgn?: number;
  customIceMsrpNgn?: number;
}

export function calculateTco(
  ev: BestSellingEV,
  ice: BenchmarkIceVehicle,
  params: TcoCalculationParams
): {
  years: number;
  breakdown: YearTcoBreakdown[];
  threeYearSavings: number;
  fiveYearSavings: number;
  tenYearSavings: number;
  breakevenMonths: number;
  evEnergyTotal: number;
  iceFuelTotal: number;
  evMaintTotal: number;
  iceMaintTotal: number;
  evDeprecTotal: number;
  iceDeprecTotal: number;
} {
  const { annualKm, petrolPricePerLitreNgn, electricityPricePerKwhNgn } = params;

  // Annual Energy costs:
  // EV: kWh consumed per year = (annualKm / 100) * ev.energyConsumptionKwhPer100Km
  const annualEvKwh = (annualKm / 100) * ev.energyConsumptionKwhPer100Km;
  const annualEvEnergyCostNgn = annualEvKwh * electricityPricePerKwhNgn;

  // ICE: Litres consumed per year = annualKm / ice.fuelEfficiencyKmPerLitre
  const annualIceLitres = annualKm / ice.fuelEfficiencyKmPerLitre;
  const annualIceFuelCostNgn = annualIceLitres * petrolPricePerLitreNgn;

  // Maintenance:
  // ICE requires engine oil changes every 5k-10k km, filters, spark plugs, timing chains, coolant, brake wear.
  // EV has no engine oil, 70% lower brake pad wear from regenerative braking, only cabin filter & tires.
  const evBaseAnnualMaint = 220000; // Tires, wipers, cabin filter, brake fluid test
  const iceBaseAnnualMaint = ice.annualMaintenanceEstNgn;

  // Depreciation schedules based on Nigerian market residual trends:
  // EV: 12% year 1, 10% year 2-5, 7% thereafter
  // ICE: 15% year 1, 12% year 2-5, 9% thereafter (accelerated by petrol inflation and wear)
  let currentEvVal = params.customEvMsrpNgn || ev.baseMsrpNgn;
  let currentIceVal = params.customIceMsrpNgn || ice.priceNgn;

  const breakdown: YearTcoBreakdown[] = [];
  let cumEvCost = 0;
  let cumIceCost = 0;

  for (let y = 1; y <= 10; y++) {
    // Inflation factor on fuel/energy (5% per annum)
    const energyInflation = Math.pow(1.05, y - 1);
    const yrEvEnergy = annualEvEnergyCostNgn * energyInflation;
    const yrIceFuel = annualIceFuelCostNgn * energyInflation;

    // Maintenance escalates with vehicle age
    const maintMultiplier = 1 + (y - 1) * 0.08;
    const yrEvMaint = evBaseAnnualMaint * maintMultiplier;
    const yrIceMaint = iceBaseAnnualMaint * maintMultiplier;

    // Depreciation for this specific year
    const evDeprecRate = y === 1 ? 0.12 : y <= 5 ? 0.09 : 0.07;
    const iceDeprecRate = y === 1 ? 0.16 : y <= 5 ? 0.12 : 0.09;

    const yrEvDeprec = currentEvVal * evDeprecRate;
    const yrIceDeprec = currentIceVal * iceDeprecRate;
    currentEvVal -= yrEvDeprec;
    currentIceVal -= yrIceDeprec;

    const yrEvTotal = yrEvEnergy + yrEvMaint + yrEvDeprec;
    const yrIceTotal = yrIceFuel + yrIceMaint + yrIceDeprec;

    cumEvCost += yrEvTotal;
    cumIceCost += yrIceTotal;

    const netSavings = cumIceCost - cumEvCost;

    breakdown.push({
      year: y,
      evEnergyCostNgn: Math.round(yrEvEnergy),
      iceFuelCostNgn: Math.round(yrIceFuel),
      evMaintenanceNgn: Math.round(yrEvMaint),
      iceMaintenanceNgn: Math.round(yrIceMaint),
      evDepreciationNgn: Math.round(yrEvDeprec),
      iceDepreciationNgn: Math.round(yrIceDeprec),
      evCumulativeCostNgn: Math.round(cumEvCost),
      iceCumulativeCostNgn: Math.round(cumIceCost),
      netCumulativeSavingsNgn: Math.round(netSavings),
    });
  }

  const threeYear = breakdown[2];
  const fiveYear = breakdown[4];
  const tenYear = breakdown[9];

  // Breakeven month calculation based on upfront price difference & monthly fuel+maint delta
  const upfrontDiff = (params.customEvMsrpNgn || ev.baseMsrpNgn) - (params.customIceMsrpNgn || ice.priceNgn);
  const monthlySavings = (annualIceFuelCostNgn + iceBaseAnnualMaint - (annualEvEnergyCostNgn + evBaseAnnualMaint)) / 12;
  const breakevenMonths = upfrontDiff > 0 ? Math.ceil(upfrontDiff / Math.max(monthlySavings, 10000)) : 0;

  return {
    years: params.years,
    breakdown,
    threeYearSavings: threeYear.netCumulativeSavingsNgn,
    fiveYearSavings: fiveYear.netCumulativeSavingsNgn,
    tenYearSavings: tenYear.netCumulativeSavingsNgn,
    breakevenMonths,
    evEnergyTotal: breakdown.slice(0, params.years).reduce((acc, b) => acc + b.evEnergyCostNgn, 0),
    iceFuelTotal: breakdown.slice(0, params.years).reduce((acc, b) => acc + b.iceFuelCostNgn, 0),
    evMaintTotal: breakdown.slice(0, params.years).reduce((acc, b) => acc + b.evMaintenanceNgn, 0),
    iceMaintTotal: breakdown.slice(0, params.years).reduce((acc, b) => acc + b.iceMaintenanceNgn, 0),
    evDeprecTotal: breakdown.slice(0, params.years).reduce((acc, b) => acc + b.evDepreciationNgn, 0),
    iceDeprecTotal: breakdown.slice(0, params.years).reduce((acc, b) => acc + b.iceDepreciationNgn, 0),
  };
}

// Generate Dynamic Side-by-Side comparison between any two vehicles
export function generateDynamicComparison(
  vehicleAId: string,
  vehicleBId: string,
  params: {
    annualKm?: number;
    petrolPrice?: number;
    electricityPrice?: number;
  } = {}
): DynamicComparisonResult {
  const annualKm = params.annualKm || 22000;
  const petrolPrice = params.petrolPrice || 1180;
  const electricityPrice = params.electricityPrice || 209;

  // Find vehicles
  const evA = BEST_SELLING_EVS.find((e) => e.id === vehicleAId || e.vehicleId === vehicleAId);
  const evB = BEST_SELLING_EVS.find((e) => e.id === vehicleBId || e.vehicleId === vehicleBId);
  const iceA = BENCHMARK_ICE_VEHICLES.find((i) => i.id === vehicleAId);
  const iceB = BENCHMARK_ICE_VEHICLES.find((i) => i.id === vehicleBId);

  // Fallbacks if not found
  const selectedEv = evA || evB || BEST_SELLING_EVS[0];
  const selectedIce = iceB || iceA || BENCHMARK_ICE_VEHICLES[0];

  const tcoResult = calculateTco(selectedEv, selectedIce, {
    annualKm,
    petrolPricePerLitreNgn: petrolPrice,
    electricityPricePerKwhNgn: electricityPrice,
    years: 5,
  });

  const refuelEv500km = (500 / 100) * selectedEv.energyConsumptionKwhPer100Km * electricityPrice;
  const refuelIce500km = (500 / selectedIce.fuelEfficiencyKmPerLitre) * petrolPrice;

  return {
    vehicleA: {
      id: selectedEv.id,
      title: `${selectedEv.make} ${selectedEv.model} ${selectedEv.trim}`,
      type: 'EV',
      priceNgn: selectedEv.baseMsrpNgn,
      efficiencyMetric: `${selectedEv.energyConsumptionKwhPer100Km} kWh / 100km`,
      acceleration: `0-100 in ${selectedEv.zeroToHundredSec}s`,
      power: `${selectedEv.motorPowerHp} HP (${selectedEv.motorTorqueNm} Nm)`,
      clearanceMm: 175,
      dutyRate: '0% Duty Waived (EV Federal Incentive)',
      refuelCostFor500KmNgn: Math.round(refuelEv500km),
    },
    vehicleB: {
      id: selectedIce.id,
      title: selectedIce.name,
      type: 'ICE',
      priceNgn: selectedIce.priceNgn,
      efficiencyMetric: `${selectedIce.fuelEfficiencyKmPerLitre.toFixed(1)} km / Litre (PMS)`,
      acceleration: '0-100 in 8.2s',
      power: `${selectedIce.horsepower} HP (${selectedIce.torqueNm} Nm)`,
      clearanceMm: 215,
      dutyRate: '35% Standard Duty + Green Tax Surcharge',
      refuelCostFor500KmNgn: Math.round(refuelIce500km),
    },
    tcoSummary: {
      annualMileageKm: annualKm,
      petrolPricePerLitreNgn: petrolPrice,
      electricityPricePerKwhNgn: electricityPrice,
      threeYearSavingsNgn: tcoResult.threeYearSavings,
      fiveYearSavingsNgn: tcoResult.fiveYearSavings,
      tenYearSavingsNgn: tcoResult.tenYearSavings,
      breakevenDistanceKm: Math.round((tcoResult.breakevenMonths / 12) * annualKm),
      breakdownYears: tcoResult.breakdown,
    },
    advantagesA: [
      `Saves ₦${Math.round(refuelIce500km - refuelEv500km).toLocaleString()} on every 500 km road trip`,
      '0% Import Duty saves up to ₦14.5M in upfront federal clearing',
      'Zero engine oil, no spark plugs, 90% fewer moving powertrain parts',
      'Exempt from 2026 Federal Green Tax surcharge on large engines',
      'Overnight home charging on Band A or residential solar inverter',
    ],
    advantagesB: [
      'Established roadside filling station infrastructure nationwide',
      'Deep mechanic familiarity for traditional transmission repairs',
      'Longer unrefueled highway range across remote northern routes',
      'Higher ground clearance for severe rural road conditions',
    ],
  };
}
