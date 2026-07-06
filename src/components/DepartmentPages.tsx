import React, { useState, useEffect } from "react";
import { DEPARTMENTS } from "../data";
import { 
  Activity, 
  Zap, 
  TrendingUp, 
  Clock, 
  ShieldAlert, 
  Wrench, 
  Hammer, 
  CheckSquare, 
  DollarSign, 
  BarChart2, 
  PieChart, 
  Calculator, 
  FileSpreadsheet, 
  Users, 
  GraduationCap, 
  Award, 
  BookOpen, 
  HeartHandshake, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  Download, 
  Search, 
  Compass, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Layers,
  Settings,
  ArrowRight,
  Route,
  Cpu,
  Building2,
  Leaf,
  SunMedium,
  Wind,
  Landmark,
  RadioTower
} from "lucide-react";

interface SubPageProps {
  setActivePage: (url: string) => void;
  language: "EN" | "TE";
  isHighContrast: boolean;
  fontScale: number;
  viewportMode?: "desktop" | "tablet" | "mobile";
}

/* =========================================================================
   1. GRID OPERATIONS & SLDC DEPARTMENT PAGE
   ========================================================================= */
export const GridOpsPage: React.FC<SubPageProps> = ({ setActivePage, language, isHighContrast, fontScale }) => {
  const dept = DEPARTMENTS[1]; // Grid Operations & SLDC
  const [demand, setDemand] = useState(9540);
  const [frequency, setFrequency] = useState(50.02);
  const [gridStress, setGridStress] = useState(false);
  const [scadaLogs, setScadaLogs] = useState<string[]>([
    "SCADA: System normal - State Frequency hovering at 50.02 Hz.",
    "SLDC: Vemagiri 400kV Feeder 1 load scheduling balanced at 240MW.",
    "APSLDC: Weather tracking suggests low-pressure solar drop. Transitioning to hydel backup.",
  ]);

  const handleRefresh = () => {
    // Simulate real-time fluctuations
    const demandDelta = Math.floor(Math.random() * 80) - 40;
    const freqDelta = parseFloat((Math.random() * 0.04 - 0.02).toFixed(3));
    setDemand(prev => prev + demandDelta);
    setFrequency(prev => parseFloat((Math.max(49.85, Math.min(50.15, prev + freqDelta))).toFixed(2)));
    
    const newLog = `SCADA: Telemetry updated. Current system demand at ${demand + demandDelta} MW. Freq: ${(frequency + freqDelta).toFixed(2)} Hz.`;
    setScadaLogs(prev => [newLog, ...prev.slice(0, 4)]);
  };

  const toggleGridStress = () => {
    if (!gridStress) {
      setGridStress(true);
      setDemand(11840);
      setFrequency(49.91);
      setScadaLogs(prev => [
        "ALARM: Grid under frequency stress! Active frequency dropped below 49.92 Hz.",
        "EMERGENCY: Directing Simhadri thermal units to ramp up secondary reserves +200MW.",
        "SLDC: Load dispatcher evaluating contingency line clearances.",
        ...prev
      ]);
    } else {
      setGridStress(false);
      setDemand(9540);
      setFrequency(50.02);
      setScadaLogs(prev => [
        "SCADA: Emergency conditions cleared. Grid frequency restored to nominal zone.",
        "APSLDC: Normal scheduling sequence re-initiated.",
        ...prev
      ]);
    }
  };

  const t = {
    EN: {
      badge: "State Load Despatch Centre (SLDC)",
      title: "Grid Operations & Load Despatch",
      telemetryTitle: "Live SCADA Grid Telemetry Simulator",
      demandLabel: "Current State Demand",
      freqLabel: "Frequency Band",
      statusNormal: "GRID STABILITY: NORMAL",
      statusStress: "GRID STABILITY: HEAVY STRESS / INSUFFICIENT SPINNING RESERVE",
      simStressBtn: "Simulate Grid Peak Load Stress",
      resolveStressBtn: "Restore Grid to Nominal State",
      activeFeeder: "EHT Active Feeder Status"
    },
    TE: {
      badge: "స్టేట్ లోడ్ డిస్పాచ్ సెంటర్ (SLDC)",
      title: "గ్రిడ్ ఆపరేషన్స్ & లోడ్ డిస్పాచ్",
      telemetryTitle: "లైవ్ SCADA గ్రిడ్ టెలిమెట్రీ సిమ్యులేటర్",
      demandLabel: "ప్రస్తుత విద్యుత్ డిమాండ్",
      freqLabel: "గ్రిడ్ ఫ్రీక్వెన్సీ",
      statusNormal: "గ్రిడ్ స్థిరత్వం: సాధారణం",
      statusStress: "గ్రిడ్ స్థిరత్వం: అధిక భారం / ఫ్రీక్వెన్సీ లోపం",
      simStressBtn: "గ్రిడ్ పీక్ లోడ్‌ను అనుకరించండి",
      resolveStressBtn: "గ్రిడ్‌ను సాధారణ స్థితికి తీసుకురండి",
      activeFeeder: "EHT యాక్టివ్ ఫీడర్ స్థితి"
    }
  }[language];

  return (
    <div className="animate-fade-in w-full">
      {/* Hero Banner with custom background photo */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1581092244675-c10485cb8a5a?auto=format&fit=crop&q=80&w=1600')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.15),transparent_60%)] pointer-events-none z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-3xl drop-shadow-sm" style={{ fontSize: `${14 * fontScale}px` }}>
            {dept.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Area: Responsibilities & Simulator */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive SLDC Grid Simulator */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
            } space-y-6`}>
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2" style={{ fontSize: `${14 * fontScale}px` }}>
                  <Activity size={16} className="text-cyan-500 animate-pulse" />
                  {t.telemetryTitle}
                </h3>
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <RefreshCw size={11} />
                  Refresh Telemetry
                </button>
              </div>

              {/* Status Alert */}
              <div className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs font-bold font-mono ${
                gridStress 
                  ? "bg-rose-50 border-rose-200 text-rose-800" 
                  : "bg-emerald-50 border-emerald-200 text-emerald-800"
              }`}>
                <div className={`w-2 h-2 rounded-full ${gridStress ? "bg-rose-500 animate-ping" : "bg-emerald-500 animate-pulse"}`}></div>
                <span>{gridStress ? t.statusStress : t.statusNormal}</span>
              </div>

              {/* Live Telemetry Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 border p-4 rounded-xl text-center space-y-1">
                  <span className="text-[10px] uppercase font-black text-slate-400 font-sans">{t.demandLabel}</span>
                  <div className="text-2xl font-black font-mono text-slate-800">{demand.toLocaleString()} <span className="text-xs">MW</span></div>
                </div>
                <div className="bg-slate-50 border p-4 rounded-xl text-center space-y-1">
                  <span className="text-[10px] uppercase font-black text-slate-400 font-sans">{t.freqLabel}</span>
                  <div className={`text-2xl font-black font-mono ${frequency < 49.95 ? "text-rose-600" : "text-slate-800"}`}>
                    {frequency.toFixed(2)} <span className="text-xs">Hz</span>
                  </div>
                </div>
                <div className="bg-slate-50 border p-4 rounded-xl text-center space-y-1">
                  <span className="text-[10px] uppercase font-black text-slate-400 font-sans">Active Load Shedding</span>
                  <div className={`text-2xl font-black font-mono ${gridStress ? "text-rose-600" : "text-emerald-600"}`}>
                    {gridStress ? "250 MW" : "0 MW"}
                  </div>
                </div>
              </div>

              {/* Stress Simulation Button */}
              <div className="pt-2">
                <button
                  onClick={toggleGridStress}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center ${
                    gridStress 
                      ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black" 
                      : "bg-rose-600 hover:bg-rose-500 text-white font-black"
                  }`}
                >
                  {gridStress ? t.resolveStressBtn : t.simStressBtn}
                </button>
              </div>

              {/* Live Dispatch Logs */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">SLDC Live Operations &amp; Dispatch Log</h4>
                <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[11px] leading-relaxed space-y-2 h-36 overflow-y-auto border border-slate-800">
                  {scadaLogs.map((log, index) => (
                    <div key={index} className={`flex items-start gap-1.5 ${log.startsWith("ALARM") || log.startsWith("EMERGENCY") ? "text-rose-400 font-bold" : "text-cyan-400"}`}>
                      <span>&gt;</span>
                      <p>{log}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Department Operational Domain & Key Responsibilities */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-4`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800" style={{ fontSize: `${14 * fontScale}px` }}>
                Operational Domain &amp; Responsibilities
              </h3>
              <ul className="space-y-3 font-sans text-xs text-slate-600 leading-relaxed">
                {dept.keyResponsibilities.map((resp, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-[10px] shrink-0">{i+1}</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Current Key Initiatives */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-4`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800" style={{ fontSize: `${14 * fontScale}px` }}>
                Ongoing Strategic Grid Initiatives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dept.currentInitiatives.map((init, idx) => (
                  <div key={idx} className="border p-4 rounded-xl bg-slate-50/50 border-slate-100 space-y-1">
                    <span className="text-[9px] uppercase font-bold text-cyan-700 bg-cyan-100/50 px-2 py-0.5 rounded border border-cyan-100">
                      GRID INITIATIVE {idx+1}
                    </span>
                    <p className="text-xs font-semibold text-slate-800 leading-relaxed font-sans">{init}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Real-time Grid Generation Mix Breakdown */}
            <div className={`p-5 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-4`}>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Current Grid Generation Mix</h4>
              <div className="space-y-3 text-xs font-sans">
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Thermal Generation (SGS)</span>
                    <span className="font-mono font-bold">4,500 MW (47%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: "47%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Central Generating Stations (CGS)</span>
                    <span className="font-mono font-bold">2,140 MW (22%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: "22%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Hydel Power Reserve</span>
                    <span className="font-mono font-bold">1,420 MW (15%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Renewable Energy (Wind &amp; Solar)</span>
                    <span className="font-mono font-bold">1,480 MW (16%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: "16%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Head details */}
            <div className="p-5 bg-cyan-50/50 border border-cyan-200/50 rounded-2xl space-y-3">
              <span className="text-[9px] uppercase font-black text-cyan-800 tracking-widest block">Chief load dispatcher</span>
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-900">{dept.headOfDepartment}</p>
                <p className="text-[10px] text-slate-500 font-sans">Corporate Grid Command Headquarters, Vijayawada.</p>
              </div>
              <button 
                onClick={() => setActivePage("/contact")}
                className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Contact Grid Control Desk</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Operational Regulations Documents */}
            <div className={`p-5 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 animate-fade-in"
            } space-y-3`}>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Statutory Grid Guidelines</h4>
              <div className="space-y-2.5 font-sans text-xs">
                <button 
                  onClick={() => alert("Downloading State Grid Code (Revised 2024)...")}
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-lg flex items-center justify-between text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <span className="truncate pr-2">Andhra Pradesh State Grid Code 2024</span>
                  <Download size={13} className="shrink-0 text-slate-400" />
                </button>
                <button 
                  onClick={() => alert("Downloading ABT Metering billing instructions...")}
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-lg flex items-center justify-between text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <span className="truncate pr-2">Availability Based Tariff (ABT) Guidelines</span>
                  <Download size={13} className="shrink-0 text-slate-400" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};


/* =========================================================================
   2. PROJECTS & ERECTION DEPARTMENT PAGE
   ========================================================================= */
export const ProjectsPage: React.FC<SubPageProps> = ({ setActivePage, language, isHighContrast, fontScale }) => {
  const dept = DEPARTMENTS[2]; // Projects & Erection
  const [selectedProjectId, setSelectedProjectId] = useState("proj-1");
  const [selectedMapNode, setSelectedMapNode] = useState("Vijayawada");
  const [liveDemand, setLiveDemand] = useState(10810);
  const [liveFrequency, setLiveFrequency] = useState(50.02);
  const [liveAvailability, setLiveAvailability] = useState(99.86);
  const [liveReserve, setLiveReserve] = useState(1480);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveDemand(prev => prev + (Math.random() > 0.5 ? 35 : -25));
      setLiveFrequency(prev => parseFloat(Math.min(50.06, Math.max(49.94, prev + (Math.random() - 0.5) * 0.02)).toFixed(2)));
      setLiveAvailability(prev => parseFloat(Math.min(99.98, Math.max(99.72, prev + (Math.random() - 0.5) * 0.04)).toFixed(2)));
      setLiveReserve(prev => prev + (Math.random() > 0.5 ? 12 : -10));
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const ACTIVE_PROJECTS_DETAILS = [
    {
      id: "proj-1",
      name: "Vizag Industrial Corridor Substation (400/220kV GIS)",
      location: "Visakhapatnam, Andhra Pradesh",
      status: "EPC Construction Phase - 78%",
      details: "A strategically located gas insulated substation designed to secure high-reliability power for port-based industry, petrochemicals, and export logistics infrastructure.",
      metrics: {
        civilWorks: 95,
        gasEquipmentErection: 80,
        relayPanelCabling: 55,
        testingCommissioning: 10,
        eta: "December 2026"
      }
    },
    {
      id: "proj-2",
      name: "Rayalaseema Green Energy Evacuation Corridor (400kV Quad)",
      location: "Ananthapuramu & Kadapa Districts",
      status: "Tower Stringing Phase - 62%",
      details: "A high-capacity corridor built to evacuate renewable generation from solar and wind parks into the state and regional network with stable transfer capability.",
      metrics: {
        civilWorks: 88,
        gasEquipmentErection: 70,
        relayPanelCabling: 45,
        testingCommissioning: 5,
        eta: "March 2027"
      }
    },
    {
      id: "proj-3",
      name: "Amaravati Capital Region Green Grid Augmentation",
      location: "Guntur & Vijayawada Zones",
      status: "Engineering & Procurement Phase - 45%",
      details: "A planned reinforcement of 220kV sub-transmission loops to support urban growth, transit-oriented development, and higher-quality service continuity.",
      metrics: {
        civilWorks: 60,
        gasEquipmentErection: 40,
        relayPanelCabling: 20,
        testingCommissioning: 0,
        eta: "September 2027"
      }
    }
  ];

  const selectedProj = ACTIVE_PROJECTS_DETAILS.find(p => p.id === selectedProjectId) || ACTIVE_PROJECTS_DETAILS[0];

  const mapNodes = [
    { name: "Visakhapatnam", title: "Port and industrial load hub", status: "High industrial demand" },
    { name: "Vijayawada", title: "State transmission junction", status: "Stable operational load" },
    { name: "Kurnool", title: "Renewable pooling node", status: "Solar surplus corridor" },
    { name: "Nellore", title: "Coastal and southern intertie", status: "Inter-state transfer support" }
  ];

  const lifecycleItems = [
    { title: "System Planning", detail: "Load flow and contingency studies guide corridor selection and capacity augmentation." },
    { title: "Detailed Design", detail: "Transmission line, substation layout, and protection schemes are finalized with statutory compliance." },
    { title: "Procurement", detail: "Critical equipment is sourced through transparent public procurement and engineering review." },
    { title: "Construction", detail: "Foundations, tower erection, stringing, and substation bays are executed in phases." },
    { title: "Testing & Commissioning", detail: "Protection panels, SCADA integration, and relay systems are validated before energization." },
    { title: "Operations & Performance", detail: "Live monitoring, maintenance planning, and reliability audits sustain long-term network health." }
  ];

  const renewableHighlights = [
    { icon: SunMedium, label: "Solar evacuation", text: "High-capacity solar pooling stations are integrated into 400kV corridors for rapid dispatch." },
    { icon: Wind, label: "Wind balancing", text: "Dynamic scheduling supports wind variability while preserving system frequency and voltage limits." },
    { icon: Zap, label: "Storage readiness", text: "Pilot-ready storage interfaces are being evaluated for peak shifting and grid support services." }
  ];

  const smartGridTechnologies = [
    { title: "Digital Twin Modelling", text: "Network simulation supports outage planning, feeder optimization, and preventive maintenance decisions." },
    { title: "Cyber-secured SCADA", text: "Protected control systems combine real-time telemetry, role-based access, and incident monitoring." },
    { title: "Adaptive Protection", text: "Intelligent relays and line differential protection improve stability under changing loading patterns." }
  ];

  const sustainabilityActions = [
    "Reduced transmission losses through upgraded conductor design and right-of-way optimization.",
    "Low-impact substation siting and site restoration measures aligned with environmental review requirements.",
    "Renewable-ready corridors that support state clean energy targets and long-term grid decarbonization."
  ];

  const t = {
    EN: {
      badge: "Transmission Infrastructure & Grid Modernization",
      title: "Grid & Projects Command",
      summary: "A flagship view of APTRANSCO's transmission portfolio, live network performance, and flagship infrastructure delivery for a resilient future-ready grid.",
      dashboardTitle: "Live Grid Operations Dashboard",
      dashboardSubtitle: "Operational stability indicators updated from the state control environment.",
      mapTitle: "Andhra Pradesh Transmission Network",
      mapSubtitle: "Interactive view of major transmission nodes, renewable interties, and industrial demand centers.",
      projectsTitle: "Major Transmission Projects",
      projectsSubtitle: "Select a flagship programme to review progress and delivery focus.",
      timelineTitle: "Infrastructure Lifecycle Timeline",
      timelineSubtitle: "From planning approval to energization and long-term asset management.",
      renewablesTitle: "Renewable Energy Integration",
      renewablesSubtitle: "Clean energy evacuation and balancing measures that strengthen the state network.",
      smartTitle: "Smart Grid Vision",
      smartSubtitle: "Future-ready controls and protection systems for a secure, flexible transmission network.",
      sustainabilityTitle: "Sustainability Initiatives",
      sustainabilitySubtitle: "Responsible delivery of critical infrastructure with environmental stewardship.",
      ctaTitle: "Official Resources",
      ctaText: "Access procurement notices, current project updates, and public information channels directly from APTRANSCO.",
      procurement: "Procurement & Tenders",
      projects: "Current Projects",
      resources: "Public Resources"
    },
    TE: {
      badge: "ట్రాన్స్మిషన్ ఇన్ఫ్రాస్ట్రక్చర్ & గ్రిడ్ మోడరెనైజేషన్",
      title: "గ్రిడ్ & ప్రాజెక్ట్స్ కమాండ్",
      summary: "APTRANSCO యొక్క ట్రాన్స్మిషన్ పోర్ట్ఫోలియో, లైవ్ నెట్‌వర్క్ పనితీరు మరియు భవిష్యత్తుకు సిద్ధమైన గ్రిడ్‌కి అవసరమైన ప్రధాన ఇన్ఫ్రాస్ట్రక్చర్ డెలివరీని చూపించే ప్రముఖ వీక్షణ.",
      dashboardTitle: "లైవ్ గ్రిడ్ ఆపరేషన్స్ డ్యాష్‌బోర్డ్",
      dashboardSubtitle: "రాష్ట్ర నియంత్రణ వాతావరణం నుండి నవీకరించబడిన కార్యాచరణ స్థిరత్వ సూచికలు.",
      mapTitle: "ఆంధ్రప్రదేశ్ ట్రాన్స్మిషన్ నెట్‌వర్క్",
      mapSubtitle: "ప్రధాన ట్రాన్స్మిషన్ నోడ్స్, పునరుత్పాదక ఇంటీరీస్ మరియు పారిశ్రామిక డిమాండ్ సెంటర్ల ఇంటరాక్టివ్ వీక్షణ.",
      projectsTitle: "ప్రధాన ట్రాన్స్మిషన్ ప్రాజెక్టులు",
      projectsSubtitle: "ప్రగతి మరియు డెలివరీ ఫోకస్‌ను సమీక్షించడానికి ఒక ఫ్లాగ్షిప ప్రోగ్రామ్‌ను ఎంచుకోండి.",
      timelineTitle: "ఇన్ఫ్రాస్ట్రక్చర్ లైఫ్‌సైకిల్ టైమ్‌లైన్",
      timelineSubtitle: "ప్లానింగ్ ఆమోదం నుండి ఎనర్జైజేషన్ మరియు దీర్ఘకాలిక ఆస్తి నిర్వహణ వరకు.",
      renewablesTitle: "పునరుత్పాదక శక్తి సమగ్రీకరణ",
      renewablesSubtitle: "రాష్ట్ర నెట్‌వర్క్‌ను బలోపేత చేసే శుభ్రమైన శక్తి ఎవిక్యుయేషన్ మరియు బ్యాలెన్సింగ్ చర్యలు.",
      smartTitle: "స్మార్ట్ గ్రిడ్ విజన్",
      smartSubtitle: "సురక్షిత, లचीളైన ట్రాన్స్మిషన్ నెట్‌వర్క్ కోసం భవిష్యత్తుకు సిద్ధమైన నియంత్రణలు మరియు రక్షణ వ్యవస్థలు.",
      sustainabilityTitle: "స్థిరత్వ ముందడుగు",
      sustainabilitySubtitle: "పర్యావరణ జాగ్రత్తతో కీలకమైన ఇన్ఫ్రాస్ట్రక్చర్ యొక్క బాధ్యతాయుత డెలివరీ.",
      ctaTitle: "అధికారిక వనరులు",
      ctaText: "APTRANSCO నుండి సరఫరా ప్రకటనలు, ప్రస్తుత ప్రాజెక్ట్ నవీకరణలు మరియు ప్రజా సమాచారం ఛానెల్‌లను నేరుగా పొందండి.",
      procurement: "సరఫరా & టెండర్లు",
      projects: "ప్రస్తుత ప్రాజెక్టులు",
      resources: "ప్రజా వనరులు"
    }
  }[language];

  return (
    <div className="animate-fade-in w-full">
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593349480506-8e1f6b3e7c6b?auto=format&fit=crop&q=80&w=1600')" }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-slate-950/45 to-slate-950/20 z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(14,165,233,0.16),transparent_34%)] z-10"></div>
          </>
        )}

        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6 items-end">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
                {t.badge}
              </span>
              <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
                {t.title}
              </h2>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-3xl" style={{ fontSize: `${14 * fontScale}px` }}>
                {t.summary}
              </p>
            </div>

            <div className={`rounded-2xl border p-4 space-y-3 ${isHighContrast ? "bg-black border-white/50" : "bg-slate-900/75 border-slate-700/70"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">System status</p>
                  <p className="text-sm font-black text-white">Transmission network healthy</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Demand</p>
                  <p className="mt-1 text-lg font-black text-white">{liveDemand.toLocaleString()} MW</p>
                </div>
                <div className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Frequency</p>
                  <p className="mt-1 text-lg font-black text-white">{liveFrequency.toFixed(2)} Hz</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-8">
        <section className={`rounded-3xl border p-6 md:p-8 ${isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"}`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 pb-5 border-b border-slate-100">
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.25em] text-cyan-700">{t.dashboardTitle}</p>
              <h3 className="text-lg md:text-xl font-black uppercase tracking-wider text-slate-800">{t.dashboardSubtitle}</h3>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
              <Activity size={12} className="text-cyan-600" />
              SCADA telemetry synchronized
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "State Demand", value: `${liveDemand.toLocaleString()} MW`, tone: "text-slate-900" },
                { label: "System Frequency", value: `${liveFrequency.toFixed(2)} Hz`, tone: liveFrequency < 49.98 ? "text-rose-600" : "text-slate-900" },
                { label: "Availability", value: `${liveAvailability.toFixed(2)}%`, tone: "text-emerald-700" },
                { label: "Spinning Reserve", value: `${liveReserve.toLocaleString()} MW`, tone: "text-cyan-700" }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                  <p className={`mt-2 text-2xl font-black ${item.tone}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Operational posture</p>
                  <p className="text-sm font-black text-white">Stable transmission corridor</p>
                </div>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                  Normal
                </div>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm">
                  <span className="text-slate-300">400kV backbone</span>
                  <span className="font-black text-white">97.2%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm">
                  <span className="text-slate-300">220kV support</span>
                  <span className="font-black text-white">94.8%</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm">
                  <span className="text-slate-300">Protection health</span>
                  <span className="font-black text-white">99.4%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className={`rounded-3xl border p-6 md:p-8 ${isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"}`}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 pb-5 border-b border-slate-100">
              <div>
                <p className="text-[10px] uppercase font-black tracking-[0.25em] text-cyan-700">{t.mapTitle}</p>
                <h3 className="text-lg font-black uppercase tracking-wider text-slate-800">{t.mapSubtitle}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {mapNodes.map((node) => (
                  <button
                    key={node.name}
                    onClick={() => setSelectedMapNode(node.name)}
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide transition-all ${selectedMapNode === node.name ? "border-cyan-600 bg-cyan-50 text-cyan-700" : "border-slate-200 bg-slate-50 text-slate-600"}`}
                  >
                    {node.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.7fr] gap-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <svg viewBox="0 0 560 380" className="h-75 w-full">
                  <rect x="20" y="20" width="520" height="340" rx="20" fill="#07131f" />
                  <path d="M92 102c25-35 74-45 112-28l48 28 72-16 58 32 65 16-14 68-56 39-52 11-55-18-17-49-29 3-26-17-38-8-40-34z" fill="#10233b" stroke="#214662" strokeWidth="2" />
                  <path d="M115 208l70-26 63 15 68 33 78-31 55 19" stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M182 153l46 30 57-7 48 22" stroke="#14b8a6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <circle cx="160" cy="170" r="10" fill="#f59e0b" />
                  <circle cx="240" cy="184" r="11" fill="#38bdf8" />
                  <circle cx="330" cy="166" r="10" fill="#f59e0b" />
                  <circle cx="420" cy="195" r="10" fill="#38bdf8" />
                  <circle cx="250" cy="263" r="9" fill="#f59e0b" />
                  <circle cx="335" cy="274" r="9" fill="#38bdf8" />
                  <text x="150" y="150" fill="#f8fafc" fontSize="13" fontFamily="Arial">Vijayawada</text>
                  <text x="226" y="208" fill="#f8fafc" fontSize="13" fontFamily="Arial">Kurnool</text>
                  <text x="320" y="146" fill="#f8fafc" fontSize="13" fontFamily="Arial">Visakhapatnam</text>
                  <text x="400" y="220" fill="#f8fafc" fontSize="13" fontFamily="Arial">Nellore</text>
                  <text x="235" y="288" fill="#f8fafc" fontSize="13" fontFamily="Arial">Tirupati</text>
                </svg>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
                <div className="flex items-center gap-2 text-cyan-700">
                  <RadioTower size={16} />
                  <p className="text-[10px] font-black uppercase tracking-[0.25em]">Selected node</p>
                </div>
                <h4 className="text-base font-black text-slate-900">{selectedMapNode}</h4>
                <p className="text-xs leading-relaxed text-slate-600">
                  {mapNodes.find((node) => node.name === selectedMapNode)?.title}
                </p>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                  {mapNodes.find((node) => node.name === selectedMapNode)?.status}
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-3xl border p-6 md:p-8 ${isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"}`}>
            <p className="text-[10px] uppercase font-black tracking-[0.25em] text-cyan-700">{t.renewablesTitle}</p>
            <h3 className="mt-2 text-lg font-black uppercase tracking-wider text-slate-800">{t.renewablesSubtitle}</h3>
            <div className="mt-5 space-y-3">
              {renewableHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-cyan-700">
                      <Icon size={16} />
                      <p className="text-sm font-black text-slate-800">{item.label}</p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`rounded-3xl border p-6 md:p-8 ${isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"}`}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 pb-5 border-b border-slate-100">
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.25em] text-cyan-700">{t.projectsTitle}</p>
              <h3 className="text-lg font-black uppercase tracking-wider text-slate-800">{t.projectsSubtitle}</h3>
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Delivery focus: reliability, capacity, renewable readiness</div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {ACTIVE_PROJECTS_DETAILS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`rounded-2xl border p-4 text-left transition-all ${selectedProjectId === proj.id ? "border-cyan-500 bg-cyan-50/70 shadow-sm" : "border-slate-200 bg-slate-50 hover:bg-slate-100"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-black text-slate-900">{proj.name}</p>
                  <Building2 size={15} className="text-cyan-700" />
                </div>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{proj.location}</p>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">{proj.details}</p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <span>{proj.status}</span>
                  <ArrowRight size={13} />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Selected programme</p>
                <h4 className="text-base font-black text-slate-900">{selectedProj.name}</h4>
              </div>
              <span className="rounded-full border border-cyan-200 bg-cyan-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-700">
                {selectedProj.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-sm">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Civil works</p>
                <p className="mt-1 font-black text-slate-900">{selectedProj.metrics.civilWorks}%</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Erection</p>
                <p className="mt-1 font-black text-slate-900">{selectedProj.metrics.gasEquipmentErection}%</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Cabling</p>
                <p className="mt-1 font-black text-slate-900">{selectedProj.metrics.relayPanelCabling}%</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Commissioning ETA</p>
                <p className="mt-1 font-black text-slate-900">{selectedProj.metrics.eta}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className={`rounded-3xl border p-6 md:p-8 ${isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"}`}>
            <p className="text-[10px] uppercase font-black tracking-[0.25em] text-cyan-700">{t.timelineTitle}</p>
            <h3 className="mt-2 text-lg font-black uppercase tracking-wider text-slate-800">{t.timelineSubtitle}</h3>
            <div className="mt-6 space-y-4">
              {lifecycleItems.map((item, index) => (
                <div key={item.title} className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 text-[11px] font-black text-cyan-700">{index + 1}</div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-3xl border p-6 md:p-8 ${isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"}`}>
            <p className="text-[10px] uppercase font-black tracking-[0.25em] text-cyan-700">{t.smartTitle}</p>
            <h3 className="mt-2 text-lg font-black uppercase tracking-wider text-slate-800">{t.smartSubtitle}</h3>
            <div className="mt-5 space-y-3">
              {smartGridTechnologies.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-cyan-700">
                    <Cpu size={16} />
                    <p className="text-sm font-black text-slate-900">{item.title}</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-8">
          <div className={`rounded-3xl border p-6 md:p-8 ${isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"}`}>
            <p className="text-[10px] uppercase font-black tracking-[0.25em] text-cyan-700">{t.sustainabilityTitle}</p>
            <h3 className="mt-2 text-lg font-black uppercase tracking-wider text-slate-800">{t.sustainabilitySubtitle}</h3>
            <div className="mt-5 space-y-3">
              {sustainabilityActions.map((item) => (
                <div key={item} className="flex gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Leaf size={16} className="mt-0.5 shrink-0 text-emerald-700" />
                  <p className="text-sm leading-relaxed text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-3xl border p-6 md:p-8 ${isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase font-black tracking-[0.25em] text-cyan-700">{t.ctaTitle}</p>
                <h3 className="mt-2 text-lg font-black uppercase tracking-wider text-slate-800">{t.ctaText}</h3>
              </div>
              <div className="rounded-full border border-slate-200 bg-slate-50 p-2 text-cyan-700">
                <ShieldCheck size={18} />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onClick={() => setActivePage("/tenders")} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:bg-slate-100">
                <p className="text-sm font-black text-slate-900">{t.procurement}</p>
                <p className="mt-2 text-[11px] text-slate-500">Current tenders and procurement updates</p>
              </button>
              <button onClick={() => setActivePage("/departments/projects")} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:bg-slate-100">
                <p className="text-sm font-black text-slate-900">{t.projects}</p>
                <p className="mt-2 text-[11px] text-slate-500">Project portfolio and implementation status</p>
              </button>
              <button onClick={() => setActivePage("/downloads")} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-all hover:bg-slate-100">
                <p className="text-sm font-black text-slate-900">{t.resources}</p>
                <p className="mt-2 text-[11px] text-slate-500">Policy documents, reports and public notices</p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};


/* =========================================================================
   3. FINANCE & ACCOUNTS DEPARTMENT PAGE
   ========================================================================= */
export const FinancePage: React.FC<SubPageProps> = ({ setActivePage, language, isHighContrast, fontScale }) => {
  const dept = DEPARTMENTS[3]; // Finance & Accounts
  const [wheelCapacity, setWheelCapacity] = useState(10);
  const [consumerType, setConsumerType] = useState<"discom" | "openAccess" | "industrial">("discom");

  // Cost estimates based on wheeling capacity
  const rates = {
    discom: 0.18, // Rs. 0.18 per Unit wheeled
    openAccess: 0.32, // Rs. 0.32 per Unit
    industrial: 0.45 // Rs. 0.45 per Unit
  };

  const calculatedWheelingCharges = wheelCapacity * 1000 * rates[consumerType]; // MW to kW approximation
  const systemLoss = parseFloat((wheelCapacity * 0.031).toFixed(2)); // Standard 3.1% transmission loss

  const t = {
    EN: {
      badge: "Financial Regulation & Capital Accounts",
      title: "Finance & Accounts Wing",
      calcTitle: "Virtual Wheeling Tariff Calculator",
      calcDesc: "Simulate wheeling and system transmission charge allocations according to current APERC multi-year tariff specifications.",
      selectConsumer: "Consumer Category",
      capLabel: "Wheeling Contract Capacity (MW)",
      chargesResult: "Estimated Wheeling Charges / Month",
      lossResult: "Allocated Grid Transmission Loss"
    },
    TE: {
      badge: "ఆర్థిక నియంత్రణ & మూలధన ఖాతాలు",
      title: "ఆర్థిక & ఖాతాల విభాగం",
      calcTitle: "వర్చువల్ వీలింగ్ టారిఫ్ కాలిక్యులేటర్",
      calcDesc: "ప్రస్తుత APERC బహుళ-సంవత్సర టారిఫ్ నిర్దేశాల ప్రకారం వీలింగ్ మరియు సిస్టమ్ ట్రాన్స్‌మిషన్ ఛార్జ్ కేటాయింపులను లెక్కించండి.",
      selectConsumer: "వినియోగదారు వర్గం",
      capLabel: "వీలింగ్ ఒప్పంద సామర్థ్యం (MW)",
      chargesResult: "అంచనా వీలింగ్ ఛార్జీలు / నెల",
      lossResult: "కేటాయించిన గ్రిడ్ ట్రాన్స్‌మిషన్ నష్టం"
    }
  }[language];

  return (
    <div className="animate-fade-in w-full">
      {/* Hero Banner with custom background photo */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-3xl drop-shadow-sm" style={{ fontSize: `${14 * fontScale}px` }}>
            {dept.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Wheeling Calculator & Budgets */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Wheeling Calculator */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
            } space-y-6`}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2" style={{ fontSize: `${14 * fontScale}px` }}>
                  <Calculator size={16} className="text-cyan-500" />
                  {t.calcTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-sans">{t.calcDesc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Inputs */}
                <div className="space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="block text-[10px] font-black uppercase text-slate-400 font-sans">{t.selectConsumer}</label>
                    <select
                      value={consumerType}
                      onChange={(e) => setConsumerType(e.target.value as any)}
                      className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-slate-50/50 cursor-pointer"
                    >
                      <option value="discom">State DISCOMs (APEPDCL / APSPDCL)</option>
                      <option value="openAccess">Open Access Solar/Wind Generators</option>
                      <option value="industrial">Heavy EHT Industrial Consumers</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <label className="block text-[10px] font-black uppercase text-slate-400 font-sans">{t.capLabel}</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="1"
                        max="150"
                        value={wheelCapacity}
                        onChange={(e) => setWheelCapacity(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                      <span className="font-mono text-sm font-black text-slate-800 w-16 text-right shrink-0">
                        {wheelCapacity} MW
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated Outputs */}
                <div className="bg-slate-50 border p-5 rounded-xl flex flex-col justify-between font-mono text-xs">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase text-slate-400 block font-sans font-bold">{t.chargesResult}</span>
                    <strong className="text-xl font-black text-slate-800">
                      Rs. {calculatedWheelingCharges.toLocaleString()} / mo
                    </strong>
                    <span className="text-[9px] text-slate-400 block font-sans">
                      Based on tariff of Rs. {rates[consumerType]} / Unit
                    </span>
                  </div>

                  <div className="space-y-1 border-t pt-3 mt-3">
                    <span className="text-[9px] uppercase text-slate-400 block font-sans font-bold">{t.lossResult}</span>
                    <strong className="text-lg font-black text-emerald-600">
                      {systemLoss} MW (3.1%)
                    </strong>
                    <span className="text-[9px] text-slate-400 block font-sans">
                      APERC transmission network loss margin
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Corporate Budget Breakdown */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
            } space-y-6`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2" style={{ fontSize: `${14 * fontScale}px` }}>
                <PieChart size={16} className="text-cyan-500" />
                Capital Investment &amp; Annual Budget Layout
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Capital Outlay (FY26)</span>
                  <strong className="text-base font-black text-slate-800">Rs. 4,200 Cr</strong>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">O&amp;M Maintenance Budget</span>
                  <strong className="text-base font-black text-slate-800">Rs. 1,150 Cr</strong>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">International Financing Outflow</span>
                  <strong className="text-base font-black text-slate-800">Rs. 850 Cr</strong>
                </div>
                <div className="p-4 bg-slate-50 border rounded-xl">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">AP State Equity Support</span>
                  <strong className="text-base font-black text-slate-800">Rs. 950 Cr</strong>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-2 text-xs text-blue-900 font-sans">
                <strong className="font-bold flex items-center gap-1">
                  <Sparkles size={13} className="text-blue-600" />
                  ESG Green Financing Bond Integration
                </strong>
                <p className="leading-relaxed text-blue-800">
                  APTRANSCO recently mobilized over Rs. 1,200 Crores through KfW climate-linked funding bonds. This funding is quarantined strictly for direct solar pooling station construction and green energetic infrastructure reinforcement across the southern districts.
                </p>
              </div>
            </div>

            {/* Department Operational Domain & Key Responsibilities */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-4`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800" style={{ fontSize: `${14 * fontScale}px` }}>
                Operational Domain &amp; Responsibilities
              </h3>
              <ul className="space-y-3 font-sans text-xs text-slate-600 leading-relaxed">
                {dept.keyResponsibilities.map((resp, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-[10px] shrink-0">{i+1}</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Department Head details */}
            <div className="p-5 bg-cyan-50/50 border border-cyan-200/50 rounded-2xl space-y-3">
              <span className="text-[9px] uppercase font-black text-cyan-800 tracking-widest block">Financial command team</span>
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-900">{dept.headOfDepartment}</p>
                <p className="text-[10px] text-slate-500 font-sans">Finance Division, Corporate Headquarters, Vijayawada.</p>
              </div>
              <button 
                onClick={() => setActivePage("/contact")}
                className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Inquire on Tariff Filings</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Strategic Initiatives */}
            <div className={`p-5 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-4`}>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Accounting Initiatives</h4>
              <div className="space-y-3 text-xs font-sans">
                {dept.currentInitiatives.map((init, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                    <span className="text-[8px] font-bold text-cyan-600 uppercase bg-cyan-50 px-1 py-0.5 rounded">INITIATIVE {idx+1}</span>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">{init}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};


/* =========================================================================
   4. HR, ADMIN & TRAINING (PRTI) DEPARTMENT PAGE
   ========================================================================= */
export const HRAdminPage: React.FC<SubPageProps> = ({ setActivePage, language, isHighContrast, fontScale }) => {
  const dept = DEPARTMENTS[4]; // HR, Administration & Training
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const QUIZ_QUESTIONS = [
    {
      q: "What is the mandatory minimum clearance distance for a 400kV EHT line passing over agricultural ground lands in AP?",
      options: ["5.2 meters", "8.8 meters", "12.4 meters", "15.0 meters"],
      correct: 1, // 8.8 meters
      explanation: "Under Central Electricity Authority (CEA) Safety Regulations, the statutory minimum vertical clearance from ground level for active 400kV EHT grid transmission towers must be 8.8 meters."
    },
    {
      q: "Which specific formal clearance permit must be signed and tagged prior to initiating any engineering maintenance on a 220kV bay feeder?",
      options: ["Permit to Work (PTW)", "Line Clearance (LC)", "Switchyard Clearance (SC)", "Operational Clearance (OC)"],
      correct: 1, // Line Clearance (LC)
      explanation: "A formalized Line Clearance (LC) permit is statutory and mandatory. It guarantees isolating circuit breakers, manual ground tagging, and physical isolation before operators climb any grid busbars."
    }
  ];

  const handleAnswerSelect = (optIndex: number) => {
    setSelectedAns(optIndex);
    if (optIndex === QUIZ_QUESTIONS[currentQuestion].correct) {
      setQuizScore(1);
    } else {
      setQuizScore(0);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
    setSelectedAns(null);
    setQuizScore(null);
  };

  const t = {
    EN: {
      badge: "Power Research & Training Institute (PRTI)",
      title: "HR, Administration & PRTI",
      quizTitle: "State Grid Safety & Compliance Challenge",
      quizDesc: "Test your understanding of EHT safety parameters, national grid codes, and operator field guidelines. Designed for training evaluations by PRTI.",
      correct: "CORRECT ANSWER! Well done.",
      incorrect: "INCORRECT. Please review the detailed explanation below:",
      nextQ: "Next Technical Question",
      trainingCalendar: "PRTI Active Training Schedule",
      activePortal: "Employee Administrative Service Portals"
    },
    TE: {
      badge: "పవర్ రీసెర్చ్ & ట్రైనింగ్ ఇన్స్టిట్యూట్ (PRTI)",
      title: "మానవ వనరులు, పరిపాలన & PRTI",
      quizTitle: "రాష్ట్ర గ్రిడ్ భద్రతా నిబంధనల క్విజ్",
      quizDesc: "EHT భద్రతా ప్రమాణాలు, జాతీయ గ్రిడ్ నియమాలు మరియు ఆపరేటర్ ఫీల్డ్ మార్గదర్శకాలపై మీ అవగాహనను పరీక్షించుకోండి. PRTI చే రూపొందించబడింది.",
      correct: "సరైన సమాధానం! అభినందనలు.",
      incorrect: "తప్పు సమాధానం. క్రింది వివరణాత్మక వివరణను చూడండి:",
      nextQ: "తదుపరి సాంకేతిక ప్రశ్న",
      trainingCalendar: "PRTI యాక్టివ్ ట్రైనింగ్ షెడ్యూల్",
      activePortal: "ఉద్యోగి పరిపాలనా సేవా పోర్టల్స్"
    }
  }[language];

  return (
    <div className="animate-fade-in w-full">
      {/* Hero Banner with custom background photo */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1600')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-3xl drop-shadow-sm" style={{ fontSize: `${14 * fontScale}px` }}>
            {dept.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Safety Quiz & Active Calendars */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Interactive Safety Quiz */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
            } space-y-6`}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2" style={{ fontSize: `${14 * fontScale}px` }}>
                  <GraduationCap size={16} className="text-cyan-500 animate-pulse" />
                  {t.quizTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-sans">{t.quizDesc}</p>
              </div>

              {/* Question card */}
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
                <span className="text-[9px] font-mono font-black text-cyan-600 bg-cyan-50 border border-cyan-100 px-1.5 py-0.5 rounded">
                  QUESTION #{currentQuestion + 1}
                </span>
                <p className="text-xs font-black text-slate-800 font-sans leading-relaxed">
                  {QUIZ_QUESTIONS[currentQuestion].q}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {QUIZ_QUESTIONS[currentQuestion].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      disabled={selectedAns !== null}
                      onClick={() => handleAnswerSelect(oIdx)}
                      className={`text-left p-3 rounded-lg border text-xs font-medium font-sans transition-all cursor-pointer ${
                        selectedAns === oIdx
                          ? oIdx === QUIZ_QUESTIONS[currentQuestion].correct
                            ? "bg-emerald-50 border-emerald-400 text-emerald-800 font-bold"
                            : "bg-rose-50 border-rose-400 text-rose-800 font-bold"
                          : selectedAns !== null && oIdx === QUIZ_QUESTIONS[currentQuestion].correct
                            ? "bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold"
                            : "bg-white hover:bg-slate-100 border-slate-200 text-slate-700"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {/* Score & Feedback Area */}
                {selectedAns !== null && (
                  <div className={`p-4 rounded-xl border space-y-1.5 text-xs ${
                    quizScore === 1 
                      ? "bg-emerald-50/50 border-emerald-200 text-emerald-900" 
                      : "bg-rose-50/50 border-rose-200 text-rose-900"
                  }`}>
                    <strong className="font-extrabold flex items-center gap-1">
                      {quizScore === 1 ? <CheckCircle size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-rose-600" />}
                      {quizScore === 1 ? t.correct : t.incorrect}
                    </strong>
                    <p className="font-sans leading-relaxed text-[11px] text-slate-600">
                      {QUIZ_QUESTIONS[currentQuestion].explanation}
                    </p>
                    <button
                      onClick={nextQuestion}
                      className="mt-3 inline-flex items-center gap-1 text-[10px] font-black uppercase text-cyan-600 hover:text-cyan-500 cursor-pointer"
                    >
                      <span>{t.nextQ}</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* PRTI Training Schedules */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
            } space-y-4`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2" style={{ fontSize: `${14 * fontScale}px` }}>
                <Calendar size={16} className="text-cyan-500" />
                {t.trainingCalendar}
              </h3>

              <div className="space-y-3 font-sans text-xs">
                <div className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl flex justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800">Safety &amp; Compliance Management in EHT Switchyards</h4>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Duration: 3 Days | Level: Advanced Field Staff</span>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded border border-emerald-500/20">
                    Active Session
                  </span>
                </div>
                <div className="p-3.5 border border-slate-100 bg-slate-50/50 rounded-xl flex justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold text-slate-800">SAP S/4HANA Materials Management &amp; SAP-Grievance workflows</h4>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">Duration: 5 Days | Level: Administrative Assistants</span>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded border border-amber-500/20">
                    Registration Open
                  </span>
                </div>
              </div>
            </div>

            {/* Department Operational Domain & Key Responsibilities */}
            <div className={`p-6 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-4`}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800" style={{ fontSize: `${14 * fontScale}px` }}>
                Operational Domain &amp; Responsibilities
              </h3>
              <ul className="space-y-3 font-sans text-xs text-slate-600 leading-relaxed">
                {dept.keyResponsibilities.map((resp, i) => (
                  <li key={i} className="flex gap-2.5 items-start">
                    <span className="w-5 h-5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-[10px] shrink-0">{i+1}</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Department Head details */}
            <div className="p-5 bg-cyan-50/50 border border-cyan-200/50 rounded-2xl space-y-3">
              <span className="text-[9px] uppercase font-black text-cyan-800 tracking-widest block">Human resources management</span>
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-900">{dept.headOfDepartment}</p>
                <p className="text-[10px] text-slate-500 font-sans">JMD Command Office, Corporate Headquarters, Vijayawada.</p>
              </div>
              <button 
                onClick={() => setActivePage("/contact")}
                className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Contact Board Secretariat</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Employee Administrative Portals (Simulated widgets) */}
            <div className={`p-5 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-3`}>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">{t.activePortal}</h4>
              <div className="space-y-2 font-sans text-xs">
                <button 
                  onClick={() => alert("Launching simulated e-SPAN (Employee Appraisal Portal)...")}
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-lg flex items-center justify-between text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <span>e-SPAN: Performance Portal</span>
                  <ChevronRight size={13} className="text-slate-400" />
                </button>
                <button 
                  onClick={() => alert("Launching simulated PRTI Digital Classrooms panel...")}
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-lg flex items-center justify-between text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <span>PRTI Classroom Simulator</span>
                  <ChevronRight size={13} className="text-slate-400" />
                </button>
                <button 
                  onClick={() => setActivePage("/notices#careers")}
                  className="w-full text-left p-2.5 bg-slate-50 hover:bg-slate-100 border rounded-lg flex items-center justify-between text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
                >
                  <span>Direct Careers Portal</span>
                  <ChevronRight size={13} className="text-slate-400" />
                </button>
              </div>
            </div>

            {/* Current Initiatives list */}
            <div className={`p-5 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-4`}>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">HR Board Projects</h4>
              <div className="space-y-3 text-xs font-sans">
                {dept.currentInitiatives.map((init, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-lg space-y-1">
                    <span className="text-[8px] font-bold text-cyan-600 uppercase bg-cyan-50 px-1 py-0.5 rounded">INITIATIVE {idx+1}</span>
                    <p className="text-xs text-slate-700 font-semibold leading-relaxed">{init}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
