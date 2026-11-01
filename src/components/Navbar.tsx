/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, Menu, X, PhoneCall } from 'lucide-react';

interface NavbarProps {
  onOpenAssessment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssessment }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Strict Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark with clean solar mark */}
        <a href="#" className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:scale-105 transition-transform">
            <Sun className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              Exa Energy
            </span>
            <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">
              Private Limited
            </span>
          </div>
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#panels" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
            Solar Panels
          </a>
          <a href="#lanterns" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
            Solar Lanterns
          </a>
          <a href="#studio" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
            Rooftop Studio
          </a>
          <a href="#cloud" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
            Smart Storage
          </a>
          <a href="#calculator" className="hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0">
            Subsidy & Loans
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="tel:18002023920" 
            className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            title="Toll Free National Solar Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
            <span className="tabular-nums">1800-202-3920</span>
          </a>

          <button
            onClick={onOpenAssessment}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-emerald-700 transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
          >
            Get Rooftop Quote
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <a
            href="#panels"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Solar Panels (TOPCon Bifacial)
          </a>
          <a
            href="#lanterns"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Exa Solar Lanterns & Hardware Studio
          </a>
          <a
            href="#studio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Interactive Rooftop Solar Studio
          </a>
          <a
            href="#cloud"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Smart Storage & Wall Battery
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            PM Surya Ghar Subsidy & 7.00% Loans
          </a>
          <a
            href="#impact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Rural Electrification & CSR
          </a>
          
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <div className="text-xs text-slate-500 px-3">Toll-Free Helpline: 1800-202-3920</div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssessment();
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm"
            >
              Book Free Rooftop Site Survey
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
