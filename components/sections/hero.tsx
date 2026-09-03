import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  Zap,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Cpu,
  Layers,
  BatteryCharging,
  Gauge,
  FileCheck,
  Building2,
  DollarSign,
  Share2,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DealerType } from '@/types';

interface HeroProps {
  userType: DealerType;
  setUserType: (type: DealerType) => void;
  onGetStarted: () => void;
  onExploreSwarm?: () => void;
  onOpenWelcomeScreen?: () => void;
}

interface SlideData {
  id: string;
  category: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  vehicleName: string;
  vehiclePrice: string;
  vehicleSpec: string;
  imageUrl: string;
  accentColor: string;
  specs: { label: string; value: string }[];
  solutionHighlight: {
    icon: any;
    title: string;
    description: string;
  };
}

const SLIDES: SlideData[] = [
  {
    id: 'new-cars',
    category: 'NEW CARS & LUXURY',
    badge: 'Flagship Luxury • Full Customs Cleared',
    title: 'Sell Premium & Tokunbo Cars',
    titleHighlight: '9x Faster',
    subtitle:
      'Abuja’s #1 high-status inventory engine. Instant Nigerian market price parity, customs duty paper verification, and automated multi-channel syndication to Jiji and Cars45.',
    vehicleName: '2024 Toyota Land Cruiser 300 VXR',
    vehiclePrice: '₦185,000,000',
    vehicleSpec: 'Twin-Turbo 3.5L V6 • 409 HP • 10-Speed Auto • 4WD',
    imageUrl: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'from-violet-500 to-indigo-500',
    specs: [
      { label: 'Transmission', value: '10-Speed Direct-Shift' },
      { label: 'Customs Duty', value: '100% Fully Cleared' },
      { label: 'Abuja Market Demand', value: 'Extreme (Grade A)' },
      { label: 'VIP Suitability', value: 'Maitama / National Assembly' },
    ],
    solutionHighlight: {
      icon: Share2,
      title: 'One-Click Syndication Solution',
      description: 'Pushes inventory and real-time prices concurrently to Jiji, Cars45, Instagram, and WhatsApp catalog.',
    },
  },
  {
    id: 'new-evs',
    category: 'NEW EVS & CLEAN MOBILITY',
    badge: '0% Federal Duty Exemption • PMS Fuel Hedge',
    title: 'Navigate the Clean EV Frontier',
    titleHighlight: 'with Zero Duty',
    subtitle:
      'In an era of ₦1,120/L petrol, electric vehicles save Abuja drivers over ₦4.8M annually. AutoClaw integrates battery health telemetry, EV import exemptions, and Abuja solar charger mapping.',
    vehicleName: '2024 BYD Song Plus EV Flagship',
    vehiclePrice: '₦42,500,000',
    vehicleSpec: '82 kWh Blade Battery • 520 km Range • 0-100 km/h in 7.9s',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'from-emerald-500 to-teal-500',
    specs: [
      { label: 'Range', value: '520 km / Single Charge' },
      { label: 'Import Duty', value: '0% Clean Energy Scheme' },
      { label: 'Fuel Savings', value: '₦4,800,000 / Year' },
      { label: 'Charging Infra', value: 'Solar Fast-Charge Compatible' },
    ],
    solutionHighlight: {
      icon: BatteryCharging,
      title: 'EV Transition Calculator Solution',
      description: 'Calculates total cost of ownership vs PMS petrol, proving massive return for commercial & private buyers.',
    },
  },
  {
    id: 'our-solutions',
    category: 'AUTONOMOUS WORKER ENGINE',
    badge: '6-Worker BullMQ Swarm • Redis Pipelines',
    title: 'Autonomous Swarm Solves',
    titleHighlight: 'Every Bottleneck',
    subtitle:
      'Eliminate manual dealership labor. 6 microservice workers run 24/7 in the background: calculating dynamic market prices, writing high-converting WhatsApp sales scripts, and preventing stolen car fraud.',
    vehicleName: 'AutoClaw Swarm Engine Core',
    vehiclePrice: '6 BullMQ Workers Active',
    vehicleSpec: 'Pricing • Copywriting • Lead Scraper • Syndication • Fraud • Market',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'from-purple-500 to-violet-500',
    specs: [
      { label: 'Worker Throughput', value: '237 jobs / min total' },
      { label: 'Queue Architecture', value: 'Redis BullMQ' },
      { label: 'Error Rate', value: '< 0.02% across nodes' },
      { label: 'Procurement Matching', value: 'Sub-second speed' },
    ],
    solutionHighlight: {
      icon: Cpu,
      title: 'Autonomous Swarm Solution',
      description: 'Automates pricing, lead scoring, description copywriting, and escrow validation without manual intervention.',
    },
  },
  {
    id: 'diplomatic-fleet',
    category: 'GOVERNMENT & DIPLOMATIC FLEETS',
    badge: 'BPP Federal Gazette • Maitama Chancery Protocol',
    title: 'Direct Institutional Procurement',
    titleHighlight: 'Radar & Tenders',
    subtitle:
      'AutoClaw scrubs public tenders from Federal Ministries, ECOWAS, Embassies, and UN agencies, routing high-budget vehicle procurement requests directly to your WhatsApp Business inbox.',
    vehicleName: '2024 Mercedes-Benz S 580 4MATIC',
    vehiclePrice: '₦240,000,000',
    vehicleSpec: 'Executive Chancery Spec • Armored B6 Rated • Diplomatic Duty-Free',
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
    accentColor: 'from-blue-500 to-indigo-500',
    specs: [
      { label: 'Tender Source', value: 'BPP Federal Procurement' },
      { label: 'Protocol', value: 'Diplomatic Duty-Free Exemption' },
      { label: 'Payment Term', value: 'Verified Escrow Guarantee' },
      { label: 'Lead Delivery', value: 'Direct to Dealer WhatsApp' },
    ],
    solutionHighlight: {
      icon: Building2,
      title: 'Institutional Procurement Pipeline',
      description: 'Connects verified multi-vehicle ministerial and diplomatic buyers directly with your lot stock.',
    },
  },
];

export const Hero: React.FC<HeroProps> = ({
  userType,
  setUserType,
  onGetStarted,
  onExploreSwarm,
  onOpenWelcomeScreen,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentSlide = SLIDES[currentSlideIndex];

  // Auto-advance timer (6 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-[#060813] pt-6 pb-16 sm:pb-20"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b12_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b12_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status & Role Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Now Serving Abuja Dealerships
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Central Area • Maitama • Wuse 2 • Garki</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Mode:</span>
            <button
              type="button"
              onClick={() => setUserType(userType === 'dealer' ? 'private' : 'dealer')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-violet-500/30 text-xs font-mono text-violet-300 hover:text-white transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              {userType === 'dealer' ? 'Licensed Dealership' : 'Private Seller'}
              <span className="text-[10px] text-slate-500 ml-1 underline">Switch</span>
            </button>

            {onOpenWelcomeScreen && (
              <button
                type="button"
                onClick={onOpenWelcomeScreen}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-200 px-2 py-1 rounded bg-slate-950 border border-slate-800"
              >
                Welcome Gate
              </button>
            )}
          </div>
        </div>

        {/* MOTION GRAPHICS SLIDER CONTAINER */}
        <div className="relative rounded-3xl bg-slate-950/80 border border-slate-800/90 overflow-hidden shadow-2xl shadow-violet-950/20 backdrop-blur-xl">
          {/* Progress Bar for Auto-play */}
          <div className="w-full h-1 bg-slate-900 overflow-hidden relative">
            <motion.div
              key={currentSlideIndex}
              initial={{ width: '0%' }}
              animate={{ width: isPaused ? '100%' : '100%' }}
              transition={{ duration: isPaused ? 0 : 6, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-emerald-400"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="p-6 sm:p-10 lg:p-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Headlines & Solutions (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Category Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-mono text-violet-300">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    <span>{currentSlide.category}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-400">{currentSlide.badge}</span>
                  </div>

                  {/* High-Impact Headline */}
                  <div>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight leading-[1.08]">
                      {currentSlide.title}{' '}
                      <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-emerald-300 bg-clip-text text-transparent">
                        {currentSlide.titleHighlight}
                      </span>
                    </h1>
                    <p className="mt-4 text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl">
                      {currentSlide.subtitle}
                    </p>
                  </div>

                  {/* Solution Highlight Box */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0">
                      <currentSlide.solutionHighlight.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {currentSlide.solutionHighlight.title}
                      </div>
                      <p className="text-xs text-slate-300 font-mono mt-0.5 leading-normal">
                        {currentSlide.solutionHighlight.description}
                      </p>
                    </div>
                  </div>

                  {/* Slide-specific Telemetry Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    {currentSlide.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-left"
                      >
                        <span className="text-[10px] font-mono uppercase text-slate-500 block">
                          {spec.label}
                        </span>
                        <span className="text-xs font-mono font-bold text-white block mt-0.5 truncate">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      id="hero-slider-get-started"
                      variant="glow"
                      size="md"
                      onClick={onGetStarted}
                      className="font-mono font-bold uppercase tracking-wider text-xs px-6 py-3"
                    >
                      <ArrowRight className="w-4 h-4" />
                      Get Started Free
                    </Button>

                    {onExploreSwarm && (
                      <Button
                        id="hero-slider-explore-swarm"
                        variant="outline"
                        size="md"
                        onClick={onExploreSwarm}
                        className="text-slate-300 hover:text-white font-mono text-xs"
                      >
                        <Cpu className="w-3.5 h-3.5 text-violet-400" />
                        Inspect BullMQ Swarm (6)
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Column: Motion Graphics Vehicle Showcase Card (5 Cols) */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group shadow-lg">
                    {/* Vehicle Image with cinematic overlay */}
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                      <img
                        src={currentSlide.imageUrl}
                        alt={currentSlide.vehicleName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-950/80 text-violet-300 border border-violet-500/30 backdrop-blur-md">
                          {currentSlide.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Verified
                        </span>
                      </div>

                      {/* Bottom Image Overlay Details */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">
                          Featured Showcase
                        </span>
                        <div className="text-lg font-black text-white font-['Cabinet_Grotesk',sans-serif]">
                          {currentSlide.vehicleName}
                        </div>
                      </div>
                    </div>

                    {/* HUD Footer of vehicle card */}
                    <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">
                          Abuja Valuation
                        </span>
                        <span className="text-base font-black text-emerald-400 font-['Cabinet_Grotesk',sans-serif]">
                          {currentSlide.vehiclePrice}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase block">
                          Architecture
                        </span>
                        <span className="text-violet-300 text-[11px] font-semibold truncate max-w-[150px] inline-block">
                          {currentSlide.vehicleSpec.split('•')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* SLIDER CONTROLS & NAVIGATION FOOTER */}
          <div className="p-4 sm:px-8 bg-slate-950/90 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            {/* Slide Selection Buttons / Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {SLIDES.map((slide, index) => {
                const isActive = currentSlideIndex === index;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap text-left flex items-center gap-2 ${
                      isActive
                        ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-white' : 'bg-slate-600'
                      }`}
                    />
                    <span>{`0${index + 1} ${slide.id.replace('-', ' ').toUpperCase()}`}</span>
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Slide"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 HIGH-CONVERSION STATS CARDS BENEATH SLIDER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
          <Card className="bg-slate-900/60 border-slate-800/80 p-5 text-center transition-all duration-200">
            <div className="w-10 h-10 mx-auto rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
              9x
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-violet-400 mt-1">
              Faster Buyer Closing
            </div>
            <p className="text-xs text-slate-400 mt-1.5 leading-snug">
              Customized WhatsApp sales pitches tailored to Abuja civil servants & VIPs.
            </p>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800/80 p-5 text-center transition-all duration-200">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
              37%
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 mt-1">
              More Trade-in Volume
            </div>
            <p className="text-xs text-slate-400 mt-1.5 leading-snug">
              Instant algorithmic valuations on Nigerian-used & clean Tokunbo cars.
            </p>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800/80 p-5 text-center transition-all duration-200">
            <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-['Cabinet_Grotesk',sans-serif]">
              10x
            </div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 mt-1">
              Dealership ROI
            </div>
            <p className="text-xs text-slate-400 mt-1.5 leading-snug">
              Automated 24/7 syndication and BPP institutional tender matching.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
