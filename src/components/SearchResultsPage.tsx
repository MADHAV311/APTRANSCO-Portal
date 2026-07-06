import React, { useMemo, useState } from "react";
import { getUnifiedSearchResults, type SearchCategory, type SearchIndexItem } from "../searchIndex";
import {
  Search,
  ArrowRight,
  X,
  FileText,
  Zap,
  AlertCircle,
  Database,
  Building,
  Download,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";

interface SearchResultsPageProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setWebsitePage: (page: string) => void;
  language: "EN" | "TE";
  isHighContrast: boolean;
  fontScale: number;
}

type SearchFilter =
  | "all"
  | "pages"
  | "projects"
  | "departments"
  | "documents"
  | "recruitment"
  | "downloads"
  | "news"
  | "tenders"
  | "internalApps";

interface ResultSection {
  filter: Exclude<SearchFilter, "all">;
  category: SearchCategory;
  title: string;
  icon: LucideIcon;
  items: SearchIndexItem[];
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  searchQuery,
  setSearchQuery,
  setWebsitePage,
  language,
  isHighContrast,
  fontScale
}) => {
  const [selectedFilter, setSelectedFilter] = useState<SearchFilter>("all");
  const query = searchQuery.trim();
  const unifiedResults = useMemo(() => getUnifiedSearchResults(query, 50), [query]);
  const totalResults = unifiedResults.items.length;

  const itemsByCategory = useMemo(() => {
    const groups = new Map<SearchCategory, SearchIndexItem[]>();
    unifiedResults.items.forEach((item) => {
      groups.set(item.category, [...(groups.get(item.category) ?? []), item]);
    });
    return groups;
  }, [unifiedResults.items]);

  const sections: ResultSection[] = useMemo(() => [
    { filter: "pages", category: "Pages", title: language === "EN" ? "Portal Pages" : "Portal Pages", icon: Database, items: itemsByCategory.get("Pages") ?? [] },
    { filter: "tenders", category: "Tenders", title: language === "EN" ? "Procurement Tenders" : "Procurement Tenders", icon: FileText, items: itemsByCategory.get("Tenders") ?? [] },
    { filter: "projects", category: "Projects", title: language === "EN" ? "Grid Expansion Projects" : "Grid Expansion Projects", icon: Zap, items: itemsByCategory.get("Projects") ?? [] },
    { filter: "departments", category: "Departments", title: language === "EN" ? "Corporate Wings & Departments" : "Corporate Wings & Departments", icon: Building, items: itemsByCategory.get("Departments") ?? [] },
    { filter: "documents", category: "Documents", title: language === "EN" ? "Documents" : "Documents", icon: FileText, items: itemsByCategory.get("Documents") ?? [] },
    { filter: "recruitment", category: "Recruitment", title: language === "EN" ? "Recruitment" : "Recruitment", icon: AlertCircle, items: itemsByCategory.get("Recruitment") ?? [] },
    { filter: "downloads", category: "Downloads", title: language === "EN" ? "Downloads" : "Downloads", icon: Download, items: itemsByCategory.get("Downloads") ?? [] },
    { filter: "news", category: "News", title: language === "EN" ? "News" : "News", icon: AlertCircle, items: itemsByCategory.get("News") ?? [] },
    { filter: "internalApps", category: "Internal Apps", title: language === "EN" ? "Internal Apps" : "Internal Apps", icon: ShieldCheck, items: itemsByCategory.get("Internal Apps") ?? [] }
  ], [itemsByCategory, language]);

  const visibleSections = sections.filter((section) => section.items.length > 0);

  const suggestedCategories = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    const categories: string[] = [];

    if (/project|substation|line|grid|solar|wind|transmission|station/.test(lowerQuery)) categories.push("Projects");
    if (/tender|bid|procurement|contract|vendor/.test(lowerQuery)) categories.push("Tenders");
    if (/recruit|engineer|vacancy|career|job|appointment/.test(lowerQuery)) categories.push("Recruitment");
    if (/document|notice|circular|order|report|tariff|download|pdf/.test(lowerQuery)) categories.push("Documents");
    if (/department|wing|finance|hr|admin|it|telecom/.test(lowerQuery)) categories.push("Departments");
    if (/news|press|release/.test(lowerQuery)) categories.push("News");
    if (/internal|app|apps|employee|sso|erp|sap|scada|sldc|portal|login/.test(lowerQuery)) categories.push("Internal Apps");
    if (/page|about|contact|home|sitemap|privacy|faq/.test(lowerQuery)) categories.push("Pages");

    return categories.length > 0 ? categories : ["Projects", "Documents", "Departments", "Tenders", "Internal Apps"];
  }, [query]);

  const highlightText = (text: string, search: string) => {
    const tokens = search.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return <>{text}</>;

    const escaped = tokens.map((token) => token.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|");
    const matcher = new RegExp(`(${escaped})`, "gi");

    return (
      <>
        {text.split(matcher).map((part, index) =>
          tokens.some((token) => part.toLowerCase() === token.toLowerCase()) ? (
            <mark
              key={`${part}-${index}`}
              className={`px-0.5 rounded font-semibold ${isHighContrast ? "bg-amber-400 text-black" : "bg-yellow-200 text-slate-900"}`}
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const openResult = (url: string) => {
    setSearchQuery("");
    setWebsitePage(url);
  };

  const filterButtonClass = (filter: SearchFilter) => `portal-interactive text-xs font-semibold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
    selectedFilter === filter
      ? (isHighContrast ? "bg-amber-400 text-black" : "bg-blue-900 text-white")
      : (isHighContrast ? "bg-stone-900 text-stone-300 hover:bg-stone-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200")
  }`;

  const renderSection = (section: ResultSection) => {
    if (selectedFilter !== "all" && selectedFilter !== section.filter) return null;

    const Icon = section.icon;

    return (
      <section key={section.category} className="space-y-3 pt-2" aria-labelledby={`search-section-${section.filter}`}>
        <div className={`text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 ${isHighContrast ? "text-amber-400" : "text-slate-400"}`}>
          <Icon size={14} />
          <h3 id={`search-section-${section.filter}`} className="text-xs font-extrabold uppercase tracking-widest">
            {section.title} ({section.items.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {section.items.map((item) => (
            <article key={item.id} className={`portal-card p-4 rounded-xl border transition-all ${isHighContrast ? "bg-black border-stone-800" : "bg-white border-slate-200"}`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{item.category}</div>
                  <h4 className={`font-semibold text-sm leading-snug ${isHighContrast ? "text-stone-100" : "text-slate-800"}`}>
                    {highlightText(item.title, query)}
                  </h4>
                  {item.description && (
                    <p className="text-[11px] leading-relaxed text-slate-500">
                      {highlightText(item.description, query)}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openResult(item.url)}
                  aria-label={`Open ${item.title}`}
                  className={`portal-interactive flex items-center justify-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all self-start md:self-center shrink-0 ${
                    isHighContrast ? "bg-stone-900 border-amber-500 text-amber-400" : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-100"
                  }`}
                >
                  <span>Open</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto px-4 md:px-0 pb-10" style={{ fontSize: `${fontScale}em` }}>
      <div className="border-b border-slate-200 pb-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className={`text-[10px] uppercase font-bold tracking-wider block mb-1 ${isHighContrast ? "text-amber-400" : "text-blue-600"}`}>
              {language === "EN" ? "Global Search Engine" : "Global Search Engine"}
            </span>
            <h2 className={`text-2xl font-bold font-sans tracking-tight ${isHighContrast ? "text-white" : "text-slate-900"}`}>
              {language === "EN" ? "Advanced Search Results" : "Advanced Search Results"}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className={`portal-interactive flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all self-start sm:self-auto ${
              isHighContrast
                ? "bg-stone-900 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
            }`}
          >
            <X size={14} />
            {language === "EN" ? "Exit Search" : "Exit Search"}
          </button>
        </div>

        <p className={`text-sm mt-2 ${isHighContrast ? "text-stone-300" : "text-slate-500"}`}>
          Showing matches for{" "}
          <span className="font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
            {searchQuery || "all portal content"}
          </span>{" "}
          across pages, projects, departments, documents, recruitment, downloads, news, tenders, and internal apps.
        </p>
      </div>

      <div className={`portal-card p-4 rounded-xl border flex flex-wrap gap-2 items-center justify-between ${
        isHighContrast ? "bg-stone-950 border-stone-800" : "bg-white border-slate-200 shadow-xs"
      }`}>
        <div className="flex flex-wrap gap-1.5" role="toolbar" aria-label="Search result filters">
          <button type="button" onClick={() => setSelectedFilter("all")} className={filterButtonClass("all")}>
            All Results ({totalResults})
          </button>
          {visibleSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                type="button"
                key={section.filter}
                onClick={() => setSelectedFilter(section.filter)}
                className={filterButtonClass(section.filter)}
              >
                <Icon size={12} />
                {section.category} ({section.items.length})
              </button>
            );
          })}
        </div>

        <span className={`text-xs font-bold ${isHighContrast ? "text-amber-500" : "text-slate-500"}`} role="status">
          {totalResults} Total Entries
        </span>
      </div>

      <div className="space-y-4">
        {totalResults === 0 ? (
          <div className={`portal-card p-8 sm:p-12 text-center rounded-xl border ${
            isHighContrast ? "bg-stone-950 border-stone-800 text-stone-400" : "bg-white border-slate-200 text-slate-500 shadow-xs"
          }`}>
            <div className="max-w-md mx-auto space-y-3">
              <Search size={40} className={`mx-auto ${isHighContrast ? "text-amber-500" : "text-slate-300"}`} />
              <h3 className={`text-lg font-bold ${isHighContrast ? "text-stone-200" : "text-slate-800"}`}>No matches found</h3>
              <p className="text-xs leading-relaxed">
                We could not find documents, projects, bid specs, recruitment entries, internal apps, or directory pages matching{" "}
                <span className="font-mono font-bold">"{searchQuery}"</span>. Try a broader term or verify the spelling.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={`portal-interactive text-xs font-bold px-4 py-2 rounded-lg ${
                  isHighContrast ? "bg-amber-400 text-black hover:bg-amber-500" : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                Clear Search Criteria
              </button>
              {query && !unifiedResults.hasExactMatch && (
                <div className={`rounded-lg border px-3 py-2 text-left text-[11px] ${isHighContrast ? "border-stone-800 bg-stone-950 text-stone-300" : "border-slate-200 bg-slate-50 text-slate-600"}`}>
                  <div className={`font-semibold ${isHighContrast ? "text-stone-200" : "text-slate-700"}`}>Suggested categories</div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {suggestedCategories.map((category) => (
                      <span key={category} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${isHighContrast ? "bg-stone-900 text-amber-400" : "bg-white text-slate-700 border border-slate-200"}`}>
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleSections.map(renderSection)}
          </div>
        )}
      </div>
    </div>
  );
};
