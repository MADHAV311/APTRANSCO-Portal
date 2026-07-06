import React, { useState } from "react";
import { DEPARTMENTS, OFFICE_DIRECTORY, NOTICES } from "../data";
import { Mail, Phone, MapPin, Send, AlertTriangle, ShieldCheck, Download, Search, CheckCircle, HelpCircle, Compass, Activity, RefreshCw, FileText } from "lucide-react";

interface SubPageProps {
  setActivePage: (url: string) => void;
  language: "EN" | "TE";
  isHighContrast: boolean;
  fontScale: number;
  viewportMode?: "desktop" | "tablet" | "mobile";
}

/* 1. Telecom & IT Department sub-page */
export const TelecomITPage: React.FC<SubPageProps> = ({ setActivePage, language, isHighContrast }) => {
  const dept = DEPARTMENTS[0]; // Telecom & IT data

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
                backgroundImage: "url('https://res.cloudinary.com/tterhclk/image/upload/f_auto,q_auto/Image_n3hxa1')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
            Engineering Wings
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">{dept.name}</h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-sm">
            {dept.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Key Responsibilities */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Operational Domain & Responsibilities</h3>
            <ul className="space-y-3">
              {dept.keyResponsibilities.map((resp, i) => (
                <li key={i} className="flex gap-2.5 items-start text-xs text-slate-600 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0">{i+1}</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Strategic Digital Initiatives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dept.currentInitiatives.map((init, idx) => (
                <div key={idx} className="border border-slate-100 p-4 rounded-lg bg-slate-50/50 space-y-1">
                  <span className="text-[9px] uppercase font-bold text-blue-700 bg-blue-100 px-1.5 rounded">INITIATIVE #{idx+1}</span>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">{init}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Infrastructure Highlights sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
              <ShieldCheck size={16} />
              Cyber Security Operations Center
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              APTRANSCO administers a dedicated Cyber Security Operations Center (CSOC) linked to the national CERT-In grid network, safeguarding state SCADA and ERP databases from zero-day threats.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl text-slate-700">
            <span className="text-[10px] uppercase font-extrabold text-blue-800 block">Department Head</span>
            <p className="text-xs font-bold text-slate-950 mt-1">{dept.headOfDepartment}</p>
            <p className="text-[11px] text-slate-500 mt-1">APTRANSCO Corporate Office, Vijayawada.</p>
            <button 
              onClick={() => setActivePage("/contact")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 mt-3 block"
            >
              View Directory Coordinates →
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

/* 2. Contact & Feedback Page, with a Live Interactive Grievance Form */
export const ContactPage: React.FC<SubPageProps> = ({ isHighContrast }) => {
  const [feedback, setFeedback] = useState({ name: "", email: "", phone: "", circle: "Corporate Office", message: "" });
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.name || !feedback.message) {
      alert("Please fill in the required fields.");
      return;
    }
    const mockId = "APT-GRIEV-" + Math.floor(100000 + Math.random() * 900000);
    setTicketId(mockId);
  };

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
                backgroundImage: "url('https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
            Corporate Directory
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">Contact &amp; Citizen Feedback</h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-sm">
            Connect directly with regional superintending engineers or file statutory service grievances before administrative desks.
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Feedback form */}
        <div id="feedback" className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Online Grievance Filing Desk</h3>
          <p className="text-xs text-slate-500">File public grid concerns, landowner crop compensation issues, or general inquiries.</p>

          {ticketId ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center space-y-4">
              <CheckCircle size={32} className="text-emerald-600 mx-auto" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">Grievance Registered Successfully</h4>
                <p className="text-[11px] text-slate-500 mt-1">Your secure APTRANSCO tracking token is issued below.</p>
              </div>
              <div className="font-mono text-sm font-bold text-slate-950 bg-white border border-slate-200 p-2.5 rounded-lg inline-block shadow-xs">
                {ticketId}
              </div>
              <button 
                onClick={() => { setTicketId(null); setFeedback({ name: "", email: "", phone: "", circle: "Corporate Office", message: "" }); }}
                className="block text-xs font-bold text-blue-600 hover:text-blue-800 mx-auto"
              >
                File Another Grievance
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={feedback.name}
                    onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Email Address</label>
                  <input 
                    type="email" 
                    value={feedback.email}
                    onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    value={feedback.phone}
                    onChange={(e) => setFeedback({ ...feedback, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-600">Transmission Circle Jurisdiction</label>
                  <select 
                    value={feedback.circle}
                    onChange={(e) => setFeedback({ ...feedback, circle: e.target.value })}
                    className="w-full border border-slate-300 rounded bg-white px-2 py-2 outline-none focus:border-blue-500"
                  >
                    <option value="Corporate Office">Corporate Office, Vijayawada</option>
                    <option value="Vijayawada">Vijayawada Transmission Circle</option>
                    <option value="Visakhapatnam">Visakhapatnam Transmission Circle</option>
                    <option value="Kadapa">Kadapa Transmission Circle</option>
                    <option value="Kurnool">Kurnool Transmission Circle</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-600">Grievance / Feedback Message *</label>
                <textarea 
                  required
                  rows={4}
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  placeholder="Describe your issue with grid clearances or land compensations"
                  className="w-full border border-slate-300 rounded px-3 py-2 outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Send size={14} />
                Submit Grievance File
              </button>
            </form>
          )}
        </div>

        {/* Corporate offices directories */}
        <div id="locations" className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">State Head Office</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              <strong>Transmission Corporation of Andhra Pradesh Limited (APTRANSCO)</strong>
              <br />
              Vidyut Soudha, Gunadala, Vijayawada,
              <br />
              Andhra Pradesh - 520004.
            </p>
            <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
              <div className="flex gap-2 items-center text-slate-600">
                <Phone size={14} className="text-amber-500 shrink-0" />
                <span>EPABX Line: +91 866-2429201</span>
              </div>
              <div className="flex gap-2 items-center text-slate-600">
                <Mail size={14} className="text-amber-500 shrink-0" />
                <span>cmd@aptransco.gov.in</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl text-slate-700 space-y-2 text-xs">
            <h4 className="font-bold uppercase text-[10px] tracking-wider text-slate-400">Escalation Desk</h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              If your circle-wise grievance remains unresolved after 15 business days, you may formally address the Superintending Engineer (OM) of your respective transmission district.
            </p>
          </div>
        </div>

      </div>
      </div>
    </div>
  );
};

/* 3. Document Library & Downloads Page */
export const DownloadsPage: React.FC<SubPageProps> = ({ isHighContrast, language, fontScale }) => {
  const [searchDoc, setSearchDoc] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const documentsList = [
    { 
      name: language === "EN" ? "APTRANSCO Grid Code Safety manual and clearances guidelines" : "ఏపీట్రాన్స్కో గ్రిడ్ కోడ్ భద్రతా నియమావళి మరియు క్లియరెన్స్ మార్గదర్శకాలు", 
      size: "2.4 MB", 
      type: "PDF Document", 
      category: "safety",
      link: "/grid-code-2026.pdf" 
    },
    { 
      name: language === "EN" ? "Andhra Pradesh Electricity Regulatory Commission (APERC) Wheeling charges tariff filing proposal" : "ఆంధ్రప్రదేశ్ విద్యుత్ నియంత్రణ మండలి (APERC) వీలింగ్ ఛార్జీల టారిఫ్ ఫైలింగ్ ప్రతిపాదన", 
      size: "4.1 MB", 
      type: "PDF Document", 
      category: "regulatory",
      link: "/aperc-wheeling.pdf" 
    },
    { 
      name: language === "EN" ? "Application form for vendor commercial registration on e-procurement portal" : "ఇ-ప్రొక్యూర్మెంట్ పోర్టల్‌లో వెండర్ కమర్షియల్ రిజిస్ట్రేషన్ కోసం దరఖాస్తు ఫారమ్", 
      size: "640 KB", 
      type: "PDF Document", 
      category: "vendors",
      link: "/vendor-reg.pdf" 
    },
    { 
      name: language === "EN" ? "Standard design layout blueprints for conventional 132/33kV substations" : "సాంప్రదాయ 132/33kV సబ్‌స్టేషన్ల కోసం ప్రామాణిక డిజైన్ లేఅవుట్ బ్లూప్రింట్లు", 
      size: "12.8 MB", 
      type: "Technical Blueprint", 
      category: "blueprints",
      link: "/substation-blueprint.pdf" 
    },
    { 
      name: language === "EN" ? "PRTI Training Calendar and safety drill schedules Q3-2026" : "PRTI శిక్షణా క్యాలెండర్ మరియు సేఫ్టీ డ్రిల్ షెడ్యూల్స్ Q3-2026", 
      size: "1.1 MB", 
      type: "Schedule PDF", 
      category: "safety",
      link: "/prti-calendar.pdf" 
    }
  ];

  const categories = [
    { id: "all", label: language === "EN" ? "All Documents" : "అన్ని పత్రాలు" },
    { id: "safety", label: language === "EN" ? "Safety & Training" : "భద్రత & శిక్షణ" },
    { id: "regulatory", label: language === "EN" ? "Regulatory & Tariffs" : "టారిఫ్ & ఫైలింగ్స్" },
    { id: "vendors", label: language === "EN" ? "Vendor Forms" : "వెండర్ ఫారమ్స్" },
    { id: "blueprints", label: language === "EN" ? "Technical Blueprints" : "సాంకేతిక పత్రాలు" },
  ];

  const filteredDocs = documentsList.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchDoc.toLowerCase());
    const matchesCategory = activeCategory === "all" || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
                backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1600')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-400/20 px-2.5 py-1 rounded border border-cyan-400/30 inline-block">
            {language === "EN" ? "Resource Repository" : "వనరుల సేకరణ"}
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
            {language === "EN" ? "Document Library & Downloads" : "పత్రాల సేకరణ & డౌన్‌లోడ్స్"}
          </h2>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-sm" style={{ fontSize: `${14 * fontScale}px` }}>
            {language === "EN" 
              ? "Access and download formal regulatory filings, technical manuals, form templates, and safety schedules." 
              : "అధికారిక టారిఫ్ ఫైలింగ్స్, భద్రతా మాన్యువల్స్, ఫారమ్ టెంప్లేట్లు మరియు శిక్షణా షెడ్యూల్స్‌ను ఇక్కడ డౌన్‌లోడ్ చేసుకోండి."}
          </p>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Search, Categories, and File List */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              {/* Search filter */}
              <div className="relative w-full max-w-md">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={language === "EN" ? "Search document name..." : "పత్రం పేరుతో శోధించండి..."}
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
                  className={`pl-9 pr-3 py-2 w-full border rounded-lg text-xs outline-none focus:border-blue-500 ${
                    isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-300 text-slate-800"
                  }`}
                />
              </div>

              {/* Category selector pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      activeCategory === cat.id
                        ? isHighContrast
                          ? "bg-white text-black border-2 border-white"
                          : "bg-blue-900 text-white shadow-sm"
                        : isHighContrast
                          ? "bg-black text-white border border-stone-700 hover:border-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of files */}
            <div className={`border rounded-xl overflow-hidden shadow-xs divide-y ${
              isHighContrast ? "bg-black border-white divide-stone-800" : "bg-white border-slate-200 divide-slate-100"
            }`}>
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc, i) => (
                  <div key={i} className={`p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                    isHighContrast ? "hover:bg-stone-900" : "hover:bg-slate-50/50"
                  }`}>
                    <div className="space-y-1">
                      <h4 className={`text-xs font-bold leading-snug ${isHighContrast ? "text-white" : "text-slate-800"}`}>
                        {doc.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400">
                        <span className="uppercase font-semibold text-blue-600 dark:text-cyan-400 bg-slate-100 dark:bg-slate-900/60 px-1.5 py-0.5 rounded text-[8px]">
                          {doc.category}
                        </span>
                        <span>•</span>
                        <span>Type: <strong>{doc.type}</strong></span>
                        <span>•</span>
                        <span>Size: <strong>{doc.size}</strong></span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Simulating file download: ${doc.link}`)}
                      className={`shrink-0 inline-flex items-center gap-1 font-bold text-xs px-3.5 py-2 rounded-lg transition-all ${
                        isHighContrast
                          ? "bg-stone-900 hover:bg-white hover:text-black text-white border border-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      <Download size={12} />
                      {language === "EN" ? "Download" : "డౌన్‌లోడ్"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  {language === "EN" ? "No matching documents found." : "ఎటువంటి పత్రాలు కనుగొనబడలేదు."}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Featured Visual Info cards with background photos */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Box 1: Safety & Compliance Standards */}
            <div className={`relative overflow-hidden rounded-2xl border text-white p-6 shadow-sm min-h-[220px] flex flex-col justify-end group ${
              isHighContrast ? "bg-black border-white" : "border-slate-800 bg-slate-950"
            }`}>
              {!isHighContrast && (
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 opacity-80"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent z-10" />
                </>
              )}
              <div className="relative z-20 space-y-2">
                <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                  {language === "EN" ? "Grid Compliance" : "గ్రిడ్ నిబంధనలు"}
                </span>
                <h3 className="text-sm font-black font-display tracking-tight text-white leading-tight">
                  {language === "EN" ? "Statutory Safety Codes" : "భద్రతా ప్రమాణాల కోడ్స్"}
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {language === "EN" 
                    ? "Essential guidelines and official clearance manuals for preventing high-voltage risks and ensuring personnel safety." 
                    : "అధిక వోల్టేజ్ విద్యుత్ ప్రమాదాల నివారణ మరియు సిబ్బంది రక్షణ కోసం అవసరమైన అధికారిక మార్గదర్శకాలు."}
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => alert("Redirecting to certified safety index portal...")}
                    className="text-[10px] font-bold text-amber-300 hover:text-white underline transition-all"
                  >
                    {language === "EN" ? "View Safety Directives →" : "సేఫ్టీ నిబంధనలు చూడండి →"}
                  </button>
                </div>
              </div>
            </div>

            {/* Box 2: Substation CAD Blueprint Registry */}
            <div className={`relative overflow-hidden rounded-2xl border text-white p-6 shadow-sm min-h-[220px] flex flex-col justify-end group ${
              isHighContrast ? "bg-black border-white" : "border-slate-800 bg-slate-950"
            }`}>
              {!isHighContrast && (
                <>
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-105 opacity-80"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=600')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent z-10" />
                </>
              )}
              <div className="relative z-20 space-y-2">
                <span className="text-[9px] uppercase font-bold text-cyan-400 tracking-wider bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded">
                  {language === "EN" ? "Technical CAD Library" : "సాంకేతిక బ్లూప్రింట్లు"}
                </span>
                <h3 className="text-sm font-black font-display tracking-tight text-white leading-tight">
                  {language === "EN" ? "Substation Design Blueprints" : "సబ్‌స్టేషన్ డిజైన్ లేఅవుట్లు"}
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {language === "EN" 
                    ? "Interactive layout guidelines for standard 400kV, 220kV and 132/33kV conventional and Gas Insulated Substations (GIS)." 
                    : "400kV, 220kV మరియు 132/33kV సంప్రదాయ లేదా గ్యాస్ ఇన్సులేటెడ్ సబ్‌స్టేషన్ల లేఅవుట్ మార్గదర్శకాలు."}
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => alert("Accessing secure engineering blueprint CAD server...")}
                    className="text-[10px] font-bold text-cyan-300 hover:text-white underline transition-all"
                  >
                    {language === "EN" ? "Open Engineering Archive →" : "ఇంజనీరింగ్ ఆర్కైవ్స్ →"}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

/* 4. APTRANSCO 404 Error page template */
export const Error404Page: React.FC<SubPageProps> = ({ 
  setActivePage, 
  language, 
  isHighContrast, 
  fontScale,
  viewportMode 
}) => {
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [diagnosticsLog, setDiagnosticsLog] = useState<string[]>([]);
  const [hasRunDiagnostics, setHasRunDiagnostics] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const translations = {
    EN: {
      badge: "High-Fidelity UI Prototype • Utility Template Showcase",
      title: "Automated Path Sensing: 404 Template",
      subTitle: "DESIGN SPECIFICATION: OPEN-CIRCUIT / RESOLUTION ERROR FLOW",
      desc: "This responsive layout demonstrates how APTRANSCO handles unresolved navigation targets. It combines immediate system sensing alarms with direct recovery pathways to minimize operator friction.",
      returnHome: "Return to Grid Core (Home)",
      viewSitemap: "View Digital Sitemap",
      searchPlaceholder: "Search active grid nodes / pages...",
      diagnosticHeader: "Interactive Telemetry Simulator",
      diagnosticRunning: "Running diagnostic sequence...",
      runDiagBtn: "Simulate Line Clearance Scan",
      diagComplete: "Simulation Scan Complete",
      telemetryTitle: "Live Telemetry Status",
      nodeStatus: "NODE: TRIPPED",
      carrierSensing: "CARRIER: DISCONNECTED",
      assistance: "Prototype Design Guidelines",
      assistanceText: "This page incorporates APTRANSCO design tenets: a clear high-contrast signal banner, interactive local diagnostics, and a searchable backup directory of active grid nodes."
    },
    TE: {
      badge: "హై-ఫిడిలిటీ ప్రతిపాదన • యుటిలిటీ టెంప్లేట్ ప్రదర్శన",
      title: "స్వయంచాలక మార్గ గుర్తింపు: 404 టెంప్లేట్",
      subTitle: "డిజైన్ స్పెసిఫికేషన్: ఓపెన్ సర్క్యూట్ విశ్లేషణ ప్రవాహం",
      desc: "ఈ లేఅవుట్ అపరాన్స్కో వెబ్‌సైట్‌లో అందుబాటులో లేని నోడ్‌లను ఎలా నిర్వహిస్తుందో ప్రదర్శిస్తుంది. ఇది గ్రిడ్ టెలిమెట్రీ తనిఖీలను సులభతరం చేస్తుంది.",
      returnHome: "గ్రిడ్ కోర్ (హోమ్) కు తిరిగి వెళ్ళండి",
      viewSitemap: "డిజిటల్ సైట్‌మ్యాప్ చూడండి",
      searchPlaceholder: "యాక్టివ్ గ్రిడ్ నోడ్‌లు / పేజీలను శోధించండి...",
      diagnosticHeader: "ఇంటరాక్టివ్ టెలిమెట్రీ సిమ్యులేటర్",
      diagnosticRunning: "డయాగ్నస్టిక్ సీక్వెన్స్ రన్ అవుతోంది...",
      runDiagBtn: "లైన్ క్లియరెన్స్ స్కాన్ అనుకరించండి",
      diagComplete: "సిమ్యులేషన్ స్కాన్ పూర్తయింది",
      telemetryTitle: "లైవ్ టెలిమెట్రీ స్థితి",
      nodeStatus: "నోడ్: ట్రిప్ చేయబడింది",
      carrierSensing: "క్యారియర్: డిస్‌కనెక్ట్ చేయబడింది",
      assistance: "ప్రోటోటైప్ డిజైన్ మార్గదర్శకాలు",
      assistanceText: "ఈ పేజీ అపరాన్స్కో డిజైన్ నియమాలను కలిగి ఉంటుంది: స్పష్టమైన సిగ్నల్ బ్యానర్, ఇంటరాక్టివ్ డయాగ్నస్టిక్స్ మరియు శోధించదగిన డైరెక్టరీ."
    }
  };

  const t = translations[language] || translations.EN;

  const handleRunDiagnostics = () => {
    setIsRunningDiagnostics(true);
    setDiagnosticsLog([]);
    setHasRunDiagnostics(false);

    const logs = [
      "Initializing prototype carrier scanner...",
      "Sensing signal on simulated frequency 50.00 Hz... OK",
      "Analyzing mock routing headers... FAIL [Route Unresolved]",
      "Applying redundant fallback paths... SUCCESS",
      "Sensing current virtual voltage: 400kV... NORMAL",
      "Simulation complete: Backup channels fully online and verified."
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < logs.length) {
        setDiagnosticsLog(prev => [...prev, logs[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsRunningDiagnostics(false);
        setHasRunDiagnostics(true);
      }
    }, 400);
  };

  const operationalSectors = [
    { name: "Grid Core (Home)", link: "/", icon: <Compass size={14} className="text-amber-500" /> },
    { name: "Web Portals & ERP", link: "/portals", icon: <ShieldCheck size={14} className="text-blue-500" /> },
    { name: "Tenders & Contractor Zone", link: "/tenders", icon: <Download size={14} className="text-emerald-500" /> },
    { name: "Interactive Sitemap", link: "/sitemap", icon: <FileText size={14} className="text-cyan-500" /> },
    { name: "Telecom & IT Department", link: "/telecom-it", icon: <Activity size={14} className="text-violet-500" /> },
    { name: "Grievances & Citizen Contact", link: "/contact", icon: <Mail size={14} className="text-rose-500" /> },
  ];

  const filteredSectors = operationalSectors.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="animate-fade-in w-full pb-16">
      {/* Immersive Power Grid Banner Hero */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100 scale-100 transition-transform duration-700"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1600')" 
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/40 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10 z-10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.12),transparent_60%)] pointer-events-none z-10"></div>
          </>
        )}
        
        <div className="relative z-20 max-w-[1650px] mx-auto px-4 md:px-8 space-y-4">
          <span className="text-[10px] uppercase font-black tracking-widest text-amber-400 bg-amber-400/20 px-2.5 py-1 rounded border border-amber-400/30 inline-block">
            {t.badge}
          </span>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-lg flex items-center justify-center font-bold">
              <AlertTriangle size={20} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              {t.title}
            </h2>
          </div>
          <span className="text-xs md:text-sm font-mono uppercase text-amber-400/90 block tracking-wider font-bold">
            {t.subTitle}
          </span>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-sm">
            {t.desc}
          </p>
        </div>
      </div>

      {/* Main Interactive Diagnostics & Recovery Columns */}
      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10 space-y-6">
        {/* Prototype Context Info Banner */}
        <div className={`p-4 rounded-xl border flex items-start gap-3 ${
          isHighContrast 
            ? "bg-black border-white text-white" 
            : "bg-blue-50/50 border-blue-200 text-blue-900"
        }`}>
          <div className="p-1 rounded bg-blue-100 text-blue-800 shrink-0 mt-0.5">
            <Compass size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950">
              Interactive Prototype Utility Showcase
            </h4>
            <p className="text-xs text-blue-900/85 leading-relaxed mt-1 font-sans">
              This page acts as a high-fidelity design simulation for APTRANSCO's digital grid. It demonstrates automated path sensing, error telemetry logging, and backup routing solutions to maintain system responsiveness during grid circuit disruptions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Automated Grid Diagnostics */}
          <div className="lg:col-span-7 space-y-6">
            <div className={`border p-6 rounded-xl shadow-xs space-y-4 ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-4 border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Activity size={16} className="text-amber-500" />
                  {t.diagnosticHeader}
                </h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 uppercase">
                  Telemetry Active
                </span>
              </div>

              {/* Status Pills Row */}
              <div className="grid grid-cols-3 gap-3">
                <div className={`p-3 rounded-lg border text-center ${
                  isHighContrast ? "bg-stone-900 border-stone-700" : "bg-slate-50 border-slate-100"
                }`}>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Frequency</span>
                  <span className="text-xs font-bold text-emerald-600 font-mono">50.00 Hz</span>
                </div>
                <div className={`p-3 rounded-lg border text-center ${
                  isHighContrast ? "bg-stone-900 border-stone-700" : "bg-slate-50 border-slate-100"
                }`}>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Bus Status</span>
                  <span className="text-xs font-bold text-amber-600 font-mono">TRIPPED</span>
                </div>
                <div className={`p-3 rounded-lg border text-center ${
                  isHighContrast ? "bg-stone-900 border-stone-700" : "bg-slate-50 border-slate-100"
                }`}>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Signal Path</span>
                  <span className="text-xs font-bold text-red-600 font-mono">OPEN CIRCUIT</span>
                </div>
              </div>

              {/* Console logs */}
              <div className="bg-slate-950 text-slate-300 p-4 rounded-lg font-mono text-[11px] leading-relaxed relative min-h-[160px] overflow-hidden flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-slate-500 text-[9px] border-b border-slate-900 pb-2 mb-2">
                    <span>APTRANSCO BUS TERMINAL v3.4</span>
                    <span>ONLINE_LOGS</span>
                  </div>
                  {diagnosticsLog.length === 0 && !hasRunDiagnostics ? (
                    <div className="text-slate-400 italic">
                      [Console idle. Click below to execute diagnostic scans on the current request path.]
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {diagnosticsLog.map((log, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-amber-500 shrink-0">&gt;</span>
                          <span className={log.includes("FAIL") ? "text-red-400 font-bold" : log.includes("OK") || log.includes("STABLE") ? "text-emerald-400" : ""}>{log}</span>
                        </div>
                      ))}
                      {isRunningDiagnostics && (
                        <div className="flex items-center gap-2 text-amber-400 text-xs animate-pulse font-bold mt-2">
                          <RefreshCw size={12} className="animate-spin" />
                          {t.diagnosticRunning}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {hasRunDiagnostics && (
                  <div className="mt-4 pt-3 border-t border-slate-900 flex items-center gap-2 text-emerald-400">
                    <CheckCircle size={14} className="shrink-0" />
                    <span>{t.diagComplete}</span>
                  </div>
                )}
              </div>

              {/* Action Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  disabled={isRunningDiagnostics}
                  onClick={handleRunDiagnostics}
                  className={`px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-1.5 shadow-xs cursor-pointer ${
                    isRunningDiagnostics
                      ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                      : "bg-slate-900 hover:bg-slate-800 text-white font-extrabold"
                  }`}
                >
                  <RefreshCw size={13} className={isRunningDiagnostics ? "animate-spin" : ""} />
                  {t.runDiagBtn}
                </button>

                <button 
                  onClick={() => setActivePage("/")}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-sm transition-all inline-block cursor-pointer"
                >
                  {t.returnHome}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Guided Recovery Links */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live active nodes search */}
            <div className={`border p-5 rounded-xl shadow-xs space-y-4 ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            }`}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Functional Circuit Pathways
              </h3>
              
              {/* Search path */}
              <div className="relative w-full">
                <Search size={14} className="absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2.5 w-full border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              {/* Operational Sectors Links */}
              <div className="space-y-2">
                {filteredSectors.length > 0 ? (
                  filteredSectors.map((sector, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePage(sector.link)}
                      className={`w-full p-3 rounded-lg border text-left flex items-center justify-between text-xs font-bold transition-all hover:translate-x-1 cursor-pointer ${
                        isHighContrast 
                          ? "bg-stone-900 border-stone-700 hover:bg-stone-800 text-white" 
                          : "bg-slate-50/40 border-slate-100 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {sector.icon}
                        <span>{sector.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">ONLINE</span>
                    </button>
                  ))
                ) : (
                  <div className="text-slate-400 text-xs italic py-2 text-center">
                    No matching active nodes found. Try searching for "Home" or "Sitemap".
                  </div>
                )}
              </div>
            </div>

            {/* Assistance Card */}
            <div className={`p-5 rounded-xl border relative overflow-hidden ${
              isHighContrast 
                ? "bg-stone-900 border-white text-white" 
                : "bg-gradient-to-br from-blue-50 to-indigo-50/40 border-blue-100 text-slate-800"
            }`}>
              <div className="relative z-10 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <HelpCircle size={14} className="text-blue-600" />
                  {t.assistance}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t.assistanceText}
                </p>
                <div className="pt-2">
                  <a 
                    href="mailto:telecom.support@aptransco.co.in"
                    className="text-xs text-blue-700 font-bold hover:underline"
                  >
                    telecom.support@aptransco.co.in &rarr;
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

/* 5. APTRANSCO Privacy Policy & Disclaimer page template */
export const PrivacyPage: React.FC<SubPageProps> = ({ 
  setActivePage, 
  language, 
  isHighContrast, 
  fontScale 
}) => {
  const [activeTab, setActiveTab] = useState<"privacy" | "disclaimer">("privacy");

  const translations = {
    EN: {
      badge: "Statutory Disclosures & Policies",
      title: "Privacy Policy & Disclaimer",
      subTitle: "LEGAL COMPLIANCE • APTRANSCO DIGITAL SERVICE CHARTER",
      desc: "Review the regulatory policies governing the data collection, transmission telemetry security, and operational legal boundaries of APTRANSCO's public digital platform.",
      privacyTab: "Privacy Policy",
      disclaimerTab: "Legal Disclaimer",
      lastUpdated: "Last Updated: July 2026",
      
      // Privacy details
      privacyTitle: "Information Protection & Data Security Policy",
      p1: "Transmission Corporation of Andhra Pradesh Limited (APTRANSCO) is committed to protecting the privacy and security of all citizens, developers, and grid operators who access our digital portals. This policy outlines how we handle data in compliance with the Information Technology (IT) Act of India and cyber-security mandates.",
      p2: "As a critical state utility operating the transmission infrastructure, we collect certain telemetry metadata, consumer portal details, contractor credentials (via the Tenders module), and digital query submissions to facilitate reliable load despatch operations and administrative transparency.",
      p3: "Any transactional and registration data shared through our internal applications or online grievance desks is encrypted. We strictly enforce strict internal access control matrices so that only authorized engineers and grid dispatch operators can access specialized telemetric data points.",
      privacyPoints: [
        {
          title: "Critical Information Infrastructure (CII)",
          text: "APTRANSCO's SCADA, SLDC networks, and operational telemetry are designated as Critical Information Infrastructure. Access to raw system telemetry is strictly monitored and audited under National Critical Information Infrastructure Protection Centre (NCIIPC) guidelines."
        },
        {
          title: "User Information & Registration",
          text: "When you register for contractor access, submit tenders, or file grievances, we collect verified names, mobile numbers, company credentials, and billing details. This data is stored securely in state-managed data centers and is never sold to third parties."
        },
        {
          title: "Secure Communication Networks",
          text: "All administrative communications, employee portals, and citizen grievance reports utilize Secure Socket Layer (SSL/TLS) encryption to prevent interception over public internet channels."
        }
      ],

      // Disclaimer details
      disclaimerTitle: "Operational & Legal Terms of Use",
      d1: "The information, telemetric measurements, transmission figures, and scheduled load reports displayed on this portal are compiled for administrative convenience and operational transparency. While APTRANSCO strives to maintain real-time accuracy, some SCADA indicators and schedule plans are subject to instantaneous changes based on grid stability, frequency spikes, or solar/wind fluctuations.",
      d2: "All documents, including standard forms, state grid guidelines, bid invitations, and tender circulars, are uploaded for informational purposes. For official legal compliance, administrative filings, and formal contract disputes, users must rely exclusively on signed paper documents from the respective departmental headquarters.",
      disclaimerPoints: [
        {
          title: "No Warranty on Live Data",
          text: "State demand, spinning reserve, and active grid telemetry figures displayed on simulators are provided 'as is' for high-fidelity illustrative purposes. APTRANSCO offers no warranty regarding their uninterrupted real-time accuracy."
        },
        {
          title: "Third-Party & External Links",
          text: "Links to national energy portals, central generating systems, state discoms, or regulatory bodies (APERC, CERC) are provided as supplementary directories. APTRANSCO is not responsible for the contents or safety of external websites."
        },
        {
          title: "Limitation of Liability",
          text: "Under no circumstances shall APTRANSCO or its directors be liable for any direct, indirect, incidental, or consequential damages resulting from reliance on the informational or telemetric files provided on this website."
        }
      ]
    },
    TE: {
      badge: "శాసనబద్ధమైన బహిర్గతాలు & విధానాలు",
      title: "గోప్యతా విధానం & నిరాకరణ",
      subTitle: "చట్టపరమైన వర్తింపు • అపరాన్స్కో డిజిటల్ సేవా చార్టర్",
      desc: "డేటా సేకరణ, ప్రసార టెలిమెట్రీ భద్రత మరియు అపరాన్స్కో యొక్క పబ్లిక్ డిజిటల్ ప్లాట్‌ఫారమ్ యొక్క కార్యాచరణ చట్టపరమైన సరిహద్దులను నియంత్రించే నియంత్రణ విధానాలను సమీక్షించండి.",
      privacyTab: "గోప్యతా విధానం (Privacy)",
      disclaimerTab: "నిరాకరణ (Disclaimer)",
      lastUpdated: "చివరిగా నవీకరించబడింది: జూలై 2026",
      
      privacyTitle: "సమాచార రక్షణ & డేటా భద్రతా విధానం",
      p1: "ఆంధ్రప్రదేశ్ ట్రాన్స్‌మిషన్ కార్పొరేషన్ లిమిటెడ్ (APTRANSCO) మా డిజిటల్ పోర్టల్‌లను యాక్సెస్ చేసే పౌరులు, డెవలపర్లు మరియు గ్రిడ్ ఆపరేటర్ల గోప్యత మరియు భద్రతను రక్షించడానికి కట్టుబడి ఉంది. ఈ విధానం భారత ప్రభుత్వ సమాచార సాంకేతిక (IT) చట్టం ప్రకారం డేటా నిర్వహణను వివరిస్తుంది.",
      p2: "ప్రసార అవస్థాపనను నిర్వహించే ఒక క్లిష్టమైన ప్రభుత్వ సంస్థగా, మేము గ్రిడ్ ఆపరేషన్ల నిర్వహణ కోసం టెలిమెట్రీ మెటాడేటా, వినియోగదారు పోర్టల్ వివరాలు మరియు కాంట్రాక్టర్ వివరాలను సేకరిస్తాము.",
      p3: "అంతర్గత అప్లికేషన్‌లు లేదా ఆన్‌లైన్ ఫిర్యాదుల డెస్క్ ద్వారా భాగస్వామ్యం చేయబడిన డేటా ఎన్‌క్రిప్ట్ చేయబడుతుంది మరియు గ్రిడ్ డిస్పాచ్ ఆపరేటర్లకు మాత్రమే ప్రాప్యత ఉంటుంది.",
      privacyPoints: [
        {
          title: "కీలక సమాచార మౌలిక సదుపాయాలు (CII)",
          text: "అపరాన్స్కో యొక్క SCADA, SLDC నెట్‌వర్క్‌లు మరియు టెలిమెట్రీ కీలక సమాచార మౌలిక సదుపాయాలుగా నియమించబడ్డాయి. NCIIPC మార్గదర్శకాల ప్రకారం వీటి యాక్సెస్ పర్యవేక్షించబడుతుంది."
        },
        {
          title: "వినియోగదారు సమాచారం & నమోదు",
          text: "కాంట్రాక్టర్ ప్రవేశం మరియు టెండర్ల సమర్పణ కోసం మేము సేకరించే సమాచారం సురక్షితమైన రాష్ట్ర డేటా సెంటర్లలో నిల్వ చేయబడుతుంది మరియు ఎవరికీ విక్రయించబడదు."
        },
        {
          title: "సురక్షిత కమ్యూనికేషన్ నెట్‌వర్క్‌లు",
          text: "ఉద్యోగుల పోర్టల్ మరియు పౌరుల ఫిర్యాదు నివేదికల కమ్యూనికేషన్ SSL/TLS ఎన్‌క్రిప్షన్‌ను ఉపయోగిస్తుంది."
        }
      ],

      disclaimerTitle: "కార్యాచరణ & చట్టపరమైన నిబంధనలు",
      d1: "ఈ పోర్టల్‌లో ప్రదర్శించబడే సమాచారం, ప్రసార గణాంకాలు మరియు లోడ్ నివేదికలు కార్యాచరణ పారదర్శకత కోసం సంకలనం చేయబడ్డాయి. అయితే గ్రిడ్ స్థిరత్వం, పవన మరియు సౌర హెచ్చుతగ్గుల ఆధారంగా ఇవి మారే అవకాశం ఉంది.",
      d2: "టెండర్ సర్క్యులర్లు మరియు గ్రిడ్ మార్గదర్శకాలు సమాచార ప్రయోజనాల కోసమే అప్‌లోడ్ చేయబడ్డాయి. అధికారిక చట్టపరమైన ప్రయోజనాల కోసం సంతకం చేసిన కాగితపు పత్రాలను మాత్రమే నమ్మాలి.",
      disclaimerPoints: [
        {
          title: "లైవ్ డేటాపై హామీ లేదు",
          text: "గ్రిడ్ టెలిమెట్రీ గణాంకాలు 'ఉన్నది ఉన్నట్లుగా' అందించబడ్డాయి. వీటి నిరంతర ఖచ్చితత్వంపై అపరాన్స్కో ఎటువంటి వారంటీని ఇవ్వదు."
        },
        {
          title: "మూడవ పక్షం & బాహ్య లింకులు",
          text: "జనరల్ ఎనర్జీ పోర్టల్‌లు, జాతీయ ఉత్పత్తి కేంద్రాలు లేదా నియంత్రణ సంస్థల (APERC, CERC) బాహ్య లింకులు అనుబంధ నిర్దేశికాలుగా ఇవ్వబడ్డాయి. వీటి భద్రతకు అపరాన్స్కో బాధ్యత వహించదు."
        },
        {
          title: "బాధ్యత పరిమితి",
          text: "ఈ వెబ్‌సైట్‌లో అందించిన సమాచారాన్ని ఉపయోగించడం వల్ల కలిగే ఎటువంటి నష్టాలకు అపరాన్స్కో లేదా దాని డైరెక్టర్లు బాధ్యత వహించరు."
        }
      ]
    }
  };

  const t = translations[language] || translations.EN;

  return (
    <div className="animate-fade-in w-full pb-16">
      {/* Immersive Legal Banner Hero */}
      <div className={`relative w-full py-16 md:py-24 text-white border-b ${
        isHighContrast ? "bg-black border-white" : "bg-slate-950 border-slate-800"
      }`}>
        {!isHighContrast && (
          <>
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 opacity-100"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1600')" 
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
          <span className="text-xs md:text-sm font-mono uppercase text-cyan-400/90 block tracking-wider font-bold">
            {t.subTitle}
          </span>
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-sans max-w-2xl drop-shadow-sm" style={{ fontSize: `${14 * fontScale}px` }}>
            {t.desc}
          </p>
        </div>
      </div>

      {/* Main Interactive Policies Columns */}
      <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Area: Navigation Tabs & Interactive Reading */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Policy Tabs */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab("privacy")}
                className={`py-3 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeTab === "privacy"
                    ? "border-cyan-500 text-slate-900 font-extrabold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {t.privacyTab}
              </button>
              <button
                onClick={() => setActiveTab("disclaimer")}
                className={`py-3 px-6 text-xs font-bold uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  activeTab === "disclaimer"
                    ? "border-cyan-500 text-slate-900 font-extrabold"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {t.disclaimerTab}
              </button>
            </div>

            {/* Render active content */}
            {activeTab === "privacy" ? (
              <div className="space-y-6 animate-fade-in">
                <div className={`p-6 rounded-2xl border ${
                  isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
                } space-y-4`}>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 border-b pb-3 border-slate-100 flex items-center gap-2" style={{ fontSize: `${15 * fontScale}px` }}>
                    <ShieldCheck className="text-cyan-500" size={18} />
                    {t.privacyTitle}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-sans" style={{ fontSize: `${12 * fontScale}px` }}>
                    {t.p1}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans" style={{ fontSize: `${12 * fontScale}px` }}>
                    {t.p2}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans" style={{ fontSize: `${12 * fontScale}px` }}>
                    {t.p3}
                  </p>
                </div>

                {/* Sub-cards */}
                <div className="space-y-4">
                  {t.privacyPoints.map((item, idx) => (
                    <div key={idx} className={`p-5 rounded-xl border ${
                      isHighContrast ? "bg-stone-900 border-stone-700 text-white" : "bg-slate-50/50 border-slate-100"
                    } space-y-2`}>
                      <h4 className="text-xs font-bold text-slate-800 font-sans flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center text-[10px] font-bold font-mono">
                          0{idx + 1}
                        </span>
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans" style={{ fontSize: `${12 * fontScale}px` }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <div className={`p-6 rounded-2xl border ${
                  isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200 shadow-xs"
                } space-y-4`}>
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 border-b pb-3 border-slate-100 flex items-center gap-2" style={{ fontSize: `${15 * fontScale}px` }}>
                    <AlertTriangle className="text-amber-500" size={18} />
                    {t.disclaimerTitle}
                  </h3>
                  
                  <p className="text-xs text-slate-600 leading-relaxed font-sans" style={{ fontSize: `${12 * fontScale}px` }}>
                    {t.d1}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans" style={{ fontSize: `${12 * fontScale}px` }}>
                    {t.d2}
                  </p>
                </div>

                {/* Sub-cards */}
                <div className="space-y-4">
                  {t.disclaimerPoints.map((item, idx) => (
                    <div key={idx} className={`p-5 rounded-xl border ${
                      isHighContrast ? "bg-stone-900 border-stone-700 text-white" : "bg-slate-50/50 border-slate-100"
                    } space-y-2`}>
                      <h4 className="text-xs font-bold text-slate-800 font-sans flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold font-mono">
                          0{idx + 1}
                        </span>
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans" style={{ fontSize: `${12 * fontScale}px` }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Sidebar: Quick Contact & Metadata */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Legal compliance block */}
            <div className="p-5 bg-cyan-50/50 border border-cyan-200/50 rounded-2xl space-y-3">
              <span className="text-[9px] uppercase font-black text-cyan-800 tracking-widest block">Chief Information Security Officer</span>
              <div className="space-y-1">
                <p className="text-xs font-black text-slate-900">Shri K. Sridhar, GM (IT &amp; Cybersecurity)</p>
                <p className="text-[10px] text-slate-500 font-sans">Corporate IT Division, Vidyut Soudha, Gunadala, Vijayawada.</p>
              </div>
              <a 
                href="mailto:ciso@aptransco.co.in"
                className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 transition-all inline-block cursor-pointer"
              >
                <span>Email Security Desk</span>
                <span>&rarr;</span>
              </a>
            </div>

            {/* Quick Policies Links */}
            <div className={`p-5 rounded-2xl border ${
              isHighContrast ? "bg-black border-white text-white" : "bg-white border-slate-200"
            } space-y-4`}>
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">State Portal Policies</h4>
              <div className="space-y-2 font-sans text-xs">
                <div className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg flex items-center justify-between text-slate-700">
                  <span className="truncate pr-2 font-medium">Cybersecurity Policy 2026</span>
                  <span className="text-[9px] font-mono text-cyan-600 font-bold bg-cyan-50 px-1 py-0.5 rounded">PDF</span>
                </div>
                <div className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg flex items-center justify-between text-slate-700">
                  <span className="truncate pr-2 font-medium">APERC Grievance Regulations</span>
                  <span className="text-[9px] font-mono text-cyan-600 font-bold bg-cyan-50 px-1 py-0.5 rounded">PDF</span>
                </div>
              </div>
            </div>

            {/* Static Info Block */}
            <div className={`p-5 rounded-2xl border ${
              isHighContrast ? "bg-stone-900 border-stone-800 text-stone-300" : "bg-slate-50 border-slate-100 text-slate-500"
            } text-center text-[10px] font-mono space-y-1`}>
              <p>{t.lastUpdated}</p>
              <p>State Utility Portal ID: AP-TR-098</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
