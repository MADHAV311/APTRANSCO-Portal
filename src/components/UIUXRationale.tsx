import React from "react";
import { BookOpen, Users, CheckCircle, ShieldAlert, Award } from "lucide-react";

export const UIUXRationale: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-900 flex items-center gap-2">
          <BookOpen className="text-blue-600" />
          UI/UX Rationale & Technical Note
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Technical defense of our design architecture explaining how this concept fulfills the rigorous state standards of APTRANSCO.
        </p>
      </div>

      {/* Concept & Identity */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-950 flex items-center gap-1.5">
          <Award className="text-amber-500" size={18} />
          Design Theme: Reimagining APTRANSCO's Digital Public Interface
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          The concept centers on **"Institutional Credibility and Digital Forwardness."** Our design presents APTRANSCO not simply as a government administrative body, but as a high-technology, mission-critical power transmission utility. 
          <br /><br />
          We intentionally avoided overly playful elements, excessive animations, or commercial templates. The aesthetic is clean, sharp, high-contrast, and solid, utilizing geometric lines to evoke an electrical power transmission grid.
        </p>
      </section>

      {/* Target User Personas */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Users className="text-blue-600" size={18} />
          Target User Segment & Persona Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Citizens & Landowners</span>
            <p className="text-[11px] text-slate-500">
              Needs access to safety clearances, RTI disclosures, contact telephone directories for local circle offices, and compensation/RoW updates. 
            </p>
            <p className="text-xs font-semibold text-slate-700">Priority: Easy, clear font-resizing & local phone search.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Vendors & Contractors</span>
            <p className="text-[11px] text-slate-500">
              Needs instant access to active tenders, downloadable specification PDFs, clarification schedules, and vendor registration checklists.
            </p>
            <p className="text-xs font-semibold text-slate-700">Priority: Searchable, filterable Tender lists & PDFs.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Sector Regulators & Media</span>
            <p className="text-[11px] text-slate-500">
              Needs high-fidelity data reporting: grid demand curves, financial balance sheets, annual tariff reports, and formal press releases.
            </p>
            <p className="text-xs font-semibold text-slate-700">Priority: Live telemetry tickers & structured downloads.</p>
          </div>
        </div>
      </section>

      {/* Content Grouping and IA */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800">Content Grouping & Usability Principles</h3>
        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 bg-white">
          <div className="p-4 flex gap-4 items-start">
            <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800">Unified Global Navigation Structure</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                We grouped APTRANSCO's vast list of 26 required sections into 5 logical directories: Core Public, Operational Info, Stakeholder, Representative Departments, and Utility Pages. This structured taxonomy ensures that users do not suffer from link fatigue.
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-4 items-start">
            <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800">Dynamic Live Telemetry Dashboard</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Rather than hiding state grid data deep inside static PDF reports, we integrated an interactive Grid Telemetry Ticker at the top of the homepage. By exposing State Demand (MW), Grid Frequency (Hz), and Renewable Energy Share, we immediately signal transparency and high technical competence.
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-4 items-start">
            <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-800">WCAG 2.1 AA Accessibility Framework</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                The layout includes a persistent Accessibility Controls panel enabling users to switch to high-contrast monochrome mode, increase/decrease global reading font sizes by up to 150%, and activate optimized semantic landmarks for screen-reader speech synthesizers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security posture and technical suitability */}
      <section className="bg-slate-900 text-white border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="text-amber-400" size={20} />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">Cyber Security & Public Trust Alignment</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          APTRANSCO operates national critical grid infrastructure. As highlighted in **Section 10 of the competition guidelines**, the website design must conceptually defend itself from threat vectors:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-400">
          <li className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <strong className="text-white block mb-0.5">Zero Third-Party Dependency</strong>
            Our layout avoids fragile trackers, commercial fonts, or external jQuery widgets. Self-contained static assets reduce client-side code injection surface areas and guarantee lightning-fast load times even on low-bandwidth 2G/3G connections in rural circles.
          </li>
          <li className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <strong className="text-white block mb-0.5">Secure Document Distribution</strong>
            The proposed document library isolates downloadable assets into read-only Object Storage paths. Each tender file hash can be printed directly in notifications, ensuring anti-tamper verification.
          </li>
        </ul>
      </section>
    </div>
  );
};
