import { DEPARTMENTS, NOTICES, PROJECTS, SITEMAP_DATA, TENDERS } from "./data";

export type SearchCategory = "Pages" | "Projects" | "Departments" | "Documents" | "Recruitment" | "Downloads" | "News" | "Tenders" | "Internal Apps";

export interface SearchIndexItem {
  id: string;
  title: string;
  category: SearchCategory;
  url: string;
  keywords: string[];
  description?: string;
}

export interface UnifiedSearchResult {
  items: SearchIndexItem[];
  hasExactMatch: boolean;
  relatedCategories: SearchCategory[];
}

export const SEARCH_CATEGORY_ORDER: SearchCategory[] = [
  "Projects",
  "Departments",
  "Documents",
  "Recruitment",
  "News",
  "Downloads",
  "Tenders",
  "Internal Apps",
  "Pages"
];

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const getTokens = (value: string) => normalizeText(value).split(/\s+/).filter(Boolean);

const departmentUrlById: Record<string, string> = {
  "dept-1": "/departments/telecom-it",
  "dept-2": "/departments/grid-ops",
  "dept-3": "/departments/projects",
  "dept-4": "/departments/finance",
  "dept-5": "/departments/hr-admin"
};

const downloadItems: SearchIndexItem[] = [
  {
    id: "download-tariff-filings",
    title: "Tariff Filings and APERC Petitions",
    category: "Downloads",
    url: "/downloads",
    keywords: ["tariff", "aperc", "petition", "regulatory filing", "wheeling charges", "annual revenue requirement"],
    description: "Regulatory tariff filings, petitions and public disclosure downloads"
  },
  {
    id: "download-safety-manuals",
    title: "Safety Codes and Technical Manuals",
    category: "Downloads",
    url: "/downloads",
    keywords: ["safety", "grid code", "technical manual", "standards", "specification", "substation manual"],
    description: "Safety manuals, technical standards and operating code downloads"
  },
  {
    id: "download-annual-reports",
    title: "Annual Reports and Performance Audits",
    category: "Downloads",
    url: "/downloads",
    keywords: ["annual report", "audit", "performance", "financial statement", "report", "accounts"],
    description: "Annual reports, audit summaries and performance documents"
  },
  {
    id: "download-forms",
    title: "Public Forms and Application Downloads",
    category: "Downloads",
    url: "/downloads",
    keywords: ["forms", "application", "vendor registration", "rtgs", "public forms", "download"],
    description: "Forms and application files for stakeholders, vendors and citizens"
  }
];

const internalAppItems: SearchIndexItem[] = [
  {
    id: "internal-apps-dashboard",
    title: "Internal Apps Portal",
    category: "Internal Apps",
    url: "/internal-apps",
    keywords: ["internal apps", "employee portal", "sso", "erp", "intranet", "official login", "staff dashboard"],
    description: "Secure launchpad for APTRANSCO staff applications and authenticated services"
  },
  {
    id: "internal-apps-sap",
    title: "SAP ERP and Materials Management",
    category: "Internal Apps",
    url: "/internal-apps",
    keywords: ["sap", "erp", "materials", "finance", "purchase requisition", "inventory", "asset accounting"],
    description: "Enterprise finance, materials, procurement, and asset accounting workflows"
  },
  {
    id: "internal-apps-sldc",
    title: "SLDC Operations Console",
    category: "Internal Apps",
    url: "/internal-apps",
    keywords: ["sldc", "scada", "grid console", "load dispatch", "frequency", "demand", "operations"],
    description: "Operational console for grid frequency, demand, and corridor monitoring"
  },
  {
    id: "internal-apps-hr",
    title: "Employee HR and Performance Systems",
    category: "Internal Apps",
    url: "/internal-apps",
    keywords: ["hr", "employee", "payroll", "performance", "training", "prti", "e span", "attendance"],
    description: "Employee service, training, appraisal, and administrative workflows"
  }
];

const addSitemapItems = (items: SearchIndexItem[], node: typeof SITEMAP_DATA, parentPath = "") => {
  const currentUrl = parentPath ? `${parentPath}${node.url}` : node.url;

  if (node.name && node.url) {
    items.push({
      id: `page-${node.url}`,
      title: node.name,
      category: "Pages",
      url: node.url,
      keywords: [node.name, node.category.toLowerCase(), node.url],
      description: `Navigate to ${node.name}`
    });
  }

  node.children?.forEach((child) => addSitemapItems(items, child, currentUrl));
};

const buildSearchIndex = (): SearchIndexItem[] => {
  const items: SearchIndexItem[] = [];

  addSitemapItems(items, SITEMAP_DATA);

  PROJECTS.forEach((project) => {
    items.push({
      id: `project-${project.id}`,
      title: project.name,
      category: "Projects",
      url: "/departments/projects",
      keywords: [project.name, project.circle, project.voltageLevel, project.status, ...project.highlights],
      description: `${project.circle} • ${project.status} • ${project.voltageLevel}`
    });
  });

  DEPARTMENTS.forEach((department) => {
    items.push({
      id: `department-${department.id}`,
      title: department.name,
      category: "Departments",
      url: departmentUrlById[department.id] ?? "/departments",
      keywords: [department.name, department.description, department.headOfDepartment, ...department.keyResponsibilities, ...department.currentInitiatives],
      description: department.description
    });
  });

  TENDERS.forEach((tender) => {
    items.push({
      id: `tender-${tender.id}`,
      title: tender.title,
      category: "Tenders",
      url: "/tenders",
      keywords: [tender.referenceNo, tender.category, tender.circle, tender.status, tender.title],
      description: `${tender.referenceNo} • ${tender.circle} • ₹${tender.valueCr.toFixed(2)} Cr`
    });

    items.push({
      id: `document-${tender.id}`,
      title: `${tender.title} (Tender Document)`,
      category: "Documents",
      url: "/downloads",
      keywords: [tender.referenceNo, tender.category, tender.circle, tender.title, "tender document", "pdf"],
      description: `Tender document for ${tender.referenceNo}`
    });
  });

  NOTICES.forEach((notice) => {
    const isRecruitment = /recruit|assistant|engineer|vacancy|appointment/i.test(notice.title);
    const isNews = /press|release|news/i.test(notice.title);

    if (isRecruitment) {
      items.push({
        id: `recruitment-${notice.id}`,
        title: notice.title,
        category: "Recruitment",
        url: "/notices#careers",
        keywords: [notice.title, notice.department, notice.category, "recruitment", "vacancy", "employment"],
        description: `${notice.department} • ${notice.publishDate}`
      });
    }

    if (isNews) {
      items.push({
        id: `news-${notice.id}`,
        title: notice.title,
        category: "News",
        url: "/notices#press",
        keywords: [notice.title, notice.department, notice.category, "press release", "news"],
        description: `${notice.department} • ${notice.publishDate}`
      });
    }

    items.push({
      id: `document-notice-${notice.id}`,
      title: notice.title,
      category: "Documents",
      url: "/downloads",
      keywords: [notice.title, notice.department, notice.category, "circular", "order", "document", "download", "pdf"],
      description: `${notice.department} • ${notice.publishDate}`
    });
  });

  items.push({
    id: "downloads-library",
    title: "Document Library & Downloads",
    category: "Downloads",
    url: "/downloads",
    keywords: ["downloads", "document library", "reports", "tariffs", "circulars", "orders", "pdf"],
    description: "Access public documents, tariffs, reports, and downloadable resources"
  });

  downloadItems.forEach((item) => items.push(item));
  internalAppItems.forEach((item) => items.push(item));

  const uniqueItems = new Map<string, SearchIndexItem>();
  items.forEach((item) => uniqueItems.set(`${item.category}-${item.url}-${item.title}`, item));

  return Array.from(uniqueItems.values());
};

export const SEARCH_INDEX: SearchIndexItem[] = buildSearchIndex();

export const getUnifiedSearchResults = (query: string, limit = 10): UnifiedSearchResult => {
  const trimmedQuery = query.trim();
  const normalizedQuery = normalizeText(trimmedQuery);

  if (!normalizedQuery) {
    return { items: [], hasExactMatch: false, relatedCategories: [] };
  }

  const queryTokens = getTokens(trimmedQuery);

  const scoredItems = SEARCH_INDEX.map((item) => {
    const haystack = [item.title, item.description ?? "", item.category, ...item.keywords].join(" ");
    const normalizedHaystack = normalizeText(haystack);
    const title = normalizeText(item.title);
    const category = normalizeText(item.category);
    const keywords = item.keywords.map((keyword) => normalizeText(keyword));
    const description = normalizeText(item.description ?? "");

    let score = 0;

    if (title === normalizedQuery) {
      score += 120;
    }

    if (title.includes(normalizedQuery)) {
      score += 55;
    }

    if (normalizedHaystack.includes(normalizedQuery)) {
      score += 38;
    }

    if (category.includes(normalizedQuery)) {
      score += 90;
    }

    queryTokens.forEach((token) => {
      if (title.includes(token)) score += 30;
      if (description.includes(token)) score += 16;
      if (category.includes(token)) score += 12;
      if (keywords.some((keyword) => keyword.includes(token))) score += 14;
      if (normalizedHaystack.includes(token)) score += 8;
    });

    const matchedTokenCount = queryTokens.filter((token) => normalizedHaystack.includes(token)).length;
    score += matchedTokenCount * 8;

    const categoryRank = SEARCH_CATEGORY_ORDER.indexOf(item.category);

    return { item, score, categoryRank: categoryRank === -1 ? 99 : categoryRank };
  })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.categoryRank - b.categoryRank || a.item.title.localeCompare(b.item.title));

  const exactMatches = scoredItems.filter(({ item }) => {
    const searchableValues = [item.title, item.category, item.url, ...item.keywords].map(normalizeText);
    return searchableValues.some((value) => value === normalizedQuery);
  });

  const items = scoredItems.slice(0, limit).map(({ item }) => item);

  const relatedCategories = Array.from(new Set(scoredItems.map(({ item }) => item.category))).slice(0, 4) as SearchCategory[];

  return {
    items,
    hasExactMatch: exactMatches.length > 0,
    relatedCategories
  };
};
