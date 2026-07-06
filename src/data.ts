import { Tender, Project, Notice, BoardMember, OfficeDirectory, DepartmentSummary } from "./types";

export const BOARD_MEMBERS: BoardMember[] = [
  {
    id: "bm-1",
    name: "Sri K. Vijayanand, IAS",
    designation: "Chairman & Managing Director",
    role: "Overall corporate governance, policy formulation, and strategic command of APTRANSCO, steering the utility toward modern grid standards and financial sustainability.",
    cadre: "Indian Administrative Service",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250&h=250",
    profileSummary: "Senior IAS officer with decades of experience in public administration, energy sector reforms, and infrastructure development across Andhra Pradesh."
  },
  {
    id: "bm-2",
    name: "Smt. I. Prasanthi, Director",
    designation: "Director (Finance & Revenue)",
    role: "Financial controls, treasury management, tariff filings with APERC, investment planning, and cost-benefit vetting for all capital transmission projects.",
    cadre: "Finance & Accounts Wing",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250&h=250",
    profileSummary: "Chartered Financial Expert with 25+ years overseeing fiscal policy, budget allocation, and regulatory compliance in public sector power corporations."
  },
  {
    id: "bm-3",
    name: "Sri P. Bhaskara Rao, Director",
    designation: "Director (Grid, Transmission & Management)",
    role: "Grid operations, load dispatch scheduling (SLDC), system safety protocols, and daily transmission operations of 400kV, 220kV, and 132kV networks across the state.",
    cadre: "Engineering Wing",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250&h=250",
    profileSummary: "Distinguished power transmission engineer, pioneering national grid synchronization protocols and modern load dispatch automation in AP."
  },
  {
    id: "bm-4",
    name: "Sri B. Venkatesulu, Director",
    designation: "Director (Projects & IT)",
    role: "Executing new substation installations, lines erection, technical bidding, ERP implementations, OPGW telecom network expansion, and Cybersecurity Systems.",
    cadre: "Engineering & IT Wing",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=250&h=250",
    profileSummary: "Expert in project management and substation automation, spearheading the transition to digitally automated Gas Insulated Substations (GIS) in AP."
  }
];

export const TENDERS: Tender[] = [
  {
    id: "tnd-001",
    referenceNo: "APT/CE-TEL/2026/08",
    title: "Supply, installation, and commissioning of OPGW Fibre Optic Cables for 132kV DC line from Kalikiri to Pileru (approx. 24.5 km)",
    category: "Telecom & IT",
    publishedDate: "2026-06-15",
    submissionDeadline: "2026-07-18",
    valueCr: 2.45,
    documentUrl: "/documents/tenders/opgw-kalikiri-pileru.pdf",
    status: "Open",
    circle: "Kadapa"
  },
  {
    id: "tnd-002",
    referenceNo: "APT/CE-PROJ/400KV/2026/02",
    title: "Erection of 400kV Quad Moose Double Circuit line from Eluru substation to Nuzvid tap-off point on turnkey basis",
    category: "Transmission",
    publishedDate: "2026-06-12",
    submissionDeadline: "2026-07-25",
    valueCr: 78.90,
    documentUrl: "/documents/tenders/400kv-eluru-nuzvid.pdf",
    status: "Open",
    circle: "Vijayawada"
  },
  {
    id: "tnd-003",
    referenceNo: "APT/CE-GRID/MVA-AUG/2026/14",
    title: "Augmentation of 1x100 MVA power transformer to 1x160 MVA at 220/132kV Tekkali Substation in Srikakulam District",
    category: "Substation",
    publishedDate: "2026-06-08",
    submissionDeadline: "2026-07-05",
    valueCr: 12.30,
    documentUrl: "/documents/tenders/tekkali-transformer-aug.pdf",
    status: "Open",
    circle: "Visakhapatnam"
  },
  {
    id: "tnd-004",
    referenceNo: "APT/CE-CIVIL/ZONE-VJA/2026/03",
    title: "Construction of Multi-storied Administrative Block Annexure at APTRANSCO Vidyut Soudha, Vijayawada",
    category: "Civil Works",
    publishedDate: "2026-06-01",
    submissionDeadline: "2026-06-30",
    valueCr: 18.50,
    documentUrl: "/documents/tenders/vidyut-soudha-civil.pdf",
    status: "Evaluation",
    circle: "Vijayawada"
  },
  {
    id: "tnd-005",
    referenceNo: "APT/CE-IT/ERP-SAP/2026/22",
    title: "Upgrade of SAP S/4HANA Enterprise Cloud License Support and Integration of Automated Material Management Modules",
    category: "Telecom & IT",
    publishedDate: "2026-05-20",
    submissionDeadline: "2026-06-25",
    valueCr: 5.60,
    documentUrl: "/documents/tenders/sap-upgrade.pdf",
    status: "Evaluation",
    circle: "Vijayawada"
  },
  {
    id: "tnd-006",
    referenceNo: "APT/CE-GRID/SYS-PROT/2026/05",
    title: "Procurement of Numerical Distance Protection Relays and Synchrophasor PMUs for State-wide Grid Stability Monitoring",
    category: "Services",
    publishedDate: "2026-05-15",
    submissionDeadline: "2026-06-10",
    valueCr: 8.75,
    documentUrl: "/documents/tenders/numerical-relays.pdf",
    status: "Awarded",
    circle: "Corporate Office"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-101",
    name: "400/220/132kV Digital Substation at Gudivada (Vijayawada Circle)",
    voltageLevel: "400 kV",
    circle: "Vijayawada",
    capacityMVA: 1000,
    status: "In Progress",
    costCr: 245.50,
    completionTargetDate: "2027-03-31",
    physicalProgressPercent: 78,
    highlights: [
      "State-of-the-art Gas Insulated Substation (GIS) reducing land footprint by 70%.",
      "Full IEC 61850 Process Bus architecture for fully digital substation communication.",
      "Integrated smart fire safety system with nitrogen injection tech.",
      "Crucial grid balancing hub linking Coastal AP wind fields with regional load centers."
    ]
  },
  {
    id: "proj-102",
    name: "Erection of 220kV Double Circuit line from Rayalaseema Thermal Power Project (RTPP) to Kadapa Substation",
    voltageLevel: "220 kV",
    circle: "Kadapa",
    lineLengthCkm: 92.4,
    status: "Completed",
    costCr: 84.20,
    completionTargetDate: "2026-05-10",
    physicalProgressPercent: 100,
    highlights: [
      "92.4 ckm line completed in record-breaking 14 months.",
      "Overcame dense forest reserve terrain via special narrow-base tower designs.",
      "Improves regional thermal evacuation capacity by 450 MW.",
      "Formally commissioned and synchronized with the state grid on May 12, 2026."
    ]
  },
  {
    id: "proj-103",
    name: "Integration of Mega 4,000 MW Solar Power Park at Orvakal (Kurnool District) with State Transmission Grid",
    voltageLevel: "400 kV",
    circle: "Kurnool",
    capacityMVA: 2000,
    lineLengthCkm: 110,
    status: "In Progress",
    costCr: 412.00,
    completionTargetDate: "2026-12-15",
    physicalProgressPercent: 92,
    highlights: [
      "Construction of 400/220kV Orvakal pooling substation with 4x500 MVA transformers.",
      "110 ckm Quad Moose High Capacity transmission line to regional grid junction.",
      "Real-time dynamic line rating (DLR) monitoring system integrated.",
      "Pivotal project in Andhra Pradesh's green energy corridor initiative."
    ]
  },
  {
    id: "proj-104",
    name: "132/33kV Substation at Araku Valley with associated lines for Tribal Area Power Quality Improvement",
    voltageLevel: "132 kV",
    circle: "Visakhapatnam",
    capacityMVA: 63,
    lineLengthCkm: 35.8,
    status: "Commissioned",
    costCr: 34.10,
    completionTargetDate: "2026-02-18",
    physicalProgressPercent: 100,
    highlights: [
      "Stabilized power quality for 120+ tribal hamlets in Araku and Paderu valley regions.",
      "Utilized custom HTLS (High Temperature Low Sag) conductors to double power flow over rugged hills.",
      "Equipped with SCADA-compatible tele-control for unmanned operations.",
      "Reduced regional transmission line losses by 3.8%."
    ]
  },
  {
    id: "proj-105",
    name: "Smart Grid Pilot Phase II: State-wide Dynamic Reactive Power Compensator (STATCOM) Deployments",
    voltageLevel: "400 kV",
    circle: "Corporate Office",
    status: "Proposed",
    costCr: 120.00,
    completionTargetDate: "2028-06-30",
    physicalProgressPercent: 5,
    highlights: [
      "Installation of +/- 100 MVAR STATCOM units at critical load junctions.",
      "Enables high-speed reactive power response to voltage dips from wind-solar fluctuations.",
      "Enhances transient stability limits of the inter-regional corridor.",
      "Concept cleared by APERC; tender planning in progress."
    ]
  }
];

export const NOTICES: Notice[] = [
  {
    id: "ntc-001",
    title: "Notification for Recruitment of Assistant Engineers (Electrical & Civil) - Notification No. 01/2026",
    publishDate: "2026-06-20",
    category: "Notification",
    docSize: "1.4 MB",
    isNew: true,
    department: "HR & Administration"
  },
  {
    id: "ntc-002",
    title: "Office Order: Revision of Allowances and Medical Reimbursement Policies for APTRANSCO Field Engineers",
    publishDate: "2026-06-18",
    category: "Office Order",
    docSize: "680 KB",
    isNew: true,
    department: "Finance"
  },
  {
    id: "ntc-003",
    title: "Press Release: APTRANSCO achieves record transmission grid availability of 99.95% during summer peak load",
    publishDate: "2026-06-14",
    category: "Press Release",
    docSize: "245 KB",
    isNew: false,
    department: "Public Relations"
  },
  {
    id: "ntc-004",
    title: "Circular: Technical Advisory and Guidelines for Prevention of Corridor Flashovers during Monsoon Season",
    publishDate: "2026-06-10",
    category: "Circular",
    docSize: "2.1 MB",
    isNew: false,
    department: "Grid Operations"
  },
  {
    id: "ntc-005",
    title: "PRTI Training Calendar - Q3 (July-September 2026) for Substation Operators & Grid Managers",
    publishDate: "2026-06-05",
    category: "Circular",
    docSize: "1.1 MB",
    isNew: false,
    department: "Training / PRTI"
  },
  {
    id: "ntc-006",
    title: "Annual Tariff Petition Filing for FY 2026-27 submitted before Andhra Pradesh Electricity Regulatory Commission (APERC)",
    publishDate: "2026-05-28",
    category: "Notification",
    docSize: "5.6 MB",
    isNew: false,
    department: "Regulatory & Tariffs"
  }
];

export const OFFICE_DIRECTORY: OfficeDirectory[] = [
  {
    id: "dir-1",
    circleName: "Corporate Office, Vijayawada",
    designation: "Chief Engineer (Telecom & IT)",
    officerName: "Sri K. Somasekhar",
    contactNo: "+91 9440684531",
    email: "cetelecom.vja@aptransco.gov.in",
    address: "Room 403, 4th Floor, APTRANSCO Vidyut Soudha, Gunadala, Vijayawada, AP - 520004"
  },
  {
    id: "dir-2",
    circleName: "Corporate Office, Vijayawada",
    designation: "Assistant Div. Engineer (IT Applications)",
    officerName: "Sri M. S. Prasad",
    contactNo: "+91 9490154303",
    email: "adeit.apps@aptransco.gov.in",
    address: "Room 408, 4th Floor, APTRANSCO Vidyut Soudha, Gunadala, Vijayawada, AP - 520004"
  },
  {
    id: "dir-3",
    circleName: "Vijayawada Transmission Circle",
    designation: "Superintending Engineer (OM)",
    officerName: "Sri V. Rama Krishna",
    contactNo: "+91 9440811022",
    email: "seom.vja@aptransco.gov.in",
    address: "220kV Substation Campus, Gunadala, Vijayawada, AP - 520004"
  },
  {
    id: "dir-4",
    circleName: "Visakhapatnam Transmission Circle",
    designation: "Superintending Engineer (OM)",
    officerName: "Sri G. Srinivasa Rao",
    contactNo: "+91 9440811055",
    email: "seom.vizag@aptransco.gov.in",
    address: "400kV Substation Campus, Kalavaripalem, Visakhapatnam, AP - 530041"
  },
  {
    id: "dir-5",
    circleName: "Kadapa Transmission Circle",
    designation: "Superintending Engineer (OM)",
    officerName: "Sri T. Sreedhar",
    contactNo: "+91 9440811088",
    email: "seom.kdp@aptransco.gov.in",
    address: "220kV Substation Campus, Chinnachowk, Kadapa, AP - 516002"
  },
  {
    id: "dir-6",
    circleName: "Kurnool Transmission Circle",
    designation: "Superintending Engineer (OM)",
    officerName: "Sri M. Prasada Rao",
    contactNo: "+91 9440811099",
    email: "seom.krnl@aptransco.gov.in",
    address: "132kV Substation Campus, Joharapuram, Kurnool, AP - 518002"
  }
];

export const DEPARTMENTS: DepartmentSummary[] = [
  {
    id: "dept-1",
    name: "Telecom & IT Department",
    description: "The digital backbone of APTRANSCO, administering the state-wide Optical Fiber Ground Wire (OPGW) network, ERP systems, SCADA communications, and real-time cybersecurity protocols.",
    keyResponsibilities: [
      "Maintenance of 8,500+ km of OPGW high-speed communications fiber on active transmission lines.",
      "Deployment of SAP S/4HANA ERP, covering materials, finance, HR, and project management modules.",
      "Operating the Cybersecurity Operations Center (CSOC) in compliance with CERT-In standards.",
      "Integrating GIS Mapping systems for real-time visualization of transmission assets."
    ],
    currentInitiatives: [
      "State-wide transition to centralized Cloud Hosting for core billing databases.",
      "Installation of terminal OPGW optical gear in remote 132kV substations.",
      "Setting up a modern AI-based threat vector monitoring console."
    ],
    headOfDepartment: "Chief Engineer (Telecom & IT) / Corporate Office"
  },
  {
    id: "dept-2",
    name: "Grid Operations & Load Despatch (SLDC)",
    description: "The central brain governing real-time power flow scheduling, grid balance, and frequency regulation across Andhra Pradesh, in tight coordination with southern regional and national load centres.",
    keyResponsibilities: [
      "Scheduling power dispatch across multiple public, private, and central sector generating stations.",
      "Maintaining state-wide grid security and frequency band within 49.90 Hz - 50.05 Hz limits.",
      "Operating the SCADA / EMS (Energy Management System) control centres.",
      "Forecasting load curves and scheduling renewable energy evacuation."
    ],
    currentInitiatives: [
      "Deployment of REMC (Renewable Energy Management Centre) for artificial intelligence-backed wind and solar forecasting.",
      "Installation of Phasor Measurement Units (PMUs) for high-speed synchrophasor analytics."
    ],
    headOfDepartment: "Chief Engineer (SLDC & Grid Operations)"
  },
  {
    id: "dept-3",
    name: "Projects & Erection",
    description: "Responsible for executing long-term capital plans, establishing high-voltage substations, stringing high-capacity transmission lines, and modernizing existing infrastructure.",
    keyResponsibilities: [
      "Engineering, design, procurement, and construction (EPC) management of new 400kV and 220kV substations.",
      "Overseeing the shift from conventional AIS (Air Insulated) to Gas Insulated Substations (GIS).",
      "Surveying and acquiring Right of Way (RoW) for new inter-district transmission corridors.",
      "Erecting eco-friendly and high-capacity multi-circuit multi-voltage narrow-base towers."
    ],
    currentInitiatives: [
      "Constructing 4 massive Green Energy Corridor pooling stations for wind/solar plants.",
      "Re-conductoring high-loss historical 132kV lines with modern composite core HTLS conductors."
    ],
    headOfDepartment: "Chief Engineer (Projects & Construction)"
  },
  {
    id: "dept-4",
    name: "Finance & Accounts",
    description: "Manages financial resources, prepares annual budgets, conducts audits, interfaces with international lending agencies (e.g., World Bank, KfW), and submits tariff petitions before the regulator.",
    keyResponsibilities: [
      "Capital budgeting and resource mobilization for multi-crore grid infrastructure.",
      "Formulating Annual Financial Statements, Balance Sheets, and auditing disclosures.",
      "Developing long-term cost recovery models and calculating wheeling charges.",
      "Filing the Multi-Year Tariff (MYT) petitions before APERC."
    ],
    currentInitiatives: [
      "Direct integration of corporate bank lines with SAP ERP for automated contractor payments.",
      "Acquiring low-interest ESG climate financing bonds for renewable grid reinforcement."
    ],
    headOfDepartment: "Director (Finance) / Chief General Manager (Finance)"
  },
  {
    id: "dept-5",
    name: "HR, Administration & Training (PRTI)",
    description: "Manages recruitment, talent retention, employee relations, and skills upgrading through the prestigious Power Research & Training Institute (PRTI).",
    keyResponsibilities: [
      "Formulating service regulations, recruitment notices, and supervising board promotions.",
      "Supervising employee welfare, retirement benefits, and medical schemes.",
      "Administering PRTI, a state-recognized center for technical and management training in power utilities.",
      "Organizing regular safety training and live-line maintenance drills for line-staff."
    ],
    currentInitiatives: [
      "Web-based Online Employee Performance Appraisal System (e-SPAN).",
      "PRTI smart classroom setup and virtual simulator for substation operator emergency drills."
    ],
    headOfDepartment: "Joint Managing Director (HR, Admin & Grid)"
  }
];

// Interactive Sitemap Node Structure representing the full APTRANSCO Site Map Hierarchy
export interface SitemapNode {
  name: string;
  url: string;
  category: "Core" | "Operations" | "Stakeholder" | "Department" | "Utility";
  children?: SitemapNode[];
}

export const SITEMAP_DATA: SitemapNode = {
  name: "APTRANSCO Portal (Root)",
  url: "/",
  category: "Core",
  children: [
    {
      name: "Core Public Pages",
      url: "/core",
      category: "Core",
      children: [
        { name: "Home Page", url: "/", category: "Core" },
        { name: "About APTRANSCO", url: "/about", category: "Core" },
        { name: "Vision, Mission & Values", url: "/about#vision", category: "Core" },
        { name: "Organization Structure", url: "/about#org-structure", category: "Core" },
        { name: "Board of Directors / Leadership", url: "/about#board", category: "Core" },
        { name: "Contact Directory", url: "/contact", category: "Core" },
        { name: "Office Locations / Circle Presence", url: "/contact#locations", category: "Core" }
      ]
    },
    {
      name: "Operational & Information Pages",
      url: "/operations",
      category: "Operations",
      children: [
        { name: "Transmission Network Overview", url: "/operations", category: "Operations" },
        { name: "Ongoing Projects / Works", url: "/operations#projects", category: "Operations" },
        { name: "Tenders & Procurements", url: "/tenders", category: "Operations" },
        { name: "Notifications, Circulars & Orders", url: "/notices", category: "Operations" },
        { name: "Press Releases & News", url: "/notices#press", category: "Operations" },
        { name: "Careers & Recruitment Portal", url: "/notices#careers", category: "Operations" },
        { name: "Vendor & Contractor Registrations", url: "/tenders#vendors", category: "Operations" }
      ]
    },
    {
      name: "Stakeholder & Compliance",
      url: "/compliance",
      category: "Stakeholder",
      children: [
        { name: "RTI Act & Public Disclosures", url: "/rti", category: "Stakeholder" },
        { name: "Tariffs & Regulatory Filings", url: "/rti#tariff", category: "Stakeholder" },
        { name: "Reports & Performance Audits", url: "/rti#reports", category: "Stakeholder" },
        { name: "Safety Codes & Technical Manuals", url: "/rti#safety", category: "Stakeholder" },
        { name: "FAQ Portal", url: "/faq", category: "Stakeholder" },
        { name: "Privacy Policy, Disclaimer & Accessibility", url: "/privacy", category: "Stakeholder" }
      ]
    },
    {
      name: "Departments & Sub-Offices",
      url: "/departments",
      category: "Department",
      children: [
        { name: "Telecom & IT Department", url: "/departments/telecom-it", category: "Department" },
        { name: "Grid Operations & Transmission SLDC", url: "/departments/grid-ops", category: "Department" },
        { name: "Projects & Erection", url: "/departments/projects", category: "Department" },
        { name: "Finance & Accounts", url: "/departments/finance", category: "Department" },
        { name: "HR, Administration & PRTI", url: "/departments/hr-admin", category: "Department" }
      ]
    },
    {
      name: "Utility Experience Pages",
      url: "/utility",
      category: "Utility",
      children: [
        { name: "Advanced Search Results Page", url: "/search", category: "Utility" },
        { name: "Document Library & Downloads", url: "/downloads", category: "Utility" },
        { name: "Citizen Feedback & Grievances", url: "/contact#feedback", category: "Utility" },
        { name: "Sitemap Page", url: "/sitemap", category: "Utility" },
        { name: "404 Error Page Mockup", url: "/404-error", category: "Utility" }
      ]
    }
  ]
};
