import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Smile,
  Cpu,
  Target,
  Database,
  Globe,
  Check,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Layers,
  Building,
  Radio,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface OnboardingProps {
  onComplete: (data: any) => void;
  onJumpToDashboard?: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({
  onComplete,
  onJumpToDashboard,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Primary Goal
  const [selectedGoal, setSelectedGoal] = useState<string>('increase_leads');

  // Step 2: Dealership Size
  const [dealershipSize, setDealershipSize] = useState<string>('6-20');

  // Step 3: Brands Sold (multiple selection)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    'Toyota',
    'Lexus',
    'Mercedes',
    'Honda',
  ]);

  // Step 4: Current Platforms (multiple selection)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    'WhatsApp',
    'Instagram',
    'Jiji.ng',
  ]);

  const totalSteps = 4;
  const progressPercent = (currentStep / totalSteps) * 100;

  const goals = [
    {
      id: 'improve_close_rate',
      title: 'Improve Close Rate',
      desc: 'Close hesitant buyers faster with automated Nigerian vehicle objection busters.',
      icon: TrendingUp,
    },
    {
      id: 'better_experience',
      title: 'Better Experience',
      desc: 'Deliver modern digital luxury buying experience for Abuja VIPs and executives.',
      icon: Smile,
    },
    {
      id: 'digital_process',
      title: 'Digital Process',
      desc: 'Digitize paper agreements, gate passes, vehicle history, and customs verification.',
      icon: Cpu,
    },
    {
      id: 'increase_leads',
      title: 'Increase Leads',
      desc: 'Scrub high-intent buyers from Facebook, Instagram, Jiji, and diplomatic procurement.',
      icon: Target,
    },
    {
      id: 'cleaner_data',
      title: 'Cleaner Data',
      desc: 'Unified single-source inventory data across lot locations and sales staff.',
      icon: Database,
    },
    {
      id: 'online_presence',
      title: 'Online Presence',
      desc: 'Establish dominant search and social footprint with auto-syndication.',
      icon: Globe,
    },
  ];

  const dealershipSizes = [
    { id: '1-5', label: '1 - 5 Vehicles', sub: 'Boutique lot or specialized private broker' },
    { id: '6-20', label: '6 - 20 Vehicles', sub: 'Growing Abuja auto lot in Wuse 2 or Garki' },
    { id: '20-50', label: '20 - 50 Vehicles', sub: 'Established multi-lot dealer in Central Area' },
    { id: '50+', label: '50+ Vehicles', sub: 'Enterprise dealership with fleet and VIP imports' },
  ];

  const brandOptions = [
    'Toyota',
    'Honda',
    'Lexus',
    'Mercedes',
    'BMW',
    'Hyundai',
    'Kia',
    'Nissan',
    'Ford',
    'VW',
    'Audi',
    'Other',
  ];

  const platformOptions = [
    'WhatsApp',
    'Instagram',
    'Facebook',
    'Jiji.ng',
    'Cars45',
    'Excel',
    'None',
  ];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const togglePlatform = (platform: string) => {
    if (platform === 'None') {
      setSelectedPlatforms(['None']);
      return;
    }
    setSelectedPlatforms((prev) => {
      const filtered = prev.filter((p) => p !== 'None');
      return filtered.includes(platform)
        ? filtered.filter((p) => p !== platform)
        : [...filtered, platform];
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const payload = {
        goal: selectedGoal,
        dealershipSize,
        brands: selectedBrands,
        platforms: selectedPlatforms,
      };
      onComplete(payload);
      if (onJumpToDashboard) {
        onJumpToDashboard();
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <section id="onboarding-section" className="py-16 sm:py-20 bg-[#080b18] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono font-medium mb-3">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            DEALERSHIP INITIALIZATION
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight">
            Configure Your Autonomous Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-2 font-mono">
            Answer 4 quick prompts to tailor AutoClaw swarm agents to your Abuja dealership inventory.
          </p>
        </div>

        {/* Wizard Card */}
        <Card className="border-violet-500/20 bg-slate-900/80 shadow-2xl relative overflow-hidden">
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-1.5 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 h-full"
              initial={{ width: '25%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-violet-600/30 border border-violet-500/40 text-violet-300 flex items-center justify-center font-mono font-bold text-xs">
                  0{currentStep}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-medium">
                {currentStep === 1 && 'Primary Objective'}
                {currentStep === 2 && 'Fleet Footprint'}
                {currentStep === 3 && 'Brand Portfolio'}
                {currentStep === 4 && 'Current Stack'}
              </span>
            </div>
          </CardHeader>

          <CardContent className="pt-2 pb-6 min-h-[360px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {/* STEP 1: Primary Goal */}
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                      What is your dealership's primary goal right now?
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Select the highest-impact metric you want AutoClaw to optimize.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {goals.map((g) => {
                      const Icon = g.icon;
                      const isSelected = selectedGoal === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          id={`goal-option-${g.id}`}
                          onClick={() => setSelectedGoal(g.id)}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                            isSelected
                              ? 'bg-violet-950/50 border-violet-500 shadow-md shadow-violet-950/50'
                              : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full mb-2">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                isSelected
                                  ? 'bg-violet-600 text-white'
                                  : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-violet-500 text-white flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-xs sm:text-sm text-white font-['Cabinet_Grotesk',sans-serif]">
                              {g.title}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                              {g.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Dealership Size */}
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                      How many vehicles are currently in your lot or inventory?
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      This determines the BullMQ worker concurrency allocation for your showroom.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {dealershipSizes.map((size) => {
                      const isSelected = dealershipSize === size.id;
                      return (
                        <button
                          key={size.id}
                          type="button"
                          id={`size-option-${size.id}`}
                          onClick={() => setDealershipSize(size.id)}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'bg-violet-950/60 border-violet-500 shadow-md shadow-violet-950/50'
                              : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold font-mono text-sm ${
                              isSelected
                                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            <Building className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm text-white font-['Cabinet_Grotesk',sans-serif]">
                                {size.label}
                              </span>
                              {isSelected && (
                                <span className="w-2 h-2 rounded-full bg-violet-400" />
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{size.sub}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Brands Sold */}
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                      Which automotive brands do you sell or trade?
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Select all that apply. AutoClaw loads tailored spec data and market pricing curves for these.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {brandOptions.map((brand) => {
                      const isSelected = selectedBrands.includes(brand);
                      return (
                        <button
                          key={brand}
                          type="button"
                          id={`brand-pill-${brand.toLowerCase()}`}
                          onClick={() => toggleBrand(brand)}
                          className={`px-4 py-2.5 rounded-full text-xs font-mono font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-violet-600 text-white border border-violet-400 shadow-md shadow-violet-600/25'
                              : 'bg-slate-800/70 text-slate-300 border border-slate-700 hover:border-slate-600 hover:text-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          <span>{brand}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 text-xs font-mono text-slate-500">
                    Selected ({selectedBrands.length}): {selectedBrands.join(', ') || 'None selected'}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Current Platforms */}
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="mb-2">
                    <h3 className="text-lg font-bold text-white font-['Cabinet_Grotesk',sans-serif]">
                      Where do you currently post your cars and manage leads?
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      AutoClaw’s Syndication Agent bridges these channels directly without duplicate typing.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {platformOptions.map((platform) => {
                      const isSelected = selectedPlatforms.includes(platform);
                      return (
                        <button
                          key={platform}
                          type="button"
                          id={`platform-option-${platform.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => togglePlatform(platform)}
                          className={`p-3.5 rounded-xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center justify-center gap-2 ${
                            isSelected
                              ? 'bg-violet-950/70 border-violet-500 text-white shadow-md shadow-violet-950/40'
                              : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          <Radio
                            className={`w-4 h-4 ${
                              isSelected ? 'text-violet-400 animate-pulse' : 'text-slate-500'
                            }`}
                          />
                          <span className="text-xs font-mono font-medium">{platform}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-3.5 rounded-xl bg-violet-950/30 border border-violet-500/20 text-xs font-mono text-violet-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Ready to initialize your 6 autonomous BullMQ worker agents for Abuja lot automation.
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-slate-800/80 pt-4">
            <Button
              id="wizard-prev-btn"
              variant="ghost"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="text-slate-400"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              {currentStep < totalSteps ? (
                <Button
                  id="wizard-continue-btn"
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                >
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  id="wizard-launch-dashboard-btn"
                  variant="glow"
                  size="md"
                  onClick={handleNext}
                >
                  <ArrowRight className="w-4 h-4" />
                  Launch Dashboard
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
