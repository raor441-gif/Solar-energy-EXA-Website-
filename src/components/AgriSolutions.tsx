/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Droplet, Sun, ArrowRight, CheckCircle2, TrendingDown, Shield } from 'lucide-react';

interface AgriSolutionsProps {
  onOpenAssessment: () => void;
}

export const AgriSolutions: React.FC<AgriSolutionsProps> = ({ onOpenAssessment }) => {
  const [pumpHp, setPumpHp] = useState<number>(5);

  // Diesel savings calculation
  const dieselHoursPerDay = 5;
  const dieselLitresPerHour = pumpHp === 3 ? 1.2 : pumpHp === 5 ? 1.9 : 2.7;
  const dieselPricePerLitre = 90; // INR
  const daysPerYear = 220; // active irrigation days

  const annualDieselCost = Math.round(dieselHoursPerDay * dieselLitresPerHour * dieselPricePerLitre * daysPerYear);
  const fiveYearSavings = annualDieselCost * 5;

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-emerald-50/30 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>PM-KUSUM Solar Agriculture</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Diesel Irrigation for Indian Farmers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Solar Water Pumps: Fuel-Free Irrigation Under the Indian Sun
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Replace noisy, expensive diesel generators with Exa high-torque solar submersible and monoblock water pumps. 
            Empowered with MNRE and PM-KUSUM subsidies up to 60% with zero electricity bills.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Asset */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 group">
              <img
                src="/src/assets/images/solar_farm_agriculture_india_1793559133462.jpg"
                alt="Solar water pump powering agricultural irrigation in Indian farmland"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono text-emerald-300 font-semibold uppercase block mb-1">
                  PM-KUSUM Component B Approved
                </span>
                <p className="text-xs text-slate-200">
                  Solar pumping unit with automatic dry-run sensor and MPPT controller operating in Vidarbha, Maharashtra.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Diesel vs Solar Cost Comparison */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Select Pump Rating
                </span>
                <div className="flex items-center gap-2 mt-2">
                  {[3, 5, 7.5].map((hp) => (
                    <button
                      key={hp}
                      type="button"
                      onClick={() => setPumpHp(hp)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                        pumpHp === hp
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {hp} HP Pump
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Government Subsidy</span>
                <span className="text-sm font-extrabold text-emerald-700">Up to 60%</span>
              </div>
            </div>

            {/* Comparison Callout */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 text-slate-900">
                <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 mb-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>Diesel Generator Pump</span>
                </div>
                <div className="text-xl font-bold font-mono text-red-900 mt-2">
                  ₹{annualDieselCost.toLocaleString('en-IN')} / yr
                </div>
                <p className="text-[11px] text-red-800 mt-1">
                  Wasteful fuel expenses + constant engine oil servicing and breakdowns.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-slate-900">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
                  <Sun className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Exa Solar Water Pump</span>
                </div>
                <div className="text-xl font-bold font-mono text-emerald-800 mt-2">
                  ₹0 Fuel Cost
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Powered by clean sunlight with automatic day-to-night MPPT tracking.
                </p>
              </div>
            </div>

            {/* 5-Year Cumulative Farmer Savings */}
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between mb-6">
              <div>
                <span className="text-xs text-slate-400 block">5-Year Farmer Money Saved:</span>
                <div className="text-2xl font-extrabold font-mono text-emerald-400">
                  ₹{fiveYearSavings.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="text-right text-xs text-slate-300">
                <span>Directly increases farmer family income</span>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="space-y-2 mb-6 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Stainless steel submersible motor resistant to sand and corrosion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Smart dry-run protection stops motor automatically if borewell water depletes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>5-Year comprehensive onsite warranty across rural districts</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenAssessment}
              className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Apply for PM-KUSUM Agri Pump Subsidy</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
