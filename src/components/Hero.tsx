/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';

interface HeroProps {
  onOpenAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAssessment }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Subtle decorative clean-tech mesh gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet Unboxed Metadata Kicker (Anti-Pill Rule) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-800 mb-4 tracking-wide uppercase">
              <span>Exa Energy Private Limited</span>
              <span aria-hidden="true">·</span>
              <span>MNRE Empanelled Indian EPC</span>
              <span aria-hidden="true">·</span>
              <span>PM Surya Ghar Partner</span>
            </div>

            {/* Headline with text-wrap: balance and clamped type scale */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6 [text-wrap:balance]">
              Powering India with Next-Gen Solar Panels & Portable Clean Light
            </h1>

            {/* Subtitle with measure 65-75ch */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              From high-yield N-Type TOPCon bifacial rooftop arrays for homes and factories, 
              to rugged solar lanterns eliminating kerosene in off-grid rural villages — 
              we engineer resilient clean energy solutions built for India’s climate.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-700/20 active:scale-95 whitespace-nowrap"
              >
                <span>Calculate Subsidy (Up to ₹78,000)</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#lanterns"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm whitespace-nowrap"
              >
                <span>Explore Exa Solar Lanterns</span>
              </a>
            </div>

            {/* Trust Signals: National accreditations */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>BIS & IEC Certified PV Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Seamless DISCOM Net-Metering</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>25-Year Linear Performance Warranty</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero High-Impact Visual Asset */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="/src/assets/images/hero_solar_rooftop_india_1793559132111.jpg"
                alt="State-of-the-art rooftop solar installation by Exa Energy in India"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Inset Metric Card on Visual */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rooftop Solar Array · Commercial Installation</span>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-300">Bangalore Tech Hub</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
                  <div>
                    <div className="text-[10px] text-slate-400">Capacity</div>
                    <div className="text-sm font-bold font-mono text-white">120 kWp</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">Annual Yield</div>
                    <div className="text-sm font-bold font-mono text-emerald-400">175 MWh</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">CO2 Offset</div>
                    <div className="text-sm font-bold font-mono text-cyan-300">140 Tons</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof & KPI Row (Positioned below the hero split per guidelines) */}
        <div className="mt-14 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              ₹78,000
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-1">PM Surya Ghar Subsidy</div>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              Direct Benefit Transfer credited to your bank account for 3kW+ residential roofs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              22.8%
            </div>
            <div className="text-xs font-semibold text-cyan-700 mt-1">N-Type TOPCon Cell Peak</div>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              Bifacial glass-glass panels generating up to +25% rear albedo energy boost.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              18,400+
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-1">Exa Solar Lanterns Lit</div>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              Safe, fume-free study light deployed across 42 unelectrified rural villages.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              25 Years
            </div>
            <div className="text-xs font-semibold text-cyan-700 mt-1">Guaranteed Performance</div>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              Tier-1 certified linear power retention with pan-India annual maintenance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
