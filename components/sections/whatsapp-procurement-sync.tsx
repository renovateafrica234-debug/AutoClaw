import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  Building2,
  Globe2,
  ShieldCheck,
  Send,
  Zap,
  CheckCircle2,
  Radio,
  Search,
  Sliders,
  DollarSign,
  AlertCircle,
  ExternalLink,
  PhoneCall,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WhatsAppProcurementLead } from '@/types';

const INITIAL_LEADS: WhatsAppProcurementLead[] = [
  {
    id: 'proc-1',
    clientType: 'Federal Ministry',
    organization: 'Federal Ministry of Power & Housing (FMPW)',
    location: 'Mabushi / Central Area, Abuja',
    requestedVehicles: '4x 2022-2024 Toyota Land Cruiser Prado TX-L (Armored / Standard)',
    budgetNgn: '₦185,000,000',
    urgency: 'Immediate (48 hrs)',
    status: 'Verified RFQ',
    timestamp: '8 mins ago',
    scrapedSource: 'BPP Federal Gazette',
    contactPerson: 'Directorate of Procurement & Logistics',
  },
  {
    id: 'proc-2',
    clientType: 'Diplomatic Mission / Embassy',
    organization: 'Diplomatic Mission / Embassy Chancery',
    location: 'Diplomatic Zone, Maitama, Abuja',
    requestedVehicles: '2x 2023 BMW X5 xDrive or Mercedes-Benz GLE 450 (Diplomatic Duty-Free)',
    budgetNgn: '₦125,000,000',
    urgency: 'High Priority',
    status: 'Verified RFQ',
    timestamp: '22 mins ago',
    scrapedSource: 'Diplomatic Registry',
    contactPerson: 'Attache of General Services',
  },
  {
    id: 'proc-3',
    clientType: 'International NGO / UN',
    organization: 'ECOWAS Regional Peace & Security Directorate',
    location: 'Asokoro, Abuja',
    requestedVehicles: '6x Toyota Hilux 4WD Double Cabin or Fortuner (Duty-Exempt)',
    budgetNgn: '₦240,000,000',
    urgency: 'Tender Active',
    status: 'Scraped Opportunity',
    timestamp: '45 mins ago',
    scrapedSource: 'Nationwide Scraper',
    contactPerson: 'Procurement Committee',
  },
  {
    id: 'proc-4',
    clientType: 'High-Net-Worth VIP',
    organization: 'Private Executive Family Office',
    location: 'Guzape Hills / Maitama, Abuja',
    requestedVehicles: '1x 2022-2023 Lexus RX 350 or LX 570 / 600 (Clean Tokunbo or Brand New)',
    budgetNgn: '₦45,000,000 - ₦75,000,000',
    urgency: 'Immediate (48 hrs)',
    status: 'Verified RFQ',
    timestamp: '1 hour ago',
    scrapedSource: 'Jiji/Cars45 VIP',
    contactPerson: 'Chief of Staff to Principal',
  },
  {
    id: 'proc-5',
    clientType: 'International NGO / UN',
    organization: 'United Nations Development Programme (UNDP) Nigeria',
    location: 'UN House, Central Business District, Abuja',
    requestedVehicles: '3x Hybrid / Clean Fuel SUVs (Prado / RAV4 / BYD Song)',
    budgetNgn: '₦110,000,000',
    urgency: 'Tender Active',
    status: 'Scraped Opportunity',
    timestamp: '3 hours ago',
    scrapedSource: 'BPP Federal Gazette',
    contactPerson: 'Operations Support Unit',
  },
];

export const WhatsAppProcurementSync: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('2348035558822');
  const [dealerLotName, setDealerLotName] = useState('Abuja Prime Motors');
  const [selectedZone, setSelectedZone] = useState('Maitama / Central Area');
  const [isConnected, setIsConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Federal Ministry' | 'Diplomatic' | 'NGO' | 'VIP'>('All');

  // Preference toggles
  const [alertsGov, setAlertsGov] = useState(true);
  const [alertsDiplomatic, setAlertsDiplomatic] = useState(true);
  const [alertsNgo, setAlertsNgo] = useState(true);
  const [alertsVip, setAlertsVip] = useState(true);
  const [alertsNationwideScraping, setAlertsNationwideScraping] = useState(true);

  const [leads, setLeads] = useState<WhatsAppProcurementLead[]>(INITIAL_LEADS);
  const [testDispatchedId, setTestDispatchedId] = useState<string | null>(null);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setIsConnected(true);
    }, 1200);
  };

  const handleSendTestToWhatsApp = (lead: WhatsAppProcurementLead) => {
    setTestDispatchedId(lead.id);

    const message = encodeURIComponent(
      `🚨 *AUTOCLAW ABUJA INTELLIGENCE RADAR* 🚨\n\n` +
        `🎯 *Target*: ${lead.organization} (${lead.clientType})\n` +
        `📍 *Location*: ${lead.location}\n` +
        `🚘 *Requested Fleet*: ${lead.requestedVehicles}\n` +
        `💰 *Estimated Budget*: ${lead.budgetNgn}\n` +
        `⚡ *Urgency*: ${lead.urgency}\n` +
        `📡 *Source*: AutoClaw ${lead.scrapedSource} (Verified)\n\n` +
        `👉 *Action for ${dealerLotName}*: Tap to inspect matched inventory in your AutoClaw Abuja dashboard and dispatch matching quotation.`
    );

    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const filteredLeads = leads.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Federal Ministry') return item.clientType === 'Federal Ministry';
    if (activeCategory === 'Diplomatic') return item.clientType === 'Diplomatic Mission / Embassy';
    if (activeCategory === 'NGO') return item.clientType === 'International NGO / UN';
    if (activeCategory === 'VIP') return item.clientType === 'High-Net-Worth VIP';
    return true;
  });

  return (
    <section id="whatsapp-procurement-section" className="py-16 sm:py-20 bg-[#070a16] relative">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              HOT LEADS SCRAPER & DIRECT WHATSAPP PIPELINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight">
              Connect Dealer WhatsApp Line
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1 max-w-2xl">
              AutoClaw scrubs car sales platforms nationwide (Jiji, Cars45, Facebook Marketplace) and tracks high-value Abuja purchases, Federal Government tenders, NGO fleets, and Diplomatic commissions directly to your phone.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              Scraping Nationwide 24/7
            </span>
          </div>
        </div>

        {/* Dual Layout: WhatsApp Configuration Card (Left) + Live Scraped Pipeline (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Configuration & Status (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-slate-900/80 border-slate-800 p-6 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Cabinet_Grotesk',sans-serif]">
                      WhatsApp Business Bridge
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      AutoClaw Push Notification Gateway
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isConnected ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
                    }`}
                  />
                  <span
                    className={`text-xs font-mono font-bold uppercase ${
                      isConnected ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {isConnected ? 'LIVE SYNCED' : 'DISCONNECTED'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleConnect} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-slate-300 block mb-1">WhatsApp Business Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 2348035558822"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
                      +234 International
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">Dealership Lot Name</label>
                    <input
                      type="text"
                      required
                      value={dealerLotName}
                      onChange={(e) => setDealerLotName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">Abuja Zone</label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Maitama / Central Area">Maitama / Central Area</option>
                      <option value="Wuse 2 / Utako">Wuse 2 / Utako</option>
                      <option value="Garki / Area 11">Garki / Area 11</option>
                      <option value="Guzape / Asokoro">Guzape / Asokoro</option>
                      <option value="Airport Road / Gwarinpa">Airport Road / Gwarinpa</option>
                    </select>
                  </div>
                </div>

                {/* Lead Scrubbing Filters */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                    Scraping & Intelligence Filters
                  </span>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Building2 className="w-3.5 h-3.5 text-violet-400" />
                        Federal Ministry & MDA Tenders
                      </span>
                      <input
                        type="checkbox"
                        checked={alertsGov}
                        onChange={(e) => setAlertsGov(e.target.checked)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                        Diplomatic Missions & Embassies
                      </span>
                      <input
                        type="checkbox"
                        checked={alertsDiplomatic}
                        onChange={(e) => setAlertsDiplomatic(e.target.checked)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <span className="flex items-center gap-2 text-slate-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        UN, ECOWAS & International NGOs
                      </span>
                      <input
                        type="checkbox"
                        checked={alertsNgo}
                        onChange={(e) => setAlertsNgo(e.target.checked)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <span className="flex items-center gap-2 text-slate-200">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                        VIP High-Value Purchases (&gt;₦40M)
                      </span>
                      <input
                        type="checkbox"
                        checked={alertsVip}
                        onChange={(e) => setAlertsVip(e.target.checked)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 cursor-pointer">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Radio className="w-3.5 h-3.5 text-pink-400" />
                        Nationwide Car Platforms Scraper (Jiji/Cars45)
                      </span>
                      <input
                        type="checkbox"
                        checked={alertsNationwideScraping}
                        onChange={(e) => setAlertsNationwideScraping(e.target.checked)}
                        className="rounded border-slate-700 text-emerald-500 focus:ring-0"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant={isConnected ? 'secondary' : 'glow'}
                    size="md"
                    className="w-full font-bold uppercase tracking-wider text-xs"
                    disabled={isSyncing}
                  >
                    {isSyncing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Establishing Secure Bridge...
                      </span>
                    ) : isConnected ? (
                      <span className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        WhatsApp Line Active & Connected
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Link WhatsApp Business Line
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Quick explanation banner */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs font-mono text-emerald-300/90 leading-relaxed">
              <strong className="text-white block mb-1 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                How AutoClaw WhatsApp Radar Works:
              </strong>
              Every 15 minutes, AutoClaw’s Lead Agent scrubs the Bureau of Public Procurement (BPP) gazette, diplomatic procurement bulletins, NGO tender boards, and social platforms for high-value car buyers. When a match fits your inventory, AutoClaw pings your WhatsApp Business with the procurement officer’s fleet specs.
            </div>
          </div>

          {/* Right Column: Live Scraped Opportunity Pipeline (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Filter Pills */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
              <div className="flex items-center gap-1.5">
                {(['All', 'Federal Ministry', 'Diplomatic', 'NGO', 'VIP'] as const).map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                {filteredLeads.length} Hot Leads Detected
              </span>
            </div>

            {/* Leads List */}
            <div className="space-y-3.5">
              {filteredLeads.map((lead) => {
                return (
                  <Card
                    key={lead.id}
                    className="bg-slate-900/70 border-slate-800/90 hover:border-emerald-500/40 p-5 transition-all duration-200 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                              lead.clientType === 'Federal Ministry'
                                ? 'bg-violet-950 text-violet-300 border border-violet-500/30'
                                : lead.clientType === 'Diplomatic Mission / Embassy'
                                ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                                : lead.clientType === 'International NGO / UN'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {lead.clientType}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            • {lead.scrapedSource}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            • {lead.timestamp}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white font-['Cabinet_Grotesk',sans-serif] group-hover:text-emerald-300 transition-colors">
                          {lead.organization}
                        </h4>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                          {lead.location} {lead.contactPerson ? `// ${lead.contactPerson}` : ''}
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">
                          Estimated Budget
                        </span>
                        <span className="text-lg font-black text-emerald-400 font-['Cabinet_Grotesk',sans-serif]">
                          {lead.budgetNgn}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 my-3 text-xs font-mono">
                      <span className="text-slate-500 text-[10px] block uppercase mb-0.5">
                        Vehicle Fleet Requirements:
                      </span>
                      <p className="text-slate-200 font-semibold">{lead.requestedVehicles}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center gap-2 text-[11px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                          {lead.urgency}
                        </span>
                        <span className="text-slate-500">{lead.status}</span>
                      </div>

                      <Button
                        type="button"
                        variant="glow"
                        size="sm"
                        onClick={() => handleSendTestToWhatsApp(lead)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold border-emerald-400/40 text-xs shadow-emerald-600/30"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Push RFQ to WhatsApp
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
