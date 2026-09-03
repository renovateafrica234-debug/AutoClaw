export type NigerianCity = 'All Nigeria' | 'Abuja' | 'Lagos' | 'Ibadan' | 'Port Harcourt';

export type FuelType = 'Electric (EV)' | 'Plug-in Hybrid (PHEV)' | 'Hybrid (HEV)' | 'Petrol' | 'Diesel';

export type VehicleCondition = 'Brand New' | 'Foreign Used (Tokunbo)' | 'Nigerian Used';

export interface Vehicle {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  fuelType: FuelType;
  condition: VehicleCondition;
  priceNgn: number;
  priceUsdEquivalent?: number;
  batteryCapacityKwh?: number;
  rangeKm?: number;
  chargingTimeAcHours?: number;
  chargingTimeDcMins?: number;
  city: 'Abuja' | 'Lagos' | 'Ibadan' | 'Port Harcourt';
  dealershipName: string;
  dealerPhone: string;
  dealerWhatsapp: string;
  showroomLocation: string;
  imageUrl: string;
  features: string[];
  dutyStatus: '0% Duty Waived (EV)' | 'Standard Duty (Petrol)' | 'Standard Duty (ICE)' | 'Hybrid Concession';
  greenTaxExempt: boolean;
  batteryWarrantyYears?: number;
  monthlyFuelSavingsNgn: number;
  status: 'Available' | 'Reserved' | 'In Transit' | 'Sold';
  description: string;
  engineDispLitres?: number;
  horsepower?: number;
  torqueNm?: number;
  fuelEfficiencyKmPerLitre?: number;
}

// ==========================================
// MODULE 1: EV & DYNAMIC COMPARISON EXTENSION
// ==========================================

export interface BestSellingEV {
  id: string;
  vehicleId: string; // Relational foreign-key to Vehicle table
  make: string;
  model: string;
  trim: string;
  batteryCapacityKwh: number;
  usableCapacityKwh: number;
  realWorldRangeKm: number; // Nigerian ambient AC and traffic range
  wltpRangeKm: number;
  chargingSpeeds: {
    l1Kw: number; // 2.3 kW standard 220V wall socket
    l1Hours: number;
    l2Kw: number; // 7.4 - 22 kW AC Wallbox / Solar Inverter
    l2Hours: number;
    l3DcKw: number; // 50 - 250 kW DC Fast Charging
    l3MinsTo80Pct: number;
  };
  taxImportIncentives: {
    importDutyPct: number; // 0% under current Federal Clean Energy waiver
    standardIceDutyPct: number; // 35% standard for equivalent ICE
    greenTaxExempt: boolean; // Exempt from 2026 luxury displacement tax
    idecEligible: boolean; // Import Duty Exemption Certificate on chargers
    estDutySavingsNgn: number;
  };
  baseMsrpNgn: number;
  baseMsrpUsd: number;
  driveType: 'RWD' | 'AWD' | 'FWD';
  zeroToHundredSec: number;
  motorPowerHp: number;
  motorTorqueNm: number;
  defaultBenchmarkIceId: string; // Direct ICE rival in current database
  marketRank: number;
  salesVolumeNotes: string;
  energyConsumptionKwhPer100Km: number;
  warrantyYears: number;
}

export interface YearTcoBreakdown {
  year: number;
  evEnergyCostNgn: number;
  iceFuelCostNgn: number;
  evMaintenanceNgn: number;
  iceMaintenanceNgn: number;
  evDepreciationNgn: number;
  iceDepreciationNgn: number;
  evCumulativeCostNgn: number;
  iceCumulativeCostNgn: number;
  netCumulativeSavingsNgn: number;
}

export interface DynamicComparisonResult {
  vehicleA: {
    id: string;
    title: string;
    type: 'EV' | 'ICE';
    priceNgn: number;
    efficiencyMetric: string; // e.g. "15.2 kWh/100km" or "11.5 km/L"
    acceleration: string;
    power: string;
    clearanceMm: number;
    dutyRate: string;
    refuelCostFor500KmNgn: number;
  };
  vehicleB: {
    id: string;
    title: string;
    type: 'EV' | 'ICE';
    priceNgn: number;
    efficiencyMetric: string;
    acceleration: string;
    power: string;
    clearanceMm: number;
    dutyRate: string;
    refuelCostFor500KmNgn: number;
  };
  tcoSummary: {
    annualMileageKm: number;
    petrolPricePerLitreNgn: number;
    electricityPricePerKwhNgn: number;
    threeYearSavingsNgn: number;
    fiveYearSavingsNgn: number;
    tenYearSavingsNgn: number;
    breakevenDistanceKm: number;
    breakdownYears: YearTcoBreakdown[];
  };
  advantagesA: string[];
  advantagesB: string[];
}

// ==========================================
// MODULE 2: OMNICHANNEL AGGREGATION EXTENSION
// ==========================================

export type SupportedPlatform =
  | 'jiji'
  | 'cars45'
  | 'autochek'
  | 'carmart'
  | 'buycars'
  | 'facebook'
  | 'tiktok';

export type PlatformSyncStatus = 'synced' | 'syncing' | 'delisted' | 'sold' | 'error' | 'pending';

export interface PlatformConfig {
  id: SupportedPlatform;
  name: string;
  category: 'Local Nigerian Marketplace' | 'Global Social Commerce';
  iconKey: string;
  syncType: 'OAuth2 / REST API' | 'Webhook & Email Parser Bridge' | 'Direct Dealer Portal API';
  connected: boolean;
  activeListingsCount: number;
  totalLeadsCount: number;
  lastSyncTimestamp: string;
  syncLatencyMs: number;
  authStatus: 'Authorized' | 'Active Webhook' | 'Pending Setup';
  rateLimitRemaining: number;
}

// Universal Normalized Listing Schema
export interface NormalizedListing {
  id: string;
  internalVehicleId: string;
  platform: SupportedPlatform;
  platformListingId: string;
  platformUrl: string;
  externalStatus: 'published' | 'pending_approval' | 'delisted_sold' | 'archived';
  listedPriceNgn: number;
  viewsCount: number;
  inquiriesCount: number;
  lastSyncTime: string;
  syncAttempts: number;
  lastSyncError?: string;
  rawPayloadSnippet?: string;
}

export interface OmnichannelLead {
  id: string;
  platform: SupportedPlatform;
  leadName: string;
  phone: string;
  vehicleId: string;
  vehicleTitle: string;
  inquiryMessage: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'negotiation' | 'closed';
  platformAvatar?: string;
}

export interface DelistAuditRecord {
  id: string;
  vehicleId: string;
  vehicleTitle: string;
  triggerEvent: 'AUTO_CLAW_MARKED_SOLD';
  timestamp: string;
  platformResults: {
    platform: SupportedPlatform;
    status: 'SUCCESS_UNPUBLISHED' | 'ALREADY_DELISTED' | 'QUEUED_WEBHOOK';
    latencyMs: number;
    responseCode: number;
  }[];
  totalPlatformsDelisted: number;
}

// ==========================================
// SAAS PRICING & TIERS (NGN STRATEGIC MODEL)
// ==========================================

export type SubscriptionTierId = 'basic' | 'pro' | 'command_center';

export interface SaaSPricingTier {
  id: SubscriptionTierId;
  name: string;
  targetAudience: string;
  monthlyPriceNgn: number;
  annualDiscountPct: number;
  features: string[];
  maxListings: number | 'Unlimited';
  platformsSupported: number | 'All 7 Platforms';
  isPopular?: boolean;
}

// Existing City & Tariff schemas preserved
export interface CityMarketProfile {
  id: string;
  city: 'Abuja' | 'Lagos' | 'Ibadan' | 'Port Harcourt';
  state: string;
  currentPetrolPricePerLitre: number;
  gridReliabilityScore: string;
  avgDailyCommuteKm: number;
  fastChargersCount: number;
  dealershipClusterArea: string;
  keyBuyerDemographic: string;
  topChallenge: string;
  dealerWinningStrategy: string;
  evIncentiveHighlight: string;
}

export interface SalesLead {
  id: string;
  name: string;
  phone: string;
  city: 'Abuja' | 'Lagos' | 'Ibadan' | 'Port Harcourt';
  interestedVehicleId: string;
  budgetNgn: number;
  preferredFuelType: FuelType;
  stage: 'New Inquiry' | 'Pitch Sent' | 'Test Drive Booked' | 'Negotiation' | 'Deal Closed';
  objectionsRaised: string[];
  notes: string;
  dateAdded: string;
}

export interface CustomsTariffComparison {
  fobPriceUsd: number;
  exchangeRateNgn: number;
  iceDutyPct: number;
  iceLevyPct: number;
  iceGreenTaxNgn: number;
  evDutyPct: number;
  evLevyPct: number;
  evGreenTaxNgn: number;
  vatPct: number;
}

