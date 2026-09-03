import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, FileText, PhoneCall, Cpu, Zap, Car } from 'lucide-react';

interface QuoteData {
  petrolCar: string;
  evCar: string;
  annualKm: number;
  fuelPrice: number;
  powerTariff: number;
  fiveYearSavings: number;
}

interface LandingModalsProps {
  isDemoModalOpen: boolean;
  onCloseDemoModal: () => void;
  quoteModalData: QuoteData | null;
  onCloseQuoteModal: () => void;
  isSellerModalOpen: boolean;
  onCloseSellerModal: () => void;
  activeAgentId: string | null;
  onCloseAgentModal: () => void;
  onEnterDashboard: () => void;
}

export function LandingModals({
  isDemoModalOpen,
  onCloseDemoModal,
  quoteModalData,
  onCloseQuoteModal,
  isSellerModalOpen,
  onCloseSellerModal,
  activeAgentId,
  onCloseAgentModal,
  onEnterDashboard,
}: LandingModalsProps) {
  // Demo modal state
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    dealerName: '',
    phone: '',
    city: 'Abuja',
    inventorySize: '20-50 vehicles',
  });

  // Quote modal state
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteFormData, setQuoteFormData] = useState({
    buyerName: '',
    buyerPhone: '',
    buyerCity: 'Lagos',
  });

  // Seller modal state
  const [sellerSubmitted, setSellerSubmitted] = useState(false);
  const [sellerFormData, setSellerFormData] = useState({
    makeModel: 'Range Rover Velar 2022',
    city: 'Lagos',
    phone: '',
    expectedPrice: '₦65,000,000',
  });

  return (
    <>
      {/* 1. BOOK DEMO MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121217] border-2 border-[#E3FF00]/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left">
            <button
              type="button"
              onClick={onCloseDemoModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            {demoSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#E3FF00]/20 border border-[#E3FF00] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-[#E3FF00]" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">DEMO DISPATCHED</h3>
                <p className="text-sm text-zinc-300 mb-6">
                  Our regional dealership director for {demoFormData.city} will contact you on WhatsApp at {demoFormData.phone || 'your number'} within 15 minutes.
                </p>
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onCloseDemoModal();
                      onEnterDashboard();
                    }}
                    className="w-full py-3.5 bg-[#E3FF00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    EXPLORE AUTOCLAW TERMINAL DIRECTLY →
                  </button>
                  <button
                    type="button"
                    onClick={onCloseDemoModal}
                    className="w-full py-3 bg-zinc-900 text-zinc-300 text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="px-2.5 py-0.5 bg-[#E3FF00]/15 text-[#E3FF00] text-[11px] font-bold uppercase tracking-wider rounded inline-block mb-2">
                  DEALER ACCESS
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                  BOOK LIVE LOT DEMO
                </h3>
                <p className="text-xs text-zinc-400 mb-6 font-normal">
                  Experience sub-800ms delisting and test the fuel-to-grid savings engine on your active inventory.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDemoSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                      Dealership / Showroom Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lekki Luxury Motors"
                      value={demoFormData.dealerName}
                      onChange={(e) => setDemoFormData({ ...demoFormData, dealerName: e.target.value })}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                        Metropolitan Hub
                      </label>
                      <select
                        value={demoFormData.city}
                        onChange={(e) => setDemoFormData({ ...demoFormData, city: e.target.value })}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                      >
                        <option value="Abuja">Abuja (FCT)</option>
                        <option value="Lagos">Lagos State</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="Ibadan">Ibadan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                        Active Fleet Size
                      </label>
                      <select
                        value={demoFormData.inventorySize}
                        onChange={(e) => setDemoFormData({ ...demoFormData, inventorySize: e.target.value })}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                      >
                        <option value="5-15 vehicles">5 - 15 vehicles</option>
                        <option value="15-50 vehicles">15 - 50 vehicles</option>
                        <option value="50+ vehicles">50+ vehicles</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000"
                      value={demoFormData.phone}
                      onChange={(e) => setDemoFormData({ ...demoFormData, phone: e.target.value })}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#E3FF00] hover:bg-[#d4ed00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors mt-2"
                  >
                    CONFIRM DEMO DISPATCH →
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. GENERATE BUYER QUOTE MODAL */}
      {quoteModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121217] border-2 border-[#E3FF00]/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left">
            <button
              type="button"
              onClick={onCloseQuoteModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            {quoteSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#E3FF00]/20 border border-[#E3FF00] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-[#E3FF00]" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">QUOTE GENERATED</h3>
                <p className="text-sm text-zinc-300 mb-4">
                  A verifiable buyer comparison proposal for {quoteModalData.evCar} vs {quoteModalData.petrolCar} showing{' '}
                  <span className="text-[#E3FF00] font-bold">₦{quoteModalData.fiveYearSavings.toLocaleString()}</span> in net 5-year savings has been formatted.
                </p>
                <button
                  type="button"
                  onClick={onCloseQuoteModal}
                  className="w-full py-3 bg-[#E3FF00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  RETURN TO SHOWROOM
                </button>
              </div>
            ) : (
              <div>
                <span className="px-2.5 py-0.5 bg-[#E3FF00]/15 text-[#E3FF00] text-[11px] font-bold uppercase tracking-wider rounded inline-block mb-2">
                  SALES CLOSING TOOL
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-1">
                  OFFICIAL BUYER TCO QUOTE
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  Deliver verifiable 5-year savings data directly to a prospective customer.
                </p>

                <div className="bg-black/60 border border-zinc-800 p-4 rounded-xl mb-4 space-y-1.5 text-xs text-zinc-300">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Combustion Benchmark:</span>
                    <span className="font-semibold text-white">{quoteModalData.petrolCar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Electric Vehicle:</span>
                    <span className="font-semibold text-[#E3FF00]">{quoteModalData.evCar}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Annual Travel:</span>
                    <span className="font-semibold text-white">{quoteModalData.annualKm.toLocaleString()} KM/yr</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-zinc-800">
                    <span className="text-[#E3FF00] font-bold">5-Year TCO Advantage:</span>
                    <span className="text-[#E3FF00] font-black text-sm">
                      ₦{quoteModalData.fiveYearSavings.toLocaleString()} Saved
                    </span>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setQuoteSubmitted(true);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                      Customer / Fleet Lead Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chief Raymond E."
                      value={quoteFormData.buyerName}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, buyerName: e.target.value })}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                      Buyer WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 802 000 0000"
                      value={quoteFormData.buyerPhone}
                      onChange={(e) => setQuoteFormData({ ...quoteFormData, buyerPhone: e.target.value })}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#E3FF00] hover:bg-[#d4ed00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors mt-2"
                  >
                    DISPATCH VERIFIED PDF / WHATSAPP PROPOSAL
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. PRIVATE SELLER MODAL */}
      {isSellerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121217] border-2 border-zinc-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-left">
            <button
              type="button"
              onClick={onCloseSellerModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            {sellerSubmitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#E3FF00]/20 border border-[#E3FF00] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-[#E3FF00]" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white mb-2">VEHICLE LOGGED</h3>
                <p className="text-sm text-zinc-300 mb-6">
                  Your vehicle has been registered for rapid valuation. Our Abuja/Lagos inspection team will reach out at {sellerFormData.phone}.
                </p>
                <button
                  type="button"
                  onClick={onCloseSellerModal}
                  className="w-full py-3 bg-[#E3FF00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  DONE
                </button>
              </div>
            ) : (
              <div>
                <span className="px-2.5 py-0.5 bg-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider rounded inline-block mb-2">
                  DIRECT CONSIGNMENT
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                  SELL LUXURY VEHICLE FAST
                </h3>
                <p className="text-xs text-zinc-400 mb-6">
                  Direct routing to vetted cash buyers across Nigeria without open-market depreciation.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSellerSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                      Vehicle Year, Make &amp; Model
                    </label>
                    <input
                      type="text"
                      required
                      value={sellerFormData.makeModel}
                      onChange={(e) => setSellerFormData({ ...sellerFormData, makeModel: e.target.value })}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                        Vehicle Location
                      </label>
                      <select
                        value={sellerFormData.city}
                        onChange={(e) => setSellerFormData({ ...sellerFormData, city: e.target.value })}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                      >
                        <option value="Lagos">Lagos</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="Ibadan">Ibadan</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                        Target Price (NGN)
                      </label>
                      <input
                        type="text"
                        required
                        value={sellerFormData.expectedPrice}
                        onChange={(e) => setSellerFormData({ ...sellerFormData, expectedPrice: e.target.value })}
                        className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-zinc-300 mb-1">
                      Your WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 803 000 0000"
                      value={sellerFormData.phone}
                      onChange={(e) => setSellerFormData({ ...sellerFormData, phone: e.target.value })}
                      className="w-full bg-black border border-zinc-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:border-[#E3FF00] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer hover:bg-zinc-200 transition-colors mt-2"
                  >
                    SUBMIT FOR INSTANT APPRAISAL →
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. AGENT INSPECTION LOG MODAL */}
      {activeAgentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121217] border border-[#E3FF00]/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl text-left">
            <button
              type="button"
              onClick={onCloseAgentModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#E3FF00] mb-2">
              <Cpu size={14} />
              <span>LIVE AGENT TELEMETRY FEED</span>
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
              {activeAgentId === 'agent-01' && 'Omnichannel Sync Engine'}
              {activeAgentId === 'agent-02' && 'Lead Routing & CRM Agent'}
              {activeAgentId === 'agent-03' && 'Valuation & Price Optimizer'}
              {activeAgentId === 'agent-04' && 'Fraud & Escrow Shield'}
            </h3>

            <div className="bg-black border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 space-y-2 mb-6 max-h-60 overflow-y-auto">
              <div className="text-emerald-400">[0.012s] Connection verified with Jiji, Cars45, Autochek, Carmart APIs</div>
              <div className="text-zinc-400">[0.084s] Active inventory synchronization: 48 vehicles checked</div>
              <div className="text-[#E3FF00]">[0.142s] Delist trigger latency: 742ms average response time</div>
              <div className="text-zinc-400">[0.210s] WhatsApp webhook payload parsed: 14 incoming buyer inquiries</div>
              <div className="text-emerald-400">[0.320s] NCS C-Number SGD verification: 100% duty clearance match</div>
              <div className="text-zinc-500">[0.450s] System heartbeat: 99.98% uptime across all metropolitan hubs</div>
            </div>

            <button
              type="button"
              onClick={onCloseAgentModal}
              className="w-full py-3 bg-[#E3FF00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
            >
              CLOSE TELEMETRY INSPECTION
            </button>
          </div>
        </div>
      )}
    </>
  );
}
