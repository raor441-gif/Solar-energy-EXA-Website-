/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenAssessment: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenAssessment }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Expanded Quick Contact Popover */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-fade-in">
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                Exa Solar Desk
              </div>
              <div className="text-sm font-bold">
                Chat with a Solar Advisor
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-emerald-100 hover:text-white p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 text-xs">
            <p className="text-slate-600 leading-relaxed">
              Have questions about PM Surya Ghar subsidies, rooftop feasibility, or solar lanterns?
            </p>

            <a
              href="https://wa.me/918049201800?text=Hello%20Exa%20Energy,%20I%20would%20like%20to%20know%20about%20rooftop%20solar%20and%20lanterns"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open WhatsApp Chat</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onOpenAssessment();
              }}
              className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>Book Callback / Survey</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact Solar Support on WhatsApp"
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

    </div>
  );
};
