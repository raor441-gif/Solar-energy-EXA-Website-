/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { PanelsShowcase } from './components/PanelsShowcase';
import { RooftopStudio } from './components/RooftopStudio';
import { LanternsShowcase } from './components/LanternsShowcase';
import { LanternHardwareStudio } from './components/LanternHardwareStudio';
import { EnergyCloudLive } from './components/EnergyCloudLive';
import { SubsidyCalculator } from './components/SubsidyCalculator';
import { LoanFinancials } from './components/LoanFinancials';
import { IndiaSolarRadar } from './components/IndiaSolarRadar';
import { AgriSolutions } from './components/AgriSolutions';
import { SolutionFinder } from './components/SolutionFinder';
import { RuralImpact } from './components/RuralImpact';
import { CaseStudies } from './components/CaseStudies';
import { SubsidyGuide } from './components/SubsidyGuide';
import { Footer } from './components/Footer';
import { AssessmentModal } from './components/AssessmentModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [selectedSpecsForQuote, setSelectedSpecsForQuote] = useState<{
    kw: number;
    stateName: string;
    monthlyBill: number;
    subsidy: number;
  } | null>(null);

  const handleOpenAssessment = () => {
    setSelectedSpecsForQuote(null);
    setIsAssessmentModalOpen(true);
  };

  const handleSelectSystemForQuote = (specs: {
    kw: number;
    stateName: string;
    monthlyBill: number;
    subsidy: number;
  }) => {
    setSelectedSpecsForQuote(specs);
    setIsAssessmentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* 1. Navigation Header (Strict 3-Zone Contract) */}
      <Navbar onOpenAssessment={handleOpenAssessment} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Rooftop Visual & Key KPI Strip */}
        <Hero onOpenAssessment={handleOpenAssessment} />

        {/* 3. National Standards Trust Bar (MNRE, BIS, PM Surya Ghar, Make in India) */}
        <TrustBar />

        {/* 4. Photovoltaic Engineering: TOPCon Bifacial Panels & Datasheet Modal */}
        <PanelsShowcase onOpenAssessment={handleOpenAssessment} />

        {/* 5. Advanced Interactive Rooftop Solar & Shadow Physics Studio */}
        <div id="studio">
          <RooftopStudio onOpenAssessment={handleOpenAssessment} />
        </div>

        {/* 6. Exa Solar Lanterns & Clean Light Showcase with Lighting Simulator */}
        <LanternsShowcase onOpenAssessment={handleOpenAssessment} />

        {/* 7. Precision Hardware Teardown Studio: LiFePO4, Sun-Spectrum LEDs & Evening Study */}
        <LanternHardwareStudio onOpenAssessment={handleOpenAssessment} />

        {/* 8. Smart Home Energy Hub & LiFePO4 Wall Battery Telemetry Studio */}
        <div id="cloud">
          <EnergyCloudLive onOpenAssessment={handleOpenAssessment} />
        </div>

        {/* 9. Interactive PM Surya Ghar Subsidy & Solar Savings Calculator */}
        <SubsidyCalculator onSelectSystemForQuote={handleSelectSystemForQuote} />

        {/* 10. Concessional 7.00% Solar Loan Financial Engineering & Positive Cashflow Calculator */}
        <div id="loans">
          <LoanFinancials onOpenAssessment={handleOpenAssessment} />
        </div>

        {/* 11. Pan-India Solar Irradiance & DISCOM Radar */}
        <IndiaSolarRadar onOpenAssessment={handleOpenAssessment} />

        {/* 12. Solar Agriculture: PM-KUSUM Water Pumps & Diesel Savings */}
        <AgriSolutions onOpenAssessment={handleOpenAssessment} />

        {/* 13. Tailored Solar Solution Finder */}
        <SolutionFinder onOpenAssessment={handleOpenAssessment} />

        {/* 14. "Light Up a Village" Rural Electrification & CSR Impact Calculator */}
        <RuralImpact onOpenAssessment={handleOpenAssessment} />

        {/* 15. Verified Pan-India Case Studies */}
        <CaseStudies />

        {/* 16. 5-Step Subsidy Roadmap & Solar FAQs */}
        <SubsidyGuide />
      </main>

      {/* Corporate Footer */}
      <Footer onOpenAssessment={handleOpenAssessment} />

      {/* Free Rooftop Site Survey & Subsidy Claim Modal */}
      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        initialSpecs={selectedSpecsForQuote}
      />

      {/* Floating WhatsApp Quick Connect Widget */}
      <FloatingWhatsApp onOpenAssessment={handleOpenAssessment} />
    </div>
  );
}
