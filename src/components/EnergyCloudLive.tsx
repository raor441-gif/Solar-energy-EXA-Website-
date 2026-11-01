/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, BatteryCharging, Home, Zap, Shield, ArrowRight, Activity, Smartphone } from 'lucide-react';

interface EnergyCloudLiveProps {
  onOpenAssessment: () => void;
}

type ScenarioMode = 'afternoon' | 'evening' | 'outage';

export const EnergyCloudLive: React.FC<EnergyCloudLiveProps> = ({ onOpenAssessment }) => {
  const [scenario, setScenario] = useState<ScenarioMode>('afternoon');

  const getScenarioData = () => {
    switch (scenario) {
      case 'afternoon':
        return {
          solarKw: 5.64,
          homeKw: 1.82,
          batteryKw: 2.15,
          batteryStatus: 'Charging (86%)',
          batterySoc: 86,
          gridKw: 1.67,
          gridStatus: 'Exporting to DISCOM (+₹12.4/hr Credit)',
          gridExporting: true,
          modeDescription: 'Peak solar generation powers the house, tops up the Exa LiFePO4 wall battery, and exports surplus clean energy into the state electrical grid.'
        };
      case 'evening':
        return {
          solarKw: 0.12,
          homeKw: 2.85,
          batteryKw: -2.73,
          batteryStatus: 'Discharging (71%)',
          batterySoc: 71,
          gridKw: 0.00,
          gridStatus: 'Zero Grid Import (Zero Bill Mode)',
          gridExporting: false,
          modeDescription: 'Sunset hours: Exa Wall Battery powers home air-conditioning, kitchen induction, and lighting without drawing expensive peak-tariff grid electricity.'
        };
      case 'outage':
        return {
          solarKw: 3.40,
          homeKw: 2.20,
          batteryKw: -1.20,
          batteryStatus: 'Islanded Backup Mode',
          batterySoc: 64,
          gridKw: 0.00,
          gridStatus: 'DISCOM Grid Down (10ms UPS Microgrid)',
          gridExporting: false,
          modeDescription: 'Grid load-shedding detected. Exa Smart Inverter automatically isolated the home in under 10 milliseconds. Uninterrupted power with zero computer restarts or flickering lights.'
        };
    }
  };

  const data = getScenarioData();

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 uppercase tracking-wider mb-2">
              <span>Next-Gen Smart Home Energy Architecture</span>
              <span aria-hidden="true">·</span>
              <span>Exa Energy IoT Cloud Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
              Intelligent Hybrid Solar & Wall Battery Storage
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Control every watt with the Exa Smart Energy ecosystem. 
              Automated power routing coordinates your rooftop panels, home loads, automotive-grade LiFePO4 wall battery, and the utility grid.
            </p>
          </div>

          {/* Scenario Tabs (Interactive filter control per §1.A) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setScenario('afternoon')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                scenario === 'afternoon' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sunny Afternoon
            </button>
            <button
              onClick={() => setScenario('evening')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                scenario === 'evening' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Evening Peak
            </button>
            <button
              onClick={() => setScenario('outage')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                scenario === 'outage' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grid Power Cut
            </button>
          </div>
        </div>

        {/* Main Grid: Telemetry Flow & Sleek Hardware Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Interactive Animated Energy Flow Diagram (lg:col-span-7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 text-white shadow-xl relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Simulated Real-Time Smart Energy Hub (5kW + 13.5kWh Storage)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400">10ms Fast Sync Active</span>
              </div>
            </div>

            {/* Visual Power Flow Hub */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
              
              {/* Node 1: Rooftop Solar */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Solar PV</span>
                  <div className="text-xl font-bold font-mono text-amber-400 mt-0.5">
                    {data.solarKw} kW
                  </div>
                </div>
              </div>

              {/* Node 2: Home Consumption */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Home Load</span>
                  <div className="text-xl font-bold font-mono text-cyan-300 mt-0.5">
                    {data.homeKw} kW
                  </div>
                </div>
              </div>

              {/* Node 3: Exa Wall Battery */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Wall Battery</span>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                    {data.batterySoc}%
                  </div>
                  <span className="text-[10px] text-slate-400">{data.batteryStatus.split(' ')[0]}</span>
                </div>
              </div>

              {/* Node 4: DISCOM Grid */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center flex flex-col justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">DISCOM Net Meter</span>
                  <div className="text-xl font-bold font-mono text-indigo-300 mt-0.5">
                    {data.gridKw > 0 ? `+${data.gridKw} kW` : `${data.gridKw} kW`}
                  </div>
                </div>
              </div>

            </div>

            {/* Scenario Narration */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Shield className="w-4 h-4" />
                <span>Operating State: {data.gridStatus}</span>
              </div>
              <p>{data.modeDescription}</p>
            </div>

            {/* Real-time Battery Health & App Sync */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                <span>Exa Smart App · iOS & Android real-time Bluetooth & Cloud Telemetry</span>
              </div>
              <span className="font-mono text-slate-400">Firmware v2.4 Certified</span>
            </div>

          </div>

          {/* Right Column: Hardware Product Visual (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-xl group">
              <img
                src="/src/assets/images/exa_wall_battery_storage_1793561499605.jpg"
                alt="Exa Wall Battery home energy storage system and smart hybrid solar inverter"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                  Exa Volt Core 13.5 kWh Wall Battery
                </span>
                <p className="text-xs text-slate-200">
                  LiFePO4 modular architecture with built-in thermal cooling and 10-year unlimited cycle warranty.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-800 block">Need Uninterrupted Power Backup?</span>
                <span className="text-slate-500 text-[11px]">Seamless power cuts switchover for computers, CPAP & home ACs.</span>
              </div>
              <button
                type="button"
                onClick={onOpenAssessment}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-emerald-700 transition-colors shrink-0"
              >
                Inquire System
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
