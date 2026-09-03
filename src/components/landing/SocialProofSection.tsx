import React from 'react';
import { Star, MapPin, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function SocialProofSection() {
  const testimonials = [
    {
      id: 'testimonial-1',
      name: 'Alhaji Kabir M.',
      role: 'Principal Partner',
      dealership: 'Lekki Luxury Autos',
      location: 'Victoria Island, Lagos',
      image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=400&q=80',
      badge: 'Victoria Island, Lagos',
      quote:
        'The universal delist stopped double-bookings overnight across Jiji and Cars45. We closed 14 units last month without a single dead lead call or deposit collision.',
      highlight: 'Sub-800ms Universal Delisting',
      stat: '14 Units Closed • Zero Double-Bookings',
    },
    {
      id: 'testimonial-2',
      name: 'Chidi O.',
      role: 'Fleet Director',
      dealership: 'Capital Auto Hub',
      location: 'Maitama, Abuja',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80',
      badge: 'Maitama, Abuja',
      quote:
        'Buyers walked away from 4.0L V8 petrol SUVs due to pump prices above ₦1,050/L. The live TCO engine and BYD vs Velar parity breakdown closed BYD Seal and Deepal sales on the spot with verifiable math.',
      highlight: 'Live Petrol vs EV Parity Engine',
      stat: '₦11.8M TCO Proved • BYD & Deepal Sales Closed',
    },
    {
      id: 'testimonial-3',
      name: 'Boma A.',
      role: 'Operations Lead',
      dealership: 'Niger Delta Motors',
      location: 'Trans-Amadi, Port Harcourt',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
      badge: 'Trans-Amadi, Port Harcourt',
      quote:
        'Synchronizing our stock across 7 portals with automated customs C-number clearance built instant trust with corporate oil & gas procurement teams and closed high-ticket fleet tenders.',
      highlight: 'NCS C-Number Verified Customs',
      stat: '7 Portals Synced • 100% NCS Clearance Match',
    },
  ];

  return (
    <section id="social-proof-section" className="w-full bg-[#0a0a0e] text-white py-20 text-left">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-zinc-800/80">
          <div>
            <span className="text-xs uppercase tracking-wider font-extrabold text-[#E3FF00] block mb-1">
              DEALERSHIP FIELD REPORTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real Dealer Social Proof
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal">
              Verifiable operational transformations from high-volume automotive dealerships in Lagos, Abuja, and Port Harcourt.
            </p>
          </div>
          <span className="text-xs uppercase tracking-wider font-bold text-zinc-400 shrink-0">
            3 METROPOLITAN HUBS REPORTING
          </span>
        </div>

        {/* 3 Structured Cards with rounded-xl high-resolution thumbnails at top left */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#121217] border-t border-zinc-700/50 border-x-zinc-800/40 border-b-zinc-900 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl shadow-black/80 hover:border-t-[#E3FF00] transition-colors text-left"
            >
              <div>
                {/* Top Left: Rounded-xl thumbnail paired with Location Badge & Rating */}
                <div className="flex items-start gap-3.5 mb-5">
                  <img
                    src={t.image}
                    alt={`${t.name} - ${t.dealership}`}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover object-top border border-zinc-700 shadow-md shrink-0"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="px-2.5 py-0.5 bg-zinc-900 border border-zinc-800 text-[11px] uppercase tracking-wider font-bold text-[#E3FF00] rounded mb-1 self-start">
                      {t.badge}
                    </span>
                    <div className="flex text-[#E3FF00] text-xs">★★★★★</div>
                  </div>
                </div>

                {/* Quote with explicit focus area */}
                <blockquote className="text-sm text-zinc-200 leading-relaxed italic mb-6 font-normal">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Author Info & Quantitative Delta */}
              <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-1.5">
                <span className="text-white font-bold text-sm tracking-wide">{t.name}</span>
                <span className="text-zinc-400 text-xs font-medium">
                  {t.role}, {t.dealership}
                </span>
                <div className="flex items-center gap-1.5 mt-2 text-[11px] uppercase tracking-wider text-zinc-400 font-semibold bg-black/50 p-2 rounded border border-zinc-800">
                  <CheckCircle2 size={13} className="text-[#E3FF00] shrink-0" />
                  <span className="text-[#E3FF00] font-bold">{t.stat}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
