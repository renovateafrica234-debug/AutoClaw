export type DealerType = 'dealer' | 'private';

export type VehicleStatus = 'all' | 'listed' | 'pending' | 'sold' | 'draft';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number; // In Naira (₦)
  status: 'listed' | 'pending' | 'sold' | 'draft';
  aiOptimized: boolean;
  syndication: {
    facebook: boolean;
    instagram: boolean;
    jiji: boolean;
    cars45: boolean;
  };
  mileage?: string;
  transmission?: string;
  fuelType?: string;
  imageUrl?: string;
  location?: string;
  viewsCount?: number;
  leadsCount?: number;
}

export type AgentStatus = 'active' | 'processing' | 'idle';

export interface AgentWorker {
  id: string;
  name: string;
  iconName: 'Brain' | 'PenTool' | 'Target' | 'Radio' | 'Shield' | 'Activity';
  status: AgentStatus;
  queueDepth: number;
  lastProcessed: string;
  description: string;
  throughput: string;
  errorRate: string;
  workerPID: number;
  maxQueue?: number;
}

export interface WhatsAppProcurementLead {
  id: string;
  clientType: 'Federal Ministry' | 'Diplomatic Mission / Embassy' | 'International NGO / UN' | 'High-Net-Worth VIP';
  organization: string;
  location: string;
  requestedVehicles: string;
  budgetNgn: string;
  urgency: 'Immediate (48 hrs)' | 'High Priority' | 'Tender Active';
  status: 'Verified RFQ' | 'Scraped Opportunity' | 'Dispatched to WhatsApp';
  timestamp: string;
  scrapedSource: 'Nationwide Scraper' | 'BPP Federal Gazette' | 'Diplomatic Registry' | 'Jiji/Cars45 VIP';
  contactPerson?: string;
}
