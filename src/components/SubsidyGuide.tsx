/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/solarData';
import { ChevronDown, CheckCircle, FileCheck, Landmark, Wrench, Zap } from 'lucide-react';

export const SubsidyGuide: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const steps = [
    {
      step: '01',
      title: 'National Portal Registration',
      description: 'Register on the PM Surya Ghar National Portal with your DISCOM consumer account number and mobile number. Exa Energy assists with all documentation.',
      icon: FileCheck
    },
    {
      step: '02',
      title: 'Technical Feasibility & Approval',
      description: 'Your local state DISCOM sanctions technical feasibility for your sanctioned load within 3 to 7 working days.',
      icon: Zap
    },
    {
      step: '03',
      title: 'Precision Rooftop Installation',
      description: 'Exa certified engineers mount ALMM-listed TOPCon bifacial panels, aluminum/galvanized structures, and hybrid inverter in 48 hours.',
      icon: Wrench
    },
    {
      step: '04',
      title: 'DISCOM Inspection & Net-Meter',
      description: 'DISCOM officers inspect the plant, replace your unidirectional electricity meter with a bidirectional net meter, and issue a work completion certificate.',
      icon: CheckCircle
    },
    {
      step: '05',
      title: 'Direct Benefit Transfer (DBT)',
      description: 'Submit your bank account details and cancelled cheque on the portal. The Central Government transfers ₹30,000 to ₹78,000 directly into your bank account within 30 days.',
      icon: Landmark
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-700 uppercase tracking-wider mb-2">
            <span>Seamless Process</span>
            <span aria-hidden="true">·</span>
            <span>How PM Surya Ghar Works in 5 Steps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight [text-wrap:balance]">
            From Rooftop Survey to Bank Account Subsidy Credit
          </h2>
          <p className="mt-3 text-base text-slate-600">
            You don’t have to run between government offices. Exa Energy handles 100% of the portal filings, 
            DISCOM liaisoning, and net-meter procurement.
          </p>
        </div>

        {/* 5-Step Editorial Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold font-mono text-emerald-700">
                      {st.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subsidy FAQ Section */}
        <div className="pt-12 border-t border-slate-200 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions About Solar in India
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Everything you need to know about subsidies, net-metering, battery backup, and Exa solar lanterns.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      openFaqIdx === idx ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
