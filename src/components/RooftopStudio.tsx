/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sun, Compass, Sliders, ShieldCheck, Sparkles, ArrowRight, Zap, Info } from 'lucide-react';

interface RooftopStudioProps {
  onOpenAssessment: () => void;
}

export const RooftopStudio: React.FC<RooftopStudioProps> = ({ onOpenAssessment }) => {
  // Time of day in hours (6.0 to 18.0)
  const [timeOfDay, setTimeOfDay] = useState<number>(12.5); // 12:30 PM
  const [azimuthAngle, setAzimuthAngle] = useState<number>(180); // 180° = True South (optimal for India)
  const [roofTilt, setRoofTilt] = useState<number>(20); // 20° tilt

  // Format time of day to HH:MM AM/PM
  const timeFormatted = useMemo(() => {
    const hours = Math.floor(timeOfDay);
    const minutes = Math.round((timeOfDay - hours) * 60);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    const padMin = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHours}:${padMin} ${period}`;
  }, [timeOfDay]);

  // Sun elevation calculation (approximate solar geometry for Indian latitude ~20°N)
  const solarElevation = useMemo(() => {
    // 6 AM = 0°, 12 PM = ~75-80° peak, 6 PM = 0°
    const hourAngle = (timeOfDay - 12) * 15; // 15° per hour
    const elevation = Math.max(0, Math.sin(((180 - Math.abs(hourAngle * 2)) * Math.PI) / 360) * 82);
    return Math.round(elevation);
  }, [timeOfDay]);

  // Sun direction label
  const orientationLabel = useMemo(() => {
    if (azimuthAngle >= 165 && azimuthAngle <= 195) return 'True South (Optimal in India)';
    if (azimuthAngle < 165 && azimuthAngle >= 120) return 'South-East (High Morning Yield)';
    if (azimuthAngle > 195 && azimuthAngle <= 240) return 'South-West (High Afternoon Yield)';
    if (azimuthAngle < 120) return 'East Facing';
    return 'West Facing';
  }, [azimuthAngle]);

  // Calculated Real-Time Metrics for a standard 5 kW TOPCon system
  const simulationResults = useMemo(() => {
    const baseIrradiance = Math.sin((solarElevation * Math.PI) / 180);
    const irradiance = Math.max(0, Math.round(baseIrradiance * 980)); // W/m²
    
    // Orientation factor (South is 1.0, deviation reduces direct angle slightly)
    const deviation = Math.abs(azimuthAngle - 180);
    const orientationEfficiency = 1 - (deviation / 180) * 0.18;
    
    // Tilt factor
    const tiltEfficiency = 1 - Math.abs(roofTilt - 22) * 0.004;

    // Instantaneous output for 5kW plant
    const frontOutput = (5.0 * (irradiance / 1000) * orientationEfficiency * tiltEfficiency);
    // TOPCon bifacial rear gain (+15% to 22% based on reflection)
    const rearBifacialGain = frontOutput * 0.18; 
    const totalInstantaneousKw = Math.max(0, Math.round((frontOutput + rearBifacialGain) * 100) / 100);

    const shadowLengthMultiplier = solarElevation > 5 ? (1 / Math.tan((solarElevation * Math.PI) / 180)).toFixed(1) : '10.0+';

    return {
      irradiance,
      totalInstantaneousKw,
      rearBifacialGain: Math.max(0, Math.round(rearBifacialGain * 100) / 100),
      shadowLengthMultiplier,
      dailyYieldKwh: Math.round(5.0 * 4.8 * orientationEfficiency * tiltEfficiency * 10) / 10
    };
  }, [solarElevation, azimuthAngle, roofTilt]);

  return (
    <section className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      
      {/* Background glow mesh */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span>Advanced Solar Physics Simulation</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Sun Path & Shadow Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            Interactive Rooftop Solar Angle & Shading Studio
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Simulate how Indian sun geometry, rooftop tilt, and compass orientation impact photovoltaic generation. 
            Discover how Exa N-Type TOPCon bifacial cells harvest oblique sunlight and rear reflected albedo.
          </p>
        </div>

        {/* 2-Column Split: Interactive Canvas & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Visual Sun Path Canvas (lg:col-span-7) */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl overflow-hidden">
            
            {/* Top Canvas Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">Simulated Solar Sky: Indian Subcontinent (~20°N)</span>
              </div>
              <span className="font-mono text-emerald-400 font-bold">{timeFormatted}</span>
            </div>

            {/* Visual SVG Solar Orbit & Rooftop Model */}
            <div className="relative h-64 sm:h-80 my-4 flex items-center justify-center">
              
              {/* Sky Arc Guide */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 300" fill="none">
                {/* Horizon ground */}
                <line x1="40" y1="260" x2="560" y2="260" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Solar Trajectory Arc */}
                <path d="M 60 260 A 240 220 0 0 1 540 260" stroke="#1E293B" strokeWidth="2" />
                
                {/* Sun Position on Arc */}
                {(() => {
                  const progress = (timeOfDay - 6) / 12; // 0 to 1
                  const angleRad = Math.PI * (1 - progress);
                  const sunX = 300 + 240 * Math.cos(angleRad);
                  const sunY = 260 - 220 * Math.sin(angleRad);
                  
                  return (
                    <g>
                      {/* Sun Glow Rays */}
                      <circle cx={sunX} cy={sunY} r="32" fill="#F59E0B" opacity="0.15" />
                      <circle cx={sunX} cy={sunY} r="18" fill="#FBBF24" opacity="0.3" />
                      <circle cx={sunX} cy={sunY} r="10" fill="#FDE68A" />
                      
                      {/* Light Ray beam towards the solar array */}
                      {solarElevation > 2 && (
                        <line
                          x1={sunX}
                          y1={sunY}
                          x2="300"
                          y2="230"
                          stroke="#FBBF24"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                          opacity="0.6"
                        />
                      )}
                    </g>
                  );
                })()}

                {/* Simulated Rooftop & Solar Panel Array */}
                <g transform={`translate(300, 230) rotate(${azimuthAngle > 180 ? 8 : -8})`}>
                  {/* Roof Base */}
                  <polygon points="-90,20 90,20 110,35 -110,35" fill="#1E293B" stroke="#334155" />
                  
                  {/* Angled Solar Array with tilt */}
                  <g transform={`rotate(${-roofTilt * 0.7})`}>
                    {/* Mounting frame */}
                    <line x1="-70" y1="20" x2="-70" y2="5" stroke="#64748B" strokeWidth="2" />
                    <line x1="70" y1="20" x2="70" y2="5" stroke="#64748B" strokeWidth="2" />
                    
                    {/* Exa TOPCon Solar Module Glass */}
                    <rect
                      x="-80"
                      y="-10"
                      width="160"
                      height="24"
                      rx="3"
                      fill={solarElevation > 10 ? '#0B2447' : '#0F172A'}
                      stroke="#06B6D4"
                      strokeWidth="1.5"
                    />
                    
                    {/* Cell grid lines */}
                    <line x1="-40" y1="-10" x2="-40" y2="14" stroke="#0E7490" strokeWidth="0.8" />
                    <line x1="0" y1="-10" x2="0" y2="14" stroke="#0E7490" strokeWidth="0.8" />
                    <line x1="40" y1="-10" x2="40" y2="14" stroke="#0E7490" strokeWidth="0.8" />
                    
                    {/* Bifacial Albedo reflection underneath */}
                    <path d="M -80 16 L 80 16" stroke="#10B981" strokeWidth="2" strokeDasharray="2 2" opacity="0.7" />
                  </g>

                  {/* Cast Shadow on ground */}
                  {solarElevation > 5 && (
                    <polygon
                      points={`-90,35 90,35 ${timeOfDay < 12 ? 90 + Number(simulationResults.shadowLengthMultiplier) * 25 : -90 - Number(simulationResults.shadowLengthMultiplier) * 25},35`}
                      fill="#020617"
                      opacity="0.8"
                    />
                  )}
                </g>

                {/* East / South / West Markers on Horizon */}
                <text x="60" y="280" fill="#64748B" fontSize="11" fontFamily="sans-serif">East (06:00)</text>
                <text x="285" y="285" fill="#10B981" fontSize="11" fontWeight="bold" fontFamily="sans-serif">South (180°)</text>
                <text x="500" y="280" fill="#64748B" fontSize="11" fontFamily="sans-serif">West (18:00)</text>
              </svg>

              {/* Real-time live HUD overlay on canvas */}
              <div className="absolute top-2 left-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-1">
                <div className="text-slate-400">Sun Elevation: <span className="font-mono text-amber-300 font-bold">{solarElevation}°</span></div>
                <div className="text-slate-400">Solar Irradiance: <span className="font-mono text-cyan-300 font-bold">{simulationResults.irradiance} W/m²</span></div>
                <div className="text-slate-400">Cast Shadow Factor: <span className="font-mono text-slate-200">{simulationResults.shadowLengthMultiplier}×</span></div>
              </div>

              <div className="absolute top-2 right-2 p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-[11px] text-right space-y-1">
                <span className="text-[10px] uppercase text-emerald-400 font-bold block">Instantaneous Power (5kW Plant)</span>
                <div className="text-xl font-extrabold font-mono text-emerald-400">
                  {simulationResults.totalInstantaneousKw} kW
                </div>
                <div className="text-[10px] text-cyan-300">
                  Incl. +{simulationResults.rearBifacialGain} kW Rear Bifacial Boost
                </div>
              </div>
            </div>

            {/* Bottom Insight Bar */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual-Glass Bifacial Architecture generates power even when sun is at extreme low angles.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Precision Simulator Controls (lg:col-span-5) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-xl flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Solar Geometry Controls
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Adjust Sun Angle & Roof Parameters
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => { setTimeOfDay(12.5); setAzimuthAngle(180); setRoofTilt(20); }}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Reset Defaults
                </button>
              </div>

              {/* Control 1: Time of Day Slider */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-300">1. Time of Day (Sun Elevation)</span>
                  <span className="font-mono font-bold text-amber-300">{timeFormatted}</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="18.0"
                  step="0.25"
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>06:00 AM (Sunrise)</span>
                  <span>12:00 PM (Noon Zenith)</span>
                  <span>06:00 PM (Sunset)</span>
                </div>
              </div>

              {/* Control 2: Rooftop Azimuth (Compass Direction) */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-300">2. Compass Orientation (Azimuth)</span>
                  <span className="font-mono font-bold text-emerald-300">{azimuthAngle}° ({orientationLabel})</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="270"
                  step="5"
                  value={azimuthAngle}
                  onChange={(e) => setAzimuthAngle(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>90° (East)</span>
                  <span>180° (True South)</span>
                  <span>270° (West)</span>
                </div>
              </div>

              {/* Control 3: Roof Pitch / Module Tilt */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-300">3. Rooftop Tilt Angle</span>
                  <span className="font-mono font-bold text-cyan-300">{roofTilt}° Tilt</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={roofTilt}
                  onChange={(e) => setRoofTilt(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>5° (Near Flat)</span>
                  <span>20°-25° (Indian Ideal)</span>
                  <span>40° (Sloped Shed)</span>
                </div>
              </div>

              {/* Live Technical Takeaway */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-xs text-slate-300 space-y-1.5">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Estimated Daily Generation for 5 kWp Array</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-emerald-400">
                    {simulationResults.dailyYieldKwh} kWh
                  </span>
                  <span className="text-xs text-slate-400">units / clear day</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Exa engineers conduct drone 3D point-cloud LiDAR scans on site to verify shadow-free placement against neighboring water tanks and parapet walls.
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={onOpenAssessment}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-900 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Get Free 3D Drone Shadow Analysis for Your Roof</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
