import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, 
  Minus, 
  Maximize2, 
  RotateCcw, 
  Map, 
  Activity, 
  Zap, 
  BarChart3, 
  Info, 
  CheckCircle2, 
  TrendingUp, 
  Clock,
  Sliders,
  Globe,
  AlertTriangle,
  Download,
  Search,
  RefreshCw,
  Cpu,
  Server,
  Database,
  Layers,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import TransmissionGISDashboard from "../../TransmissionGISDashboard";

interface GridAnalyticsProps {
  language: "EN" | "TE";
  isHighContrast: boolean;
  fontScale: number;
}

// Custom decorative horizontal line separator seen in APTRANSCO screenshots
const ClassicSeparator: React.FC = () => (
  <div className="flex items-center justify-center gap-3 my-4">
    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-slate-400 to-slate-400"></div>
    <div className="w-2.5 h-2.5 rotate-45 border border-slate-500 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
      <div className="w-1 h-1 bg-slate-800 dark:bg-slate-200"></div>
    </div>
    <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-slate-400 to-slate-400"></div>
  </div>
);

export const GridAnalytics: React.FC<GridAnalyticsProps> = ({ language, isHighContrast, fontScale }) => {
  const [activeTab, setActiveTab] = useState<"map" | "frequency" | "demand" | "trend" | "stations">("map");
  const [activeBasemap, setActiveBasemap] = useState<string>("satellite-hybrid");
  const [zoomLevel, setZoomLevel] = useState<number>(1.1);
  const [mapOffset, setMapOffset] = useState({ x: -20, y: -10 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Map Filter states
  const [show400kV, setShow400kV] = useState(true);
  const [show220kV, setShow220kV] = useState(true);
  const [showPowerGenerators, setShowPowerGenerators] = useState(true);

  // Search filter for historical data
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<string>("year");
  const [sortAsc, setSortAsc] = useState(false);

  // Live Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live Simulated Telemetry States (Fluctuates dynamically to mimic live grid feeds)
  const [liveFrequency, setLiveFrequency] = useState(50.08);
  const [liveDemand, setLiveDemand] = useState(10950);
  const [wavePhase, setWavePhase] = useState(0);

  // Tooltip hover states
  const [freqHover, setFreqHover] = useState<number | null>(null);
  const [demandHover, setDemandHover] = useState<number | null>(null);
  const [trendHover, setTrendHover] = useState<number | null>(null);

  // Triggering live fluctuation loops
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveFrequency(prev => {
        // Normal Indian grid code constraints are 49.90 to 50.05 Hz. Let it fluctuate between 49.92 and 50.18
        const delta = (Math.random() - 0.5) * 0.05;
        const newVal = prev + delta;
        return Math.min(Math.max(newVal, 49.88), 50.19);
      });
      setLiveDemand(prev => {
        const delta = Math.round((Math.random() - 0.5) * 45);
        const newVal = prev + delta;
        return Math.min(Math.max(newVal, 10500), 11650);
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Animating phase for oscilloscope wave
  useEffect(() => {
    let animId: number;
    const tick = () => {
      setWavePhase(prev => (prev + 0.08) % (Math.PI * 2));
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 1. Core data arrays
  const frequencyData = [
    { time: "21:30", value: 50.14 },
    { time: "21:35", value: 50.11 },
    { time: "21:40", value: 50.09 },
    { time: "21:45", value: 50.07 },
    { time: "21:50", value: 50.07 },
    { time: "21:55", value: 50.11 },
    { time: "22:00", value: 50.11 },
    { time: "22:05", value: 50.09 },
    { time: "22:10", value: 50.09 },
    { time: "22:15", value: 50.03 },
    { time: "22:20", value: 49.97 },
    { time: "22:25", value: 49.97 },
    { time: "22:30", value: 49.94 },
    { time: "22:35", value: 49.89 },
    { time: "22:40", value: 49.81 },
    { time: "22:45", value: 49.85 },
    { time: "22:50", value: 49.75 },
    { time: "22:55", value: 49.62 },
    { time: "23:00", value: 49.81 },
    { time: "23:05", value: 49.77 },
    { time: "23:10", value: 49.89 },
    { time: "23:15", value: 50.05 },
    { time: "23:20", value: 50.09 },
    { time: "23:25", value: 50.11 },
    { time: "23:30", value: 50.07 },
    { time: "23:35", value: 50.07 },
    { time: "23:40", value: 50.13 },
    { time: "23:45", value: 50.15 },
    { time: "23:50", value: 50.13 },
    { time: "23:55", value: 50.17 }
  ];

  // Demand data with Forecast curve
  const demandData = [
    { time: "00:00", actual: 10900, forecast: 11000 },
    { time: "01:30", actual: 10450, forecast: 10600 },
    { time: "03:00", actual: 9980, forecast: 10050 },
    { time: "04:30", actual: 9710, forecast: 9800 },
    { time: "06:00", actual: 10120, forecast: 10100 },
    { time: "07:30", actual: 9950, forecast: 10200 },
    { time: "09:00", actual: 11210, forecast: 11100 },
    { time: "10:30", actual: 11250, forecast: 11400 },
    { time: "12:00", actual: 11090, forecast: 11300 },
    { time: "13:30", actual: 11410, forecast: 11500 },
    { time: "15:00", actual: 11110, forecast: 11150 },
    { time: "16:30", actual: 11090, forecast: 11000 },
    { time: "18:00", actual: 11550, forecast: 11600 },
    { time: "19:30", actual: 10950, forecast: 11100 },
    { time: "21:00", actual: 10300, forecast: 10450 },
    { time: "22:30", actual: 8950, forecast: 9100 },
    { time: "23:00", actual: 9810, forecast: 9850 },
    { time: "23:30", actual: 10150, forecast: 10100 },
    { time: "24:00", actual: 11200, forecast: 11050 }
  ];

  // Historical Energy Consumption Trend Data with Transmission Loss percentage added
  const trendData = [
    { year: "2010-11", min: 5600, max: 8800, energy: 4800, loss: 4.12 },
    { year: "2011-12", min: 6200, max: 8850, energy: 5200, loss: 3.98 },
    { year: "2012-13", min: 6200, max: 8700, energy: 5050, loss: 3.85 },
    { year: "2013-14", min: 5900, max: 9100, energy: 5350, loss: 3.74 },
    { year: "2014-15", min: 5100, max: 6300, energy: 3950, loss: 3.52 },
    { year: "2015-16", min: 4900, max: 6500, energy: 3100, loss: 3.31 },
    { year: "2016-17", min: 5150, max: 6700, energy: 3300, loss: 3.15 },
    { year: "2017-18", min: 5400, max: 7100, energy: 3500, loss: 3.02 },
    { year: "2018-19", min: 5350, max: 7300, energy: 3800, loss: 2.94 },
    { year: "2019-20", min: 5450, max: 7600, energy: 3900, loss: 2.88 },
    { year: "2020-21", min: 5100, max: 7900, energy: 3800, loss: 2.82 },
    { year: "2021-22", min: 5600, max: 8200, energy: 4200, loss: 2.78 },
    { year: "2022-23", min: 6100, max: 9400, energy: 5100, loss: 2.75 },
    { year: "2023-24", min: 6800, max: 10850, energy: 5900, loss: 2.73 },
    { year: "2024-25", min: 7200, max: 11400, energy: 6320, loss: 2.72 },
    { year: "2025-26", min: 7800, max: 11950, energy: 6810, loss: 2.71 }
  ];

  // Map nodes representing major substations and cities with SCADA live figures
  const mapNodes = [
    { id: 1, name: "Khammam (PG)", x: 260, y: 80, type: "pg", size: 10, voltage: "400 kV", activeLoad: "620 MW", powerFactor: "0.98 Lead", status: "NOMINAL", temp: "33°C", sourceType: "Thermal Generator & Grid Substation", details: "Feeds coal-fired power from northern districts into central interties. High transmission reliability bay." },
    { id: 2, name: "Guddigudem", x: 310, y: 100, type: "sub", size: 8, voltage: "220 kV", activeLoad: "185 MW", powerFactor: "0.97 Lag", status: "NOMINAL", temp: "34°C", sourceType: "Distribution Switching Substation", details: "Important agricultural pooling node supplying key lift irrigation projects." },
    { id: 3, name: "Vemagiri (PG)", x: 350, y: 105, type: "pg", size: 10, voltage: "400 kV", activeLoad: "840 MW", powerFactor: "0.99 Lead", status: "NOMINAL", temp: "35°C", sourceType: "Gas-Based Generation Hub", details: "Major pooling sub-station with dual-circuit feed. Connects critical coastal gas generators to state grid." },
    { id: 4, name: "Nagarjuna Sagar", x: 180, y: 165, type: "hydro", size: 11, voltage: "400 kV", activeLoad: "510 MW", powerFactor: "0.96 Lag", status: "ACTIVE PEAKING", temp: "29°C", sourceType: "Hydro-Electric Generation Station", details: "Large state hydro station. Essential for rapid grid frequency control and black-start backup capability." },
    { id: 5, name: "Kurnool (PG)", x: 110, y: 215, type: "pg", size: 11, voltage: "400 kV", activeLoad: "950 MW", powerFactor: "0.98 Lead", status: "EXCESS SOLAR INGRESS", temp: "36°C", sourceType: "Solar-Wind Pooling Hub", details: "Interfaces 1000MW+ renewable generation to national corridor." },
    { id: 6, name: "Nannur", x: 135, y: 205, type: "sub", size: 8, voltage: "220 kV", activeLoad: "210 MW", powerFactor: "0.97 Lag", status: "NOMINAL", temp: "35°C", sourceType: "Transmission Intertie Switchyard", details: "Midpoint connection routing power from hydro systems to western dry agricultural sectors." },
    { id: 7, name: "Guntur", x: 250, y: 160, type: "sub", size: 9, voltage: "220 kV", activeLoad: "440 MW", powerFactor: "0.98 Lag", status: "NOMINAL", temp: "34°C", sourceType: "Major Urban Distribution Center", details: "Handles domestic and commercial requirements for high density Guntur-Vijayawada urban strip." },
    { id: 8, name: "Vijayawada", x: 270, y: 140, type: "city", size: 11, voltage: "400 kV", activeLoad: "780 MW", powerFactor: "0.99 Lead", status: "NOMINAL", temp: "33°C", sourceType: "VTPS Thermal Grid Entry Point", details: "Interfaces VTPS thermal power station. Main transmission junction for coastal-rayalaseema power highways." },
    { id: 9, name: "Podili", x: 200, y: 240, type: "sub", size: 8, voltage: "220 kV", activeLoad: "120 MW", powerFactor: "0.96 Lag", status: "NOMINAL", temp: "32°C", sourceType: "Intermediate Pooling Substation", details: "Connects smaller wind turbine pockets in dry highland sectors to the high-voltage grid." },
    { id: 10, name: "Nellore (PG)", x: 230, y: 310, type: "pg", size: 10, voltage: "400 kV", activeLoad: "710 MW", powerFactor: "0.97 Lead", status: "NOMINAL", temp: "31°C", sourceType: "Thermal & Solar Power Pooling", details: "Critical inter-state pooling station connecting APTRANSCO grids with Southern Grid Regional links." },
    { id: 11, name: "Tirupati", x: 210, y: 360, type: "sub", size: 9, voltage: "220 kV", activeLoad: "325 MW", powerFactor: "0.98 Lag", status: "NOMINAL", temp: "30°C", sourceType: "Sub-Transmission Pooling Substation", details: "Crucial supply station powering pilgrim town and industrial electronics clusters of Chittoor." },
    { id: 12, name: "Srisailam WLS", x: 155, y: 185, type: "hydro", size: 10, voltage: "400 kV", activeLoad: "480 MW", powerFactor: "0.97 Lead", status: "ACTIVE PEAKING", temp: "28°C", sourceType: "Hydro-Electric Peaking Station", details: "Srisailam Left Bank hydro station. Offers crucial reactive power compensation for southern lines." },
    { id: 13, name: "Adoni", x: 60, y: 230, type: "sub", size: 7, voltage: "220 kV", activeLoad: "95 MW", powerFactor: "0.95 Lag", status: "NOMINAL", temp: "36°C", sourceType: "Distribution Switching Station", details: "Remote western sector node providing heavy industrial spinning textile mill load stability." },
    { id: 14, name: "Anantapur", x: 80, y: 290, type: "sub", size: 8, voltage: "220 kV", activeLoad: "290 MW", powerFactor: "0.99 Lead", status: "SOLAR MAXIMUM FEED", temp: "35°C", sourceType: "NP Kunta Solar Park Connection", details: "Feeds heavy solar power from ultra-mega solar parks to urban load centers." },
    { id: 15, name: "Kadapa", x: 140, y: 310, type: "sub", size: 9, voltage: "220 kV", activeLoad: "310 MW", powerFactor: "0.98 Lag", status: "NOMINAL", temp: "34°C", sourceType: "Rayalaseema Thermal Interlink", details: "Direct line link to Rayalaseema Thermal Power Station (RTPS). Balances western coal-generation peaks." },
    { id: 16, name: "Visakhapatnam", x: 420, y: 70, type: "city", size: 11, voltage: "400 kV", activeLoad: "910 MW", powerFactor: "0.99 Lead", status: "HEAVY INDUSTRIAL DEMAND", temp: "32°C", sourceType: "Industrial Load Hub & Port Pooling", details: "Heaviest industrial consumer node. Supplies steel plants, oil refineries, and shipbuilding yards." },
    { id: 17, name: "Srikakulam", x: 460, y: 40, type: "sub", size: 8, voltage: "220 kV", activeLoad: "135 MW", powerFactor: "0.96 Lag", status: "NOMINAL", temp: "31°C", sourceType: "District Ingress Grid Substation", details: "Northeastern boundary substation. Integrates local agro-processing mills and regulates Odisha border ties." }
  ];

  // Grid line paths connecting substations
  const gridLines = [
    { from: 1, to: 2, voltage: "400kV", color: "stroke-rose-500", animated: true },
    { from: 2, to: 3, voltage: "400kV", color: "stroke-rose-500", animated: false },
    { from: 3, to: 16, voltage: "400kV", color: "stroke-rose-500", animated: true },
    { from: 16, to: 17, voltage: "220kV", color: "stroke-emerald-500", animated: false },
    { from: 4, to: 7, voltage: "400kV", color: "stroke-rose-500", animated: false },
    { from: 7, to: 8, voltage: "400kV", color: "stroke-rose-500", animated: false },
    { from: 8, to: 3, voltage: "400kV", color: "stroke-rose-500", animated: true },
    { from: 4, to: 12, voltage: "220kV", color: "stroke-emerald-500", animated: false },
    { from: 12, to: 6, voltage: "400kV", color: "stroke-rose-500", animated: true },
    { from: 6, to: 5, voltage: "400kV", color: "stroke-rose-500", animated: true },
    { from: 5, to: 13, voltage: "220kV", color: "stroke-emerald-500", animated: false },
    { from: 5, to: 14, voltage: "220kV", color: "stroke-emerald-500", animated: true },
    { from: 14, to: 15, voltage: "220kV", color: "stroke-emerald-500", animated: false },
    { from: 15, to: 11, voltage: "400kV", color: "stroke-rose-500", animated: false },
    { from: 11, to: 10, voltage: "400kV", color: "stroke-rose-500", animated: true },
    { from: 10, to: 9, voltage: "400kV", color: "stroke-rose-500", animated: false },
    { from: 9, to: 7, voltage: "220kV", color: "stroke-emerald-500", animated: false },
    { from: 6, to: 9, voltage: "220kV", color: "stroke-emerald-500", animated: false }
  ];

  const [selectedNode, setSelectedNode] = useState<any>(mapNodes[4]); // Default to Kurnool (PG) Solar hub

  // Handle map dragging
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    setMapOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetMap = () => {
    setZoomLevel(1.1);
    setMapOffset({ x: -20, y: -10 });
  };

  // Basemap definitions
  const basemaps = [
    { id: "satellite-hybrid", name: "Satellite Hybrid (Aerial)", bg: "bg-slate-950", border: "border-slate-800", text: "text-slate-200" },
    { id: "blueprint", name: "Blueprint Technical", bg: "bg-sky-950", border: "border-sky-800", text: "text-sky-300" },
    { id: "dark-gray", name: "Dark Gray Canvas", bg: "bg-slate-900", border: "border-slate-800", text: "text-slate-300" },
    { id: "charted", name: "Charted Terrain Map", bg: "bg-amber-50/70", border: "border-amber-200", text: "text-amber-900" },
  ];

  // Switch basemap details
  const getMapStyles = () => {
    switch(activeBasemap) {
      case "satellite-hybrid":
        return {
          bg: "bg-[#040812] border-slate-900/80",
          gridColor: "#0f172a",
          textColor: "text-slate-100",
          labelColor: "#38bdf8",
          stateBorderColor: "#0ea5e9",
          coastline: "fill-slate-950 stroke-slate-800/40",
          gridLineDefault: "stroke-slate-500/10",
          bgImage: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200"
        };
      case "blueprint":
        return {
          bg: "bg-[#06182c] border-sky-950/60",
          gridColor: "#0b2645",
          textColor: "text-sky-100",
          labelColor: "#38bdf8",
          stateBorderColor: "#1d4ed8",
          coastline: "fill-[#051424] stroke-sky-800/40",
          gridLineDefault: "stroke-sky-500/20",
          bgImage: null
        };
      case "charted":
        return {
          bg: "bg-[#f5f1e6] border-amber-200/50",
          gridColor: "#e6dec6",
          textColor: "text-amber-950",
          labelColor: "#451a03",
          stateBorderColor: "#b45309",
          coastline: "fill-[#ebe2cb] stroke-amber-700/20",
          gridLineDefault: "stroke-amber-600/30",
          bgImage: null
        };
      case "dark-gray":
      default:
        return {
          bg: "bg-[#111622] border-slate-800/80",
          gridColor: "#1d2432",
          textColor: "text-slate-100",
          labelColor: "#94a3b8",
          stateBorderColor: "#475569",
          coastline: "fill-[#0e121b] stroke-slate-700/40",
          gridLineDefault: "stroke-slate-500/25",
          bgImage: null
        };
    }
  };

  const mapStyle = getMapStyles();

  // Sort and Filter Historical Data
  const filteredTrendData = useMemo(() => {
    let result = [...trendData];
    if (searchTerm.trim() !== "") {
      result = result.filter(item => 
        item.year.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    result.sort((a: any, b: any) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? valA - valB : valB - valA;
    });
    return result;
  }, [searchTerm, sortField, sortAsc]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className={`rounded-3xl border overflow-hidden p-6 md:p-8 space-y-6 transition-all ${
      isHighContrast 
        ? "bg-black text-white border-white" 
        : "bg-white text-slate-800 border-slate-200/85 shadow-sm"
    }`}>
      
      {/* Toast Notification Box */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <Sparkles className="text-amber-400" size={14} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Tab controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[9px] uppercase font-black tracking-wider text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block">
            {language === "EN" ? "State Dispatch Dashboard" : "రాష్ట్ర డిస్పాచ్ డ్యాష్‌బోర్డ్"}
          </span>
          <h2 className="text-lg md:text-2xl font-black uppercase tracking-wider text-[#1d70b8] dark:text-sky-400 font-display flex items-center gap-2 mt-1">
            <Activity className="text-amber-500 animate-pulse shrink-0" size={24} />
            {language === "EN" ? "APTRANSCO Power Grid Live Command" : "ఏపీట్రాన్స్కో పవర్ గ్రిడ్ లైవ్ కమాండ్"}
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans font-medium">
            {language === "EN" 
              ? "Official real-time indicators, high-fidelity spatial GIS mapping, and grid frequency telemetry analyzer." 
              : "అధికారిక నిజ-సమయ సూచికలు, ప్రాదేశిక GIS మ్యాపింగ్ మరియు గ్రిడ్ ఫ్రీక్వెన్సీ టెలిమెట్రీ ఎనలైజర్."}
          </p>
        </div>

        {/* Navigation Tab Switchers */}
        <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 max-w-max">
          <button
            onClick={() => setActiveTab("map")}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "map"
                ? (isHighContrast ? "bg-white text-black font-black" : "bg-[#1d70b8] text-white shadow-xs")
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
            }`}
          >
            <Map size={13} />
            {language === "EN" ? "GIS Grid Map" : "గ్రిడ్ మ్యాప్"}
          </button>
          <button
            onClick={() => setActiveTab("frequency")}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "frequency"
                ? (isHighContrast ? "bg-white text-black font-black" : "bg-[#1d70b8] text-white shadow-xs")
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
            }`}
          >
            <Activity size={13} />
            {language === "EN" ? "Frequency Analyzer" : "ఫ్రీక్వెన్సీ"}
          </button>
          <button
            onClick={() => setActiveTab("demand")}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "demand"
                ? (isHighContrast ? "bg-white text-black font-black" : "bg-[#1d70b8] text-white shadow-xs")
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
            }`}
          >
            <Zap size={13} />
            {language === "EN" ? "Demand Monitor" : "డిమాండ్"}
          </button>
          <button
            onClick={() => setActiveTab("trend")}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "trend"
                ? (isHighContrast ? "bg-white text-black font-black" : "bg-[#1d70b8] text-white shadow-xs")
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800"
            }`}
          >
            <BarChart3 size={13} />
            {language === "EN" ? "Energy Trends" : "వినియోగం"}
          </button>
        </div>
      </div>

      {/* 2. Main Content Display Panel */}
      <div className="min-h-[500px] relative transition-all">
        
        {/* ================= TAB 1: TRANSMISSION NETWORK OVERVIEW ================= */}
        {activeTab === "map" && (
          <div className="animate-fade-in">
            <TransmissionGISDashboard />
          </div>
        )}

        {/* ================= TAB 2: SYSTEM FREQUENCY ANALYZER (UPGRADE) ================= */}
        {activeTab === "frequency" && (
          <div className="space-y-6 animate-fade-in text-center max-w-4xl mx-auto">
            <div className="max-w-xl mx-auto">
              <span className="text-[10px] uppercase font-black tracking-wider text-cyan-600 bg-cyan-100/60 dark:bg-cyan-950/40 dark:text-cyan-400 px-2.5 py-1 rounded inline-block">
                Grid Synchronous Intertie Telemetry
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-display uppercase tracking-wider mt-1">
                Real-Time Frequency Analyzer
              </h3>
              <ClassicSeparator />
            </div>

            {/* Telemetry Gauge and Oscilloscope Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Dial Gauge (Left Column) */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block uppercase font-bold tracking-widest mb-2">Synchronous Speed Gauge</span>
                
                {/* SVG Dial Gauge */}
                <svg width="200" height="140" className="overflow-visible select-none">
                  {/* Gauge colored track arcs */}
                  {/* Under Frequency hazard: 49.50 to 49.80 */}
                  <path d="M 30 110 A 70 70 0 0 1 72 48" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" />
                  {/* Warning: 49.80 to 49.95 */}
                  <path d="M 72 48 A 70 70 0 0 1 95 40" fill="none" stroke="#eab308" strokeWidth="10" />
                  {/* Nominal standard zone: 49.95 to 50.15 */}
                  <path d="M 95 40 A 70 70 0 0 1 135 55" fill="none" stroke="#10b981" strokeWidth="10" />
                  {/* Over Frequency: 50.15 to 50.50 */}
                  <path d="M 135 55 A 70 70 0 0 1 170 110" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" />

                  {/* Tick Marks */}
                  {[49.5, 49.75, 50.0, 50.25, 50.5].map((tick, idx) => {
                    const angle = 180 - ((tick - 49.5) / 1.0) * 180;
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 100 + 75 * Math.cos(rad);
                    const y1 = 110 - 75 * Math.sin(rad);
                    const x2 = 100 + 85 * Math.cos(rad);
                    const y2 = 110 - 85 * Math.sin(rad);
                    const tx = 100 + 96 * Math.cos(rad);
                    const ty = 110 - 96 * Math.sin(rad);

                    return (
                      <g key={idx}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1.5" />
                        <text x={tx} y={ty} fontSize="8px" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle" fill="#64748b" className="font-mono">
                          {tick.toFixed(2)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Indicator Needle */}
                  {(() => {
                    // Calculate angle. 49.50 Hz = 180deg (left), 50.50 Hz = 0deg (right)
                    const angle = 180 - ((liveFrequency - 49.5) / 1.0) * 180;
                    const rad = (angle * Math.PI) / 180;
                    const needleX = 100 + 65 * Math.cos(rad);
                    const needleY = 110 - 65 * Math.sin(rad);

                    return (
                      <g>
                        <line x1="100" y1="110" x2={needleX} y2={needleY} stroke="#1e293b" strokeWidth="3" strokeLinecap="round" className="dark:stroke-white transition-all duration-500" />
                        <circle cx="100" cy="110" r="7" fill="#f97316" stroke="white" strokeWidth="2" />
                      </g>
                    );
                  })()}
                </svg>

                {/* Digital readout values */}
                <div className="font-mono text-center mt-3">
                  <span className="text-3xl font-black text-slate-900 dark:text-white block tracking-tight">
                    {liveFrequency.toFixed(3)} <span className="text-sm font-bold text-slate-500">Hz</span>
                  </span>
                  <div className="flex items-center gap-1.5 justify-center mt-1 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 max-w-max mx-auto">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                    GRID SYNCHRONIZED
                  </div>
                </div>
              </div>

              {/* Oscilloscope Sine Wave Screen (Right Column) */}
              <div className="md:col-span-7 flex flex-col items-center justify-center p-6 bg-[#040914] text-emerald-400 rounded-3xl border border-slate-800/80 shadow-2xl relative overflow-hidden">
                <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[9px] text-slate-500 uppercase select-none">
                  <Activity size={12} className="text-emerald-500 animate-pulse" />
                  <span>Grid Phase Waveform (AC Oscilloscope)</span>
                </div>
                
                {/* SVG Oscilloscope Wave */}
                <svg width="100%" height="150" className="overflow-hidden bg-slate-950/70 border border-slate-900 rounded-xl mt-3 relative z-10">
                  {/* Grid Lines Overlay */}
                  <g opacity="0.1">
                    {[30, 60, 90, 120].map((y, idx) => (
                      <line key={idx} x1="0" y1={y} x2="100%" y2={y} stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
                    ))}
                    {[50, 100, 150, 200, 250, 300, 350, 400].map((x, idx) => (
                      <line key={idx} x1={x} y1="0" x2={x} y2="100%" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
                    ))}
                  </g>

                  {/* Sinewave path dynamically plotting based on wavePhase */}
                  {(() => {
                    let points = [];
                    // Adapt frequency of wave relative to live frequency deviation
                    const mult = (liveFrequency / 50.0) * 4.5;
                    for (let x = 0; x <= 450; x += 3) {
                      const y = 75 + Math.sin((x / 400) * Math.PI * 2 * mult + wavePhase) * 42;
                      points.push(`${x === 0 ? 'M' : 'L'} ${x} ${y}`);
                    }
                    return (
                      <g>
                        {/* Outer Glow Wave */}
                        <path d={points.join(" ")} fill="none" stroke="#10b981" strokeWidth="4" strokeOpacity="0.25" strokeLinecap="round" />
                        {/* Inner Sharp Wave */}
                        <path d={points.join(" ")} fill="none" stroke="#10b981" strokeWidth="2.0" strokeLinecap="round" />
                      </g>
                    );
                  })()}
                </svg>

                <div className="grid grid-cols-3 gap-4 w-full mt-4 font-mono text-center text-[10px]">
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block text-[9px] uppercase">Frequency Drift</span>
                    <strong className="text-white text-xs block">{(liveFrequency - 50.0).toFixed(3)} Hz</strong>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block text-[9px] uppercase">Grid Phase Angle</span>
                    <strong className="text-white text-xs block">34.21° Lag</strong>
                  </div>
                  <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-900">
                    <span className="text-slate-500 block text-[9px] uppercase">df / dt Shift</span>
                    <strong className="text-emerald-400 text-xs block">+0.002 Hz/s</strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Historical Frequency Bar Chart and Grid Data details */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 text-center">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">24 Hours Historical Frequency Deviation (Hz)</span>
              
              <div className="relative pt-4 pb-2">
                <div className="w-full h-[220px] flex items-end justify-between gap-[1px] md:gap-[3px] relative border-b border-slate-200 dark:border-slate-800 px-1">
                  
                  {/* 50.00 Hz Center Reference Line */}
                  <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-dashed border-t border-slate-300 dark:border-slate-700 opacity-60 z-0"></div>
                  <div className="absolute top-[calc(50%-10px)] left-2 text-[8px] font-black uppercase text-slate-500 font-mono bg-white dark:bg-slate-950 px-1.5 py-0.5 rounded z-10 select-none">
                    50.00 Hz Reference
                  </div>

                  {frequencyData.map((d, index) => {
                    const diff = d.value - 50.00;
                    const absDiff = Math.abs(diff);
                    const isPositive = diff >= 0;

                    // Height scale: 100px equals 0.30 Hz deviation max
                    const barHeight = Math.min((absDiff / 0.3) * 100, 100);

                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center group relative cursor-pointer"
                        onMouseEnter={() => setFreqHover(index)}
                        onMouseLeave={() => setFreqHover(null)}
                      >
                        {/* Bar Spacer to align positive/negative correctly */}
                        <div className="w-full flex flex-col justify-end" style={{ height: "110px" }}>
                          {isPositive && (
                            <div
                              style={{ height: `${barHeight}px` }}
                              className={`w-full rounded-t-sm transition-all duration-300 ${
                                freqHover === index 
                                  ? "bg-sky-400" 
                                  : "bg-[#1d70b8]/85 dark:bg-sky-600/80"
                              }`}
                            ></div>
                          )}
                        </div>
                        
                        {/* Negative bar grows down */}
                        <div className="w-full flex flex-col justify-start" style={{ height: "110px" }}>
                          {!isPositive && (
                            <div
                              style={{ height: `${barHeight}px` }}
                              className={`w-full rounded-b-sm transition-all duration-300 ${
                                freqHover === index 
                                  ? "bg-rose-400" 
                                  : "bg-rose-500/80 dark:bg-rose-700/60"
                              }`}
                            ></div>
                          )}
                        </div>

                        {/* Tooltip Popup on bar hover */}
                        {freqHover === index && (
                          <div className="absolute bottom-full mb-2 bg-slate-900/95 text-white border border-slate-700 px-3 py-2 rounded-lg shadow-xl font-mono text-[9.5px] z-50 pointer-events-none min-w-[120px] text-left">
                            <p className="font-bold text-amber-400">Time: {d.time}</p>
                            <p className="mt-0.5 text-xs">Freq: <strong className="text-white">{d.value.toFixed(2)} Hz</strong></p>
                            <p className="text-[9px] text-slate-400">Dev: {diff > 0 ? "+" : ""}{diff.toFixed(2)} Hz</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* X Axis Labels */}
                <div className="flex justify-between font-mono text-[9px] text-slate-400 font-bold pt-2 px-1 select-none">
                  <span>{frequencyData[0].time}</span>
                  <span>22:15</span>
                  <span>22:50</span>
                  <span>23:20</span>
                  <span>{frequencyData[frequencyData.length-1].time}</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: SYSTEM DEMAND & POWER MIX MONITOR (UPGRADE) ================= */}
        {activeTab === "demand" && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            
            {/* Page Header */}
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-600 bg-amber-100/60 dark:bg-amber-950/40 dark:text-amber-400 px-2.5 py-1 rounded inline-block">
                Grid Energy Despatch Center
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-display uppercase tracking-wider mt-1">
                Active System Demand Monitor
              </h3>
              <ClassicSeparator />
            </div>

            {/* Summary metrics widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="p-3 bg-[#1d70b8]/10 text-[#1d70b8] dark:text-sky-400 rounded-xl">
                  <Zap size={20} className="animate-pulse" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block uppercase font-bold">Today Peak Demand</span>
                  <span className="text-base font-black text-slate-800 dark:text-white">11,550 MW</span>
                  <span className="text-[9px] text-slate-500 block">Met at 18:00 Hours</span>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block uppercase font-bold">Unmet Load / Deficit</span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400">0 MW</span>
                  <span className="text-[9px] text-emerald-500 block">100% stable supply met</span>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className="p-3 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl">
                  <Sliders size={20} />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-mono block uppercase font-bold">Inter-Regional Exchanges</span>
                  <span className="text-base font-black text-purple-600 dark:text-purple-400">3,100 MW</span>
                  <span className="text-[9px] text-slate-500 block">Scheduled pooling from Southern Grid</span>
                </div>
              </div>
            </div>

            {/* Custom Multi-Series Area + Line Chart (Actual vs Forecast) */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono">Today Actual Load vs Forecast Scheduled (MW)</span>
                
                {/* Legends */}
                <div className="flex items-center gap-4 text-[9.5px] font-mono font-bold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-[#1d70b8] block"></span>
                    <span className="text-slate-700 dark:text-slate-300">Actual Grid Load</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-t border-dashed border-amber-500 block"></span>
                    <span className="text-slate-700 dark:text-slate-300">Scheduled Forecast Plan</span>
                  </div>
                </div>
              </div>

              <div className="relative pt-6">
                <div className="w-full h-[240px] relative">
                  
                  {/* Y Axis grid guides */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none">
                    {[12.0, 11.5, 11.0, 10.5, 10.0, 9.5, 9.0].map((val, idx) => (
                      <div key={idx} className="w-full flex items-center gap-3">
                        <span className="text-[9px] font-bold text-slate-400 font-mono w-8 text-right">
                          {val.toFixed(1)}k
                        </span>
                        <div className="flex-1 h-[1px] bg-slate-200/50 dark:bg-slate-800/40"></div>
                      </div>
                    ))}
                  </div>

                  {/* SVG Multi-Line Graph */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ paddingLeft: "42px", paddingRight: "10px" }}>
                    <g>
                      
                      {/* Gradient area underneath actual load curve */}
                      <path
                        d={`M 0 240 L ${demandData.map((d, index) => {
                          const x = (index / (demandData.length - 1)) * 100;
                          const y = 240 - ((d.actual - 8500) / (12500 - 8500)) * 240;
                          return `L calc(${x}%) ${y}`;
                        }).join(" ")} L 100% 240 Z`}
                        fill="url(#demandGradientUpgrade)"
                        opacity="0.08"
                      />

                      <defs>
                        <linearGradient id="demandGradientUpgrade" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1d70b8" />
                          <stop offset="100%" stopColor="#1d70b8" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* 1. Forecast Curve (Dashed amber line) */}
                      <path
                        d={`M ${demandData.map((d, index) => {
                          const x = (index / (demandData.length - 1)) * 100;
                          const y = 240 - ((d.forecast - 8500) / (12500 - 8500)) * 240;
                          return `${index === 0 ? "M" : "L"} calc(${x}% - 0px) ${y}`;
                        }).join(" ")}`}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                        strokeLinecap="round"
                      />

                      {/* 2. Actual Demand Curve (Solid blue line with shadow) */}
                      <path
                        d={`M ${demandData.map((d, index) => {
                          const x = (index / (demandData.length - 1)) * 100;
                          const y = 240 - ((d.actual - 8500) / (12500 - 8500)) * 240;
                          return `${index === 0 ? "M" : "L"} calc(${x}% - 0px) ${y}`;
                        }).join(" ")}`}
                        fill="none"
                        stroke="#1d70b8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Hover Hotspot zones */}
                      {demandData.map((d, index) => {
                        const xPercent = (index / (demandData.length - 1)) * 100;
                        const y = 240 - ((d.actual - 8500) / (12500 - 8500)) * 240;

                        return (
                          <g key={index}>
                            {/* Anchor Circle points for hovered or peaks */}
                            {(demandHover === index || d.actual === 11550) && (
                              <circle
                                cx={`calc(${xPercent}%)`}
                                cy={y}
                                r="5.5"
                                fill="#1d70b8"
                                stroke="white"
                                strokeWidth="2"
                                className="shadow-md"
                              />
                            )}

                            {/* Hover Trigger area */}
                            <rect
                              x={`calc(${xPercent}% - 14px)`}
                              y="0"
                              width="28"
                              height="240"
                              fill="transparent"
                              className="cursor-pointer"
                              onMouseEnter={() => setDemandHover(index)}
                              onMouseLeave={() => setDemandHover(null)}
                            />
                          </g>
                        );
                      })}
                    </g>
                  </svg>

                  {/* Display Floating Tooltip */}
                  {demandHover !== null && (
                    <div
                      className="absolute bg-slate-900/95 text-white border border-slate-700 px-3.5 py-2.5 rounded-xl shadow-2xl font-mono text-[10px] pointer-events-none z-50 text-left min-w-[180px]"
                      style={{
                        left: `${Math.min(Math.max((demandHover / (demandData.length - 1)) * 90, 5), 70)}%`,
                        top: "10px"
                      }}
                    >
                      <p className="font-bold text-sky-400">Time: {demandData[demandHover].time} Hours</p>
                      <div className="mt-1.5 space-y-1 text-[11px]">
                        <p className="flex justify-between">
                          <span>Actual Grid Load:</span>
                          <strong className="text-white ml-2">{demandData[demandHover].actual.toLocaleString()} MW</strong>
                        </p>
                        <p className="flex justify-between">
                          <span>Forecast Target:</span>
                          <strong className="text-amber-400 ml-2">{demandData[demandHover].forecast.toLocaleString()} MW</strong>
                        </p>
                        <p className="flex justify-between text-[10px] border-t border-slate-800 pt-1 mt-1">
                          <span>Deviation:</span>
                          <strong className="text-emerald-400">
                            {(demandData[demandHover].actual - demandData[demandHover].forecast) > 0 ? "+" : ""}
                            {(demandData[demandHover].actual - demandData[demandHover].forecast).toLocaleString()} MW
                          </strong>
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* X Axis labels */}
                <div className="flex justify-between font-mono text-[9px] text-slate-400 font-bold pt-3 pl-11 select-none">
                  <span className="text-left">00:00<br /><span className="text-[8px] opacity-75">July 2026</span></span>
                  <span>03:00</span>
                  <span>06:00</span>
                  <span>09:00</span>
                  <span>12:00</span>
                  <span>15:00</span>
                  <span>18:00</span>
                  <span>21:00</span>
                  <span className="text-right">24:00</span>
                </div>
              </div>
            </div>

            {/* Generation Despatch Source Mix breakdown */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider font-mono block">Real-time Energy Generation Source Mix (MW)</span>
              
              <div className="space-y-3">
                {/* Thermal */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Coal/Thermal (Dr. NTTPS, RTPS, Hinduja)</span>
                    <span className="text-slate-800 dark:text-white">5,450 MW (47.1%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: "47.1%" }}></div>
                  </div>
                </div>

                {/* Grid pooling purchases */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Central Purchases & Southern Grid Pool</span>
                    <span className="text-slate-800 dark:text-white">3,100 MW (26.8%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full" style={{ width: "26.8%" }}></div>
                  </div>
                </div>

                {/* Solar & Wind */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Renewable Energy (Kurnool Solar & Anantapur Wind)</span>
                    <span className="text-slate-800 dark:text-white">1,800 MW (15.5%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: "15.5%" }}></div>
                  </div>
                </div>

                {/* Hydro */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Peaking Hydro-Electric (Srisailam & Nagarjuna Sagar)</span>
                    <span className="text-slate-800 dark:text-white">1,200 MW (10.6%)</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: "10.6%" }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 4: ENERGY CONSUMPTION & HISTORIC SEARCHABLE DATABASE (UPGRADE) ================= */}
        {activeTab === "trend" && (
          <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            
            {/* Page Header */}
            <div className="text-center max-w-xl mx-auto">
              <span className="text-[10px] uppercase font-black tracking-wider text-emerald-600 bg-emerald-100/60 dark:bg-emerald-950/40 dark:text-emerald-400 px-2.5 py-1 rounded inline-block">
                State Utility Growth Analytics
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-display uppercase tracking-wider mt-1">
                Grid Energy Consumption Trends
              </h3>
              <ClassicSeparator />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto text-center font-sans font-medium">
              {language === "EN" 
                ? "Year-wise statutory statistics of energy met, maximum grid demand peak levels, and transmission efficiency loss parameters in the State of Andhra Pradesh. Search, sort, or export regional datasets."
                : "ఆంధ్రప్రదేశ్ రాష్ట్రంలో ఇంధన వినియోగం, గరిష్ట డిమాండ్ యొక్క సంవత్సరాల వారీ గణాంకాలు. ఇక్కడ చూపిన డేటా ఖచ్చితమైన విద్యుత్ రంగ పారామితులను వివరిస్తుంది."}
            </p>

            {/* Combined Line + Bar Chart */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
              
              {/* Legend indicators */}
              <div className="flex flex-wrap justify-center gap-6 text-[10px] font-mono font-extrabold uppercase pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 block"></span>
                  <span>Max Demand Met (MW)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block"></span>
                  <span>Min Demand Met (MW)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-2 bg-emerald-500 rounded-sm block"></span>
                  <span>Energy Consumption (MU)</span>
                </div>
              </div>

              <div className="w-full h-[250px] relative">
                
                {/* Y Axis grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none select-none">
                  {[12, 10, 8, 6, 4, 2, 0].map((val, idx) => (
                    <div key={idx} className="w-full flex items-center gap-3">
                      <span className="text-[9px] font-bold text-slate-400 font-mono w-6 text-right">
                        {val}k
                      </span>
                      <div className="flex-1 h-[1px] bg-slate-200/50 dark:bg-slate-800/40"></div>
                    </div>
                  ))}
                </div>

                {/* SVG Graphs rendering */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" style={{ paddingLeft: "34px", paddingRight: "10px" }}>
                  
                  {/* Bars at bottom: Energy consumption */}
                  <g>
                    {trendData.map((d, index) => {
                      const xPercent = (index / (trendData.length - 1)) * 100;
                      // Maximum energy is around 7000 MU. Height scale to max 120px
                      const barHeight = (d.energy / 7000) * 110;
                      return (
                        <rect
                          key={index}
                          x={`calc(${xPercent}% - 7px)`}
                          y={250 - barHeight}
                          width="14"
                          height={barHeight}
                          className={`transition-all duration-200 cursor-pointer ${
                            trendHover === index 
                              ? "fill-emerald-400" 
                              : "fill-emerald-600/80 dark:fill-emerald-500/80"
                          }`}
                          onMouseEnter={() => setTrendHover(index)}
                          onMouseLeave={() => setTrendHover(null)}
                        />
                      );
                    })}
                  </g>

                  {/* Lines: Min & Max Demand */}
                  <g>
                    {/* Max Demand line */}
                    <path
                      d={`M ${trendData.map((d, index) => {
                        const x = (index / (trendData.length - 1)) * 100;
                        // Max demand scale: max 12000 MW. Height scale to max 250px
                        const y = 250 - (d.max / 12000) * 250;
                        return `${index === 0 ? "M" : "L"} calc(${x}%) ${y}`;
                      }).join(" ")}`}
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="2.5"
                    />

                    {/* Min Demand line */}
                    <path
                      d={`M ${trendData.map((d, index) => {
                        const x = (index / (trendData.length - 1)) * 100;
                        const y = 250 - (d.min / 12000) * 250;
                        return `${index === 0 ? "M" : "L"} calc(${x}%) ${y}`;
                      }).join(" ")}`}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2.5"
                    />

                    {/* Circular point anchors for hover indicator */}
                    {trendData.map((d, index) => {
                      const xPercent = (index / (trendData.length - 1)) * 100;
                      const yMax = 250 - (d.max / 12000) * 250;
                      const yMin = 250 - (d.min / 12000) * 250;

                      return (
                        <g key={index}>
                          <circle
                            cx={`calc(${xPercent}%)`}
                            cy={yMax}
                            r="4.5"
                            fill="#f97316"
                            stroke="white"
                            strokeWidth="1.5"
                            className="transition-all"
                          />
                          <circle
                            cx={`calc(${xPercent}%)`}
                            cy={yMin}
                            r="4.5"
                            fill="#3b82f6"
                            stroke="white"
                            strokeWidth="1.5"
                            className="transition-all"
                          />

                          {/* Trigger area overlay */}
                          <rect
                            x={`calc(${xPercent}% - 12px)`}
                            y="0"
                            width="24"
                            height="250"
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setTrendHover(index)}
                            onMouseLeave={() => setTrendHover(null)}
                          />
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* Hover Tooltip display */}
                {trendHover !== null && (
                  <div
                    className="absolute bg-slate-900/95 text-white border border-slate-700 px-3.5 py-2.5 rounded-xl shadow-2xl font-mono text-[10px] pointer-events-none z-50 text-left min-w-[190px]"
                    style={{
                      left: `${Math.min(Math.max((trendHover / (trendData.length - 1)) * 90, 5), 75)}%`,
                      top: "20px"
                    }}
                  >
                    <p className="font-bold text-amber-400 border-b border-slate-800 pb-1 mb-1.5">FY Year: {trendData[trendHover].year}</p>
                    <div className="space-y-1 text-[11px]">
                      <p className="flex justify-between">
                        <span>Max Peak Demand:</span> 
                        <strong className="text-white ml-2">{trendData[trendHover].max.toLocaleString()} MW</strong>
                      </p>
                      <p className="flex justify-between">
                        <span>Min Base Demand:</span> 
                        <strong className="text-white ml-2">{trendData[trendHover].min.toLocaleString()} MW</strong>
                      </p>
                      <p className="flex justify-between text-emerald-400">
                        <span>Energy Consumption:</span> 
                        <strong className="ml-2">{trendData[trendHover].energy.toLocaleString()} MU</strong>
                      </p>
                      <p className="flex justify-between text-rose-400">
                        <span>Transmission Loss:</span> 
                        <strong className="ml-2">{trendData[trendHover].loss}%</strong>
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* X Axis year labels */}
              <div className="flex justify-between font-mono text-[9px] text-slate-400 font-bold pt-3 pl-9 select-none overflow-x-auto">
                {trendData.map((d, idx) => (
                  <span key={idx} className={idx % 2 === 0 ? "opacity-100 shrink-0" : "opacity-50 shrink-0"}>
                    {d.year}
                  </span>
                ))}
              </div>
            </div>

            {/* Upgraded Feature: Interactive Search & Sort Grid Statistics Database Table */}
            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 tracking-wider">
                    Andhra State Transmission Historical Ledger
                  </h4>
                  <p className="text-[10px] text-slate-500">Query and sort official energy statistics and grid efficiency indices.</p>
                </div>

                <div className="flex items-center gap-2 self-stretch md:self-auto">
                  {/* Search bar */}
                  <div className="relative flex-1 md:flex-initial">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                    <input 
                      type="text"
                      placeholder="Search financial year..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="text-xs font-medium pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#1d70b8] w-full md:w-56"
                    />
                  </div>

                  {/* Export Button */}
                  <button
                    onClick={() => {
                      triggerToast("Ledger CSV statement compiled. Starting transmission download.");
                    }}
                    className="p-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download size={13} />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-950">
                <table className="w-full border-collapse text-left font-sans text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900 text-slate-400 font-bold uppercase text-[9.5px] border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th onClick={() => handleSort("year")} className="py-2.5 px-4 cursor-pointer hover:text-slate-800 dark:hover:text-white select-none">
                        Financial Year {sortField === "year" && (sortAsc ? "▲" : "▼")}
                      </th>
                      <th onClick={() => handleSort("max")} className="py-2.5 px-4 text-right cursor-pointer hover:text-slate-800 dark:hover:text-white select-none">
                        Max Peak Demand met (MW) {sortField === "max" && (sortAsc ? "▲" : "▼")}
                      </th>
                      <th onClick={() => handleSort("min")} className="py-2.5 px-4 text-right cursor-pointer hover:text-slate-800 dark:hover:text-white select-none">
                        Min Base Demand (MW) {sortField === "min" && (sortAsc ? "▲" : "▼")}
                      </th>
                      <th onClick={() => handleSort("energy")} className="py-2.5 px-4 text-right cursor-pointer hover:text-slate-800 dark:hover:text-white select-none">
                        Total Energy Met (MU) {sortField === "energy" && (sortAsc ? "▲" : "▼")}
                      </th>
                      <th onClick={() => handleSort("loss")} className="py-2.5 px-4 text-right cursor-pointer hover:text-slate-800 dark:hover:text-white select-none">
                        Transmission Loss Index (%) {sortField === "loss" && (sortAsc ? "▲" : "▼")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                    {filteredTrendData.length > 0 ? (
                      filteredTrendData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                          <td className="py-2 px-4 font-bold text-slate-900 dark:text-white">{row.year}</td>
                          <td className="py-2 px-4 text-right">{row.max.toLocaleString()} MW</td>
                          <td className="py-2 px-4 text-right">{row.min.toLocaleString()} MW</td>
                          <td className="py-2 px-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">{row.energy.toLocaleString()} MU</td>
                          <td className="py-2 px-4 text-right font-sans text-xs">
                            <span className="bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded font-mono font-bold">
                              {row.loss}%
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-500 font-sans italic">
                          No historical logs match the search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Grid Efficiency Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl h-max">
                    <TrendingUp size={16} />
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="block font-black text-slate-800 dark:text-slate-200">Decadal Transmission Efficiency</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      APTRANSCO maintains one of the lowest wheeling loss quotients in the country, declining steadily from <strong className="text-rose-600 font-mono">4.12%</strong> in 2011 to an outstanding <strong className="text-emerald-600 font-mono">2.71%</strong> in 2026.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-purple-50/50 dark:bg-purple-950/10 border border-purple-100 dark:border-purple-900/30 rounded-2xl flex gap-3">
                  <div className="p-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl h-max">
                    <Cpu size={16} />
                  </div>
                  <div className="text-xs space-y-1">
                    <span className="block font-black text-slate-800 dark:text-slate-200">Advanced Analytics Grid Model</span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                      Differentiated multi-channel database integration manages state-administered peaking loads, helping planners optimize central generation procurement schedules.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
