import React, { useState } from 'react';
import { Vehicle, NigerianCity } from '../types';
import {
  BrainCircuit,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  Send,
  HelpCircle,
  TrendingUp,
  RefreshCw,
  Zap,
  Building,
  ShieldCheck,
  Fuel,
  ArrowRight,
} from 'lucide-react';

interface AiCarBrainProps {
  vehicles: Vehicle[];
  currentCity: NigerianCity;
  preselectedVehicle?: Vehicle | null;
}

export const AiCarBrain: React.FC<AiCarBrainProps> = ({
  vehicles,
  currentCity,
  preselectedVehicle,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'pitch' | 'objection' | 'valuation' | 'brief'>('pitch');

  // Pitch Generator States
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    preselectedVehicle?.id || vehicles[0]?.id || ''
  );
  const [pitchCity, setPitchCity] = useState<string>(
    currentCity !== 'All Nigeria' ? currentCity : 'Lagos'
  );
  const [buyerType, setBuyerType] = useState<string>('Corporate Executive / Business Owner');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [generatedPitch, setGeneratedPitch] = useState<string>('');
  const [pitchCopied, setPitchCopied] = useState(false);

  // Objection Buster States
  const [objectionQuestion, setObjectionQuestion] = useState('');
  const [objectionCity, setObjectionCity] = useState(
    currentCity !== 'All Nigeria' ? currentCity : 'Lagos'
  );
  const [isAnsweringObjection, setIsAnsweringObjection] = useState(false);
  const [objectionAnswer, setObjectionAnswer] = useState<string>('');

  // Valuation States
  const [currentMake, setCurrentMake] = useState('Toyota');
  const [currentModel, setCurrentModel] = useState('Camry');
  const [currentYear, setCurrentYear] = useState('2014');
  const [condition, setCondition] = useState('Foreign Used (Tokunbo)');
  const [mileageKm, setMileageKm] = useState('145000');
  const [valuationResult, setValuationResult] = useState<any>(null);
  const [isValuating, setIsValuating] = useState(false);

  // Market Brief State
  const [briefCity, setBriefCity] = useState<string>(
    currentCity !== 'All Nigeria' ? currentCity : 'Abuja'
  );
  const [briefData, setBriefData] = useState<any>(null);
  const [isLoadingBrief, setIsLoadingBrief] = useState(false);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // 1. Generate WhatsApp Pitch
  const handleGeneratePitch = async () => {
    if (!selectedVehicle) return;
    setIsGeneratingPitch(true);
    setGeneratedPitch('');

    try {
      const response = await fetch('/api/ai/pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleName: `${selectedVehicle.make} ${selectedVehicle.model}`,
          year: selectedVehicle.year,
          fuelType: selectedVehicle.fuelType,
          priceNgn: selectedVehicle.priceNgn,
          city: pitchCity,
          buyerType,
          specialPerks: selectedVehicle.features,
          batteryRange: selectedVehicle.rangeKm ? `${selectedVehicle.rangeKm} km` : '',
        }),
      });

      const data = await response.json();
      if (data.pitch) {
        setGeneratedPitch(data.pitch);
      }
    } catch (err) {
      console.error('Error generating pitch:', err);
      // Fallback
      setGeneratedPitch(
        `🚗 *EXCLUSIVE SHOWROOM OFFER: ${selectedVehicle.year} ${selectedVehicle.title}*\n\nGood day Chief,\n\nHere is the official details on our freshly cleared ${selectedVehicle.title} available now at our ${pitchCity} showroom.\n\n💰 Price: ₦${selectedVehicle.priceNgn.toLocaleString()}\n⚡ Fuel: ${selectedVehicle.fuelType}\n📜 0% Federal Customs Duty Waived\n\nWould you like to schedule a private inspection or video walkaround today?`
      );
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  // 2. Handle Objection Buster
  const handleSolveObjection = async (presetQuestion?: string) => {
    const questionToAsk = presetQuestion || objectionQuestion;
    if (!questionToAsk.trim()) return;

    setIsAnsweringObjection(true);
    setObjectionAnswer('');
    if (presetQuestion) setObjectionQuestion(presetQuestion);

    try {
      const response = await fetch('/api/ai/objection-buster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionToAsk,
          city: objectionCity,
          carModel: selectedVehicle ? selectedVehicle.title : 'Electric / Hybrid Vehicle',
        }),
      });

      const data = await response.json();
      if (data.answer) {
        setObjectionAnswer(data.answer);
      }
    } catch (err) {
      console.error('Error answering objection:', err);
    } finally {
      setIsAnsweringObjection(false);
    }
  };

  // 3. Handle Vehicle Valuation
  const handleRunValuation = async () => {
    setIsValuating(true);
    try {
      const response = await fetch('/api/ai/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentCarMake: currentMake,
          currentCarModel: currentModel,
          currentCarYear: Number(currentYear),
          condition,
          mileageKm: Number(mileageKm),
          targetCity: pitchCity,
        }),
      });

      const data = await response.json();
      setValuationResult(data);
    } catch (err) {
      console.error('Error fetching valuation:', err);
    } finally {
      setIsValuating(false);
    }
  };

  // 4. Handle Market Briefing
  const handleLoadMarketBrief = async (cityToLoad: string) => {
    setIsLoadingBrief(true);
    try {
      const response = await fetch('/api/ai/market-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: cityToLoad }),
      });
      const data = await response.json();
      setBriefData(data);
    } catch (err) {
      console.error('Error loading brief:', err);
    } finally {
      setIsLoadingBrief(false);
    }
  };

  const copyPitchToClipboard = () => {
    if (!generatedPitch) return;
    navigator.clipboard.writeText(generatedPitch);
    setPitchCopied(true);
    setTimeout(() => setPitchCopied(false), 2000);
  };

  const openWhatsAppWithPitch = () => {
    if (!generatedPitch) return;
    const url = `https://wa.me/?text=${encodeURIComponent(generatedPitch)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-5 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Car Brain AI Sales Suite
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Powered by Gemini
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Trained on Nigerian automotive market realities, 0% customs policy, and buyer psychology across Abuja, Lagos, Ibadan, and Port Harcourt.
              </p>
            </div>
          </div>

          {/* Sub Navigation Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-center">
            <button
              id="carbrain-tab-pitch"
              onClick={() => setActiveSubTab('pitch')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeSubTab === 'pitch'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              WhatsApp Closer
            </button>
            <button
              id="carbrain-tab-objection"
              onClick={() => setActiveSubTab('objection')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeSubTab === 'objection'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Objection Buster
            </button>
            <button
              id="carbrain-tab-valuation"
              onClick={() => setActiveSubTab('valuation')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeSubTab === 'valuation'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tokunbo Trade-In
            </button>
            <button
              id="carbrain-tab-brief"
              onClick={() => {
                setActiveSubTab('brief');
                if (!briefData) handleLoadMarketBrief(briefCity);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeSubTab === 'brief'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              City Briefing
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-5 sm:p-6">
        {/* SUBTAB 1: WHATSAPP PITCH GENERATOR */}
        {activeSubTab === 'pitch' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  1. Select Showroom Vehicle
                </label>
                <select
                  id="pitch-vehicle-select"
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.title} — ₦{v.priceNgn.toLocaleString()} ({v.city})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    2. Buyer Location
                  </label>
                  <select
                    id="pitch-city-select"
                    value={pitchCity}
                    onChange={(e) => setPitchCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Lagos">Lagos (Traffic/Lekki/VI)</option>
                    <option value="Abuja">Abuja (Highways/NNPC)</option>
                    <option value="Ibadan">Ibadan (Commuters/Solar)</option>
                    <option value="Port Harcourt">Port Harcourt (GRA/Floods)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    3. Buyer Profile
                  </label>
                  <select
                    id="pitch-buyer-profile"
                    value={buyerType}
                    onChange={(e) => setBuyerType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Corporate Executive / Business Owner">Executive / MD</option>
                    <option value="High-Mileage Commuter (Inter-state)">Inter-state Commuter</option>
                    <option value="Fleet / Ride-Hailing Operator">Fleet / Ride-Hailing</option>
                    <option value="Government Contractor / Diplomat">Government / VIP</option>
                    <option value="Family Looking to Cut Fuel Bill">Cost-Conscious Family</option>
                  </select>
                </div>
              </div>

              {/* Vehicle Context Card */}
              {selectedVehicle && (
                <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{selectedVehicle.title}</span>
                    <span className="text-emerald-400 font-bold">₦{selectedVehicle.priceNgn.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span>{selectedVehicle.fuelType}</span>
                    {selectedVehicle.rangeKm && <span>• {selectedVehicle.rangeKm} km Range</span>}
                    <span>• {selectedVehicle.dutyStatus}</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    ⚡ Saves buyer approx. ₦{selectedVehicle.monthlyFuelSavingsNgn.toLocaleString()} every month vs petrol!
                  </div>
                </div>
              )}

              <button
                id="btn-generate-pitch"
                onClick={handleGeneratePitch}
                disabled={isGeneratingPitch}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isGeneratingPitch ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    Car Brain is Crafting Pitch...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Generate High-Converting WhatsApp Pitch
                  </>
                )}
              </button>
            </div>

            {/* Output Display */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Ready-To-Send WhatsApp Pitch
                </span>
                {generatedPitch && (
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-copy-pitch"
                      onClick={copyPitchToClipboard}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      {pitchCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" /> Copy Text
                        </>
                      )}
                    </button>
                    <button
                      id="btn-open-wa"
                      onClick={openWhatsAppWithPitch}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold flex items-center gap-1 shadow transition-colors"
                    >
                      <Send className="w-3 h-3" /> Send to WhatsApp
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between min-h-[260px]">
                {generatedPitch ? (
                  <textarea
                    id="generated-pitch-textarea"
                    value={generatedPitch}
                    onChange={(e) => setGeneratedPitch(e.target.value)}
                    className="w-full flex-1 bg-transparent text-slate-200 text-xs sm:text-sm font-sans resize-none focus:outline-none leading-relaxed"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8 text-slate-500">
                    <Sparkles className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-xs sm:text-sm text-slate-400">
                      Click "Generate Pitch" to create a bespoke sales message for {pitchCity}.
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-sm">
                      Car Brain automatically incorporates fuel savings, 0% customs duty proof, and specific road factors (traffic, flood immunity, or solar charging).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: OBJECTION BUSTER */}
        {activeSubTab === 'objection' && (
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-100 mb-1">
                Nigerian Buyer Objection Resolver
              </h3>
              <p className="text-xs text-slate-400">
                Overcome skeptical questions about NEPA charging, road floods, roadside mechanics, and second-hand Tokunbo resale value.
              </p>
            </div>

            {/* Quick Prompt Pills */}
            <div>
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                Frequently Asked Nigerian Buyer Objections:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Will NEPA or grid light let me charge this car in Nigeria?',
                  'What if flood enters the battery on Lekki-Epe expressway or Aba Road?',
                  'Can ordinary mechanics in Ibadan or Abuja service it without spoiling it?',
                  'Will it have good resale value when I want to sell it in 3 years?',
                  'Is it true that Nigerian Customs duty on EVs is 0% or will police disturb me?',
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSolveObjection(q)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-xs text-slate-300 hover:text-white transition-all text-left"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="custom-objection-input"
                type="text"
                value={objectionQuestion}
                onChange={(e) => setObjectionQuestion(e.target.value)}
                placeholder="Or type a custom customer hesitation here..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <select
                value={objectionCity}
                onChange={(e) => setObjectionCity(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Lagos">Lagos Context</option>
                <option value="Abuja">Abuja Context</option>
                <option value="Ibadan">Ibadan Context</option>
                <option value="Port Harcourt">Port Harcourt Context</option>
              </select>
              <button
                id="btn-solve-objection"
                onClick={() => handleSolveObjection()}
                disabled={isAnsweringObjection || !objectionQuestion.trim()}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow disabled:opacity-50 transition-colors shrink-0"
              >
                {isAnsweringObjection ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <HelpCircle className="w-4 h-4" /> Resolve
                  </>
                )}
              </button>
            </div>

            {/* Objection Answer Box */}
            {objectionAnswer && (
              <div className="bg-slate-950 border border-emerald-500/30 rounded-xl p-4 sm:p-5 space-y-3 shadow-lg">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Recommended Dealer Response & Talk Track
                  </span>
                  <span className="text-[11px] text-slate-400">Context: {objectionCity}</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                  {objectionAnswer}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: TOKUNBO TRADE-IN & VALUATION */}
        {activeSubTab === 'valuation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-3.5">
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Tokunbo Petrol Trade-In Appraiser
                </h3>
                <p className="text-xs text-slate-400">
                  Calculate fair market value for a customer's petrol vehicle and pitch the upgrade to an EV or Hybrid.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Make</label>
                  <input
                    type="text"
                    value={currentMake}
                    onChange={(e) => setCurrentMake(e.target.value)}
                    placeholder="Toyota, Lexus, Honda..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Model</label>
                  <input
                    type="text"
                    value={currentModel}
                    onChange={(e) => setCurrentModel(e.target.value)}
                    placeholder="Camry, RX350, Corolla..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Year</label>
                  <input
                    type="number"
                    value={currentYear}
                    onChange={(e) => setCurrentYear(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Mileage (km)</label>
                  <input
                    type="number"
                    value={mileageKm}
                    onChange={(e) => setMileageKm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Foreign Used (Tokunbo)">Foreign Used (Tokunbo - Clean title)</option>
                  <option value="Nigerian Used - First Body">Nigerian Used (Clean First Body)</option>
                  <option value="Nigerian Used - Fair">Nigerian Used (Average condition)</option>
                </select>
              </div>

              <button
                id="btn-run-valuation"
                onClick={handleRunValuation}
                disabled={isValuating}
                className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isValuating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" /> Appraise & Calculate EV Upgrade
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-7">
              {valuationResult ? (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs text-slate-400">Estimated Trade-in Value</span>
                      <h4 className="text-2xl font-black text-emerald-400">
                        ₦{Number(valuationResult.estimatedValueNgn).toLocaleString()}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Market Liquidity</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {valuationResult.marketDemand || 'Moderate'}
                      </span>
                    </div>
                  </div>

                  {/* Savings Comparison */}
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-emerald-300 font-semibold block">
                        Monthly Petrol Bill If Swapped to EV:
                      </span>
                      <span className="text-sm text-slate-300">
                        Customer will pocket over <strong>₦{Number(valuationResult.monthlyFuelSavingsIfSwappingToEV).toLocaleString()}/month</strong> in direct savings.
                      </span>
                    </div>
                    <Fuel className="w-6 h-6 text-emerald-400 shrink-0" />
                  </div>

                  {/* Dealer Closing Talk Track */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Dealer Closing Pitch for this Trade-in:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                      {valuationResult.dealerInsight}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[220px] bg-slate-950/40 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <TrendingUp className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-xs sm:text-sm text-slate-400">
                    Enter customer's vehicle details to generate market appraisal and EV transition pitch.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SUBTAB 4: CITY MARKET BRIEFING */}
        {activeSubTab === 'brief' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Metropolitan Dealer Restocking & Policy Brief
                </h3>
                <p className="text-xs text-slate-400">
                  Select an urban hub to see hot selling models, target buyers, and actionable inventory tactics.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {['Abuja', 'Lagos', 'Ibadan', 'Port Harcourt'].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setBriefCity(c);
                      handleLoadMarketBrief(c);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      briefCity === c
                        ? 'bg-emerald-600 text-white font-semibold'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {isLoadingBrief ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400">
                <RefreshCw className="w-6 h-6 animate-spin text-emerald-500 mb-2" />
                <span className="text-xs">Gathering market intelligence for {briefCity}...</span>
              </div>
            ) : briefData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> High-Demand Models for {briefCity}
                  </span>
                  <ul className="space-y-1 text-xs text-slate-200">
                    {briefData.hotSellers?.map((model: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {model}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 mt-2 border-t border-slate-800/80 text-xs text-slate-400">
                    <strong>Primary Buyer:</strong> {briefData.topBuyerPersona}
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Regulatory & Customs Angle
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {briefData.policyOpportunity}
                  </p>
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-2.5 mt-2 text-xs text-emerald-300 font-medium">
                    🎯 <strong>Dealer Tactic:</strong> {briefData.actionTip}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};
