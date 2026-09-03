import React, { useState } from 'react';
import { SalesLead, Vehicle, NigerianCity } from '../types';
import {
  Users,
  PlusCircle,
  MessageCircle,
  Sparkles,
  Phone,
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  Car,
  AlertTriangle,
} from 'lucide-react';

interface LeadManagerProps {
  leads: SalesLead[];
  vehicles: Vehicle[];
  currentCity: NigerianCity;
  onAddLead: (lead: Omit<SalesLead, 'id' | 'dateAdded'>) => void;
  onSelectLeadForPitch: (lead: SalesLead) => void;
}

export const LeadManager: React.FC<LeadManagerProps> = ({
  leads,
  vehicles,
  currentCity,
  onAddLead,
  onSelectLeadForPitch,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState<string>('All');

  // New Lead Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState<'Abuja' | 'Lagos' | 'Ibadan' | 'Port Harcourt'>('Lagos');
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id || '');
  const [budgetNgn, setBudgetNgn] = useState('45000000');
  const [notes, setNotes] = useState('');

  const filteredLeads = leads.filter((lead) => {
    if (currentCity !== 'All Nigeria' && lead.city.toLowerCase() !== currentCity.toLowerCase()) {
      return false;
    }
    if (selectedStage !== 'All' && lead.stage !== selectedStage) {
      return false;
    }
    return true;
  });

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onAddLead({
      name,
      phone,
      city,
      interestedVehicleId: vehicleId,
      budgetNgn: Number(budgetNgn) || 40000000,
      preferredFuelType: 'Electric (EV)',
      stage: 'New Inquiry',
      objectionsRaised: [],
      notes,
    });

    setName('');
    setPhone('');
    setNotes('');
    setShowAddModal(false);
  };

  const stages = ['All', 'New Inquiry', 'Pitch Sent', 'Test Drive Booked', 'Negotiation', 'Deal Closed'];

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Dealership Lead Pipeline & Sales Closer
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Track inquiries across Abuja, Lagos, Ibadan, and Port Harcourt. Send AI pitches via WhatsApp in seconds.
          </p>
        </div>

        <button
          id="btn-open-add-lead"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" /> Add Prospective Buyer
        </button>
      </div>

      {/* Stage Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {stages.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStage(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
              selectedStage === st
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLeads.map((lead) => {
          const interestedCar = vehicles.find((v) => v.id === lead.interestedVehicleId);
          return (
            <div
              key={lead.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 sm:p-5 space-y-3.5 transition-all shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{lead.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Phone className="w-3 h-3 text-slate-500" />
                      {lead.phone}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <MapPin className="w-3 h-3" />
                      {lead.city}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                    lead.stage === 'Deal Closed'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : lead.stage === 'Test Drive Booked'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                      : lead.stage === 'Negotiation'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {lead.stage}
                </span>
              </div>

              {/* Interested Vehicle */}
              {interestedCar && (
                <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-semibold text-slate-200 block">{interestedCar.title}</span>
                      <span className="text-[11px] text-slate-400">Budget: ₦{lead.budgetNgn.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold">₦{interestedCar.priceNgn.toLocaleString()}</span>
                </div>
              )}

              {/* Objections / Notes */}
              {lead.objectionsRaised.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Known Hesitations:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {lead.objectionsRaised.map((obj, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/20"
                      >
                        {obj}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {lead.notes && (
                <p className="text-xs text-slate-400 italic bg-slate-950/40 p-2 rounded border border-slate-800/60">
                  "{lead.notes}"
                </p>
              )}

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  id={`lead-pitch-btn-${lead.id}`}
                  onClick={() => onSelectLeadForPitch(lead)}
                  className="flex-1 py-1.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Generate AI Closer Pitch
                </button>

                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${lead.name}, this is from Autoclaw Motors. Following up on your inquiry about ${
                      interestedCar ? interestedCar.title : 'our electric vehicles'
                    } in ${lead.city}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Add Prospective Car Buyer</h3>

            <form onSubmit={handleSubmitLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Customer Full Name / Title</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alh. Farouk Musa or Dr. Ngozi"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone / WhatsApp Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 803 123 4567"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">City Location</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                  >
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Ibadan">Ibadan</option>
                    <option value="Port Harcourt">Port Harcourt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Budget (₦ Naira)</label>
                  <input
                    type="number"
                    value={budgetNgn}
                    onChange={(e) => setBudgetNgn(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Interested Vehicle</label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.year} {v.title} (₦{v.priceNgn.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Dealer Notes & Route</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Commutes Lekki-Mainland daily, concerned about charging light..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-500"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
