import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ShieldCheck, FlaskRound, Thermometer, AlertTriangle, ChevronDown, ChevronUp, Lock } from "lucide-react";

const DOCS = [
  {
    icon: ShieldCheck,
    category: "Certificate of Analysis",
    color: "text-green-600 bg-green-50 border-green-200",
    items: [
      { name: "BPC-157 — Batch #CL-2609", date: "May 2026", purity: "99.4%", public: true },
      { name: "TB-500 — Batch #CL-2607", date: "May 2026", purity: "99.1%", public: true },
      { name: "Semaglutide — Batch #CL-2601", date: "Apr 2026", purity: "99.7%", public: true },
      { name: "CJC-1295 — Batch #CL-2598", date: "Apr 2026", purity: "99.2%", public: true },
      { name: "Tirzepatide — Batch #CL-2605", date: "May 2026", purity: "99.5%", public: true },
    ],
  },
  {
    icon: FlaskRound,
    category: "Batch Reports",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    items: [
      { name: "HPLC Analysis Report — May 2026", date: "May 2026", public: true },
      { name: "Mass Spectrometry — Q2 2026", date: "Apr 2026", public: true },
      { name: "Endotoxin Testing — Apr 2026", date: "Apr 2026", public: false },
    ],
  },
  {
    icon: Thermometer,
    category: "Storage & Stability",
    color: "text-orange-600 bg-orange-50 border-orange-200",
    items: [
      { name: "Lyophilized Peptide Storage Guide", date: "2026", public: true },
      { name: "Cold-Chain Shipping Protocols", date: "2026", public: true },
      { name: "Stability Study — 12-Month Data", date: "Mar 2026", public: false },
    ],
  },
  {
    icon: AlertTriangle,
    category: "MSDS / SDS Sheets",
    color: "text-red-600 bg-red-50 border-red-200",
    items: [
      { name: "BPC-157 Safety Data Sheet", date: "2026", public: true },
      { name: "Semaglutide SDS", date: "2026", public: true },
      { name: "General Research Peptide SDS", date: "2026", public: true },
    ],
  },
];

function DocSection({ doc }) {
  const [open, setOpen] = useState(false);
  const Icon = doc.icon;
  return (
    <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors text-left">
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg border flex items-center justify-center ${doc.color}`}>
            <Icon className="w-4 h-4" />
          </span>
          <div>
            <p className="text-sm font-bold text-foreground">{doc.category}</p>
            <p className="text-[11px] text-muted-foreground">{doc.items.length} documents</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && (
        <div className="px-5 pb-4 space-y-2 border-t border-border/60">
          {doc.items.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-xs text-foreground truncate">{item.name}</span>
                {item.purity && (
                  <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full flex-shrink-0">{item.purity}</span>
                )}
              </div>
              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                <span className="text-[10px] text-muted-foreground">{item.date}</span>
                {item.public ? (
                  <button className="text-[10px] font-semibold text-primary border border-primary/30 px-2 py-0.5 rounded-full hover:bg-primary/5 transition-colors">
                    Download
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground border border-border/60 px-2 py-0.5 rounded-full">
                    <Lock className="w-2.5 h-2.5" /> Approved accounts
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WholesaleDocPortal() {
  return (
    <section className="py-20 bg-secondary/20">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3 block">Documentation</span>
          <h2 className="font-display text-3xl font-light text-foreground mb-3">
            COA & Documentation <span className="text-primary italic">Portal</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            Every batch is third-party tested. Public documents available immediately — full batch data unlocked for approved wholesale accounts.
          </p>
        </motion.div>

        <div className="space-y-3">
          {DOCS.map((doc) => (
            <DocSection key={doc.category} doc={doc} />
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl text-center">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Approved wholesale partners</strong> receive full access to batch reports, endotoxin data, and long-term stability studies.{" "}
            <a href="#apply" className="text-primary font-semibold hover:underline">Apply for access →</a>
          </p>
        </div>
      </div>
    </section>
  );
}