/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, PhoneCall, Mail, MapPin, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onOpenAssessment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAssessment }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top CTA Bar in Footer */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to transition your home or facility to clean solar power?
            </h3>
            <p className="text-slate-400 mt-1">
              Claim up to ₹78,000 direct bank subsidy under PM Surya Ghar Muft Bijli Yojana today.
            </p>
          </div>

          <button
            onClick={onOpenAssessment}
            className="px-6 py-3 text-xs font-semibold text-slate-900 bg-emerald-400 rounded-xl hover:bg-emerald-300 transition-colors shadow-md whitespace-nowrap shrink-0"
          >
            Book Free Rooftop Site Survey
          </button>
        </div>
      </div>

      {/* Main Footer Links & Company Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Registration (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-emerald-600 flex items-center justify-center text-white">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white block">
                  Exa Energy Private Limited
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block">
                  Clean-Tech Renewable Energy
                </span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Exa Energy Private Limited is an Indian clean-tech innovator delivering next-generation N-Type TOPCon bifacial solar systems, 
              durable solar lanterns for rural electrification, and PM-KUSUM agricultural solar pumps.
            </p>

            <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
              <div>CIN: U40106DL2024PTC398210</div>
              <div>MNRE Empanelled Vendor · ALMM Listed</div>
              <div>BIS Certified · ISO 9001:2015 Accredited</div>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Solar Solutions
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#panels" className="hover:text-emerald-400 transition-colors">
                  TOPCon Bifacial Panels (580W)
                </a>
              </li>
              <li>
                <a href="#lanterns" className="hover:text-emerald-400 transition-colors">
                  ExaGlow Solar Lanterns
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition-colors">
                  PM Surya Ghar Subsidy
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  Hybrid Battery Systems
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-emerald-400 transition-colors">
                  PM-KUSUM Agri-Pumps
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Indian Hubs */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Regional Operations
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>New Delhi (Corporate HQ)</li>
              <li>Bengaluru (R&D Center)</li>
              <li>Jaipur (North Hub)</li>
              <li>Pune (West Hub)</li>
              <li>Ahmedabad (Gujarat Hub)</li>
              <li>Kolkata (East & Sunderbans)</li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              National Helpline
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:18002023920" className="hover:text-white transition-colors font-mono">
                  1800-202-3920 (Toll Free)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:support@exaenergy.in" className="hover:text-white transition-colors">
                  support@exaenergy.in
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">
                  Phase III, Okhla Clean Technology Industrial Area, New Delhi 110020, India
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Exa Energy Private Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of EPC Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">DISCOM Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
