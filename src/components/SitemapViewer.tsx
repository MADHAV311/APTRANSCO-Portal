import React, { useState } from "react";
import { SITEMAP_DATA, SitemapNode } from "../data";
import { Folder, File, ChevronRight, ChevronDown, Compass, CheckCircle } from "lucide-react";

interface NodeProps {
  node: SitemapNode;
  onPageSelect?: (url: string) => void;
  level: number;
  isHighContrast?: boolean;
}

const SitemapNodeComponent: React.FC<NodeProps> = ({ node, onPageSelect, level, isHighContrast }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const getCategoryBadge = (category: string) => {
    if (isHighContrast) {
      switch (category) {
        case "Core":
          return "bg-blue-950 text-blue-200 border-2 border-blue-400 font-bold";
        case "Operations":
          return "bg-amber-950 text-amber-200 border-2 border-amber-400 font-bold";
        case "Stakeholder":
          return "bg-emerald-950 text-emerald-200 border-2 border-emerald-400 font-bold";
        case "Department":
          return "bg-purple-950 text-purple-200 border-2 border-purple-400 font-bold";
        case "Utility":
          return "bg-stone-900 text-stone-200 border-2 border-stone-400 font-bold";
        default:
          return "bg-black text-white border-2 border-white font-bold";
      }
    }

    switch (category) {
      case "Core":
        return "bg-blue-100/90 text-blue-900 border-blue-300 font-bold";
      case "Operations":
        return "bg-amber-100/90 text-amber-900 border-amber-300 font-bold";
      case "Stakeholder":
        return "bg-emerald-100/90 text-emerald-900 border-emerald-300 font-bold";
      case "Department":
        return "bg-indigo-100/90 text-indigo-900 border-indigo-300 font-bold";
      case "Utility":
        return "bg-slate-100/90 text-slate-950 border-slate-300 font-bold";
      default:
        return "bg-gray-100 text-gray-900 border-gray-300 font-bold";
    }
  };

  return (
    <div className="ml-4 md:ml-6 my-1 select-none">
      <div 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 group ${
          isHighContrast
            ? hasChildren
              ? "bg-stone-900 border-amber-500/50 hover:bg-stone-800 cursor-pointer text-white"
              : "bg-black border-stone-800 hover:border-amber-400 cursor-pointer text-stone-300"
            : hasChildren 
              ? "bg-slate-50 border-slate-200 hover:bg-slate-100 cursor-pointer" 
              : "bg-white border-slate-100 hover:border-blue-400 cursor-pointer"
        }`}
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          } else if (onPageSelect) {
            onPageSelect(node.url);
          }
        }}
      >
        {hasChildren ? (
          <button className={`${isHighContrast ? "text-amber-400 hover:text-white" : "text-slate-500 hover:text-slate-800"} focus:outline-none`}>
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <div className="w-4" />
        )}

        {hasChildren ? (
          <Folder size={16} className={`${isHighContrast ? "text-amber-400" : "text-amber-500"} shrink-0`} />
        ) : (
          <File size={16} className={`${isHighContrast ? "text-blue-400" : "text-blue-500"} shrink-0`} />
        )}

        <span className={`text-sm font-medium ${
          isHighContrast 
            ? "text-white group-hover:text-amber-300" 
            : "text-slate-700 group-hover:text-blue-600"
        } ${!hasChildren ? "font-normal" : ""}`}>
          {node.name}
        </span>

        <span className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border ml-auto shrink-0 ${getCategoryBadge(node.category)}`}>
          {node.category}
        </span>

        {!hasChildren && onPageSelect && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPageSelect(node.url);
            }}
            className={`hidden group-hover:flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded transition-all duration-150 ${
              isHighContrast
                ? "text-black bg-amber-400 hover:bg-amber-300"
                : "text-blue-600 bg-blue-50 hover:bg-blue-100"
            }`}
          >
            <Compass size={12} />
            Go to Screen
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className={`border-l border-dashed ml-2 mt-1 ${isHighContrast ? "border-stone-700" : "border-slate-300"}`}>
          {node.children?.map((child, idx) => (
            <SitemapNodeComponent 
              key={idx} 
              node={child} 
              onPageSelect={onPageSelect} 
              level={level + 1} 
              isHighContrast={isHighContrast}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface SitemapViewerProps {
  onPageSelect: (url: string) => void;
  isHighContrast?: boolean;
}

export const SitemapViewer: React.FC<SitemapViewerProps> = ({ onPageSelect, isHighContrast }) => {
  return (
    <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${
      isHighContrast 
        ? "bg-black border-amber-500 text-white" 
        : "bg-slate-50/50 border-slate-200"
    }`}>
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5 mb-6 ${
        isHighContrast ? "border-stone-800" : "border-slate-200"
      }`}>
        <div>
          <h2 className={`text-2xl font-bold font-sans tracking-tight flex items-center gap-2 ${
            isHighContrast ? "text-amber-400" : "text-slate-900"
          }`}>
            <Compass className={isHighContrast ? "text-amber-400" : "text-blue-600"} />
            Proposed Navigation Architecture & Sitemap
          </h2>
          <p className={`text-sm mt-1 ${isHighContrast ? "text-stone-300" : "text-slate-500"}`}>
            This interactive hierarchy shows how content is structured for fast public access. Click nested categories to expand.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-md font-medium shadow-xs ${
            isHighContrast ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-white border-slate-200 text-slate-600"
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block"></span>
            Core Pages
          </span>
          <span className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-md font-medium shadow-xs ${
            isHighContrast ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-white border-slate-200 text-slate-600"
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
            Operational Info
          </span>
          <span className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-md font-medium shadow-xs ${
            isHighContrast ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-white border-slate-200 text-slate-600"
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
            Stakeholder
          </span>
          <span className={`flex items-center gap-1 border px-2.5 py-1.5 rounded-md font-medium shadow-xs ${
            isHighContrast ? "bg-stone-900 border-stone-800 text-stone-200" : "bg-white border-slate-200 text-slate-600"
          }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 block"></span>
            Departments
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`lg:col-span-8 p-5 rounded-xl border shadow-sm overflow-auto max-h-[650px] ${
          isHighContrast ? "bg-stone-950 border-stone-800" : "bg-white border-slate-200"
        }`}>
          <div className="min-w-[400px]">
            <SitemapNodeComponent node={SITEMAP_DATA} onPageSelect={onPageSelect} level={0} isHighContrast={isHighContrast} />
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className={`p-5 rounded-xl shadow-md border ${
            isHighContrast ? "bg-stone-950 border-amber-500/40 text-white" : "bg-slate-900 text-white border-slate-800"
          }`}>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${
              isHighContrast ? "text-amber-400" : "text-amber-400"
            }`}>
              Usability Navigation Logic
            </h3>
            <ul className={`space-y-3.5 text-xs ${isHighContrast ? "text-stone-200" : "text-slate-300"}`}>
              <li className="flex gap-2.5 items-start">
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Three-Click Rule:</strong> Any critical compliance document, tender status, or recruitment notification is reachable within 3 user actions from the landing page.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Role-Based Navigation:</strong> Separates public disclosure seekers (RTI, Tariffs) from commercial partners (Vendors, Tenders) to streamline user intents.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Redundant Global Links:</strong> All statutory filings (Privacy, RTI, Safety, Site Map) are fixed in the global footer to guarantee 100% search crawler indices.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Predictable URI Nesting:</strong> Path design remains clean, structured, and search-engine optimized (SEO) to allow easy bookmarking of government updates.</span>
              </li>
            </ul>
          </div>

          <div className={`p-5 rounded-xl border ${
            isHighContrast 
              ? "bg-stone-900 border-amber-500/30 text-stone-200" 
              : "bg-blue-50 border-blue-200 text-slate-700"
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              isHighContrast ? "text-amber-400" : "text-blue-800"
            }`}>
              Sitemap Instructions
            </h4>
            <p className={`text-xs leading-relaxed ${isHighContrast ? "text-stone-300" : "text-slate-600"}`}>
              This sitemap lists all <strong>26 mandatory pages and sections</strong> outlined in Section 6 and Section 20 of the APTRANSCO guidelines. 
              <br/><br/>
              Clicking a page in the site tree dynamically shifts the active preview window inside the <strong>"Web Mockups & Live Prototype"</strong> tab to that exact representative sub-page!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

