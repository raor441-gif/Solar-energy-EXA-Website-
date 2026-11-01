/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { IndianRupee, Landmark, TrendingUp, ShieldCheck, ArrowRight, Check, Percent } from 'lucide-react';
import { calculatePmSuryaGharSubsidy } from '../data/solarData';

interface LoanFinancialsProps {
  onOpenAssessment: () => void;
}

export const LoanFinancials: React.FC<LoanFinancialsProps> = ({ onOpenAssessment }) => {
  const [systemSizeKw, setSystemSizeKw] = useState<number>(3);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(10); // 10%
  const [tenureYears, setTenureYears] = useState<number>(5); // 5 years (60 months)
  const interestRateAnnual = 7.0; // 7.00% concessional PM Surya Ghar loan rate

  // Financial calculations
  const financials = useMemo(() => {
    const grossCost = systemSizeKw * 62000;
    const centralSubsidy = calculatePmSuryaGharSubsidy(systemSizeKw);
    const netProjectCost = Math.max(0, grossCost - centralSubsidy);

    const downPaymentAmount = Math.round(netProjectCost * (downPaymentPercent / 100));
    const loanPrincipal = netProjectCost - downPaymentAmount;

    // Monthly interest calculation (EMI formula: P * r * (1+r)^n / ((1+r)^n - 1))
    const monthlyRate = (interestRateAnnual / 100) / 12;
    const totalMonths = tenureYears * 12;
    
    let monthlyEmi = 0;
    if (loanPrincipal > 0 && monthlyRate > 0) {
      monthlyEmi = Math.round(
        (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      );
    }

    // Monthly bill savings (3kW generates ~360 units @ ~₹8/unit = ~₹2,880/mo; 5kW = ~₹4,800/mo)
    const monthlyUnits = systemSizeKw * 120;
    const avgTariff = 8.2; // national average
    const monthlyBillSaved = Math.round(monthlyUnits * avgTariff);

    // Net Monthly Cashflow (Savings minus EMI)
    const netMonthlySurplus = monthlyBillSaved - monthlyEmi;

    return {
      grossCost,
      centralSubsidy,
      netProjectCost,
      downPaymentAmount,
      loanPrincipal,
      monthlyEmi,
      monthlyBillSaved,
      netMonthlySurplus,
      isPositiveCashflow: netMonthlySurplus >= 0
    };
  }, [systemSizeKw, downPaymentPercent, tenureYears]);

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Concessional Financial Engineering</span>
            <span aria-hidden="true">·</span>
            <span>PM Surya Ghar Solar Loans @ 7.00% p.a.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Zero-Down Solar Financing: Your Solar Pays for Itself
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Avail repo-linked 7.00% p.a. solar rooftop loans with zero collateral up to 3 kW from State Bank of India, 
            Canara Bank, and Punjab National Bank. Your monthly electricity bill savings exceed the loan EMI from Month 1.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Loan Input Controls (lg:col-span-5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-6">
            
            {/* System Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="system-size-loan" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  1. Plant Capacity (kWp)
                </label>
                <span className="text-base font-bold font-mono text-emerald-800">
                  {systemSizeKw} kWp System
                </span>
              </div>
              <input
                id="system-size-loan"
                type="range"
                min="1"
                max="10"
                step="1"
                value={systemSizeKw}
                onChange={(e) => setSystemSizeKw(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>1 kW</span>
                <span>3 kW (Most Popular)</span>
                <span>10 kW</span>
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="down-payment-loan" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  2. Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-base font-bold font-mono text-slate-900">
                  ₹{financials.downPaymentAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                id="down-payment-loan"
                type="range"
                min="0"
                max="30"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>0% Down (₹0)</span>
                <span>10%</span>
                <span>30%</span>
              </div>
            </div>

            {/* Loan Tenure Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="loan-tenure" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  3. Loan Tenure
                </label>
                <span className="text-base font-bold font-mono text-slate-900">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                id="loan-tenure"
                type="range"
                min="3"
                max="10"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                <span>3 Years</span>
                <span>5 Years (Standard)</span>
                <span>10 Years (Low EMI)</span>
              </div>
            </div>

            {/* Bank Partner Logos/Notice */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Authorized Nationalized Lending Partners
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>State Bank of India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Canara Bank</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Punjab National Bank</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Tata Capital / IREDA</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Net Cashflow Breakdown (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl flex flex-col justify-between">
            
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                    Monthly Loan Payment vs Electricity Savings
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Net Monthly Cash in Your Pocket
                  </h3>
                </div>

                <div className="text-right">
                  <div className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${financials.isPositiveCashflow ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {financials.isPositiveCashflow ? `+₹${financials.netMonthlySurplus.toLocaleString('en-IN')}` : `-₹${Math.abs(financials.netMonthlySurplus).toLocaleString('en-IN')}`}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">Monthly Cash Surplus</span>
                </div>
              </div>

              {/* Cashflow Comparison 3-Column */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
                
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs text-slate-400 block">Monthly Bill Saved</span>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                    ₹{financials.monthlyBillSaved.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">From solar generation</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs text-slate-400 block">Monthly Bank EMI</span>
                  <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                    ₹{financials.monthlyEmi.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">@ 7.00% interest rate</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-xs text-slate-400 block">Net Govt Subsidy (DBT)</span>
                  <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
                    ₹{financials.centralSubsidy.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Credited to bank directly</span>
                </div>

              </div>

              {/* Explanatory Note */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300 leading-relaxed space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-4 h-4" />
                  <span>How does zero-cost solar work?</span>
                </div>
                <p>
                  Instead of paying ₹{financials.monthlyBillSaved.toLocaleString('en-IN')} every month to the electricity company forever, 
                  you pay only ₹{financials.monthlyEmi.toLocaleString('en-IN')} to the bank for {tenureYears} years. 
                  After the loan finishes, your electricity remains <strong>100% free for the next 20+ years</strong>!
                </p>
              </div>

            </div>

            {/* Action */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span>Exa liaison team assists with paperwork and fast sanction on JanSamarth portal.</span>
              </div>

              <button
                type="button"
                onClick={onOpenAssessment}
                className="px-6 py-3 text-xs font-semibold text-slate-900 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-md whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
              >
                <span>Apply for 7.00% Solar Loan & Site Survey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
