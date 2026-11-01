/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { INDIAN_STATES, calculatePmSuryaGharSubsidy } from '../data/solarData';
import { Calculator, ArrowRight, IndianRupee, Sparkles, Check, Info, Leaf, Clock, TrendingUp } from 'lucide-react';

interface SubsidyCalculatorProps {
  onSelectSystemForQuote: (specs: { kw: number; stateName: string; monthlyBill: number; subsidy: number }) => void;
}

export const SubsidyCalculator: React.FC<SubsidyCalculatorProps> = ({ onSelectSystemForQuote }) => {
  const [selectedStateId, setSelectedStateId] = useState<string>('mh');
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);
  const [rooftopArea, setRooftopArea] = useState<number>(400);

  const currentState = useMemo(() => {
    return INDIAN_STATES.find(s => s.id === selectedStateId) || INDIAN_STATES[0];
  }, [selectedStateId]);

  // Calculations based on Indian solar standards
  const calculations = useMemo(() => {
    const tariff = currentState.avgTariffPerKwh;
    const monthlyUnits = monthlyBill / tariff;
    
    // Average 1 kW solar generates ~120 units (kWh) per month in India
    const unitsPerKwMonth = currentState.solarHoursPerDay * 30 * 0.78; 
    let recommendedKw = Math.round((monthlyUnits / unitsPerKwMonth) * 10) / 10;
    
    // Constraints: minimum 1 kW, reasonable rooftop cap
    const maxKwByArea = Math.floor(rooftopArea / 75); // approx 75-80 sq ft per kW for modern TOPCon panels
    recommendedKw = Math.max(1, Math.min(25, recommendedKw));
    
    const isAreaConstrained = recommendedKw > maxKwByArea && maxKwByArea >= 1;
    const effectiveKw = isAreaConstrained ? maxKwByArea : recommendedKw;

    // Financials in INR
    const costPerKw = 62000; // Premium TOPCon bifacial turnkey with BIS structure and bidirectional net meter
    const grossCost = effectiveKw * costPerKw;
    
    // Central Subsidy under PM Surya Ghar
    const centralSubsidy = calculatePmSuryaGharSubsidy(effectiveKw);
    
    // State top-up subsidy if available
    const stateSubsidy = (currentState.stateSubsidyPerKw || 0) * Math.min(3, effectiveKw);
    const totalSubsidy = centralSubsidy + stateSubsidy;
    
    const netInvestment = Math.max(0, grossCost - totalSubsidy);
    
    // Monthly & Annual Savings
    const monthlyGenerationUnits = effectiveKw * unitsPerKwMonth;
    const monthlySavings = Math.min(monthlyBill, monthlyGenerationUnits * tariff);
    const annualSavings = monthlySavings * 12;
    
    // Payback Period
    const paybackYears = annualSavings > 0 ? (netInvestment / annualSavings).toFixed(1) : '3.5';
    
    // 25-Year Cumulative Savings (assuming modest 2.5% compounding grid tariff increase)
    let cumulativeSavings = 0;
    let currentAnnual = annualSavings;
    for (let yr = 1; yr <= 25; yr++) {
      cumulativeSavings += currentAnnual;
      currentAnnual *= 1.025;
    }

    // Environmental metrics
    const annualCo2Tonnes = (monthlyGenerationUnits * 12 * 0.82) / 1000; // 0.82 kg CO2 per kWh grid baseline in India
    const treesEquivalent = Math.round(annualCo2Tonnes * 45);

    return {
      monthlyUnits: Math.round(monthlyUnits),
      effectiveKw,
      recommendedKw,
      isAreaConstrained,
      grossCost,
      centralSubsidy,
      stateSubsidy,
      totalSubsidy,
      netInvestment,
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      paybackYears,
      cumulativeSavings: Math.round(cumulativeSavings),
      annualCo2Tonnes: annualCo2Tonnes.toFixed(1),
      treesEquivalent
    };
  }, [currentState, monthlyBill, rooftopArea]);

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>PM Surya Ghar: Muft Bijli Yojana</span>
            <span aria-hidden="true">·</span>
            <span>Government Direct Subsidy Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Calculate Your Solar Subsidy & Electricity Bill Savings
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Find out your eligible Central Financial Assistance (up to ₹78,000 DBT directly into your bank account), 
            estimated system size, and payback period across all Indian electricity boards.
          </p>
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Controls Form (lg:col-span-5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-6">
            
            {/* 1. State Selector */}
            <div>
              <label htmlFor="state-select" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Your State & Electricity Board
              </label>
              <select
                id="state-select"
                value={selectedStateId}
                onChange={(e) => setSelectedStateId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-2xs"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name} — {st.discom.split('/')[0]} (Avg ₹{st.avgTariffPerKwh}/unit)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>DISCOM: {currentState.discom}</span>
              </p>
            </div>

            {/* 2. Monthly Electricity Bill Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="monthly-bill" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  2. Average Monthly Electricity Bill
                </label>
                <div className="text-base font-bold font-mono text-emerald-800">
                  ₹{monthlyBill.toLocaleString('en-IN')}
                </div>
              </div>
              <input
                id="monthly-bill"
                type="range"
                min="1000"
                max="35000"
                step="500"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>₹1,000 (Low domestic)</span>
                <span>₹15,000</span>
                <span>₹35,000+ (High / Villa)</span>
              </div>
            </div>

            {/* 3. Available Rooftop Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="rooftop-area" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  3. Approximate Rooftop Area
                </label>
                <div className="text-base font-bold font-mono text-cyan-800">
                  {rooftopArea.toLocaleString('en-IN')} sq. ft.
                </div>
              </div>
              <input
                id="rooftop-area"
                type="range"
                min="100"
                max="2500"
                step="50"
                value={rooftopArea}
                onChange={(e) => setRooftopArea(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>100 sq.ft</span>
                <span>1,200 sq.ft</span>
                <span>2,500+ sq.ft</span>
              </div>
            </div>

            {/* Quick Sizing Presets */}
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
                Common Indian Home Presets
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { setMonthlyBill(2500); setRooftopArea(250); }}
                  className="px-2.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition-colors text-center"
                >
                  2-BHK (₹2.5k)
                </button>
                <button
                  type="button"
                  onClick={() => { setMonthlyBill(5500); setRooftopArea(500); }}
                  className="px-2.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition-colors text-center"
                >
                  3-BHK (₹5.5k)
                </button>
                <button
                  type="button"
                  onClick={() => { setMonthlyBill(12000); setRooftopArea(1000); }}
                  className="px-2.5 py-1.5 text-xs text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition-colors text-center"
                >
                  Villa (₹12k)
                </button>
              </div>
            </div>

            {/* National Subsidy Slab Notice */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              <div className="font-semibold flex items-center gap-1.5 mb-1 text-emerald-800">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>PM Surya Ghar DBT Slabs</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                1 kW: ₹30,000 · 2 kW: ₹60,000 · 3 kW and above: ₹78,000 maximum direct subsidy.
              </p>
            </div>

          </div>

          {/* Right: Calculated Results & Financial Breakdown (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Marquee Results Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                    Recommended Rooftop System
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    {calculations.effectiveKw} kWp
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Generates ~{Math.round(calculations.effectiveKw * currentState.solarHoursPerDay * 30 * 0.78)} units (kWh) / month
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                    Total Gov. Subsidy (DBT)
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                    ₹{calculations.totalSubsidy.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Credited directly to your bank account
                  </div>
                </div>
              </div>

              {/* Cost & Savings Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800 text-center sm:text-left">
                <div>
                  <div className="text-xs text-slate-400">Gross Project Cost</div>
                  <div className="text-lg font-bold font-mono text-slate-200 mt-1">
                    ₹{calculations.grossCost.toLocaleString('en-IN')}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Net Cost to You</div>
                  <div className="text-lg font-bold font-mono text-emerald-300 mt-1">
                    ₹{calculations.netInvestment.toLocaleString('en-IN')}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Monthly Bill Savings</div>
                  <div className="text-lg font-bold font-mono text-cyan-300 mt-1">
                    ₹{calculations.monthlySavings.toLocaleString('en-IN')}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Payback Period</div>
                  <div className="text-lg font-bold font-mono text-amber-300 mt-1">
                    {calculations.paybackYears} Years
                  </div>
                </div>
              </div>

              {/* 25-Year Cumulative Impact */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">25-Year Cumulative Savings</div>
                    <div className="text-xl font-bold font-mono text-white">
                      ₹{calculations.cumulativeSavings.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">CO2 Emissions Avoided</div>
                    <div className="text-xl font-bold font-mono text-white">
                      {calculations.annualCo2Tonnes} Tons / yr ({calculations.treesEquivalent} Trees)
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-300">
                  Includes Tier-1 N-Type TOPCon bifacial panels, hybrid-ready inverter, BIS mounting structure, and DISCOM net-metering.
                </p>

                <button
                  type="button"
                  onClick={() => onSelectSystemForQuote({
                    kw: calculations.effectiveKw,
                    stateName: currentState.name,
                    monthlyBill,
                    subsidy: calculations.totalSubsidy
                  })}
                  className="px-6 py-3 text-xs font-semibold text-slate-900 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-md whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Book Free Site Survey for {calculations.effectiveKw} kW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Zero-Down Loan / 0% EMI financing callout */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-xs">
                  0%
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Solar Rooftop Loan Partners (SBI, Canara, PNB, Tata Capital)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Avail 7.00% p.a. concessional interest under PM Surya Ghar. EMI is often lower than your current electricity bill!
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 whitespace-nowrap">
                Zero Collateral Up to 3kW
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
