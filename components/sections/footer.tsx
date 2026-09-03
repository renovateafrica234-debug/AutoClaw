import React from 'react';
import { Car, Twitter, Linkedin, Github, Mail, MapPin, Shield, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#04060e] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Col 1 & 2: Brand & Abuja Focus */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-md shadow-violet-600/30">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight">
                  AUTOCLAW
                </span>
                <span className="block text-[10px] text-violet-400 tracking-widest uppercase">
                  SALES ENGINE & FUNNEL
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              The autonomous AI sales stack powering premium automotive dealerships across Abuja, FCT. Instant BullMQ worker swarms, multi-channel syndication, and high-converting WhatsApp lead intelligence.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Abuja Hub: Central Business District • Maitama • Wuse 2</span>
            </div>

            {/* Social Icons (Twitter, LinkedIn, GitHub, Mail) */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/renovateafrica234-debug/renovate-car-brain"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:dealers@autoclaw.ng"
                aria-label="Mail"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Product */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Product</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inventory-dashboard" className="hover:text-violet-400 transition-colors">
                  Inventory Dashboard
                </a>
              </li>
              <li>
                <a href="#agent-swarm-section" className="hover:text-violet-400 transition-colors">
                  BullMQ Agent Swarm
                </a>
              </li>
              <li>
                <a href="#whatsapp-procurement-section" className="hover:text-violet-400 transition-colors">
                  WhatsApp Dealership Bot
                </a>
              </li>
              <li>
                <a href="#onboarding-section" className="hover:text-violet-400 transition-colors">
                  Onboarding Wizard
                </a>
              </li>
              <li>
                <a href="#inventory-dashboard" className="hover:text-violet-400 transition-colors">
                  Jiji & Cars45 Syndication
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-violet-400 transition-colors">
                  About AutoClaw
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-violet-400 transition-colors">
                  Abuja Showroom Partners
                </a>
              </li>
              <li>
                <a href="#hero" className="hover:text-violet-400 transition-colors">
                  Dealership Case Studies
                </a>
              </li>
              <li>
                <a href="mailto:careers@autoclaw.ng" className="hover:text-violet-400 transition-colors">
                  Careers <span className="text-[10px] text-emerald-400">We're hiring</span>
                </a>
              </li>
              <li>
                <a href="mailto:press@autoclaw.ng" className="hover:text-violet-400 transition-colors">
                  Press & Media
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Legal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">Legal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#legal" className="hover:text-violet-400 transition-colors">
                  Customs Verification Terms
                </a>
              </li>
              <li>
                <a href="#legal" className="hover:text-violet-400 transition-colors">
                  Escrow Security Policy
                </a>
              </li>
              <li>
                <a href="#legal" className="hover:text-violet-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#legal" className="hover:text-violet-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#legal" className="hover:text-violet-400 transition-colors">
                  SLA for Abuja Dealers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: © 2026 AUTOCLAW. Built for Abuja's dealers. */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500">
            © 2026 AUTOCLAW. Built for Abuja's dealers.
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Server Time: 2026-09-02 (GMT+1)</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              All Swarms Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
