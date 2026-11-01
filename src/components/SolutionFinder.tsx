/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Home, Building2, Lightbulb, Sprout, ArrowRight, Check, Sparkles } from 'lucide-react';

interface SolutionFinderProps {
  onOpenAssessment: () => void;
}

type UserCategory = 'residential' | 'commercial' | 'lanterns' | 'agri';

export const SolutionFinder: React.FC<SolutionFinderProps> = ({ onOpenAssessment }) => {
  const [category, setCategory] = useState<UserCategory>('residential');
  const [backupNeed, setBackupNeed] = useState<'grid-tied' | 'hybrid-battery' | 'portable'>('grid-tied');

  const getRecommendation = () => {
    switch (category) {
      case 'residential':
        return {
          title: backupNeed === 'hybrid-battery' ? 'Exa Hybrid Residential System (3-5 kW)' : 'Exa Grid-Tied PM Surya Ghar System (3 kW)',
          tagline: backupNeed === 'hybrid-battery' 
            ? 'Includes 5kWh wall-mounted LiFePO4 battery pack for 24/7 backup during Indian power cuts.' 
            : 'Standard net-metered rooftop array maximizing PM Surya Ghar direct cash subsidy.',
          panelModel: 'Exa Apex 580W TOPCon Bifacial (6 to 8 Modules)',
          inverter: backupNeed === 'hybrid-battery' ? 'Exa Smart Hybrid 5kW Bi-Directional Inverter' : 'On-Grid String Inverter with Wi-Fi Telemetry',
          estSubsidy: '₹78,000 Direct Central DBT Subsidy',
          roi: '2.8 – 3.2 Years Payback',
          warranty: '25-Year Linear Power Warranty'
        };
      case 'commercial':
        return {
          title: 'Exa Commercial & Industrial EPC (50 kW – 500 kW)',
          tagline: 'Custom industrial metal shed or RCC roof engineering designed to cut peak industrial demand tariffs.',
          panelModel: 'Exa Titan 620W N-Type Commercial Bifacial Modules',
          inverter: 'Industrial Multi-MPPT String Inverters with SCADA & Zero-Export Control',
          estSubsidy: '40% Accelerated Depreciation (Section 32 Tax Benefits)',
          roi: '2.4 – 3.0 Years Payback',
          warranty: 'Comprehensive 5-Year Operations & Maintenance (O&M)'
        };
      case 'lanterns':
        return {
          title: 'ExaGlow Portable Solar Clean Light Package',
          tagline: 'Ideal for rural households, farm visits, camping, and emergency domestic blackouts.',
          panelModel: 'Integrated 3.5W Mono PV + Auxiliary Detachable 5W Panel',
          inverter: 'Built-in MPPT Solar Charge Controller + 6000mAh LiFePO4 Storage',
          estSubsidy: 'Special CSR / NGO subsidized batch pricing',
          roi: 'Instant replacement of toxic kerosene fuel expenses',
          warranty: '2-Year Replacement Warranty'
        };
      case 'agri':
        return {
          title: 'Exa Agri-Pump Solar Irrigation System (3HP – 7.5HP)',
          tagline: 'Solar-powered water pumping replacing diesel generators for drip and flood irrigation.',
          panelModel: 'Exa High-Durability Polycrystalline / Mono High-Vmp Solar Array',
          inverter: 'Variable Frequency Drive (VFD) Solar Pump Controller with Dry-Run Sensor',
          estSubsidy: 'Up to 60% Subsidized under PM-KUSUM Component B',
          roi: '1.8 Years against diesel fuel',
          warranty: '5-Year Onsite Field Warranty'
        };
    }
  };

  const rec = getRecommendation();

  return (
    <section id="solutions" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 uppercase tracking-wider mb-2">
            <span>Tailored Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Find Your Ideal Solar Solution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Choose the Perfect Clean Energy Fit for Your Needs
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Whether you are an urban homeowner aiming for a zero electricity bill, a factory manager, 
            or a rural community seeking clean solar lanterns — Exa Energy delivers end-to-end reliability.
          </p>
        </div>

        {/* 4 Category Selector Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <button
            type="button"
            onClick={() => setCategory('residential')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              category === 'residential'
                ? 'border-emerald-600 bg-emerald-50/50 text-slate-900 ring-2 ring-emerald-600/20 shadow-sm'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${category === 'residential' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              <Home className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Residential Rooftop</div>
            <p className="text-xs text-slate-500 mt-1">
              Bungalows, villas, apartments (1 to 10 kW)
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCategory('commercial')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              category === 'commercial'
                ? 'border-emerald-600 bg-emerald-50/50 text-slate-900 ring-2 ring-emerald-600/20 shadow-sm'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${category === 'commercial' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Commercial & Factory</div>
            <p className="text-xs text-slate-500 mt-1">
              Warehouses, schools, textile mills (20 kW+)
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCategory('lanterns')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              category === 'lanterns'
                ? 'border-emerald-600 bg-emerald-50/50 text-slate-900 ring-2 ring-emerald-600/20 shadow-sm'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${category === 'lanterns' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              <Lightbulb className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Solar Lanterns & Off-Grid</div>
            <p className="text-xs text-slate-500 mt-1">
              Rural study lights, camping, emergency power
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCategory('agri')}
            className={`p-5 rounded-2xl border text-left transition-all ${
              category === 'agri'
                ? 'border-emerald-600 bg-emerald-50/50 text-slate-900 ring-2 ring-emerald-600/20 shadow-sm'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${category === 'agri' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
              <Sprout className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold">Agri-Pumps (PM-KUSUM)</div>
            <p className="text-xs text-slate-500 mt-1">
              Solar water pumps for Indian agriculture
            </p>
          </button>

        </div>

        {/* Dynamic Recommendation Panel */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Turnkey Solution</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {rec.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                {rec.tagline}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenAssessment}
              className="px-6 py-3 text-xs font-semibold text-slate-900 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-md whitespace-nowrap shrink-0 flex items-center gap-2"
            >
              <span>Get Detailed Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Solution Spec Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 block">Photovoltaic Modules</span>
              <span className="text-xs font-bold text-white mt-1 block">{rec.panelModel}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 block">Inverter & Storage</span>
              <span className="text-xs font-bold text-white mt-1 block">{rec.inverter}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 block">Financial Benefit / Subsidy</span>
              <span className="text-xs font-bold text-emerald-400 mt-1 block">{rec.estSubsidy}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[11px] text-slate-400 block">Financial Payback & Warranty</span>
              <span className="text-xs font-bold text-cyan-300 mt-1 block">{rec.roi} · {rec.warranty}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
