import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  PenTool,
  Target,
  Radio,
  Shield,
  Activity,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  RefreshCw,
  Zap,
  Server,
  AlertTriangle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AgentWorker } from '@/types';

const INITIAL_AGENT_WORKERS: AgentWorker[] = [
  {
    id: 'agent-pricing',
    name: 'Pricing Agent',
    iconName: 'Brain',
    status: 'active',
    queueDepth: 12,
    maxQueue: 25,
    lastProcessed: '14s ago',
    description: 'Calculates dynamic Nigerian market prices, customs duty amortizations, and Tokunbo depreciation curves.',
    throughput: '42 jobs/min',
    errorRate: '0.02%',
    workerPID: 4182,
  },
  {
    id: 'agent-desc',
    name: 'Description Agent',
    iconName: 'PenTool',
    status: 'processing',
    queueDepth: 8,
    maxQueue: 20,
    lastProcessed: '3s ago',
    description: 'Generates high-converting WhatsApp sales scripts and specs tailored to Abuja civil servants and executives.',
    throughput: '38 jobs/min',
    errorRate: '0.00%',
    workerPID: 4183,
  },
  {
    id: 'agent-lead',
    name: 'Lead Agent',
    iconName: 'Target',
    status: 'active',
    queueDepth: 24,
    maxQueue: 50,
    lastProcessed: '8s ago',
    description: 'Scrapes, enriches, and scores inbound inquiries from Jiji, WhatsApp Business, and Instagram DMs.',
    throughput: '89 jobs/min',
    errorRate: '0.05%',
    workerPID: 4184,
  },
  {
    id: 'agent-syndication',
    name: 'Syndication Agent',
    iconName: 'Radio',
    status: 'processing',
    queueDepth: 6,
    maxQueue: 15,
    lastProcessed: ' Just now',
    description: 'Pushes inventory and real-time price updates simultaneously across Facebook Marketplace, Jiji, and Cars45.',
    throughput: '22 jobs/min',
    errorRate: '0.01%',
    workerPID: 4185,
  },
  {
    id: 'agent-fraud',
    name: 'Fraud Agent',
    iconName: 'Shield',
    status: 'idle',
    queueDepth: 0,
    maxQueue: 10,
    lastProcessed: '4m ago',
    description: 'Inspects VIN records, customs duty papers, and stolen vehicle registry flags to protect dealer escrow.',
    throughput: '15 jobs/min',
    errorRate: '0.00%',
    workerPID: 4186,
  },
  {
    id: 'agent-market',
    name: 'Market Agent',
    iconName: 'Activity',
    status: 'active',
    queueDepth: 3,
    maxQueue: 12,
    lastProcessed: '22s ago',
    description: 'Monitors fuel price shifts (PMS ₦1,120/L benchmark), FX rates, and federal procurement vehicle tenders.',
    throughput: '31 jobs/min',
    errorRate: '0.01%',
    workerPID: 4187,
  },
];

export const AgentSwarm: React.FC = () => {
  const [agents, setAgents] = useState<AgentWorker[]>(INITIAL_AGENT_WORKERS);
  const [expandedAgentId, setExpandedAgentId] = useState<string | null>('agent-pricing');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Stats row computations
  const activeAgentsCount = agents.filter((a) => a.status === 'active').length;
  const processingCount = agents.filter((a) => a.status === 'processing').length;
  const totalQueueDepth = agents.reduce((acc, a) => acc + a.queueDepth, 0);

  const toggleExpand = (id: string) => {
    setExpandedAgentId((prev) => (prev === id ? null : id));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return Brain;
      case 'PenTool':
        return PenTool;
      case 'Target':
        return Target;
      case 'Radio':
        return Radio;
      case 'Shield':
        return Shield;
      case 'Activity':
      default:
        return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return {
          dot: 'bg-emerald-400',
          badge: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
          label: 'Active',
        };
      case 'processing':
        return {
          dot: 'bg-amber-400 animate-pulse',
          badge: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
          label: 'Processing',
        };
      case 'idle':
      default:
        return {
          dot: 'bg-slate-500',
          badge: 'bg-slate-800 text-slate-400 border-slate-700',
          label: 'Idle',
        };
    }
  };

  const triggerManualCycle = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((agent) => {
          if (agent.id === 'agent-fraud') {
            return { ...agent, status: 'active', queueDepth: 1, lastProcessed: 'Just now' };
          }
          const delta = Math.floor(Math.random() * 3) - 1;
          const newQ = Math.max(0, agent.queueDepth + delta);
          return {
            ...agent,
            queueDepth: newQ,
            lastProcessed: 'Just now',
          };
        })
      );
      setIsSimulating(false);
    }, 600);
  };

  return (
    <section id="agent-swarm-section" className="py-16 sm:py-20 bg-[#080b18] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with BullMQ Badge & Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono mb-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Cpu className="w-3.5 h-3.5 text-violet-400" />
              6 BullMQ Workers Active
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight">
              Agent Swarm Status
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Autonomous microservices running concurrently on Redis BullMQ pipelines. Real-time telemetry below.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              id="swarm-simulate-btn"
              onClick={triggerManualCycle}
              disabled={isSimulating}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-violet-400 ${isSimulating ? 'animate-spin' : ''}`} />
              Poll Queues
            </button>
          </div>
        </div>

        {/* STATS ROW (Active Agents, Processing Now, Queue Depth) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-900/70 border-slate-800/80 p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Active Agents
              </span>
              <div className="text-3xl font-black text-white font-['Cabinet_Grotesk',sans-serif] mt-1">
                {activeAgentsCount} <span className="text-sm font-mono text-slate-500 font-normal">/ 6 workers</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/80 p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Processing Now
              </span>
              <div className="text-3xl font-black text-amber-300 font-['Cabinet_Grotesk',sans-serif] mt-1">
                {processingCount} <span className="text-sm font-mono text-slate-500 font-normal">in flight</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
          </Card>

          <Card className="bg-slate-900/70 border-slate-800/80 p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                Total Queue Depth
              </span>
              <div className="text-3xl font-black text-violet-300 font-['Cabinet_Grotesk',sans-serif] mt-1">
                {totalQueueDepth} <span className="text-sm font-mono text-slate-500 font-normal">tasks queued</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Layers className="w-5 h-5" />
            </div>
          </Card>
        </div>

        {/* 6 AGENT CARDS IN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent) => {
            const Icon = getIcon(agent.iconName);
            const statusMeta = getStatusColor(agent.status);
            const isExpanded = expandedAgentId === agent.id;
            const maxQueue = agent.maxQueue || 30;
            const queuePercent = Math.min(100, Math.round((agent.queueDepth / maxQueue) * 100));

            return (
              <Card
                key={agent.id}
                className={`bg-slate-900/80 border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-violet-500/60 shadow-lg shadow-violet-950/40 bg-slate-900'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  id={`agent-card-${agent.id}`}
                  onClick={() => toggleExpand(agent.id)}
                  className="p-5 cursor-pointer select-none"
                >
                  {/* Top Row: Icon + Status Dot & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-950/50 border border-violet-500/30 flex items-center justify-center text-violet-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base font-['Cabinet_Grotesk',sans-serif]">
                          {agent.name}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400">
                          PID: #{agent.workerPID}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge + Dot (green/amber/grey) */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${statusMeta.badge}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${statusMeta.dot}`} />
                        {statusMeta.label}
                      </span>
                      <button
                        type="button"
                        aria-label="Expand details"
                        className="text-slate-400 hover:text-white"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 font-mono leading-relaxed mb-4">
                    {agent.description}
                  </p>

                  {/* Queue Depth & Last Processed Time */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Queue Depth</span>
                      <span className="font-bold text-white text-sm">
                        {agent.queueDepth} jobs
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase block">Last Processed</span>
                      <span className="text-violet-300 font-semibold">{agent.lastProcessed}</span>
                    </div>
                  </div>
                </div>

                {/* Click to expand shows: queue depth bar, throughput, error rate, worker PID */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-slate-800/80 bg-slate-950/60 p-5 space-y-3.5 text-xs font-mono"
                    >
                      {/* Queue Depth Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                          <span>Queue Capacity Utilization</span>
                          <span className="text-white font-bold">{queuePercent}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-300"
                            style={{ width: `${Math.max(4, queuePercent)}%` }}
                          />
                        </div>
                      </div>

                      {/* Throughput, Error Rate, Worker PID */}
                      <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="text-[9px] text-slate-500 uppercase block">Throughput</span>
                          <span className="text-white font-bold">{agent.throughput}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="text-[9px] text-slate-500 uppercase block">Error Rate</span>
                          <span className="text-emerald-400 font-bold">{agent.errorRate}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          <span className="text-[9px] text-slate-500 uppercase block">Worker PID</span>
                          <span className="text-violet-300 font-bold">PID-{agent.workerPID}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
