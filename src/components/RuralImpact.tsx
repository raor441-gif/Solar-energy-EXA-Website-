/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, Users, Flame, Leaf, Sparkles, ArrowRight } from 'lucide-react';

interface RuralImpactProps {
  onOpenAssessment: () => void;
}

export const RuralImpact: React.FC<RuralImpactProps> = ({ onOpenAssessment }) => {
  const [lanternCount, setLanternCount] = useState<number>(100);

  // Calculations for CSR Impact
  const studentsEmpowered = lanternCount * 2.4; // avg 2-3 children per rural household
  const keroseneLitresSavedPerYear = lanternCount * 54; // avg 4.5 litres/month kerosene per home
  const co2AvoidedTonnes = (keroseneLitresSavedPerYear * 2.5) / 1000;
  const healthSavingsInr = lanternCount * 4800; // annual medical expenses reduced from respiratory issues

  return (
    <section id="impact" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Corporate Social Responsibility</span>
            <span aria-hidden="true">·</span>
            <span>Project Light-Up Bharat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Replacing Kerosene with Clean Solar Light in Indian Villages
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Over 20 million rural homes in remote hilly, desert, and river island pockets rely on dim, toxic kerosene lamps. 
            Exa Energy partners with corporate CSR programs, state governments, and grassroots NGOs to deploy rugged, fire-safe solar lanterns.
          </p>
        </div>

        {/* Impact Showcase & Interactive CSR Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: CSR Interactive Calculator (lg:col-span-6) */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Simulate Your CSR Lantern Impact
                </h3>
              </div>
              <span className="text-xs text-emerald-400 font-mono">Tax Deductible 80G Eligible</span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
                <span>Number of Exa Solar Lanterns Sponsored:</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{lanternCount} Lanterns</span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="20"
                value={lanternCount}
                onChange={(e) => setLanternCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                <span>20 (1 Hamlet)</span>
                <span>250 (1 Village)</span>
                <span>1,000+ (Regional Cluster)</span>
              </div>
            </div>

            {/* Impact Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                <div className="flex items-center gap-1.5 text-xs text-cyan-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span>Students Empowered</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {Math.round(studentsEmpowered)}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Children get 3.5+ safe hours of night study daily
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                  <Flame className="w-4 h-4" />
                  <span>Kerosene Eliminated</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {keroseneLitresSavedPerYear.toLocaleString('en-IN')} L
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Zero black carbon soot inhalation in rural homes
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-1">
                  <Leaf className="w-4 h-4" />
                  <span>Annual CO2 Avoided</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {co2AvoidedTonnes.toFixed(1)} Tons
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Equivalent to planting {Math.round(co2AvoidedTonnes * 45)} trees
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/60">
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Household Savings</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  ₹{healthSavingsInr.toLocaleString('en-IN')}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Money redirected to education and nutrition
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={onOpenAssessment}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-900 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Partner with Exa Energy for CSR Electrification</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

          {/* Right Column: Ground Reality & Field Story (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-2">
                Field Deployment Case: Sundarbans & Bastar
              </span>
              <h4 className="text-xl font-bold text-white mb-2">
                "Our daughters no longer suffer from eye stinging and cough during board exams."
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                In ungrid-connected river villages across West Bengal and tribal hamlets in Chhattisgarh, 
                Exa Energy partnered with local panchayats to distribute over 18,400 ExaGlow solar lanterns. 
                Students reported a 28% increase in academic test scores due to consistent night study light.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>Gram Panchayat Verification</span>
                <span className="text-emerald-400 font-medium">100% Operational After 2 Years</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-2xl font-bold font-mono text-emerald-400">42</div>
                <div className="text-[11px] text-slate-400 mt-1">Villages Electrified</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-2xl font-bold font-mono text-cyan-400">18,400+</div>
                <div className="text-[11px] text-slate-400 mt-1">Lanterns in Active Use</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div className="text-2xl font-bold font-mono text-amber-400">0</div>
                <div className="text-[11px] text-slate-400 mt-1">Accidental Fire Incidents</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
