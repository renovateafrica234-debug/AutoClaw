import React from 'react';
import { Layers, Target, Activity, Shield, ArrowRight, Cpu, Radio } from 'lucide-react';

interface AgentSwarmSectionProps {
  onInspectAgent: (agentId: string) => void;
}

export function AgentSwarmSection({ onInspectAgent }: AgentSwarmSectionProps) {
  const agents = [
    {
      id: 'agent-01',
      number: 'AGENT 01',
      title: 'Omnichannel Sync Engine',
      badge: 'Active • 7 Platforms • <180ms latency',
      status: 'ACTIVE',
      latency: '<140ms',
      icon: Layers,
      description:
        'Continuous 2-way syndication across Jiji, Cars45, Autochek, Carmart, BuyCars.ng, Facebook Marketplace, and TikTok Showroom. Triggers universal delist in <800ms upon deposit lock.',
      metricLabel: 'NETWORK PING',
      metricValue: '132ms',
    },
    {
      id: 'agent-02',
      number: 'AGENT 02',
      title: 'Lead Routing & CRM Agent',
      badge: 'Active • WhatsApp Auto-Closer',
      status: 'ACTIVE',
      latency: '<0.4s response',
      icon: Target,
      description:
        'Sub-second WhatsApp automated sales closer answering pricing inquiries, scheduling physical showroom test drives, and deflecting low-intent queries 24/7.',
      metricLabel: 'LEAD CONVERSIONS',
      metricValue: '+37% Lift',
    },
    {
      id: 'agent-03',
      number: 'AGENT 03',
      title: 'Valuation & Price Optimizer',
      badge: 'Active • Abuja & Lagos Live Auctions',
      status: 'ACTIVE',
      latency: 'Real-time',
      icon: Activity,
      description:
        'Dynamic market pricing engine calibrated against wholesale trade-in auction settlements and retail closing figures across Abuja CBD, Maitama, and Lagos.',
      metricLabel: 'ACTIVE PRICE NODES',
      metricValue: '4,280 Daily',
    },
    {
      id: 'agent-04',
      number: 'AGENT 04',
      title: 'Fraud & Escrow Shield',
      badge: 'Secure • NCS C-Number Audit Verified',
      status: 'SECURE',
      latency: 'Instant',
      icon: Shield,
      description:
        'Automated Nigerian Customs Service SGD C-Number verification, title provenance audit, and encrypted deposit escrow hold preventing broker theft.',
      metricLabel: 'CUSTOMS AUDIT',
      metricValue: '100% C-Number Match',
    },
  ];

  return (
    <section id="agent-swarm-section" className="w-full flex flex-col gap-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-zinc-800/80">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Four Concurrent Real-Time Intelligence Engines
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal">
          Autonomous multi-threaded infrastructure powering syndication, lead conversion, valuation, and provenance.
        </p>
      </div>

      {/* 4 Kinetic Engine Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.id}
              onClick={() => onInspectAgent(agent.id)}
              className="bg-[#121217] border-t border-zinc-700/50 border-x-zinc-800/40 border-b-zinc-900 rounded-xl p-5 flex flex-col justify-between hover:border-t-[#E3FF00] hover:shadow-[0_0_25px_rgba(227,255,0,0.12)] transition-all cursor-pointer text-left shadow-xl shadow-black/60 group"
            >
              <div>
                {/* Card Topline */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold">
                    {agent.number}
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-900/90 border border-zinc-800 text-[10px] uppercase tracking-wider font-bold text-[#E3FF00] rounded">
                    {agent.badge}
                  </span>
                </div>

                {/* Engine Title */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded-lg bg-black border border-zinc-800 group-hover:border-[#E3FF00]/50 transition-colors">
                    <Icon size={18} className="text-[#E3FF00]" />
                  </div>
                  <h4 className="text-base font-extrabold text-white tracking-tight">
                    {agent.title}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed mb-4 font-normal">
                  {agent.description}
                </p>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
                <span>
                  {agent.metricLabel}: <span className="text-zinc-200 font-bold">{agent.metricValue}</span>
                </span>
                <span className="text-[#E3FF00] font-bold group-hover:translate-x-0.5 transition-transform">
                  INSPECT LOGS →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
