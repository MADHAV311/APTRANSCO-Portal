import React, { useState, useEffect } from "react";
import { TENDERS, PROJECTS, BOARD_MEMBERS, OFFICE_DIRECTORY } from "../data";
import { FileText, Download, ShieldCheck, MapPin, Search, ChevronRight, Phone, Mail, Landmark, Users, Award, Calendar, AlertTriangle, Zap, Building2, Compass, ChevronLeft, ExternalLink, Wrench, ArrowRight, Laptop, Lock, Shield, Server, Cpu, Database, CheckSquare, Key, Globe, Eye, EyeOff, X, Activity, BookOpen, Monitor, Smartphone } from "lucide-react";

interface PageProps {
  language: "EN" | "TE";
  isHighContrast: boolean;
  fontScale: number;
  viewportMode?: "desktop" | "tablet" | "mobile";
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  isHighContrast?: boolean;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, suffix = "", isHighContrast }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <span className={`text-2xl md:text-3xl font-black font-mono tracking-tight ${
      isHighContrast ? "text-white" : "text-slate-900 dark:text-white"
    }`}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const AnimatedFloatCounter: React.FC<AnimatedCounterProps> = ({ target, suffix = "", isHighContrast }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(easeProgress * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <span className={`text-2xl md:text-3xl font-black font-mono tracking-tight ${
      isHighContrast ? "text-white" : "text-slate-900 dark:text-white"
    }`}>
      {count.toFixed(2)}{suffix}
    </span>
  );
};

const aboutTranslations = {
  EN: {
    heroTag: "Corporate Profile",
    heroTitle: "Transmission Corporation of Andhra Pradesh",
    heroSubtitle: "Powering Progress, Sustaining Communities",
    heroDesc: "APTRANSCO is the premier power transmission utility of Andhra Pradesh, committed to delivering clean, reliable, and extra high-voltage power across 26 districts with world-class efficiency.",
    aboutSectionTitle: "About APTRANSCO",
    aboutPara1: "The Transmission Corporation of Andhra Pradesh Limited (APTRANSCO) was incorporated on 1st February 1999 as a result of the pioneering power sector reforms in the state. Since then, it has grown into one of the most efficient and robust state-level transmission utilities in India, managing a massive network of extra-high tension (EHT) power lines and substations.",
    aboutPara2: "With a steadfast commitment to technological innovation, grid discipline, and renewable energy integration, APTRANSCO ensures 24/7 high-quality power evacuation and system reliability for millions of consumers. We are transitioning towards a smart, self-healing grid utilizing artificial intelligence, real-time telemetry, and cyber-hardened systems.",
    visionTitle: "Our Institutional Vision",
    visionDesc: "To be a world-class power transmission utility, ensuring grid stability, peak transmission availability, and integrating high-capacity green corridors for sustainable progress.",
    missionTitle: "Our Institutional Mission",
    missionDesc: "To transmit reliable, quality power at optimal cost with minimal transmission losses; to deploy state-of-the-art automation and SCADA technologies; and to build a resilient, future-ready energy corridor.",
    statNetwork: "EHV Transmission Network",
    statNetworkDesc: "Extensive network of 400kV, 220kV, and 132kV extra-high-voltage lines connecting generators to load centers.",
    statSubstations: "Automated Substations",
    statSubstationsDesc: "Modern, automated, and gas-insulated substations reducing the footprint and ensuring superior voltage control.",
    statAvailability: "System Availability",
    statAvailabilityDesc: "Consistent high-performance standard exceeding the national average with optimized grid-frequency management.",
    statRenewables: "Renewable Integration",
    statRenewablesDesc: "Unlocking clean wind and solar power evacuation from regional mega energy parks directly into the grid.",
    ecoTitle: "APTRANSCO at a Glance",
    ecoSubtitle: "Interactive Power Grid Ecosystem",
    ecoStep1Title: "Generation Feed",
    ecoStep1Desc: "Evacuates power from APGENCO, NTPC, and private IPPs.",
    ecoStep2Title: "Pooling Stations",
    ecoStep2Desc: "Steps up voltage to 400kV for efficient transmission.",
    ecoStep3Title: "Core Transmission",
    ecoStep3Desc: "Transmits bulk power across 28,450 ckm of EHT lines.",
    ecoStep4Title: "Distribution Grid",
    ecoStep4Desc: "Feeds district load centers via 462 automated substations.",
    ecoStep5Title: "End Consumers",
    ecoStep5Desc: "Delivers reliable power to industries, farms, and homes.",
    achSubtitle: "Key performance indicators highlighting our operational leadership.",
    ach1Title: "Grid Coverage",
    ach1Item1: "Over 28,450 ckm of high-tension lines",
    ach1Item2: "Double-circuit line configurations",
    ach1Item3: "Right of Way (RoW) optimized paths",
    ach2Title: "Transformer Capacity",
    ach2Item1: "462 EHT automated substations",
    ach2Item2: "Transitioning to GIS technology",
    ach2Item3: "Redundant power pylon infrastructure",
    ach3Title: "Grid Performance",
    ach3Item1: "Exceeded national target (99.50%)",
    ach3Item2: "Lowest transmission losses in India",
    ach3Item3: "Under-second automated rerouting",
    ach4Title: "Green Grid Corridors",
    ach4Item1: "Evacuating over 8,500 MW of green power",
    ach4Item2: "Dedicated wind/solar pooling substations",
    ach4Item3: "Dynamic line rating for peak solar hours",
    timeTitle: "APTRANSCO Milestones",
    timeSubtitle: "Our journey from structural unbundling to a smart, digitized, self-healing grid.",
    time1Title: "Power Sector Reform",
    time1Desc: "Unbundling of APSEB into APGENCO, APTRANSCO, and DISCOMs to establish professional corporate management.",
    time2Title: "Operational Independence",
    time2Desc: "Establishment of the State Load Dispatch Centre (SLDC) as an independent apex body for grid scheduling.",
    time3Title: "Bifurcation & Expansion",
    time3Desc: "Restructuring of APTRANSCO's grid boundaries, building massive new high-voltage links across restructured districts.",
    time4Title: "Green Energy Corridor",
    time4Desc: "Commissioning of specialized extra-high-voltage corridors to evacuate bulk solar and wind energy from southern districts.",
    time5Title: "Grid Automation & GIS",
    time5Desc: "Implementing automated substation monitoring and launching Gas Insulated Substations (GIS) to minimize footprint.",
    time6Title: "Smart Grid & AI-REMC",
    time6Desc: "Modernizing with Artificial Intelligence forecasting, real-time phasor measurement units (PMUs), and cyber-defense systems.",
    execSubtitle: "Sri K. Vijayanand, IAS",
    execDesignation: "Chairman & Managing Director",
    execCadre: "Andhra Pradesh Cadre",
    execTitle: "Chairman's Message",
    execQuote: "APTRANSCO is committed to providing uninterrupted, quality power through technical excellence, operational integrity, and sustainable green energy corridors.",
    execText: "As we move into an era of rapid industrialization and green energy transition, the role of APTRANSCO is more critical than ever. We have successfully deployed state-of-the-art technologies including automated SCADA systems, real-time GIS mapping, and artificial intelligence-backed forecasting to keep our grid robust and resilient.",
    execText2: "Our dedication to safety, reliability, and public service remains absolute. Through major initiatives like our Green Energy Corridor, we are ensuring that Andhra Pradesh stays at the forefront of India's green industrial revolution.",
    execSignatureLabel: "Chairman & Managing Director, APTRANSCO",
    boardTitle: "Board of Directors",
    boardSubtitle: "Distinguished leadership spearheading grid excellence.",
    isoTitle: "Global Certifications & Standards",
    isoSubtitle: "APTRANSCO strictly complies with international quality, safety, and cybersecurity standards.",
    iso1: "ISO 9001:2015",
    iso1Desc: "Quality Management",
    iso2: "ISO 14001:2015",
    iso2Desc: "Environmental Audit",
    iso3: "ISO 45001:2018",
    iso3Desc: "Occupational Health",
    iso4: "ISO 27001:2013",
    iso4Desc: "Information Security",
    iso5: "ISO 50001:2018",
    iso5Desc: "Energy Management",
    valuesTitle: "Core Institutional Values",
    valuesSubtitle: "The principles that guide our everyday operations and decision-making.",
    valReliability: "Reliability",
    valReliabilityDesc: "Ensuring 24/7 uninterrupted power transmission with advanced state-of-the-art grid operations.",
    valSafety: "Safety",
    valSafetyDesc: "Maintaining the highest safety standards for our workforce and the public across all EHT lines.",
    valSustainability: "Sustainability",
    valSustainabilityDesc: "Committed to clean energy transition by implementing high-capacity green corridors.",
    valInnovation: "Innovation",
    valInnovationDesc: "Deploying AI forecasting, automated SCADA, and cyber-hardened systems for a smarter grid.",
    valTransparency: "Transparency",
    valTransparencyDesc: "Operating with absolute integrity, regulatory compliance, and open public communication.",
    valPublicService: "Public Service",
    valPublicServiceDesc: "Dedicated to powering progress, agricultural growth, and community welfare across the state.",
    achTitle: "Key Infrastructure Achievements",
  },
  TE: {
    heroTag: "కార్పొరేట్ ప్రొఫైల్",
    heroTitle: "ఆంధ్రప్రదేశ్ ప్రసార కార్పొరేషన్",
    heroSubtitle: "ప్రగతికి శక్తి, సమాజానికి భద్రత",
    heroDesc: "ఏపీట్రాన్స్కో ఆంధ్రప్రదేశ్ యొక్క అగ్రగామి విద్యుత్ ప్రసార సంస్థ, 26 జిల్లాల్లో అత్యున్నత సామర్థ్యంతో సురక్షితమైన మరియు నమ్మకమైన విద్యుత్‌ను అందించడానికి కట్టుబడి ఉంది.",
    aboutSectionTitle: "ఏపీట్రాన్స్కో గురించి",
    aboutPara1: "ఆంధ్రప్రదేశ్ ప్రసార కార్పొరేషన్ లిమిటెడ్ (APTRANSCO) రాష్ట్రంలో విద్యుత్ రంగ సంస్కరణల ఫలితంగా 1 ఫిబ్రవరి 1999న ఏర్పాటైంది. నాటి నుండి నేటి వరకు, ఇది దేశంలోనే అత్యుత్తమ విద్యుత్ ప్రసార సంస్థలలో ఒకటిగా అభివృద్ధి చెందింది.",
    aboutPara2: "సాంకేతిక ఆవిష్కరణలు, గ్రిడ్ క్రమశిక్షణ మరియు పునరుత్పాదక ఇంధన అనుసంధానానికి ఏపీట్రాన్స్కో కట్టుబడి ఉంది. ఆర్టిఫిషియల్ ఇంటెలిజెన్స్, రియల్-టైమ్ టెలిమెట్రీని ఉపయోగించుకుని స్మార్ట్ గ్రిడ్ వైపు అడుగులు వేస్తున్నాము.",
    visionTitle: "మా సంస్థాగత విజన్",
    visionDesc: "సుస్థిర పురోగతి కొరకు గ్రిడ్ స్థిరత్వం, గరిష్ట ప్రసార లభ్యతను నిర్ధారించడం మరియు హరిత ఇంధన కారిడార్లను అనుసంధానించే ప్రపంచ స్థాయి ప్రసార సంస్థగా ఎదగడం.",
    missionTitle: "మా సంస్థాగత మిషన్",
    missionDesc: "అత్యల్ప ప్రసార నష్టాలతో సరసమైన ధరకే నాణ్యమైన విద్యుత్‌ను ప్రసారం చేయడం; అత్యాధునిక ఆటోమేషన్ మరియు స్కడా (SCADA) సాంకేతికతను అమలు చేయడం.",
    statNetwork: "EHV ప్రసార నెట్‌వర్క్",
    statNetworkDesc: "జనరేటర్లను లోడ్ సెంటర్లకు అనుసంధానించే 400kV, 220kV, మరియు 132kV అల్ట్రా-హై-వోల్టేజ్ లైన్ల విస్తృత నెట్‌వర్క్.",
    statSubstations: "స్వయంచాలక సబ్‌స్టేషన్లు",
    statSubstationsDesc: "భూమి అవసరాన్ని తగ్గించి అత్యుత్తమ వోల్టేజ్ నియంత్రణను అందించే ఆధునిక స్వయంచాలక మరియు గ్యాస్ ఇన్సులేటెడ్ సబ్‌స్టేషన్లు.",
    statAvailability: "వ్యవస్థ లభ్యత",
    statAvailabilityDesc: "గ్రిడ్ ఫ్రీక్వెన్సీ నిర్వహణతో జాతీయ సగటు కంటే ఎక్కువ లభ్యతను నిరంతరం కొనసాగించడం.",
    statRenewables: "పునరుత్పాదక అనుసంధానం",
    statRenewablesDesc: "ప్రాంతీయ మెగా విద్యుత్ పార్కుల నుండి పర్యావరణ అనుకూల పవన మరియు సౌర విద్యుత్‌ను నేరుగా గ్రిడ్‌కు అనుసంధానించడం.",
    ecoTitle: "ఏపీట్రాన్స్కో ఒక చూపులో",
    ecoSubtitle: "ఇంటరాక్టివ్ విద్యుత్ గ్రిడ్ పర్యావరణ వ్యవస్థ",
    ecoStep1Title: "ఉత్పత్తి ఫీడ్",
    ecoStep1Desc: "ఏపీజెన్‌కో, ఎన్‌టీపీసీ మరియు ప్రైవేట్ విద్యుత్ ఉత్పత్తిదారుల నుండి విద్యుత్‌ను స్వీకరిస్తుంది.",
    ecoStep2Title: "పూలింగ్ స్టేషన్లు",
    ecoStep2Desc: "సమర్థవంతమైన ప్రసారం కోసం వోల్టేజ్‌ను 400kVకి పెంచుతుంది.",
    ecoStep3Title: "కోర్ ప్రసారం",
    ecoStep3Desc: "28,450 సర్క్యూట్ కిలోమీటర్ల EHT లైన్ల ద్వారా విద్యుత్‌ను ప్రసారం చేస్తుంది.",
    ecoStep4Title: "పంపిణీ గ్రిడ్",
    ecoStep4Desc: "462 స్వయంచాలక సబ్‌స్టేషన్ల ద్వారా జిల్లా లోడ్ సెంటర్లను ఫీడ్ చేస్తుంది.",
    ecoStep5Title: "చివరి వినియోగదారులు",
    ecoStep5Desc: "పరిశ్రమలు, వ్యవసాయం మరియు గృహాలకు నమ్మకమైన విద్యుత్‌ను అందిస్తుంది.",
    achSubtitle: "మా కార్యాచరణ నాయకత్వాన్ని ప్రతిబింబించే కీలక పనితీరు సూచికలు.",
    ach1Title: "గ్రిడ్ పరిధి",
    ach1Item1: "28,450 కిలోమీటర్ల కంటే ఎక్కువ హై-టెన్షన్ లైన్లు",
    ach1Item2: "డబుల్ సర్క్యూట్ లైన్ కాన్గ్రిగ్రేషన్లు",
    ach1Item3: "అనుకూలీకరించిన మార్గాలు",
    ach2Title: "ట్రాన్స్‌ఫార్మర్ సామర్థ్యం",
    ach2Item1: "462 EHT స్వయంచాలక సబ్‌స్టేషన్లు",
    ach2Item2: "GIS సాంకేతికతకు మారుతున్నాము",
    ach2Item3: "అదనపు పవర్ పైలాన్ మౌలిక సదుపాయాలు",
    ach3Title: "గ్రిడ్ పనితీరు",
    ach3Item1: "జాతీయ लक्ष्यాన్ని అధిగమించింది (99.50%)",
    ach3Item2: "భారతదేశంలోనే అతి తక్కువ ప్రసార నష్టాలు",
    ach3Item3: "స్వయంచాలక పునరుద్ధరణ సామర్థ్యాలు",
    ach4Title: "గ్రీన్ గ్రిడ్ కారిడార్లు",
    ach4Item1: "8,500 మెగావాట్ల కంటే ఎక్కువ హరిత ఇంధన ప్రసారం",
    ach4Item2: "ప్రత్యేక పవన మరియు సౌర పూలింగ్ సబ్‌స్టేషన్లు",
    ach4Item3: "పీక్ అవర్స్ కోసం డైనమిక్ లైన్ రేటింగ్",
    timeTitle: "ఏపీట్రాన్స్కో మైలురాళ్ళు",
    timeSubtitle: "నిర్మాణాత్మక విభజన నుండి స్మార్ట్, డిజిటలైజ్డ్ గ్రిడ్ వైపు మా ప్రయాణం.",
    time1Title: "విద్యుత్ రంగ సంస్కరణలు",
    time1Desc: "వృత్తిపరమైన కార్పొరేట్ యాజమాన్యాన్ని నెలకొల్పడానికి ఏపీఎస్‌ఈబీని ఏపీజెన్‌కో, ఏపీట్రాన్స్కో మరియు డిస్కమ్‌లుగా విభజించడం.",
    time2Title: "కార్యాచరణ స్వేచ్ఛ",
    time2Desc: "గ్రిడ్ షెడ్యూలింగ్ కోసం స్వతంత్ర అపెక్స్ సంస్థగా స్టేట్ లోడ్ డిస్పాచ్ సెంటర్ (SLDC) ఏర్పాటు.",
    time3Title: "ద్విభజన మరియు విస్తరణ",
    time3Desc: "ఏపీట్రాన్స్కో గ్రిడ్ సరిహద్దుల పునర్వ్యవస్థీకరణ, జిల్లాల్లో భారీ కొత్త హై-వోల్టేజ్ లైన్ల నిర్మాణం.",
    time4Title: "గ్రీన్ ఎనర్జీ కారిడార్",
    time4Desc: "దక్షిణ జిల్లాల నుండి సౌర మరియు పవన విద్యుత్‌ను గ్రిడ్‌కు అనుసంధానించే ప్రత్యేక హై-వోల్టేజ్ కారిడార్ల ప్రారంభం.",
    time5Title: "గ్రిడ్ ఆటోమేషన్ & GIS",
    time5Desc: "సబ్‌స్టేషన్ల పర్యవేక్షణ ఆటోమేషన్ మరియు గ్యాస్ ఇన్సులేటెడ్ సబ్‌స్టేషన్ల (GIS) విస్తరణ.",
    time6Title: "స్మార్ట్ గ్రిడ్ & AI-REMC",
    time6Desc: "ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ గ్రిడ్ అంచనా, రియల్-టైమ్ పిఎంయు (PMU)లు మరియు సైబర్ భద్రతా వ్యవస్థలతో ఆధునీకరణ.",
    execSubtitle: "శ్రీ కె. విజయానంద్, IAS",
    execDesignation: "ఛైర్మన్ & మేనేజింగ్ డైరెక్టర్",
    execCadre: "ఆంధ్రప్రదేశ్ కేడర్",
    execTitle: "ఛైర్మన్ సందేశం",
    execQuote: "సాంకేతిక నైపుణ్యం, కార్యకలాపాల సమగ్రత మరియు హరిత ఇంధన కారిడార్ల ద్వారా అంతరాయం లేని, నాణ్యమైన విద్యుత్‌ను అందించడానికి ఏపీట్రాన్స్కో కట్టుబడి ఉంది.",
    execText: "వేగవంతమైన పారిశ్రామికీకరణ మరియు హరిత ఇంధన కాలంలో ఏపీట్రాన్స్కో పాత్ర చాలా కీలకం. మా గ్రిడ్‌ను మరింత పటిష్టంగా మార్చడానికి స్వయంచాలక స్కడా (SCADA) వ్యవస్థలు, రియల్-టైమ్ జీఐఎస్ మ్యాపింగ్ మరియు ఏఐ ఆధారిత అంచనా సాంకేతికతలను విజయవంతంగా అమలు చేశాము.",
    execText2: "రక్షణ, నమ్మకం మరియు ప్రజా సేవ పట్ల మా నిబద్ధత అచంచలమైనది. గ్రీన్ ఎనర్జీ కారిడార్ వంటి కార్యక్రమాల ద్వారా ఆంధ్రప్రదేశ్ హరిత పారిశ్రామిక విప్లవంలో ముందంజలో ఉండేలా చూస్తున్నాము.",
    execSignatureLabel: "ఛైర్మన్ & మేనేజింగ్ డైరెక్టర్, ఏపీట్రాన్స్కో",
    boardTitle: "డైరెక్టర్ల బోర్డు",
    boardSubtitle: "గ్రిడ్ శ్రేష్ఠతకు మార్గదర్శకత్వం వహిస్తున్న విశిష్ట నాయకత్వం.",
    isoTitle: "గ్లోబల్ సర్టిఫికేషన్లు & ప్రమాణాలు",
    isoSubtitle: "ఏపీట్రాన్స్కో అంతర్జాతీయ నాణ్యత, భద్రత మరియు సైబర్ సెక్యూరిటీ ప్రమాణాలను ఖచ్చితంగా పాటిస్తుంది.",
    iso1: "ISO 9001:2015",
    iso1Desc: "నాణ్యత నిర్వహణ",
    iso2: "ISO 14001:2015",
    iso2Desc: "పర్యావరణ ఆడిట్",
    iso3: "ISO 45001:2018",
    iso3Desc: "వృత్తిపరమైన ఆరోగ్యం",
    iso4: "ISO 27001:2013",
    iso4Desc: "సమాచార భద్రత",
    iso5: "ISO 50001:2018",
    iso5Desc: "ఇంధన నిర్వహణ",
    valuesTitle: "కోర్ సంస్థాగత విలువలు",
    valuesSubtitle: "మా రోజువారీ కార్యకలాపాలు మరియు నిర్ణయాలకు మార్గనిర్దేశం చేసే సూత్రాలు.",
    valReliability: "విశ్వసనీయత",
    valReliabilityDesc: "అత్యాధునిక గ్రిడ్ ఆపరేషన్లతో 24/7 అంతరాయం లేని విద్యుత్ ప్రసారాన్ని నిర్ధారించడం.",
    valSafety: "రక్షణ",
    valSafetyDesc: "అన్ని ఈహెచ్‌టీ (EHT) లైన్లలో సిబ్బంది మరియు ప్రజల కోసం అత్యున్నత రక్షణ ప్రమాణాలను పాటించడం.",
    valSustainability: "సుస్థిరత",
    valSustainabilityDesc: "హరిత ఇంధన కారిడార్ల ద్వారా స్వచ్ఛమైన ఇంధన పరివర్తనకు కట్టుబడి ఉండటం.",
    valInnovation: "ఆవిష్కరణ",
    valInnovationDesc: "ఏఐ ఫోర్‌కాస్టింగ్, ఆటోమేటెడ్ స్కడా మరియు సైబర్ రక్షణ వ్యవస్థల విస్తరణ.",
    valTransparency: "పారదర్శకత",
    valTransparencyDesc: "పూర్తి సమగ్రత, నిబంధనల అమలు మరియు పారదర్శక సమాచార మార్పిడి.",
    valPublicService: "ప్రజా సేవ",
    valPublicServiceDesc: "రాష్ట్ర పురోగతి, వ్యవసాయ వృద్ధి మరియు సామాజిక సంక్షేమం కోసం అంకితమవ్వడం.",
    achTitle: "కీలక మౌలిక సదుపాయాల విజయాలు"
  }
};

export const AboutPage: React.FC<PageProps> = ({ language, isHighContrast, fontScale }) => {
  const [activeTimeline, setActiveTimeline] = useState<number | null>(null);
  const [activeEcoStage, setActiveEcoStage] = useState<number>(2); // Default to Core Grid Highways stage

  const t = aboutTranslations[language];

  // Specific SCADA simulated telemetry values for the ecosystem infographic to add extreme realism
  const ecoTelemetry = [
    {
      step: 1,
      station: "Kurnool Solar Park Pooling Switchyard",
      voltage: "400 kV",
      frequency: "50.01 Hz",
      load: "2,450 MW",
      status: "STABLE / ACTIVE"
    },
    {
      step: 2,
      station: "Vemagiri PG Extra High Voltage Station",
      voltage: "400 kV",
      frequency: "49.98 Hz",
      load: "4,800 MW",
      status: "OPTIMAL OPERATING ZONE"
    },
    {
      step: 3,
      station: "State Load Despatch Centre (SLDC) Backbone",
      voltage: "220 / 132 kV",
      frequency: "50.00 Hz",
      load: "12,450 MW Total Load",
      status: "SECURE / FREQUENCY STABILIZED"
    },
    {
      step: 4,
      station: "Vizag Industrial GIS Substation Node",
      voltage: "220 / 33 kV",
      frequency: "50.02 Hz",
      load: "180 MVA",
      status: "AUTOMATED FEED ACTIVE"
    },
    {
      step: 5,
      station: "AP DISCOM Primary Interconnection",
      voltage: "33 / 11 kV",
      frequency: "50.01 Hz",
      load: "15.4 Million Points",
      status: "LOAD SUPPLY ASSURED"
    }
  ];

  const activeTelemetryData = ecoTelemetry.find(item => item.step === activeEcoStage) || ecoTelemetry[1];

  return (
    <div className="animate-fade-in w-full selection:bg-[#1d70b8]/30">
      {/* Premium Immersive Power Grid Banner Hero */}
      <div className={`relative w-full py-24 md:py-32 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-45 scale-100 transition-transform duration-700"
              style={{ 
                backgroundImage: "url('grids.png')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/40 z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(29,112,184,0.2),transparent_50%)] z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1440px] mx-auto px-6 md:px-12 space-y-6">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-3.5 py-1.5 rounded border inline-block ${
            isHighContrast 
              ? "bg-stone-900 text-white border-white" 
              : "bg-[#1d70b8]/15 text-sky-400 border-[#1d70b8]/40 shadow-xs"
          }`}>
            {t.heroTag}
          </span>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-2xl text-amber-400 font-semibold tracking-wide">
              {t.heroSubtitle}
            </p>
          </div>
          <p className="text-sm md:text-base text-slate-350 leading-relaxed font-sans max-w-3xl" style={{ fontSize: `${15 * fontScale}px` }}>
            {t.heroDesc}
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 space-y-24">
        
        {/* Core Profile Section */}
        <section id="corporate-profile" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Block: Corporate narrative */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-[#1d70b8] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-display" style={{ fontSize: `${24 * fontScale}px` }}>
                  {t.aboutSectionTitle}
                </h2>
              </div>
              <div className="space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed font-sans" style={{ fontSize: `${15 * fontScale}px` }}>
                <p className="font-semibold text-lg text-slate-800 dark:text-slate-200 leading-relaxed border-l-4 border-[#1d70b8]/60 pl-4 py-1">
                  {t.aboutPara1}
                </p>
                <p className="text-slate-650 dark:text-slate-400 leading-relaxed">
                  {t.aboutPara2}
                </p>
              </div>
            </div>

            {/* Official Registration Metadata Badges - Government Portal Touch */}
            <div className={`mt-6 p-5 rounded-2xl border grid grid-cols-2 sm:grid-cols-4 gap-4 ${
              isHighContrast 
                ? "bg-black border-white text-white" 
                : "bg-slate-50 border-slate-200/60 shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
            }`}>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Established</span>
                <span className="text-sm font-black text-slate-800 dark:text-white font-mono">01 Feb 1999</span>
              </div>
              <div className="space-y-1 border-l border-slate-200/80 dark:border-stone-800 pl-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Utility Class</span>
                <span className="text-sm font-black text-[#1d70b8] dark:text-sky-400 font-mono">State STU</span>
              </div>
              <div className="space-y-1 border-l border-slate-200/80 dark:border-stone-800 pl-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">HQ Location</span>
                <span className="text-sm font-black text-slate-800 dark:text-white">Vijayawada</span>
              </div>
              <div className="space-y-1 border-l border-slate-200/80 dark:border-stone-800 pl-4">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Jurisdiction</span>
                <span className="text-sm font-black text-slate-800 dark:text-white">26 Districts</span>
              </div>
            </div>
          </div>

          {/* Right Block: Government-Style Mission & Vision Plaques */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Vision Plaque */}
            <div className={`p-6 rounded-2xl border-2 flex-1 transition-all duration-300 hover:shadow-lg ${
              isHighContrast 
                ? "bg-black border-white text-white" 
                : "bg-gradient-to-br from-white to-slate-50/50 border-slate-200/90 hover:border-[#1d70b8] shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
            }`}>
              <div className="flex items-start gap-4 h-full">
                <div className={`p-3.5 rounded-xl shrink-0 ${isHighContrast ? "bg-stone-900 border border-white" : "bg-blue-50 text-[#1d70b8] border border-blue-100"}`}>
                  <Eye size={22} className="animate-pulse" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#1d70b8] dark:text-sky-400" style={{ fontSize: `${12 * fontScale}px` }}>
                      {t.visionTitle}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-350 dark:text-slate-600 uppercase font-black">STU / AP</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-serif italic pt-1 border-t border-slate-100 dark:border-stone-800" style={{ fontSize: `${13.5 * fontScale}px` }}>
                    "{t.visionDesc}"
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Plaque */}
            <div className={`p-6 rounded-2xl border-2 flex-1 transition-all duration-300 hover:shadow-lg ${
              isHighContrast 
                ? "bg-black border-white text-white" 
                : "bg-gradient-to-br from-white to-slate-50/50 border-slate-200/90 hover:border-emerald-500 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
            }`}>
              <div className="flex items-start gap-4 h-full">
                <div className={`p-3.5 rounded-xl shrink-0 ${isHighContrast ? "bg-stone-900 border border-white" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>
                  <Compass size={22} />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400" style={{ fontSize: `${12 * fontScale}px` }}>
                      {t.missionTitle}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-350 dark:text-slate-600 uppercase font-black">AUTOMATION</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-serif italic pt-1 border-t border-slate-100 dark:border-stone-800" style={{ fontSize: `${13.5 * fontScale}px` }}>
                    "{t.missionDesc}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic & Animated Counters Section with Technical Progress Gauges */}
        <section id="statistics-counters" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Card 1: EHV Network */}
          <div className={`p-6 rounded-2xl border-2 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-white border-slate-200/85 hover:border-blue-500 shadow-[0_8px_35px_rgba(0,0,0,0.025)]"
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t.statNetwork}</span>
                <Zap size={16} className="text-[#1d70b8]" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <AnimatedCounter target={28450} suffix="" isHighContrast={isHighContrast} />
                <span className="text-slate-500 font-bold font-mono text-xs"> ckm</span>
              </div>
              {/* Technical Gauge Bar */}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-[85%] transition-all duration-1000"></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-450 font-bold">
                  <span>99.9% Reliability</span>
                  <span>Grid Span Max</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-550 dark:text-slate-400 mt-5 border-t border-slate-100 dark:border-stone-800 pt-3 leading-relaxed">
              {t.statNetworkDesc}
            </p>
          </div>

          {/* Card 2: Substations */}
          <div className={`p-6 rounded-2xl border-2 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-white border-slate-200/85 hover:border-slate-500 shadow-[0_8px_35px_rgba(0,0,0,0.025)]"
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t.statSubstations}</span>
                <Server size={16} className="text-slate-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <AnimatedCounter target={462} suffix="" isHighContrast={isHighContrast} />
                <span className="text-slate-500 font-bold font-mono text-xs"> {language === "EN" ? "Stations" : "సబ్‌స్టేషన్లు"}</span>
              </div>
              {/* Technical Gauge Bar */}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500 rounded-full w-[90%] transition-all duration-1000"></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-450 font-bold">
                  <span>Fully Automated</span>
                  <span>EHV Standard</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-550 dark:text-slate-400 mt-5 border-t border-slate-100 dark:border-stone-800 pt-3 leading-relaxed">
              {t.statSubstationsDesc}
            </p>
          </div>

          {/* Card 3: Availability */}
          <div className={`p-6 rounded-2xl border-2 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-white border-slate-200/85 hover:border-emerald-500 shadow-[0_8px_35px_rgba(0,0,0,0.025)]"
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t.statAvailability}</span>
                <Activity size={16} className="text-emerald-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <AnimatedFloatCounter target={99.9} suffix="%" isHighContrast={isHighContrast} />
              </div>
              {/* Technical Gauge Bar */}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[99.92%] transition-all duration-1000"></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-450 font-bold">
                  <span>Target Met: 99.92%</span>
                  <span>Nat'l Target: 98.5%</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-550 dark:text-slate-400 mt-5 border-t border-slate-100 dark:border-stone-800 pt-3 leading-relaxed">
              {t.statAvailabilityDesc}
            </p>
          </div>

          {/* Card 4: Renewables */}
          <div className={`p-6 rounded-2xl border-2 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 ${
            isHighContrast ? "bg-black text-white border-white" : "bg-white border-slate-200/85 hover:border-amber-500 shadow-[0_8px_35px_rgba(0,0,0,0.025)]"
          }`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">{t.statRenewables}</span>
                <Globe size={16} className="text-amber-500" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <AnimatedCounter target={8500} suffix="+" isHighContrast={isHighContrast} />
                <span className="text-slate-500 font-bold font-mono text-xs"> MW</span>
              </div>
              {/* Technical Gauge Bar */}
              <div className="space-y-1 pt-1">
                <div className="h-1.5 w-full bg-slate-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[78%] transition-all duration-1000"></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-450 font-bold">
                  <span>Green Corridors</span>
                  <span>Wind & Solar Peak</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-550 dark:text-slate-400 mt-5 border-t border-slate-100 dark:border-stone-800 pt-3 leading-relaxed">
              {t.statRenewablesDesc}
            </p>
          </div>
        </section>

        {/* APTRANSCO at a Glance - Interactive Ecosystem Infographic */}
        <section id="ecosystem-infographic" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-display" style={{ fontSize: `${24 * fontScale}px` }}>
              {t.ecoTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {t.ecoSubtitle}
            </p>
          </div>

          <div className={`p-8 rounded-2xl border-2 ${
            isHighContrast ? "bg-black border-white" : "bg-slate-50/70 border-slate-200/80"
          }`}>
            {/* Steps Flow Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative">
              {/* Connector Lines behind */}
              <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-stone-800 z-0"></div>
              
              {[
                { step: 1, title: t.ecoStep1Title, desc: t.ecoStep1Desc, icon: Zap, border: "hover:border-amber-500" },
                { step: 2, title: t.ecoStep2Title, desc: t.ecoStep2Desc, icon: Server, border: "hover:border-blue-500" },
                { step: 3, title: t.ecoStep3Title, desc: t.ecoStep3Desc, icon: Activity, border: "hover:border-sky-500" },
                { step: 4, title: t.ecoStep4Title, desc: t.ecoStep4Desc, icon: Building2, border: "hover:border-emerald-500" },
                { step: 5, title: t.ecoStep5Title, desc: t.ecoStep5Desc, icon: Users, border: "hover:border-indigo-500" },
              ].map((item) => {
                const IconComp = item.icon;
                const isSelected = activeEcoStage === item.step;
                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveEcoStage(item.step)}
                    className={`relative z-10 p-5 rounded-xl border-2 text-left transition-all duration-350 focus:outline-hidden cursor-pointer ${
                      isSelected
                        ? isHighContrast
                          ? "bg-stone-900 border-white text-white shadow-md ring-2 ring-white"
                          : "bg-white border-[#1d70b8] text-slate-900 shadow-[0_10px_30px_rgba(29,112,184,0.08)] ring-4 ring-[#1d70b8]/15 scale-[1.03]"
                        : isHighContrast
                          ? "bg-black border-stone-800 text-stone-350"
                          : `bg-white/90 border-slate-200/90 hover:bg-white text-slate-750 hover:shadow-md ${item.border}`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-lg border ${
                        isSelected
                          ? isHighContrast
                            ? "bg-stone-800 border-white text-white"
                            : "bg-blue-50 text-[#1d70b8] border-[#1d70b8]/30"
                          : isHighContrast
                            ? "bg-stone-950 border-stone-800"
                            : "bg-slate-50 border-slate-100 text-slate-500"
                      }`}>
                        <IconComp size={18} className={isSelected ? "animate-pulse" : ""} />
                      </div>
                      <span className="font-mono text-[9px] font-extrabold text-slate-400">STEP 0{item.step}</span>
                    </div>
                    <h4 className="text-xs font-black mt-4 text-slate-900 dark:text-white font-sans uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detail Board - Upgraded to a Dual Layout with SCADA Simulation */}
            <div className={`mt-8 p-6 rounded-xl border-2 transition-all duration-300 ${
              isHighContrast 
                ? "bg-stone-950 border-white text-white" 
                : "bg-white border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Standard descriptions */}
                <div className="lg:col-span-7 space-y-4">
                  {[
                    {
                      step: 1,
                      detailTitle: language === "EN" ? "Bulk Energy Generation Feed" : "బల్క్ ఇంధన ఉత్పత్తి ఫీడ్",
                      bullets: language === "EN" ? [
                        "Evacuates power directly from central pooling switchyards of APGENCO, NTPC, and private IPPs.",
                        "Integrates bulk clean energy from Asia's largest solar parks in Kurnool & Anantapur districts.",
                        "Provides real-time telemetry from generation nodes to calculate dynamic spinning reserves."
                      ] : [
                        "ఏపీజెన్‌కో, ఎన్‌టీపీసీ మరియు ప్రైవేట్ విద్యుత్ ఉత్పత్తి కేంద్రాల నుండి నేరుగా విద్యుత్‌ను స్వీకరిస్తుంది.",
                        "కర్నూలు, అనంతపురం జిల్లాల్లో ఉన్న ఆసియాలోనే అతిపెద్ద సౌర ఇంధన పార్కుల నుండి విద్యుత్‌ను సేకరిస్తుంది.",
                        "రియల్ టైమ్ టెలిమెట్రీని అందించి గ్రిడ్ స్థిరత్వాన్ని విశ్లేషిస్తుంది."
                      ]
                    },
                    {
                      step: 2,
                      detailTitle: language === "EN" ? "400kV Extra High Voltage Pooling Infrastructure" : "400kV ఎక్స్‌ట్రా హై వోల్టేజ్ పూలింగ్ మౌలిక సదుపాయాలు",
                      bullets: language === "EN" ? [
                        "Steps up voltages to 400kV to transmit bulk power over thousands of kilometers with negligible losses.",
                        "Maintains massive pooling stations (e.g., Kurnool PG, Vemagiri PG) interfacing with the national corridor.",
                        "Utilizes Static Var Compensators (SVC) and reactors to maintain high power factor and grid voltage limits."
                      ] : [
                        "విద్యుత్ నష్టాలు లేకుండా సుదూర ప్రాంతాలకు సరఫరా చేయడానికి వోల్టేజ్‌ను 400kVకి పెంచుతుంది.",
                        "జాతీయ గ్రిడ్ కారిడార్లతో అనుసంధానించే కర్నూలు PG, వేమగిరి PG వంటి భారీ పూలింగ్ స్టేషన్లను నిర్వహిస్తుంది.",
                        "గ్రిడ్ వోల్టేజ్ స్థిరత్వాన్ని నిర్వహించడానికి స్టాటిక్ వార్ కంపెన్సేటర్లను (SVC) ఉపయోగిస్తుంది."
                      ]
                    },
                    {
                      step: 3,
                      detailTitle: language === "EN" ? "District Grid Highways (220kV & 132kV Core Backbone)" : "జిల్లా గ్రిడ్ రహదారులు (220kV & 132kV కోర్ బ్యాక్‌బోన్)",
                      bullets: language === "EN" ? [
                        "Spans over 28,450 circuit kilometers of robust double-circuit transmission lines.",
                        "Monitored 24/7 by the State Load Dispatch Centre (SLDC) utilizing advanced Energy Management Systems (EMS).",
                        "Redundant line configurations ensure that localized line faults trigger automated sub-second power rerouting."
                      ] : [
                        "28,450 సర్క్యూట్ కిలోమీటర్ల మేర విస్తరించిన బలమైన డబుల్-సర్క్యూట్ ప్రసార లైన్ల నెట్‌వర్క్.",
                        "స్టేట్ లోడ్ డిస్పాచ్ సెంటర్ (SLDC) అధునాతన ఎనర్జీ మేనేజ్‌మెంట్ సిస్టమ్స్ (EMS) ద్వారా 24/7 పర్యవేక్షణ.",
                        "లైన్ వైఫల్యాలు సంభవించినప్పుడు స్వయంచాలకంగా ప్రత్యామ్నాయ మార్గాల ద్వారా విద్యుత్ సరఫరా పునరుద్ధరించబడుతుంది."
                      ]
                    },
                    {
                      step: 4,
                      detailTitle: language === "EN" ? "Automated Distribution Step-Down Nodes" : "స్వయంచాలక పంపిణీ సబ్‌స్టేషన్ నోడ్స్",
                      bullets: language === "EN" ? [
                        "Steps down EHT voltages to 33kV and 11kV at 462 state-of-the-art automated substations.",
                        "Feeds primary substation trunks of state DISCOMs (APCPDCL, APEPDCL, APSPDCL).",
                        "Equipped with Gas Insulated Switchgears (GIS) in dense urban centers to optimize space and ensure safety."
                      ] : [
                        "462 అత్యాధునిక సబ్‌స్టేషన్ల ద్వారా వోల్టేజ్‌ను 33kV మరియు 11kV స్థాయిలకు తగ్గిస్తుంది.",
                        "రాష్ట్ర డిస్కామ్‌లైన ఏపీసీపీడీసీఎల్, ఏపీఈపీడీసీఎల్, ఏపీఎస్పీడీసీఎల్‌లకు ఫీడింగ్ అందిస్తుంది.",
                        "పట్టణ కేంద్రాలలో స్థలాన్ని ఆదా చేయడానికి మరియు భద్రత కోసం గ్యాస్ ఇన్సులేటెడ్ స్విచ్‌గేర్లను (GIS) ఉపయోగిస్తుంది."
                      ]
                    },
                    {
                      step: 5,
                      detailTitle: language === "EN" ? "Seamless Last-Mile Consumer Empowerment" : "చివరి వినియోగదారుల సాధికారత",
                      bullets: language === "EN" ? [
                        "Powers over 15 million households and commercial enterprises with zero voltage surges.",
                        "Guarantees 24/7 free agricultural supply via dedicated farm feeder networks to boost crop yields.",
                        "Enables heavy industries, high-speed rail networks, and ports to operate on high-reliability tariff lines."
                      ] : [
                        "15 మిలియన్ల కంటే ఎక్కువ గృహాలు మరియు పారిశ్రామిక కేంద్రాలకు నాణ్యమైన విద్యుత్ అందిస్తుంది.",
                        "వ్యవసాయ రంగానికి నిరంతర ఉచిత విద్యుత్ సరఫరా కోసం ప్రత్యేక ఫీడర్లను నిర్వహిస్తుంది.",
                        "భారీ పరిశ్రమలు, మెట్రో రైల్ నెట్‌వర్క్‌లు మరియు నౌకాశ్రయాలకు నిరంతర విద్యుత్‌ను సురక్షితంగా సరఫరా చేస్తుంది."
                      ]
                    }
                  ].filter(d => d.step === activeEcoStage).map((detail) => (
                    <div key={detail.step} className="space-y-4 animate-fade-in">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1d70b8] animate-ping"></span>
                        <h5 className="font-extrabold text-sm text-[#1d70b8] dark:text-sky-400 uppercase tracking-wider font-display">
                          {detail.detailTitle}
                        </h5>
                      </div>
                      <ul className="space-y-3.5 pt-2">
                        {detail.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-3 items-start text-xs md:text-sm text-slate-700 dark:text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1d70b8] block shrink-0 mt-2"></span>
                            <p className="leading-relaxed">{bullet}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Right Side: High-Fidelity Simulated SCADA Telemetry panel */}
                <div className="lg:col-span-5 h-full">
                  <div className={`p-5 rounded-xl border-2 font-mono text-[11px] space-y-4 ${
                    isHighContrast 
                      ? "bg-black border-white text-white" 
                      : "bg-slate-950 text-slate-300 border-slate-900 shadow-md"
                  }`}>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-white text-xs font-bold tracking-tight">SCADA NODE STU_AP_{activeEcoStage}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900/60">ONLINE</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Active Station:</span>
                        <span className="text-white font-semibold truncate max-w-[190px]">{activeTelemetryData.station}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Bus Voltage:</span>
                        <span className="text-amber-400 font-bold">{activeTelemetryData.voltage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Grid Frequency:</span>
                        <span className="text-sky-400 font-bold">{activeTelemetryData.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">Active Pooling:</span>
                        <span className="text-emerald-400 font-bold">{activeTelemetryData.load}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-sans">System Integrity:</span>
                        <span className="text-slate-300 uppercase font-extrabold">{activeTelemetryData.status}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-[10px] text-slate-450">
                      <span>Ref No: STU-DEC-2026</span>
                      <span className="animate-pulse">● SAMPLING AT 1-SEC</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Core Institutional Values Cards */}
        <section id="institutional-values" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-display" style={{ fontSize: `${24 * fontScale}px` }}>
              {t.valuesTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {t.valuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t.valReliability, desc: t.valReliabilityDesc, icon: Zap, border: "hover:border-blue-500" },
              { title: t.valSafety, desc: t.valSafetyDesc, icon: Shield, border: "hover:border-rose-500" },
              { title: t.valSustainability, desc: t.valSustainabilityDesc, icon: Globe, border: "hover:border-emerald-500" },
              { title: t.valInnovation, desc: t.valInnovationDesc, icon: Cpu, border: "hover:border-amber-500" },
              { title: t.valTransparency, desc: t.valTransparencyDesc, icon: Eye, border: "hover:border-sky-500" },
              { title: t.valPublicService, desc: t.valPublicServiceDesc, icon: Users, border: "hover:border-indigo-500" }
            ].map((val, index) => {
              const IconComp = val.icon;
              return (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between ${
                    isHighContrast 
                      ? "bg-black border-white text-white" 
                      : `bg-white border-slate-200/85 shadow-[0_4px_25px_rgba(0,0,0,0.01)] ${val.border}`
                  }`}
                >
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl w-fit ${isHighContrast ? "bg-stone-900 border border-white" : "bg-slate-50 text-[#1d70b8] border border-slate-100"}`}>
                      <IconComp size={20} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm md:text-base font-extrabold text-slate-900 dark:text-white" style={{ fontSize: `${14 * fontScale}px` }}>
                        {val.title}
                      </h4>
                      <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed" style={{ fontSize: `${12.5 * fontScale}px` }}>
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Infrastructure Achievements Section with Benchmarks */}
        <section id="key-achievements" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-display" style={{ fontSize: `${24 * fontScale}px` }}>
              {t.achTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {t.achSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.ach1Title, val: "28,450 ckm", sub: language === "EN" ? "Total EHT Lines Length" : "మొత్తం EHT లైన్ల పొడవు", items: [t.ach1Item1, t.ach1Item2, t.ach1Item3], icon: Zap, benchmark: "1st in South India" },
              { title: t.ach2Title, val: "462 Substations", sub: language === "EN" ? "High-Voltage Transformers" : "హై-వోల్టేజ్ సబ్‌స్టేషన్లు", items: [t.ach2Item1, t.ach2Item2, t.ach2Item3], icon: Server, benchmark: "90% GIS Conversion" },
              { title: t.ach3Title, val: "99.92% Availability", sub: language === "EN" ? "National Standard Exceeded" : "జాతీయ ప్రమాణం కంటే మెరుగైనది", items: [t.ach3Item1, t.ach3Item2, t.ach3Item3], icon: Activity, benchmark: "National Avg: 98.50%" },
              { title: t.ach4Title, val: "8,500+ MW Renewables", sub: language === "EN" ? "Green Energy Integration" : "హరిత ఇంధన అనుసంధానం", items: [t.ach4Item1, t.ach4Item2, t.ach4Item3], icon: Globe, benchmark: "Highest Solar Evacuation" }
            ].map((ach, index) => {
              const IconComp = ach.icon;
              return (
                <div 
                  key={index} 
                  className={`p-6 rounded-2xl border-2 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                    isHighContrast 
                      ? "bg-black text-white border-white" 
                      : "bg-white border-slate-200/85 shadow-[0_6px_30px_rgba(0,0,0,0.015)] hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-stone-800">
                      <h4 className="text-xs font-black text-[#1d70b8] dark:text-sky-300 uppercase tracking-wider">
                        {ach.title}
                      </h4>
                      <IconComp size={16} className="text-slate-400" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-baseline justify-between">
                        <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white font-sans">{ach.val}</span>
                        <span className="text-[9px] bg-[#1d70b8]/10 text-[#1d70b8] dark:bg-sky-950 dark:text-sky-300 font-bold px-2 py-0.5 rounded-md border border-[#1d70b8]/20">{ach.benchmark}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{ach.sub}</p>
                    </div>
                    <ul className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-stone-800">
                      {ach.items.map((it, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs text-slate-650 dark:text-slate-450 leading-snug">
                          <CheckSquare size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* APTRANSCO Timeline showing major milestones */}
        <section id="corporate-timeline" className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white font-display" style={{ fontSize: `${24 * fontScale}px` }}>
              {t.timeTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              {t.timeSubtitle}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            {/* Timeline center line */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-slate-200 dark:border-stone-800 z-0"></div>

            <div className="space-y-12">
              {[
                { year: "1999", title: t.time1Title, desc: t.time1Desc, focus: "Asset Unbundling" },
                { year: "2005", title: t.time2Title, desc: t.time2Desc, focus: "SLDC Apex Independence" },
                { year: "2014", title: t.time3Title, desc: t.time3Desc, focus: "Grid Bifurcation" },
                { year: "2018", title: t.time4Title, desc: t.time4Desc, focus: "Green Corridors" },
                { year: "2021", title: t.time5Title, desc: t.time5Desc, focus: "GIS Automation" },
                { year: "2026", title: t.time6Title, desc: t.time6Desc, focus: "AI Smart Grid REMC" },
              ].map((item, idx) => {
                const isEven = idx % 2 === 0;
                const isExpanded = activeTimeline === idx;
                return (
                  <div 
                    key={idx} 
                    className={`relative flex flex-col md:flex-row items-start z-10 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Year badge point */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-[11px] top-1 z-20">
                      <button 
                        onClick={() => setActiveTimeline(isExpanded ? null : idx)}
                        className={`w-[24px] h-[24px] rounded-full flex items-center justify-center border-4 font-bold text-[10px] cursor-pointer transition-all duration-300 ${
                          isExpanded 
                            ? isHighContrast 
                              ? "bg-white border-white text-black ring-4 ring-white/20 scale-110" 
                              : "bg-[#1d70b8] border-white text-white ring-4 ring-blue-500/20 scale-110"
                            : isHighContrast
                              ? "bg-black border-white text-white"
                              : "bg-white border-[#1d70b8] text-[#1d70b8] hover:scale-110"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                      </button>
                    </div>

                    {/* Timeline card */}
                    <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:text-right md:pr-8" : "md:pl-8"}`}>
                      <div 
                        onClick={() => setActiveTimeline(isExpanded ? null : idx)}
                        className={`p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-left ${
                          isExpanded
                            ? isHighContrast
                              ? "bg-stone-900 border-white text-white shadow-md"
                              : "bg-white border-[#1d70b8] shadow-[0_12px_40px_rgba(29,112,184,0.06)]"
                            : isHighContrast
                              ? "bg-black border-stone-800 text-stone-300"
                              : "bg-white/90 border-slate-200/90 hover:bg-white hover:border-slate-350 shadow-xs"
                        }`}
                      >
                        <div className="flex items-center gap-3 border-b pb-2.5 border-slate-100 dark:border-stone-800 mb-3">
                          <span className={`font-mono text-xs md:text-sm font-black px-2.5 py-0.5 rounded-lg ${
                            isHighContrast 
                              ? "bg-white text-black" 
                              : "bg-blue-50 text-[#1d70b8] dark:bg-stone-900 dark:text-sky-300"
                          }`}>
                            {item.year}
                          </span>
                          <div className="flex-1">
                            <h4 className="font-extrabold text-xs md:text-sm text-slate-900 dark:text-white uppercase tracking-wider font-sans">
                              {item.title}
                            </h4>
                            <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider block">{item.focus}</span>
                          </div>
                        </div>
                        <p className="text-xs md:text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-sans" style={{ fontSize: `${13 * fontScale}px` }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Chairman's Message section - Beautifully enhanced executive desk layout */}
        <section id="chairmans-message" className="relative">
          <div className="absolute inset-0 bg-[#1d70b8]/[0.01] rounded-3xl pointer-events-none"></div>
          
          <div className={`p-8 md:p-12 rounded-2xl border-2 relative overflow-hidden transition-all duration-300 ${
            isHighContrast 
              ? "bg-black text-white border-white" 
              : "bg-white border-slate-200/85 shadow-[0_15px_45px_rgba(0,0,0,0.02)]"
          }`}>
            
            {/* Official Blue ink office circular stamp seal - Government detail */}
            {!isHighContrast && (
              <div className="absolute right-6 top-6 opacity-15 md:opacity-25 pointer-events-none select-none z-0 rotate-[12deg]">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="text-blue-900">
                  <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" />
                  <path id="seal-text" d="M15,50 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" fill="none" />
                  <text className="font-mono text-[6.5px] font-black uppercase tracking-widest" fill="currentColor">
                    <textPath href="#seal-text">
                      * OFFICE OF CMD * APTRANSCO * VIJAYAWADA
                    </textPath>
                  </text>
                  <g transform="translate(35, 38)">
                    <text x="15" y="10" className="font-serif italic font-black text-[10px]" fill="currentColor" textAnchor="middle">Govt of AP</text>
                    <path d="M5,15 h20 M15,5 v20" stroke="currentColor" strokeWidth="1" />
                  </g>
                </svg>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left Column: Elegant Portrait Offset & Details */}
              <div className="lg:col-span-4 text-center space-y-4">
                <div className="relative inline-block">
                  <div className={`absolute inset-0 border-2 rounded-2xl transform translate-x-2.5 translate-y-2.5 pointer-events-none transition-all duration-350 ${
                    isHighContrast ? "border-white" : "border-[#1d70b8]/30"
                  }`}></div>
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=250&h=250" 
                    alt="Sri K. Vijayanand, IAS"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    className={`relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-4 shadow-lg mx-auto bg-slate-100 ${
                      isHighContrast ? "border-white" : "border-white"
                    }`}
                  />
                  <span className={`absolute bottom-3 right-3 md:right-5 z-20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md border ${
                    isHighContrast 
                      ? "bg-white text-black border-white" 
                      : "bg-[#1d70b8] text-white border-[#1d70b8]"
                  }`}>
                    CMD, IAS
                  </span>
                </div>
                <div className="space-y-1 pt-2">
                  <h4 className="text-base md:text-lg font-black text-slate-900 dark:text-white font-sans">{t.execSubtitle}</h4>
                  <p className="text-xs text-[#1d70b8] dark:text-sky-400 font-extrabold uppercase tracking-widest">{t.execDesignation}</p>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">{t.execCadre}</p>
                </div>
              </div>

              {/* Right Column: Statement, Quote & Signature */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center gap-3 border-b pb-4 border-slate-100 dark:border-stone-800">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-stone-900 dark:border dark:border-stone-800">
                    <Award size={20} className="animate-pulse" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-display">
                    {t.execTitle}
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Styled Quote */}
                  <div className={`p-5 border-l-4 rounded-r-2xl italic font-serif leading-relaxed ${
                    isHighContrast 
                      ? "border-white bg-stone-900 text-white" 
                      : "border-amber-400 bg-amber-50/30 text-slate-850 dark:text-slate-300"
                  }`} style={{ fontSize: `${15.5 * fontScale}px` }}>
                    "{t.execQuote}"
                  </div>

                  {/* Core Statement Paras */}
                  <div className="text-slate-650 dark:text-slate-350 leading-relaxed space-y-4 font-sans text-xs md:text-sm" style={{ fontSize: `${14 * fontScale}px` }}>
                    <p>{t.execText}</p>
                    <p>{t.execText2}</p>
                  </div>
                </div>

                {/* Highly Professional Signature Area */}
                <div className="flex flex-col items-end pt-5 border-t border-slate-100 dark:border-stone-800">
                  <div className="text-center space-y-1">
                    {/* Hand-drawn styled vector handwriting sign */}
                    <span className={`font-serif text-xl italic font-black tracking-widest select-none block pb-1.5 transform -rotate-1 ${
                      isHighContrast ? "text-white" : "text-blue-900/90"
                    }`}>
                      K. Vijayanand
                    </span>
                    <div className="w-32 h-0.5 bg-slate-300 dark:bg-stone-800 mx-auto"></div>
                    <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest pt-1.5">
                      {t.execSignatureLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Board of Directors / Leadership */}
        <section id="board" className="space-y-6">
          <div className="flex items-center gap-3 border-b pb-4 border-slate-100 dark:border-stone-800">
            <Users className="text-[#1d70b8]" size={22} />
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white font-display" style={{ fontSize: `${20 * fontScale}px` }}>
                {t.boardTitle}
              </h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 mt-0.5">{t.boardSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOARD_MEMBERS.slice(1).map((member) => (
              <div 
                key={member.id} 
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                  isHighContrast 
                    ? "bg-black text-white border-white" 
                    : "bg-white border-slate-200/85 shadow-xs hover:border-slate-300"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100 border-2 border-slate-100 shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-sans">{member.name}</h4>
                      <p className="text-[10px] text-[#1d70b8] dark:text-sky-400 font-black uppercase tracking-wider mt-0.5 leading-tight">{member.designation}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{member.cadre}</p>
                    </div>
                  </div>
                  <p className="text-[11.5px] text-slate-600 dark:text-slate-450 leading-relaxed font-serif italic pt-3 border-t border-slate-100 dark:border-stone-800/60">
                    "{member.profileSummary}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Corporate Hierarchy Organizational Blueprint Tree */}
        <section id="org-structure" className="relative bg-slate-950 text-white p-8 rounded-2xl border-2 border-slate-900 overflow-hidden">
          
          <div className="absolute right-[-40px] bottom-[-40px] text-white/[0.01] pointer-events-none">
            <svg width="240" height="240" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </div>

          <div className="relative z-10 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-amber-400">
              {language === "EN" ? "Corporate Hierarchy & Grid Commands" : "కార్పొరేట్ క్రమశిక్షణ & గ్రిడ్ కమాండ్లు"}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-sans" style={{ fontSize: `${13 * fontScale}px` }}>
              {language === "EN" 
                ? "APTRANSCO operates with a centralized board reporting to the Government of Andhra Pradesh (Energy Department), branching out into five operational zones overseen by Chief Engineers."
                : "ఏపీట్రాన్స్కో ఆంధ్రప్రదేశ్ ప్రభుత్వం (ఇంధన శాఖ) కు నివేదించే కేంద్రీకృత బోర్డుతో పనిచేస్తుంది. ఇది చీఫ్ ఇంజనీర్ల పర్యవేక్షణలో ఐదు కార్యాచరణ జోన్లుగా విభజించబడింది."}
            </p>
            
            <div className="font-mono text-[11px] text-slate-400 space-y-4 border-l-2 border-dashed border-slate-800 pl-6 pt-2">
              <div className="relative">
                <span className="absolute left-[-29px] top-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] block"></span>
                <div className="text-white font-bold">● Chairman & Managing Director (CMD, IAS)</div>
              </div>
              
              <div className="relative pl-4">
                <span className="absolute left-[-29px] top-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 block"></span>
                <div className="text-slate-200 font-semibold">├── Director (Finance & Revenue)</div>
                <div className="pl-6 text-slate-450 text-[10px] mt-0.5 leading-normal">
                  ↳ {language === "EN" ? "Core Accounts, Billing Strategy, Regulatory Filings, and Tariffs" : "కోర్ ఖాతాలు, బిల్లింగ్ విధానం, నిబంధనల సమ్మతి మరియు టారిఫ్ ఫైలింగ్"}
                </div>
              </div>

              <div className="relative pl-4">
                <span className="absolute left-[-29px] top-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400 block"></span>
                <div className="text-slate-200 font-semibold">├── Director (Grid, Transmission & Management)</div>
                <div className="pl-6 text-slate-450 text-[10px] mt-0.5 leading-normal">
                  ↳ {language === "EN" ? "Real-time Grid scheduling, SLDC operations, Maintenance & safety audits" : "రియల్ టైమ్ గ్రిడ్ షెడ్యూలింగ్, SLDC కార్యకలాపాలు, నిర్వహణ & భద్రతా ఆడిట్లు"}
                </div>
              </div>

              <div className="relative pl-4">
                <span className="absolute left-[-29px] top-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 block"></span>
                <div className="text-slate-200 font-semibold">└── Director (Projects & IT)</div>
                <div className="pl-6 text-slate-450 text-[10px] mt-0.5 leading-normal">
                  ↳ {language === "EN" ? "High-Voltage GIS Substations erection, OPGW Fiber network expansion, and CSOC operations" : "హై-వోల్టేజ్ GIS సబ్‌స్టేషన్ల నిర్మాణం, OPGW ఫైబర్ నెట్‌వర్క్ విస్తరణ మరియు CSOC ఆపరేషన్స్"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Certifications & Compliance Badges Grid */}
        <section id="certifications" className="space-y-8 pt-4 border-t border-slate-150/60 dark:border-stone-800">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-display">
              {t.isoTitle}
            </h3>
            <p className="text-xs text-slate-550 dark:text-slate-400">
              {t.isoSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-center">
            {[
              { label: t.iso1, desc: t.iso1Desc, certNo: "QMS-1999" },
              { label: t.iso2, desc: t.iso2Desc, certNo: "EMS-2005" },
              { label: t.iso3, desc: t.iso3Desc, certNo: "OHS-2018" },
              { label: t.iso4, desc: t.iso4Desc, certNo: "ISMS-2013" },
              { label: t.iso5, desc: t.iso5Desc, certNo: "EnMS-2018" },
            ].map((cert, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all duration-300 select-none min-w-[170px] ${
                  isHighContrast 
                    ? "bg-black text-white border-white" 
                    : "bg-slate-50 border-slate-200/85 hover:bg-white hover:border-blue-500 shadow-xs hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-50 text-amber-600 border border-amber-200 mb-2">
                  <ShieldCheck size={18} className="animate-pulse" />
                </div>
                <span className="font-mono text-xs font-black text-slate-900 dark:text-white leading-tight">
                  {cert.label}
                </span>
                <span className="text-[10px] text-[#1d70b8] dark:text-sky-400 font-extrabold uppercase tracking-wider mt-1">
                  {cert.desc}
                </span>
                <span className="text-[8px] font-mono text-slate-400 font-bold uppercase mt-1">Reg: {cert.certNo}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

/* 2. Operations & Capital Works */
export const OperationsPage: React.FC<PageProps> = ({ language, isHighContrast, fontScale }) => {
  const [activeProjectSlide, setActiveProjectSlide] = useState(0);
  const [supportEmail, setSupportEmail] = useState("");
  const [supportInquiry, setSupportInquiry] = useState("");
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const translations = {
    EN: {
      badgeExcellence: "INFRASTRUCTURE EXCELLENCE",
      heroTitle: "The Backbone of Andhra Pradesh's Power Grid",
      heroText: "Providing a robust, reliable, and efficient transmission infrastructure to empower the state's growth through technical precision and state-of-the-art grid management.",
      exploreNetwork: "Explore Network",
      annualReport: "Download Annual Report 2024",
      networkStats: "Network Statistics",
      statsSubtitle: "Real-time infrastructure capacity and distribution metrics.",
      viewLiveDashboard: "View Live Dashboard",
      transCapacity: "Transmission Capacity",
      transCapacityDesc: "Comprehensive power handling across the state-wide EHT network ensuring zero-interruption service delivery.",
      circuitKms: "CIRCUIT KMS (TOTAL)",
      substations: "SUB-STATIONS",
      opStations: "Operational Stations",
      stations: "STATIONS",
      gridTopology: "State Transmission Grid Topology",
      topologyText: "Interact with our dynamic map to view live load distribution, station status, and line health across all districts of Andhra Pradesh.",
      northCoastal: "North Coastal Grid: Normal",
      rayalaseema: "Rayalaseema Grid: Normal",
      centralGrid: "Central Grid: Under Maintenance",
      gisTitle: "Interactive Geographic Information System",
      gisText: "Access detailed geospatial data of substations and line routes via our secure GIS portal.",
      launchGis: "Launch GIS Portal",
      infraProjects: "Key Infrastructure Projects",
      vizagSubstation: "Vizag Industrial Corridor Substation",
      vizagDesc: "Construction of a 400kV GIS to support the increasing industrial load in the Vishakhapatnam region.",
      progressLabel: "Progress: 75%",
      phaseLabel: "Phase: Installation",
      amaravatiGrid: "Amaravati Green Grid Initiative",
      amaravatiDesc: "Expansion of the 220kV network to integrate renewable energy sources from Rayalaseema solar parks.",
      caseStudy: "Case Study",
      smartGrid: "Smart Grid Pilot Project",
      smartGridDesc: "Implementation of advanced sensors and automated monitoring across the 132kV network for self-healing grid capabilities.",
      tenderDocs: "Project Tender Docs",
      techPublications: "Technical Publications & Standards",
      standardsDesc: "Access the latest technical specifications, grid codes, and research papers published by APTRANSCO's engineering and operations divisions.",
      gridCode: "State Grid Code 2024 (Revised)",
      opsReport: "Annual Operational Performance Report",
      safetyStandards: "EHT Transmission Line Safety Standards",
      needSupport: "Need Technical Support?",
      supportText: "For specific data requests, engineering inquiries, or technical consultations regarding grid interconnection.",
      emailPlaceholder: "Professional Email",
      inquiryPlaceholder: "Describe your inquiry",
      submitRequest: "Submit Request",
      requestSent: "Thank you! Support inquiry successfully submitted."
    },
    TE: {
      badgeExcellence: "మౌలిక సదుపాయాల శ్రేష్ఠత",
      heroTitle: "ఆంధ్రప్రదేశ్ పవర్ గ్రిడ్ యొక్క వెన్నెముక",
      heroText: "సాంకేతిక ఖచ్చితత్వం మరియు అత్యాధునిక గ్రిడ్ నిర్వహణ ద్వారా రాష్ట్ర వృద్ధిని బలోపేతం చేయడానికి బలమైన, నమ్మకమైన మరియు సమర్థవంతమైన ప్రసార మౌలిక సదుపాయాలను అందించడం.",
      exploreNetwork: "నెట్‌వర్క్ అన్వేషించండి",
      annualReport: "వార్షిక నివేదిక డౌన్‌లోడ్ 2024",
      networkStats: "నెట్‌వర్క్ గణాంకాలు",
      statsSubtitle: "నిజ-సమయ మౌలిక సదుపాయాల సామర్థ్యం మరియు పంపిణీ కొలమానాలు.",
      viewLiveDashboard: "ప్రత్యక్ష డ్యాష్‌బోర్డ్ చూడండి",
      transCapacity: "ప్రసార సామర్థ్యం",
      transCapacityDesc: "రాష్ట్రవ్యాప్త EHT నెట్‌వర్క్‌లో సమగ్ర విద్యుత్ నిర్వహణ అంతరాయం లేని సేవలను అందిస్తుంది.",
      circuitKms: "సర్క్యూట్ కి.మీ (మొత్తం)",
      substations: "సబ్ స్టేషన్లు",
      opStations: "కార్యాచరణ కేంద్రాలు",
      stations: "కేంద్రాలు",
      gridTopology: "రాష్ట్ర ప్రసార గ్రిడ్ టోపోలాజీ",
      topologyText: "ఆంధ్రప్రదేశ్ లోని అన్ని జిల్లాలలో ప్రత్యక్ష లోడ్ పంపిణీ, స్టేషన్ స్థితి మరియు లైన్ ఆరోగ్యాన్ని వీక్షించడానికి మా డైనమిక్ మ్యాప్‌తో పరస్పర చర్య చేయండి.",
      northCoastal: "ఉత్తర కోస్తా గ్రిడ్: సాధారణం",
      rayalaseema: "రాయలసీమ గ్రిడ్: సాధారణం",
      centralGrid: "సెంట్రల్ గ్రిడ్: నిర్వహణలో ఉంది",
      gisTitle: "ఇంటరాక్టివ్ జియోగ్రాఫిక్ ఇన్ఫర్మేషన్ సిస్టమ్",
      gisText: "మా సురక్షిత GIS పోర్టల్ ద్వారా సబ్‌స్టేషన్లు మరియు లైన్ మార్గాల వివరణాత్మక భౌగోళిక డేటాను యాక్సెస్ చేయండి.",
      launchGis: "GIS పోర్టల్ ప్రారంభించండి",
      infraProjects: "కీలక మౌలిక సదుపాయాల ప్రాజెక్టులు",
      vizagSubstation: "వైజాగ్ ఇండస్ట్రియల్ కారిడార్ సబ్‌స్టేషన్",
      vizagDesc: "విశాఖపట్నం ప్రాంతంలో పెరుగుతున్న పారిశ్రామిక లోడ్‌కు మద్దతుగా 400kV GIS నిర్మాణం.",
      progressLabel: "పురోగతి: 75%",
      phaseLabel: "దశ: సంస్థాపన",
      amaravatiGrid: "అమరావతి గ్రీన్ గ్రిడ్ ఇనిషియేటివ్",
      amaravatiDesc: "రాయలసీమ సోలార్ పార్కుల నుండి పునరుత్పాదక ఇంధన వనరులను అనుసంధానించడానికి 220kV నెట్‌వర్క్ విస్తరణ.",
      caseStudy: "కేస్ స్టడీ",
      smartGrid: "స్మార్ట్ గ్రిడ్ పైలట్ ప్రాజెక్ట్",
      smartGridDesc: "స్వీయ-చికిత్స గ్రిడ్ సామర్థ్యాల కోసం 132kV నెట్‌వర్క్ అంతటా అధునాతన సెన్సార్లు మరియు స్వయంచాలక పర్యవేక్షణ అమలు.",
      tenderDocs: "ప్రాజెక్ట్ టెండర్ పత్రాలు",
      techPublications: "సాంకేతిక ప్రచురణలు & ప్రమాణాలు",
      standardsDesc: "ఏపీట్రాన్స్కో ఇంజనీరింగ్ మరియు ఆపరేషన్స్ విభాగాలచే ప్రచురించబడిన తాజా సాంకేతిక లక్షణాలు, గ్రిడ్ కోడ్‌లు మరియు పరిశోధనా పత్రాలను యాక్సెస్ చేయండి.",
      gridCode: "రాష్ట్ర గ్రిడ్ కోడ్ 2024 (సవరించబడింది)",
      opsReport: "వార్షిక కార్యాచరణ పనితీరు నివేదిక",
      safetyStandards: "EHT ట్రాన్స్మిషన్ లైన్ భద్రతా ప్రమాణాలు",
      needSupport: "సాంకేతిక మద్దతు కావాలా?",
      supportText: "గ్రిడ్ ఇంటర్‌కనెక్షన్‌కు సంబంధించి నిర్దిష్ట డేటా అభ్యర్థనలు, ఇంజనీరింగ్ విచారణలు లేదా సాంకేతిక సంప్రదింపుల కోసం.",
      emailPlaceholder: "వృత్తిపరమైన ఇమెయిల్",
      inquiryPlaceholder: "మీ విచారణను వివరించండి",
      submitRequest: "అభ్యర్థనను సమర్పించండి",
      requestSent: "ధన్యవాదాలు! సాంకేతిక విచారణ విజయవంతంగా సమర్పించబడింది."
    }
  };

  const t = translations[language];

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (supportEmail && supportInquiry) {
      setSupportSubmitted(true);
      setTimeout(() => {
        setSupportSubmitted(false);
        setSupportEmail("");
        setSupportInquiry("");
      }, 4000);
    }
  };

  return (
    <div className={`select-none w-full ${isHighContrast ? "bg-black text-white" : "bg-slate-50 text-slate-800"}`}>
      
      {/* 1. Header/Hero Section */}
      <section className={`w-full py-16 md:py-24 border-b relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 ${
        isHighContrast 
          ? "bg-black border-white text-white" 
          : "bg-slate-950 border-slate-800 text-white"
      }`}>
        {/* Beautiful high-quality background photo with overlay */}
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100 scale-100"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1600')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.15),transparent_60%)] pointer-events-none z-10"></div>
          </>
        )}
        
        <div className="max-w-[1650px] mx-auto px-4 md:px-8 w-full flex flex-col lg:flex-row items-center gap-12 z-20">
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded inline-block ${
              isHighContrast ? "border border-white bg-stone-900 text-white" : "bg-cyan-500/10 text-cyan-300 font-extrabold border border-cyan-500/20"
            }`}>
              {t.badgeExcellence}
            </span>
            <h2 className="font-extrabold font-display tracking-tight leading-tight text-3xl md:text-5xl" style={{ fontSize: `${44 * fontScale}px` }}>
              {t.heroTitle}
            </h2>
            <p className="text-slate-200 text-xs md:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-sm" style={{ fontSize: `${13 * fontScale}px` }}>
              {t.heroText}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button 
                onClick={() => {
                  const el = document.getElementById("topology");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`rounded-lg font-bold text-xs uppercase tracking-wider px-5 py-3 transition-all cursor-pointer shadow-md ${
                  isHighContrast 
                    ? "bg-white text-black hover:bg-amber-400" 
                    : "bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold"
                }`}
              >
                {t.exploreNetwork}
              </button>
              <button 
                onClick={() => alert("Downloading APTRANSCO Annual Grid Report 2024...")}
                className={`rounded-lg font-bold text-xs uppercase tracking-wider px-5 py-3 transition-all cursor-pointer border ${
                  isHighContrast 
                    ? "border-white hover:bg-stone-900 text-white" 
                    : "border-white/30 hover:border-white hover:bg-white/5 text-white"
                }`}
              >
                {t.annualReport}
              </button>
            </div>
          </div>

          {/* Right side framed image of Sunset and Pylon */}
          <div className="shrink-0 w-full lg:w-[440px]">
            <div className={`p-3.5 rounded-2xl shadow-2xl border ${
              isHighContrast ? "bg-stone-950 border-white" : "bg-slate-900/50 border-slate-800"
            }`}>
              <img 
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800" 
                alt="APTRANSCO Transmission Line Sunset" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-auto aspect-[4/3] object-cover rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-12">

      {/* 2. Network Statistics Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.networkStats}
            </h3>
            <p className="text-xs text-slate-500">{t.statsSubtitle}</p>
          </div>
          <button 
            type="button"
            onClick={() => alert("Redirecting to real-time grid dashboard...")}
            className={`text-xs font-bold flex items-center gap-1 transition-all ${
              isHighContrast ? "text-amber-400 hover:underline" : "text-[#1d70b8] hover:text-blue-800"
            }`}
          >
            {t.viewLiveDashboard}
            <ArrowRight size={13} className="stroke-[2.5]" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Transmission Capacity */}
          <div className={`lg:col-span-1 p-6 rounded-2xl border flex flex-col justify-between ${
            isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
          }`}>
            <div className="space-y-3">
              <div className={`p-2.5 rounded-xl w-fit ${
                isHighContrast ? "bg-stone-900 border border-white text-white" : "bg-emerald-50 text-emerald-600"
              }`}>
                <Zap size={22} className="fill-current" />
              </div>
              <h4 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wide">{t.transCapacity}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{t.transCapacityDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-stone-800">
              <div className="space-y-1">
                <span className="text-xl md:text-2xl font-black font-mono text-slate-900 dark:text-white block">31,524</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{t.circuitKms}</span>
              </div>
              <div className="space-y-1">
                <span className="text-xl md:text-2xl font-black font-mono text-slate-900 dark:text-white block">428</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{t.substations}</span>
              </div>
            </div>
          </div>

          {/* Right Columns Grid of Volts & Network details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 2: 400 kV */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between relative ${
                isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
              }`}>
                <span className={`absolute top-4 right-4 text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                  isHighContrast 
                    ? "bg-stone-900 border-white text-white" 
                    : "bg-emerald-50 text-emerald-700 border-emerald-100"
                }`}>
                  +4% Year
                </span>
                <div className={`p-2.5 rounded-xl w-fit ${
                  isHighContrast ? "bg-stone-900 border border-white text-white" : "bg-blue-50 text-blue-600"
                }`}>
                  <Building2 size={20} />
                </div>
                <div className="pt-8">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-white block">400 kV</span>
                  <span className="text-xs text-slate-500 font-bold mt-1 block">24 {t.opStations}</span>
                </div>
              </div>

              {/* Card 3: 132 kV */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
                isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
              }`}>
                <div className={`p-2.5 rounded-xl w-fit ${
                  isHighContrast ? "bg-stone-900 border border-white text-white" : "bg-blue-50 text-blue-600"
                }`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 22V10M20 22V10M12 2v20M2 10h20M5 5h14" />
                  </svg>
                </div>
                <div className="pt-8">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-white block">132 kV</span>
                  <span className="text-xs text-slate-500 font-bold mt-1 block">224 {t.opStations}</span>
                </div>
              </div>
            </div>

            {/* Bottom Card 4: 220 kV Network (Spans across) */}
            <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isHighContrast 
                ? "bg-black border-white text-white" 
                : "bg-[#021832] border-transparent text-white"
            }`}>
              <div className="space-y-1">
                <h5 className="font-bold text-sm text-white uppercase tracking-wide">220 kV Network</h5>
                <p className="text-[11px] text-slate-300 font-medium">Strategic Inter-District Connections</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-white">180</span>
                <span className="text-amber-400 font-bold text-[9px] tracking-widest uppercase">{t.stations}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. State Transmission Grid Topology Section */}
      <section id="topology" className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.gridTopology}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">{t.topologyText}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Grid Status List */}
          <div className="lg:col-span-4 space-y-4">
            <div className={`p-4 rounded-xl border flex items-center justify-between transition-all hover:translate-x-1 ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200/70 shadow-xs"
            }`}>
              <span className="text-xs font-bold">{t.northCoastal}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
            </div>
            
            <div className={`p-4 rounded-xl border flex items-center justify-between transition-all hover:translate-x-1 ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200/70 shadow-xs"
            }`}>
              <span className="text-xs font-bold">{t.rayalaseema}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></span>
            </div>

            <div className={`p-4 rounded-xl border flex items-center justify-between transition-all hover:translate-x-1 ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200/70 shadow-xs"
            }`}>
              <span className="text-xs font-bold">{t.centralGrid}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b] animate-pulse"></span>
            </div>
          </div>

          {/* Right GIS portal launch box */}
          <div id="gis-mapping" className={`lg:col-span-8 p-6 rounded-2xl border ${
            isHighContrast ? "bg-stone-900 border-white text-white" : "bg-slate-100/55 border-slate-200/60"
          }`}>
            <div className={`border-2 border-dashed rounded-xl p-8 text-center space-y-4 ${
              isHighContrast ? "border-white bg-black" : "border-slate-300 bg-white"
            }`}>
              <div className={`p-4 rounded-full w-fit mx-auto ${
                isHighContrast ? "bg-stone-900 border border-white text-white" : "bg-slate-50 text-slate-400"
              }`}>
                <Compass size={32} />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-white">{t.gisTitle}</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">{t.gisText}</p>
              </div>
              <button 
                onClick={() => alert("Launching Secure Interactive Geographic Information System (GIS) portal mapping substations...")}
                className={`rounded-lg font-bold text-xs uppercase tracking-wider px-5 py-2.5 cursor-pointer shadow-md transition-all ${
                  isHighContrast 
                    ? "bg-white text-black hover:bg-amber-400" 
                    : "bg-[#021832] hover:bg-slate-900 text-white"
                }`}
              >
                {t.launchGis}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Key Infrastructure Projects Section */}
      <section id="projects" className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.infraProjects}
            </h3>
            <p className="text-xs text-slate-500">Active bidding and technical notices</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert("Previous slide")}
              className={`p-1.5 rounded border transition-all ${
                isHighContrast ? "border-white hover:bg-stone-900 text-white" : "border-slate-200 hover:bg-slate-100 text-slate-600"
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={() => alert("Next slide")}
              className={`p-1.5 rounded border transition-all ${
                isHighContrast ? "border-white hover:bg-stone-900 text-white" : "border-slate-200 hover:bg-slate-100 text-slate-600"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Vizag Substation */}
          <div className={`rounded-2xl overflow-hidden border flex flex-col justify-between ${
            isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
          }`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600" 
                alt="Vizag Industrial Corridor Substation" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-44 object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                <span className="bg-cyan-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">ONGOING</span>
                <span className="bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded">Est: Dec 2024</span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{t.vizagSubstation}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{t.vizagDesc}</p>
              </div>

              <div className="space-y-1.5 border-t border-slate-100 dark:border-stone-800 pt-3">
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold">
                  <span>{t.progressLabel}</span>
                  <span>{t.phaseLabel}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-stone-900 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Amaravati Green Grid */}
          <div className={`rounded-2xl overflow-hidden border flex flex-col justify-between ${
            isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
          }`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600" 
                alt="Amaravati Green Grid Initiative" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-44 object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                <span className="bg-emerald-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">COMPLETED</span>
                <span className="bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded">Oct 2023</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{t.amaravatiGrid}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{t.amaravatiDesc}</p>
              </div>

              <button 
                type="button"
                onClick={() => alert("Opening Amaravati Green Grid Case Study PDF...")}
                className={`text-[11px] font-extrabold flex items-center gap-1 w-fit uppercase tracking-wider pt-3 border-t border-slate-100 dark:border-stone-800 ${
                  isHighContrast ? "text-amber-400 hover:underline" : "text-[#1d70b8] hover:text-blue-800"
                }`}
              >
                {t.caseStudy}
                <ExternalLink size={12} />
              </button>
            </div>
          </div>

          {/* Card 3: Smart Grid Pilot */}
          <div className={`rounded-2xl overflow-hidden border flex flex-col justify-between ${
            isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
          }`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600" 
                alt="Smart Grid Pilot Project" 
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-44 object-cover"
              />
              <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                <span className="bg-amber-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded">PLANNING</span>
                <span className="bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded">Tender Stage</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">{t.smartGrid}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{t.smartGridDesc}</p>
              </div>

              <button 
                type="button"
                onClick={() => alert("Opening Smart Grid Pilot Project Tender Specification PDF...")}
                className={`text-[11px] font-extrabold flex items-center gap-1.5 w-fit uppercase tracking-wider pt-3 border-t border-slate-100 dark:border-stone-800 ${
                  isHighContrast ? "text-amber-400 hover:underline" : "text-[#1d70b8] hover:text-blue-800"
                }`}
              >
                <FileText size={12} />
                {t.tenderDocs}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Publications & Support Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Technical Publications Box */}
        <div className={`lg:col-span-7 p-6 rounded-2xl border flex flex-col justify-between ${
          isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
        }`}>
          <div className="space-y-4">
            <div className="space-y-1.5 border-b border-slate-100 dark:border-stone-800 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wide">
                {t.techPublications}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">{t.standardsDesc}</p>
            </div>

            <div className="space-y-3 pt-2">
              <div 
                onClick={() => alert("Downloading State Grid Code 2024...")}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                  isHighContrast 
                    ? "bg-stone-900 hover:bg-white hover:text-black border-white" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/60"
                }`}
              >
                <FileText size={16} className={isHighContrast ? "text-white" : "text-[#1d70b8]"} />
                <span className="text-xs font-bold">{t.gridCode}</span>
              </div>

              <div 
                onClick={() => alert("Downloading Annual Operational Performance Report...")}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                  isHighContrast 
                    ? "bg-stone-900 hover:bg-white hover:text-black border-white" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/60"
                }`}
              >
                <FileText size={16} className={isHighContrast ? "text-white" : "text-[#1d70b8]"} />
                <span className="text-xs font-bold">{t.opsReport}</span>
              </div>

              <div 
                onClick={() => alert("Downloading EHT Transmission Line Safety Standards...")}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors ${
                  isHighContrast 
                    ? "bg-stone-900 hover:bg-white hover:text-black border-white" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/60"
                }`}
              >
                <Wrench size={16} className={isHighContrast ? "text-white" : "text-[#1d70b8]"} />
                <span className="text-xs font-bold">{t.safetyStandards}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Inquiry Box */}
        <div className={`lg:col-span-5 p-6 rounded-2xl border relative flex flex-col justify-between ${
          isHighContrast ? "bg-black border-white text-white" : "bg-[#051e36] border-transparent text-white"
        }`}>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-sm text-white">{t.needSupport}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{t.supportText}</p>
            </div>

            {supportSubmitted ? (
              <div className="bg-teal-500/10 border border-teal-500/20 text-teal-300 p-4 rounded-xl text-xs font-bold text-center animate-fade-in py-8">
                {t.requestSent}
              </div>
            ) : (
              <form onSubmit={handleSupportSubmit} className="space-y-3 pt-2">
                <div>
                  <input 
                    type="email" 
                    required
                    placeholder={t.emailPlaceholder}
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:ring-1 focus:ring-cyan-400 ${
                      isHighContrast 
                        ? "bg-black border-white text-white placeholder-stone-500" 
                        : "bg-slate-900/40 border-slate-700 text-white placeholder-slate-400"
                    }`}
                  />
                </div>
                <div>
                  <textarea 
                    rows={3}
                    required
                    placeholder={t.inquiryPlaceholder}
                    value={supportInquiry}
                    onChange={(e) => setSupportInquiry(e.target.value)}
                    className={`w-full rounded-lg px-3 py-2 text-xs border focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none ${
                      isHighContrast 
                        ? "bg-black border-white text-white placeholder-stone-500" 
                        : "bg-slate-900/40 border-slate-700 text-white placeholder-slate-400"
                    }`}
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider block transition-colors cursor-pointer ${
                    isHighContrast 
                      ? "bg-white text-black hover:bg-amber-400" 
                      : "bg-cyan-200 hover:bg-cyan-300 text-slate-900"
                  }`}
                >
                  {t.submitRequest}
                </button>
              </form>
            )}
          </div>
        </div>

      </section>

      </div>
    </div>
  );
};

/* 3. Tenders & Procurements */
export const TendersPage: React.FC<PageProps> = ({ language, isHighContrast, fontScale }) => {
  const [category, setCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("All");

  const uniqueCategories = ["All", "Transmission", "Substation", "Telecom & IT", "Civil Works", "Services"];

  const filtered = TENDERS.filter(t => 
    (category === "All" || t.category === category)
  );

  return (
    <div className="animate-fade-in w-full">
      {/* Immersive Power Grid Banner Hero */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100 scale-100"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
            Contractor Zone
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">Tenders & Procurements</h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-sm">
            Statutory bidding specifications, tender reference sheets, and electronic submission deadlines for commercial vendors.
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-10">

      {/* Interactive table filters */}
      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded transition-all ${
                category === cat 
                  ? "bg-blue-900 text-white" 
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-medium text-slate-400">Showing {filtered.length} Bids</span>
      </div>

      {/* Main tenders listing table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">REF CODE & CATEGORY</th>
                <th className="p-4">TENDER DESCRIPTION</th>
                <th className="p-4 text-right">VALUE (CR)</th>
                <th className="p-4">DEADLINE</th>
                <th className="p-4">DOCUMENTS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((tender) => (
                <tr key={tender.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="p-4 space-y-1">
                    <span className="font-mono font-bold text-blue-800 text-[11px] block">{tender.referenceNo}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">{tender.category}</span>
                  </td>
                  <td className="p-4 max-w-sm">
                    <p className="font-semibold text-slate-800 leading-snug">{tender.title}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span>Circle: {tender.circle}</span>
                      <span>•</span>
                      <span className={`font-bold uppercase ${tender.status === "Open" ? "text-emerald-600" : "text-amber-600"}`}>
                        {tender.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-slate-900">
                    ₹{tender.valueCr.toFixed(2)} Cr
                  </td>
                  <td className="p-4 font-mono font-bold text-rose-600">
                    {tender.submissionDeadline}
                  </td>
                  <td className="p-4">
                    <button 
                      type="button"
                      onClick={() => alert(`Simulated Download: ${tender.documentUrl}`)}
                      className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded text-[11px] transition-all"
                    >
                      <Download size={12} />
                      Download (PDF)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor support note */}
      <section id="vendors" className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">Official e-Tendering Guidelines</h4>
          <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
            Contractors must submit digital signatures and bank-guarantee EMD paperwork. Registration is authenticated using the online e-Procurement Portal. For portal technical help, contact CE/Telecom Vijayawada.
          </p>
        </div>
        <button 
          onClick={() => alert("Redirects to commercial secure e-procurement window.")}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-3 rounded-lg shadow-sm whitespace-nowrap transition-all"
        >
          Access e-Procurement Portal
        </button>
      </section>
      </div>
    </div>
  );
};

/* 4. RTI & Compliance Disclosures */
export const RTIPage: React.FC<PageProps> = ({ language, isHighContrast, fontScale }) => {
  return (
    <div className="animate-fade-in w-full">
      {/* Immersive Power Grid Banner Hero */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100 scale-100"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=1200')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
            Public Accountable Governance
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">RTI Act & Public Disclosures</h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-sm">
            Fulfilling APTRANSCO's statutory compliance declarations under Section 4(1)(b) of the Right to Information Act, 2005.
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-10">

      {/* PIO Listing directory */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
          <Landmark className="text-blue-600" size={18} />
          Designated Public Information Officers (PIOs)
        </h3>
        <p className="text-xs text-slate-500">Official administrative points of contact for citizens seeking specific public records.</p>

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase">
                  <th className="p-3">JURISDICTION</th>
                  <th className="p-3">OFFICER DESIGNATION</th>
                  <th className="p-3">TELEPHONE</th>
                  <th className="p-3">EMAIL ADDRESS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {OFFICE_DIRECTORY.slice(0, 4).map((dir) => (
                  <tr key={dir.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">{dir.circleName}</td>
                    <td className="p-3 font-medium text-slate-800">{dir.designation}</td>
                    <td className="p-3 font-mono text-slate-600">{dir.contactNo}</td>
                    <td className="p-3 font-mono text-blue-600 hover:underline">{dir.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Regulatory Tariff announcements */}
      <section id="tariff" className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Tariff Filings & Regulatory Orders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-100 pb-2">Multi-Year Tariff Filings (MYT)</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Annual proposals submitted before the Andhra Pradesh Electricity Regulatory Commission (APERC) outlining planned capital expenses, projected transmission capacity limits, and wheeling loss targets.
            </p>
            <div className="flex gap-2">
              <button onClick={() => alert("Downloading MYT report.")} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded">
                Download FY 2026-27 Filings
              </button>
            </div>
          </div>

          <div id="reports" className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 border-b border-slate-100 pb-2">Annual Financial Disclosures</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-serif">
              Audited balance sheets, income statements, and board statements describing state utility liquidity, debt structures, and operational margins.
            </p>
            <div className="flex gap-2">
              <button onClick={() => alert("Downloading financial disclosures.")} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1.5 rounded">
                Download Annual Report (PDF)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Safety standards manual */}
      <section id="safety" className="bg-amber-50 border border-amber-200 p-5 rounded-xl text-slate-700 flex items-start gap-4">
        <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
        <div className="space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">Safety Standards & Technical Manuals</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Technical publications, line clearance procedures, and statutory safety codes governing field maintenance work. Essential guidelines for preventing accidental line contact or localized power grid hazards.
          </p>
          <button onClick={() => alert("Downloading safety handbook.")} className="text-[11px] font-bold text-amber-950 bg-amber-200/50 hover:bg-amber-200 px-3 py-1.5 rounded mt-2">
            Download State Safety Handbook
          </button>
        </div>
      </section>
      </div>
    </div>
  );
};

/* 5. Internal Apps Page Component */
export interface APTRANSCOApp {
  id: string;
  name: string;
  subtext?: string;
  section: "sap-erp" | "internal" | "others" | "info";
  icon: React.ComponentType<{ size: number; className?: string }>;
  links: { label: string; actionType: "login" | "link" | "download" | "info"; url?: string }[];
}

export const InternalAppsPage: React.FC<PageProps> = ({ language, isHighContrast, fontScale }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<APTRANSCOApp | null>(null);
  
  // Login flow state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("corp.aptransco.gov.in");
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loadingMessage, setLoadingMessage] = useState("");
  
  // App simulated dashboards interactive state
  const [eOfficeFiles, setEOfficeFiles] = useState([
    { id: "F-1029", title: "Approval of 132KV Bay Extension Erection at Nellore GIS Substation", status: "PENDING", date: "2026-06-30", urgency: "High" },
    { id: "F-1035", title: "Draft Response for Legislative Assembly Starred Question on Grid Security", status: "PENDING", date: "2026-07-01", urgency: "Immediate" },
    { id: "F-1044", title: "Sanction of OPGW Fiber network expansion in Rayalaseema Zone", status: "PENDING", date: "2026-07-02", urgency: "Normal" }
  ]);
  
  const [sldcFrequency, setSldcFrequency] = useState(49.98);
  const [sldcDemand, setSldcDemand] = useState(8412);
  const [sldcLines, setSldclines] = useState([
    { id: "L-1", name: "Vijayawada - Nellore 400KV D/C Line", load: 82, status: "NORMAL" },
    { id: "L-2", name: "Kadapa - Gooty 400KV S/C Line", load: 91, status: "CRITICAL" },
    { id: "L-3", name: "Kurnool - Srisailam 220KV D/C Line", load: 45, status: "NORMAL" }
  ]);

  const [activeTabInsideApp, setActiveTabInsideApp] = useState("home");

  // Simulated features states
  const [activeFeature, setActiveFeature] = useState<{
    type: "directory" | "org-structure" | "lines-patrol" | "mis-reports" | "cyber-alerts" | "dept-tests" | "price-circulars" | "erp-help";
    title: string;
  } | null>(null);

  const [dirSearch, setDirSearch] = useState("");
  const [selectedCircle, setSelectedCircle] = useState<"Visakhapatnam" | "Vijayawada" | "Kadapa">("Vijayawada");
  const [deptTestSearch, setDeptTestSearch] = useState("");

  const apApps: APTRANSCOApp[] = [
    // SAP-ERP Section
    {
      id: "sap-ecc",
      name: "SAP ECC WEB(INTERNET) SERVICE",
      section: "sap-erp",
      icon: Database,
      links: [{ label: "Login", actionType: "login" }]
    },
    {
      id: "sap-ess",
      name: "SAP EMPLOYEE SELF SERVICE(ESS)",
      section: "sap-erp",
      icon: Users,
      links: [
        { label: "Login", actionType: "login" },
        { label: "ERP Help", actionType: "info" }
      ]
    },
    {
      id: "sap-ps",
      name: "ERP PROJECT SYSTEMS",
      section: "sap-erp",
      icon: Cpu,
      links: [{ label: "Price Variation Circulars", actionType: "link" }]
    },

    // Internal Apps Section
    {
      id: "employee-one",
      name: "EMPLOYEE ONE",
      section: "internal",
      icon: Laptop,
      links: [{ label: "login", actionType: "login" }]
    },
    {
      id: "vendor-one",
      name: "VENDOR ONE",
      section: "internal",
      icon: Shield,
      links: [{ label: "login", actionType: "login" }]
    },
    {
      id: "e-office-ap",
      name: "E-OFFICE",
      section: "internal",
      icon: FileText,
      links: [
        { label: "Manual", actionType: "link" },
        { label: "PPT", actionType: "link" },
        { label: "DSC Registration", actionType: "link" }
      ]
    },
    {
      id: "nigaa",
      name: "NIGAA",
      section: "internal",
      icon: Eye,
      links: [{ label: "login", actionType: "login" }]
    },
    {
      id: "sshmi",
      name: "SSHMI",
      section: "internal",
      icon: Server,
      links: [
        { label: "login", actionType: "login" },
        { label: "Android APP Download", actionType: "download" }
      ]
    },
    {
      id: "telephone-directory",
      name: "TELEPHONE DIRECTORY",
      subtext: "(INTERNAL ACCESS)",
      section: "internal",
      icon: Phone,
      links: [
        { label: "Telephone Directory", actionType: "link" },
        { label: "search", actionType: "link" }
      ]
    },
    {
      id: "org-structure",
      name: "ORGANISATION STRUCTURE",
      subtext: "(INTERNAL ACCESS)",
      section: "internal",
      icon: Landmark,
      links: [{ label: "organisation structure", actionType: "link" }]
    },
    {
      id: "gis",
      name: "GIS",
      subtext: "(INTERNAL ACCESS)",
      section: "internal",
      icon: MapPin,
      links: [{ label: "gis Login", actionType: "login" }]
    },
    {
      id: "apspectra",
      name: "APSPECTRA",
      subtext: "(APTRANSCO SYSTEM TOPPING PORTAL)",
      section: "internal",
      icon: Zap,
      links: [
        { label: "login", actionType: "login" },
        { label: "guidelines", actionType: "info" }
      ]
    },
    {
      id: "fibre-net",
      name: "FIBRE NETWORK MANAGEMENT",
      section: "internal",
      icon: Globe,
      links: [{ label: "login", actionType: "login" }]
    },
    {
      id: "it-asset",
      name: "IT ASSET",
      section: "internal",
      icon: Key,
      links: [
        { label: "employee login", actionType: "login" },
        { label: "Admin Login", actionType: "login" },
        { label: "Indents (Vidyuth soudha)", actionType: "link" }
      ]
    },
    {
      id: "sldc-portal",
      name: "SLDC",
      section: "internal",
      icon: Activity,
      links: [
        { label: "LC Application", actionType: "link" },
        { label: "interstate generators schedule application", actionType: "link" },
        { label: "schedule login", actionType: "login" },
        { label: "SLDC REPORTS", actionType: "link" },
        { label: "SLDC REPORTS PUBLIC", actionType: "link" },
        { label: "inter state transmission losses (Weekly)", actionType: "link" },
        { label: "extra state transmission losses (Monthly)", actionType: "link" },
        { label: "transmission losses applicable to OA users", actionType: "link" }
      ]
    },
    {
      id: "mis-reports",
      name: "MIS REPORTS",
      section: "internal",
      icon: Award,
      links: [
        { label: "MIS Forms", actionType: "link" },
        { label: "Maintenance", actionType: "link" },
        { label: "Fortnightly Demand (MW) of PTRs", actionType: "link" },
        { label: "Equipment Failure", actionType: "link" },
        { label: "Feeder Interruption", actionType: "link" },
        { label: "Line Interruption", actionType: "link" },
        { label: "Complaints", actionType: "link" },
        { label: "Logs", actionType: "link" },
        { label: "Accident Reports", actionType: "link" }
      ]
    },
    {
      id: "lines-inspection",
      name: "LINES INSPECTION(PATROSOFT)",
      section: "internal",
      icon: Wrench,
      links: [
        { label: "Visakhapatnam", actionType: "link" },
        { label: "Vijayawada", actionType: "link" },
        { label: "Kadapa", actionType: "link" }
      ]
    },

    // Others Section
    {
      id: "mims",
      name: "MIMS",
      subtext: "(MATERIAL INSPECTION AND MANAGEMENT SYSTEM)",
      section: "others",
      icon: Search,
      links: [{ label: "Login", actionType: "login" }]
    },
    {
      id: "bulk-load",
      name: "BULK LOAD",
      section: "others",
      icon: Server,
      links: [{ label: "login", actionType: "login" }]
    },
    {
      id: "tenders-internal",
      name: "TENDERS",
      section: "others",
      icon: FileText,
      links: [
        { label: "login", actionType: "login" },
        { label: "View", actionType: "link" },
        { label: "Help", actionType: "info" }
      ]
    },
    {
      id: "too-app",
      name: "TOO APP",
      section: "others",
      icon: Smartphone,
      links: [
        { label: "Login", actionType: "login" },
        { label: "View TOO", actionType: "link" }
      ]
    },
    {
      id: "apndar",
      name: "APNDAR",
      section: "others",
      icon: Monitor,
      links: [{ label: "login", actionType: "login" }]
    },
    {
      id: "apgdar",
      name: "APGDAR",
      section: "others",
      icon: Monitor,
      links: [{ label: "login", actionType: "login" }]
    },
    {
      id: "trainings",
      name: "TRAININGS",
      section: "others",
      icon: BookOpen,
      links: [
        { label: "Training Materials", actionType: "link" },
        { label: "Assessment Test", actionType: "link" },
        { label: "Help Doc", actionType: "info" }
      ]
    },
    {
      id: "email-zimbra",
      name: "E-MAIL",
      section: "others",
      icon: Mail,
      links: [
        { label: "login", actionType: "login" },
        { label: "Help Doc", actionType: "info" }
      ]
    },
    {
      id: "appcc",
      name: "APPCC",
      section: "others",
      icon: Zap,
      links: [
        { label: "APPCC login", actionType: "login" },
        { label: "PPA's Info", actionType: "info" }
      ]
    },
    {
      id: "biometric-attend",
      name: "EMPLOYEE BIOMETRIC ATTENDANCE",
      section: "others",
      icon: Users,
      links: [{ label: "employee login", actionType: "login" }]
    },
    {
      id: "outsource-biometric",
      name: "OUTSOURCE BIOMETRIC ATTENDANCE",
      section: "others",
      icon: Users,
      links: [
        { label: "incharge login", actionType: "login" },
        { label: "guidelines", actionType: "info" }
      ]
    },
    {
      id: "uids",
      name: "UIDS",
      section: "others",
      icon: Landmark,
      links: [{ label: "view", actionType: "link" }]
    },
    {
      id: "jmr",
      name: "JOINT METER READINGS (JMR)",
      section: "others",
      icon: Activity,
      links: [
        { label: "JMR login", actionType: "login" },
        { label: "signer download", actionType: "download" },
        { label: "vendor login", actionType: "login" }
      ]
    },
    {
      id: "load-monitoring",
      name: "LOAD MONITORING CENTER",
      section: "others",
      icon: Monitor,
      links: [{ label: "login", actionType: "login" }]
    },

    // Information Section
    {
      id: "vendor-info",
      name: "VENDOR",
      section: "info",
      icon: ShieldCheck,
      links: [{ label: "login", actionType: "login" }]
    },
    {
      id: "master-data",
      name: "MASTER DATA FORMS",
      section: "info",
      icon: FileText,
      links: [{ label: "info", actionType: "link" }]
    },
    {
      id: "dept-tests",
      name: "DEPARTMENTAL TESTS",
      section: "info",
      icon: Award,
      links: [
        { label: "syllabus", actionType: "link" },
        { label: "last results", actionType: "link" }
      ]
    },
    {
      id: "cyber-alerts",
      name: "CYBER SECURITY ALERTS",
      section: "info",
      icon: AlertTriangle,
      links: [{ label: "info", actionType: "info" }]
    }
  ];

  const handleLinkClick = (app: APTRANSCOApp, link: { label: string; actionType: string }) => {
    const isLoginAction = link.actionType === "login" || link.label.toLowerCase().includes("login");
    
    if (isLoginAction) {
      setSelectedApp(app);
      setUsername("");
      setPassword("");
      setLoginState("idle");
    } else {
      // Trigger custom interactive visual simulation depending on link label/action
      const label = link.label.toLowerCase();
      if (label.includes("telephone") || label === "search" && app.id === "telephone-directory") {
        setActiveFeature({ type: "directory", title: "APTRANSCO Secure Telephone Directory" });
      } else if (label.includes("organisation") || label.includes("structure")) {
        setActiveFeature({ type: "org-structure", title: "Corporate Organisation Hierarchy" });
      } else if (app.id === "lines-inspection") {
        setSelectedCircle(link.label as any);
        setActiveFeature({ type: "lines-patrol", title: `Patrosoft Line Inspection: ${link.label} Circle` });
      } else if (app.id === "mis-reports" || label.includes("reports")) {
        setActiveFeature({ type: "mis-reports", title: "MIS Dispatch & Maintenance Log System" });
      } else if (app.id === "cyber-alerts" || label === "info") {
        setActiveFeature({ type: "cyber-alerts", title: "Information Systems Security Alerts" });
      } else if (app.id === "dept-tests") {
        setActiveFeature({ type: "dept-tests", title: "Departmental Board Exams Portal" });
      } else if (label.includes("circulars") || label.includes("price")) {
        setActiveFeature({ type: "price-circulars", title: "Price Variation & Vendor Bulletins" });
      } else if (label.includes("help")) {
        setActiveFeature({ type: "erp-help", title: "SAP ERP Production User Help Desk" });
      } else {
        alert(`Opening simulated workspace for: "${link.label}" (${app.name})`);
      }
    }
  };

  const handleMockLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      alert("Please fill in both Employee/Vendor ID and Password.");
      return;
    }

    setLoginState("loading");
    setLoadingMessage("Connecting to secure APTRANSCO Active Directory (LDAP)...");
    
    setTimeout(() => {
      setLoadingMessage("Verifying digital signature token and smart card protocols...");
      setTimeout(() => {
        setLoadingMessage("Authorizing employee security clearance levels...");
        setTimeout(() => {
          setLoginState("success");
          setActiveTabInsideApp("home");
        }, 600);
      }, 700);
    }, 700);
  };

  const handleFileAction = (id: string, action: "APPROVED" | "FORWARDED") => {
    setEOfficeFiles(prev => prev.map(f => f.id === id ? { ...f, status: action } : f));
  };

  const handleSldcTweak = (lineId: string, reduction: number) => {
    setSldclines(prev => prev.map(l => {
      if (l.id === lineId) {
        const newLoad = Math.max(20, l.load - reduction);
        return { ...l, load: newLoad, status: newLoad > 85 ? "CRITICAL" : "NORMAL" };
      }
      return l;
    }));
  };

  const sections = [
    { key: "sap-erp", title: "SAP-ERP", enTitle: "SAP-ERP", teTitle: "సాప్-ఈఆర్పీ" },
    { key: "internal", title: "Internal Apps", enTitle: "Internal Apps", teTitle: "అంతర్గత యాప్స్" },
    { key: "others", title: "Others", enTitle: "Others", teTitle: "ఇతర సిస్టమ్స్" },
    { key: "info", title: "Information", enTitle: "Information", teTitle: "సమాచారం" }
  ];

  // Telephone directory mock contacts
  const mockContacts = [
    { name: "Er. K. Srinivasa Rao", role: "Chief Engineer (Grid Operations)", phone: "0863-2393101", email: "ce.sldc@aptransco.co.in", location: "Vidyut Soudha, Vijayawada" },
    { name: "Er. P. Venugopal", role: "Chief Engineer (Transmission & GIS)", phone: "0863-2393102", email: "ce.trans@aptransco.co.in", location: "Vidyut Soudha, Vijayawada" },
    { name: "Er. S. Prasada Rao", role: "Superintending Engineer (Grid Command)", phone: "0863-2393122", email: "se.grid@aptransco.co.in", location: "SLDC, Vijayawada" },
    { name: "Smt. M. Rajakumari", role: "Superintending Engineer (Telecom & IT)", phone: "0863-2393105", email: "se.telecom@aptransco.co.in", location: "Vidyut Soudha, Vijayawada" },
    { name: "Er. B. Venkata Narayana", role: "Divisional Engineer (Fibre Management)", phone: "0863-2393144", email: "de.fibrenet@aptransco.co.in", location: "Vidyut Soudha, Vijayawada" },
    { name: "Shri V. Anil Kumar", role: "Senior Accounts Officer (SAP ERP Support)", phone: "0863-2393208", email: "sao.sap@aptransco.co.in", location: "Corporate Accounts, Vijayawada" }
  ];

  const filteredContacts = mockContacts.filter(c => 
    c.name.toLowerCase().includes(dirSearch.toLowerCase()) ||
    c.role.toLowerCase().includes(dirSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(dirSearch.toLowerCase())
  );

  // Line inspections
  const patrolLogs = {
    Visakhapatnam: [
      { id: "P-801", line: "Visakhapatnam - Gajuwaka 220KV S/C Line", tower: "T-20 to T-45", inspector: "B. Ramana (AE)", status: "COMPLETED", date: "2026-07-01", findings: "Insulator washing done. Clearance safe." },
      { id: "P-802", line: "Kalpakka - Simhadri 400KV D/C Circuit-1", tower: "T-04 to T-18", inspector: "K. Ravi Kumar (ADE)", status: "PENDING", date: "2026-07-03", findings: "Overgrowth trimming required near Tower #11." }
    ],
    Vijayawada: [
      { id: "P-803", line: "Vijayawada - Nellore 400KV D/C Line", tower: "T-115 to T-140", inspector: "Y. Srinivasa Rao (AE)", status: "COMPLETED", date: "2026-06-30", findings: "Hotspot thermovision scanning done. No anomalies." },
      { id: "P-804", line: "Guntur - Nunna 220KV D/C Line", tower: "T-60 to T-85", inspector: "V. Satish (AE)", status: "COMPLETED", date: "2026-07-02", findings: "Lattice bolt tightening completed. Foundation secure." }
    ],
    Kadapa: [
      { id: "P-805", line: "Kadapa - Gooty 400KV S/C Line", tower: "T-210 to T-235", inspector: "D. Gangadhar (AE)", status: "PENDING", date: "2026-07-04", findings: "Scheduled clearance measurement of ground wires." },
      { id: "P-806", line: "Rayalaseema TPS - Kadapa 220KV S/C Line", tower: "T-12 to T-35", inspector: "M. Subbarayudu (ADE)", status: "COMPLETED", date: "2026-07-01", findings: "Vibration dampers checked and adjusted." }
    ]
  };

  const filteredApps = apApps.filter(app => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      app.name.toLowerCase().includes(query) ||
      (app.subtext && app.subtext.toLowerCase().includes(query)) ||
      app.section.toLowerCase().includes(query)
    );
  });

  return (
    <div className="animate-fade-in w-full pb-16">
      {/* Immersive Power Grid Banner Hero */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100 scale-100"
              style={{ 
                backgroundImage: "url('App.png')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-blue-400 bg-blue-400/20 px-2.5 py-1 rounded border border-blue-400/30 inline-block">
            Authorized Secure Intranet Gateway
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">APTRANSCO Web Portals &amp; Systems</h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-sm">
            Single Sign-On (SSO) gateway and secure directory. Gain real-time access to official correspondence, line clearance scheduling, SAP-ERP databases, load dispatch telemetry, and employee self-services.
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-12">

      {/* Security Disclaimer Banner */}
      <div className={`p-4 rounded-xl border flex items-start gap-3.5 text-xs ${
        isHighContrast 
          ? "border-amber-500 bg-black text-amber-300" 
          : "border-blue-100 bg-blue-50/70 text-slate-700"
      }`}>
        <Shield size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold block text-slate-900">Authorized Personnel Only</strong>
          <p className="leading-relaxed text-[11px] text-slate-600">
            This is a secure private system. All digital signatures, Active Directory tokens, IP address records, and operations logs are monitored under the ISO 27001 Cybersecurity Framework and IT Act, 2000.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          System Directory Index ({filteredApps.length} Apps matched)
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search systems (e.g. SAP, SLDC, e-Office, Telephone)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-1 ${
              isHighContrast 
                ? "bg-black border-amber-500 text-amber-300 focus:ring-amber-500" 
                : "bg-white border-slate-200 text-slate-800 focus:ring-[#1d70b8] focus:border-[#1d70b8]"
            }`}
          />
        </div>
      </div>

      {/* Categories sections */}
      <div className="space-y-16">
        {sections.map((section) => {
          // Filter apps belonging to this section
          const sectionApps = filteredApps.filter(app => app.section === section.key);
          if (sectionApps.length === 0) return null;

          return (
            <div key={section.key} className="space-y-6">
              {/* Authentically Styled Centered Section Title with Diamond Flank Line */}
              <div className="flex flex-col items-center">
                <h3 className="text-[#1d70b8] text-xl md:text-2xl font-black uppercase tracking-wider text-center">
                  {language === "EN" ? section.enTitle : section.teTitle}
                </h3>
                <div className="flex items-center gap-4 w-full max-w-[240px] mt-2 text-slate-300">
                  <div className="h-[2px] bg-slate-200 flex-1"></div>
                  <div className="w-2.5 h-2.5 bg-[#1d70b8] rotate-45 border border-white shrink-0 shadow-sm"></div>
                  <div className="h-[2px] bg-slate-200 flex-1"></div>
                </div>
              </div>

              {/* Grid of Apps inside this section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sectionApps.map((app) => {
                  const IconComponent = app.icon;
                  return (
                    <div 
                      key={app.id} 
                      className={`p-5 rounded-lg border flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                        isHighContrast 
                          ? "bg-black border-stone-700 text-white hover:border-amber-400" 
                          : "bg-white border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Left Side Icon */}
                        <div className={`p-3 rounded border shrink-0 ${
                          isHighContrast ? "bg-stone-900 border-amber-500/20 text-amber-400" : "bg-slate-50 border-slate-100 text-slate-700"
                        }`}>
                          <IconComponent size={20} />
                        </div>

                        {/* Right Side App Name & Description */}
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-[12px] md:text-xs text-slate-900 leading-snug tracking-wide uppercase">
                            {app.name}
                          </h4>
                          {app.subtext && (
                            <p className="text-[10px] font-bold text-[#1d70b8] tracking-wider uppercase font-sans">
                              {app.subtext}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Custom Horizontal Action Links */}
                      <div className="pt-4 border-t border-slate-100/60 mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-blue-600">
                        {app.links.map((link, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick(app, link)}
                            className="hover:underline hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <span>{link.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* SIMULATED SUB-PORTALS / DIALOGS */}
      {activeFeature && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setActiveFeature(null)}>
          <div 
            className={`w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl border transition-all duration-300 relative ${
              isHighContrast ? "bg-black border-amber-500 text-white" : "bg-white border-slate-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveFeature(null)} 
              className="absolute top-4 right-4 p-1.5 rounded-lg border transition-all cursor-pointer hover:bg-slate-100 hover:text-slate-900"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className={`p-5 border-b ${isHighContrast ? "border-stone-800 bg-stone-950" : "bg-slate-50 border-slate-100"}`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1d70b8] text-white rounded">
                  <Landmark size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">{activeFeature.title}</h3>
                  <p className="text-[10px] text-slate-500 font-mono">APTRANSCO Secure Intranet Simulation</p>
                </div>
              </div>
            </div>

            {/* Feature Render Body */}
            <div className="p-6 max-h-[460px] overflow-y-auto space-y-4">
              
              {/* 1. Telephone Directory */}
              {activeFeature.type === "directory" && (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search by officer name, role, department..."
                      value={dirSearch}
                      onChange={(e) => setDirSearch(e.target.value)}
                      className="w-full text-xs pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2.5">
                    {filteredContacts.map((contact, i) => (
                      <div key={i} className="p-3 border border-slate-100 rounded-lg space-y-2 text-xs hover:bg-slate-50">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-slate-900 text-[12px]">{contact.name}</h4>
                            <p className="text-slate-500 text-[10.5px] font-sans">{contact.role}</p>
                          </div>
                          <span className="text-[10px] bg-blue-100 text-[#1d70b8] font-bold px-2 py-0.5 rounded">
                            {contact.location}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 font-mono pt-1.5 border-t border-slate-100/50">
                          <div className="flex items-center gap-1.5">
                            <Phone size={12} className="text-slate-400" />
                            <span>{contact.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Mail size={12} className="text-slate-400" />
                            <span className="truncate">{contact.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredContacts.length === 0 && (
                      <p className="text-center text-[11px] text-slate-400 py-6 font-mono">No matching contacts found.</p>
                    )}
                  </div>
                </div>
              )}

              {/* 2. Organisation Structure */}
              {activeFeature.type === "org-structure" && (
                <div className="space-y-4 text-xs">
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Corporate administrative tree and transmission grid deployment command line.
                  </p>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                    {/* CMD level */}
                    <div className="flex justify-center">
                      <div className="bg-blue-900 text-white p-2.5 rounded text-center border font-bold min-w-[200px]">
                        CMD, APTRANSCO
                        <span className="block text-[9px] font-normal font-mono">Chairman &amp; Managing Director</span>
                      </div>
                    </div>

                    {/* Down arrows */}
                    <div className="flex justify-center text-slate-400">
                      <div className="h-4 w-[2px] bg-slate-300"></div>
                    </div>

                    {/* Executive Director Level */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800 text-white p-2.5 rounded text-center border font-bold">
                        Director (Finance)
                        <span className="block text-[9px] font-normal font-mono font-sans text-slate-300">Joint Managing Director</span>
                      </div>
                      <div className="bg-slate-800 text-white p-2.5 rounded text-center border font-bold">
                        Director (Grid &amp; Trans)
                        <span className="block text-[9px] font-normal font-mono font-sans text-slate-300">Substation Operations</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex justify-center text-slate-400">
                        <div className="h-4 w-[2px] bg-slate-300"></div>
                      </div>
                      <div className="flex justify-center text-slate-400">
                        <div className="h-4 w-[2px] bg-slate-300"></div>
                      </div>
                    </div>

                    {/* Chief Engineer Level */}
                    <div className="grid grid-cols-3 gap-2.5 text-[10px]">
                      <div className="bg-white border border-slate-200 p-2 rounded text-center font-bold">
                        Chief Engineer
                        <span className="block text-[9px] font-mono text-slate-500 font-sans">Power Systems</span>
                      </div>
                      <div className="bg-white border border-slate-200 p-2 rounded text-center font-bold">
                        Chief Engineer
                        <span className="block text-[9px] font-mono text-slate-500 font-sans">Grid Operations (SLDC)</span>
                      </div>
                      <div className="bg-white border border-slate-200 p-2 rounded text-center font-bold">
                        Chief Engineer
                        <span className="block text-[9px] font-mono text-slate-500 font-sans">Telecom &amp; Fibre Net</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Lines Inspection Patrol */}
              {activeFeature.type === "lines-patrol" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">👷 Patrol Log Reports</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      PATROSOFT Live Stream
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(patrolLogs[selectedCircle] || []).map((log, idx) => (
                      <div key={idx} className="p-3 border rounded-xl bg-slate-50/50 space-y-2 text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-mono font-bold text-slate-400">{log.id}</span>
                            <h4 className="font-bold text-slate-800">{log.line}</h4>
                          </div>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            log.status === "COMPLETED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {log.status}
                          </span>
                        </div>
                        <div className="text-[10.5px] text-slate-600 bg-white p-2 rounded border border-slate-100/80">
                          <strong className="font-bold text-slate-700">Findings:</strong> {log.findings}
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                          <span>Inspector: {log.inspector}</span>
                          <span>Scheduled: {log.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. MIS Reports */}
              {activeFeature.type === "mis-reports" && (
                <div className="space-y-3 text-xs">
                  <h4 className="font-bold text-slate-800">State Grid Dispatch &amp; Interruptions Archives</h4>
                  <div className="border rounded-lg overflow-hidden font-mono text-[11px]">
                    <div className="bg-slate-50 p-2 font-bold border-b text-slate-500 grid grid-cols-3">
                      <span>REPORT NAME</span>
                      <span>GEN DATE</span>
                      <span>METADATA</span>
                    </div>
                    <div className="divide-y">
                      <div className="p-2 grid grid-cols-3 hover:bg-slate-50 cursor-pointer" onClick={() => alert("Loading Daily Energy Report")}>
                        <span className="text-[#1d70b8] font-sans font-bold text-[11.5px]">Daily Grid Dispatch Sheet</span>
                        <span>02-07-2026</span>
                        <span className="text-emerald-600 font-bold">Steady Frequency</span>
                      </div>
                      <div className="p-2 grid grid-cols-3 hover:bg-slate-50 cursor-pointer" onClick={() => alert("Loading Failure Log")}>
                        <span className="text-[#1d70b8] font-sans font-bold text-[11.5px]">PTR Equipment Failure Log</span>
                        <span>30-06-2026</span>
                        <span className="text-red-500 font-bold">132KV Bay Incident</span>
                      </div>
                      <div className="p-2 grid grid-cols-3 hover:bg-slate-50 cursor-pointer" onClick={() => alert("Loading Line Clear Record")}>
                        <span className="text-[#1d70b8] font-sans font-bold text-[11.5px]">Line Clearance (LC) Book</span>
                        <span>28-06-2026</span>
                        <span>400KV Circuit Outage</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Cyber Security Alerts */}
              {activeFeature.type === "cyber-alerts" && (
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl flex items-start gap-3 text-xs">
                    <AlertTriangle size={18} className="shrink-0 text-red-600 mt-0.5" />
                    <div>
                      <strong className="font-bold block text-[13px]">Mandatory 2FA Enforcement</strong>
                      <p className="mt-1 leading-relaxed text-red-700">
                        Effective immediately, all employee accounts on Zimbra webmail and corporate Active Directory must authenticate with secondary SMS/Email OTP codes.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <h4 className="font-bold text-slate-800">Departmental Advisories</h4>
                    <ul className="space-y-2 font-sans text-slate-600">
                      <li className="p-2.5 bg-slate-50 rounded border-l-4 border-[#1d70b8]">
                        <strong className="text-slate-800 block">ADVISORY: Weekly Password Rotations</strong>
                        All accounts accessing SAP ECC and GPF ledgers are required to rotate password keys.
                      </li>
                      <li className="p-2.5 bg-slate-50 rounded border-l-4 border-amber-500">
                        <strong className="text-slate-800 block">WARNING: Phishing Email Vectors</strong>
                        Report emails masquerading as CMD Office seeking immediate fund releases or credentials.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 6. Departmental Tests */}
              {activeFeature.type === "dept-tests" && (
                <div className="space-y-4">
                  <p className="text-[11px] text-slate-500">
                    Search June 2026 departmental tests syllabus, examination schedules, or view provisional candidate keys.
                  </p>

                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search syllabus/results (e.g. Accounts, Tech Code)..."
                      value={deptTestSearch}
                      onChange={(e) => setDeptTestSearch(e.target.value)}
                      className="w-full text-xs pl-9 pr-4 py-2 border rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      { code: "TEST-41", title: "Accounts Test for Executive Officers (A.P. Transco)", syllabus: "Syllabus covering Finance Code, Treasury Code, and departmental delegation of financial powers.", date: "Completed - June 2026" },
                      { code: "TEST-88", title: "Electricity Department Test - Electrical Technical Code", syllabus: "Syllabus covering IE rules, electricity grid standard safety acts, and transmission line mechanics.", date: "Results provisional" }
                    ].filter(item => 
                      item.title.toLowerCase().includes(deptTestSearch.toLowerCase()) ||
                      item.code.toLowerCase().includes(deptTestSearch.toLowerCase())
                    ).map((test, idx) => (
                      <div key={idx} className="p-3 border rounded-lg bg-slate-50/50 space-y-1">
                        <div className="flex justify-between font-bold text-slate-800">
                          <span>{test.code}: {test.title}</span>
                          <span className="text-[10px] font-mono text-slate-500">{test.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-sans leading-relaxed">{test.syllabus}</p>
                        <div className="pt-2 flex gap-2">
                          <button onClick={() => alert(`Downloading syllabus for ${test.code}`)} className="text-[10px] font-bold text-blue-600 hover:underline">Download Syllabus PDF</button>
                          <button onClick={() => alert(`Showing results for ${test.code}`)} className="text-[10px] font-bold text-[#1d70b8] hover:underline">View Last Results</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Price Variation Circulars */}
              {activeFeature.type === "price-circulars" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Monthly price variation calculations based on National IEEMA Index indexes for Copper, Aluminium, and SF6 gases. Mandatory calculations for steel tower and OPGW progressive vendors.
                  </p>
                  <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs space-y-2">
                    <strong className="font-bold text-[#1d70b8] block">Latest Circular: June 2026</strong>
                    <p className="text-slate-600">IEEMA price variations calculated on progressive erections of 400KV and 220KV steel structures have been published.</p>
                    <button onClick={() => alert("Downloading PV Circular June 2026")} className="text-[10px] font-bold bg-[#1d70b8] hover:bg-blue-800 text-white px-2.5 py-1 rounded">Download PV Bulletin June-2026</button>
                  </div>
                </div>
              )}

              {/* 8. ERP Help Desk */}
              {activeFeature.type === "erp-help" && (
                <div className="space-y-4">
                  <div className="p-4 border rounded-xl bg-slate-50/60 space-y-2 text-xs">
                    <strong className="font-bold text-slate-800 block">SAP ECC Production Support Contact</strong>
                    <p className="text-slate-600 leading-relaxed">
                      For master database modifications, cost center creation errors, or material management (MM) requisition releases, please dial Extension <strong className="font-bold text-slate-900">4410</strong> or email <strong className="font-mono text-blue-600">erp.help@aptransco.gov.in</strong>.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setActiveFeature(null)} 
                className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold rounded cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SSO Login Modal and Interactive Experience */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" onClick={() => setSelectedApp(null)}>
          <div 
            className={`w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border transition-all duration-300 relative ${
              isHighContrast ? "bg-black border-amber-500 text-white" : "bg-white border-slate-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedApp(null)} 
              className={`absolute top-4 right-4 p-1.5 rounded-lg border transition-all cursor-pointer ${
                isHighContrast ? "bg-stone-900 border-amber-500 text-amber-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"
              }`}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className={`p-6 border-b ${isHighContrast ? "border-stone-800 bg-stone-950" : "bg-slate-50/70 border-slate-100"}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border shrink-0 ${
                  isHighContrast ? "bg-stone-900 border-amber-500/30 text-amber-400" : "bg-blue-50 border-blue-100 text-[#1d70b8]"
                }`}>
                  {React.createElement(selectedApp.icon, { size: 20 })}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">{selectedApp.name}</h3>
                  <p className="text-[10px] text-slate-500 font-mono">SECURE TRANSCO SINGLE SIGN-ON (SSO)</p>
                </div>
              </div>
            </div>

            {/* Modal Body: Login Flow states */}
            {loginState === "idle" && (
              <form onSubmit={handleMockLoginSubmit} className="p-6 space-y-4">
                <div className={`p-3 rounded-lg border flex items-center gap-2 text-[10px] ${
                  isHighContrast ? "border-amber-500/20 text-amber-300 bg-stone-900/40" : "border-amber-200 bg-amber-50/50 text-amber-800"
                }`}>
                  <ShieldCheck size={14} className="shrink-0 text-amber-600" />
                  <span>Use your official Employee/Vendor ID and Active Directory password.</span>
                </div>

                <div className="space-y-3">
                  {/* Domain Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Intranet Domain</label>
                    <select 
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none ${
                        isHighContrast ? "bg-stone-900 border-stone-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <option value="corp.aptransco.gov.in">corp.aptransco.gov.in (Corporate Head Office)</option>
                      <option value="sldc.aptransco.gov.in">sldc.aptransco.gov.in (Grid Command)</option>
                      <option value="zonal.aptransco.gov.in">zonal.aptransco.gov.in (Zonal Field Offices)</option>
                      <option value="vendor.aptransco.gov.in">vendor.aptransco.gov.in (Contractor Portal)</option>
                    </select>
                  </div>

                  {/* Username */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Employee ID / Vendor Code</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. AP10452 or V-90812"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full text-xs px-3 py-2 rounded-lg border focus:outline-none ${
                          isHighContrast ? "bg-stone-900 border-stone-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full text-xs px-3 py-2 pr-10 rounded-lg border focus:outline-none ${
                          isHighContrast ? "bg-stone-900 border-stone-700 text-white" : "bg-slate-50 border-slate-200 text-slate-800"
                        }`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Remember terminal</span>
                  </label>
                  <button type="button" onClick={() => alert("Contact Corporate IT desk on Ext 4410 to reset Active Directory keys.")} className="text-[#1d70b8] hover:underline font-semibold">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer mt-2 flex items-center justify-center gap-2 ${
                    isHighContrast 
                      ? "bg-amber-400 text-black hover:bg-amber-500" 
                      : "bg-[#1d70b8] hover:bg-blue-800 text-white"
                  }`}
                >
                  <Lock size={12} />
                  Authorize and Connect
                </button>
              </form>
            )}

            {/* Loading / Spinner State */}
            {loginState === "loading" && (
              <div className="p-10 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-10 h-10 rounded-full border-2 border-slate-100 border-t-blue-600 animate-spin"></div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800">{loadingMessage}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Port 443 SSL Secured Gateway Session</p>
                </div>
              </div>
            )}

            {/* Logged-In Success Simulation */}
            {loginState === "success" && (
              <div className="p-6 space-y-4 max-h-[480px] overflow-y-auto">
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg flex items-center gap-2.5 text-xs">
                  <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                  <div className="font-sans">
                    <strong className="font-bold block">Session Authenticated Successfully</strong>
                    <span className="text-[10px] font-mono text-emerald-700/80">Authorized User: {username.toUpperCase()} | Key Expires in 8 Hours</span>
                  </div>
                </div>

                {/* Simulated e-Office Workspace */}
                {(selectedApp.id === "e-office-ap" || selectedApp.id === "e-office") && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">📁 File Inbox (Draft Folder)</span>
                      <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded-full">
                        {eOfficeFiles.filter(f => f.status === "PENDING").length} Action Required
                      </span>
                    </div>

                    <div className="space-y-2">
                      {eOfficeFiles.map((file) => (
                        <div key={file.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl space-y-2">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <span className="text-[9px] font-mono font-bold text-slate-400">{file.id}</span>
                              <p className="text-xs font-bold text-slate-800 leading-tight">{file.title}</p>
                            </div>
                            <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                              file.urgency === "Immediate" ? "bg-red-100 text-red-800 border border-red-200" :
                              file.urgency === "High" ? "bg-amber-100 text-amber-800 border border-amber-200" :
                              "bg-slate-100 text-slate-600 border border-slate-200"
                            }`}>
                              {file.urgency}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px]">
                            <span className="text-slate-400 font-mono">Received: {file.date}</span>
                            
                            {file.status === "PENDING" ? (
                              <div className="flex gap-1.5">
                                <button 
                                  onClick={() => handleFileAction(file.id, "FORWARDED")}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-bold transition-all cursor-pointer"
                                >
                                  Forward
                                </button>
                                <button 
                                  onClick={() => handleFileAction(file.id, "APPROVED")}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold transition-all cursor-pointer"
                                >
                                  Approve Note
                                </button>
                              </div>
                            ) : (
                              <span className={`font-black uppercase flex items-center gap-1 ${
                                file.status === "APPROVED" ? "text-emerald-600" : "text-blue-600"
                              }`}>
                                <CheckSquare size={12} />
                                {file.status}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Simulated SAP ERP Database */}
                {selectedApp.id.startsWith("sap-") && (
                  <div className="space-y-4">
                    {/* Inner tab switcher */}
                    <div className="flex border-b border-slate-100 text-[11px] gap-3">
                      <button 
                        onClick={() => setActiveTabInsideApp("home")}
                        className={`pb-1.5 font-bold uppercase tracking-wider ${activeTabInsideApp === "home" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-400"}`}
                      >
                        Material Orders
                      </button>
                      <button 
                        onClick={() => setActiveTabInsideApp("billing")}
                        className={`pb-1.5 font-bold uppercase tracking-wider ${activeTabInsideApp === "billing" ? "border-b-2 border-blue-600 text-blue-600" : "text-slate-400"}`}
                      >
                        Cost Center Records
                      </button>
                    </div>

                    {activeTabInsideApp === "home" ? (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-800">Pending Purchase Requisitions (MM-PUR)</h4>
                        <div className="border border-slate-100 rounded-lg overflow-hidden text-[10.5px]">
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[9px] border-b border-slate-100">
                              <tr>
                                <th className="p-2">Req ID</th>
                                <th className="p-2">Material Description</th>
                                <th className="p-2">Cost (INR)</th>
                                <th className="p-2">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-sans">
                              <tr>
                                <td className="p-2 font-mono font-bold text-slate-600">REQ-8012</td>
                                <td className="p-2 text-slate-800">400KV GIS Transformer SF6 Insulating Gas Canisters</td>
                                <td className="p-2 font-mono">14.20 Lakhs</td>
                                <td className="p-2"><span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1 py-0.5 rounded">PENDING APPR</span></td>
                              </tr>
                              <tr>
                                <td className="p-2 font-mono font-bold text-slate-600">REQ-8025</td>
                                <td className="p-2 text-slate-800">OPGW Terminal Fibre Splice Patch Panels</td>
                                <td className="p-2 font-mono">2.85 Lakhs</td>
                                <td className="p-2"><span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded">RELEASED</span></td>
                              </tr>
                              <tr>
                                <td className="p-2 font-mono font-bold text-slate-600">REQ-8031</td>
                                <td className="p-2 text-slate-800">Galvanized Steel Towers replacement lattice parts</td>
                                <td className="p-2 font-mono">18.40 Lakhs</td>
                                <td className="p-2"><span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1 py-0.5 rounded">PENDING APPR</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl space-y-2.5 text-xs text-slate-600">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <span className="font-bold text-slate-800">Project Asset Accounting</span>
                          <span className="font-mono bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded">COST CENTRE 401</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-[11px]">
                          <div>
                            <span className="text-slate-400 block">Erection Budget allocation:</span>
                            <strong className="text-slate-900 text-sm font-mono">₹45.50 Crores</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Progressive billings disbursed:</span>
                            <strong className="text-slate-900 text-sm font-mono">₹38.20 Crores</strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Simulated SLDC SCADA Grid Control */}
                {selectedApp.id.startsWith("sldc") && (
                  <div className="space-y-4 font-mono text-xs">
                    <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
                      <div className="p-2.5 bg-slate-900 text-white rounded-lg space-y-1">
                        <span className="text-[9px] text-slate-400 block uppercase">Grid Frequency</span>
                        <div className="flex items-baseline gap-1">
                          <strong className="text-base text-emerald-400">{sldcFrequency.toFixed(2)}</strong>
                          <span className="text-[9px] text-slate-400">Hz</span>
                        </div>
                        <span className="text-[8px] text-emerald-400 animate-pulse block">● STEADY STATE</span>
                      </div>

                      <div className="p-2.5 bg-slate-900 text-white rounded-lg space-y-1">
                        <span className="text-[9px] text-slate-400 block uppercase">Total Coincident Demand</span>
                        <div className="flex items-baseline gap-1">
                          <strong className="text-base text-amber-400">{sldcDemand}</strong>
                          <span className="text-[9px] text-slate-400">MW</span>
                        </div>
                        <span className="text-[8px] text-amber-400 animate-pulse block">● SYSTEM PEAK</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold border-b border-slate-100 pb-1">
                        <span>Transmission Line Telemetry</span>
                        <span>Active Load</span>
                      </div>

                      <div className="space-y-2">
                        {sldcLines.map(line => (
                          <div key={line.id} className="p-2 bg-slate-50/50 rounded border border-slate-100 space-y-1">
                            <div className="flex justify-between items-center text-[10.5px]">
                              <span className="font-sans font-bold text-slate-800">{line.name}</span>
                              <span className={`text-[10px] font-bold ${line.status === "CRITICAL" ? "text-red-600" : "text-slate-600"}`}>
                                {line.load}% Capacity
                              </span>
                            </div>
                            
                            {/* Visual Progress Bar */}
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${line.status === "CRITICAL" ? "bg-red-500 animate-pulse" : "bg-blue-600"}`} 
                                style={{ width: `${line.load}%` }}
                              ></div>
                            </div>

                            {line.status === "CRITICAL" && (
                              <div className="flex items-center justify-between pt-1">
                                <span className="text-[8px] text-red-500 font-bold block uppercase font-mono">⚠️ OVERLOAD RISK: REDUCE THERMAL DISPATCH</span>
                                <button 
                                  onClick={() => handleSldcTweak(line.id, 15)} 
                                  className="text-[9px] bg-red-600 text-white font-sans px-1.5 py-0.5 rounded font-bold hover:bg-red-700 transition-all cursor-pointer"
                                >
                                  Shed 15%
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* For general other apps */}
                {!selectedApp.id.startsWith("sap-") && !selectedApp.id.startsWith("sldc") && selectedApp.id !== "e-office-ap" && selectedApp.id !== "e-office" && (
                  <div className="py-6 text-center space-y-3">
                    <div className="w-12 h-12 bg-blue-50 text-[#1d70b8] rounded-full flex items-center justify-center mx-auto border border-blue-100">
                      <Globe size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-800">SSO Session Token Authenticated Successfully</p>
                      <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto">
                        In an active intranet environment, your secure browser agent is authorized for direct, encrypted access.
                      </p>
                      <span className="font-mono text-[9px] text-[#1d70b8] font-bold bg-slate-50 px-2 py-1 rounded border border-slate-100 block mt-2">
                        SSL SECURE CHANNEL: https://{selectedApp.id}.aptransco.gov.in
                      </span>
                    </div>
                  </div>
                )}

                {/* Log out option inside modal */}
                <div className="pt-4 border-t border-slate-100/80 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setLoginState("idle");
                      setUsername("");
                      setPassword("");
                    }}
                    className="text-[11px] font-bold text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded transition-all cursor-pointer"
                  >
                    Terminate Authorized Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
