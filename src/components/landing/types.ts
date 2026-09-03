export interface ShowcaseVehicle {
  id: string;
  name: string;
  type: 'EV' | 'Petrol';
  badge: string;
  tcoSavingsBadge: string;
  location: string;
  price: string;
  image: string;
  specs: {
    power: string;
    rangeOrEconomy: string;
    fuelCost: string;
    customsDuty: string;
  };
}

export interface ComparisonPair {
  petrolName: string;
  petrolSubtitle: string;
  petrolImage: string;
  evName: string;
  evSubtitle: string;
  evImage: string;
  petrolFuelLitersPer100Km: number;
  evKwhPer100Km: number;
  petrolServiceYearly: number;
  evServiceYearly: number;
  petrolVehicleCost: number;
  evVehicleCost: number;
}
