import React, { useEffect, useRef, useState } from "react";
import { TENDERS, NOTICES, BOARD_MEMBERS } from "../data";
import { Landmark, FileText, ChevronRight, ArrowRight, Calendar, MapPin, Bell, Briefcase, Sparkles, Award } from "lucide-react";
import { GridAnalytics } from "./GridAnalytics";

interface HomeMockupProps {
  setActivePage: (url: string) => void;
  language: "EN" | "TE";
  isHighContrast: boolean;
  fontScale: number;
  viewportMode?: "desktop" | "tablet" | "mobile";
}

export const HomeMockup: React.FC<HomeMockupProps> = ({ setActivePage, language, isHighContrast, fontScale, viewportMode }) => {
  const cmd = BOARD_MEMBERS[0];
  const telemetryTrackRef = useRef<HTMLDivElement>(null);
  const [marqueeOffset, setMarqueeOffset] = useState(0);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const offsetRef = useRef(0);
  const dragBaseOffsetRef = useRef(0);
  const trackWidthRef = useRef(0);
  const resumeTimerRef = useRef<number | null>(null);

  const translations = {
    EN: {
      gridStatus: "GRID STATUS LIVE",
      frequency: "SYSTEM FREQUENCY:",
      demand: "TOTAL STATE DEMAND:",
      renewables: "RENEWABLE ENERGY INJECTION:",
      circuitStatus: "400kV CIRCUIT STATUS:",
      healthy: "HEALTHY",
      aboutTitle: "About APTRANSCO",
      aboutText: "The Transmission Corporation of Andhra Pradesh (APTRANSCO) was established following the unbundling of the AP State Electricity Board. We are committed to maintaining a robust 400kV, 220kV, and 132kV transmission network, enabling seamless power evacuation and distribution throughout the state.",
      circuitKm: "Circuit KM Lines",
      substations: "Sub-stations",
      availability: "System Availability",
      chairmansMessage: "Chairman's Message",
      chairmanQuote: "Innovating for an energy-secure state",
      chairmanText: "APTRANSCO is spearheading the integration of renewable energy into our grid, ensuring that Andhra Pradesh remains at the forefront of the national...",
      readStatement: "READ FULL STATEMENT",
      procurementTitle: "Procurement & Tenders",
      activeBidding: "Active bidding and technical notices",
      viewAllTenders: "VIEW ALL TENDERS",
      careersTitle: "Careers & News",
      careersPortal: "CAREERS PORTAL",
      upcomingEvents: "Upcoming Events & News",
      allNotifications: "Notifications & Releases",
      latestReleases: "LATEST RELEASES",
      gisTitle: "Grid Visualization (GIS)",
      gisText: "Monitor the live transmission network across the state with our interactive Geographic Information System.",
      gis400kv: "400kV EXTRA HIGH VOLTAGE",
      gis220kv: "220kV SUBSTATIONS",
      launchMap: "LAUNCH INTERACTIVE MAP",
      bidNow: "BID NOW",
      govBadge: "GOVERNMENT OF ANDHRA PRADESH",
      poweringFuture: "Powering the Future of Andhra Pradesh",
      heroText: "As the backbone of the state's power sector, APTRANSCO ensures reliable, stable, and sustainable high-voltage transmission through technological innovation and engineering excellence.",
      exploreNetwork: "EXPLORE NETWORK",
      annualReport: "ANNUAL REPORT 2024"
    },
    TE: {
      gridStatus: "గ్రిడ్ స్థితి లైవ్",
      frequency: "సిస్టమ్ ఫ్రీక్వెన్సీ:",
      demand: "మొత్తం రాష్ట్ర డిమాండ్:",
      renewables: "పునరుత్పాదక ఇంధనం ఇన్జెక్షన్:",
      circuitStatus: "400kV సర్క్యూట్ స్థితి:",
      healthy: "సురక్షితం",
      aboutTitle: "ఏపీట్రాన్స్కో గురించి",
      aboutText: "ఆంధ్రప్రదేశ్ రాష్ట్ర విద్యుత్ బోర్డు విభజన తర్వాత ఆంధ్రప్రదేశ్ ప్రసార కార్పొరేషన్ (APTRANSCO) స్థాపించబడింది. రాష్ట్రవ్యాప్తంగా అతుకులు లేని విద్యుత్ తరలింపు మరియు పంపిణీని నిర్ధారించడానికి మేము బలమైన 400kV, 220kV మరియు 132kV ప్రసార నెట్‌వర్క్‌ను నిర్వహించడానికి కట్టుబడి ఉన్నాము.",
      circuitKm: "సర్క్యూట్ కి.మీ లైన్లు",
      substations: "సబ్ స్టేషన్లు",
      availability: "సిస్టమ్ అందుబాటు",
      chairmansMessage: "చైర్మన్ సందేశం",
      chairmanQuote: "ఇంధన భద్రత కలిగిన రాష్ట్రం కోసం ఆవిష్కరణ",
      chairmanText: "ఆంధ్రప్రదేశ్ జాతీయ స్థాయిలో ముందంజలో ఉండేలా చూస్తూ, మా గ్రిడ్‌లో పునరుత్పాదక ఇంధన అనుసంధానానికి ఏపీట్రాన్స్కో నాయకత్వం వహిస్తోంది...",
      readStatement: "పూర్తి ప్రకటన చదవండి",
      procurementTitle: "ప్రొక్యూర్‌మెంట్ & టెండర్లు",
      activeBidding: "కార్యాచరణ బిడ్డింగ్ మరియు సాంకేతిక నోటీసులు",
      viewAllTenders: "అన్ని టెండర్లను చూడండి",
      careersTitle: "కెరీర్లు & వార్తలు",
      careersPortal: "కెరీర్ల పోర్టల్",
      upcomingEvents: "రాబోయే ఈవెంట్‌లు & వార్తలు",
      allNotifications: "నోటిఫికేషన్లు & ప్రకటనలు",
      latestReleases: "తాజా విడుదలలు",
      gisTitle: "గ్రిడ్ విజువలైజేషన్ (GIS)",
      gisText: "మా ఇంటరాక్టివ్ జియోగ్రాఫిక్ ఇన్ఫర్మేషన్ సిస్టమ్‌తో రాష్ట్రవ్యాప్తంగా ప్రత్యక్ష ప్రసార నెట్‌వర్క్‌ను పర్యవేక్షించండి.",
      gis400kv: "400kV ఎక్స్‌ట్రా హై వోల్టేజ్",
      gis220kv: "220kV సబ్‌స్టేషన్లు",
      launchMap: "ఇంటరాక్టివ్ మ్యాప్‌ను ప్రారంభించండి",
      bidNow: "బిడ్ చేయండి",
      govBadge: "ఆంధ్రప్రదేశ్ ప్రభుత్వం",
      poweringFuture: "ఆంధ్రప్రదేశ్ భవిష్యత్తుకు విద్యుత్ కాంతులు",
      heroText: "రాష్ట్ర విద్యుత్ రంగానికి వెన్నెముకగా, ఏపీట్రాన్స్కో సాంకేతిక ఆవిష్కరణలు మరియు ఇంజనీరింగ్ నైపుణ్యం ద్వారా నమ్మకమైన, స్థిరమైన మరియు స్థిరమైన ప్రసారాన్ని నిర్ధారిస్తుంది.",
      exploreNetwork: "నెట్‌వర్క్ అన్వేషించండి",
      annualReport: "వార్షిక నివేదిక 2024"
    }
  };

  const homepageTenders = [
    {
      badge: "URGENT",
      badgeColor: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
      refNo: "e-Tender No: 42/2024",
      title: "Erection of 400kV Quad DC line from Substation A to B",
      closing: "Closing: 24 Oct 2024, 15:00 HRS",
      icon: "file"
    },
    {
      badge: "ACTIVE",
      badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
      refNo: "Spec No: TR-105/2024",
      title: "Supply of 315MVA, 400/220/33kV Power Transformers",
      closing: "Closing: 12 Nov 2024, 17:30 HRS",
      icon: "settings"
    }
  ];

  const [notifFilter, setNotifFilter] = useState<"ALL" | "CAREERS" | "NOTIFICATIONS" | "NEWS" | "CIRCULARS">("ALL");
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [eventReminderSet, setEventReminderSet] = useState<{[key: number]: boolean}>({});

  const homepageNotifications = [
    {
      month: language === "EN" ? "OCT" : "అక్టో",
      day: "15",
      category: "CAREERS",
      categoryLabel: language === "EN" ? "CAREERS" : "కెరీర్లు",
      badgeColor: "bg-blue-50 text-[#1d70b8] border-blue-100 dark:bg-blue-950/40 dark:text-sky-300 dark:border-blue-900/50",
      title: language === "EN" ? "Assistant Executive Engineer (Elec) Recruitment 2024" : "అసిస్టెంట్ ఎగ్జిక్యూటివ్ ఇంజనీర్ (ఎలక్ట్రికల్) రిక్రూట్‌మెంట్ 2024",
      subtitle: language === "EN" ? "Notification of results for Phase II interviews." : "ఫేజ్ II ఇంటర్వ్యూల ఫలితాల నోటిఫికేషన్."
    },
    {
      month: language === "EN" ? "OCT" : "అక్టో",
      day: "12",
      category: "CIRCULARS",
      categoryLabel: language === "EN" ? "CIRCULAR" : "సర్క్యులర్",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-150 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
      title: language === "EN" ? "Revised O&M Guidelines for 400kV Substations" : "400kV సబ్‌స్టేషన్‌ల కోసం సవరించిన O&M మార్గదర్శకాలు",
      subtitle: language === "EN" ? "Mandatory compliance standards for emergency restoration systems." : "అత్యవసర పునరుద్ధరణ వ్యవస్థల కోసం తప్పనిసరి సమ్మతి ప్రమాణాలు."
    },
    {
      month: language === "EN" ? "OCT" : "అక్టో",
      day: "10",
      category: "CAREERS",
      categoryLabel: language === "EN" ? "CAREERS" : "కెరీర్లు",
      badgeColor: "bg-blue-50 text-[#1d70b8] border-blue-100 dark:bg-blue-950/40 dark:text-sky-300 dark:border-blue-900/50",
      title: language === "EN" ? "Hall Ticket Download for Junior Linemen (Contract)" : "జూనియర్ లైన్‌మెన్ (కాంట్రాక్ట్) హాల్ టికెట్ డౌన్‌లోడ్",
      subtitle: language === "EN" ? "Computer-based test scheduled for Nov 05." : "కంప్యూటర్ ఆధారిత పరీక్ష నవంబర్ 05న నిర్ణయించబడింది."
    },
    {
      month: language === "EN" ? "OCT" : "అక్టో",
      day: "04",
      category: "NOTIFICATIONS",
      categoryLabel: language === "EN" ? "NOTIFICATION" : "నోటిఫికేషన్",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-150 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50",
      title: language === "EN" ? "Grid Expansion Bid Announcement - Visakhapatnam Zone" : "గ్రిడ్ విస్తరణ బిడ్ ప్రకటన - విశాఖపట్నం జోన్",
      subtitle: language === "EN" ? "Consolidated bids invited for construction of 132kV sub-stations." : "132kV సబ్-స్టేషన్ల నిర్మాణం కోసం బిడ్లు ఆహ్వానించబడ్డాయి."
    },
    {
      month: language === "EN" ? "SEP" : "సెప్టె",
      day: "28",
      category: "NEWS",
      categoryLabel: language === "EN" ? "NEWS" : "వార్తలు",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-150 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
      title: language === "EN" ? "Apprenticeship Training Program 2024-25" : "అప్రెంటిస్‌షిప్ ట్రైనింగ్ ప్రోగ్రామ్ 2024-25",
      subtitle: language === "EN" ? "Applications invited for engineering graduates." : "ఇంజనీరింగ్ గ్రాడ్యుయేట్ల నుండి దరఖాస్తులు ఆహ్వానించబడ్డాయి."
    },
    {
      month: language === "EN" ? "SEP" : "సెప్టె",
      day: "22",
      category: "NEWS",
      categoryLabel: language === "EN" ? "NEWS" : "వార్తలు",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-150 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
      title: language === "EN" ? "Inauguration of 220kV Digital GIS Substation" : "220kV డిజిటల్ జిఐఎస్ సబ్‌స్టేషన్ ప్రారంభోత్సవం",
      subtitle: language === "EN" ? "Hon'ble Minister for Energy commissioned the state-of-the-art facility at Kurnool." : "గౌరవనీయులైన ఇంధన శాఖ మంత్రి కర్నూలులో అత్యాధునిక సదుపాయాన్ని ప్రారంభించారు."
    }
  ];

  const homepageEvents = [
    {
      id: 1,
      month: language === "EN" ? "NOV" : "నవం",
      day: "18",
      title: language === "EN" ? "Southern Region Power Committee (SRPC) Meet" : "సదరన్ రీజియన్ పవర్ కమిటీ (SRPC) సమావేశం",
      desc: language === "EN" ? "Inter-state grid synchronization and renewable transmission protocols review with state ministers." : "రాష్ట్ర మంత్రులతో అంతర్-రాష్ట్ర గ్రిడ్ అనుసంధానం మరియు పునరుత్పాదక ప్రసార ప్రోటోకాల్‌ల సమీక్ష.",
      location: language === "EN" ? "Vidyut Soudha, Vijayawada" : "విద్యుత్ సౌధ, విజయవాడ",
      status: language === "EN" ? "Upcoming" : "రాబోయేది",
      badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
    },
    {
      id: 2,
      month: language === "EN" ? "DEC" : "డిసెం",
      day: "05",
      title: language === "EN" ? "Grid Integration of Offshore Wind Projects Workshop" : "ఆఫ్‌షోర్ విండ్ ప్రాజెక్ట్స్ వర్క్‌షాప్ గ్రిడ్ ఇంటిగ్రేషన్",
      desc: language === "EN" ? "Technical session on routing offshore renewable energy into the 400kV state corridor." : "ఆఫ్‌షోర్ పునరుత్పాదక శక్తిని 400kV రాష్ట్ర కారిడార్‌లోకి చేర్చడంపై సాంకేతిక సెషన్.",
      location: language === "EN" ? "Visakhapatnam Zone HQ" : "విశాఖపట్నం జోన్ హెచ్‌క్యూ",
      status: language === "EN" ? "Registration Open" : "రిజిస్ట్రేషన్ ప్రారంభం",
      badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
    },
    {
      id: 3,
      month: language === "EN" ? "DEC" : "డిసెం",
      day: "20",
      title: language === "EN" ? "Consumer Safety & Energy Efficiency Campaign" : "వినియోగదారుల భద్రత & ఇంధన సామర్థ్య ప్రచారం",
      desc: language === "EN" ? "State-wide public awareness program focusing on smart metering safety standards and distribution safety." : "స్మార్ట్ మీటరింగ్ భద్రతా ప్రమాణాలు మరియు పంపిణీ భద్రతపై దృష్టి సారించే రాష్ట్రవ్యాప్త ప్రజల అవగాహన కార్యక్రమం.",
      location: language === "EN" ? "All Circle Offices" : "అన్ని సర్కిల్ కార్యాలయాలు",
      status: language === "EN" ? "Public Event" : "ప్రజా ఈవెంట్",
      badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
    }
  ];

  const telemetryItems = [
    { label: translations[language].frequency, value: "50.02 Hz", accent: "text-emerald-400" },
    { label: translations[language].demand, value: "12,410 MW", accent: "text-amber-400" },
    { label: translations[language].renewables, value: "4,210 MW", accent: "text-sky-400" },
    { label: translations[language].circuitStatus, value: translations[language].healthy, accent: "text-emerald-400" }
  ];

  useEffect(() => {
    if (viewportMode !== "mobile") return;

    const track = telemetryTrackRef.current;
    if (!track) return;

    const measureWidth = () => {
      const content = track.firstElementChild as HTMLElement | null;
      if (!content) return;
      const fullWidth = content.parentElement?.scrollWidth ?? 0;
      trackWidthRef.current = Math.max(fullWidth / 2, 1);
    };

    measureWidth();
    window.addEventListener("resize", measureWidth);
    return () => window.removeEventListener("resize", measureWidth);
  }, [viewportMode, language]);

  useEffect(() => {
    if (viewportMode !== "mobile") return;

    let frameId = 0;
    let lastTime = performance.now();
    const speedPxPerSecond = 32;

    const tick = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isMarqueePaused) {
        const nextOffset = offsetRef.current - speedPxPerSecond * delta;
        const resetAt = -Math.max(trackWidthRef.current, 1);

        if (nextOffset <= resetAt) {
          offsetRef.current = 0;
          setMarqueeOffset(0);
        } else {
          offsetRef.current = nextOffset;
          setMarqueeOffset(nextOffset);
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [viewportMode, isMarqueePaused]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const pauseMarquee = () => {
    setIsMarqueePaused(true);
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
  };

  const resumeMarquee = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setIsMarqueePaused(false);
    }, 4000);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    pauseMarquee();
    setDragStartX(event.touches[0]?.clientX ?? null);
    dragBaseOffsetRef.current = offsetRef.current;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (dragStartX === null) return;

    const deltaX = (event.touches[0]?.clientX ?? dragStartX) - dragStartX;
    const nextOffset = Math.max(-Math.max(trackWidthRef.current, 1), Math.min(0, dragBaseOffsetRef.current + deltaX));
    offsetRef.current = nextOffset;
    setMarqueeOffset(nextOffset);
  };

  const handleTouchEnd = () => {
    setDragStartX(null);
    resumeMarquee();
  };

  return (
    <div className={`space-y-4 md:space-y-5 select-none pb-16 ${isHighContrast ? "bg-black text-white" : "bg-slate-50"}`}>
      
      {/* 1. Integrated Ticker Bar (Grid Status Live) */}
      {viewportMode === "mobile" ? (
        <div className={`w-full overflow-hidden text-[11px] font-sans font-medium transition-all rounded-2xl border ${
          isHighContrast 
            ? "bg-stone-900 border-white text-white" 
            : "bg-slate-900/90 backdrop-blur-md border-slate-800 text-white shadow-lg"
        }`}>
          <div className="flex items-stretch">
            <div className="flex shrink-0 items-center justify-center bg-[#b45309] px-4 py-3 font-bold uppercase tracking-widest text-[10px] text-white select-none">
              <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
              {translations[language].gridStatus}
            </div>
            <div
              ref={telemetryTrackRef}
              className="min-w-0 flex-1 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              style={{ touchAction: "pan-x" }}
            >
              <div
                className="flex w-max items-center gap-3 whitespace-nowrap py-3 pr-4 will-change-transform"
                style={{ transform: `translate3d(${marqueeOffset}px, 0, 0)` }}
              >
                {telemetryItems.concat(telemetryItems).map((item, index) => (
                  <div key={`${item.label}-${index}`} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 backdrop-blur-sm">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                    <span className={`text-[10px] font-black tracking-tight ${item.accent}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`w-full flex flex-col md:flex-row md:items-center justify-between text-[11px] font-sans font-medium transition-all ${
          viewportMode === "desktop" ? "rounded-none border-x-0" : "rounded-2xl border"
        } ${
          isHighContrast 
            ? "bg-stone-900 border-white text-white" 
            : "bg-slate-900/90 backdrop-blur-md border-slate-800 text-white shadow-lg"
        }`}>
          <div className="w-full md:w-auto">
            <span className="flex w-full md:w-auto items-center justify-center md:justify-start bg-[#b45309] text-white px-5 py-3 font-bold uppercase tracking-widest gap-2 shrink-0 select-none text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse block shadow-[0_0_8px_#34d399]"></span>
              {translations[language].gridStatus}
            </span>
          </div>
          <div className="w-full md:flex-1 min-w-0 px-4 md:px-6 py-3 font-mono">
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-2 md:gap-6 w-full max-w-full">
              <div className="flex items-center gap-2 group cursor-help">
                <span className="text-slate-400 font-medium">{translations[language].frequency}</span>
                <span className="text-emerald-400 font-black tracking-tight text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">50.02 Hz</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 group cursor-help">
                <span className="text-slate-400 font-medium">{translations[language].demand}</span>
                <span className="text-amber-400 font-black tracking-tight text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">12,410 MW</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 group cursor-help">
                <span className="text-slate-400 font-medium">{translations[language].renewables}</span>
                <span className="text-sky-400 font-black tracking-tight text-xs bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">4,210 MW</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 group cursor-help">
                <span className="text-slate-400 font-medium">{translations[language].circuitStatus}</span>
                <span className="text-emerald-400 font-black tracking-tight text-xs flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping block"></span>
                  {translations[language].healthy}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className={`relative overflow-hidden shadow-2xl min-h-[440px] md:min-h-[540px] flex flex-col justify-center text-white border transition-all ${
        viewportMode === "desktop" ? "rounded-none border-none" : "rounded-3xl border"
      } ${
        isHighContrast ? "border-white bg-black" : "border-slate-200/60 bg-slate-950"
      }`}>
        {/* Background Image with Overlay */}
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 scale-100 transition-transform duration-10000 opacity-100" 
              style={{ 
                backgroundImage: "url('https://plain-apac-prod-public.komododecks.com/202607/03/zG367kPUYCV5MNyBmoWJ/image.png')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/45 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.12),transparent_50%)] z-15"></div>
          </>
        )}
        
        {/* Content */}
        <div className="relative z-20 max-w-4xl px-8 md:px-14 py-16 space-y-6">
          <div>
            <span className="bg-[#b45309]/90 backdrop-blur-md text-white text-[10px] uppercase font-black tracking-widest px-3.5 py-1.5 rounded-lg border border-white/20 inline-block shadow-md">
              {translations[language].govBadge}
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="font-extrabold font-display tracking-tight leading-tight text-white drop-shadow-md text-3xl md:text-[44px]" style={{ fontSize: `${44 * fontScale}px` }}>
              {translations[language].poweringFuture}
            </h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl font-light" style={{ fontSize: `${14 * fontScale}px` }}>
              {translations[language].heroText}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-3">
            <button 
              onClick={() => setActivePage("/operations")}
              className="bg-[#b45309] hover:bg-[#c2410c] hover:-translate-y-0.5 active:translate-y-0 text-white font-bold rounded-xl flex items-center gap-2 uppercase tracking-wider transition-all duration-200 px-6 py-3 text-xs cursor-pointer shadow-lg shadow-amber-950/30"
            >
              {translations[language].exploreNetwork}
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>
            <button 
              onClick={() => setActivePage("/downloads")}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl uppercase tracking-wider transition-all duration-200 px-6 py-3 text-xs cursor-pointer backdrop-blur-xs hover:-translate-y-0.5 active:translate-y-0"
            >
              {translations[language].annualReport}
            </button>
          </div>
        </div>
      </section>

      {/* Center inner container for content grids */}
      <div className="max-w-[1650px] mx-auto px-4 md:px-8 w-full space-y-16 md:space-y-24">

      {/* 3. Re-arranged Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column - Main Corporate, Message & Procurement Content */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-12 md:space-y-16 flex flex-col justify-start">
          
          {/* About APTRANSCO Box */}
          <div className={`p-8 md:p-10 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-white text-slate-800 border-slate-200/85 shadow-[0_10px_35px_rgba(0,0,0,0.03)]"
          }`}>
            <div className="space-y-8">
              <div className="border-b pb-5 border-slate-100 dark:border-slate-800/60 flex items-center gap-3">
                <Landmark size={24} className="text-[#1d70b8] shrink-0" />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white" style={{ fontSize: `${20 * fontScale}px` }}>
                    {translations[language].aboutTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">
                    {language === "EN" ? "CORPORATE PROFILE & VISION" : "కార్పొరేట్ ప్రొఫైల్ & వీక్షణ"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal" style={{ fontSize: `${14 * fontScale}px` }}>
                {translations[language].aboutText}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
              <div className={`p-6 rounded-xl flex flex-col justify-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isHighContrast ? "border-white bg-stone-900" : "bg-blue-50/40 border-blue-100/60 hover:border-blue-200 hover:bg-blue-50/70"
              }`}>
                <span className="text-2xl md:text-3xl font-black font-mono text-[#1d70b8] tracking-tight block">28,000+</span>
                <span className="text-[10px] md:text-xs text-slate-700 dark:text-slate-300 font-bold mt-1.5">{language === "EN" ? "Circuit KM Lines" : "సర్క్యూట్ కి.మీ లైన్లు"}</span>
              </div>
              <div className={`p-6 rounded-xl flex flex-col justify-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isHighContrast ? "border-white bg-stone-900" : "bg-emerald-50/40 border-emerald-100/60 hover:border-emerald-200 hover:bg-emerald-50/70"
              }`}>
                <span className="text-2xl md:text-3xl font-black font-mono text-emerald-600 tracking-tight block">450+</span>
                <span className="text-[10px] md:text-xs text-slate-700 dark:text-slate-300 font-bold mt-1.5">{language === "EN" ? "Sub-stations" : "సబ్‌స్టేషన్లు"}</span>
              </div>
              <div className={`p-6 rounded-xl flex flex-col justify-center border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isHighContrast ? "border-white bg-stone-900" : "bg-amber-50/40 border-amber-100/60 hover:border-amber-200 hover:bg-amber-50/70"
              }`}>
                <span className="text-2xl md:text-3xl font-black font-mono text-amber-600 tracking-tight block">99.9%</span>
                <span className="text-[10px] md:text-xs text-slate-700 dark:text-slate-300 font-bold mt-1.5">{language === "EN" ? "System Availability" : "సిస్టమ్ అందుబాటు"}</span>
              </div>
            </div>
          </div>

          {/* Chairman's Message Box */}
          <div className={`p-8 md:p-10 rounded-2xl border relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-gradient-to-br from-[#0a1f3a] to-[#040f1d] text-white border-transparent"
          }`}>
            {/* Subtle Decorative Background Bolt */}
            {!isHighContrast && (
              <div className="absolute right-[-10px] bottom-[-10px] text-white/[0.02] pointer-events-none">
                <svg width="180" height="180" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
            )}

            <div className="space-y-8">
              <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                <img 
                  src={cmd.imageUrl} 
                  alt={cmd.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 rounded-xl border-2 border-amber-500/80 object-cover bg-slate-200 shrink-0 shadow-lg"
                />
                <div>
                  <h3 className="font-bold text-xl md:text-2xl font-display tracking-tight text-white" style={{ fontSize: `${20 * fontScale}px` }}>{translations[language].chairmansMessage}</h3>
                  <p className="text-xs text-amber-400 font-semibold tracking-wider uppercase mt-1">{translations[language].chairmanQuote}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed font-serif italic" style={{ fontSize: `${13.5 * fontScale}px` }}>
                "{translations[language].chairmanText}"
              </p>
            </div>

            <button 
              onClick={() => setActivePage("/about#board")}
              className="text-xs font-bold text-white hover:text-amber-300 flex items-center gap-2 border-t border-white/10 pt-6 mt-8 uppercase tracking-wider transition-all duration-200 cursor-pointer group"
            >
              {translations[language].readStatement}
              <ChevronRight size={15} className="text-amber-400 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Procurement & Tenders Box */}
          <div className={`p-8 md:p-10 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-white text-slate-800 border-slate-200/85 shadow-[0_10px_35px_rgba(0,0,0,0.03)]"
          }`}>
            <div className="border-b pb-5 border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-[#1d70b8] shrink-0" />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white" style={{ fontSize: `${20 * fontScale}px` }}>
                    {translations[language].procurementTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">
                    {translations[language].activeBidding}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setActivePage("/tenders")}
                className="text-xs font-bold text-[#b45309] hover:text-[#92400e] transition-colors uppercase tracking-wider flex items-center gap-1 group shrink-0"
              >
                {translations[language].viewAllTenders}
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="space-y-4 mt-8">
              {homepageTenders.map((tender, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                    isHighContrast ? "bg-black text-white border-white" : "bg-slate-50/50 hover:bg-slate-50 border-slate-100"
                  }`}
                >
                  <div className="flex gap-4 items-start">
                    <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isHighContrast ? "bg-stone-900 border border-white text-white" : "bg-blue-50 text-[#1d70b8] group-hover:bg-blue-100"
                    }`}>
                      {tender.icon === "file" ? (
                        <FileText size={20} />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="3"/>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                        </svg>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded-lg border ${
                          isHighContrast ? "border-white bg-stone-950 text-white" : tender.badgeColor
                        }`}>
                          {tender.badge}
                        </span>
                        <span className="font-mono text-[9px] text-slate-500 font-bold">{tender.refNo}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white leading-snug line-clamp-2" style={{ fontSize: `${13.5 * fontScale}px` }}>
                        {tender.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 block"></span>
                        {tender.closing}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActivePage("/tenders")}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 shrink-0 ${
                      isHighContrast 
                        ? "bg-white text-black hover:bg-amber-400" 
                        : "bg-[#001329] hover:bg-slate-900 hover:-translate-y-0.5 text-white shadow-xs"
                    }`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="shrink-0">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                    </svg>
                    {translations[language].bidNow}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column - Careers, News & Notifications + Upcoming Events */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-12 md:space-y-16 flex flex-col justify-start">
          
          {/* Big Careers, News & Notifications Box */}
          <div className={`p-8 md:p-10 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-white text-slate-800 border-slate-200/85 shadow-[0_10px_35px_rgba(0,0,0,0.03)]"
          }`}>
            <div className="space-y-8">
              {/* Heading */}
              <div className="border-b pb-5 border-slate-100 dark:border-slate-800/60 flex items-center gap-3">
                <Bell size={24} className="text-[#1d70b8] shrink-0 animate-pulse" />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white" style={{ fontSize: `${20 * fontScale}px` }}>
                    {translations[language].allNotifications}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">
                    {translations[language].latestReleases}
                  </p>
                </div>
              </div>

              {/* Filtering Pills */}
              <div className="flex flex-wrap gap-1.5">
                {(["ALL", "CAREERS", "NOTIFICATIONS", "NEWS", "CIRCULARS"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setNotifFilter(filter)}
                    className={`px-3 py-1.5 text-[9px] font-black tracking-wider uppercase rounded-lg border transition-all cursor-pointer ${
                      notifFilter === filter
                        ? isHighContrast
                          ? "bg-white text-black border-white"
                          : "bg-[#1d70b8] text-white border-[#1d70b8] shadow-sm"
                        : isHighContrast
                          ? "bg-stone-900 text-slate-300 border-stone-800 hover:border-white"
                          : "bg-slate-50 text-slate-600 border-slate-150 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {filter === "ALL" 
                      ? (language === "EN" ? "ALL" : "అన్నీ")
                      : filter === "CAREERS"
                      ? (language === "EN" ? "CAREERS" : "కెరీర్లు")
                      : filter === "NOTIFICATIONS"
                      ? (language === "EN" ? "NOTICES" : "నోటీసులు")
                      : filter === "NEWS"
                      ? (language === "EN" ? "NEWS" : "వార్తలు")
                      : (language === "EN" ? "CIRCULARS" : "సర్క్యులర్")}
                  </button>
                ))}
              </div>

              {/* Notification List */}
              <div className="space-y-6">
                {homepageNotifications
                  .filter(item => notifFilter === "ALL" || item.category === notifFilter)
                  .map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start group relative">
                      {/* Left Date indicator */}
                      <div className={`shrink-0 font-mono text-center w-12 rounded-xl border p-2 transition-all group-hover:scale-105 ${
                        isHighContrast 
                          ? "border-white bg-stone-900 text-white" 
                          : "bg-slate-50 border-slate-200/80 text-[#1d70b8]"
                      }`}>
                        <span className="block text-[8px] uppercase font-extrabold text-slate-500">{item.month}</span>
                        <span className="block font-black text-base text-[#1d70b8] dark:text-sky-400">{item.day}</span>
                      </div>
                      
                      {/* Description */}
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                            {item.categoryLabel}
                          </span>
                        </div>
                        <h4 
                          onClick={() => setActivePage("/notices#careers")} 
                          className="text-xs md:text-sm font-bold text-slate-800 dark:text-white hover:text-blue-600 cursor-pointer leading-snug transition-colors"
                          style={{ fontSize: `${12.5 * fontScale}px` }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-normal">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <button 
              onClick={() => setActivePage("/notices#careers")}
              className={`w-full text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider block mt-10 transition-all cursor-pointer hover:-translate-y-0.5 ${
                isHighContrast 
                  ? "bg-stone-900 hover:bg-white hover:text-black text-white border border-white" 
                  : "bg-blue-50 hover:bg-blue-100 text-[#1d70b8] hover:shadow-xs"
              }`}
            >
              {translations[language].careersPortal}
            </button>
          </div>

          {/* New Upcoming Events & News Section */}
          <div className={`p-8 md:p-10 rounded-2xl border flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-white text-slate-800 border-slate-200/85 shadow-[0_10px_35px_rgba(0,0,0,0.03)]"
          }`}>
            <div className="space-y-8">
              {/* Header */}
              <div className="border-b pb-5 border-slate-100 dark:border-slate-800/60 flex items-center gap-3">
                <Calendar size={24} className="text-amber-500 shrink-0" />
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white" style={{ fontSize: `${20 * fontScale}px` }}>
                    {translations[language].upcomingEvents}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mt-1">
                    {language === "EN" ? "KEY DATES & ENGAGEMENTS" : "కీలక తేదీలు & సమావేశాలు"}
                  </p>
                </div>
              </div>

              {/* Event Cards */}
              <div className="space-y-5">
                {homepageEvents.map((ev) => {
                  const isExpanded = selectedEventId === ev.id;
                  const isReminderSet = eventReminderSet[ev.id];
                  
                  return (
                    <div 
                      key={ev.id}
                      className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                        isExpanded
                          ? isHighContrast
                            ? "bg-stone-900 border-white"
                            : "bg-amber-50/20 border-amber-200 shadow-md"
                          : isHighContrast
                            ? "bg-black hover:bg-stone-900 border-stone-800"
                            : "bg-slate-50/40 hover:bg-slate-50 border-slate-100"
                      }`}
                    >
                      <div className="flex gap-4 items-start justify-between w-full">
                        <div className="flex gap-4 items-start flex-1">
                          {/* Calendar block */}
                          <div className={`shrink-0 font-mono text-center w-12 rounded-xl border p-2 transition-all ${
                            isHighContrast
                              ? "border-white bg-stone-950 text-white"
                              : "bg-slate-50 border-slate-200/80 text-amber-600"
                          }`}>
                            <span className="block text-[8px] uppercase font-extrabold text-amber-500">{ev.month}</span>
                            <span className="block font-black text-sm text-slate-800 dark:text-amber-400">{ev.day}</span>
                          </div>

                          <div className="space-y-1.5 flex-1">
                            <h4 
                              onClick={() => setSelectedEventId(isExpanded ? null : ev.id)}
                              className="text-xs md:text-sm font-extrabold text-slate-850 dark:text-white cursor-pointer hover:text-amber-600 transition-colors"
                            >
                              {ev.title}
                            </h4>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                              <MapPin size={12} className="text-slate-400 shrink-0" />
                              <span>{ev.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md shrink-0 ${ev.badgeColor}`}>
                          {ev.status}
                        </span>
                      </div>

                      {/* Expanded View */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3.5">
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                            {ev.desc}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEventReminderSet(prev => ({ ...prev, [ev.id]: !isReminderSet }))}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer ${
                                isReminderSet
                                  ? "bg-emerald-500 text-white border-transparent"
                                  : isHighContrast
                                    ? "bg-white text-black hover:bg-amber-300"
                                    : "bg-amber-500 hover:bg-amber-600 text-white shadow-xs"
                              }`}
                            >
                              {isReminderSet 
                                ? (language === "EN" ? "✓ REMINDER SET" : "✓ రిమైండర్ సెట్ చేయబడింది") 
                                : (language === "EN" ? "⏰ NOTIFY ME" : "⏰ నాకు తెలియజేయండి")}
                            </button>
                            <button
                              onClick={() => setSelectedEventId(null)}
                              className={`px-3 py-1.5 rounded-lg text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer ${
                                isHighContrast
                                  ? "border border-white hover:bg-stone-800 text-white"
                                  : "bg-slate-150/60 hover:bg-slate-200/80 text-slate-700"
                              }`}
                            >
                              {language === "EN" ? "CLOSE" : "మూసివేయి"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <button
              onClick={() => setActivePage("/notices#events")}
              className={`w-full text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider block mt-10 transition-all cursor-pointer hover:-translate-y-0.5 ${
                isHighContrast
                  ? "bg-stone-900 hover:bg-white hover:text-black text-white border border-white"
                  : "bg-amber-50 hover:bg-amber-100/60 text-amber-700 hover:shadow-xs"
              }`}
            >
              {language === "EN" ? "VIEW ALL EVENTS" : "అన్ని ఈవెంట్‌లను చూడండి"}
            </button>
          </div>

        </div>

      </div>

      {/* 5. Grid Telemetry & Interactive GIS Analytics Section */}
      <section className="w-full">
        <GridAnalytics 
          language={language} 
          isHighContrast={isHighContrast} 
          fontScale={fontScale} 
        />
      </section>
      </div>
    </div>
  );
};
