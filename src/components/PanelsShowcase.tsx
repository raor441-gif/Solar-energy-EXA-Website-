/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SOLAR_PANELS, SolarPanelProduct } from '../data/solarData';
import { Check, ShieldCheck, Download, Layers, SunMedium, Flame, Zap, FileText } from 'lucide-react';
import { DatasheetModal } from './DatasheetModal';

interface PanelsShowcaseProps {
  onOpenAssessment: () => void;
}

export const PanelsShowcase: React.FC<PanelsShowcaseProps> = ({ onOpenAssessment }) => {
  const [selectedPanel, setSelectedPanel] = useState<SolarPanelProduct>(SOLAR_PANELS[0]);
  const [activeTab, setActiveTab] = useState<'electrical' | 'mechanical' | 'warranty'>('electrical');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isDatasheetModalOpen, setIsDatasheetModalOpen] = useState(false);

  const handleDownloadDatasheet = (panelName: string) => {
    setIsDatasheetModalOpen(true);
    setDownloadSuccess(panelName);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3500);
  };

  return (
    <section id="panels" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 uppercase tracking-wider mb-2">
            <span>Photovoltaic Engineering</span>
            <span aria-hidden="true">·</span>
            <span>N-Type TOPCon & Bifacial Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Engineered for India’s High-Heat & High-Dust Terrains
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Exa Energy manufactures and deploys advanced N-Type TOPCon bifacial modules with dual-tempered glass, 
            zero light-induced degradation (LID), and superior thermal coefficients to withstand Indian summer temperatures up to 50°C.
          </p>
        </div>

        {/* Product Selector Filter Tabs (Interactive filter control per §1.A) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-200/70 rounded-xl w-fit">
          {SOLAR_PANELS.map((panel) => (
            <button
              key={panel.id}
              onClick={() => setSelectedPanel(panel)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedPanel.id === panel.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {panel.name} ({panel.powerRating.split(' ')[0]})
            </button>
          ))}
        </div>

        {/* Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Asset & Macro Detail */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md group">
              <img
                src="/src/assets/images/solar_panels_bifacial_detail_1793559133312.jpg"
                alt="Microscopic cell busbar structure of Exa Energy TOPCon solar panel"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-semibold block mb-1">
                  16-Busbar (SMBB) Half-Cut Architecture
                </span>
                <p className="text-xs text-slate-300 leading-snug">
                  Ultra-fine silver contacts minimize shadow loss and internal electrical resistance, boosting low-light generation on foggy winter mornings.
                </p>
              </div>
            </div>

            {/* Certifications strip */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">ALMM Approved & BIS Certified</span>
              </div>
              <span className="text-slate-400">IS 14286 / IEC 61215</span>
            </div>
          </div>

          {/* Right Column: Technical Specs & Interactive Inspector */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            
            <div>
              {/* Product Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
                    {selectedPanel.series}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    {selectedPanel.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-xl">
                    {selectedPanel.tagline}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700">
                    {selectedPanel.efficiency}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Peak Efficiency</span>
                </div>
              </div>

              {/* Sub-Tabs: Electrical vs Mechanical vs Warranty */}
              <div className="flex items-center gap-2 my-6 p-1 bg-slate-100 rounded-lg w-fit">
                <button
                  onClick={() => setActiveTab('electrical')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'electrical' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Electrical Metrics
                </button>
                <button
                  onClick={() => setActiveTab('mechanical')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'mechanical' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mechanical & Glass
                </button>
                <button
                  onClick={() => setActiveTab('warranty')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    activeTab === 'warranty' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Warranty & ALMM
                </button>
              </div>

              {/* Tab Content 1: Electrical Metrics */}
              {activeTab === 'electrical' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Rated Power (Pmax)</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{selectedPanel.powerRating}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Cell Architecture</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{selectedPanel.cellTech.split(' ')[0]} TOPCon</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Temp Coefficient (Pmax)</span>
                    <span className="text-sm font-bold font-mono text-emerald-700">{selectedPanel.tempCoefficient.split(' ')[0]}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Bifacial Energy Gain</span>
                    <span className="text-sm font-bold font-mono text-cyan-700">{selectedPanel.bifacialGain.split(' ')[0]}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Maximum System Voltage</span>
                    <span className="text-sm font-bold font-mono text-slate-900">1500 V DC</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Junction Box Rating</span>
                    <span className="text-sm font-bold font-mono text-slate-900">IP68 (3 Diodes)</span>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Mechanical & Glass */}
              {activeTab === 'mechanical' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Dimensions</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{selectedPanel.dimensions}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Weight</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{selectedPanel.weight}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Front Glass</span>
                    <span className="text-sm font-bold font-mono text-slate-900">2.0mm AR Coated</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Frame Material</span>
                    <span className="text-sm font-bold font-mono text-slate-900">Anodized Al Alloy</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Wind / Snow Load</span>
                    <span className="text-sm font-bold font-mono text-slate-900">2400 / 5400 Pa</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Connector Type</span>
                    <span className="text-sm font-bold font-mono text-slate-900">MC4-EVO2 Original</span>
                  </div>
                </div>
              )}

              {/* Tab Content 3: Warranty & Compliance */}
              {activeTab === 'warranty' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Performance Guarantee</span>
                    <span className="text-sm font-bold font-mono text-emerald-700">30-Year Linear (87.4%)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Product Workmanship</span>
                    <span className="text-sm font-bold font-mono text-slate-900">12-Year On-Site</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">National Listing</span>
                    <span className="text-sm font-bold font-mono text-emerald-700">ALMM Order Listed</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Indian Standard</span>
                    <span className="text-sm font-bold font-mono text-slate-900">IS 14286 : 2010</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Salt Mist Resistance</span>
                    <span className="text-sm font-bold font-mono text-slate-900">IEC 61701 Severity 6</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Ammonia Resistance</span>
                    <span className="text-sm font-bold font-mono text-slate-900">IEC 62716 Certified</span>
                  </div>
                </div>
              )}

              {/* Key Features Bullet List */}
              <div className="space-y-2 mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
                  Key Advantages for Indian Climate
                </span>
                {selectedPanel.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-slate-500 block">Recommended Application:</span>
                <span className="text-xs font-semibold text-slate-800">{selectedPanel.bestFor}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleDownloadDatasheet(selectedPanel.name)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-2 whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Datasheet (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap"
                >
                  Request Commercial Pricing
                </button>
              </div>
            </div>

            {/* Download feedback confirmation toast */}
            {downloadSuccess && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-fade-in">
                <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Downloaded verified technical specification sheet for <strong>{downloadSuccess}</strong> (Rev 2026.1).
                </span>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Engineering Datasheet Modal */}
      <DatasheetModal
        isOpen={isDatasheetModalOpen}
        onClose={() => setIsDatasheetModalOpen(false)}
        panel={selectedPanel}
      />
    </section>
  );
};
