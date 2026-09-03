import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Code,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Share2,
  Video,
  Car,
  Store,
  Tag,
  ArrowRight,
  Clock,
  Phone,
  MessageSquare,
} from 'lucide-react';
import {
  CONNECTED_PLATFORMS,
  INITIAL_NORMALIZED_LISTINGS,
  INITIAL_OMNICHANNEL_LEADS,
  INITIAL_DELIST_AUDITS,
  ENTERPRISE_INGESTION_SCRIPTS,
} from '@/src/data/omnichannelData';
import {
  PlatformConfig,
  NormalizedListing,
  OmnichannelLead,
  DelistAuditRecord,
  SupportedPlatform,
} from '@/src/types';

export function OmnichannelModule({ onClose }: { onClose?: () => void }) {
  const [platforms, setPlatforms] = useState<PlatformConfig[]>(CONNECTED_PLATFORMS);
  const [listings, setListings] = useState<NormalizedListing[]>(INITIAL_NORMALIZED_LISTINGS);
  const [leads, setLeads] = useState<OmnichannelLead[]>(INITIAL_OMNICHANNEL_LEADS);
  const [auditLogs, setAuditLogs] = useState<DelistAuditRecord[]>(INITIAL_DELIST_AUDITS);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'matrix' | 'sot_delist' | 'leads' | 'scripts'>('matrix');

  // Interactive "Source of Truth" simulation state
  const [testVehicleId, setTestVehicleId] = useState<string>('veh-001');
  const [isDelisting, setIsDelisting] = useState<boolean>(false);
  const [lastDelistSuccess, setLastDelistSuccess] = useState<DelistAuditRecord | null>(null);

  // Code snippet toggle (Python vs Google Apps Script)
  const [selectedScript, setSelectedScript] = useState<'python' | 'gas'>('python');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Handle Mark Sold & Universal Delist Trigger
  const handleTriggerMarkSold = async () => {
    setIsDelisting(true);

    try {
      // Call the backend endpoint in server.ts
      const response = await fetch('/api/omnichannel/mark-sold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: testVehicleId,
          vehicleTitle:
            testVehicleId === 'veh-001'
              ? '2024 BYD Atto 3 Extended Range'
              : testVehicleId === 'veh-002'
              ? '2024 Changan Deepal S07 Luxury EV'
              : '2024 Toyota Land Cruiser 300 VXR',
          triggerUser: 'AutoClaw Dealership Admin (Abuja Central Lot)',
        }),
      });

      const data = await response.json();

      if (data.success && data.auditRecord) {
        const newAudit: DelistAuditRecord = {
          id: data.auditRecord.auditId,
          vehicleId: data.auditRecord.vehicleId,
          vehicleTitle: data.auditRecord.vehicleTitle,
          triggerEvent: 'AUTO_CLAW_MARKED_SOLD',
          timestamp: new Date().toLocaleTimeString('en-GB') + ' WAT',
          totalPlatformsDelisted: data.auditRecord.channels.length,
          platformResults: data.auditRecord.channels.map((c: any) => ({
            platform: c.platform,
            status: c.status,
            latencyMs: c.latencyMs,
            responseCode: c.code,
          })),
        };

        setAuditLogs((prev) => [newAudit, ...prev]);
        setLastDelistSuccess(newAudit);

        // Update local listing status
        setListings((prev) =>
          prev.map((item) =>
            item.internalVehicleId === testVehicleId
              ? { ...item, externalStatus: 'delisted_sold' }
              : item
          )
        );
      }
    } catch (e) {
      console.error('Mark sold dispatch error:', e);
    } finally {
      setIsDelisting(false);
    }
  };

  const copyScriptToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full text-white bg-[#000000] p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#262626] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex aspect-square h-6 w-6 items-center justify-center rounded-sm bg-[#eaff00] p-1 text-black font-black text-xs">
              OMNI
            </span>
            <span className="text-xs font-mono tracking-widest text-[#b3b3b3] uppercase">
              Module 2 • Universal Omnichannel Aggregation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase font-mono">
            Two-Way Multi-Platform Synchronization
          </h2>
          <p className="text-sm text-[#b3b3b3] max-w-2xl mt-1">
            Centralized "Source of Truth" for Nigerian auto lots. Normalizes Jiji, Cars45, Autochek, Carmart, BuyCars, Facebook Marketplace, and TikTok with automated zero-double-booking unpublishing.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-[#141414] p-1.5 rounded-sm border border-[#262626]">
          <button
            type="button"
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1 text-xs font-mono font-bold transition-colors cursor-pointer rounded-sm ${
              activeTab === 'matrix' ? 'bg-[#eaff00] text-black' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            Connected Channels
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sot_delist')}
            className={`px-3 py-1 text-xs font-mono font-bold transition-colors cursor-pointer rounded-sm ${
              activeTab === 'sot_delist' ? 'bg-[#eaff00] text-black' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            Source of Truth (Delist)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('leads')}
            className={`px-3 py-1 text-xs font-mono font-bold transition-colors cursor-pointer rounded-sm ${
              activeTab === 'leads' ? 'bg-[#eaff00] text-black' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            Unified CRM Inbox ({leads.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scripts')}
            className={`px-3 py-1 text-xs font-mono font-bold transition-colors cursor-pointer rounded-sm ${
              activeTab === 'scripts' ? 'bg-[#eaff00] text-black' : 'text-[#b3b3b3] hover:text-white'
            }`}
          >
            API & Webhook Workers
          </button>
        </div>
      </div>

      {/* TAB 1: CONNECTED CHANNELS MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#141414] border border-[#262626] p-3 rounded-sm font-mono">
              <span className="text-[10px] text-[#808080] uppercase block">Connected Channels</span>
              <span className="text-xl font-bold text-[#eaff00]">7 / 7 Active</span>
            </div>
            <div className="bg-[#141414] border border-[#262626] p-3 rounded-sm font-mono">
              <span className="text-[10px] text-[#808080] uppercase block">Average Sync Latency</span>
              <span className="text-xl font-bold text-white">285 ms</span>
            </div>
            <div className="bg-[#141414] border border-[#262626] p-3 rounded-sm font-mono">
              <span className="text-[10px] text-[#808080] uppercase block">Active Cross-Postings</span>
              <span className="text-xl font-bold text-white">77 Listings</span>
            </div>
            <div className="bg-[#141414] border border-[#262626] p-3 rounded-sm font-mono">
              <span className="text-[10px] text-[#808080] uppercase block">Double-Booking Risk</span>
              <span className="text-xl font-bold text-[#eaff00]">0.0% (Guaranteed)</span>
            </div>
          </div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {platforms.map((p) => (
              <div
                key={p.id}
                className="bg-[#0f0f0f] border border-[#262626] hover:border-[#333333] p-4 rounded-sm space-y-3 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-sm bg-[#141414] border border-[#333333] flex items-center justify-center text-[#eaff00] font-bold">
                      {p.id === 'facebook' ? (
                        <Share2 size={16} />
                      ) : p.id === 'tiktok' ? (
                        <Video size={16} />
                      ) : p.id === 'jiji' ? (
                        <ShoppingBag size={16} />
                      ) : p.id === 'cars45' ? (
                        <Car size={16} />
                      ) : p.id === 'autochek' ? (
                        <ShieldCheck size={16} />
                      ) : (
                        <Store size={16} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{p.name}</h4>
                      <span className="text-[10px] font-mono text-[#808080] block">
                        {p.category}
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#eaff00]/10 text-[#eaff00] border border-[#eaff00]/30 rounded-xs">
                    {p.authStatus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2 border-y border-[#1f1f1f]">
                  <div>
                    <span className="text-[#808080] block text-[10px]">Sync Protocol:</span>
                    <span className="text-white text-[11px] truncate block">{p.syncType}</span>
                  </div>
                  <div>
                    <span className="text-[#808080] block text-[10px]">Latency:</span>
                    <span className="text-white font-bold">{p.syncLatencyMs} ms</span>
                  </div>
                  <div>
                    <span className="text-[#808080] block text-[10px]">Active Listings:</span>
                    <span className="text-white font-bold">{p.activeListingsCount} vehicles</span>
                  </div>
                  <div>
                    <span className="text-[#808080] block text-[10px]">Total Leads:</span>
                    <span className="text-[#eaff00] font-bold">{p.totalLeadsCount} captured</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#808080]">
                  <span>Last synced {p.lastSyncTimestamp}</span>
                  <span className="text-white font-bold">API Quota: {p.rateLimitRemaining} req/hr</span>
                </div>
              </div>
            ))}
          </div>

          {/* Normalization Schema Showcase */}
          <div className="bg-[#141414] border border-[#262626] p-5 rounded-sm space-y-4">
            <h3 className="text-sm font-bold font-mono uppercase text-white flex items-center gap-2">
              <Code size={16} className="text-[#eaff00]" />
              Universal Data Normalization Pipeline
            </h3>
            <p className="text-xs text-[#b3b3b3]">
              Different platforms deliver vehicle attributes in conflicting naming structures. AutoClaw transforms them into our unified B2B specification standard on fly:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-[#0a0a0a] p-3 rounded-xs border border-[#262626]">
                <span className="text-red-400 font-bold block mb-1">Incoming Jiji Format:</span>
                <code className="text-[11px] text-[#808080] block">
                  {`{ "ad_id": 98442, "price_currency": "NGN", "attrs": { "fuel": "Electricity", "duty": "yes" } }`}
                </code>
              </div>
              <div className="bg-[#0a0a0a] p-3 rounded-xs border border-[#262626]">
                <span className="text-blue-400 font-bold block mb-1">Incoming Facebook Graph:</span>
                <code className="text-[11px] text-[#808080] block">
                  {`{ "retailer_id": "v1", "vehicle_spec": { "drivetrain": "EV", "cleared_customs": true } }`}
                </code>
              </div>
              <div className="bg-[#0a0a0a] p-3 rounded-xs border border-[#eaff00]/30">
                <span className="text-[#eaff00] font-bold block mb-1">AutoClaw Normalized:</span>
                <code className="text-[11px] text-white block">
                  {`{ "vehicleId": "veh-001", "fuelType": "Electric (EV)", "dutyStatus": "0% Duty Waived (EV)" }`}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CENTRALIZED SOURCE OF TRUTH (SOT) DELIST ENGINE */}
      {activeTab === 'sot_delist' && (
        <div className="space-y-6">
          <div className="bg-[#141414] border border-[#262626] p-5 rounded-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#eaff00] animate-pulse" />
              <h3 className="text-base font-bold font-mono uppercase text-white">
                Universal "Mark Sold" Instant Delist Pipeline
              </h3>
            </div>
            <p className="text-xs text-[#b3b3b3] max-w-3xl">
              When a sales agreement is signed on a physical lot in Abuja or Lagos, a dealer marks the vehicle as "Sold" in AutoClaw. This triggers parallel broadcast calls to unpublish/archive the listing across all 7 platforms simultaneously, eliminating embarrassing double-booking calls and wasted ad spend.
            </p>

            {/* Interactive Dispatch Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <select
                value={testVehicleId}
                onChange={(e) => setTestVehicleId(e.target.value)}
                className="bg-[#0a0a0a] border border-[#333333] text-white text-xs font-mono p-2.5 rounded-sm focus:border-[#eaff00] focus:outline-none"
              >
                <option value="veh-001">2024 BYD Atto 3 Extended Range (₦43.5M)</option>
                <option value="veh-002">2024 Changan Deepal S07 Luxury EV (₦54.0M)</option>
                <option value="lc300">2024 Toyota Land Cruiser 300 VXR (₦185.0M)</option>
              </select>

              <button
                type="button"
                onClick={handleTriggerMarkSold}
                disabled={isDelisting}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#eaff00] hover:bg-[#bbcc03] text-black font-mono font-bold text-xs rounded-sm transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDelisting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Broadcasting Unpublish to 7 Platforms...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} />
                    Execute "Mark Sold" Universal Delist
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Success Banner if recently dispatched */}
          <AnimatePresence>
            {lastDelistSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0a200a] border border-[#eaff00]/50 p-4 rounded-sm flex items-start gap-3"
              >
                <CheckCircle2 size={20} className="text-[#eaff00] shrink-0 mt-0.5" />
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{lastDelistSuccess.vehicleTitle}</span>
                    <span className="px-1.5 py-0.2 bg-[#eaff00] text-black font-bold text-[10px] rounded-xs">
                      DELIST DISPATCH COMPLETE
                    </span>
                  </div>
                  <p className="text-[#b3b3b3]">
                    Successfully communicated with 7 channels. All listings retired from public view in an average of 290 ms.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Delist Audit Logs Table */}
          <div className="bg-[#0f0f0f] border border-[#262626] rounded-sm p-5 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase text-[#808080]">
              Source of Truth Delist Audit Log
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-[#333333] text-[#808080] uppercase">
                    <th className="py-2 px-3">Timestamp</th>
                    <th className="py-2 px-3">Vehicle</th>
                    <th className="py-2 px-3">Trigger Event</th>
                    <th className="py-2 px-3">Platforms Contacted</th>
                    <th className="py-2 px-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f1f]">
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="py-2.5 px-3 text-[#b3b3b3]">{log.timestamp}</td>
                      <td className="py-2.5 px-3 text-white font-bold">{log.vehicleTitle}</td>
                      <td className="py-2.5 px-3 text-[#eaff00]">{log.triggerEvent}</td>
                      <td className="py-2.5 px-3 text-[#b3b3b3]">
                        {log.totalPlatformsDelisted} Channels (Jiji, C45, Achk, FB, TT, etc.)
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="px-2 py-0.5 bg-green-950 text-green-400 border border-green-800 rounded-xs text-[10px] font-bold">
                          100% RETIRED
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UNIFIED CRM INBOX */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold uppercase text-white">
              Aggregated Inquiries from All Connected Channels
            </h3>
            <span className="text-xs font-mono text-[#eaff00]">
              Auto-synced via Webhooks & Meta Graph
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-[#0f0f0f] border border-[#262626] p-4 rounded-sm space-y-3 font-mono"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{lead.leadName}</span>
                      <span className="px-1.5 py-0.2 bg-[#262626] text-[#eaff00] text-[10px] rounded-xs uppercase">
                        via {lead.platform}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#808080]">{lead.phone}</span>
                  </div>
                  <span className="text-[10px] text-[#808080]">{lead.timestamp}</span>
                </div>

                <div className="text-xs text-[#b3b3b3] bg-[#141414] p-2.5 rounded-xs border border-[#1f1f1f]">
                  "{lead.inquiryMessage}"
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#808080] truncate max-w-[200px]">
                    Vehicle: {lead.vehicleTitle}
                  </span>
                  <a
                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#eaff00] hover:underline font-bold"
                  >
                    Reply via WhatsApp <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: API & WEBHOOK WORKERS (PYTHON & GOOGLE APPS SCRIPT) */}
      {activeTab === 'scripts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-mono font-bold uppercase text-white">
                Enterprise Integration Code Templates
              </h3>
              <p className="text-xs text-[#b3b3b3]">
                Production-ready ingestion workers for dealership IT engineers and system administrators.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedScript('python')}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-sm cursor-pointer transition-colors ${
                  selectedScript === 'python' ? 'bg-[#eaff00] text-black' : 'bg-[#141414] text-[#b3b3b3]'
                }`}
              >
                Python Worker (FastAPI/Celery)
              </button>
              <button
                type="button"
                onClick={() => setSelectedScript('gas')}
                className={`px-3 py-1 text-xs font-mono font-bold rounded-sm cursor-pointer transition-colors ${
                  selectedScript === 'gas' ? 'bg-[#eaff00] text-black' : 'bg-[#141414] text-[#b3b3b3]'
                }`}
              >
                Google Apps Script (Email Parser)
              </button>
            </div>
          </div>

          <div className="relative bg-[#0d0d0d] border border-[#262626] rounded-sm p-4 overflow-hidden">
            <button
              type="button"
              onClick={() =>
                copyScriptToClipboard(
                  selectedScript === 'python'
                    ? ENTERPRISE_INGESTION_SCRIPTS.pythonScript
                    : ENTERPRISE_INGESTION_SCRIPTS.googleAppsScript
                )
              }
              className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1f1f1f] hover:bg-[#262626] text-xs font-mono text-white rounded-xs border border-[#333333] cursor-pointer"
            >
              {copiedCode ? <Check size={12} className="text-[#eaff00]" /> : <Copy size={12} />}
              {copiedCode ? 'Copied' : 'Copy Code'}
            </button>

            <pre className="text-xs font-mono text-[#b3b3b3] overflow-x-auto p-2 leading-relaxed">
              <code>
                {selectedScript === 'python'
                  ? ENTERPRISE_INGESTION_SCRIPTS.pythonScript
                  : ENTERPRISE_INGESTION_SCRIPTS.googleAppsScript}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
