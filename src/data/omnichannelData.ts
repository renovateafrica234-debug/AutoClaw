import {
  PlatformConfig,
  NormalizedListing,
  OmnichannelLead,
  DelistAuditRecord,
  SaaSPricingTier,
  SupportedPlatform,
} from '../types';

export const CONNECTED_PLATFORMS: PlatformConfig[] = [
  {
    id: 'jiji',
    name: 'Jiji.ng Dealer Storefront',
    category: 'Local Nigerian Marketplace',
    iconKey: 'ShoppingBag',
    syncType: 'Webhook & Email Parser Bridge',
    connected: true,
    activeListingsCount: 14,
    totalLeadsCount: 68,
    lastSyncTimestamp: '2 mins ago',
    syncLatencyMs: 340,
    authStatus: 'Active Webhook',
    rateLimitRemaining: 980,
  },
  {
    id: 'cars45',
    name: 'Cars45 Merchant Portal',
    category: 'Local Nigerian Marketplace',
    iconKey: 'Car',
    syncType: 'Direct Dealer Portal API',
    connected: true,
    activeListingsCount: 11,
    totalLeadsCount: 42,
    lastSyncTimestamp: '4 mins ago',
    syncLatencyMs: 420,
    authStatus: 'Authorized',
    rateLimitRemaining: 1450,
  },
  {
    id: 'autochek',
    name: 'Autochek Africa B2B',
    category: 'Local Nigerian Marketplace',
    iconKey: 'ShieldCheck',
    syncType: 'Direct Dealer Portal API',
    connected: true,
    activeListingsCount: 9,
    totalLeadsCount: 37,
    lastSyncTimestamp: '1 min ago',
    syncLatencyMs: 290,
    authStatus: 'Authorized',
    rateLimitRemaining: 2100,
  },
  {
    id: 'carmart',
    name: 'Carmart.ng Classifieds',
    category: 'Local Nigerian Marketplace',
    iconKey: 'Store',
    syncType: 'Webhook & Email Parser Bridge',
    connected: true,
    activeListingsCount: 8,
    totalLeadsCount: 22,
    lastSyncTimestamp: '8 mins ago',
    syncLatencyMs: 510,
    authStatus: 'Active Webhook',
    rateLimitRemaining: 750,
  },
  {
    id: 'buycars',
    name: 'BuyCars.ng Hub',
    category: 'Local Nigerian Marketplace',
    iconKey: 'Tag',
    syncType: 'Webhook & Email Parser Bridge',
    connected: true,
    activeListingsCount: 7,
    totalLeadsCount: 19,
    lastSyncTimestamp: '12 mins ago',
    syncLatencyMs: 480,
    authStatus: 'Active Webhook',
    rateLimitRemaining: 620,
  },
  {
    id: 'facebook',
    name: 'Facebook Marketplace & Meta Catalog',
    category: 'Global Social Commerce',
    iconKey: 'Share2',
    syncType: 'OAuth2 / REST API',
    connected: true,
    activeListingsCount: 16,
    totalLeadsCount: 94,
    lastSyncTimestamp: 'Just now',
    syncLatencyMs: 180,
    authStatus: 'Authorized',
    rateLimitRemaining: 4800,
  },
  {
    id: 'tiktok',
    name: 'TikTok Auto Showcase & Lead Gen',
    category: 'Global Social Commerce',
    iconKey: 'Video',
    syncType: 'OAuth2 / REST API',
    connected: true,
    activeListingsCount: 12,
    totalLeadsCount: 81,
    lastSyncTimestamp: 'Just now',
    syncLatencyMs: 210,
    authStatus: 'Authorized',
    rateLimitRemaining: 3900,
  },
];

export const INITIAL_NORMALIZED_LISTINGS: NormalizedListing[] = [
  {
    id: 'norm-001',
    internalVehicleId: 'veh-001',
    platform: 'jiji',
    platformListingId: 'JIJI-NG-984421',
    platformUrl: 'https://jiji.ng/cars/byd-atto3-2024-abuja-lekki-984421',
    externalStatus: 'published',
    listedPriceNgn: 43500000,
    viewsCount: 1240,
    inquiriesCount: 24,
    lastSyncTime: '2026-09-03 07:15:00',
    syncAttempts: 1,
  },
  {
    id: 'norm-002',
    internalVehicleId: 'veh-001',
    platform: 'facebook',
    platformListingId: 'FB-CATALOG-4491028',
    platformUrl: 'https://facebook.com/marketplace/item/4491028',
    externalStatus: 'published',
    listedPriceNgn: 43500000,
    viewsCount: 2890,
    inquiriesCount: 41,
    lastSyncTime: '2026-09-03 07:18:22',
    syncAttempts: 1,
  },
  {
    id: 'norm-003',
    internalVehicleId: 'veh-001',
    platform: 'tiktok',
    platformListingId: 'TT-LEAD-883190',
    platformUrl: 'https://tiktok.com/@autoclaw/video/7388190',
    externalStatus: 'published',
    listedPriceNgn: 43500000,
    viewsCount: 18400,
    inquiriesCount: 38,
    lastSyncTime: '2026-09-03 07:20:11',
    syncAttempts: 1,
  },
  {
    id: 'norm-004',
    internalVehicleId: 'veh-002',
    platform: 'cars45',
    platformListingId: 'C45-LOT-ABJ-091',
    platformUrl: 'https://cars45.com/listing/changan-deepal-s07-abj-091',
    externalStatus: 'published',
    listedPriceNgn: 54000000,
    viewsCount: 890,
    inquiriesCount: 18,
    lastSyncTime: '2026-09-03 07:10:00',
    syncAttempts: 1,
  },
  {
    id: 'norm-005',
    internalVehicleId: 'veh-002',
    platform: 'autochek',
    platformListingId: 'ACHK-NG-33109',
    platformUrl: 'https://autochek.africa/ng/car/changan-deepal-s07-33109',
    externalStatus: 'published',
    listedPriceNgn: 54000000,
    viewsCount: 1420,
    inquiriesCount: 21,
    lastSyncTime: '2026-09-03 07:12:44',
    syncAttempts: 1,
  },
  {
    id: 'norm-006',
    internalVehicleId: 'lc300',
    platform: 'jiji',
    platformListingId: 'JIJI-NG-110488',
    platformUrl: 'https://jiji.ng/cars/toyota-land-cruiser-300-vxr-110488',
    externalStatus: 'published',
    listedPriceNgn: 185000000,
    viewsCount: 4580,
    inquiriesCount: 19,
    lastSyncTime: '2026-09-03 07:05:12',
    syncAttempts: 1,
  },
  {
    id: 'norm-007',
    internalVehicleId: 'lc300',
    platform: 'facebook',
    platformListingId: 'FB-CATALOG-992104',
    platformUrl: 'https://facebook.com/marketplace/item/992104',
    externalStatus: 'published',
    listedPriceNgn: 185000000,
    viewsCount: 6200,
    inquiriesCount: 28,
    lastSyncTime: '2026-09-03 07:08:30',
    syncAttempts: 1,
  },
];

export const INITIAL_OMNICHANNEL_LEADS: OmnichannelLead[] = [
  {
    id: 'omni-lead-01',
    platform: 'facebook',
    leadName: 'Alhaji Bashir Dangote',
    phone: '+234 803 111 8844',
    vehicleId: 'veh-002',
    vehicleTitle: '2024 Changan Deepal S07 Luxury EV Crossover',
    inquiryMessage: 'Is this available for delivery to Asokoro, Abuja today? Can we test drive at the CBD lot?',
    timestamp: '8 mins ago',
    status: 'new',
  },
  {
    id: 'omni-lead-02',
    platform: 'tiktok',
    leadName: 'Folake Adeyemi (Tech Lead)',
    phone: '+234 802 774 9901',
    vehicleId: 'veh-001',
    vehicleTitle: '2024 BYD Atto 3 Extended Range',
    inquiryMessage: 'Saw your TikTok video on the 0% duty waiver. Does this car come with the 7kW home wallbox charger included?',
    timestamp: '24 mins ago',
    status: 'contacted',
  },
  {
    id: 'omni-lead-03',
    platform: 'jiji',
    leadName: 'Senator Gabriel M.',
    phone: '+234 809 333 4411',
    vehicleId: 'lc300',
    vehicleTitle: '2024 Toyota Land Cruiser 300 VXR',
    inquiryMessage: 'Confirm if duty papers are original single-document Tin Can customs cleared. Ready to make physical inspection at 2 PM.',
    timestamp: '42 mins ago',
    status: 'negotiation',
  },
  {
    id: 'omni-lead-04',
    platform: 'cars45',
    leadName: 'Engr. Nnamdi Eze',
    phone: '+234 818 223 9012',
    vehicleId: 'veh-005',
    vehicleTitle: '2023 Tesla Model Y Long Range AWD',
    inquiryMessage: 'Do you offer trade-in for a 2018 Prado plus balance in Naira via bank draft?',
    timestamp: '1 hour ago',
    status: 'new',
  },
];

export const INITIAL_DELIST_AUDITS: DelistAuditRecord[] = [
  {
    id: 'audit-delist-901',
    vehicleId: 'veh-008-sold',
    vehicleTitle: '2022 Lexus RX450h F-Sport Hybrid',
    triggerEvent: 'AUTO_CLAW_MARKED_SOLD',
    timestamp: '2026-09-02 16:45:10 WAT',
    totalPlatformsDelisted: 7,
    platformResults: [
      { platform: 'jiji', status: 'SUCCESS_UNPUBLISHED', latencyMs: 210, responseCode: 200 },
      { platform: 'cars45', status: 'SUCCESS_UNPUBLISHED', latencyMs: 380, responseCode: 200 },
      { platform: 'autochek', status: 'SUCCESS_UNPUBLISHED', latencyMs: 290, responseCode: 200 },
      { platform: 'carmart', status: 'SUCCESS_UNPUBLISHED', latencyMs: 440, responseCode: 200 },
      { platform: 'buycars', status: 'SUCCESS_UNPUBLISHED', latencyMs: 510, responseCode: 200 },
      { platform: 'facebook', status: 'SUCCESS_UNPUBLISHED', latencyMs: 140, responseCode: 200 },
      { platform: 'tiktok', status: 'SUCCESS_UNPUBLISHED', latencyMs: 190, responseCode: 200 },
    ],
  },
];

// Strategic SaaS Pricing Table for AutoClaw (Nigerian Dealerships)
export const SAAS_PRICING_TIERS: SaaSPricingTier[] = [
  {
    id: 'basic',
    name: 'Basic',
    targetAudience: 'Independent Sellers & Small Lots',
    monthlyPriceNgn: 45000,
    annualDiscountPct: 15,
    maxListings: 30,
    platformsSupported: 1,
    features: [
      'Core AutoClaw inventory & sales lot management',
      'EV vs. ICE TCO Dynamic Comparison Tool',
      'Up to 30 active vehicle listings',
      'Single-platform posting (Direct Storefront)',
      'Basic WhatsApp deal-pitch generator',
      'Local currency (₦ Naira) invoice generator',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    targetAudience: 'Mid-Sized Dealerships',
    monthlyPriceNgn: 120000,
    annualDiscountPct: 20,
    maxListings: 150,
    platformsSupported: 2,
    isPopular: true,
    features: [
      'All Basic Features included',
      'Up to 150 vehicle listings across multiple lots',
      'Lead capture widget for external dealership websites',
      'Omnichannel Sync (up to 2 external platforms e.g. Jiji & Facebook)',
      'Centralized "Mark Sold" auto-unpublish trigger',
      'Advanced 3/5/10-year TCO exportable PDF reports',
      'Priority WhatsApp Procurement Radar access',
    ],
  },
  {
    id: 'command_center',
    name: 'Command Center',
    targetAudience: 'High-Volume Lots & Auto Groups',
    monthlyPriceNgn: 285000,
    annualDiscountPct: 25,
    maxListings: 'Unlimited',
    platformsSupported: 'All 7 Platforms',
    features: [
      'All Pro Features included',
      'Unlimited listings across all regional branches (Abuja, Lagos, PH, Ibadan)',
      'Full Multi-Platform Sync (Jiji, Cars45, Autochek, Carmart, BuyCars, Facebook, TikTok)',
      'Unified CRM Lead Inbox with instant push notifications',
      'Zero double-booking guarantee (AutoClaw "Source of Truth" lock)',
      'Autonomous BullMQ syndication swarm workers',
      'Dedicated enterprise dealer account manager & custom API webhooks',
    ],
  },
];

// Python and Google Apps Script Code templates for Enterprise Dealers
export const ENTERPRISE_INGESTION_SCRIPTS = {
  pythonScript: `# AutoClaw Omnichannel Two-Way Sync Worker (Python / FastAPI / Celery)
# Enforces AutoClaw as Centralized "Source of Truth" for Nigerian Dealerships
import os
import requests
from typing import Dict, Any

AUTOCLAW_API_BASE = os.getenv("AUTOCLAW_API_BASE", "https://api.autoclaw.ng")
AUTOCLAW_API_KEY = os.getenv("AUTOCLAW_API_KEY", "ac_live_sec_key_44109")

class AutoClawOmnichannelSyncEngine:
    def __init__(self, dealer_id: str):
        self.dealer_id = dealer_id
        self.headers = {"Authorization": f"Bearer {AUTOCLAW_API_KEY}", "Content-Type": "application/json"}

    def on_vehicle_marked_sold(self, vehicle_id: str):
        """
        Triggered when a vehicle is sold on physical lot or AutoClaw CRM.
        Broadcasts delist requests to Jiji, Cars45, Autochek, Facebook & TikTok.
        """
        print(f"[AutoClaw SOT] Vehicle {vehicle_id} marked SOLD. Commencing universal delisting...")
        
        # 1. Meta Graph API (Facebook Marketplace)
        self._delist_facebook_marketplace(vehicle_id)
        
        # 2. TikTok Commerce API
        self._delist_tiktok_catalog(vehicle_id)
        
        # 3. Webhook Dispatch to Closed Ecosystems (Jiji / Cars45 / Autochek)
        self._dispatch_closed_platform_webhooks(vehicle_id, action="DELIST_ARCHIVE")

    def _delist_facebook_marketplace(self, vehicle_id: str):
        fb_token = os.getenv("FB_CATALOG_ACCESS_TOKEN")
        catalog_id = os.getenv("FB_VEHICLE_CATALOG_ID")
        url = f"https://graph.facebook.com/v19.0/{catalog_id}/vehicles_batch"
        payload = {
            "requests": [{
                "method": "UPDATE",
                "retailer_id": vehicle_id,
                "data": {"availability": "out_of_stock", "status": "archived"}
            }]
        }
        res = requests.post(url, headers={"Authorization": f"Bearer {fb_token}"}, json=payload)
        return res.json()

    def _delist_tiktok_catalog(self, vehicle_id: str):
        tt_token = os.getenv("TIKTOK_BUSINESS_TOKEN")
        url = "https://business-api.tiktok.com/open_api/v1.3/catalog/item/update/"
        payload = {"item_id": vehicle_id, "status": "OFFLINE"}
        res = requests.post(url, headers={"Access-Token": tt_token}, json=payload)
        return res.json()

    def _dispatch_closed_platform_webhooks(self, vehicle_id: str, action: str):
        # Notify Jiji/Cars45 webhook listener daemon or email forwarder
        url = f"{AUTOCLAW_API_BASE}/api/omnichannel/mark-sold"
        res = requests.post(url, headers=self.headers, json={"vehicleId": vehicle_id, "action": action})
        return res.json()
`,

  googleAppsScript: `/**
 * AutoClaw Email Parsing & Webhook Bridge for Closed Nigerian Classifieds
 * Runs inside Google Apps Script attached to dealer inquiries inbox
 * Automatically parses incoming leads from Jiji, Cars45, and Autochek.
 */
function parseIncomingClassifiedEmails() {
  const threads = GmailApp.search('label:unread (from:no-reply@jiji.ng OR from:alerts@cars45.com OR from:leads@autochek.africa)');
  const autoclawWebhookUrl = "https://api.autoclaw.ng/api/omnichannel/parse-email";

  for (const thread of threads) {
    const messages = thread.getMessages();
    for (const msg of messages) {
      if (msg.isUnread()) {
        const body = msg.getPlainBody();
        const subject = msg.getSubject();
        const from = msg.getFrom();

        let platform = "jiji";
        if (from.includes("cars45")) platform = "cars45";
        if (from.includes("autochek")) platform = "autochek";

        const payload = {
          platform: platform,
          subject: subject,
          rawBody: body,
          receivedAt: msg.getDate().toISOString()
        };

        // Post normalized payload to AutoClaw CRM
        const options = {
          method: "post",
          contentType: "application/json",
          payload: JSON.stringify(payload),
          headers: { "X-AutoClaw-Secret": "bridge_sec_app_script_992" }
        };

        UrlFetchApp.fetch(autoclawWebhookUrl, options);
        msg.markRead();
      }
    }
  }
}
`,
};
