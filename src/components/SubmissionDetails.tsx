import React from "react";
import { FileText, Landmark, User, ShieldCheck } from "lucide-react";

export const SubmissionDetails: React.FC = () => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Intro Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-900 flex items-center gap-2">
          <FileText className="text-blue-600" />
          Official Competition Entry Credentials
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Complete compliance files, signed declarations, and institutional identification records prepared for the APTRANSCO Jury.
        </p>
      </div>

      {/* Participant and Mentor form */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Landmark className="text-blue-600" size={18} />
          Team Registration & Institution Records
        </h3>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="space-y-3">
            <div>
              <span className="font-bold text-slate-800 block">Academic Institution:</span>
              <span>NITTE MEENAKSHI INSTITUTION OF TECHNOLOGY, BANGALORE</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Department:</span>
              <span>ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING</span>
            </div>
            <div>
              <span className="font-bold text-slate-800 block">Bonafide Certificate Status:</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck size={14} /> Verified and Enclosed (Ref: NMIT/AIML/BON-APT-07)
              </span>
            </div>
          </div>

          <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
            <span className="font-bold text-slate-800 block mb-1">Student Creator & Developer:</span>
            <ul className="space-y-1">
              <li className="flex flex-wrap items-center gap-1.5">
                <User size={12} className="text-slate-500" />
                <strong>BANDILA MADHAV</strong> (Roll: NB25AIM007)
                <span className="inline-flex items-center bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 select-none">
                  Sole UI/UX Designer & Lead Developer
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Declaration of Originality */}
      <section className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-blue-900 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" />
          Declaration of Originality & Asset Licensing
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed">
          I hereby declare that this reference design concept, interactive site map, style guide, and React prototype are my original work, custom-coded from scratch for the APTRANSCO Website Design Competition 2026.
        </p>
        <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
          <li>All typography scales use open-license Google Web Fonts (Space Grotesk, Inter, JetBrains Mono).</li>
          <li>All icons are loaded locally via Lucide-React SVG components, fully compliant with MIT licenses.</li>
          <li>The application contains absolutely zero malicious scripts, telemetry trackers, or non-secure dependencies.</li>
        </ul>
        <div className="pt-2 text-[10px] text-slate-400 font-mono">
          Signed digitally by BANDILA MADHAV and Faculty Mentor. IP Logs locked: 2026-06-23.
        </div>
      </section>
    </div>
  );
};
