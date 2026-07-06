import React, { useState, useEffect } from "react";
import { NOTICES } from "../data";
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  Search, 
  Award, 
  Briefcase, 
  BookOpen, 
  UserCheck, 
  ExternalLink, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  HelpCircle,
  Wrench,
  Clock,
  MapPin,
  ChevronRight
} from "lucide-react";

interface PageProps {
  language: "EN" | "TE";
  isHighContrast: boolean;
  fontScale: number;
  viewportMode?: "desktop" | "tablet" | "mobile";
  websitePage?: string;
}

export const NoticesCareersPage: React.FC<PageProps> = ({ 
  language, 
  isHighContrast, 
  fontScale,
  viewportMode,
  websitePage = ""
}) => {
  const [activeTab, setActiveTab] = useState<"positions" | "requirements" | "notifications">("positions");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | "Notification" | "Office Order" | "Press Release" | "Circular">("all");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyState, setApplyState] = useState<"idle" | "submitting" | "success">("idle");
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    qualification: "",
    gateScore: "",
    declaration: false
  });

  // Handle Hash anchor mapping on mount or websitePage virtual path changes
  useEffect(() => {
    const virtualHash = websitePage.includes("#") ? websitePage.split("#")[1] : "";
    const hash = virtualHash || (typeof window !== "undefined" ? window.location.hash.replace("#", "") : "");
    if (hash === "careers") {
      setActiveTab("positions");
    } else if (hash === "requirements") {
      setActiveTab("requirements");
    } else if (hash === "notices" || hash === "press") {
      setActiveTab("notifications");
    }
  }, [websitePage]);

  const t = {
    EN: {
      badge: "Human Resources & Recruitment Command",
      title: "Careers & Recruitments",
      subTitle: "Build India's Premier Power Transmission Grid with APTRANSCO",
      desc: "Join an elite engineering workforce dedicated to maintaining the 400kV/220kV transmission systems of Andhra Pradesh. Explore current job postings, statutory eligibility criteria, and administrative guidelines.",
      tabPositions: "Active Job Openings",
      tabRequirements: "Recruitment Requirements",
      tabNotifications: "Circulars & Notifications",
      searchPlaceholder: "Search circulars, notifications or order titles...",
      allCategories: "All Bulletins",
      notification: "Recruitment Notifications",
      officeOrder: "Office Orders",
      pressRelease: "Press Releases",
      circular: "Technical Circulars",
      positionsHeader: "Current Professional Vacancies",
      requirementsHeader: "Statutory Eligibility & Selection Specifications",
      qualification: "Educational Qualification",
      ageLimit: "Age Criteria & Relaxations",
      selectionProcess: "Syllabus & Evaluation Process",
      applyNow: "Submit Online Application",
      downloadSyllabus: "Download Syllabus PDF",
      downloadAd: "View Recruitment Advertisement"
    },
    TE: {
      badge: "మానవ వనరులు మరియు నియామక విభాగం",
      title: "ఉద్యోగాలు & నియామకాలు",
      subTitle: "అపరాన్స్కోతో కలిసి దేశంలోనే అత్యుత్తమ విద్యుత్ ప్రసార గ్రిడ్‌ను నిర్మించండి",
      desc: "ఆంధ్రప్రదేశ్ 400kV/220kV ప్రసార వ్యవస్థలను నిర్వహించడానికి అంకితమైన ప్రతిష్టాత్మక ఇంజనీరింగ్ విభాగంలో చేరండి. ప్రస్తుత ఉద్యోగ ఖాళీలు, అర్హత ప్రమాణాలు మరియు అధికారిక మార్గదర్శకాలను ఇక్కడ అన్వేషించండి.",
      tabPositions: "క్రియాశీల ఉద్యోగ ఖాళీలు",
      tabRequirements: "నియామక అర్హతలు",
      tabNotifications: "సర్క్యులర్లు & అధికారిక నోటీసులు",
      searchPlaceholder: "సర్క్యులర్లు లేదా నోటీసుల శీర్షికను శోధించండి...",
      allCategories: "అన్ని బులెటిన్లు",
      notification: "నియామక నోటీసులు",
      officeOrder: "కార్యాలయ ఉత్తర్వులు",
      pressRelease: "పత్రికా ప్రకటనలు",
      circular: "సాంకేతిక సర్క్యులర్లు",
      positionsHeader: "ప్రస్తుత ప్రొఫెషనల్ ఖాళీలు",
      requirementsHeader: "అధికారిక అర్హత మరియు ఎంపిక విధానం",
      qualification: "విద్యా అర్హత",
      ageLimit: "వయోపరిమితి మరియు సడలింపులు",
      selectionProcess: "సిలబస్ మరియు మూల్యాంకన ప్రక్రియ",
      applyNow: "ఆన్‌లైన్ దరఖాస్తును సమర్పించండి",
      downloadSyllabus: "సిలబస్ PDF డౌన్‌లోడ్ చేసుకోండి",
      downloadAd: "వివరణాత్మక ప్రకటనను చూడండి"
    }
  }[language];

  const JOBS = [
    {
      id: "ae-elec",
      title: language === "EN" ? "Assistant Engineer (Electrical)" : "అసిస్టెంట్ ఇంజనీర్ (ఎలక్ట్రికల్)",
      vacancies: 64,
      scaleOfPay: "Rs. 64,295 - 1,19,485",
      type: "Regular / Direct Recruitment",
      dept: "Substation Construction & Grid Management",
      desc: language === "EN" 
        ? "Responsible for supervision of 400/220/132 kV power substation operations, high-voltage transmission line maintenance, protective relay coordination, and commissioning grid augmentation projects."
        : "400/220/132 కేవీ పవర్ సబ్‌స్టేషన్ కార్యకలాపాల పర్యవేక్షణ, అధిక వోల్టేజ్ ట్రాన్స్‌మిషన్ లైన్ల నిర్వహణ మరియు గ్రిడ్ ప్రాజెక్టుల కమిషనింగ్‌కు బాధ్యత వహిస్తారు.",
      qualifications: "Must possess B.E./B.Tech/A.M.I.E. in Electrical Engineering or Electrical & Electronics Engineering from a recognized University in India established or incorporated by or under a Central Act, State Act, or UGC Approved Institution.",
      ageLimit: "18 to 42 years as of 01-07-2026. SC/ST/BC candidates get 5 years relaxation. PwD candidates get 10 years relaxation.",
      keyInfo: [
        "Written Examination weightage: 100% (No Interview).",
        "Part A: Core Electrical Engineering discipline (70 Marks).",
        "Part B: General Awareness, Analytical Aptitude, and Numerical Ability (30 Marks).",
        "Mock tests and syllabus schemes are available via PRTI training resource portal."
      ]
    },
    {
      id: "ae-civil",
      title: language === "EN" ? "Assistant Engineer (Civil)" : "అసిస్టెంట్ ఇంజనీర్ (సివిల్)",
      vacancies: 18,
      scaleOfPay: "Rs. 64,295 - 1,19,485",
      type: "Regular / Direct Recruitment",
      dept: "Civil Construction & Tower Design",
      desc: language === "EN"
        ? "Responsible for civil foundations of heavy power pylon structures, architectural layout designing of GIS substations, structural strength evaluations, and bidding contract management."
        : "భారీ విద్యుత్ టవర్ నిర్మాణాల సివిల్ పునాదులు, జీఐఎస్ సబ్‌స్టేషన్ల లేఅవుట్ డిజైనింగ్ మరియు నిర్మాణాత్మక మూల్యాంకనాలకు బాధ్యత వహిస్తారు.",
      qualifications: "Must possess B.E./B.Tech in Civil Engineering from a recognized University in India approved by AICTE/UGC.",
      ageLimit: "18 to 42 years as of 01-07-2026. Standard reservation quotas apply.",
      keyInfo: [
        "Syllabus focuses heavily on RCC structure design, soil mechanics, foundations engineering, and structural analysis.",
        "Posting covers field construction offices across Visakhapatnam, Kadapa, and Vijayawada zones."
      ]
    },
    {
      id: "sub-eng-elec",
      title: language === "EN" ? "Sub-Engineer (Electrical)" : "సబ్ ఇంజనీర్ (ఎలక్ట్రికల్)",
      vacancies: 35,
      scaleOfPay: "Rs. 45,210 - 88,410",
      type: "Regular / Direct Recruitment",
      dept: "Substation Operations & Maintenance",
      desc: language === "EN"
        ? "Supervises shift operators, monitors load dispatch trends, manages line clearance permits, troubleshoots feeder relays, and ensures overall industrial safety protocols at load centers."
        : "షిఫ్ట్ ఆపరేటర్లను పర్యవేక్షిస్తారు, లోడ్ డిస్పాచ్ పోకడలను పర్యవేక్షిస్తారు మరియు లైన్ క్లియరెన్స్ అనుమతులను నిర్వహిస్తారు.",
      qualifications: "Must possess a Diploma in Electrical Engineering / Electrical & Electronics Engineering from the State Board of Technical Education and Training, AP, or equivalent.",
      ageLimit: "18 to 42 years as of 01-07-2026. Age relaxations apply for reserved community classes.",
      keyInfo: [
        "Written exam comprising 100 Objective Type multiple-choice questions.",
        "Section A: Diploma syllabus in Electrical Engineering (80 questions).",
        "Section B: Analytical ability, General Knowledge & English grammar (20 questions)."
      ]
    },
    {
      id: "jr-asst",
      title: language === "EN" ? "Junior Assistant (Administration)" : "జూనియర్ అసిస్టెంట్ (పరిపాలన)",
      vacancies: 12,
      scaleOfPay: "Rs. 38,400 - 72,110",
      type: "Regular / Non-Technical",
      dept: "HR, Procurement & Corporate Office",
      desc: language === "EN"
        ? "Handles administrative documentation, service ledger management, filing tender submissions, coordinating board correspondences, and processing billing claims."
        : "పరిపాలనా పత్రాల నిర్వహణ, సేవా లెడ్జర్ నిర్వహణ మరియు టెండర్ పత్రాల దాఖలును నిర్వహిస్తారు.",
      qualifications: "Must hold a Bachelor's Degree in any discipline from a recognized University, along with a certified Diploma/Certificate in Computer Applications from an authorized agency.",
      ageLimit: "18 to 42 years as of 01-07-2026.",
      keyInfo: [
        "Computer proficiency test (CPT) is mandatory for ultimate qualification.",
        "Written exam testing General Studies, English Grammar, and administrative principles."
      ]
    }
  ];

  // Filtering Notices
  const filteredNotices = NOTICES.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" ? true : notice.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplyState("submitting");
    setTimeout(() => {
      setApplyState("success");
    }, 1200);
  };

  const handleApplyClick = (jobId: string) => {
    setSelectedJob(jobId);
    setApplicationForm({
      fullName: "",
      email: "",
      phone: "",
      qualification: "",
      gateScore: "",
      declaration: false
    });
    setApplyState("idle");
    setShowApplyModal(true);
  };

  return (
    <div className="animate-fade-in w-full select-none">
      {/* Immersive Power Grid Banner Hero */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100 scale-100 transition-transform duration-700"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=1600')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
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
          <span className="text-xs md:text-sm font-mono uppercase text-cyan-400 block tracking-wider font-bold">
            {t.subTitle}
          </span>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-3xl drop-shadow-sm" style={{ fontSize: `${14 * fontScale}px` }}>
            {t.desc}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-10">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("positions")}
            className={`px-4 py-3 font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "positions"
                ? "border-cyan-500 text-cyan-600 font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.tabPositions}
          </button>
          <button
            onClick={() => setActiveTab("requirements")}
            className={`px-4 py-3 font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "requirements"
                ? "border-cyan-500 text-cyan-600 font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.tabRequirements}
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-3 font-bold text-xs md:text-sm uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === "notifications"
                ? "border-cyan-500 text-cyan-600 font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.tabNotifications}
          </button>
        </div>

        {/* Tab 1: Active Job Openings */}
        {activeTab === "positions" && (
          <div id="careers" className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2 border-slate-100">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5" style={{ fontSize: `${16 * fontScale}px` }}>
                <Briefcase size={16} className="text-cyan-500" />
                {t.positionsHeader}
              </h3>
              <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-600 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                FY 2026 Recruitment Window Open
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {JOBS.map((job) => (
                <div 
                  key={job.id} 
                  className={`border p-6 rounded-2xl flex flex-col justify-between transition-all hover:shadow-md hover:border-slate-300 ${
                    isHighContrast 
                      ? "bg-black border-white text-white" 
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 font-mono block">
                          {job.type}
                        </span>
                        <h4 className="text-base md:text-lg font-extrabold text-slate-800 mt-0.5" style={{ fontSize: `${16 * fontScale}px` }}>
                          {job.title}
                        </h4>
                      </div>
                      <span className="shrink-0 text-xs font-mono font-black bg-cyan-500/10 text-cyan-600 px-2.5 py-1 rounded">
                        {job.vacancies} {language === "EN" ? "Vacancies" : "ఖాళీలు"}
                      </span>
                    </div>

                    <div className={`p-3 rounded-lg border text-xs flex justify-between items-center ${
                      isHighContrast ? "bg-stone-900 border-white text-white" : "bg-slate-50 border-slate-100"
                    }`}>
                      <span className="text-slate-500 font-medium">{language === "EN" ? "Scale of Pay" : "వేతన శ్రేణి"}:</span>
                      <strong className="font-mono text-slate-800 font-bold">{job.scaleOfPay}</strong>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                        {language === "EN" ? "Section / Domain" : "విభాగం"}: <span className="text-slate-600 font-semibold">{job.dept}</span>
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {job.desc}
                      </p>
                    </div>

                    <div className="border-t pt-3 mt-4 space-y-2">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        {language === "EN" ? "Essential Qualification" : "కనీస విద్యార్హత"}
                      </h5>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50/50 p-2.5 rounded border border-slate-100">
                        {job.qualifications}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-5 mt-5 border-t border-slate-100">
                    <button
                      onClick={() => handleApplyClick(job.id)}
                      className={`flex-1 text-center py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                        isHighContrast
                          ? "bg-white text-black hover:bg-amber-400 font-black"
                          : "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
                      }`}
                    >
                      {t.applyNow}
                    </button>
                    <button
                      onClick={() => alert(`Downloading syllabus & pattern schema for ${job.title}...`)}
                      className="p-2.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300 transition-all cursor-pointer bg-white"
                      title={t.downloadSyllabus}
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Detailed Requirements */}
        {activeTab === "requirements" && (
          <div id="requirements" className="space-y-8">
            <div className="border-b pb-2 border-slate-100">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5" style={{ fontSize: `${16 * fontScale}px` }}>
                <Award size={16} className="text-cyan-500" />
                {t.requirementsHeader}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Requirements and quotas */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Educational Credentials */}
                <div className={`p-6 rounded-2xl border space-y-3 ${
                  isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
                }`}>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                    <BookOpen size={16} className="text-cyan-500" />
                    {t.qualification}
                  </h4>
                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2.5 leading-relaxed font-sans">
                    <li>
                      <strong>Academic Equivalency:</strong> Degrees obtained through Distance Education mode from any university not recognized by Distance Education Council (DEC), AICTE, or UGC will not be accepted.
                    </li>
                    <li>
                      <strong>Engineering Disciplines:</strong> Candidates applying for AE (Electrical) must hold credentials in Electrical, Electrical &amp; Electronics, Power Engineering, or equivalent. AE (Civil) must hold a Civil Engineering specialty.
                    </li>
                    <li>
                      <strong>Minimum Marks:</strong> Minimum aggregate marks in the qualifying B.E./B.Tech degree must be 60% (55% for reserved classes, and pass marks for SC/ST).
                    </li>
                  </ul>
                </div>

                {/* 2. Age Limits */}
                <div className={`p-6 rounded-2xl border space-y-3 ${
                  isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
                }`}>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                    <Clock size={16} className="text-amber-500" />
                    {t.ageLimit}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left text-slate-500 border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 font-bold text-slate-800">
                          <th className="py-2 pr-4">Category</th>
                          <th className="py-2 px-4">Upper Age Limit</th>
                          <th className="py-2 pl-4">Age Relaxation Period</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        <tr>
                          <td className="py-3 pr-4 font-bold text-slate-700">General Category (OC)</td>
                          <td className="py-3 px-4">42 Years</td>
                          <td className="py-3 pl-4 text-slate-400">Nil</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-bold text-slate-700">SC / ST / BC Classes</td>
                          <td className="py-3 px-4">47 Years</td>
                          <td className="py-3 pl-4 text-emerald-600 font-bold">+5 Years</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-bold text-slate-700">Physically Handicapped (PwD)</td>
                          <td className="py-3 px-4">52 Years</td>
                          <td className="py-3 pl-4 text-emerald-600 font-bold">+10 Years</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-bold text-slate-700">Ex-Servicemen</td>
                          <td className="py-3 px-4">Varies</td>
                          <td className="py-3 pl-4 text-slate-600">Length of active service plus 3 years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Syllabus and Evaluation */}
                <div className={`p-6 rounded-2xl border space-y-3 ${
                  isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
                }`}>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                    <UserCheck size={16} className="text-cyan-500" />
                    {t.selectionProcess}
                  </h4>
                  <div className="space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      Selection is conducted strictly via a State-Level OMR/Computer-Based Written Examination. There are no oral interviews or physical testing parameters.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 border p-4 rounded-xl text-xs space-y-2 font-sans">
                        <strong className="text-slate-800 block border-b pb-1">Part A: Core Syllabus (70 Marks)</strong>
                        <ul className="list-disc pl-4 text-slate-600 space-y-1">
                          <li>Power Electronics &amp; Drives</li>
                          <li>Control Systems &amp; Relays</li>
                          <li>Power System Stability</li>
                          <li>AC/DC Transmission Line Design</li>
                          <li>Electrical Machines</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 border p-4 rounded-xl text-xs space-y-2 font-sans">
                        <strong className="text-slate-800 block border-b pb-1">Part B: General Aptitude (30 Marks)</strong>
                        <ul className="list-disc pl-4 text-slate-600 space-y-1">
                          <li>Quantitative Aptitude</li>
                          <li>Logical Reasoning &amp; Spatial Ability</li>
                          <li>Data Interpretation (DI)</li>
                          <li>General Knowledge &amp; Current Affairs</li>
                          <li>AP State Bifurcation &amp; Grid History</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Fees and helpful tips */}
              <div className="space-y-6">
                
                {/* Registration Checklist */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
                }`}>
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Application Instructions
                  </h4>
                  <div className="space-y-3 font-sans text-xs text-slate-600 leading-relaxed">
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 bg-cyan-100 text-cyan-800 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">
                        1
                      </div>
                      <p>Pay application processing and examination fee of Rs. 350 + Rs. 150 (SC/ST/BC exempted from exam fee).</p>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 bg-cyan-100 text-cyan-800 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">
                        2
                      </div>
                      <p>Generate Journal Number and register active mobile number and email.</p>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 bg-cyan-100 text-cyan-800 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">
                        3
                      </div>
                      <p>Upload passport size photo, scanned signature, and B.Tech degree certificates.</p>
                    </div>
                    <div className="flex gap-2.5">
                      <div className="w-5 h-5 bg-cyan-100 text-cyan-800 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px]">
                        4
                      </div>
                      <p>Verify data integrity prior to clicking Final Submission. Post-submission modifications are not allowed.</p>
                    </div>
                  </div>
                </div>

                {/* Important Dates Alert Box */}
                <div className={`p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-3 ${
                  isHighContrast ? "bg-stone-900 border-white text-white" : ""
                }`}>
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-amber-600" />
                    Recruitment Schedules
                  </h4>
                  <div className="space-y-2 text-xs font-sans text-slate-600">
                    <div className="flex justify-between">
                      <span>Online applications start:</span>
                      <strong className="text-slate-800 font-bold">15-07-2026</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Last date to submit fees:</span>
                      <strong className="text-slate-800 font-bold text-rose-600">04-08-2026</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Written Examination:</span>
                      <strong className="text-slate-800 font-bold">14-09-2026</strong>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Tab 3: Bulletins & Circulars */}
        {activeTab === "notifications" && (
          <div id="press" className="space-y-6">
            <div id="notices" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 border-slate-100">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-1.5" style={{ fontSize: `${16 * fontScale}px` }}>
                <FileText size={16} className="text-cyan-500" />
                {t.tabNotifications}
              </h3>
              
              {/* Category selector */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { value: "all", label: t.allCategories },
                  { value: "Notification", label: "Recruitments" },
                  { value: "Office Order", label: "Office Orders" },
                  { value: "Press Release", label: "Press Releases" },
                  { value: "Circular", label: "Circulars" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategoryFilter(cat.value as any)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      categoryFilter === cat.value
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Search Input */}
            <div className="relative max-w-md w-full">
              <Search size={14} className="absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2.5 w-full border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 bg-slate-50/50"
              />
            </div>

            {/* List of circulars */}
            <div className="space-y-3">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <div 
                    key={notice.id} 
                    className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all hover:bg-slate-50/50 ${
                      isHighContrast 
                        ? "bg-black border-white text-white" 
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600 shrink-0 mt-0.5">
                        <FileText size={16} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-mono font-black text-cyan-600 uppercase bg-cyan-50 border border-cyan-100 px-1.5 py-0.5 rounded">
                            {notice.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono font-semibold">
                            Dept: {notice.department}
                          </span>
                          {notice.isNew && (
                            <span className="bg-red-500 text-white font-bold text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded animate-pulse">
                              NEW
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs md:text-sm font-bold text-slate-800 hover:text-cyan-600 transition-colors">
                          {notice.title}
                        </h4>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            Published: {notice.publishDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Downloading formal document: ${notice.title}...`)}
                      className="text-xs font-bold text-cyan-600 hover:text-cyan-500 flex items-center gap-1 border border-cyan-100 hover:bg-cyan-50/30 px-3.5 py-2 rounded-lg transition-all self-start md:self-auto cursor-pointer"
                    >
                      <Download size={13} />
                      <span>Download ({notice.docSize})</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs italic bg-slate-50 rounded-xl border border-slate-100">
                  No active bulletins or circulars found matching current selection.
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Online Application Modal Form Simulator */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-slate-950 text-white p-5 relative">
              <span className="text-[9px] font-bold tracking-widest uppercase text-cyan-300">
                APTRANSCO Direct Online Recruitment Portal
              </span>
              <h3 className="text-base font-extrabold mt-1">
                Apply for: {JOBS.find(j => j.id === selectedJob)?.title || "Professional Vacancy"}
              </h3>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            {applyState === "success" ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 text-emerald-500 rounded-full flex items-center justify-center font-bold text-xl mx-auto shadow-inner">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-slate-800">
                    Application Submitted Successfully!
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Your simulated application was registered. Journal number: <strong className="font-mono text-slate-900 font-black">APT2026-94819</strong> has been sent to your simulated email.
                  </p>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs transition-all inline-block cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="p-6 space-y-4 text-xs text-slate-700">
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-400">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Candidate's legal name"
                    value={applicationForm.fullName}
                    onChange={(e) => setApplicationForm({...applicationForm, fullName: e.target.value})}
                    className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-slate-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. candidate@domain.com"
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm({...applicationForm, phone: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">Qualifying Degree</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., B.Tech EEE (68.4% Aggregate)"
                      value={applicationForm.qualification}
                      onChange={(e) => setApplicationForm({...applicationForm, qualification: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-black uppercase text-slate-400">GATE 2026 Score (Optional)</label>
                    <input
                      type="text"
                      placeholder="Valid score if applicable"
                      value={applicationForm.gateScore}
                      onChange={(e) => setApplicationForm({...applicationForm, gateScore: e.target.value})}
                      className="w-full border border-slate-200 rounded-lg p-2.5 outline-none focus:border-blue-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-blue-900 uppercase tracking-wide text-[9px] flex items-center gap-1">
                    <ShieldCheck size={12} className="text-blue-600" />
                    Statutory Attestation Statement
                  </h5>
                  <p className="text-[10px] text-blue-800/80 leading-relaxed font-sans">
                    I solemnly declare that all academic credentials, age proofs, and community certificates supplied during registration conform to guidelines. If any fraud is detected, APTRANSCO reserves direct rights to invoke legal dismissal.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    required
                    id="declaration-checkbox"
                    checked={applicationForm.declaration}
                    onChange={(e) => setApplicationForm({...applicationForm, declaration: e.target.checked})}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="declaration-checkbox" className="text-[10px] text-slate-500 font-medium">
                    I attest that I have read the detailed notification instructions and understand my entries are binding.
                  </label>
                </div>

                {/* Submit footer */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-500 font-bold rounded-lg hover:bg-slate-200 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applyState === "submitting"}
                    className="px-5 py-2 bg-cyan-500 text-slate-950 font-black rounded-lg hover:bg-cyan-400 transition-all cursor-pointer shadow-xs"
                  >
                    {applyState === "submitting" ? "Submitting Registration..." : "Submit Registration"}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
