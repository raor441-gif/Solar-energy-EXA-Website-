/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, MapPin, Wind, Thermometer, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

interface CitySolarData {
  city: string;
  state: string;
  sunHours: number;
  irradianceWm2: number;
  tempC: number;
  discom: string;
  annualSolarDays: number;
  policyRating: string;
  topconGainFactor: string;
}

const INDIAN_SOLAR_HUBS: CitySolarData[] = [
  {
    city: 'Jaipur / Jodhpur',
    state: 'Rajasthan',
    sunHours: 5.9,
    irradianceWm2: 1040,
    tempC: 34,
    discom: 'JVVNL / JdVVNL',
    annualSolarDays: 325,
    policyRating: 'Grade A+ (Prime Solar Corridor)',
    topconGainFactor: '+24% Bifacial Gain on desert ground/sand'
  },
  {
    city: 'Bengaluru',
    state: 'Karnataka',
    sunHours: 5.2,
    irradianceWm2: 890,
    tempC: 27,
    discom: 'BESCOM',
    annualSolarDays: 290,
    policyRating: 'Grade A (Instant Net-Meter Portal)',
    topconGainFactor: '+18% Albedo Boost on white reflective roofs'
  },
  {
    city: 'Pune / Mumbai',
    state: 'Maharashtra',
    sunHours: 5.3,
    irradianceWm2: 920,
    tempC: 31,
    discom: 'MSEDCL / Adani',
    annualSolarDays: 300,
    policyRating: 'Grade A (Highest C&I Industrial Tariffs)',
    topconGainFactor: '+20% High-Temperature Resilience'
  },
  {
    city: 'Ahmedabad / Surat',
    state: 'Gujarat',
    sunHours: 5.7,
    irradianceWm2: 990,
    tempC: 33,
    discom: 'UGVCL / Torrent Power',
    annualSolarDays: 315,
    policyRating: 'Grade A+ (#1 Rooftop Solar State in India)',
    topconGainFactor: '+22% Bifacial Industrial Metal Shed Gain'
  },
  {
    city: 'New Delhi (NCR)',
    state: 'Delhi',
    sunHours: 5.0,
    irradianceWm2: 860,
    tempC: 29,
    discom: 'BSES Rajdhani / Yamuna / TPDDL',
    annualSolarDays: 280,
    policyRating: 'Grade A+ (Additional State Subsidy ₹2,000/kW)',
    topconGainFactor: 'Anti-smog high transmittance glass'
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    sunHours: 5.3,
    irradianceWm2: 910,
    tempC: 32,
    discom: 'TSSPDCL',
    annualSolarDays: 305,
    policyRating: 'Grade A (Fast Track Net Metering)',
    topconGainFactor: '+19% Low light morning response'
  }
];

interface IndiaSolarRadarProps {
  onOpenAssessment: () => void;
}

export const IndiaSolarRadar: React.FC<IndiaSolarRadarProps> = ({ onOpenAssessment }) => {
  const [selectedCityIdx, setSelectedCityIdx] = useState<number>(0);
  const city = INDIAN_SOLAR_HUBS[selectedCityIdx];

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <span>National Solar Irradiance Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Regional Solar Potential</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Pan-India Solar Irradiance & DISCOM Radar
          </h2>
          <p className="mt-3 text-base text-slate-300">
            India receives over 300 clear sunny days every year with an average solar insolation of 4.5 to 6.0 kWh/m²/day. 
            Select your region below to view local insolation parameters and Exa engineering tuning.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-slate-800/80 rounded-xl w-fit border border-slate-700">
          {INDIAN_SOLAR_HUBS.map((hub, idx) => (
            <button
              key={hub.city}
              onClick={() => setSelectedCityIdx(idx)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedCityIdx === idx
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {hub.city}
            </button>
          ))}
        </div>

        {/* Radar Metrics Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Marquee Metrics for City (lg:col-span-8) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {city.city}, {city.state}
                  </h3>
                  <span className="text-xs text-slate-400">DISCOM: {city.discom}</span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
                {city.policyRating}
              </div>
            </div>

            {/* 4 Telemetry Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Peak Sun Hours</span>
                </div>
                <div className="text-2xl font-bold font-mono text-amber-400">
                  {city.sunHours} hrs/day
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">Direct usable insolation</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Peak Irradiance</span>
                </div>
                <div className="text-2xl font-bold font-mono text-cyan-300">
                  {city.irradianceWm2} W/m²
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">Noon radiation intensity</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Thermometer className="w-4 h-4 text-rose-400" />
                  <span>Avg Ambient Temp</span>
                </div>
                <div className="text-2xl font-bold font-mono text-rose-300">
                  {city.tempC}°C
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">Exa TOPCon low derate</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  <span>Annual Sunny Days</span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {city.annualSolarDays} Days
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">High annual generation</span>
              </div>

            </div>

            {/* Engineering Tuning Callout */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Exa Engineering Tuning for this Region:</span>
                <span className="text-slate-300">{city.topconGainFactor}. Structural mounting designed for local wind velocity and dust deposition patterns.</span>
              </div>
            </div>

          </div>

          {/* Right Column: CTA Panel (lg:col-span-4) */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-slate-800 border border-slate-700 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold block mb-1">
                Local EPC Installation Hub
              </span>
              <h4 className="text-xl font-bold text-white">
                Rooftop Solar in {city.city}
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Exa Energy operates regional engineering warehouses and certified solar installation crews in {city.city}. 
                We manage the entire liaison process with {city.discom} for bidirectional net meter installation.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-700">
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Site Survey SLA:</span>
                <span className="font-semibold text-white">Within 48 Hours</span>
              </div>
              <div className="text-xs text-slate-400 flex items-center justify-between">
                <span>Net Metering Process:</span>
                <span className="font-semibold text-emerald-400">Handled End-to-End</span>
              </div>

              <button
                type="button"
                onClick={onOpenAssessment}
                className="w-full py-3 px-4 text-xs font-semibold text-slate-950 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
              >
                <span>Book Site Survey in {city.city.split('/')[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
