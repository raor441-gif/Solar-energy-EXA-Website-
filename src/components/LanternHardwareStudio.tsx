/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layers, ShieldCheck, Sun, BatteryCharging, Smartphone, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';

interface LanternHardwareStudioProps {
  onOpenAssessment: () => void;
}

interface ComponentSpec {
  id: string;
  name: string;
  title: string;
  highlight: string;
  description: string;
  material: string;
  lifespan: string;
}

export const LanternHardwareStudio: React.FC<LanternHardwareStudioProps> = ({ onOpenAssessment }) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>('battery');

  const components: ComponentSpec[] = [
    {
      id: 'battery',
      name: '01. LiFePO4 Battery Cell',
      title: 'Automotive Grade Lithium Iron Phosphate (LiFePO4)',
      highlight: '2,000+ Deep Cycles · 6+ Years Daily Life',
      description: 'Unlike cheap lead-acid or volatile ternary lithium batteries, LiFePO4 chemistry cannot catch fire or explode even under 50°C Indian summer storage. Maintains >80% retention after 6 years of daily night use.',
      material: 'Grade-A 32700 LiFePO4 Cylindrical Cells with active thermal BMS',
      lifespan: '2,000+ Cycles (vs 350 cycles in conventional lanterns)'
    },
    {
      id: 'led',
      name: '02. Sun-Spectrum LED Ring',
      title: 'CRI 90+ Eye-Safe 4000K Study Illumination',
      highlight: 'Zero Blue-Light Hazard · Flicker-Free Diffuser',
      description: 'Engineered specifically for rural students studying for Indian board examinations. Standard harsh cool LEDs cause severe ocular fatigue; Exa uses warm sun-spectrum LEDs certified for photobiological safety (IEC 62471).',
      material: 'Samsung Pro SMD 2835 LEDs with frosted optical polycarbonate lens',
      lifespan: '50,000 Operating Hours'
    },
    {
      id: 'pv',
      name: '03. Monocrystalline Solar Top',
      title: 'Integrated High-Transmittance PV Lid',
      highlight: '22.4% Cell Efficiency · Fast 5.5hr Full Charge',
      description: 'Features high-purity monocrystalline silicon cells encapsulated under UV-stabilized tempered composite. Charges effectively even on overcast monsoon mornings.',
      material: 'N-Type Monocrystalline Silicon with ETFE anti-reflective laminate',
      lifespan: '15+ Years PV Retention'
    },
    {
      id: 'casing',
      name: '04. Impact Armor Shell',
      title: 'IP65 Water & Heavy Dust Monoblock Enclosure',
      highlight: '1.5-Meter Concrete Drop Tested',
      description: 'Molded from virgin SABIC polycarbonate with silicone gasket seals. Resists torrential Indian monsoon rains, sandstorms in Rajasthan, and mud in coastal deltas.',
      material: 'Virgin Bayer / Sabic High-Impact Polycarbonate (UL94-V0 Fire Retardant)',
      lifespan: 'Heavy-Duty Shockproof Construction'
    },
    {
      id: 'powerbank',
      name: '05. Type-C & USB Power Bank',
      title: '5V/2A High-Current Mobile Charging Engine',
      highlight: 'Charges Feature Phones & 5G Smartphones',
      description: 'Equipped with a bi-directional Type-C charging port plus a sealed USB-A power delivery port to keep smartphones connected during multi-day grid blackouts and storms.',
      material: 'Gold-plated connectors with waterproof silicone port cap',
      lifespan: '10,000+ Insertion Cycles'
    }
  ];

  const currentComp = components.find(c => c.id === selectedComponentId) || components[0];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>Hardware Teardown & Engineering Quality</span>
            <span aria-hidden="true">·</span>
            <span>Inside the Exa Solar Lantern</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Precision Engineering for Rural Resilience & Longevity
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Most market lanterns fail within 6 months due to cheap lead-acid batteries and corrosive soldered joints. 
            Exa Energy designs its lanterns with industrial-grade modular components engineered to last over 6 years of daily use.
          </p>
        </div>

        {/* 2-Column Hardware Anatomy Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Documentary Proof & Field Quality (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md group">
              <img
                src="/src/assets/images/exa_lantern_evening_study_1793561499279.jpg"
                alt="Indian school children studying with Exa clean solar light in a rural village"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-semibold block mb-1">
                  Field Reality · Zero Kerosene Fumes
                </span>
                <p className="text-xs text-slate-200">
                  Children in rural Bihar study under warm 4000K flicker-free light. Safe from toxic kerosene smoke and open flame burn hazards.
                </p>
              </div>
            </div>

            {/* Quality Certifications */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-900">IEC 62257-9-8 Lighting Global Standard</span>
              </div>
              <span className="text-slate-400 font-mono">BEE 5-Star Rated</span>
            </div>

          </div>

          {/* Right Column: Interactive Hardware Explorer (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            
            <div>
              {/* Component Selector Buttons */}
              <div className="flex flex-wrap gap-2 mb-6 pb-4 border-b border-slate-100">
                {components.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponentId(comp.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                      selectedComponentId === comp.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {comp.name}
                  </button>
                ))}
              </div>

              {/* Active Component Deep Dive */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Component Specification
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">
                    {currentComp.title}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{currentComp.highlight}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed pt-2">
                  {currentComp.description}
                </p>

                {/* Technical Materials Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Material Composition</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{currentComp.material}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[11px] text-slate-400 block font-medium">Durability / Lifespan Rating</span>
                    <span className="text-xs font-bold text-emerald-700 font-mono mt-0.5 block">{currentComp.lifespan}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Inquiry Action */}
            <div className="pt-8 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Available in retail packs of 1, school packs of 25, and village CSR containers of 500+.
              </span>

              <button
                type="button"
                onClick={onOpenAssessment}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
              >
                <span>Request Sample or Bulk Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
