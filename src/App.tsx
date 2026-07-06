import React, { useState, useEffect, useRef } from "react";
import { SitemapViewer } from "./components/SitemapViewer";
import { StyleGuide } from "./components/StyleGuide";
import { UIUXRationale } from "./components/UIUXRationale";
import { SubmissionDetails } from "./components/SubmissionDetails";
import { Navigation, Footer } from "./components/Navigation";
import { HomeMockup } from "./components/HomeMockup";
import { AboutPage, OperationsPage, TendersPage, RTIPage, InternalAppsPage } from "./components/InnerPages";
import { TelecomITPage, ContactPage, DownloadsPage, Error404Page, PrivacyPage } from "./components/SubPages";
import { GridOpsPage, ProjectsPage, FinancePage, HRAdminPage } from "./components/DepartmentPages";
import { NoticesCareersPage } from "./components/NoticesCareersPage";
import { SearchResultsPage } from "./components/SearchResultsPage";
import { Award, Compass, Palette, BookOpen, FileText, Smartphone, Tablet, Monitor, Info, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"prototype" | "sitemap" | "styleguide" | "rationale" | "credentials">("prototype");
  const [websitePage, setWebsitePage] = useState<string>("/");
  const [navCounter, setNavCounter] = useState<number>(0);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const scrollPositions = useRef<Record<string, number>>({});

  const handleNavigate = (url: string) => {
    scrollPositions.current[websitePage] = window.scrollY;
    setWebsitePage(url);
    setNavCounter(prev => prev + 1);
    setActiveTab("prototype");
  };
  const [fontScale, setFontScale] = useState<number>(1);
  const [language, setLanguage] = useState<"EN" | "TE">("EN");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // Dynamically update viewport mode based on actual window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setViewportMode("mobile");
      } else if (width >= 768 && width < 1024) {
        setViewportMode("tablet");
      } else {
        setViewportMode("desktop");
      }
    };

    // Initialize on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  // Scroll to top or handle hash navigation when active page or tab changes
  useEffect(() => {
    const hashIndex = websitePage.indexOf("#");
    if (hashIndex !== -1) {
      const hash = websitePage.substring(hashIndex + 1);
      // Wait a short delay to ensure the component is fully mounted and rendered in DOM
      const timer = setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      const restoredTop = scrollPositions.current[websitePage] ?? 0;
      window.scrollTo({ top: restoredTop, behavior: restoredTop > 0 ? "smooth" : "auto" });
      // In case there are inner layout containers with custom scrollbars
      const mainEl = document.querySelector("main");
      if (mainEl) mainEl.scrollTop = 0;
    }
  }, [websitePage, activeTab, navCounter]);

  // Reset page view when searching
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      if (websitePage !== "/tenders" && websitePage !== "/notices" && websitePage !== "/downloads") {
        // Stay on page if it supports tables, or redirect
      }
    }
  }, [searchQuery]);

  // Handle sitemap link clicks
  const handleSitemapPageSelect = (url: string) => {
    handleNavigate(url);
  };

  // Render sub page mockup inside our prototype frame
  const renderPrototypePage = () => {
    if (searchQuery.trim().length > 0) {
      return (
        <SearchResultsPage 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          setWebsitePage={handleNavigate}
          language={language}
          isHighContrast={isHighContrast}
          fontScale={fontScale}
        />
      );
    }

    // Basic route parsing including hash anchors
    const path = websitePage.split("#")[0];

    switch (path) {
      case "/search":
        return (
          <SearchResultsPage 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            setWebsitePage={handleNavigate}
            language={language}
            isHighContrast={isHighContrast}
            fontScale={fontScale}
          />
        );
      case "/":
        return <HomeMockup setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/about":
        return <AboutPage language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/operations":
        return <OperationsPage language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/tenders":
        return <TendersPage language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/rti":
        return <RTIPage language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/departments/telecom-it":
        return <TelecomITPage setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/departments/grid-ops":
        return <GridOpsPage setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/departments/projects":
        return <ProjectsPage setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/departments/finance":
        return <FinancePage setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/departments/hr-admin":
        return <HRAdminPage setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/contact":
        return <ContactPage setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/downloads":
        return <DownloadsPage setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/privacy":
        return <PrivacyPage setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/notices":
        return <NoticesCareersPage websitePage={websitePage} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/internal-apps":
        return <InternalAppsPage language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
      case "/sitemap":
        return (
          <div className="max-w-[1650px] mx-auto px-4 md:px-8 py-8 space-y-4">
            <div className={`p-4 rounded-xl text-xs border ${
              isHighContrast 
                ? "bg-stone-900 border-amber-500/30 text-stone-300" 
                : "bg-blue-50 border-blue-200 text-slate-700"
            }`}>
              <strong>Notice:</strong> Showing proposed sitemap overview. You can also view the full node-expansion tree directly on the main <strong>Interactive Sitemap & IA</strong> tab.
            </div>
            <SitemapViewer onPageSelect={handleSitemapPageSelect} isHighContrast={isHighContrast} />
          </div>
        );
      default:
        return <Error404Page setActivePage={handleNavigate} language={language} isHighContrast={isHighContrast} fontScale={fontScale} viewportMode={viewportMode} />;
    }
  };

  // Viewport simulator dimensions
  const getViewportClass = () => {
    switch (viewportMode) {
      case "tablet":
        return "max-w-[768px] mx-auto border-x-8 border-slate-300 rounded-2xl shadow-xl";
      case "mobile":
        return "max-w-[390px] mx-auto border-x-8 border-slate-400 rounded-3xl shadow-2xl";
      default:
        return "w-full";
    }
  };

  return (
    <div className={`min-h-screen font-sans bg-slate-100 flex flex-col ${isHighContrast ? "bg-stone-900" : ""}`}>
      <button
        type="button"
        onClick={() => document.getElementById("main-content")?.focus()}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-amber-400 focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-black"
      >
        Skip to main content
      </button>
      
      {/* Workspace Main Top Title Strip removed */}

      {/* Primary Tab Canvas Area */}
      <main id="main-content" tabIndex={-1} className={`flex-1 transition-all duration-300 ${
        activeTab === "prototype" ? "p-0 max-w-full w-full" : "p-4 md:p-8 max-w-[1650px] w-full mx-auto"
      }`}>
        <AnimatePresence mode="wait">
          {activeTab === "prototype" && (
            <motion.div
              key="prototype"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              
              {/* Responsive Page Frame */}
              <div className="transition-all duration-300 bg-white flex flex-col w-full min-h-screen">
                
                {/* Proposed Executive Redesigned Header */}
                <Navigation 
                  activePage={websitePage} 
                  setActivePage={handleNavigate} 
                  isHighContrast={isHighContrast} 
                  setIsHighContrast={setIsHighContrast}
                  fontScale={fontScale}
                  setFontScale={setFontScale}
                  language={language}
                  setLanguage={setLanguage}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  viewportMode={viewportMode}
                />

                {/* Proposed Web Page Body Content */}
                <div className="min-h-[500px] relative overflow-hidden transition-all duration-300 bg-slate-50">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${websitePage}-${navCounter}`}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {renderPrototypePage()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Proposed Design Footer */}
                <Footer setActivePage={handleNavigate} setSearchQuery={setSearchQuery} language={language} isHighContrast={isHighContrast} viewportMode={viewportMode} />

              </div>


            </motion.div>
          )}

          {activeTab === "sitemap" && (
            <motion.div
              key="sitemap"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SitemapViewer onPageSelect={handleSitemapPageSelect} isHighContrast={isHighContrast} />
            </motion.div>
          )}

          {activeTab === "styleguide" && (
            <motion.div
              key="styleguide"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <StyleGuide />
            </motion.div>
          )}

          {activeTab === "rationale" && (
            <motion.div
              key="rationale"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <UIUXRationale />
            </motion.div>
          )}

          {activeTab === "credentials" && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <SubmissionDetails />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Main deliverables navigation bar (sticky bottom) */}
      <nav aria-label="Design deliverables" className="bg-white/80 backdrop-blur-md border-t border-slate-200/60 px-4 py-3 overflow-x-auto flex gap-2 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] sticky bottom-0 z-50 justify-start sm:justify-center">
        <button 
          type="button"
          onClick={() => setActiveTab("prototype")}
          aria-current={activeTab === "prototype" ? "page" : undefined}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
            activeTab === "prototype" 
              ? "bg-[#0f172a] text-white shadow-lg shadow-slate-900/10 border border-slate-800" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Monitor size={14} className={activeTab === "prototype" ? "text-amber-500 animate-pulse" : ""} />
          Web Mockups & Live Prototype
        </button>

        <button 
          type="button"
          onClick={() => setActiveTab("sitemap")}
          aria-current={activeTab === "sitemap" ? "page" : undefined}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
            activeTab === "sitemap" 
              ? "bg-[#0f172a] text-white shadow-lg shadow-slate-900/10 border border-slate-800" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <Compass size={14} className={activeTab === "sitemap" ? "text-amber-500 animate-spin-slow" : ""} />
          Interactive Sitemap & IA
        </button>

        <button 
          type="button"
          onClick={() => setActiveTab("credentials")}
          aria-current={activeTab === "credentials" ? "page" : undefined}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
            activeTab === "credentials" 
              ? "bg-[#0f172a] text-white shadow-lg shadow-slate-900/10 border border-slate-800" 
              : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          }`}
        >
          <FileText size={14} className={activeTab === "credentials" ? "text-amber-500" : ""} />
          Official Team Credentials
        </button>

      </nav>

      {/* Global Workspace footer */}
      <div className="bg-slate-900 text-slate-500 text-[11px] py-4 text-center border-t border-slate-800">
        <p>APTRANSCO Website Design Competition Reference Entry Hub - 2026. Made with React and Tailwind CSS.</p>
      </div>

    </div>
  );
}
