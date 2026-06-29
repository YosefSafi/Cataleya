import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const FILTER_DEFS = [
  {
    key: "category",
    label: "Category",
    options: [
      { value: "all", label: "All" },
      { value: "peptide", label: "Peptides" },
      { value: "stack", label: "Stacks" },
      { value: "article", label: "Articles" },
      { value: "faq", label: "FAQs" },
      { value: "page", label: "Tools & Pages" },
    ],
  },
  {
    key: "purpose",
    label: "Research Purpose",
    options: [
      { value: "all", label: "All" },
      { value: "recovery", label: "Recovery" },
      { value: "fat_loss", label: "Fat Loss" },
      { value: "muscle", label: "Muscle" },
      { value: "cognitive", label: "Cognitive" },
      { value: "hormonal", label: "Hormonal" },
      { value: "sleep", label: "Sleep" },
    ],
  },
  {
    key: "family",
    label: "Peptide Family",
    options: [
      { value: "all", label: "All" },
      { value: "gh", label: "GH Secretagogues" },
      { value: "glp1", label: "GLP-1 Agonists" },
      { value: "healing", label: "Healing Peptides" },
      { value: "cognitive", label: "Nootropic Peptides" },
      { value: "melanocortin", label: "Melanocortin" },
    ],
  },
  {
    key: "admin",
    label: "Administration",
    options: [
      { value: "all", label: "All" },
      { value: "subcutaneous", label: "Subcutaneous" },
      { value: "intranasal", label: "Intranasal" },
      { value: "intramuscular", label: "Intramuscular" },
    ],
  },
];

export default function SearchFilters({ filters, onChange }) {
  const activeCount = Object.values(filters).filter(v => v !== "all").length;

  const reset = () => {
    const reset = {};
    FILTER_DEFS.forEach(f => reset[f.key] = "all");
    onChange(reset);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="bg-secondary/30 rounded-2xl border border-border/60 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-foreground">Filters</p>
        {activeCount > 0 && (
          <button onClick={reset} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-semibold">
            <X className="w-3 h-3" /> Clear ({activeCount})
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {FILTER_DEFS.map(f => (
          <div key={f.key}>
            <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">{f.label}</label>
            <select
              value={filters[f.key]}
              onChange={e => onChange({ ...filters, [f.key]: e.target.value })}
              className="w-full h-9 rounded-lg border border-input bg-white px-2.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring">
              {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        ))}
      </div>
    </motion.div>
  );
}