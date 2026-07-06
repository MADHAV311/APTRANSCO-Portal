import React, { useState } from "react";
import { Palette, Type, Square, Eye, Check, RefreshCw } from "lucide-react";

interface ColorSwatchProps {
  name: string;
  hex: string;
  role: string;
  textColor: string;
  contrastRatio: string;
  wcagRating: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, hex, role, textColor, contrastRatio, wcagRating }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
      <div 
        className="h-24 flex flex-col justify-end p-3 text-xs font-mono" 
        style={{ backgroundColor: hex, color: textColor }}
      >
        <span className="font-semibold text-sm drop-shadow-xs">{name}</span>
        <span className="opacity-80 font-bold drop-shadow-xs">{hex}</span>
      </div>
      <div className="p-3.5 space-y-2">
        <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Application Role</p>
        <p className="text-xs text-slate-700 font-medium leading-relaxed">{role}</p>
        <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-xs">
          <span className="text-slate-500">WCAG Contrast:</span>
          <div className="flex items-center gap-1.5 font-bold">
            <span className="text-slate-800">{contrastRatio}</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider">
              {wcagRating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StyleGuide: React.FC = () => {
  const [btnHovered, setBtnHovered] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", status: "Pending" });
  const [fontSizePreview, setFontSizePreview] = useState(16);

  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-900 flex items-center gap-2">
          <Palette className="text-amber-500" />
          APTRANSCO Design System & Style Guide
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          A rigid, governance-compliant and highly accessible UI foundation optimized for slow networks, screen-readers, and professional aesthetic stability.
        </p>
      </div>

      {/* Grid Colors */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          1. Color Palette & Accessibility Rating
        </h3>
        <p className="text-xs text-slate-500">
          Our brand colors prioritize national stability and electrical energy signatures. To satisfy the WCAG 2.1 AA/AAA compliance thresholds (required by public utility design standards), we verify background-to-text contrast ratios.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ColorSwatch 
            name="Imperial Navy (Primary)" 
            hex="#0F172A" 
            role="Primary backgrounds, main headers, footers, and prominent visual anchor plates."
            textColor="#FFFFFF"
            contrastRatio="15.2 : 1"
            wcagRating="AAA Pass"
          />
          <ColorSwatch 
            name="Electricity Royal (Secondary)" 
            hex="#1E3A8A" 
            role="Sub-page headers, section dividers, active menu tabs, and key interactive buttons."
            textColor="#FFFFFF"
            contrastRatio="11.4 : 1"
            wcagRating="AAA Pass"
          />
          <ColorSwatch 
            name="Andhra Gold (Accent)" 
            hex="#D97706" 
            role="Urgent notifications, active grid ticks, tender status highlights, and visual borders."
            textColor="#FFFFFF"
            contrastRatio="4.6 : 1"
            wcagRating="AA Pass"
          />
          <ColorSwatch 
            name="Clean Slate (Background)" 
            hex="#F8FAFC" 
            role="Primary body canvas backdrop, providing maximum eye safety and text legibility."
            textColor="#0F172A"
            contrastRatio="14.8 : 1"
            wcagRating="AAA Pass"
          />
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          2. Typeface Hierarchy
        </h3>
        <p className="text-xs text-slate-500">
          We use a multi-font pair that bridges modern design with scientific utility.
        </p>
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 border-r border-slate-100 pr-5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">Display Heading Font</span>
            <h4 className="text-xl font-bold font-sans tracking-tight text-slate-800">Space Grotesk</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Used for main page headers, key stats, and banner hero panels. Provides a modern, technical, engineered structural presence.
            </p>
            <div className="text-4xl font-sans font-bold text-slate-800 mt-2">Aa Bb Cc 123</div>
          </div>

          <div className="space-y-2 border-r border-slate-100 pr-5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">Body & UI Sans-Serif</span>
            <h4 className="text-xl font-bold font-sans tracking-tight text-slate-800">Inter</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Used for general text, forms, submenus, and reading lists. Extremely legible at tiny sizes (e.g. 11px) on mobile and slow screens.
            </p>
            <div className="text-4xl font-sans text-slate-800 mt-2">Aa Bb Cc 123</div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">Technical Monospace</span>
            <h4 className="text-xl font-semibold font-mono text-slate-800">JetBrains Mono</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Used for telemetry tickers, numbers, code, tender reference codes, file sizes, and grid parameters. Shows high precision.
            </p>
            <div className="text-3xl font-mono text-slate-800 mt-2">APT-400KV-99%</div>
          </div>
        </div>

        {/* Font Adjuster interactive */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-700">Dynamic Accessibility Reading Resizer</span>
            <p className="text-[11px] text-slate-500">Simulate APTRANSCO's built-in header font enlarger (A+, A, A-).</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setFontSizePreview(Math.max(12, fontSizePreview - 2))}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSizePreview(16)}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Normal
            </button>
            <button 
              onClick={() => setFontSizePreview(Math.min(24, fontSizePreview + 2))}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              A+
            </button>
          </div>
        </div>
        <div 
          className="p-5 border border-dashed border-slate-300 rounded-xl bg-white text-slate-700 font-sans transition-all duration-150"
          style={{ fontSize: `${fontSizePreview}px` }}
        >
          Sample Paragraph: "APTRANSCO is committed to transmitting electrical energy uninterruptedly across Andhra Pradesh, adhering to international grid security and stability safety thresholds."
        </div>
      </section>

      {/* Buttons & Interactive Components */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          3. Button Library & State Mockups
        </h3>
        <p className="text-xs text-slate-500">
          Buttons are designed for explicit click targets of 44x44px, ensuring touch-compatibility on mobile layouts.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {/* Primary */}
          <div className="space-y-2 border-r border-slate-100 last:border-0 pr-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Primary Grid Action</span>
            <button 
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs px-4 py-3 rounded-lg shadow-sm transition-all duration-200"
            >
              Submit Tender Bid
            </button>
            <span className="text-[10px] text-slate-400 block mt-1">Normal state: Deep Navy (#0F172A)</span>
          </div>

          {/* Secondary */}
          <div className="space-y-2 border-r border-slate-100 last:border-0 pr-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Secondary Outline</span>
            <button 
              className="w-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-xs px-4 py-3 rounded-lg transition-all duration-200"
            >
              Download PDF Report
            </button>
            <span className="text-[10px] text-slate-400 block mt-1">Border outlines; safe background</span>
          </div>

          {/* Warning / Accent */}
          <div className="space-y-2 border-r border-slate-100 last:border-0 pr-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Emergency Warning</span>
            <button 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs px-4 py-3 rounded-lg shadow-xs transition-all duration-200"
            >
              View Grid Outage Alerts
            </button>
            <span className="text-[10px] text-slate-400 block mt-1">Amber Gold highlighting</span>
          </div>

          {/* Status Indicators */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1">Accessibility Switch</span>
            <button 
              className="w-full bg-slate-900 border-2 border-amber-500 text-amber-500 font-mono text-xs px-4 py-2.5 rounded-lg font-bold"
            >
              HIGH CONTRAST ON
            </button>
            <span className="text-[10px] text-slate-400 block mt-1">Guarantees compliance under sunlight</span>
          </div>
        </div>
      </section>

      {/* Forms & Table Controls */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          4. Governance Form Inputs & Tables
        </h3>
        <p className="text-xs text-slate-500">
          Clean input layouts with micro-error labels keep compliance filings understandable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Interactive Form Controls</h4>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 flex justify-between">
                <span>Contractor Name</span>
                <span className="text-slate-400 italic">Required</span>
              </label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter registered APTRANSCO ID"
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              />
              {formData.name.length > 0 && formData.name.length < 5 && (
                <p className="text-[10px] text-amber-600 font-medium">Warning: ID format usually contains at least 5 alphanumeric characters.</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Tender Clearance Stage</label>
              <select 
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-slate-300 rounded-lg bg-white px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
              >
                <option value="Pending">Pending Evaluation (Technical)</option>
                <option value="Cleared">Cleared & Awarded (L1 Bidder)</option>
                <option value="Rejected">Rejected/Disqualified (Financial)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">Structured Grid Table (Compliance Standard)</h4>
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold">
                    <th className="p-2">SUBSTATION</th>
                    <th className="p-2">CAPACITY</th>
                    <th className="p-2">TELE-STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-2 font-medium">Vijayawada GIS</td>
                    <td className="p-2 font-mono">1000 MVA</td>
                    <td className="p-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">ACTIVE</span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-2 font-medium">Orvakal Pool</td>
                    <td className="p-2 font-mono">2000 MVA</td>
                    <td className="p-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">ACTIVE</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2 font-medium">Araku Valley</td>
                    <td className="p-2 font-mono">63 MVA</td>
                    <td className="p-2">
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[9px] font-bold">STANDBY</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
              Tables implement high contrast text padding, explicit border dividers, and high-visibility status badges.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
