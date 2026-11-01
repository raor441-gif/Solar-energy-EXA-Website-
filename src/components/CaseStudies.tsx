/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/solarData';
import { MapPin, TrendingUp, Leaf, Award, CheckCircle } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Residential', 'Commercial & Industrial', 'Rural Impact', 'Agriculture'];

  const filteredStudies = selectedCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(s => s.category === selectedCategory);

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              <span>Demonstrated Performance</span>
              <span aria-hidden="true">·</span>
              <span>Proven Results Across India</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
              Real Installations. Verified Bill Reductions.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Explore how Exa Energy systems perform across varied microclimates in India — from Rajasthan’s desert heat 
              to Maharashtra’s manufacturing hubs and West Bengal’s river deltas.
            </p>
          </div>

          {/* Filter Tabs (Interactive controls per §1.A) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((cs) => (
            <div
              key={cs.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                
                {/* Quiet Unboxed Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-emerald-700">{cs.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {cs.city}, {cs.state}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {cs.client}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {cs.description}
                </p>

                {/* Marquee Key Metric */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                  <div className="text-2xl font-extrabold font-mono text-emerald-800">
                    {cs.highlightMetric}
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {cs.highlightLabel}
                  </div>
                </div>

              </div>

              {/* Specs & Performance Strip */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">System Size</span>
                  <span className="font-bold text-slate-800 font-mono text-[11px] sm:text-xs truncate block">{cs.systemSize}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Annual Savings</span>
                  <span className="font-bold text-emerald-700 font-mono text-[11px] sm:text-xs truncate block">{cs.annualSavings}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Payback ROI</span>
                  <span className="font-bold text-slate-800 font-mono text-[11px] sm:text-xs truncate block">{cs.paybackYears}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
