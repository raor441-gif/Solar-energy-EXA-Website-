/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IndianStateDiscom {
  id: string;
  name: string;
  discom: string;
  avgTariffPerKwh: number; // in INR
  solarHoursPerDay: number; // average peak sun hours
  stateSubsidyPerKw?: number; // optional state top-up subsidy in INR
}

export const INDIAN_STATES: IndianStateDiscom[] = [
  { id: 'mh', name: 'Maharashtra', discom: 'MSEDCL / Adani Electricity / Tata Power', avgTariffPerKwh: 9.8, solarHoursPerDay: 5.2, stateSubsidyPerKw: 0 },
  { id: 'gj', name: 'Gujarat', discom: 'UGVCL / DGVCL / MGVCL / PGVCL / Torrent', avgTariffPerKwh: 7.2, solarHoursPerDay: 5.6, stateSubsidyPerKw: 0 },
  { id: 'rj', name: 'Rajasthan', discom: 'JVVNL / AVVNL / JdVVNL', avgTariffPerKwh: 7.9, solarHoursPerDay: 5.8, stateSubsidyPerKw: 0 },
  { id: 'ka', name: 'Karnataka', discom: 'BESCOM / MESCOM / GESCOM / HESCOM', avgTariffPerKwh: 8.4, solarHoursPerDay: 5.1, stateSubsidyPerKw: 0 },
  { id: 'dl', name: 'Delhi NCR', discom: 'BSES Rajdhani / BSES Yamuna / TPDDL', avgTariffPerKwh: 8.2, solarHoursPerDay: 5.0, stateSubsidyPerKw: 2000 },
  { id: 'up', name: 'Uttar Pradesh', discom: 'UPPCL (DVVNL / MVVNL / PVVNL / PuVVNL)', avgTariffPerKwh: 7.5, solarHoursPerDay: 5.1, stateSubsidyPerKw: 5000 },
  { id: 'tn', name: 'Tamil Nadu', discom: 'TANGEDCO', avgTariffPerKwh: 7.8, solarHoursPerDay: 5.3, stateSubsidyPerKw: 0 },
  { id: 'ts', name: 'Telangana', discom: 'TSSPDCL / TSNPDCL', avgTariffPerKwh: 8.1, solarHoursPerDay: 5.2, stateSubsidyPerKw: 0 },
  { id: 'wb', name: 'West Bengal', discom: 'WBSEDCL / CESC Kolkata', avgTariffPerKwh: 8.6, solarHoursPerDay: 4.8, stateSubsidyPerKw: 0 },
  { id: 'kl', name: 'Kerala', discom: 'KSEBL', avgTariffPerKwh: 7.6, solarHoursPerDay: 4.9, stateSubsidyPerKw: 0 },
  { id: 'hr', name: 'Haryana', discom: 'DHBVN / UHBVN', avgTariffPerKwh: 7.4, solarHoursPerDay: 5.1, stateSubsidyPerKw: 0 },
  { id: 'mp', name: 'Madhya Pradesh', discom: 'MPPKVVCL / MPMKVVCL / MPPoVVCL', avgTariffPerKwh: 7.6, solarHoursPerDay: 5.4, stateSubsidyPerKw: 0 },
];

/**
 * PM Surya Ghar: Muft Bijli Yojana subsidy slab calculations:
 * - 1 kW: ₹30,000
 * - 2 kW: ₹60,000
 * - 3 kW and above: ₹78,000 (maximum capped subsidy for residential)
 */
export function calculatePmSuryaGharSubsidy(systemSizeKw: number): number {
  if (systemSizeKw <= 0) return 0;
  if (systemSizeKw < 1.5) return 30000;
  if (systemSizeKw < 2.5) return 60000;
  return 78000; // 3 kW and above
}

export interface SolarPanelProduct {
  id: string;
  name: string;
  series: string;
  tagline: string;
  type: string;
  cellTech: string;
  powerRating: string;
  efficiency: string;
  warranty: string;
  tempCoefficient: string;
  bifacialGain: string;
  dimensions: string;
  weight: string;
  features: string[];
  bestFor: string;
  almmApproved: boolean;
  bisCertified: boolean;
}

export const SOLAR_PANELS: SolarPanelProduct[] = [
  {
    id: 'exa-topcon-580',
    name: 'Exa Apex 580W Bifacial',
    series: 'TOPCon Dual-Glass Series',
    tagline: 'Ultra-high efficiency N-Type TOPCon cells with up to 25% rear bifacial power gain.',
    type: 'Monocrystalline N-Type TOPCon',
    cellTech: '16-Busbar (SMBB) Half-Cut 182mm Cells',
    powerRating: '580Wp (Max 725Wp with Bifacial Gain)',
    efficiency: '22.8%',
    warranty: '12-Yr Product / 30-Yr Linear Performance',
    tempCoefficient: '-0.30% / °C (High Indian heat resilience)',
    bifacialGain: '15% – 25% additional yield from rear reflection',
    dimensions: '2278 × 1134 × 30 mm',
    weight: '31.5 kg (Dual 2.0mm tempered glass)',
    features: [
      'Zero Light Induced Degradation (LID/LeTID)',
      'Anti-reflective hydrophilic nano-coating against Indian dust',
      'Certified for 5400 Pa mechanical snow/cyclone load',
      'IP68 split junction box with MC4-EVO2 connectors'
    ],
    bestFor: 'High-yield residential rooftops, C&I factories, ground-mount arrays',
    almmApproved: true,
    bisCertified: true
  },
  {
    id: 'exa-mono-450',
    name: 'Exa Vertex 450W All-Black',
    series: 'Residential Monocrystalline Series',
    tagline: 'Sleek architectural black-finish panel engineered for urban rooftops and shade tolerance.',
    type: 'Monocrystalline P-Type PERC',
    cellTech: '10-Busbar Half-Cut 166mm Cells',
    powerRating: '450Wp',
    efficiency: '21.4%',
    warranty: '10-Yr Product / 25-Yr Linear Performance',
    tempCoefficient: '-0.34% / °C',
    bifacialGain: 'Monofacial Single Glass',
    dimensions: '1903 × 1134 × 30 mm',
    weight: '23.8 kg',
    features: [
      'Compact footprint designed for standard Indian flat terrace spaces',
      'Excellent low-light performance in cloudy monsoon conditions',
      'Black anodized aluminum alloy frame for premium aesthetic',
      'Bypass diode matrix preventing hot-spot shade damage'
    ],
    bestFor: 'Urban bungalows, residential apartments, villas, micro-inverters',
    almmApproved: true,
    bisCertified: true
  },
  {
    id: 'exa-utility-620',
    name: 'Exa Titan 620W Commercial',
    series: 'Utility & Commercial Grade',
    tagline: 'Heavy-duty 210mm wafer mega-panel designed for industrial CAPEX reduction and high ROI.',
    type: 'N-Type TOPCon High-Power Bifacial',
    cellTech: 'Multi-Busbar 210mm Cut G12 Cells',
    powerRating: '620Wp (Up to 770Wp Bifacial)',
    efficiency: '23.1%',
    warranty: '12-Yr Product / 30-Yr Linear Performance',
    tempCoefficient: '-0.29% / °C',
    bifacialGain: 'Up to 25% rear boost',
    dimensions: '2384 × 1303 × 35 mm',
    weight: '37.8 kg',
    features: [
      'Lowest Levelized Cost of Electricity (LCOE)',
      'Salt mist and ammonia resistance for coastal Indian states',
      '1500V DC system compatibility for industrial strings',
      'High wind load tolerance up to 2400 Pa'
    ],
    bestFor: 'Textile mills, logistics warehouses, cold storage facilities, solar parks',
    almmApproved: true,
    bisCertified: true
  }
];

export interface SolarLanternProduct {
  id: string;
  name: string;
  model: string;
  tagline: string;
  battery: string;
  runtime: string;
  lumenOutput: string;
  chargingModes: string;
  solarPanelSpecs: string;
  mobileCharging: boolean;
  waterproofRating: string;
  weight: string;
  keyFeatures: string[];
  lightingModes: {
    name: string;
    lumens: number;
    hours: number;
    description: string;
  }[];
}

export const SOLAR_LANTERNS: SolarLanternProduct[] = [
  {
    id: 'exa-lantern-prime',
    name: 'ExaGlow Prime Solar Lantern',
    model: 'EG-2500 Pro',
    tagline: 'Flagship portable clean light with 360° glare-free illumination and emergency phone charging.',
    battery: 'LiFePO4 3.2V 6000mAh (2,000+ deep cycles / 6+ years lifespan)',
    runtime: 'Up to 32 Hours continuous light on Eco mode',
    lumenOutput: '380 Peak Lumens (Eye-safe 4000K warm-white LED)',
    chargingModes: 'Dual: High-efficiency Monocrystalline Solar Top + Type-C 5V Fast Port',
    solarPanelSpecs: 'Integrated 3.5W Monocrystalline PV Panel with UV-resistant coating',
    mobileCharging: true,
    waterproofRating: 'IP65 Dustproof & Heavy Monsoon Rain Resistant',
    weight: '620 grams (Ultralight impact-resistant polycarbonate)',
    keyFeatures: [
      '360-degree frosted glare-free diffuser for safe night study & household chores',
      '5V/2A USB Power Bank port to charge smartphones during power outages',
      'Ergonomic stainless steel swivel handle + ceiling hanging hook',
      'Smart LED battery level indicator (25%, 50%, 75%, 100%)',
      'Over-charge and deep discharge BMS protection for safety'
    ],
    lightingModes: [
      { name: 'Eco Night Glow', lumens: 35, hours: 32, description: 'Soft warm ambient glow for night navigation and peaceful sleep' },
      { name: 'Student Reading', lumens: 140, hours: 14, description: 'Focused flicker-free neutral light ideal for studying and handwork' },
      { name: 'Turbo Room Light', lumens: 380, hours: 6, description: 'Full brightness illuminates an entire 200 sq.ft living room or shop' },
      { name: 'Emergency SOS', lumens: 250, hours: 20, description: 'High-visibility pulsing beacon for roadside or farm safety' }
    ]
  },
  {
    id: 'exa-lantern-rural',
    name: 'ExaBright Village Task Lamp',
    model: 'EB-1200 Rural',
    tagline: 'Rugged study and kitchen lantern designed for remote Indian off-grid homes and students.',
    battery: 'LiFePO4 3.2V 3200mAh',
    runtime: 'Up to 24 Hours on standard mode',
    lumenOutput: '220 Lumens',
    chargingModes: 'External 5W Detachable Solar Panel with 5-meter heavy duty wire',
    solarPanelSpecs: '5W Anodized Aluminum Framed Solar Panel with rooftop mounting stand',
    mobileCharging: true,
    waterproofRating: 'IP64 Splashproof',
    weight: '480 grams',
    keyFeatures: [
      'Detachable solar panel can be placed on the tin/thatched roof while lantern stays indoors',
      'Dedicated downward angled reading beam for school homework',
      'Drop-tested from 1.5 meters on concrete floors',
      'Affordable zero-maintenance solution replacing toxic kerosene lamps'
    ],
    lightingModes: [
      { name: 'Night Lamp', lumens: 25, hours: 24, description: 'Subtle night beacon for infants and elders' },
      { name: 'Standard Study', lumens: 110, hours: 12, description: 'Perfect desk lighting for school students' },
      { name: 'Max Lumens', lumens: 220, hours: 5, description: 'Bright wide beam for cooking and family gatherings' },
      { name: 'Low Power Beacon', lumens: 15, hours: 48, description: 'Low power emergency locator' }
    ]
  },
  {
    id: 'exa-lantern-lumina-street',
    name: 'ExaBeam All-In-One Solar Street Light',
    model: 'ESL-30 Micro',
    tagline: 'Dusk-to-dawn standalone solar security luminary with PIR radar motion sensor.',
    battery: 'LiFePO4 12.8V 18Ah',
    runtime: 'All night dusk-to-dawn (3 consecutive cloudy days backup)',
    lumenOutput: '2400 Lumens High Output',
    chargingModes: 'Integrated 35W Monocrystalline Top Panel',
    solarPanelSpecs: '35W High Efficiency A-Grade Silicon',
    mobileCharging: false,
    waterproofRating: 'IP66 Weatherproof Cast Aluminum Housing',
    weight: '4.2 kg',
    keyFeatures: [
      'Zero wiring required - mounts directly to 4-5 meter pole or building wall',
      'Auto-dimming: 30% standby brightness, switches to 100% on motion detection',
      'Optical bat-wing lens covers 15-meter diameter roadway',
      'Ideal for village panchayat roads, farm borders, farmhouses, and industrial perimeters'
    ],
    lightingModes: [
      { name: 'Radar Auto Mode', lumens: 2400, hours: 12, description: 'Dusk to dawn: 30% dim + 100% on human/vehicle motion' },
      { name: 'Constant High', lumens: 1800, hours: 6, description: 'Steady full brightness for commercial yard operations' },
      { name: 'Eco Conservation', lumens: 800, hours: 16, description: 'Extended run for prolonged monsoon cloudy stretches' },
      { name: 'Security Strobe', lumens: 2400, hours: 8, description: 'Alarm strobe mode for boundary trespass deterrence' }
    ]
  }
];

export interface CaseStudy {
  id: string;
  client: string;
  city: string;
  state: string;
  category: 'Residential' | 'Commercial & Industrial' | 'Rural Impact' | 'Agriculture';
  systemSize: string;
  annualSavings: string;
  co2Offset: string;
  paybackYears: string;
  imageAlt: string;
  description: string;
  highlightMetric: string;
  highlightLabel: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs-jaipur',
    client: 'Sharma Residence, 4-BHK Villa',
    city: 'Jaipur',
    state: 'Rajasthan',
    category: 'Residential',
    systemSize: '10 kW Rooftop (TOPCon Bifacial)',
    annualSavings: '₹1,18,000 / year',
    co2Offset: '12.4 Tonnes / yr',
    paybackYears: '3.1 Years',
    imageAlt: 'Residential rooftop solar panels Jaipur',
    description: 'Transitioned a high-power consumption villa with 4 air-conditioners to net-zero grid reliance. System regularly exports surplus power back to JVVNL via net-metering.',
    highlightMetric: '₹0 Monthly Bill',
    highlightLabel: 'From ₹11,500/mo electricity bills'
  },
  {
    id: 'cs-pune',
    client: 'Precision Tech Auto Components',
    city: 'Pune (Chakan MIDC)',
    state: 'Maharashtra',
    category: 'Commercial & Industrial',
    systemSize: '150 kW Industrial Solar Roof',
    annualSavings: '₹18,40,000 / year',
    co2Offset: '185 Tonnes / yr',
    paybackYears: '2.9 Years',
    imageAlt: 'Industrial solar roof installation Pune',
    description: 'Installed across 16,000 sq.ft of industrial metal shed roof. Drastically lowered peak demand charges during CNC machining daytime shifts.',
    highlightMetric: '38% Energy Cost Cut',
    highlightLabel: 'Direct bottom-line EBITDA improvement'
  },
  {
    id: 'cs-sundarbans',
    client: 'Light-Up Sunderbans Delta Initiative',
    city: 'Gosaba & Namkhana',
    state: 'West Bengal',
    category: 'Rural Impact',
    systemSize: '3,200 ExaGlow Solar Lanterns',
    annualSavings: '₹34,00,000 Kerosene Savings',
    co2Offset: '420 Tonnes / yr',
    paybackYears: 'Instant CSR Impact',
    imageAlt: 'Rural village solar lantern distribution',
    description: 'Provided rugged ExaGlow solar lanterns to off-grid island communities. Enabled 4,800+ school students to study safely at night without dangerous kerosene fumes.',
    highlightMetric: '4,800+ Students',
    highlightLabel: '3.5 additional study hours every evening'
  },
  {
    id: 'cs-solapur',
    client: 'Patil Sugarcane & Pomegranate Farm',
    city: 'Solapur',
    state: 'Maharashtra',
    category: 'Agriculture',
    systemSize: '7.5 HP Solar Agri-Pump (PM-KUSUM)',
    annualSavings: '₹1,45,000 Diesel Eliminated',
    co2Offset: '14.2 Tonnes / yr',
    paybackYears: '1.8 Years',
    imageAlt: 'Agricultural solar water pump farm Solapur',
    description: 'Replaced a noisy 8HP diesel generator pump with an Exa solar surface pump system with automatic pressure cutoff for drip irrigation.',
    highlightMetric: 'Zero Diesel Fuel',
    highlightLabel: 'Reliable daytime irrigation without power cuts'
  }
];

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Subsidy' | 'Technical' | 'Lanterns' | 'Process';
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Subsidy',
    question: 'How does the PM Surya Ghar: Muft Bijli Yojana subsidy get paid?',
    answer: 'Under the PM Surya Ghar scheme, the Central Financial Assistance (CFA) is deposited directly into your bank account via Direct Benefit Transfer (DBT) within 30 days after the DISCOM inspects the rooftop installation and installs the bidirectional net meter. For a 3 kW system, you receive a direct subsidy of ₹78,000.'
  },
  {
    category: 'Subsidy',
    question: 'Can Exa Energy help with DISCOM net-metering approvals and paperwork?',
    answer: 'Yes! Exa Energy provides end-to-end EPC service. Our liaison engineers handle the national portal application, DISCOM load feasibility sanction, net meter procurement, and final DBT subsidy release documentation on your behalf.'
  },
  {
    category: 'Technical',
    question: 'Why does Exa Energy use N-Type TOPCon bifacial panels instead of older polycrystalline?',
    answer: 'N-Type TOPCon (Tunnel Oxide Passivated Contact) is the latest world standard in PV technology. Unlike older panels, TOPCon has near-zero light-induced degradation, lower temperature loss in hot Indian summers (-0.30%/°C vs -0.40%/°C), and generates up to 25% extra power from sunlight reflecting off the floor onto the rear side of the panel.'
  },
  {
    category: 'Lanterns',
    question: 'How durable are Exa Solar Lanterns in Indian monsoon and rural conditions?',
    answer: 'Exa solar lanterns use automotive-grade LiFePO4 (Lithium Iron Phosphate) batteries that endure over 2,000 charge cycles (6+ years daily use without degradation) and cannot catch fire. The enclosures are molded from high-impact virgin polycarbonate with IP65 weatherproofing, making them resistant to heavy rain and dust.'
  },
  {
    category: 'Technical',
    question: 'What happens during power cuts or at night?',
    answer: 'Standard on-grid solar systems sync with the grid and shut down during load shedding for line-worker safety. If your area suffers frequent power cuts, Exa Energy designs an Exa Hybrid Solar System with modular wall-mounted LiFePO4 batteries that switches over in under 10 milliseconds, keeping your lights, fans, and Wi-Fi running seamlessly.'
  },
  {
    category: 'Process',
    question: 'How long does an Exa Energy rooftop solar installation take from start to finish?',
    answer: 'Typically, physical rooftop mounting and electrical wiring take only 2 to 3 working days. The DISCOM approval, net-metering sanction, and meter changeover generally take 2 to 3 weeks depending on your state electricity board.'
  }
];
