import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, ExternalLink, Heart, AlertTriangle, Clock, Zap, BookOpen } from "lucide-react";

// Import guide data for BPC-157 (the only product page currently)
import { GUIDES } from "@/components/shop/PeptideQuickGuide";

const tabs = ["Description", "Specifications", "Research Guide", "Reviews"];

export default function ProductTabs({ product }) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-16 lg:mt-24">
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`relative px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
              active === i ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {active === i && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="py-8"
      >
        {active === 0 && <DescriptionTab product={product} />}
        {active === 1 && <SpecsTab product={product} />}
        {active === 2 && <ResearchGuideTab productId="bpc157" />}
        {active === 3 && <ReviewsTab />}
      </motion.div>
    </div>
  );
}

function DescriptionTab({ product }) {
  return (
    <div className="max-w-3xl space-y-6 text-sm text-foreground/80 leading-relaxed">
      <p>
        <strong className="text-foreground">{product.name}</strong> is a research-use-only laboratory material supplied for
        controlled research workflows, compound characterization, and analytical documentation review. It is manufactured
        under rigorous quality standards to support consistency, traceability, and batch-specific verification for qualified
        laboratory settings.
      </p>

      <div>
        <h3 className="text-base font-display font-semibold text-foreground mb-3">Key Product Details</h3>
        <ul className="space-y-2">
          {[
            "Manufactured in accordance with rigorous quality standards to support ≥99% purity",
            "Every batch is third-party analyzed for identity, assay/potency, and sterility",
            "Supplied in lyophilized powder form for stability during transport and storage",
            "Produced with lot-level traceability for research documentation",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <h3 className="text-base font-display font-semibold text-foreground">Specifications and Documentation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          ["Certificate of Analysis", "Available with batch-specific documentation"],
          ["Product Form", "Lyophilized powder"],
          ["Purity Specification", "≥99% purity"],
          ["Intended Use", "Laboratory research use only"],
        ].map(([label, value]) => (
          <div key={label} className="p-3 bg-secondary/50 rounded-md">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpecsTab({ product }) {
  const specs = [
    ["CAS No.", "137525-51-0"],
    ["Purity", "≥99%"],
    ["Molecular Formula", "C₆₂H₉₈N₁₆O₂₂"],
    ["Molecular Weight", "1419.535 g/mol"],
    ["Sequence", "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val"],
    ["Synthesis", "Solid-phase synthesis"],
    ["Format", "Lyophilized powder"],
    ["Solubility", "Soluble in water or 1% acetic acid"],
    ["Stability & Storage", "Stable 24 months at -20°C. After reconstitution, 4°C for 2 weeks or -20°C for 6 months."],
    ["Appearance", "White crystalline powder"],
    ["Shipping", "Shipped at room temperature. Upon receipt, store at -20°C"],
  ];

  return (
    <div className="max-w-3xl">
      <div className="border border-border rounded-md overflow-hidden">
        {specs.map(([label, value], i) => (
          <div key={label} className={`flex ${i % 2 === 0 ? "bg-secondary/30" : "bg-white"}`}>
            <div className="w-48 flex-shrink-0 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-r border-border">
              {label}
            </div>
            <div className="flex-1 px-4 py-3 text-sm text-foreground/80">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const GUIDE_SECTIONS = [
  { key: "dosingProtocol",  label: "Suggested Dosing Protocol",  icon: Zap,           color: "text-orange-600" },
  { key: "storage",         label: "Storage Instructions",        icon: Clock,          color: "text-teal-600" },
  { key: "benefits",        label: "Potential Benefits",          icon: Heart,          color: "text-green-600" },
  { key: "sideEffects",     label: "Potential Side Effects",      icon: AlertTriangle,  color: "text-amber-600" },
  { key: "dailyLife",       label: "Effects on Everyday Life",    icon: Heart,          color: "text-pink-600" },
  { key: "references",      label: "Research References",         icon: BookOpen,       color: "text-gray-600" },
  { key: "protocolSummary", label: "Simple Protocol Summary",     icon: Zap,            color: "text-primary" },
];

function ResearchGuideSection({ sectionKey, label, icon: Icon, color, guide, open, onToggle }) {
  const content = guide[sectionKey];
  if (!content) return null;

  return (
    <div className="border border-border/50 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-secondary/20 hover:bg-secondary/40 transition-colors text-left"
      >
        <span className="flex items-center gap-2.5">
          <Icon className={`w-4 h-4 ${color}`} aria-hidden="true" />
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {open && (
        <div className="px-5 py-4 bg-white text-sm text-foreground/80 leading-relaxed">
          {sectionKey === "references" ? (
            <ul className="space-y-2.5">
              {content.map((ref) => (
                <li key={ref.label}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-primary/80 hover:text-primary hover:underline underline-offset-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{ref.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : sectionKey === "protocolSummary" ? (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 font-mono text-sm text-primary/90">
              {content}
            </div>
          ) : (
            <p>{content}</p>
          )}
        </div>
      )}
    </div>
  );
}

function ResearchGuideTab({ productId }) {
  const guide = GUIDES[productId];
  const [openSections, setOpenSections] = useState({});
  const toggle = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  if (!guide) return <p className="text-sm text-muted-foreground">No research guide available for this product.</p>;

  return (
    <div className="max-w-3xl space-y-3">
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-800 font-medium leading-relaxed mb-5">
        ⚠️ <strong>Educational purposes only.</strong> This guide is not medical advice. For research use only. Not for human consumption. Always follow applicable laws and institutional guidelines.
      </div>
      {GUIDE_SECTIONS.map((s) => (
        <ResearchGuideSection
          key={s.key}
          sectionKey={s.key}
          label={s.label}
          icon={s.icon}
          color={s.color}
          guide={guide}
          open={!!openSections[s.key]}
          onToggle={() => toggle(s.key)}
        />
      ))}
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="max-w-3xl text-center py-12">
      <div className="flex items-center justify-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <span key={s} className="text-primary text-2xl">★</span>
        ))}
      </div>
      <p className="text-2xl font-display font-light mb-1">5.0 out of 5</p>
      <p className="text-sm text-muted-foreground">Based on 55 reviews</p>
    </div>
  );
}