/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Printer, Download, Check, ShieldCheck, Sun, Layers } from 'lucide-react';
import { SOLAR_PANELS, SolarPanelProduct } from '../data/solarData';

interface DatasheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  panel?: SolarPanelProduct;
}

export const DatasheetModal: React.FC<DatasheetModalProps> = ({
  isOpen,
  onClose,
  panel = SOLAR_PANELS[0]
}) => {
  const [selectedIrradiance, setSelectedIrradiance] = useState<number>(1000);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-900 text-white">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 font-semibold block">
              Official Engineering Datasheet · Exa Energy Private Limited
            </span>
            <h3 className="text-base font-bold text-white">
              {panel.name} — Technical Specification & I-V Curves
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Print Specification"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-xs text-slate-700">
          
          {/* Marquee Summary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Module Series</span>
              <span className="text-sm font-bold text-slate-900">{panel.series}</span>
              <span className="text-xs text-slate-500 block mt-0.5">{panel.cellTech}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Nominal Power</span>
              <span className="text-xl font-bold font-mono text-emerald-700">{panel.powerRating.split(' ')[0]}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">Module Efficiency</span>
              <span className="text-xl font-bold font-mono text-cyan-700">{panel.efficiency}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">ALMM & BIS Status</span>
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Approved & Listed
              </span>
            </div>
          </div>

          {/* Interactive I-V & P-V Curve Simulation */}
          <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Characteristic I-V & P-V Performance Curves
                </span>
                <span className="text-xs font-bold text-slate-200">
                  Current (A) & Power (W) vs Voltage (V) at Cell Temp 25°C
                </span>
              </div>

              {/* Irradiance Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-lg">
                {[1000, 800, 600, 400].map((irr) => (
                  <button
                    key={irr}
                    type="button"
                    onClick={() => setSelectedIrradiance(irr)}
                    className={`px-2 py-1 text-[10px] font-mono font-semibold rounded ${
                      selectedIrradiance === irr ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {irr} W/m²
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Curve Graph */}
            <div className="relative h-44 w-full flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 500 160" fill="none">
                {/* Axes */}
                <line x1="40" y1="130" x2="480" y2="130" stroke="#334155" strokeWidth="1.5" />
                <line x1="40" y1="20" x2="40" y2="130" stroke="#334155" strokeWidth="1.5" />

                {/* Grid lines */}
                <line x1="40" y1="50" x2="480" y2="50" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="90" x2="480" y2="90" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="150" y1="20" x2="150" y2="130" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="260" y1="20" x2="260" y2="130" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="370" y1="20" x2="370" y2="130" stroke="#1E293B" strokeWidth="1" strokeDasharray="3 3" />

                {/* Simulated I-V Curve (Cyan) */}
                {(() => {
                  const factor = selectedIrradiance / 1000;
                  const currentY = 130 - (105 * factor);
                  const kneeX = 350;
                  const vocX = 420;
                  return (
                    <path
                      d={`M 40 ${currentY} L ${kneeX} ${currentY + 5} Q ${kneeX + 40} ${currentY + 15} ${vocX} 130`}
                      stroke="#06B6D4"
                      strokeWidth="2.5"
                    />
                  );
                })()}

                {/* Simulated P-V Curve (Emerald) */}
                {(() => {
                  const factor = selectedIrradiance / 1000;
                  const pmaxPeakY = 130 - (100 * factor);
                  const pmaxX = 350;
                  return (
                    <path
                      d={`M 40 130 Q ${pmaxX * 0.7} ${pmaxPeakY + 10} ${pmaxX} ${pmaxPeakY} Q ${pmaxX + 35} ${pmaxPeakY + 15} 420 130`}
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />
                  );
                })()}

                {/* Axis Labels */}
                <text x="45" y="145" fill="#64748B" fontSize="9" fontFamily="monospace">0 V</text>
                <text x="250" y="145" fill="#64748B" fontSize="9" fontFamily="monospace">Voltage (V)</text>
                <text x="415" y="145" fill="#06B6D4" fontSize="9" fontFamily="monospace">Voc 51.2V</text>

                <text x="10" y="30" fill="#06B6D4" fontSize="9" fontFamily="monospace">14 A</text>
                <text x="10" y="80" fill="#64748B" fontSize="9" fontFamily="monospace">7 A</text>
                <text x="10" y="130" fill="#64748B" fontSize="9" fontFamily="monospace">0 A</text>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" /> Current (A) vs Voltage (V)
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> Power (W) vs Voltage (V)
              </span>
              <span className="text-slate-400">At {selectedIrradiance} W/m² Insolation</span>
            </div>
          </div>

          {/* Full Technical Parameter Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-100 font-bold text-slate-900 border-b border-slate-200 flex items-center justify-between">
              <span>Electrical Parameters (Standard Test Conditions: 1000 W/m², AM 1.5, Cell 25°C)</span>
              <span className="font-mono text-slate-500 font-normal">IEC 61215 Verified</span>
            </div>
            
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 text-xs font-mono">
              <div className="p-2.5 flex justify-between bg-white">
                <span className="text-slate-500">Maximum Power (Pmax)</span>
                <span className="font-bold text-slate-900">{panel.powerRating}</span>
              </div>
              <div className="p-2.5 flex justify-between bg-white">
                <span className="text-slate-500">Module Efficiency</span>
                <span className="font-bold text-emerald-700">{panel.efficiency}</span>
              </div>
              <div className="p-2.5 flex justify-between bg-white">
                <span className="text-slate-500">Open Circuit Voltage (Voc)</span>
                <span className="font-bold text-slate-900">51.20 V</span>
              </div>
              <div className="p-2.5 flex justify-between bg-white">
                <span className="text-slate-500">Short Circuit Current (Isc)</span>
                <span className="font-bold text-slate-900">14.32 A</span>
              </div>
              <div className="p-2.5 flex justify-between bg-white">
                <span className="text-slate-500">Voltage at Pmax (Vmp)</span>
                <span className="font-bold text-slate-900">42.85 V</span>
              </div>
              <div className="p-2.5 flex justify-between bg-white">
                <span className="text-slate-500">Current at Pmax (Imp)</span>
                <span className="font-bold text-slate-900">13.54 A</span>
              </div>
              <div className="p-2.5 flex justify-between bg-white">
                <span className="text-slate-500">Bifaciality Factor</span>
                <span className="font-bold text-cyan-700">80% ± 5%</span>
              </div>
              <div className="p-2.5 flex justify-between bg-white">
                <span className="text-slate-500">Temp Coeff of Pmax</span>
                <span className="font-bold text-slate-900">{panel.tempCoefficient}</span>
              </div>
            </div>
          </div>

          {/* Mechanical & Compliance Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">Mechanical Data</span>
              <div className="text-[11px] space-y-1 text-slate-600">
                <div>Dimensions: <span className="font-mono text-slate-900">{panel.dimensions}</span></div>
                <div>Weight: <span className="font-mono text-slate-900">{panel.weight}</span></div>
                <div>Front/Rear Glass: <span className="font-mono text-slate-900">2.0mm High Transmission Tempered Glass</span></div>
                <div>Junction Box: <span className="font-mono text-slate-900">IP68, 3 Bypass Diodes, MC4-EVO2</span></div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="font-bold text-slate-900 block">Testing & National Listings</span>
              <div className="text-[11px] space-y-1 text-slate-600">
                <div>Bureau of Indian Standards: <span className="font-mono text-emerald-800">IS 14286 : 2010</span></div>
                <div>Ministry Order: <span className="font-mono text-emerald-800">MNRE ALMM Enlisted</span></div>
                <div>Cyclonic Wind Tolerance: <span className="font-mono text-slate-900">2400 Pa / 5400 Pa Snow</span></div>
                <div>Fire Safety: <span className="font-mono text-slate-900">UL Type 29 / Class C Fire Rated</span></div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Document No: EXA-SPEC-TOPCON-2026.01 · Verified by Exa Quality Engineering Hub
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Specification
          </button>
        </div>

      </div>
    </div>
  );
};
