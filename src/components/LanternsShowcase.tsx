/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SOLAR_LANTERNS, SolarLanternProduct } from '../data/solarData';
import { Sun, BatteryCharging, Smartphone, Shield, Lightbulb, Clock, Check, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';

interface LanternsShowcaseProps {
  onOpenAssessment: () => void;
}

export const LanternsShowcase: React.FC<LanternsShowcaseProps> = ({ onOpenAssessment }) => {
  const [selectedLantern, setSelectedLantern] = useState<SolarLanternProduct>(SOLAR_LANTERNS[0]);
  const [activeModeIdx, setActiveModeIdx] = useState<number>(1); // default to student reading mode
  const [isPhoneConnected, setIsPhoneConnected] = useState<boolean>(false);
  const [brightnessPercent, setBrightnessPercent] = useState<number>(65);

  const currentMode = selectedLantern.lightingModes[activeModeIdx] || selectedLantern.lightingModes[0];

  // Dynamic calculation of runtime based on brightness slider and phone charging
  const calculatedRuntimeHours = Math.max(
    2,
    Math.round((currentMode.hours * (100 / Math.max(20, brightnessPercent))) * (isPhoneConnected ? 0.6 : 1.0))
  );

  return (
    <section id="lanterns" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Clean Light Innovation</span>
            <span aria-hidden="true">·</span>
            <span>Exa Solar Lanterns & Portable Clean Power</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            Empowering Rural Homes & Outdoor Living with Rugged Solar Light
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Engineered to replace hazardous kerosene lamps in rural India and provide reliable emergency illumination 
            during monsoon grid failures. Built with automotive-grade LiFePO4 batteries and built-in smartphone charging.
          </p>
        </div>

        {/* Lantern Product Selectors (Filter bar per §1.A) */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-100 rounded-xl w-fit">
          {SOLAR_LANTERNS.map((lantern) => (
            <button
              key={lantern.id}
              onClick={() => {
                setSelectedLantern(lantern);
                setActiveModeIdx(0);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedLantern.id === lantern.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lantern.name}
            </button>
          ))}
        </div>

        {/* Main Grid: Visuals & Interactive Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Visual & Interactive Light Halo (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-lg group">
              
              {/* Dynamic Aura Glow based on simulated brightness */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
                style={{
                  background: `radial-gradient(circle at 50% 60%, rgba(254, 240, 138, ${brightnessPercent / 220}) 0%, rgba(251, 191, 36, ${brightnessPercent / 500}) 40%, transparent 75%)`
                }}
              />

              <img
                src="/src/assets/images/solar_lanterns_clean_tech_1793559132656.jpg"
                alt="Exa Solar Lantern clean technology portable light"
                className="w-full h-80 sm:h-96 object-cover relative z-0 group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none z-10" />

              {/* Dynamic Status Badges over Visual */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-semibold">{currentMode.name}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-amber-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{calculatedRuntimeHours}h Runtime Remaining</span>
                </div>
              </div>

            </div>

            {/* Quick Specs Under Image */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">Battery Chemistry</span>
                <span className="font-bold text-slate-900 font-mono">LiFePO4 2000+ Cycles</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">Water & Dust</span>
                <span className="font-bold text-emerald-700 font-mono">{selectedLantern.waterproofRating.split(' ')[0]}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-[10px] text-slate-500 block">Unit Weight</span>
                <span className="font-bold text-slate-900 font-mono">{selectedLantern.weight.split(' ')[0]}g</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Light & Battery Simulator (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between">
            
            <div>
              
              {/* Product Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Model: {selectedLantern.model}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                    {selectedLantern.name}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-xl">
                    {selectedLantern.tagline}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-800">
                    {selectedLantern.runtime.split(' ')[2]}h
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Max Battery Backup</span>
                </div>
              </div>

              {/* Interactive Lighting Simulator Box */}
              <div className="my-6 p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-5">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Interactive Lighting Mode Tester
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    Click to test illumination levels
                  </span>
                </div>

                {/* Mode Buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedLantern.lightingModes.map((mode, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setActiveModeIdx(idx);
                        setBrightnessPercent(idx === 0 ? 30 : idx === 1 ? 60 : idx === 2 ? 100 : 75);
                      }}
                      className={`p-2.5 rounded-lg border text-left transition-all ${
                        activeModeIdx === idx
                          ? 'border-emerald-600 bg-emerald-50/60 text-emerald-950 ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{mode.name}</div>
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        {mode.lumens} Lumens · {mode.hours}h
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active Mode Description */}
                <div className="p-3 rounded-lg bg-slate-50 text-xs text-slate-600 flex items-start gap-2 border border-slate-100">
                  <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900">{currentMode.name}: </span>
                    <span>{currentMode.description}</span>
                  </div>
                </div>

                {/* Brightness Adjustment Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                    <span>Dimmer / Brightness Control:</span>
                    <span className="font-mono font-bold text-slate-900">{brightnessPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="5"
                    value={brightnessPercent}
                    onChange={(e) => setBrightnessPercent(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Simulated USB Mobile Phone Charging Feature */}
                {selectedLantern.mobileCharging && (
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isPhoneConnected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800">
                          Emergency 5V USB Phone Charging Port
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {isPhoneConnected 
                            ? 'Phone Connected: Delivering 5V/2A Fast Clean Output' 
                            : 'Test outputting power to charge mobile phones during blackouts'}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPhoneConnected(!isPhoneConnected)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        isPhoneConnected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isPhoneConnected ? 'Disconnect Phone' : 'Connect Test Phone'}
                    </button>
                  </div>
                )}

              </div>

              {/* Lantern Feature Highlights */}
              <div className="space-y-2 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 block mb-2">
                  Engineered Advantages
                </span>
                {selectedLantern.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Inquiry Strip */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span>Available for retail, rural distribution, CSR bulk orders & NGOs.</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenAssessment}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Inquire for Retail & CSR Orders</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
