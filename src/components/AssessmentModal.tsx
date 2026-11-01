/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Calendar, ArrowRight, MessageCircle, FileText } from 'lucide-react';
import { INDIAN_STATES } from '../data/solarData';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSpecs?: {
    kw: number;
    stateName: string;
    monthlyBill: number;
    subsidy: number;
  } | null;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  initialSpecs
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState(initialSpecs?.stateName || 'Maharashtra');
  const [pincode, setPincode] = useState('');
  const [rooftopType, setRooftopType] = useState('Flat Concrete Terrace');
  const [interestType, setInterestType] = useState('Residential Rooftop Solar');
  const [preferredDate, setPreferredDate] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Phone validation for India: 10 digits
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!fullName.trim() || !city.trim()) {
      setErrorMessage('Please enter your full name and city.');
      return;
    }

    // Generate reference code
    const generatedRef = `EXA-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
    setReferenceId(generatedRef);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-700 font-semibold block">
              Exa Energy Private Limited · India
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {isSubmitted ? 'Site Survey Confirmed' : 'Book Free Rooftop Solar Assessment'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            /* Submission Confirmation View */
            <div className="text-center py-4 space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Site Survey Scheduled Successfully!
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Thank you, <strong>{fullName}</strong>. An Exa solar technical engineer in {city}, {stateName} 
                  has been assigned to your rooftop assessment.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Application Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900">{referenceId}</span>
                </div>
                {initialSpecs && (
                  <>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Calculated Plant Size:</span>
                      <span className="font-mono font-bold text-emerald-700">{initialSpecs.kw} kWp</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">PM Surya Ghar Subsidy:</span>
                      <span className="font-mono font-bold text-emerald-700">₹{initialSpecs.subsidy.toLocaleString('en-IN')} DBT</span>
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Expected Call Back:</span>
                  <span className="font-medium text-slate-900">Within 2 business hours</span>
                </div>
              </div>

              <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero obligation · 100% Free Drone 3D Shadow Analysis</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
                <a
                  href={`https://wa.me/918049201800?text=Hi%20Exa%20Energy,%20I%20booked%20survey%20Ref%20${referenceId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-100 rounded-xl hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {initialSpecs && (
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                  <div>
                    <span className="font-semibold">Selected Configuration: </span>
                    <span>{initialSpecs.kw} kWp System ({initialSpecs.stateName})</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-800">
                    ₹{initialSpecs.subsidy.toLocaleString('en-IN')} Subsidy
                  </span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Service Interest */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Product / Solution Interested In
                </label>
                <select
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-medium text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Residential Rooftop Solar (PM Surya Ghar)</option>
                  <option>Commercial & Industrial Solar (50kW+)</option>
                  <option>Exa Solar Lanterns (Retail / Bulk / CSR)</option>
                  <option>PM-KUSUM Solar Agri-Pump (3HP - 7.5HP)</option>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number (+91) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-mono text-slate-400">+91</span>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-3 py-2 text-xs font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune, Jaipur, Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* State & Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    State
                  </label>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 411001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Rooftop Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Rooftop Structure Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Flat Concrete Terrace', 'Sloped Metal Shed', 'Open Land / Farm'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRooftopType(type)}
                      className={`px-2.5 py-1.5 text-[11px] font-medium rounded-lg border text-center transition-colors ${
                        rooftopType === type
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Date for Rooftop Drone / Shadow Survey
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs text-slate-900 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Your information is strictly protected and never shared with 3rd parties.</span>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Confirm Free Site Survey Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
