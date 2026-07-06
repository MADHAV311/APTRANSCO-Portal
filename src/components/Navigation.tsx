import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Volume2, ShieldAlert, Check, Menu, X, Landmark, ArrowRight, Download, Phone, MapPin, Mail, ChevronDown } from "lucide-react";
import { APTranscoLogo } from "./APTranscoLogo";
import { getUnifiedSearchResults, SEARCH_CATEGORY_ORDER, type SearchCategory } from "../searchIndex";

interface NavigationProps {
  activePage: string;
  setActivePage: (url: string) => void;
  isHighContrast: boolean;
  setIsHighContrast: (v: boolean) => void;
  fontScale: number;
  setFontScale: (scale: number) => void;
  language: "EN" | "TE";
  setLanguage: (lang: "EN" | "TE") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewportMode?: "desktop" | "tablet" | "mobile";
}

export const Navigation: React.FC<NavigationProps> = ({
  activePage,
  setActivePage,
  isHighContrast,
  setIsHighContrast,
  fontScale,
  setFontScale,
  language,
  setLanguage,
  searchQuery,
  setSearchQuery,
  viewportMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchListboxId = "global-search-suggestions";
  const mobileMenuId = "mobile-navigation-menu";

  const isMobileLayout = viewportMode === "mobile" || viewportMode === "tablet" || (typeof window !== "undefined" && window.innerWidth < 1024);

  const recentSearches = [
    { label: language === "EN" ? "OPGW fibre cable" : "OPGW ఫైబర్ కేబుల్", query: "OPGW fibre cable" },
    { label: language === "EN" ? "Assistant Engineer" : "అసిస్టెంట్ ఇంజినీర్", query: "Assistant Engineer" },
    { label: language === "EN" ? "Grid code" : "గ్రిడ్ కోడ్", query: "grid code" }
  ];

  const popularSearches = [
    { label: language === "EN" ? "Transmission projects" : "ట్రాన్స్మిషన్ ప్రాజెక్టులు", query: "transmission project" },
    { label: language === "EN" ? "Recruitment notices" : "నియామక ప్రకటనలు", query: "recruitment" },
    { label: language === "EN" ? "RTI disclosures" : "RTI వెల్లడనలు", query: "RTI" }
  ];

  const quickNavigationItems = [
    { label: language === "EN" ? "Active tenders" : "క్రియాశీల టెండర్లు", url: "/tenders" },
    { label: language === "EN" ? "Project portal" : "ప్రాజెక్ట్ పోర్టల్", url: "/departments/projects" },
    { label: language === "EN" ? "Downloads" : "డౌన్‌లోడ్స్", url: "/downloads" }
  ];

  const emptyStateSuggestions = ["tenders", "recruitment", "grid code", "OPGW", "tariff filings"];

  const highlightSearchMatch = (text: string) => {
    const tokens = searchQuery.trim().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return text;

    const escaped = tokens.map((token) => token.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|");
    const matcher = new RegExp(`(${escaped})`, "gi");

    return text.split(matcher).map((part, index) =>
      tokens.some((token) => part.toLowerCase() === token.toLowerCase()) ? (
        <mark key={`${part}-${index}`} className={isHighContrast ? "bg-amber-400 text-black px-0.5 rounded" : "bg-blue-100 text-blue-800 px-0.5 rounded"}>
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    setActiveSuggestionIndex(0);
  }, [searchQuery]);


  // Grid Tickers State Mockup
  const gridStats = {
    demand: "8,412 MW",
    frequency: "49.98 Hz",
    solarShare: "1,450 MW",
    windShare: "910 MW",
    status: "NORMAL / STABLE"
  };

  const handlePageClick = (url: string) => {
    setSearchQuery("");
    setActivePage(url);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Menu Directories Mapping
  const menuDirectories = [
    {
      title: language === "EN" ? "About Us" : "మా గురించి",
      id: "about",
      items: [
        { name: language === "EN" ? "About APTRANSCO" : "APTRANSCO గురించి", url: "/about" },
        { name: language === "EN" ? "Vision, Mission & Values" : "లక్ష్యాలు & విలువలు", url: "/about#vision" },
        { name: language === "EN" ? "Leadership & Board" : "నాయకత్వం & బోర్డు", url: "/about#board" },
        { name: language === "EN" ? "Organization Structure" : "సంస్థాత్మక నిర్మాణం", url: "/about#org-structure" },
        { name: language === "EN" ? "Office Locations" : "కార్యాలయ స్థానాలు", url: "/contact#locations" }
      ]
    },
    {
      title: language === "EN" ? "Grid & Projects" : "గ్రిడ్ & ప్రాజెక్ట్‌లు",
      id: "operations",
      items: [
        { name: language === "EN" ? "Transmission Network" : "ట్రాన్స్మిషన్ నెట్‌వర్క్", url: "/operations" },
        { name: language === "EN" ? "Ongoing Capital Works" : "కొనసాగుతున్న పనులు", url: "/operations#projects" },
        { name: language === "EN" ? "GIS Mapping System" : "GIS మ్యాపింగ్ సిస్టమ్", url: "/operations#gis-mapping" }
      ]
    },
    {
      title: language === "EN" ? "Stakeholders" : "స్టేక్‌హోల్డర్స్",
      id: "stakeholders",
      items: [
        { name: language === "EN" ? "Active Tenders" : "టెండర్లు", url: "/tenders" },
        { name: language === "EN" ? "Vendor Registrations" : "వెండర్ రిజిస్ట్రేషన్", url: "/tenders#vendors" },
        { name: language === "EN" ? "Careers / Recruitment" : "ఉద్యోగాలు / నియామకాలు", url: "/notices#careers" }
      ]
    },
    {
      title: language === "EN" ? "Departments" : "విభాగాలు",
      id: "departments",
      items: [
        { name: "Telecom & IT", url: "/departments/telecom-it" },
        { name: "Grid Operations & SLDC", url: "/departments/grid-ops" },
        { name: "Projects & Erection", url: "/departments/projects" },
        { name: "Finance & Accounts", url: "/departments/finance" },
        { name: "HR, Admin & Training", url: "/departments/hr-admin" }
      ]
    },
    {
      title: language === "EN" ? "Disclosures" : "ప్రకటనలు",
      id: "disclosures",
      items: [
        { name: language === "EN" ? "RTI Disclosures" : "సమాచార హక్కు (RTI)", url: "/rti" },
        { name: language === "EN" ? "Tariffs & Filings" : "టారిఫ్ & ఫైలింగ్స్", url: "/rti#tariff" },
        { name: language === "EN" ? "Reports & Audits" : "నివేదికలు & ఆడిట్", url: "/rti#reports" },
        { name: language === "EN" ? "Document Library" : "పత్రాల సేకరణ", url: "/downloads" }
      ]
    }
  ];

  const toggleDropdown = (id: string) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(id);
    }
  };

  const currentTheme = isHighContrast
    ? "bg-black text-amber-400 border-amber-500"
    : "bg-white text-slate-800 border-slate-200 shadow-xs";

  const handleSearchSelect = (value: string, targetUrl?: string) => {
    setSearchQuery(value);
    setSearchFocused(false);
    if (targetUrl) {
      handlePageClick(targetUrl);
    } else {
      handlePageClick("/search");
    }
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const flatItems = searchQuery.trim()
      ? liveSuggestions
      : [
          ...recentSearches.map(item => ({ ...item, type: "recent" as const })),
          ...popularSearches.map(item => ({ ...item, type: "popular" as const })),
          ...quickNavigationItems.map(item => ({ ...item, type: "nav" as const }))
        ];

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestionIndex((prev) => (prev + 1) % Math.max(flatItems.length, 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestionIndex((prev) => (prev - 1 + Math.max(flatItems.length, 1)) % Math.max(flatItems.length, 1));
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selected = flatItems[activeSuggestionIndex];
      if (selected) {
        if ("url" in selected) {
          handleSearchSelect(searchQuery.trim() || selected.label, selected.url);
        } else {
          handleSearchSelect(selected.query || selected.label);
        }
      } else if (searchQuery.trim()) {
        handleSearchSelect(searchQuery.trim());
      }
    }

    if (event.key === "Escape") {
      setSearchFocused(false);
      setActiveSuggestionIndex(0);
    }
  };

  const liveSuggestions = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return [] as Array<{ id: string; label: string; description: string; query: string; category: SearchCategory; url: string }>;

    const results = getUnifiedSearchResults(query, 14);
    return results.items.map((item) => ({
      id: item.id,
      label: item.title,
      description: item.description ?? item.category,
      query: item.title,
      category: item.category,
      url: item.url
    }));
  }, [searchQuery]);

  const groupedLiveSuggestions = useMemo(() => {
    const groups = new Map<SearchCategory, typeof liveSuggestions>();

    liveSuggestions.forEach((item) => {
      const current = groups.get(item.category) ?? [];
      groups.set(item.category, [...current, item]);
    });

    return SEARCH_CATEGORY_ORDER
      .map((category) => ({ category, items: groups.get(category) ?? [] }))
      .filter((group) => group.items.length > 0);
  }, [liveSuggestions]);

  return (
    <div className={`w-full font-sans select-none ${isHighContrast ? "bg-black text-white" : ""}`}>
      
      {/* 2. Main Executive Header with Integrated Accessibility & Bilingual Info */}
      <header className={`w-full max-w-full px-4 md:px-8 py-4 border-b flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6 transition-all duration-300 ${currentTheme}`}>
        
        {/* Logos & Credentials */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Go to APTRANSCO home"
          className="portal-interactive flex w-full min-w-0 items-start gap-3 cursor-pointer rounded-lg text-left md:w-auto"
          onClick={() => handlePageClick("/")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handlePageClick("/");
            }
          }}
        >
          <APTranscoLogo className="w-24 h-24 shrink-0 transition-all duration-300" isHighContrast={isHighContrast} />
          <div className="flex min-w-0 flex-1 flex-col select-text">
            <h1 className={`text-xl md:text-sm lg:text-[20px] font-bold tracking-tight leading-tight ${
              isHighContrast ? "text-amber-400" : "text-[#1d70b8] font-extrabold"
            }`}>
              Transmission Corporation of Andhra Pradesh Limited
            </h1>

            <div className={`text-[9px] md:text-[10px] lg:text-[11px] font-medium leading-tight mt-1.5 ${
              isHighContrast ? "text-stone-300" : "text-slate-800"
            }`}>
              <div>GST IN: <span className="font-mono font-bold">37AABCT0088P1ZU</span></div>
              <div className={`text-[8px] md:text-[9.5px] mt-0.5 ${
                isHighContrast ? "text-stone-400" : "text-slate-500"
              }`}>
                (A Government of Andhra Pradesh Undertaking & An ISO 27001-2022 Certified Company)
              </div>
            </div>

            {/* Live Grid Metrics Integrated Directly Under Undertaking Sentence */}
            <div className="flex w-full max-w-full flex-wrap items-center gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-wrap items-center gap-1.5 w-full max-w-full pb-1 sm:pb-0">
                <span className={`flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0 border ${
                  isHighContrast ? "text-emerald-400 bg-emerald-950/40 border-emerald-800/30" : "text-emerald-700 bg-emerald-50 border-emerald-200"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse block"></span>
                  GRID: {gridStats.status}
                </span>
                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0 border ${
                  isHighContrast ? "bg-stone-900 border-stone-700 text-stone-300" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}>
                  DEMAND: <strong className={isHighContrast ? "text-amber-400 font-bold" : "text-slate-900 font-bold"}>{gridStats.demand}</strong>
                </span>
                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0 border ${
                  isHighContrast ? "bg-stone-900 border-stone-700 text-stone-300" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}>
                  FREQ: <strong className={isHighContrast ? "text-amber-400 font-bold" : "text-slate-900 font-bold"}>{gridStats.frequency}</strong>
                </span>
                <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded shrink-0 border ${
                  isHighContrast ? "bg-stone-900 border-stone-700 text-stone-300" : "bg-slate-50 border-slate-200 text-slate-600"
                }`}>
                  RENEWABLES: <strong className={isHighContrast ? "text-amber-400 font-bold" : "text-slate-900 font-bold"}>2,130 MW</strong>
                </span>
              </div>

              {/* Compact Accessibility Switches */}
              <div className="hidden md:flex items-center gap-1.5 shrink-0">
                <div className={`flex items-center rounded border overflow-hidden ${
                  isHighContrast ? "border-amber-500 bg-stone-950" : "border-slate-200 bg-slate-50"
                }`}>
                  <button 
                    type="button"
                    onClick={() => setLanguage("EN")}
                    aria-pressed={language === "EN"}
                    aria-label="Switch language to English"
                    className={`px-1.5 py-0.5 font-bold text-[8.5px] transition-all ${
                      language === "EN" 
                        ? (isHighContrast ? "bg-amber-400 text-black" : "bg-blue-600 text-white") 
                        : (isHighContrast ? "text-stone-400 hover:text-white" : "text-slate-500 hover:text-slate-900")
                    }`}
                  >
                    EN
                  </button>
                  <button 
                    type="button"
                    onClick={() => setLanguage("TE")}
                    aria-pressed={language === "TE"}
                    aria-label="Switch language to Telugu"
                    className={`px-1.5 py-0.5 font-bold text-[8.5px] transition-all ${
                      language === "TE" 
                        ? (isHighContrast ? "bg-amber-400 text-black" : "bg-blue-600 text-white") 
                        : (isHighContrast ? "text-stone-400 hover:text-white" : "text-slate-500 hover:text-slate-900")
                    }`}
                  >
                    TE
                  </button>
                </div>

                <button 
                  type="button"
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  aria-pressed={isHighContrast}
                  aria-label={isHighContrast ? "Switch to standard contrast" : "Switch to high contrast"}
                  className={`px-1.5 py-0.5 rounded font-bold text-[8.5px] border transition-all ${
                    isHighContrast 
                      ? "bg-amber-400 text-black border-amber-400" 
                      : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                  }`}
                >
                  {isHighContrast ? "STD" : "CONTRAST"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:hidden" onClick={(e) => e.stopPropagation()}>
              <div className={`flex items-center rounded border overflow-hidden ${
                isHighContrast ? "border-amber-500 bg-stone-950" : "border-slate-200 bg-slate-50"
              }`}>
                <button 
                  type="button"
                  onClick={() => setLanguage("EN")}
                  aria-pressed={language === "EN"}
                  aria-label="Switch language to English"
                  className={`px-2.5 py-1.5 font-bold text-[8.5px] transition-all ${
                    language === "EN"
                      ? (isHighContrast ? "bg-amber-400 text-black" : "bg-blue-600 text-white")
                      : (isHighContrast ? "text-stone-400 hover:text-white" : "text-slate-500 hover:text-slate-900")
                  }`}
                >
                  EN
                </button>
                <button 
                  type="button"
                  onClick={() => setLanguage("TE")}
                  aria-pressed={language === "TE"}
                  aria-label="Switch language to Telugu"
                  className={`px-2.5 py-1.5 font-bold text-[8.5px] transition-all ${
                    language === "TE"
                      ? (isHighContrast ? "bg-amber-400 text-black" : "bg-blue-600 text-white")
                      : (isHighContrast ? "text-stone-400 hover:text-white" : "text-slate-500 hover:text-slate-900")
                  }`}
                >
                  TE
                </button>
              </div>

              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls={mobileMenuId}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                className={`ml-auto p-2.5 rounded-lg border focus:outline-none ${
                  isHighContrast
                    ? "text-amber-400 bg-black border-amber-500 hover:bg-stone-950"
                    : "text-slate-600 bg-slate-100 hover:bg-slate-200 border-slate-200"
                }`}
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Global Live Interactive Search */}
        <div className={`relative max-w-xs w-full ${isMobileLayout ? "hidden" : "hidden lg:block"}`} role="search" aria-label="Global portal search">
          <div className={`flex items-center px-3 py-2 rounded-lg border transition-all duration-200 ${
            isHighContrast 
              ? (searchFocused ? "border-amber-400 bg-black text-amber-400 ring-2 ring-amber-400/20" : "border-amber-500 bg-black text-amber-300")
              : (searchFocused ? "border-blue-500 bg-white text-slate-900 ring-2 ring-blue-500/20" : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300")
          }`}>
            <Search size={14} className={`${isHighContrast ? "text-amber-400" : "text-slate-400"} mr-2 shrink-0`} />
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder={language === "EN" ? "Search tenders, circulars..." : "వెతకండి..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { setSearchFocused(true); setActiveSuggestionIndex(0); }}
              onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
              onKeyDown={handleSearchKeyDown}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={searchFocused}
              aria-controls={searchListboxId}
              aria-activedescendant={searchFocused ? `search-suggestion-${activeSuggestionIndex}` : undefined}
              aria-label="Search APTRANSCO portal"
              className="bg-transparent border-0 text-xs w-full outline-none"
            />
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")} aria-label="Clear search" className="text-slate-400 hover:text-slate-900 font-bold text-xs px-1.5">
                X
              </button>
            )}
          </div>
          {searchFocused && (
            <div id={searchListboxId} role="listbox" className={`absolute top-11 left-0 right-0 border rounded-lg shadow-xl p-3 z-50 text-xs space-y-2 animate-fade-in ${
              isHighContrast ? "bg-black border-amber-500 text-amber-300" : "bg-white border-slate-200 text-slate-700"
            }`}>
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400">
                <span>{language === "EN" ? "Portal search" : "పోర్టల్ శోధన"}</span>
                <span className="text-[9px] text-slate-500">↑ ↓ Enter Esc</span>
              </div>

              {searchQuery.trim() ? (
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{language === "EN" ? "Live suggestions" : "లైవ్ సూచనలు"}</div>
                  {liveSuggestions.length > 0 ? (
                    groupedLiveSuggestions.map((group) => (
                      <div key={group.category} className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-slate-400">
                          <span>{group.category}</span>
                          <span>{group.items.length}</span>
                        </div>
                        {group.items.map((item) => {
                          const index = liveSuggestions.findIndex((suggestion) => suggestion.id === item.id);
                          return (
                            <button
                              type="button"
                              id={`search-suggestion-${index}`}
                              role="option"
                              aria-selected={activeSuggestionIndex === index}
                              key={`${item.category}-${item.id}`}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleSearchSelect(item.query, item.url)}
                              className={`flex w-full items-start justify-between rounded border px-2.5 py-2 text-left transition-all ${
                                activeSuggestionIndex === index
                                  ? "border-blue-300 bg-blue-50 text-blue-800"
                                  : "border-transparent hover:bg-slate-50"
                              }`}
                            >
                              <span className="min-w-0 pr-2">
                                <span className="block text-[11px] font-semibold text-slate-800">{highlightSearchMatch(item.label)}</span>
                                <span className="mt-0.5 block text-[10px] text-slate-500">{highlightSearchMatch(item.description)}</span>
                              </span>
                              <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">{item.category}</span>
                            </button>
                          );
                        })}
                      </div>
                    ))
                  ) : (
                    <div className="rounded border border-dashed border-slate-200 bg-slate-50 px-2.5 py-3 text-[11px] text-slate-500">
                      {language === "EN" ? "No live matches yet. Try a broader term such as project, tender or recruitment." : "ఇంకా ఫలితాలు లేవు. ప్రాజెక్ట్, టెండర్ లేదా నియామకం వంటి పదాన్ని ప్రయత్నించండి."}
                    </div>
                  )}
                  {liveSuggestions.length === 0 && (
                    <div className="rounded border border-blue-100 bg-white px-2.5 py-2 text-[11px] text-slate-500">
                      <div className="font-semibold text-slate-700">{language === "EN" ? "Suggested searches" : "Suggested searches"}</div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {emptyStateSuggestions.map((suggestion) => (
                          <button
                            type="button"
                            key={suggestion}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handleSearchSelect(suggestion)}
                            className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 hover:bg-blue-100"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{language === "EN" ? "Recent searches" : "ఇటీవలి శోధనలు"}</div>
                    {recentSearches.map((item, index) => (
                      <button
                        type="button"
                        id={`search-suggestion-${index}`}
                        role="option"
                        aria-selected={activeSuggestionIndex === index}
                        key={item.query}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSearchSelect(item.query)}
                        className={`block w-full rounded px-2.5 py-1.5 text-left transition-all ${activeSuggestionIndex === index ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50"}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{language === "EN" ? "Popular searches" : "జనప్రియ శోధనలు"}</div>
                    {popularSearches.map((item, index) => (
                      <button
                        type="button"
                        id={`search-suggestion-${recentSearches.length + index}`}
                        role="option"
                        aria-selected={activeSuggestionIndex === recentSearches.length + index}
                        key={item.query}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSearchSelect(item.query)}
                        className={`block w-full rounded px-2.5 py-1.5 text-left transition-all ${activeSuggestionIndex === recentSearches.length + index ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50"}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-1 border-t border-slate-100 pt-2">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{language === "EN" ? "Quick navigation" : "త్వరిత నావిగేషన్"}</div>
                    {quickNavigationItems.map((item, index) => (
                      <button
                        type="button"
                        id={`search-suggestion-${recentSearches.length + popularSearches.length + index}`}
                        role="option"
                        aria-selected={activeSuggestionIndex === recentSearches.length + popularSearches.length + index}
                        key={item.url}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSearchSelect(item.label, item.url)}
                        className={`block w-full rounded px-2.5 py-1.5 text-left transition-all ${activeSuggestionIndex === recentSearches.length + popularSearches.length + index ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50"}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menu Buttons & Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Links */}
          <button 
            type="button"
            onClick={() => handlePageClick("/tenders")}
            className={`items-center gap-1 font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all duration-150 ${isMobileLayout ? "hidden" : "hidden xl:flex"} ${
              isHighContrast 
                ? "bg-amber-400 text-black hover:bg-amber-500" 
                : "bg-blue-900 hover:bg-blue-800 text-white"
            }`}
          >
            Tenders Portal
          </button>
          
          <button 
            type="button"
            onClick={() => handlePageClick("/contact")}
            className={`items-center gap-1 font-semibold text-xs px-3.5 py-2 rounded-lg border transition-all duration-150 ${isMobileLayout ? "hidden" : "hidden sm:flex"} ${
              isHighContrast 
                ? "bg-black text-amber-400 border border-amber-400 hover:bg-stone-900" 
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            Directory
          </button>


        </div>
      </header>

      {/* 3. Mega-Menu Desktop Navigation Row */}
      <nav className={`px-4 md:px-8 py-3.5 border-b items-center gap-6 relative z-40 transition-all ${isMobileLayout ? "hidden" : "hidden lg:flex"} ${
        isHighContrast ? "bg-black border-amber-500 text-white" : "bg-slate-900 text-slate-100 border-slate-800"
      }`} aria-label="Primary portal navigation">
        <button 
          type="button"
          onClick={() => handlePageClick("/")}
          aria-current={activePage === "/" ? "page" : undefined}
          className={`text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded transition-all ${
            activePage === "/" 
              ? (isHighContrast ? "bg-amber-400 text-black font-extrabold" : "bg-blue-900 text-white font-extrabold") 
              : "text-slate-300 hover:text-white"
          }`}
        >
          {language === "EN" ? "Home" : "హోమ్"}
        </button>

        {menuDirectories.map((directory) => (
          <div key={directory.id} className="relative group">
            <button 
              type="button"
              onClick={() => toggleDropdown(directory.id)}
              aria-expanded={activeDropdown === directory.id}
              aria-controls={`nav-menu-${directory.id}`}
              className="text-xs font-bold tracking-wide uppercase px-2.5 py-1 text-slate-300 hover:text-white flex items-center gap-1 focus:outline-none"
            >
              {directory.title}
              <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === directory.id ? "rotate-180" : ""}`} />
            </button>
            
            {/* Desktop Dropdown Box */}
            <div id={`nav-menu-${directory.id}`} className={`absolute top-full left-0 pt-1.5 min-w-56 z-50 transition-all duration-200 ease-out ${
              activeDropdown === directory.id ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
            }`}>
              <div className={`p-2.5 rounded-xl shadow-xl space-y-1 text-xs border ${
                isHighContrast 
                  ? "bg-black border-amber-500 text-amber-300" 
                  : "bg-white border-slate-200 text-slate-700"
              }`}>
                {directory.items.map((item, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handlePageClick(item.url)}
                    aria-current={activePage === item.url ? "page" : undefined}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-all ${
                      isHighContrast
                        ? (activePage === item.url ? "text-amber-300 bg-stone-900" : "text-amber-400 hover:text-white hover:bg-stone-900")
                        : (activePage === item.url ? "text-blue-700 bg-blue-50/70 font-bold" : "text-slate-600 hover:text-blue-900 hover:bg-slate-50")
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button"
          onClick={() => handlePageClick("/internal-apps")}
          aria-current={activePage === "/internal-apps" ? "page" : undefined}
          className={`text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded transition-all cursor-pointer ${
            activePage === "/internal-apps" 
              ? (isHighContrast ? "bg-amber-400 text-black font-extrabold" : "bg-blue-900 text-white font-extrabold") 
              : "text-slate-300 hover:text-white"
          }`}
        >
          {language === "EN" ? "Internal Apps" : "అంతర్గత యాప్స్"}
        </button>

        <div className="ml-auto flex items-center gap-3">
          <button 
            type="button"
            onClick={() => handlePageClick("/downloads")}
            className="text-xs font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1"
          >
            <Download size={14} />
            {language === "EN" ? "Document Library" : "డౌన్‌లోడ్స్"}
          </button>
        </div>
      </nav>

      {/* 4. Mobile Expandable Menu */}
      {mobileMenuOpen && (
        <div id={mobileMenuId} className={`px-4 py-5 border-b space-y-4 animate-fade-in ${isMobileLayout ? "block" : "lg:hidden"} ${
          isHighContrast ? "bg-black border-amber-500 text-white" : "bg-slate-950 border-slate-800 text-slate-100"
        }`} role="dialog" aria-label="Mobile navigation menu">
          {/* Mobile Search */}
          <div className="flex items-center px-3 py-2 rounded-lg border border-slate-800 bg-slate-900">
            <Search size={14} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search active listings..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search APTRANSCO portal"
              className="bg-transparent border-0 text-xs w-full outline-none text-white"
            />
          </div>

          <div className="space-y-4 pt-2">
            <button 
              type="button"
              onClick={() => handlePageClick("/")}
              className="block w-full text-left text-sm font-bold text-slate-300 hover:text-white py-1"
            >
              🏠 Home Page
            </button>
            <button 
              type="button"
              onClick={() => handlePageClick("/internal-apps")}
              className="block w-full text-left text-sm font-bold text-slate-300 hover:text-white py-1 cursor-pointer"
            >
              🔐 Internal Apps
            </button>
            {menuDirectories.map((directory) => (
              <div key={directory.id} className="space-y-1">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 block">
                  {directory.title}
                </span>
                <div className="pl-3 space-y-2 mt-1 border-l border-slate-800">
                  {directory.items.map((item, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handlePageClick(item.url)}
                      className="block w-full text-left text-xs font-medium text-slate-300 hover:text-white py-1"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Proposed Design Footer Component
interface FooterProps {
  setActivePage: (url: string) => void;
  setSearchQuery?: (q: string) => void;
  language: "EN" | "TE";
  isHighContrast: boolean;
  viewportMode?: "desktop" | "tablet" | "mobile";
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, setSearchQuery, language, isHighContrast, viewportMode }) => {
  const isMobileLayout = viewportMode === "mobile" || viewportMode === "tablet" || (typeof window !== "undefined" && window.innerWidth < 1024);

  const handlePageClick = (url: string) => {
    if (setSearchQuery) setSearchQuery("");
    setActivePage(url);
  };

  return (
    <footer className={`border-t py-12 px-6 md:px-12 transition-all ${
      isHighContrast 
        ? "bg-black text-amber-400 border-amber-500" 
        : "bg-slate-950 text-slate-400 border-slate-900"
    }`}>
      <div className={`max-w-[1650px] mx-auto grid ${isMobileLayout ? (viewportMode === "tablet" ? "grid-cols-2 gap-8" : "grid-cols-1 gap-6") : "grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"}`}>
        
        {/* Contact details & Emblem */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all" onClick={() => handlePageClick("/")}>
            <APTranscoLogo className="w-9 h-9 shrink-0" isHighContrast={isHighContrast} />
            <span className="text-sm font-extrabold text-white font-sans tracking-tight">APTRANSCO</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Transmission Corporation of Andhra Pradesh Limited is the primary state power transmission utility operating the 400kV, 220kV, and 132kV networks.
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Phone size={12} className="text-amber-500 shrink-0" />
              <span>JMD (HR, Admin & Grid): +91 9440684531</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail size={12} className="text-amber-500 shrink-0" />
              <span>cetelecom.vja@aptransco.gov.in</span>
            </div>
          </div>
        </div>

        {/* Corporate directories */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            {language === "EN" ? "Quick Portals" : "శీఘ్ర పోర్టల్స్"}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button type="button" onClick={() => handlePageClick("/tenders")} className="hover:text-amber-400 transition-all">
                Tenders & Procurements
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handlePageClick("/notices#careers")} className="hover:text-amber-400 transition-all">
                Careers & Recruitment
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handlePageClick("/downloads")} className="hover:text-amber-400 transition-all">
                Document Library
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handlePageClick("/contact#locations")} className="hover:text-amber-400 transition-all">
                Office Coordinates
              </button>
            </li>
          </ul>
        </div>

        {/* Statutory Disclosures */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            {language === "EN" ? "Compliance & RTI" : "కార్పొరేట్ సమ్మతి"}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button type="button" onClick={() => handlePageClick("/rti")} className="hover:text-amber-400 transition-all">
                Right to Information Act
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handlePageClick("/rti#tariff")} className="hover:text-amber-400 transition-all">
                Tariff Regulatory Filings
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handlePageClick("/rti#reports")} className="hover:text-amber-400 transition-all">
                Annual Financial Statements
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handlePageClick("/privacy")} className="hover:text-amber-400 transition-all">
                Privacy Policy & Disclaimer
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Links Column - Matches user request and screenshot */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-x-3 text-xs">
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://aperc.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  APERC
                </a>
              </li>
              <li>
                <a 
                  href="https://cercind.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  CERC
                </a>
              </li>
              <li>
                <a 
                  href="https://sldc.aptransco.co.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  APSLDC
                </a>
              </li>
              <li>
                <a 
                  href="https://apgenco.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  APGENCO
                </a>
              </li>
              <li>
                <a 
                  href="https://apspdcl.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  APSPDCL
                </a>
              </li>
              <li>
                <a 
                  href="https://www.apeasternpower.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  APEPDCL
                </a>
              </li>
              <li>
                <a 
                  href="https://apcpdcl.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  APCPDCL
                </a>
              </li>
            </ul>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://sldc.aptransco.co.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  Substation Operations
                </a>
              </li>
              <li>
                <a 
                  href="http://203.153.46.111:8099/reports/jsp/formatoneahistory.htm?state=AP" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  Power Supply Positions
                </a>
              </li>
              <li>
                <a 
                  href="https://recindia.nic.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  REC INDIA
                </a>
              </li>
              <li>
                <a 
                  href="https://www.pfcindia.co.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  PFC INDIA
                </a>
              </li>
              <li>
                <a 
                  href="https://powermin.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 hover:underline transition-all block text-slate-300"
                >
                  MINISTRY OF POWER
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate coordinates */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            {language === "EN" ? "Main Head Office" : "ప్రధాన కార్యాలయం"}
          </h4>
          <p className="text-xs leading-relaxed text-slate-400">
            APTRANSCO Vidyut Soudha,
            <br />
            Gunadala, Vijayawada,
            <br />
            Andhra Pradesh - 520004.
            <br />
            INDIA
          </p>

        </div>

      </div>

      <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between gap-4 text-[10px] text-slate-500 max-w-[1650px] mx-auto border-slate-900`}>
        <p>© 2026 Transmission Corporation of Andhra Pradesh Limited (APTRANSCO). All rights reserved.</p>
        <p>Reference Concept designed for Website Competition. Content is for preview demonstration purposes.</p>
      </div>
    </footer>
  );
};
